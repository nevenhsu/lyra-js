import { ZERO_BN } from '../constants/bn';
import fetchAllLiquidityWithdrawalEventDataByOwner from './fetchAllLiquidityWithdrawalEventDataByOwner';
import fetchLatestLiquidityWithdrawalEventDataByOwner from './fetchLatestLiquidityWithdrawalEventDataByOwner';
import getUniqueBy from './getUniqueBy';
export default async function fetchLiquidityWithdrawalEventDataByOwner(lyra, owner, market) {
    const [latestLiquidityWithdrawal, allLiquidityWithdrawals] = await Promise.all([
        // Contract (realtime) data
        fetchLatestLiquidityWithdrawalEventDataByOwner(lyra, owner, market),
        // Subgraph data
        fetchAllLiquidityWithdrawalEventDataByOwner(lyra, owner, market),
    ]);
    const uniqueQueuedWithdrawals = getUniqueBy(latestLiquidityWithdrawal.queued.concat(allLiquidityWithdrawals.queued), withdrawal => withdrawal === null || withdrawal === void 0 ? void 0 : withdrawal.timestamp);
    const uniqueProcessedWithdrawals = getUniqueBy(latestLiquidityWithdrawal.processed.concat(allLiquidityWithdrawals.processed), withdrawal => withdrawal === null || withdrawal === void 0 ? void 0 : withdrawal.timestamp);
    const withdrawalQueuedMap = {};
    const withdrawalProcessedMap = {};
    const withdrawalQueuedOrProcessedEvents = [];
    uniqueProcessedWithdrawals.forEach((withdrawalProcessedEvent) => {
        if ((withdrawalProcessedEvent === null || withdrawalProcessedEvent === void 0 ? void 0 : withdrawalProcessedEvent.withdrawalQueueId) == ZERO_BN) {
            withdrawalQueuedOrProcessedEvents.push({
                processed: withdrawalProcessedEvent,
            });
        }
    });
    uniqueQueuedWithdrawals.forEach((withdrawalQueuedEvent) => {
        const id = String(withdrawalQueuedEvent === null || withdrawalQueuedEvent === void 0 ? void 0 : withdrawalQueuedEvent.withdrawalQueueId);
        withdrawalQueuedMap[id] = withdrawalQueuedEvent;
    });
    uniqueProcessedWithdrawals.forEach((withdrawalProcessedEvent) => {
        const id = String(withdrawalProcessedEvent === null || withdrawalProcessedEvent === void 0 ? void 0 : withdrawalProcessedEvent.withdrawalQueueId);
        withdrawalProcessedMap[id] = withdrawalProcessedEvent;
    });
    uniqueQueuedWithdrawals.forEach((withdrawalQueuedEvent) => {
        const id = String(withdrawalQueuedEvent === null || withdrawalQueuedEvent === void 0 ? void 0 : withdrawalQueuedEvent.withdrawalQueueId);
        if (withdrawalQueuedMap[id] && withdrawalProcessedMap[id]) {
            withdrawalQueuedOrProcessedEvents.push({
                queued: withdrawalQueuedMap[id],
                processed: withdrawalProcessedMap[id],
            });
        }
        else if (withdrawalQueuedMap[id] && !withdrawalProcessedMap[id]) {
            withdrawalQueuedOrProcessedEvents.push({
                queued: withdrawalQueuedMap[id],
            });
        }
    });
    return {
        events: withdrawalQueuedOrProcessedEvents,
    };
}
//# sourceMappingURL=fetchLiquidityWithdrawalEventDataByOwner.js.map