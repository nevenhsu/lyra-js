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
function getPrice(option, spotPrice, newBaseIv, newSkew) {
    var timeToExpiryAnnualized = (0, getTimeToExpiryAnnualized_1.default)(option.board());
    var rate = option.market().params.rateAndCarry;
    var newVol = newBaseIv.mul(newSkew).div(bn_1.UNIT);
    var strikePrice = option.strike().strikePrice;
    var price = (0, toBigNumber_1.default)((0, blackScholes_1.getBlackScholesPrice)(timeToExpiryAnnualized, (0, fromBigNumber_1.default)(newVol), (0, fromBigNumber_1.default)(spotPrice), (0, fromBigNumber_1.default)(strikePrice), (0, fromBigNumber_1.default)(rate), option.isCall));
    return {
        price: price,
        volTraded: newVol,
    };
}
exports.default = getPrice;
//# sourceMappingURL=getPrice.js.map