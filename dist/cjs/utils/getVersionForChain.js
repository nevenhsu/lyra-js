"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("..");
function getVersionForChain(network) {
    switch (network) {
        case __1.Network.Arbitrum:
            return __1.Version.Newport;
        case __1.Network.Optimism:
            return __1.Version.Avalon;
    }
}
exports.default = getVersionForChain;
//# sourceMappingURL=getVersionForChain.js.map