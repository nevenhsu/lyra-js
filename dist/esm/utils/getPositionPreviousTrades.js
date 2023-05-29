export default function getPositionPreviousTrades(position, trade) {
    const trades = position.trades();
    if (!trades.length) {
        return [];
    }
    const closeTradeIndex = trades.findIndex(t => t.transactionHash === trade.transactionHash);
    if (closeTradeIndex === -1) {
        throw new Error('TradeEvent does not exist for position');
    }
    return trades.slice(0, closeTradeIndex);
}
//# sourceMappingURL=getPositionPreviousTrades.js.map