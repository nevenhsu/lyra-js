"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMinStaticCollateral = void 0;
var bignumber_1 = require("@ethersproject/bignumber");
var bn_1 = require("../constants/bn");
var blackScholes_1 = require("./blackScholes");
var fromBigNumber_1 = __importDefault(require("./fromBigNumber"));
var getTimeToExpiryAnnualized_1 = __importDefault(require("./getTimeToExpiryAnnualized"));
var toBigNumber_1 = __importDefault(require("./toBigNumber"));
var getShockVol = function (marketParams, _timeToExpiry, isMaxMinCollateral) {
    if (isMaxMinCollateral) {
        // Default to largest shock vol
        return marketParams.shockVolA;
    }
    var timeToExpiry = bignumber_1.BigNumber.from(_timeToExpiry);
    if (timeToExpiry.lte(marketParams.shockVolPointA)) {
        return marketParams.shockVolA;
    }
    if (timeToExpiry.gte(marketParams.shockVolPointB)) {
        return marketParams.shockVolB;
    }
    var shockVolDiff = marketParams.shockVolA.sub(marketParams.shockVolB);
    var timeToMaturityShockVolPointA = timeToExpiry.sub(marketParams.shockVolPointA);
    return marketParams.shockVolA.sub(shockVolDiff.mul(timeToMaturityShockVolPointA).div(marketParams.shockVolPointB.sub(marketParams.shockVolPointA)));
};
var getMinStaticCollateral = function (market, isBaseCollateral) {
    return isBaseCollateral ? market.params.minStaticBaseCollateral : market.params.minStaticQuoteCollateral;
};
exports.getMinStaticCollateral = getMinStaticCollateral;
function getMinCollateralForSpotPrice(option, size, spotPrice, isBaseCollateral, 
// Use largest min collateral that will ever be required (informs liquidation price)
isMaxMinCollateral) {
    var timeToExpiry = option.board().timeToExpiry;
    var timeToExpiryAnnualized = (0, getTimeToExpiryAnnualized_1.default)(option.board());
    if (timeToExpiryAnnualized === 0) {
        return bn_1.ZERO_BN;
    }
    var market = option.market();
    var shockSpotPrice = option.isCall
        ? spotPrice.mul(market.params.callSpotPriceShock).div(bn_1.UNIT)
        : spotPrice.mul(market.params.putSpotPriceShock).div(bn_1.UNIT);
    var rate = option.market().params.rateAndCarry;
    var shockOptionPrice = (0, toBigNumber_1.default)((0, blackScholes_1.getBlackScholesPrice)(timeToExpiryAnnualized, (0, fromBigNumber_1.default)(getShockVol(market.params, timeToExpiry, isMaxMinCollateral)), (0, fromBigNumber_1.default)(shockSpotPrice), (0, fromBigNumber_1.default)(option.strike().strikePrice), (0, fromBigNumber_1.default)(rate), option.isCall));
    var fullCollat;
    var volCollat;
    var staticCollat = (0, exports.getMinStaticCollateral)(option.market(), isBaseCollateral);
    if (option.isCall) {
        if (isBaseCollateral) {
            volCollat = shockOptionPrice.mul(size).div(shockSpotPrice);
            fullCollat = size;
        }
        else {
            volCollat = shockOptionPrice.mul(size).div(bn_1.UNIT);
            fullCollat = bn_1.MAX_BN;
        }
    }
    else {
        volCollat = shockOptionPrice.mul(size).div(bn_1.UNIT);
        fullCollat = option.strike().strikePrice.mul(size).div(bn_1.UNIT);
    }
    var maxCollat = volCollat.gt(staticCollat) ? volCollat : staticCollat;
    var minCollat = maxCollat.lt(fullCollat) ? maxCollat : fullCollat;
    return minCollat;
}
exports.default = getMinCollateralForSpotPrice;
//# sourceMappingURL=getMinCollateralForSpotPrice.js.map