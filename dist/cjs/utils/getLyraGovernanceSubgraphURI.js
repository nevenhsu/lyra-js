"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chain_1 = require("../constants/chain");
var getLyraGovernanceSubgraphURI = function (chain) {
    switch (chain) {
        case chain_1.Chain.Optimism:
        case chain_1.Chain.OptimismGoerli:
            return 'https://subgraph.satsuma-prod.com/d14de8f7fd46/lyra/optimism-governance/api';
        case chain_1.Chain.Arbitrum:
        case chain_1.Chain.ArbitrumGoerli:
            return 'https://subgraph.satsuma-prod.com/d14de8f7fd46/lyra/arbitrum-governance/api';
    }
};
exports.default = getLyraGovernanceSubgraphURI;
//# sourceMappingURL=getLyraGovernanceSubgraphURI.js.map