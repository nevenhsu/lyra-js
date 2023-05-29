"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chain_1 = require("../constants/chain");
var lyra_1 = require("../lyra");
var getLyraDeploymentSubgraphURI = function (chain, version) {
    switch (chain) {
        case chain_1.Chain.Optimism:
            switch (version) {
                case lyra_1.Version.Avalon:
                    return 'https://subgraph.satsuma-prod.com/d14de8f7fd46/lyra/optimism-mainnet/api';
                case lyra_1.Version.Newport:
                default:
                    return 'https://subgraph.satsuma-prod.com/d14de8f7fd46/lyra/optimism-mainnet-newport/api';
            }
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