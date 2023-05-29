import { UNIT, ZERO_BN } from '../constants/bn';
import { getVega } from '../utils/blackScholes';
import fromBigNumber from '../utils/fromBigNumber';
import getTimeToExpiryAnnualized from '../utils/getTimeToExpiryAnnualized';
import toBigNumber from '../utils/toBigNumber';
export default function getVarianceFee(option, spotPrice, volTraded, newSkew, newBaseIv, size, isForceClose) {
    const market = option.market();
    const coefficient = isForceClose
        ? market.params.forceCloseVarianceFeeCoefficient
        : market.params.defaultVarianceFeeCoefficient;
    const varianceGwavIv = option.board().params.varianceGwavIv;
    const ivVariance = varianceGwavIv.sub(newBaseIv).abs();
    const rate = option.market().params.rateAndCarry;
    const timeToExpiryAnnualized = getTimeToExpiryAnnualized(option.board());
    const vega = toBigNumber(getVega(timeToExpiryAnnualized, fromBigNumber(volTraded), fromBigNumber(spotPrice), fromBigNumber(option.strike().strikePrice), fromBigNumber(rate)) * 100);
    if (coefficient.isZero()) {
        return {
            varianceFeeCoefficient: ZERO_BN,
            vega,
            vegaCoefficient: ZERO_BN,
            skew: newSkew,
            skewCoefficient: ZERO_BN,
            ivVariance,
            ivVarianceCoefficient: ZERO_BN,
            varianceFee: ZERO_BN,
        };
    }
    const vegaCoefficient = market.params.minimumStaticVega.add(vega.mul(market.params.vegaCoefficient).div(UNIT));
    const skewDiff = newSkew.sub(market.params.referenceSkew).abs();
    const skewCoefficient = market.params.minimumStaticSkewAdjustment.add(skewDiff.mul(market.params.skewAdjustmentCoefficient).div(UNIT));
    const ivVarianceCoefficient = market.params.minimumStaticIvVariance.add(ivVariance.mul(market.params.ivVarianceCoefficient).div(UNIT));
    const varianceFee = coefficient
        .mul(vegaCoefficient)
        .div(UNIT)
        .mul(skewCoefficient)
        .div(UNIT)
        .mul(ivVarianceCoefficient)
        .div(UNIT)
        .mul(size)
        .div(UNIT);
    return {
        varianceFeeCoefficient: coefficient,
        vega,
        vegaCoefficient,
        skew: newSkew,
        skewCoefficient,
        ivVariance,
        ivVarianceCoefficient,
        varianceFee,
    };
}
//# sourceMappingURL=getVarianceFee.js.map