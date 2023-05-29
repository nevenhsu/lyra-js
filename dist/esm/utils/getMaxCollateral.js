import { UNIT } from '../constants/bn';
export default function getMaxCollateral(isCall, strikePrice, postTradeSize, isBaseCollateral) {
    if (isCall) {
        if (isBaseCollateral) {
            // size
            return postTradeSize;
        }
        else {
            // no max collateral for cash-secured calls
            return null;
        }
    }
    else {
        // size * strike
        return postTradeSize.mul(strikePrice).div(UNIT);
    }
}
//# sourceMappingURL=getMaxCollateral.js.map