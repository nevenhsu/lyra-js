"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRho = exports.getTheta = exports.getGamma = exports.getVega = exports.getDelta = exports.getBlackScholesPrice = exports.putPrice = exports.callPrice = exports.PV = exports.d2 = exports.d1 = exports.stdNormal = exports.stdNormalCDF = void 0;
function erf(x) {
    // constants
    var a1 = 0.254829592;
    var a2 = -0.284496736;
    var a3 = 1.421413741;
    var a4 = -1.453152027;
    var a5 = 1.061405429;
    var p = 0.3275911;
    // Save the sign of x
    var sign = 1;
    if (x < 0) {
        sign = -1;
    }
    x = Math.abs(x);
    // A&S formula 7.1.26
    var t = 1.0 / (1.0 + p * x);
    var y = 1.0 - ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
    return sign * y;
}
function stdNormalCDF(x) {
    return (1.0 - erf(-x / Math.sqrt(2))) / 2.0;
}
exports.stdNormalCDF = stdNormalCDF;
function stdNormal(x) {
    return Math.exp((-x * x) / 2.0) / Math.sqrt(2.0 * Math.PI);
}
exports.stdNormal = stdNormal;
function d1(tAnnualised, vol, spot, strikePrice, rate) {
    return (Math.log(spot / strikePrice) + (rate + (vol * vol) / 2.0) * tAnnualised) / (vol * Math.sqrt(tAnnualised));
}
exports.d1 = d1;
function d2(tAnnualised, vol, spot, strikePrice, rate) {
    return d1(tAnnualised, vol, spot, strikePrice, rate) - vol * Math.sqrt(tAnnualised);
}
exports.d2 = d2;
function PV(value, rate, tAnnualised) {
    return value * Math.exp(-rate * tAnnualised);
}
exports.PV = PV;
function callPrice(tAnnualised, vol, spot, strikePrice, rate) {
    return (stdNormalCDF(d1(tAnnualised, vol, spot, strikePrice, rate)) * spot -
        stdNormalCDF(d2(tAnnualised, vol, spot, strikePrice, rate)) * PV(strikePrice, rate, tAnnualised));
}
exports.callPrice = callPrice;
function putPrice(tAnnualised, vol, spot, strikePrice, rate) {
    return (stdNormalCDF(-d2(tAnnualised, vol, spot, strikePrice, rate)) * PV(strikePrice, rate, tAnnualised) -
        stdNormalCDF(-d1(tAnnualised, vol, spot, strikePrice, rate)) * spot);
}
exports.putPrice = putPrice;
function getBlackScholesPrice(tAnnualised, vol, spot, strikePrice, rate, isCall) {
    return isCall
        ? callPrice(tAnnualised, vol, spot, strikePrice, rate)
        : putPrice(tAnnualised, vol, spot, strikePrice, rate);
}
exports.getBlackScholesPrice = getBlackScholesPrice;
function callDelta(tAnnualised, vol, spot, strikePrice, rate) {
    return stdNormalCDF(d1(tAnnualised, vol, spot, strikePrice, rate));
}
function putDelta(tAnnualised, vol, spot, strikePrice, rate) {
    return callDelta(tAnnualised, vol, spot, strikePrice, rate) - 1.0;
}
function getDelta(tAnnualised, vol, spot, strikePrice, rate, isCall) {
    return isCall
        ? callDelta(tAnnualised, vol, spot, strikePrice, rate)
        : putDelta(tAnnualised, vol, spot, strikePrice, rate);
}
exports.getDelta = getDelta;
function getVega(tAnnualised, vol, spot, strikePrice, rate) {
    return (spot * stdNormal(d1(tAnnualised, vol, spot, strikePrice, rate)) * Math.sqrt(tAnnualised)) / 100;
}
exports.getVega = getVega;
function getGamma(tAnnualised, vol, spot, strikePrice, rate) {
    return stdNormal(d1(tAnnualised, vol, spot, strikePrice, rate)) / (spot * vol * Math.sqrt(tAnnualised));
}
exports.getGamma = getGamma;
function getTheta(tAnnualized, vol, spot, strikePrice, rate, isCall) {
    if (isCall) {
        return (((-spot * stdNormal(d1(tAnnualized, vol, spot, strikePrice, rate)) * vol) / (2 * Math.sqrt(tAnnualized)) -
            rate *
                strikePrice *
                Math.exp(-rate * tAnnualized) *
                stdNormalCDF(d2(tAnnualized, vol, spot, strikePrice, rate))) /
            365);
    }
    else {
        return (((-spot * stdNormal(d1(tAnnualized, vol, spot, strikePrice, rate)) * vol) / (2 * Math.sqrt(tAnnualized)) +
            rate *
                strikePrice *
                Math.exp(-rate * tAnnualized) *
                stdNormalCDF(-d2(tAnnualized, vol, spot, strikePrice, rate))) /
            365);
    }
}
exports.getTheta = getTheta;
function getRho(tAnnualised, vol, spot, strikePrice, rate, isCall) {
    if (isCall) {
        return ((strikePrice *
            tAnnualised *
            Math.exp(-rate * tAnnualised) *
            stdNormalCDF(d2(tAnnualised, vol, spot, strikePrice, rate))) /
            100);
    }
    else {
        return ((-strikePrice *
            tAnnualised *
            Math.exp(-rate * tAnnualised) *
            stdNormalCDF(-d2(tAnnualised, vol, spot, strikePrice, rate))) /
            100);
    }
}
exports.getRho = getRho;
//# sourceMappingURL=blackScholes.js.map