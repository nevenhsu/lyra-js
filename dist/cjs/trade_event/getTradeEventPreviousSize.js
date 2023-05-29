"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bn_1 = require("../constants/bn");
var getPositionPreviousTrades_1 = __importDefault(require("../utils/getPositionPreviousTrades"));
function getTradeEventPreviousSize(position, trade) {
    var trades = (0, getPositionPreviousTrades_1.default)(position, trade);
    var prevSize = trades.reduce(function (size, trade) { return (trade.isOpen ? size.add(trade.size) : size.sub(trade.size)); }, bn_1.ZERO_BN);
    return prevSize;
}
exports.default = getTradeEventPreviousSize;
//# sourceMappingURL=getTradeEventPreviousSize.js.map