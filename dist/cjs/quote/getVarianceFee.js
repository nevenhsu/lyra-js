"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bn_1 = require("../constants/bn");
var blackScholes_1 = require("../utils/blackScholes");
var fromBigNumber_1 = __importDefault(require("../utils/fromBigNumber"));
var getTimeToExpiryAnnualized_1 = __importDefault(require("../utils/getTimeToExpiryAnnualized"));
var toBigNumber_1 = __importDefault(require("../utils/toBigNumber"));
function getVarianceFee(option, spotPrice, volTraded, newSkew, newBaseIv, size, isForceClose) {
    var market = option.market();
    var coefficient = isForceClose
        ? market.params.forceCloseVarianceFeeCoefficient
        : market.params.defaultVarianceFeeCoefficient;
    var varianceGwavIv = option.board().params.varianceGwavIv;
    var ivVariance = varianceGwavIv.sub(newBaseIv).abs();
    var rate = option.market().params.rateAndCarry;
    var timeToExpiryAnnualized = (0, getTimeToExpiryAnnualized_1.default)(option.board());
    var vega = (0, toBigNumber_1.default)((0, blackScholes_1.getVega)(timeToExpiryAnnualized, (0, fromBigNumber_1.default)(volTraded), (0, fromBigNumber_1.default)(spotPrice), (0, fromBigNumber_1.default)(option.strike().strikePrice), (0, fromBigNumber_1.default)(rate)) * 100);
    if (coefficient.isZero()) {
        return {
            varianceFeeCoefficient: bn_1.ZERO_BN,
            vega: vega,
            vegaCoefficient: bn_1.ZERO_BN,
            skew: newSkew,
            skewCoefficient: bn_1.ZERO_BN,
            ivVariance: ivVariance,
            ivVarianceCoefficient: bn_1.ZERO_BN,
            varianceFee: bn_1.ZERO_BN,
        };
    }
    var vegaCoefficient = market.params.minimumStaticVega.add(vega.mul(market.params.vegaCoefficient).div(bn_1.UNIT));
    var skewDiff = newSkew.sub(market.params.referenceSkew).abs();
    var skewCoefficient = market.params.minimumStaticSkewAdjustment.add(skewDiff.mul(market.params.skewAdjustmentCoefficient).div(bn_1.UNIT));
    var ivVarianceCoefficient = market.params.minimumStaticIvVariance.add(ivVariance.mul(market.params.ivVarianceCoefficient).div(bn_1.UNIT));
    var varianceFee = coefficient
        .mul(vegaCoefficient)
        .div(bn_1.UNIT)
        .mul(skewCoefficient)
        .div(bn_1.UNIT)
        .mul(ivVarianceCoefficient)
        .div(bn_1.UNIT)
        .mul(size)
        .div(bn_1.UNIT);
    return {
        varianceFeeCoefficient: coefficient,
        vega: vega,
        vegaCoefficient: vegaCoefficient,
        skew: newSkew,
        skewCoefficient: skewCoefficient,
        ivVariance: ivVariance,
        ivVarianceCoefficient: ivVarianceCoefficient,
        varianceFee: varianceFee,
    };
}
exports.default = getVarianceFee;
//# sourceMappingURL=getVarianceFee.js.map