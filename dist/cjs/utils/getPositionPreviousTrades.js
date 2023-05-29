"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getPositionPreviousTrades(position, trade) {
    var trades = position.trades();
    var closeTradeIndex = trades.findIndex(function (t) { return t.transactionHash === trade.transactionHash; });
    if (closeTradeIndex === -1) {
        throw new Error('TradeEvent does not exist for position');
    }
    return trades.slice(0, closeTradeIndex);
}
exports.default = getPositionPreviousTrades;
//# sourceMappingURL=getPositionPreviousTrades.js.map