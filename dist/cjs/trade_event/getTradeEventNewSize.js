"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var getTradeEventPreviousSize_1 = __importDefault(require("./getTradeEventPreviousSize"));
function getTradeEventNewSize(position, trade) {
    var prevSize = (0, getTradeEventPreviousSize_1.default)(position, trade);
    var newSize = trade.isOpen ? prevSize.add(trade.size) : prevSize.sub(trade.size);
    return newSize;
}
exports.default = getTradeEventNewSize;
//# sourceMappingURL=getTradeEventNewSize.js.map