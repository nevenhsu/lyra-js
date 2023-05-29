import { ZERO_BN } from '../constants/bn';
import getPositionPreviousTrades from '../utils/getPositionPreviousTrades';
export default function getTradeEventPreviousSize(position, trade) {
    const trades = getPositionPreviousTrades(position, trade);
    const prevSize = trades.reduce((size, trade) => (trade.isOpen ? size.add(trade.size) : size.sub(trade.size)), ZERO_BN);
    return prevSize;
}
//# sourceMappingURL=getTradeEventPreviousSize.js.map