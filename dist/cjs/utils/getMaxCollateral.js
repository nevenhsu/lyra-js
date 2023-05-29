"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bn_1 = require("../constants/bn");
function getMaxCollateral(isCall, strikePrice, postTradeSize, isBaseCollateral) {
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
        return postTradeSize.mul(strikePrice).div(bn_1.UNIT);
    }
}
exports.default = getMaxCollateral;
//# sourceMappingURL=getMaxCollateral.js.map