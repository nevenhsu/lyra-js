import { gql } from '@apollo/client/core';
import { BigNumber } from 'ethers';
import { ZERO_BN } from '../constants/bn';
import { CIRCUIT_BREAKER_FRAGMENT, LIQUIDITY_DEPOSIT_FRAGMENT, } from '../constants/queries';
import { LiquidityDelayReason, } from '../liquidity_deposit';
import subgraphRequest from './subgraphRequest';
const lpUserLiquiditiesQuery = gql `
  query lpuserLiquidities($user: String!, $pool: String!) {
    lpuserLiquidities(where: { 
      user: $user,
      pool: $pool
    }) {
      ${LIQUIDITY_DEPOSIT_FRAGMENT}
    }
    circuitBreakers(first: 1, where: {
      pool: $pool
    }) {
      ${CIRCUIT_BREAKER_FRAGMENT}
    }
  }
`;
export default async function fetchLiquidityDepositEventDataByOwner(lyra, owner, market) {
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
    const depositQueuedEvents = (_a = userLiquidity.pendingDepositsAndWithdrawals.map(queuedDeposit => {
        return {
            depositor: owner,
            beneficiary: owner,
            queueId: parseInt(queuedDeposit.queueID, 10),
            amountDeposited: BigNumber.from(queuedDeposit.pendingAmount),
            totalQueuedDeposits: ZERO_BN,
            timestamp: queuedDeposit.timestamp,
            transactionHash: queuedDeposit.transactionHash,
        };
    })) !== null && _a !== void 0 ? _a : [];
    const depositProcessedEvents = (_b = userLiquidity.depositsAndWithdrawals.map(processedDeposit => {
        return {
            caller: owner,
            beneficiary: owner,
            queueId: parseInt(processedDeposit.queueID, 10),
            amountDeposited: BigNumber.from(processedDeposit.quoteAmount),
            tokenPrice: BigNumber.from(processedDeposit.tokenPrice),
            tokensReceived: BigNumber.from(processedDeposit.tokenAmount),
            timestamp: processedDeposit.timestamp,
            transactionHash: processedDeposit.transactionHash,
        };
    })) !== null && _b !== void 0 ? _b : [];
    const depositQueuedEventMap = depositQueuedEvents.reduce((map, depositQueuedEvent) => ({
        ...map,
        [depositQueuedEvent.queueId]: depositQueuedEvent,
    }), {});
    const depositProcessedEventMap = depositProcessedEvents.reduce((map, depositProcessedEvent) => {
        if (depositProcessedEvent.queueId === 0) {
            return map;
        }
        else {
            return {
                ...map,
                [depositProcessedEvent.queueId]: depositProcessedEvent,
            };
        }
    }, {});
    const instantDepositEvents = depositProcessedEvents.map(processed => ({
        processed,
        isProcessed: true,
        isInstant: true,
    }));
    const depositEvents = Object.entries(depositQueuedEventMap).map(([depositQueueId, queued]) => {
        const processed = depositProcessedEventMap[parseInt(depositQueueId, 10)];
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
        events: instantDepositEvents.concat(depositEvents).sort((a, b) => {
            const bTimestamp = b.isProcessed ? b.processed.timestamp : b.queued.timestamp;
            const aTimestamp = a.isProcessed ? a.processed.timestamp : a.queued.timestamp;
            return bTimestamp - aTimestamp;
        }),
        circuitBreaker,
    };
}
//# sourceMappingURL=fetchLiquidityDepositEventDataByOwner.js.map