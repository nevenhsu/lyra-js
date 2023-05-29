"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("..");
var bn_1 = require("../constants/bn");
function getAverageCollateralSpotPrice(position, collateralUpdates) {
    var _a, _b, _c, _d;
    // Skip longs
    if (position.isLong || !position.collateral || !collateralUpdates.length) {
        return bn_1.ZERO_BN;
    }
    // Dollar collateral always $1
    if (!position.collateral.isBase) {
        return bn_1.ONE_BN;
    }
    var firstCollateralUpdate = collateralUpdates[0];
    var firstCollateralAmount = firstCollateralUpdate instanceof __1.CollateralUpdateEvent
        ? firstCollateralUpdate.amount
        : (_b = (_a = firstCollateralUpdate.collateral) === null || _a === void 0 ? void 0 : _a.amount) !== null && _b !== void 0 ? _b : bn_1.ZERO_BN;
    var firstSpotPrice = firstCollateralUpdate instanceof __1.CollateralUpdateEvent
        ? firstCollateralUpdate.spotPrice
        : firstCollateralUpdate.market().spotPrice;
    var currCollateralAmount = firstCollateralAmount;
    var averageSpotPrice = firstSpotPrice;
    for (var _i = 0, _e = collateralUpdates.slice(1); _i < _e.length; _i++) {
        var collateralUpdate = _e[_i];
        var prevCollateralAmount = currCollateralAmount;
        currCollateralAmount =
            collateralUpdate instanceof __1.CollateralUpdateEvent
                ? collateralUpdate.amount
                : (_d = (_c = collateralUpdate.collateral) === null || _c === void 0 ? void 0 : _c.amount) !== null && _d !== void 0 ? _d : bn_1.ZERO_BN;
        var collateralChange = currCollateralAmount.sub(prevCollateralAmount);
        // Update rolling average if adding collateral
        if (collateralChange.gt(0)) {
            var prevTotalValue = averageSpotPrice.mul(prevCollateralAmount).div(bn_1.UNIT);
            var spotPrice = collateralUpdate instanceof __1.CollateralUpdateEvent
                ? collateralUpdate.spotPrice
                : collateralUpdate.market().spotPrice;
            var addedCollateralValue = collateralChange.mul(spotPrice).div(bn_1.UNIT);
            var newTotalValue = prevTotalValue.add(addedCollateralValue);
            averageSpotPrice = newTotalValue.mul(bn_1.UNIT).div(currCollateralAmount);
        }
    }
    return averageSpotPrice;
}
exports.default = getAverageCollateralSpotPrice;
//# sourceMappingURL=getAverageCollateralSpotPrice.js.map