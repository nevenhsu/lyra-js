"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chain_1 = require("../constants/chain");
var getLyraDeploymentSubgraphURI = function (chain) {
    switch (chain) {
        case chain_1.Chain.Optimism:
            return 'https://subgraph.satsuma-prod.com/d14de8f7fd46/lyra/optimism-mainnet/api';
        case chain_1.Chain.OptimismGoerli:
            return 'https://subgraph.satsuma-prod.com/d14de8f7fd46/lyra/optimism-goerli/api';
        case chain_1.Chain.Arbitrum:
            return 'https://subgraph.satsuma-prod.com/d14de8f7fd46/lyra/arbitrum-mainnet/api';
        case chain_1.Chain.ArbitrumGoerli:
            return 'https://subgraph.satsuma-prod.com/d14de8f7fd46/lyra/arbitrum-goerli/api';
    }
};
exports.default = getLyraDeploymentSubgraphURI;
//# sourceMappingURL=getLyraDeploymentSubgraphURI.js.map