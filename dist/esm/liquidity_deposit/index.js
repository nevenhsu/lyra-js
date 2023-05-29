import { LyraMarketContractId } from '../constants/contracts';
import { Market } from '../market';
import buildTx from '../utils/buildTx';
import fetchLiquidityDepositEventDataByOwner from '../utils/fetchLiquidityDepositEventDataByOwner';
import getERC20Contract from '../utils/getERC20Contract';
import getLiquidityDelayReason from '../utils/getLiquidityDelayReason';
import getLyraMarketContract from '../utils/getLyraMarketContract';
export var LiquidityDelayReason;
(function (LiquidityDelayReason) {
    LiquidityDelayReason["Liquidity"] = "Liquidity";
    LiquidityDelayReason["Volatility"] = "Volatility";
    LiquidityDelayReason["Keeper"] = "Keeper";
})(LiquidityDelayReason || (LiquidityDelayReason = {}));
export class LiquidityDeposit {
    constructor(lyra, market, data) {
        // Data
        this.lyra = lyra;
        this.__market = market;
        this.__queued = data.queued;
        this.__processed = data.processed;
        // Fields
        const queued = data.queued;
        const processed = data.processed;
        const queuedOrProcessed = queued !== null && queued !== void 0 ? queued : processed;
        if (!queuedOrProcessed) {
            throw new Error('No queued or processed event for LiquidityDeposit');
        }
        this.queueId = queuedOrProcessed.depositQueueId.toNumber();
        this.beneficiary = queuedOrProcessed.beneficiary;
        this.value = queuedOrProcessed.amountDeposited;
        this.tokenPriceAtDeposit = processed === null || processed === void 0 ? void 0 : processed.tokenPrice;
        this.balance = processed === null || processed === void 0 ? void 0 : processed.tokensReceived;
        this.isPending = !processed;
        this.depositRequestedTimestamp = queuedOrProcessed.timestamp.toNumber();
        this.depositTimestamp = processed
            ? processed.timestamp.toNumber()
            : queued
                ? queued.timestamp.add(market.params.depositDelay).toNumber()
                : // Should never happen
                    0;
        this.timeToDeposit = Math.max(0, this.depositTimestamp - market.block.timestamp);
        this.delayReason =
            this.timeToDeposit === 0 && this.isPending
                ? getLiquidityDelayReason(market, data.cbTimestamp, data.marketLiquidity)
                : null;
    }
    // Getters
    static async getByOwner(lyra, marketAddress, owner) {
        const market = await Market.get(lyra, marketAddress);
        const liquidityPoolContract = getLyraMarketContract(lyra, market.contractAddresses, lyra.version, LyraMarketContractId.LiquidityPool);
        const [{ events }, cbTimestamp, marketLiquidity] = await Promise.all([
            fetchLiquidityDepositEventDataByOwner(lyra, owner, market),
            liquidityPoolContract.CBTimestamp(),
            market.liquidity(),
        ]);
        const liquidityDeposits = await Promise.all(events.map(async (event) => {
            return new LiquidityDeposit(lyra, market, {
                ...event,
                cbTimestamp,
                marketLiquidity,
            });
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