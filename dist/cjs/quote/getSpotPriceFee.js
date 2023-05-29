"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bn_1 = require("../constants/bn");
var getTimeWeightedFee_1 = __importDefault(require("./getTimeWeightedFee"));
function getSpotPriceFee(board, size, spotPrice) {
    var market = board.market();
    var timeWeightedSpotPriceFee = (0, getTimeWeightedFee_1.default)(board.timeToExpiry, market.params.spotPriceFee1xPoint, market.params.spotPriceFee2xPoint, market.params.spotPriceFeeCoefficient);
    var spotPriceFee = timeWeightedSpotPriceFee.mul(size).div(bn_1.UNIT).mul(spotPrice).div(bn_1.UNIT);
    return spotPriceFee;
}
exports.default = getSpotPriceFee;
//# sourceMappingURL=getSpotPriceFee.js.map