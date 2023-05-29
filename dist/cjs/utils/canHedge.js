"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("..");
var canHedgeArbitrum_1 = __importDefault(require("./canHedgeArbitrum"));
var canHedgeOptimism_1 = __importDefault(require("./canHedgeOptimism"));
function canHedge(quoteSpotPrice, netDelta, option, size, increasesPoolDelta, hedgerView, poolHedgerParams, network) {
    switch (network) {
        case __1.Network.Arbitrum:
            return (0, canHedgeArbitrum_1.default)(quoteSpotPrice, netDelta, option, size, increasesPoolDelta, hedgerView, poolHedgerParams);
        case __1.Network.Optimism:
            return (0, canHedgeOptimism_1.default)(quoteSpotPrice, netDelta, option, size, increasesPoolDelta, hedgerView, poolHedgerParams);
    }
}
exports.default = canHedge;
//# sourceMappingURL=canHedge.js.map