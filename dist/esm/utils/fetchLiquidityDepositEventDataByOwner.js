import { ZERO_BN } from '../constants/bn';
import fetchAllLiquidityDepositEventDataByOwner from './fetchAllLiquidityDepositEventDataByOwner';
import fetchLatestLiquidityDepositEventDataByOwner from './fetchLatestLiquidityDepositEventDataByOwner';
import getUniqueBy from './getUniqueBy';
export default async function fetchLiquidityDepositEventDataByOwner(lyra, owner, market) {
    const [latestLiquidityDeposit, allLiquidityDeposits] = await Promise.all([
        // Contract (realtime) data
        fetchLatestLiquidityDepositEventDataByOwner(lyra, owner, market),
        // Subgraph data
        fetchAllLiquidityDepositEventDataByOwner(lyra, owner, market),
    ]);
    const uniqueQueuedDeposits = getUniqueBy(latestLiquidityDeposit.queued.concat(allLiquidityDeposits.queued), deposit => deposit === null || deposit === void 0 ? void 0 : deposit.timestamp);
    const uniqueProcessedDeposits = getUniqueBy(latestLiquidityDeposit.processed.concat(allLiquidityDeposits.processed), deposit => deposit === null || deposit === void 0 ? void 0 : deposit.timestamp);
    const depositQueuedMap = {};
    const depositProcessedMap = {};
    const depositQueuedOrProcessedEvents = [];
    uniqueProcessedDeposits.forEach((depositProcessedEvent) => {
        if (depositProcessedEvent === null || depositProcessedEvent === void 0 ? void 0 : depositProcessedEvent.depositQueueId.eq(ZERO_BN)) {
            depositQueuedOrProcessedEvents.push({
                processed: depositProcessedEvent,
            });
        }
    });
    uniqueQueuedDeposits.forEach((depositQueuedEvent) => {
        const id = String(depositQueuedEvent === null || depositQueuedEvent === void 0 ? void 0 : depositQueuedEvent.depositQueueId);
        depositQueuedMap[id] = depositQueuedEvent;
    });
    uniqueProcessedDeposits.forEach((depositProcessedEvent) => {
        const id = String(depositProcessedEvent === null || depositProcessedEvent === void 0 ? void 0 : depositProcessedEvent.depositQueueId);
        depositProcessedMap[id] = depositProcessedEvent;
    });
    uniqueQueuedDeposits.forEach((depositQueuedEvent) => {
        const id = String(depositQueuedEvent === null || depositQueuedEvent === void 0 ? void 0 : depositQueuedEvent.depositQueueId);
        if (depositQueuedMap[id] && depositProcessedMap[id]) {
            depositQueuedOrProcessedEvents.push({
                queued: depositQueuedMap[id],
                processed: depositProcessedMap[id],
            });
        }
        else if (depositQueuedMap[id] && !depositProcessedMap[id]) {
            depositQueuedOrProcessedEvents.push({
                queued: depositQueuedMap[id],
            });
        }
    });
    return {
        events: depositQueuedOrProcessedEvents,
    };
}
//# sourceMappingURL=fetchLiquidityDepositEventDataByOwner.js.map