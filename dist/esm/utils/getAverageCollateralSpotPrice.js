import { CollateralUpdateEvent } from '..';
import { ONE_BN, UNIT, ZERO_BN } from '../constants/bn';
export default function getAverageCollateralSpotPrice(position, collateralUpdates) {
    var _a, _b, _c, _d;
    // Skip longs
    if (position.isLong || !position.collateral || !collateralUpdates.length) {
        return ZERO_BN;
    }
    // Dollar collateral always $1
    if (!position.collateral.isBase) {
        return ONE_BN;
    }
    const firstCollateralUpdate = collateralUpdates[0];
    const firstCollateralAmount = firstCollateralUpdate instanceof CollateralUpdateEvent
        ? firstCollateralUpdate.amount
        : (_b = (_a = firstCollateralUpdate.collateral) === null || _a === void 0 ? void 0 : _a.amount) !== null && _b !== void 0 ? _b : ZERO_BN;
    const firstSpotPrice = firstCollateralUpdate instanceof CollateralUpdateEvent
        ? firstCollateralUpdate.spotPrice
        : firstCollateralUpdate.market().spotPrice;
    let currCollateralAmount = firstCollateralAmount;
    let averageSpotPrice = firstSpotPrice;
    for (const collateralUpdate of collateralUpdates.slice(1)) {
        const prevCollateralAmount = currCollateralAmount;
        currCollateralAmount =
            collateralUpdate instanceof CollateralUpdateEvent
                ? collateralUpdate.amount
                : (_d = (_c = collateralUpdate.collateral) === null || _c === void 0 ? void 0 : _c.amount) !== null && _d !== void 0 ? _d : ZERO_BN;
        const collateralChange = currCollateralAmount.sub(prevCollateralAmount);
        // Update rolling average if adding collateral
        if (collateralChange.gt(0)) {
            const prevTotalValue = averageSpotPrice.mul(prevCollateralAmount).div(UNIT);
            const spotPrice = collateralUpdate instanceof CollateralUpdateEvent
                ? collateralUpdate.spotPrice
                : collateralUpdate.market().spotPrice;
            const addedCollateralValue = collateralChange.mul(spotPrice).div(UNIT);
            const newTotalValue = prevTotalValue.add(addedCollateralValue);
            averageSpotPrice = newTotalValue.mul(UNIT).div(currCollateralAmount);
        }
    }
    return averageSpotPrice;
}
//# sourceMappingURL=getAverageCollateralSpotPrice.js.map