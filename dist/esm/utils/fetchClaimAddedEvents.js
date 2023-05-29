import { gql } from '@apollo/client/core';
import { BigNumber } from 'ethers';
import { CLAIM_ADDED_FRAGMENT } from '../constants/queries';
import subgraphRequest from './subgraphRequest';
const claimAddedQuery = gql `
  query claimAddeds($user: String!) {
    claimAddeds(where: { 
      claimer: $user
    }) {
      ${CLAIM_ADDED_FRAGMENT}
    }
  }
`;
export default async function fetchClaimAddedEvents(lyra, address) {
    var _a;
    const { data } = await subgraphRequest(lyra.govSubgraphClient, {
        query: claimAddedQuery,
        variables: {
            user: address.toLowerCase(),
        },
    });
    return ((_a = data === null || data === void 0 ? void 0 : data.claimAddeds.map(ev => ({
        amount: BigNumber.from(ev.amount),
        blockNumber: ev.blockNumber,
        claimer: ev.claimer,
        epochTimestamp: parseInt(ev.epochTimestamp),
        rewardToken: ev.rewardToken,
        timestamp: ev.timestamp,
        tag: ev.tag,
    })).filter(event => event.rewardToken.toLowerCase() !== '0xCb9f85730f57732fc899fb158164b9Ed60c77D49'.toLowerCase())) !== null && _a !== void 0 ? _a : []);
}
//# sourceMappingURL=fetchClaimAddedEvents.js.map