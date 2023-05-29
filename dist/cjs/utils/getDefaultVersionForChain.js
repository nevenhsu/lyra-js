"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("..");
function getDefaultVersionForChain(chain) {
    switch (chain) {
        case __1.Chain.Arbitrum:
        case __1.Chain.ArbitrumGoerli:
        case __1.Chain.Optimism:
        case __1.Chain.OptimismGoerli:
            return __1.Version.Newport;
    }
}
exports.default = getDefaultVersionForChain;
//# sourceMappingURL=getDefaultVersionForChain.js.map