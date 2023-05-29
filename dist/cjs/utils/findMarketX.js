"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var findMarket_1 = __importDefault(require("./findMarket"));
function findMarketX(markets, marketAddressOrName) {
    var market = (0, findMarket_1.default)(markets, marketAddressOrName);
    if (!market) {
        throw new Error('Failed to find market');
    }
    return market;
}
exports.default = findMarketX;
//# sourceMappingURL=findMarketX.js.map