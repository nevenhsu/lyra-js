import { LyraMarketContractId } from '../constants/contracts';
import buildTx from '../utils/buildTx';
import fetchLiquidityDepositEventDataByOwner from '../utils/fetchLiquidityDepositEventDataByOwner';
import getERC20Contract from '../utils/getERC20Contract';
import getLyraMarketContract from '../utils/getLyraMarketContract';
export var LiquidityDelayReason;
(function (LiquidityDelayReason) {
    LiquidityDelayReason["Liquidity"] = "Liquidity";
    LiquidityDelayReason["Volatility"] = "Volatility";
    LiquidityDelayReason["Keeper"] = "Keeper";
})(LiquidityDelayReason || (LiquidityDelayReason = {}));
export class LiquidityDeposit {
    constructor(lyra, data) {
        // Data
        this.lyra = lyra;
        this.__market = data.market;
        this.__events = data.events;
        // Fields
        const queued = !data.events.isInstant ? data.events.queued : null;
        const processed = data.events.isProcessed ? data.events.processed : null;
        const queuedOrProcessed = (data.events.isInstant ? processed : data.events.queued);
        this.transactionHash = queuedOrProcessed.transactionHash;
        this.queueId = queuedOrProcessed.queueId;
        this.beneficiary = queuedOrProcessed.beneficiary;
        this.value = queuedOrProcessed.amountDeposited;
        this.tokenPriceAtDeposit = processed === null || processed === void 0 ? void 0 : processed.tokenPrice;
        this.balance = processed === null || processed === void 0 ? void 0 : processed.tokensReceived;
        this.isPending = !processed;
        this.depositRequestedTimestamp = queuedOrProcessed.timestamp;
        this.depositTimestamp = processed
            ? processed.timestamp
            : queued
                ? queued.timestamp + data.market.params.depositDelay
                : // Should never happen
                    0;
        this.timeToDeposit = Math.max(0, this.depositTimestamp - data.market.block.timestamp);
        this.delayReason =
            this.timeToDeposit === 0 &&
                this.isPending &&
                data.circuitBreaker &&
                data.circuitBreaker.timestamp > data.market.block.timestamp
                ? data.circuitBreaker.reason
                : null;
    }
    // Getters
    static async getByOwner(lyra, market, owner) {
        const [{ events, circuitBreaker }, marketLiquidity] = await Promise.all([
            fetchLiquidityDepositEventDataByOwner(lyra, owner, market),
            market.liquidity(),
        ]);
        const liquidityDeposits = events.map(events => new LiquidityDeposit(lyra, {
            market,
            events,
            circuitBreaker,
            marketLiquidity,
        }));
        return liquidityDeposits;
    }
    // Transactions
    static approve(market, owner, amountQuote) {
        const liquidityPoolContract = getLyraMarketContract(market.lyra, market.contractAddresses, market.lyra.version, LyraMarketContractId.LiquidityPool);
        const erc20 = getERC20Contract(market.lyra.provider, market.quoteToken.address);
        const data = erc20.interface.encodeFunctionData('approve', [liquidityPoolContract.address, amountQuote]);
        return buildTx(market.lyra.provider, market.lyra.provider.network.chainId, erc20.address, owner, data);
    }
    static initiateDeposit(market, beneficiary, amountQuote) {
        const liquidityPoolContract = getLyraMarketContract(market.lyra, market.contractAddresses, market.lyra.version, LyraMarketContractId.LiquidityPool);
        const data = liquidityPoolContract.interface.encodeFunctionData('initiateDeposit', [beneficiary, amountQuote]);
        return buildTx(market.lyra.provider, market.lyra.provider.network.chainId, liquidityPoolContract.address, beneficiary, data);
    }
    // Edges
    market() {
        return this.__market;
    }
}
//# sourceMappingURL=index.js.map