"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bn_1 = require("../constants/bn");
var fromBigNumber_1 = __importDefault(require("./fromBigNumber"));
var getMaxCollateral_1 = __importDefault(require("./getMaxCollateral"));
var getMinCollateralForSpotPrice_1 = __importDefault(require("./getMinCollateralForSpotPrice"));
var MAX_ITERATIONS = 20;
var ACCURACY = 0.001; // 0.1%
var closeToPercentage = function (a, b, percentage) {
    return b.gt(0) ? (0, fromBigNumber_1.default)(b.sub(a).mul(bn_1.UNIT).div(b).abs()) <= percentage : a.eq(b);
}; // zero comparison
function getLiquidationPrice(option, size, collateral, isBaseCollateral) {
    var board = option.board();
    var timeToExpiry = board.timeToExpiry;
    var minCollateral = (0, getMinCollateralForSpotPrice_1.default)(option, size, option.market().spotPrice, isBaseCollateral, true);
    var maxCollateral = (0, getMaxCollateral_1.default)(option.isCall, option.strike().strikePrice, size, isBaseCollateral);
    var isCashSecuredCall = option.isCall && !isBaseCollateral;
    var spotPrice = option.market().spotPrice;
    if (timeToExpiry <= 0 || size.eq(0) || collateral.eq(0)) {
        // Closed position or empty input
        return null;
    }
    else if (maxCollateral && collateral.gte(maxCollateral) && !isCashSecuredCall) {
        // Fully collateralized cash secured puts and covered calls are not liquidatable
        return null;
    }
    else if (collateral.lt(minCollateral)) {
        // Position is immediately liquidatable
        return spotPrice;
    }
    // Acceptable spot price range: 0.2x to 5x spot
    var low = spotPrice.div(5);
    var high = spotPrice.mul(5);
    var n = 0;
    while (low.lt(high) && n < MAX_ITERATIONS) {
        // Search for price liquidation match
        var mid = low.add(high).div(2);
        // Get the largest min collateral value for a given spot price
        var currMinCollateral = (0, getMinCollateralForSpotPrice_1.default)(option, size, mid, isBaseCollateral, true);
        if (option.isCall) {
            if (collateral.lt(currMinCollateral)) {
                high = mid;
            }
            else {
                low = mid;
            }
        }
        else {
            // Search opposite direction for short puts
            if (collateral.lt(currMinCollateral)) {
                low = mid;
            }
            else {
                high = mid;
            }
        }
        n++;
        if (closeToPercentage(currMinCollateral, collateral, ACCURACY)) {
            return mid;
        }
    }
    console.warn('Failed to find liquidation price');
    return low.add(high).div(2);
}
exports.default = getLiquidationPrice;
//# sourceMappingURL=getLiquidationPrice.js.map