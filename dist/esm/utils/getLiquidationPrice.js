import { UNIT } from '../constants/bn';
import fromBigNumber from './fromBigNumber';
import getMaxCollateral from './getMaxCollateral';
import getMinCollateralForSpotPrice from './getMinCollateralForSpotPrice';
const MAX_ITERATIONS = 20;
const ACCURACY = 0.001; // 0.1%
const closeToPercentage = (a, b, percentage) => b.gt(0) ? fromBigNumber(b.sub(a).mul(UNIT).div(b).abs()) <= percentage : a.eq(b); // zero comparison
export default function getLiquidationPrice(option, size, collateral, isBaseCollateral) {
    const board = option.board();
    const timeToExpiry = board.timeToExpiry;
    const minCollateral = getMinCollateralForSpotPrice(option, size, option.market().spotPrice, isBaseCollateral, true);
    const maxCollateral = getMaxCollateral(option.isCall, option.strike().strikePrice, size, isBaseCollateral);
    const isCashSecuredCall = option.isCall && !isBaseCollateral;
    const spotPrice = option.market().spotPrice;
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
    let low = spotPrice.div(5);
    let high = spotPrice.mul(5);
    let n = 0;
    while (low.lt(high) && n < MAX_ITERATIONS) {
        // Search for price liquidation match
        const mid = low.add(high).div(2);
        // Get the largest min collateral value for a given spot price
        const currMinCollateral = getMinCollateralForSpotPrice(option, size, mid, isBaseCollateral, true);
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
//# sourceMappingURL=getLiquidationPrice.js.map