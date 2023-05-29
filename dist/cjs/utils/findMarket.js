"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var isMarketEqual_1 = __importDefault(require("./isMarketEqual"));
function findMarket(markets, marketAddressOrName) {
    var market = Object.values(markets).find(function (market) { return (0, isMarketEqual_1.default)(market, marketAddressOrName); });
    return market !== null && market !== void 0 ? market : null;
}
exports.default = findMarket;
//# sourceMappingURL=findMarket.js.map