import { Chain } from '../constants/chain';
const getLyraGovernanceSubgraphURI = (lyra, chain) => {
    switch (chain) {
        case 'ethereum':
        case Chain.Optimism:
        case Chain.OptimismGoerli:
            return new URL(`/subgraph/optimism-governance/v1/api`, lyra.apiUri).toString();
        case Chain.Arbitrum:
        case Chain.ArbitrumGoerli:
            return new URL(`/subgraph/arbitrum-governance/v1/api`, lyra.apiUri).toString();
    }
};
export default getLyraGovernanceSubgraphURI;
//# sourceMappingURL=getLyraGovernanceSubgraphURI.js.map