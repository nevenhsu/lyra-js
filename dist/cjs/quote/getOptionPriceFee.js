"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bn_1 = require("../constants/bn");
var getTimeWeightedFee_1 = __importDefault(require("./getTimeWeightedFee"));
function getOptionPriceFee(board, pricePerOption, size) {
    var market = board.market();
    var timeWeightedOptionPriceFee = (0, getTimeWeightedFee_1.default)(board.timeToExpiry, market.params.optionPriceFee1xPoint, market.params.optionPriceFee2xPoint, market.params.optionPriceFeeCoefficient);
    return timeWeightedOptionPriceFee.mul(size).div(bn_1.UNIT).mul(pricePerOption).div(bn_1.UNIT);
}
exports.default = getOptionPriceFee;
//# sourceMappingURL=getOptionPriceFee.js.map