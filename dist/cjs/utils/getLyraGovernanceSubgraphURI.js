"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chain_1 = require("../constants/chain");
var getLyraGovernanceSubgraphURI = function (lyra, chain) {
    switch (chain) {
        case 'ethereum':
        case chain_1.Chain.Optimism:
        case chain_1.Chain.OptimismGoerli:
            return new URL("/subgraph/optimism-governance/v1/api", lyra.apiUri).toString();
        case chain_1.Chain.Arbitrum:
        case chain_1.Chain.ArbitrumGoerli:
            return new URL("/subgraph/arbitrum-governance/v1/api", lyra.apiUri).toString();
    }
};
exports.default = getLyraGovernanceSubgraphURI;
//# sourceMappingURL=getLyraGovernanceSubgraphURI.js.map