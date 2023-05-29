import { gql } from '@apollo/client/core';
import { BigNumber } from 'ethers';
import { ZERO_BN } from '../constants/bn';
import { LIQUIDITY_WITHDRAWAL_FRAGMENT } from '../constants/queries';
import subgraphRequest from './subgraphRequest';
const lpUserLiquiditiesQuery = gql `
  query lpuserLiquidities($user: String!, $pool: String!) {
    lpuserLiquidities(where: { 
      user: $user,
      pool: $pool
    }) {
      ${LIQUIDITY_WITHDRAWAL_FRAGMENT}
    }
  }
`;
export default async function fetchAllLiquidityWithdrawalEventDataByOwner(lyra, owner, market) {
    var _a, _b, _c, _d;
    const { data } = await subgraphRequest(lyra.subgraphClient, {
        query: lpUserLiquiditiesQuery,
        variables: {
            user: owner.toLowerCase(),
            pool: market.contractAddresses.liquidityPool.toLowerCase(),
        },
    });
    const withdrawalQueuedEvents = (_b = (_a = data === null || data === void 0 ? void 0 : data.lpuserLiquidities[0]) === null || _a === void 0 ? void 0 : _a.pendingDepositsAndWithdrawals.map(queuedWithdrawal => {
        return {
            withdrawer: owner,
            beneficiary: owner,
            withdrawalQueueId: BigNumber.from(queuedWithdrawal.queueID),
            amountWithdrawn: BigNumber.from(queuedWithdrawal.pendingAmount),
            totalQueuedWithdrawals: ZERO_BN,
            timestamp: BigNumber.from(queuedWithdrawal.timestamp),
            transactionHash: queuedWithdrawal.transactionHash,
        };
    })) !== null && _b !== void 0 ? _b : [];
    const withdrawalProcessedEvents = (_d = (_c = data === null || data === void 0 ? void 0 : data.lpuserLiquidities[0]) === null || _c === void 0 ? void 0 : _c.depositsAndWithdrawals.map(processedWithdrawal => {
        return {
            caller: owner,
            beneficiary: owner,
            withdrawalQueueId: ZERO_BN,
            amountWithdrawn: BigNumber.from(processedWithdrawal.quoteAmount),
            tokenPrice: BigNumber.from(processedWithdrawal.tokenPrice),
            quoteReceived: BigNumber.from(processedWithdrawal.tokenAmount),
            totalQueuedWithdrawals: ZERO_BN,
            timestamp: BigNumber.from(processedWithdrawal.timestamp),
            transactionHash: processedWithdrawal.transactionHash,
        };
    })) !== null && _d !== void 0 ? _d : [];
    return {
        queued: withdrawalQueuedEvents,
        processed: withdrawalProcessedEvents,
    };
}
//# sourceMappingURL=fetchAllLiquidityWithdrawalEventDataByOwner.js.map