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
var getPrice_1 = __importDefault(require("./getPrice"));
var getParity = function (option, spotPrice) {
    var diff = !option.isCall ? option.strike().strikePrice.sub(spotPrice) : spotPrice.sub(option.strike().strikePrice);
    return diff.gt(0) ? diff : bn_1.ZERO_BN;
};
function getForceClosePrice(option, isBuy, spotPrice, newBaseIv, newSkew) {
    var newVol = newBaseIv.mul(newSkew).div(bn_1.UNIT);
    var timeToExpiryAnnualized = (0, getTimeToExpiryAnnualized_1.default)(option.board());
    var market = option.market();
    var rate = market.params.rateAndCarry;
    var isPostCutoff = option.block.timestamp + market.params.tradingCutoff > option.board().expiryTimestamp;
    var forceCloseGwavIv = option.board().params.forceCloseGwavIv;
    var forceCloseSkew = option.strike().params.forceCloseSkew;
    var strikePrice = option.strike().strikePrice;
    var callDelta = (0, toBigNumber_1.default)((0, blackScholes_1.getDelta)(timeToExpiryAnnualized, (0, fromBigNumber_1.default)(newVol), (0, fromBigNumber_1.default)(spotPrice), (0, fromBigNumber_1.default)(strikePrice), (0, fromBigNumber_1.default)(rate), true));
    var minForceCloseDelta = market.params.minForceCloseDelta;
    var isDeltaOutOfRange = callDelta.lte(minForceCloseDelta) || callDelta.gte(bn_1.ONE_BN.sub(minForceCloseDelta));
    if (isPostCutoff || isDeltaOutOfRange) {
        var forceCloseVol = forceCloseGwavIv.mul(forceCloseSkew).div(bn_1.UNIT);
        if (isBuy) {
            forceCloseVol = forceCloseVol.gt(newVol) ? forceCloseVol : newVol;
            forceCloseVol = isPostCutoff
                ? forceCloseVol.mul(market.params.shortPostCutoffVolShock).div(bn_1.UNIT)
                : forceCloseVol.mul(market.params.shortVolShock).div(bn_1.UNIT);
        }
        else {
            forceCloseVol = forceCloseVol.lt(newVol) ? forceCloseVol : newVol;
            forceCloseVol = isPostCutoff
                ? forceCloseVol.mul(market.params.longPostCutoffVolShock).div(bn_1.UNIT)
                : forceCloseVol.mul(market.params.longVolShock).div(bn_1.UNIT);
        }
        var price = (0, toBigNumber_1.default)((0, blackScholes_1.getBlackScholesPrice)(timeToExpiryAnnualized, (0, fromBigNumber_1.default)(forceCloseVol), (0, fromBigNumber_1.default)(spotPrice), (0, fromBigNumber_1.default)(strikePrice), (0, fromBigNumber_1.default)(rate), option.isCall));
        if (isBuy) {
            var parity = getParity(option, spotPrice);
            var factor = spotPrice.mul(market.params.shortSpotMin).div(bn_1.UNIT);
            var minPrice = parity.add(factor);
            price = price.gt(minPrice) ? price : minPrice;
        }
        return {
            volTraded: forceCloseVol,
            price: price,
        };
    }
    else {
        // Default to black scholes pricing
        return (0, getPrice_1.default)(option, spotPrice, newBaseIv, newSkew);
    }
}
exports.default = getForceClosePrice;
//# sourceMappingURL=getForceClosePrice.js.map