"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var network_1 = require("../constants/network");
function getLyraNetworkForChainId(chainId) {
    switch (chainId) {
        case 42161:
        case 421613:
            return network_1.Network.Arbitrum;
        case 10:
        case 420:
            return network_1.Network.Optimism;
        default:
            throw new Error('Chain ID is not supported by Lyra');
    }
}
exports.default = getLyraNetworkForChainId;
//# sourceMappingURL=getLyraNetworkForChainId.js.map