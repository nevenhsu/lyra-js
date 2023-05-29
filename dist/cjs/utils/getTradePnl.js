"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bn_1 = require("../constants/bn");
var trade_event_1 = require("../trade_event");
function getTradePnl(position, trade) {
    if (trade.isOpen) {
        return bn_1.ZERO_BN;
    }
    var size = trade.size;
    var isLong = trade.isLong;
    var pricePerOption = trade.pricePerOption;
    var averageCostPerOption = trade instanceof trade_event_1.TradeEvent ? trade.prevAverageCostPerOption(position) : trade.prevAverageCostPerOption();
    // For longs, profit is fair value minus average premiums paid
    // For shorts, profit is average premiums received minus fair value
    return (isLong ? pricePerOption.sub(averageCostPerOption) : averageCostPerOption.sub(pricePerOption))
        .mul(size)
        .div(bn_1.UNIT);
}
exports.default = getTradePnl;
//# sourceMappingURL=getTradePnl.js.map