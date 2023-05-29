"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bn_1 = require("../constants/bn");
function getPriceVariance(price, refPrice) {
    return price.mul(bn_1.UNIT).div(refPrice).sub(bn_1.UNIT).abs();
}
exports.default = getPriceVariance;
//# sourceMappingURL=getPriceVariance.js.map