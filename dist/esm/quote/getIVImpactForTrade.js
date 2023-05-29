import { UNIT } from '../constants/bn';
export default function getIVImpactForTrade(option, baseIv, skew, size, isBuy) {
    const market = option.market();
    const orderSize = size.mul(UNIT).div(market.params.standardSize); // 10^18
    const orderMoveBaseIv = orderSize.div(100);
    const orderMoveSkew = orderMoveBaseIv.mul(market.params.skewAdjustmentFactor).div(UNIT);
    const newBaseIv = isBuy ? baseIv.add(orderMoveBaseIv) : baseIv.sub(orderMoveBaseIv);
    const newSkew = isBuy ? skew.add(orderMoveSkew) : skew.sub(orderMoveSkew);
    return {
        newBaseIv,
        newSkew,
    };
}
//# sourceMappingURL=getIVImpactForTrade.js.map