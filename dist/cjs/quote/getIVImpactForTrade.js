"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bn_1 = require("../constants/bn");
function getIVImpactForTrade(option, baseIv, skew, size, isBuy) {
    var market = option.market();
    var orderSize = size.mul(bn_1.UNIT).div(market.params.standardSize); // 10^18
    var orderMoveBaseIv = orderSize.div(100);
    var orderMoveSkew = orderMoveBaseIv.mul(market.params.skewAdjustmentFactor).div(bn_1.UNIT);
    var newBaseIv = isBuy ? baseIv.add(orderMoveBaseIv) : baseIv.sub(orderMoveBaseIv);
    var newSkew = isBuy ? skew.add(orderMoveSkew) : skew.sub(orderMoveSkew);
    return {
        newBaseIv: newBaseIv,
        newSkew: newSkew,
    };
}
exports.default = getIVImpactForTrade;
//# sourceMappingURL=getIVImpactForTrade.js.map