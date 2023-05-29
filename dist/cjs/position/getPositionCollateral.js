"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bn_1 = require("../constants/bn");
var getLiquidationPrice_1 = __importDefault(require("../utils/getLiquidationPrice"));
var getMaxCollateral_1 = __importDefault(require("../utils/getMaxCollateral"));
var getMinCollateralForSpotPrice_1 = __importDefault(require("../utils/getMinCollateralForSpotPrice"));
function getPositionCollateral(option, size, collateral, isBaseCollateral) {
    var _a;
    var strike = option.strike();
    var board = option.board();
    var market = option.market();
    var spotPrice = board.isExpired ? (_a = board.spotPriceAtExpiry) !== null && _a !== void 0 ? _a : bn_1.ZERO_BN : market.spotPrice;
    return {
        amount: collateral,
        value: isBaseCollateral ? collateral.mul(spotPrice).div(bn_1.UNIT) : collateral,
        min: (0, getMinCollateralForSpotPrice_1.default)(option, size, spotPrice, isBaseCollateral),
        max: (0, getMaxCollateral_1.default)(option.isCall, strike.strikePrice, size, isBaseCollateral),
        isBase: option.isCall ? !!isBaseCollateral : false,
        liquidationPrice: (0, getLiquidationPrice_1.default)(option, size, collateral, isBaseCollateral),
    };
}
exports.default = getPositionCollateral;
//# sourceMappingURL=getPositionCollateral.js.map