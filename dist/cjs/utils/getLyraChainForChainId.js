"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chain_1 = require("../constants/chain");
var getLyraChainForChainId = function (chainId) {
    switch (chainId) {
        case 420:
            return chain_1.Chain.OptimismGoerli;
        case 421613:
            return chain_1.Chain.ArbitrumGoerli;
        case 10:
            return chain_1.Chain.Optimism;
        case 42161:
            return chain_1.Chain.Arbitrum;
        default:
            throw new Error('Chain ID is not supported by Lyra');
    }
};
exports.default = getLyraChainForChainId;
//# sourceMappingURL=getLyraChainForChainId.js.map