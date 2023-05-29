import { gql } from '@apollo/client/core';
import { BigNumber } from 'ethers';
import { ZERO_BN } from '../constants/bn';
import { LIQUIDITY_DEPOSIT_FRAGMENT } from '../constants/queries';
import subgraphRequest from './subgraphRequest';
const lpUserLiquiditiesQuery = gql `
  query lpuserLiquidities($user: String!, $pool: String!) {
    lpuserLiquidities(where: { 
      user: $user,
      pool: $pool
    }) {
      ${LIQUIDITY_DEPOSIT_FRAGMENT}
    }
  }
`;
export default async function fetchAllLiquidityDepositEventDataByOwner(lyra, owner, market) {
    var _a, _b, _c, _d;
    const { data } = await subgraphRequest(lyra.subgraphClient, {
        query: lpUserLiquiditiesQuery,
        variables: {
            user: owner.toLowerCase(),
            pool: market.contractAddresses.liquidityPool.toLowerCase(),
        },
    });
    const depositQueuedEvents = (_b = (_a = data === null || data === void 0 ? void 0 : data.lpuserLiquidities[0]) === null || _a === void 0 ? void 0 : _a.pendingDepositsAndWithdrawals.map(queuedDeposit => {
        return {
            depositor: owner,
            beneficiary: owner,
            depositQueueId: BigNumber.from(queuedDeposit.queueID),
            amountDeposited: BigNumber.from(queuedDeposit.pendingAmount),
            totalQueuedDeposits: ZERO_BN,
            timestamp: BigNumber.from(queuedDeposit.timestamp),
            transactionHash: queuedDeposit.transactionHash,
        };
    })) !== null && _b !== void 0 ? _b : [];
    const depositProcessedEvents = (_d = (_c = data === null || data === void 0 ? void 0 : data.lpuserLiquidities[0]) === null || _c === void 0 ? void 0 : _c.depositsAndWithdrawals.map(processedDeposit => {
        return {
            caller: owner,
            beneficiary: owner,
            depositQueueId: ZERO_BN,
            amountDeposited: BigNumber.from(processedDeposit.quoteAmount),
            tokenPrice: BigNumber.from(processedDeposit.tokenPrice),
            tokensReceived: BigNumber.from(processedDeposit.tokenAmount),
            timestamp: BigNumber.from(processedDeposit.timestamp),
            transactionHash: processedDeposit.transactionHash,
        };
    })) !== null && _d !== void 0 ? _d : [];
    return {
        queued: depositQueuedEvents,
        processed: depositProcessedEvents,
    };
}
//# sourceMappingURL=fetchAllLiquidityDepositEventDataByOwner.js.map