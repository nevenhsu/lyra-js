"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chain_1 = require("../constants/chain");
var network_1 = require("../constants/network");
function getLyraNetworkForChain(chain) {
    switch (chain) {
        case chain_1.Chain.Arbitrum:
        case chain_1.Chain.ArbitrumGoerli:
            return network_1.Network.Arbitrum;
        case chain_1.Chain.Optimism:
        case chain_1.Chain.OptimismGoerli:
            return network_1.Network.Optimism;
    }
}
exports.default = getLyraNetworkForChain;
//# sourceMappingURL=getLyraNetworkForChain.js.map