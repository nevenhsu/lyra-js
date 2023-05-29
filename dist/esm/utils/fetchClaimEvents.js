import { ApolloClient, gql, HttpLink, InMemoryCache } from '@apollo/client/core';
import { BigNumber } from 'ethers';
import { CLAIM_FRAGMENT } from '../constants/queries';
import getLyraGovernanceSubgraphURI from './getLyraGovernanceSubgraphURI';
import subgraphRequest from './subgraphRequest';
const claimQuery = gql `
  query claims($user: String!) {
    claims(where: { 
      claimer: $user
    }) {
      ${CLAIM_FRAGMENT}
    }
  }
`;
export default async function fetchClaimEvents(lyra, chain, address) {
    var _a;
    const client = new ApolloClient({
        link: new HttpLink({ uri: getLyraGovernanceSubgraphURI(lyra, chain), fetch }),
        cache: new InMemoryCache(),
    });
    const { data } = await subgraphRequest(client, {
        query: claimQuery,
        variables: {
            user: address.toLowerCase(),
        },
    });
    return ((_a = data === null || data === void 0 ? void 0 : data.claims.map(ev => ({
        amount: BigNumber.from(ev.amount),
        blockNumber: ev.blockNumber,
        claimer: ev.claimer,
        rewardToken: ev.rewardToken,
        timestamp: ev.timestamp,
    }))) !== null && _a !== void 0 ? _a : []);
}
//# sourceMappingURL=fetchClaimEvents.js.map