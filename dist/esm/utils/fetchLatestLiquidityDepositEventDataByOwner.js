import { LyraMarketContractId } from '../constants/contracts';
import getLyraMarketContract from './getLyraMarketContract';
const BLOCK_LIMIT = 100;
export default async function fetchLatestLiquidityDepositEventDataByOwner(lyra, owner, market) {
    const liquidityPoolContract = getLyraMarketContract(lyra, market.contractAddresses, lyra.version, LyraMarketContractId.LiquidityPool);
    // Approximately last 1 min of events
    const toBlockNumber = (await lyra.provider.getBlock('latest')).number;
    const fromBlockNumber = toBlockNumber - BLOCK_LIMIT;
    const [depositQueuedEvents, depositProcessedEvents] = await Promise.all([
        liquidityPoolContract.queryFilter(liquidityPoolContract.filters.DepositQueued(null, owner), fromBlockNumber, toBlockNumber),
        liquidityPoolContract.queryFilter(liquidityPoolContract.filters.DepositProcessed(null, owner), fromBlockNumber, toBlockNumber),
    ]);
    const liquidityDepositQueuedEvents = depositQueuedEvents.map(event => {
        return {
            depositor: event.args.depositor,
            beneficiary: event.args.beneficiary,
            depositQueueId: event.args.depositQueueId,
            amountDeposited: event.args.amountDeposited,
            totalQueuedDeposits: event.args.totalQueuedDeposits,
            timestamp: event.args.timestamp,
            transactionHash: event.transactionHash,
        };
    });
    const liquidityDepositProcessedEvents = depositProcessedEvents.map(event => {
        return {
            caller: event.args.caller,
            beneficiary: event.args.beneficiary,
            depositQueueId: event.args.depositQueueId,
            amountDeposited: event.args.amountDeposited,
            tokenPrice: event.args.tokenPrice,
            tokensReceived: event.args.tokensReceived,
            timestamp: event.args.timestamp,
            transactionHash: event.transactionHash,
        };
    });
    return {
        queued: liquidityDepositQueuedEvents,
        processed: liquidityDepositProcessedEvents,
    };
}
//# sourceMappingURL=fetchLatestLiquidityDepositEventDataByOwner.js.map