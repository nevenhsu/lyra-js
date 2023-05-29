"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chain_1 = require("../constants/chain");
var getLyraChainIdForChain = function (chain) {
    switch (chain) {
        case chain_1.Chain.OptimismGoerli:
            return 420;
        case chain_1.Chain.ArbitrumGoerli:
            return 421613;
        case chain_1.Chain.Optimism:
            return 10;
        case chain_1.Chain.Arbitrum:
            return 42161;
        default:
            throw new Error('Chain is not supported by Lyra');
    }
};
exports.default = getLyraChainIdForChain;
//# sourceMappingURL=getLyraChainIdForChain.js.map