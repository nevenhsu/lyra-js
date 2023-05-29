import { gql } from '@apollo/client/core';
import { BigNumber } from 'ethers';
import { ZERO_BN } from '../constants/bn';
import { CIRCUIT_BREAKER_FRAGMENT, LIQUIDITY_WITHDRAWAL_FRAGMENT, } from '../constants/queries';
import { LiquidityDelayReason } from '../liquidity_deposit';
import subgraphRequest from './subgraphRequest';
const lpUserLiquiditiesQuery = gql `
  query lpuserLiquidities($user: String!, $pool: String!) {
    lpuserLiquidities(where: { 
      user: $user,
      pool: $pool
    }) {
      ${LIQUIDITY_WITHDRAWAL_FRAGMENT}
    }
    circuitBreakers(first: 1, where: {
      pool: $pool
    }) {
      ${CIRCUIT_BREAKER_FRAGMENT}
    }
  }
`;
export default async function fetchLiquidityWithdrawalEventDataByOwner(lyra, owner, market) {
    var _a, _b;
    const { data } = await subgraphRequest(lyra.subgraphClient, {
        query: lpUserLiquiditiesQuery,
        variables: {
            user: owner.toLowerCase(),
            pool: market.contractAddresses.liquidityPool.toLowerCase(),
        },
    });
    const userLiquidity = data === null || data === void 0 ? void 0 : data.lpuserLiquidities[0];
    const circuitBreakerData = data === null || data === void 0 ? void 0 : data.circuitBreakers[0];
    const circuitBreaker = circuitBreakerData
        ? {
            timestamp: circuitBreakerData.cbTimestamp,
            reason: circuitBreakerData.ivVarianceCrossed || circuitBreakerData.skewVarianceCrossed
                ? LiquidityDelayReason.Volatility
                : circuitBreakerData.liquidityVarianceCrossed
                    ? LiquidityDelayReason.Liquidity
                    : LiquidityDelayReason.Keeper,
        }
        : null;
    if (!userLiquidity) {
        return { circuitBreaker, events: [] };
    }
    const withdrawalQueuedEvents = (_a = userLiquidity.pendingDepositsAndWithdrawals.map(queuedWithdrawal => {
        return {
            withdrawer: owner,
            beneficiary: owner,
            queueId: parseInt(queuedWithdrawal.queueID, 10),
            amountWithdrawn: BigNumber.from(queuedWithdrawal.pendingAmount),
            totalQueuedWithdrawals: ZERO_BN,
            timestamp: queuedWithdrawal.timestamp,
            transactionHash: queuedWithdrawal.transactionHash,
        };
    })) !== null && _a !== void 0 ? _a : [];
    const withdrawalProcessedEvents = (_b = userLiquidity.depositsAndWithdrawals.map(processedWithdrawal => {
        return {
            caller: owner,
            beneficiary: owner,
            queueId: parseInt(processedWithdrawal.queueID, 10),
            amountWithdrawn: BigNumber.from(processedWithdrawal.quoteAmount),
            tokenPrice: BigNumber.from(processedWithdrawal.tokenPrice),
            quoteReceived: BigNumber.from(processedWithdrawal.tokenAmount),
            totalQueuedWithdrawals: ZERO_BN,
            timestamp: processedWithdrawal.timestamp,
            transactionHash: processedWithdrawal.transactionHash,
        };
    })) !== null && _b !== void 0 ? _b : [];
    const withdrawalQueuedEventMap = withdrawalQueuedEvents.reduce((map, withdrawalQueuedEvent) => ({
        ...map,
        [withdrawalQueuedEvent.queueId]: withdrawalQueuedEvent,
    }), {});
    const withdrawalProcessedEventMap = withdrawalProcessedEvents.reduce((map, withdrawalProcessedEvent) => {
        if (withdrawalProcessedEvent.queueId === 0) {
            return map;
        }
        else {
            return {
                ...map,
                [withdrawalProcessedEvent.queueId]: withdrawalProcessedEvent,
            };
        }
    }, {});
    const instantDepositEvents = withdrawalProcessedEvents.map(processed => ({
        processed,
        isProcessed: true,
        isInstant: true,
    }));
    const withdrawalEvents = Object.entries(withdrawalQueuedEventMap).map(([withdrawalQueueId, queued]) => {
        const processed = withdrawalProcessedEventMap[parseInt(withdrawalQueueId, 10)];
        if (processed) {
            return {
                queued,
                processed,
                isProcessed: true,
                isInstant: false,
            };
        }
        else {
            return {
                queued,
                isProcessed: false,
                isInstant: false,
            };
        }
    });
    return {
        events: instantDepositEvents.concat(withdrawalEvents).sort((a, b) => {
            const bTimestamp = b.isProcessed ? b.processed.timestamp : b.queued.timestamp;
            const aTimestamp = a.isProcessed ? a.processed.timestamp : a.queued.timestamp;
            return bTimestamp - aTimestamp;
        }),
        circuitBreaker,
    };
}
//# sourceMappingURL=fetchLiquidityWithdrawalEventDataByOwner.js.map