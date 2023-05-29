"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriceType = void 0;
var network_1 = require("../constants/network");
var lyra_1 = require("../lyra");
var getPriceVariance_1 = __importDefault(require("./getPriceVariance"));
var PriceType;
(function (PriceType) {
    PriceType[PriceType["MIN_PRICE"] = 0] = "MIN_PRICE";
    PriceType[PriceType["MAX_PRICE"] = 1] = "MAX_PRICE";
    PriceType[PriceType["REFERENCE"] = 2] = "REFERENCE";
    PriceType[PriceType["FORCE_MIN"] = 3] = "FORCE_MIN";
    PriceType[PriceType["FORCE_MAX"] = 4] = "FORCE_MAX";
})(PriceType = exports.PriceType || (exports.PriceType = {}));
function getQuoteSpotPrice(market, priceType) {
    // Reference spot price
    var spotPrice = market.params.referenceSpotPrice;
    if (market.lyra.version === lyra_1.Version.Avalon ||
        !market.params.adapterView ||
        priceType === PriceType.REFERENCE ||
        market.lyra.network === network_1.Network.Optimism) {
        return spotPrice;
    }
    var gmxAdapterView = market.params.adapterView;
    if (!gmxAdapterView) {
        throw new Error('Mismatching adapter view and getQuoteSpotPrice');
    }
    var forceMaxSpotPrice = gmxAdapterView.gmxMaxPrice, forceMinSpotPrice = gmxAdapterView.gmxMinPrice, marketPricingParams = gmxAdapterView.marketPricingParams;
    var gmxUsageThreshold = marketPricingParams.gmxUsageThreshold;
    var minVariance = (0, getPriceVariance_1.default)(forceMinSpotPrice, spotPrice);
    var maxVariance = (0, getPriceVariance_1.default)(forceMaxSpotPrice, spotPrice);
    // In the case where the gmxUsageThreshold is crossed, we want to use the worst case price between cl and gmx
    var useWorstCase = false;
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
exports.default = getQuoteSpotPrice;
//# sourceMappingURL=getQuoteSpotPrice.js.map