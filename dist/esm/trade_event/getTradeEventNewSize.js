import getTradeEventPreviousSize from './getTradeEventPreviousSize';
export default function getTradeEventNewSize(position, trade) {
    const prevSize = getTradeEventPreviousSize(position, trade);
    const newSize = trade.isOpen ? prevSize.add(trade.size) : prevSize.sub(trade.size);
    return newSize;
}
//# sourceMappingURL=getTradeEventNewSize.js.map