import { Network } from '../constants/network';
import { Version } from '../lyra';
import getPriceVariance from './getPriceVariance';
export var PriceType;
(function (PriceType) {
    PriceType[PriceType["MIN_PRICE"] = 0] = "MIN_PRICE";
    PriceType[PriceType["MAX_PRICE"] = 1] = "MAX_PRICE";
    PriceType[PriceType["REFERENCE"] = 2] = "REFERENCE";
    PriceType[PriceType["FORCE_MIN"] = 3] = "FORCE_MIN";
    PriceType[PriceType["FORCE_MAX"] = 4] = "FORCE_MAX";
})(PriceType || (PriceType = {}));
export default function getQuoteSpotPrice(market, priceType) {
    // Reference spot price
    const spotPrice = market.params.referenceSpotPrice;
    if (market.lyra.version === Version.Avalon ||
        !market.params.adapterView ||
        priceType === PriceType.REFERENCE ||
        market.lyra.network === Network.Optimism) {
        return spotPrice;
    }
    const gmxAdapterView = market.params.adapterView;
    if (!gmxAdapterView) {
        throw new Error('Mismatching adapter view and getQuoteSpotPrice');
    }
    const { gmxMaxPrice: forceMaxSpotPrice, gmxMinPrice: forceMinSpotPrice, marketPricingParams } = gmxAdapterView;
    const { gmxUsageThreshold } = marketPricingParams;
    const minVariance = getPriceVariance(forceMinSpotPrice, spotPrice);
    const maxVariance = getPriceVariance(forceMaxSpotPrice, spotPrice);
    // In the case where the gmxUsageThreshold is crossed, we want to use the worst case price between cl and gmx
    let useWorstCase = false;
    if (minVariance.gt(gmxUsageThreshold) || maxVariance.gt(gmxUsageThreshold)) {
        useWorstCase = true;
    }
    if (priceType == PriceType.FORCE_MIN || priceType == PriceType.MIN_PRICE) {
        return useWorstCase && forceMinSpotPrice.gt(spotPrice) ? spotPrice : forceMinSpotPrice;
    }
    else {
        return useWorstCase && forceMaxSpotPrice.lt(spotPrice) ? spotPrice : forceMaxSpotPrice;
    }
}
//# sourceMappingURL=getQuoteSpotPrice.js.map