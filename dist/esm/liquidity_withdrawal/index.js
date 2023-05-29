import { ZERO_BN } from '../constants/bn';
import { LyraMarketContractId } from '../constants/contracts';
import buildTx from '../utils/buildTx';
import fetchLiquidityWithdrawalEventDataByOwner from '../utils/fetchLiquidityWithdrawalEventDataByOwner';
import getLyraMarketContract from '../utils/getLyraMarketContract';
export class LiquidityWithdrawal {
    constructor(lyra, data) {
        var _a;
        // Data
        this.lyra = lyra;
        this.__market = data.market;
        // Fields
        const queued = !data.events.isInstant ? data.events.queued : null;
        const processed = data.events.isProcessed ? data.events.processed : null;
        const queuedOrProcessed = queued !== null && queued !== void 0 ? queued : processed;
        if (!queuedOrProcessed) {
            throw new Error('No queued or processed event for LiquidityWithdrawal');
        }
        this.queueId = queuedOrProcessed.queueId;
        this.beneficiary = queuedOrProcessed.beneficiary;
        this.balance = (_a = queued === null || queued === void 0 ? void 0 : queued.amountWithdrawn) !== null && _a !== void 0 ? _a : ZERO_BN;
        this.tokenPriceAtWithdraw = processed === null || processed === void 0 ? void 0 : processed.tokenPrice;
        this.value = processed === null || processed === void 0 ? void 0 : processed.amountWithdrawn;
        this.isPending = !processed;
        this.withdrawalRequestedTimestamp = queuedOrProcessed.timestamp;
        this.withdrawalTimestamp = processed
            ? processed.timestamp
            : queued
                ? queued.timestamp + data.market.params.withdrawalDelay
                : // Should never happen
                    0;
        this.timeToWithdrawal = Math.max(0, this.withdrawalTimestamp - data.market.block.timestamp);
        this.delayReason =
            this.timeToWithdrawal === 0 &&
                this.isPending &&
                data.circuitBreaker &&
                data.circuitBreaker.timestamp > data.market.block.timestamp
                ? data.circuitBreaker.reason
                : null;
    }
    // Getters
    static async getByOwner(lyra, market, owner) {
        const [{ events, circuitBreaker }, marketLiquidity] = await Promise.all([
            fetchLiquidityWithdrawalEventDataByOwner(lyra, owner, market),
            market.liquidity(),
        ]);
        const liquidityDeposits = events.map(events => new LiquidityWithdrawal(lyra, {
            market,
            events,
            circuitBreaker,
            marketLiquidity,
        }));
        return liquidityDeposits;
    }
    // Transactions
    static initiateWithdraw(market, beneficiary, amountLiquidityTokens) {
        const liquidityPoolContract = getLyraMarketContract(market.lyra, market.contractAddresses, market.lyra.version, LyraMarketContractId.LiquidityPool);
        const data = liquidityPoolContract.interface.encodeFunctionData('initiateWithdraw', [
            beneficiary,
            amountLiquidityTokens,
        ]);
        return buildTx(market.lyra.provider, market.lyra.provider.network.chainId, liquidityPoolContract.address, beneficiary, data);
    }
    // Edges
    market() {
        return this.__market;
    }
}
//# sourceMappingURL=index.js.map