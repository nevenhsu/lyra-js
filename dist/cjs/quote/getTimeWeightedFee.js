"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bn_1 = require("../constants/bn");
var toBigNumber_1 = __importDefault(require("../utils/toBigNumber"));
function getTimeWeightedFee(timeToExpiry, pointA, pointB, coefficient) {
    if (timeToExpiry <= pointA) {
        return coefficient;
    }
    else {
        var factor = (0, toBigNumber_1.default)(timeToExpiry - pointA)
            .mul(bn_1.UNIT)
            .div(pointB - pointA)
            .div(bn_1.UNIT);
        return coefficient.mul(bn_1.UNIT.add(factor)).div(bn_1.UNIT);
    }
}
exports.default = getTimeWeightedFee;
//# sourceMappingURL=getTimeWeightedFee.js.map