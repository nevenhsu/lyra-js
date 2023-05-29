import { UNIT, ZERO_BN } from '../constants/bn';
import getLiquidationPrice from '../utils/getLiquidationPrice';
import getMaxCollateral from '../utils/getMaxCollateral';
import getMinCollateralForSpotPrice from '../utils/getMinCollateralForSpotPrice';
export default function getPositionCollateral(option, size, collateral, isBaseCollateral) {
    var _a;
    const strike = option.strike();
    const board = option.board();
    const market = option.market();
    const spotPrice = board.isExpired ? (_a = board.spotPriceAtExpiry) !== null && _a !== void 0 ? _a : ZERO_BN : market.spotPrice;
    return {
        amount: collateral,
        value: isBaseCollateral ? collateral.mul(spotPrice).div(UNIT) : collateral,
        min: getMinCollateralForSpotPrice(option, size, spotPrice, isBaseCollateral),
        max: getMaxCollateral(option.isCall, strike.strikePrice, size, isBaseCollateral),
        isBase: option.isCall ? !!isBaseCollateral : false,
        liquidationPrice: getLiquidationPrice(option, size, collateral, isBaseCollateral),
    };
}
//# sourceMappingURL=getPositionCollateral.js.map