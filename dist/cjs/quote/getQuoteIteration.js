"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bn_1 = require("../constants/bn");
var getForceClosePrice_1 = __importDefault(require("./getForceClosePrice"));
var getIVImpactForTrade_1 = __importDefault(require("./getIVImpactForTrade"));
var getOptionPriceFee_1 = __importDefault(require("./getOptionPriceFee"));
var getPrice_1 = __importDefault(require("./getPrice"));
var getSpotPriceFee_1 = __importDefault(require("./getSpotPriceFee"));
var getVarianceFee_1 = __importDefault(require("./getVarianceFee"));
var getVegaUtilFee_1 = __importDefault(require("./getVegaUtilFee"));
function getQuoteIteration(_a) {
    var option = _a.option, isBuy = _a.isBuy, size = _a.size, spotPrice = _a.spotPrice, baseIv = _a.baseIv, skew = _a.skew, netStdVega = _a.netStdVega, preTradeAmmNetStdVega = _a.preTradeAmmNetStdVega, isForceClose = _a.isForceClose;
    // Post-impact iv and skew
    var _b = (0, getIVImpactForTrade_1.default)(option, baseIv, skew, size, isBuy), proposedNewBaseIv = _b.newBaseIv, newSkew = _b.newSkew;
    // Calculate (force close) base bsc price per option
    var basePriceData = (0, getPrice_1.default)(option, spotPrice, proposedNewBaseIv, newSkew);
    var _c = isForceClose
        ? (0, getForceClosePrice_1.default)(option, isBuy, spotPrice, proposedNewBaseIv, newSkew)
        : basePriceData, price = _c.price, volTraded = _c.volTraded;
    var basePrice = basePriceData.price;
    // Penalty
    var forceClosePenalty = price
        .sub(basePrice)
        .mul(size)
        .div(bn_1.UNIT)
        .mul(isBuy ? 1 : -1);
    // Option fee
    var optionPriceFee = (0, getOptionPriceFee_1.default)(option.board(), price, size);
    // Spot fee
    var spotPriceFee = (0, getSpotPriceFee_1.default)(option.board(), size, spotPrice);
    // Update AMM net standard vega
    var netStdVegaDiff = netStdVega
        .mul(size)
        .mul(isBuy ? 1 : -1)
        .div(bn_1.UNIT);
    var postTradeAmmNetStdVega = preTradeAmmNetStdVega.add(netStdVegaDiff);
    // Vega util fee
    var vegaUtilFee = (0, getVegaUtilFee_1.default)(option.market(), preTradeAmmNetStdVega, postTradeAmmNetStdVega, volTraded, size);
    // Skip baseIv update on force close
    var newBaseIv = isForceClose ? baseIv : proposedNewBaseIv;
    // Variance fee
    var varianceFee = (0, getVarianceFee_1.default)(option, spotPrice, volTraded, newSkew, newBaseIv, size, isForceClose);
    // Total fees
    var fees = optionPriceFee.add(spotPriceFee).add(vegaUtilFee.vegaUtilFee).add(varianceFee.varianceFee);
    // Add fees for buys, subtract fees for sells
    var base = price.mul(size).div(bn_1.UNIT);
    var premium = isBuy ? base.add(fees) : fees.lt(base) ? base.sub(fees) : bn_1.ZERO_BN;
    return {
        premium: premium,
        optionPriceFee: optionPriceFee,
        spotPriceFee: spotPriceFee,
        vegaUtilFee: vegaUtilFee,
        varianceFee: varianceFee,
        forceClosePenalty: forceClosePenalty,
        postTradeAmmNetStdVega: postTradeAmmNetStdVega,
        volTraded: volTraded,
        newSkew: newSkew,
        newBaseIv: newBaseIv,
        spotPrice: spotPrice,
    };
}
exports.default = getQuoteIteration;
//# sourceMappingURL=getQuoteIteration.js.map