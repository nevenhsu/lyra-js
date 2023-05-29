"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var collateral_update_event_1 = require("../collateral_update_event");
var bn_1 = require("../constants/bn");
function getCollateralUpdatePnl(position, collateralUpdate) {
    var _a;
    var changeAmount = collateralUpdate instanceof collateral_update_event_1.CollateralUpdateEvent
        ? collateralUpdate.changeAmount(position)
        : collateralUpdate.collateralChangeAmount();
    var isBaseCollateral = collateralUpdate instanceof collateral_update_event_1.CollateralUpdateEvent
        ? collateralUpdate.isBaseCollateral
        : !!((_a = collateralUpdate.collateral) === null || _a === void 0 ? void 0 : _a.isBase);
    if (!isBaseCollateral || changeAmount.gt(0)) {
        // No profitability for stable collateral or adding base collateral
        return bn_1.ZERO_BN;
    }
    // average spot until collateral update
    var averageSpotPrice = collateralUpdate.prevAverageCollateralSpotPrice(position);
    var spotPrice = position.market().spotPrice;
    // Profit is fair value minus average locked spot price
    return spotPrice.sub(averageSpotPrice).mul(changeAmount).div(bn_1.UNIT);
}
exports.default = getCollateralUpdatePnl;
//# sourceMappingURL=getCollateralUpdatePnl.js.map