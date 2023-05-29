"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var address_1 = require("@ethersproject/address");
var parseBaseSymbol_1 = __importDefault(require("./parseBaseSymbol"));
function isMarketEqual(market, marketAddressOrName) {
    if ((0, address_1.isAddress)(marketAddressOrName)) {
        return market.address === (0, address_1.getAddress)(marketAddressOrName);
    }
    else {
        return market.baseToken.symbol.toLowerCase() === (0, parseBaseSymbol_1.default)(market.lyra, marketAddressOrName).toLowerCase();
    }
}
exports.default = isMarketEqual;
//# sourceMappingURL=isMarketEqual.js.map