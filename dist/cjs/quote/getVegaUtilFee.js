"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bn_1 = require("../constants/bn");
function getVegaUtilFee(market, preTradeAmmNetStdVega, postTradeAmmNetStdVega, volTraded, size) {
    var NAV = market.params.NAV;
    if (preTradeAmmNetStdVega.abs().gte(postTradeAmmNetStdVega.abs())) {
        return {
            preTradeAmmNetStdVega: preTradeAmmNetStdVega,
            postTradeAmmNetStdVega: postTradeAmmNetStdVega,
            vegaUtil: bn_1.ZERO_BN,
            volTraded: volTraded,
            NAV: NAV,
            vegaUtilFee: bn_1.ZERO_BN,
        };
    }
    var vegaUtil = NAV.gt(0) ? volTraded.mul(postTradeAmmNetStdVega.abs()).div(NAV) : bn_1.ZERO_BN;
    var _vegaUtilFee = market.params.vegaFeeCoefficient.mul(vegaUtil).div(bn_1.UNIT).mul(size).div(bn_1.UNIT);
    var vegaUtilFee = _vegaUtilFee.lt(0) ? bn_1.ZERO_BN : _vegaUtilFee;
    return {
        preTradeAmmNetStdVega: preTradeAmmNetStdVega,
        postTradeAmmNetStdVega: postTradeAmmNetStdVega,
        vegaUtil: vegaUtil,
        volTraded: volTraded,
        NAV: NAV,
        vegaUtilFee: vegaUtilFee,
    };
}
exports.default = getVegaUtilFee;
//# sourceMappingURL=getVegaUtilFee.js.map