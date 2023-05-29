import { CollateralUpdateEvent } from '../collateral_update_event';
import { UNIT, ZERO_BN } from '../constants/bn';
export default function getCollateralUpdatePnl(position, collateralUpdate) {
    var _a;
    const changeAmount = collateralUpdate instanceof CollateralUpdateEvent
        ? collateralUpdate.changeAmount(position)
        : collateralUpdate.collateralChangeAmount();
    const isBaseCollateral = collateralUpdate instanceof CollateralUpdateEvent
        ? collateralUpdate.isBaseCollateral
        : !!((_a = collateralUpdate.collateral) === null || _a === void 0 ? void 0 : _a.isBase);
    if (!isBaseCollateral || changeAmount.gt(0)) {
        // No profitability for stable collateral or adding base collateral
        return ZERO_BN;
    }
    // average spot until collateral update
    const averageSpotPrice = collateralUpdate.prevAverageCollateralSpotPrice(position);
    const spotPrice = position.market().spotPrice;
    // Profit is fair value minus average locked spot price
    return spotPrice.sub(averageSpotPrice).mul(changeAmount).div(UNIT);
}
//# sourceMappingURL=getCollateralUpdatePnl.js.map