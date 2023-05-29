import { ZERO_BN } from '../constants/bn';
import { LyraMarketContractId } from '../constants/contracts';
import { Market } from '../market';
import buildTx from '../utils/buildTx';
import fetchLiquidityWithdrawalEventDataByOwner from '../utils/fetchLiquidityWithdrawalEventDataByOwner';
import getLiquidityDelayReason from '../utils/getLiquidityDelayReason';
import getLyraMarketContract from '../utils/getLyraMarketContract';
export class LiquidityWithdrawal {
    constructor(lyra, market, data) {
        var _a;
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
            throw new Error('No queued or processed event for LiquidityWithdrawal');
        }
        this.queueId = queuedOrProcessed.withdrawalQueueId.toNumber();
        this.beneficiary = queuedOrProcessed.beneficiary;
        this.balance = (_a = queued === null || queued === void 0 ? void 0 : queued.amountWithdrawn) !== null && _a !== void 0 ? _a : ZERO_BN;
        this.tokenPriceAtWithdraw = processed === null || processed === void 0 ? void 0 : processed.tokenPrice;
        this.value = processed === null || processed === void 0 ? void 0 : processed.amountWithdrawn;
        this.isPending = !processed;
        this.withdrawalRequestedTimestamp = queuedOrProcessed.timestamp.toNumber();
        this.withdrawalTimestamp = processed
            ? processed.timestamp.toNumber()
            : queued
                ? queued.timestamp.add(market.params.withdrawalDelay).toNumber()
                : // Should never happen
                    0;
        this.timeToWithdrawal = Math.max(0, this.withdrawalTimestamp - market.block.timestamp);
        this.delayReason =
            this.timeToWithdrawal === 0 && this.isPending
                ? getLiquidityDelayReason(market, data.cbTimestamp, data.marketLiquidity)
                : null;
    }
    // Getters
    static async getByOwner(lyra, marketAddress, owner) {
        const market = await Market.get(lyra, marketAddress);
        const liquidityPoolContract = getLyraMarketContract(lyra, market.contractAddresses, lyra.version, LyraMarketContractId.LiquidityPool);
        const [{ events }, cbTimestamp, marketLiquidity] = await Promise.all([
            fetchLiquidityWithdrawalEventDataByOwner(lyra, owner, market),
            liquidityPoolContract.CBTimestamp(),
            market.liquidity(),
        ]);
        return events.map(event => new LiquidityWithdrawal(lyra, market, {
            ...event,
            cbTimestamp,
            marketLiquidity,
        }));
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