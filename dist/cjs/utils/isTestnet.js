"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("../");
function isTestnet(lyra) {
    switch (lyra.chain) {
        case __1.Chain.Arbitrum:
        case __1.Chain.Optimism:
            return false;
        case __1.Chain.ArbitrumGoerli:
        case __1.Chain.OptimismGoerli:
            return true;
    }
}
exports.default = isTestnet;
//# sourceMappingURL=isTestnet.js.map