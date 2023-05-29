import { MAX_BN, UNIT } from '../constants/bn';
export default function getMaxProfit(trade) {
    if (trade.isCall && trade.isBuy) {
        return MAX_BN;
    }
    else if (trade.isCall && !trade.isBuy) {
        return trade.premium;
    }
    else if (!trade.isCall && trade.isBuy) {
        return trade.strikePrice.sub(trade.pricePerOption).mul(trade.size).div(UNIT);
    }
    else {
        return trade.premium;
    }
}
//# sourceMappingURL=getMaxProfit.js.map