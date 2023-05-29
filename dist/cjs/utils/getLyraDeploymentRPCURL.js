"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chain_1 = require("../constants/chain");
var getLyraDeploymentRPCURL = function (chain) {
    switch (chain) {
        case chain_1.Chain.Optimism:
            return 'https://mainnet.optimism.io';
        case chain_1.Chain.OptimismGoerli:
            return 'https://goerli.optimism.io';
        case chain_1.Chain.Arbitrum:
            return 'https://arb1.arbitrum.io/rpc';
        case chain_1.Chain.ArbitrumGoerli:
            return 'https://goerli-rollup.arbitrum.io/rpc';
    }
};
exports.default = getLyraDeploymentRPCURL;
//# sourceMappingURL=getLyraDeploymentRPCURL.js.map