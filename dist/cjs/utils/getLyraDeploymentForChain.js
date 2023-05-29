"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chain_1 = require("../constants/chain");
var contracts_1 = require("../constants/contracts");
var getLyraDeploymentForChain = function (chain) {
    switch (chain) {
        case chain_1.Chain.Arbitrum:
        case chain_1.Chain.Optimism:
            return contracts_1.Deployment.Mainnet;
        case chain_1.Chain.OptimismGoerli:
        case chain_1.Chain.ArbitrumGoerli:
            return contracts_1.Deployment.Testnet;
    }
};
exports.default = getLyraDeploymentForChain;
//# sourceMappingURL=getLyraDeploymentForChain.js.map