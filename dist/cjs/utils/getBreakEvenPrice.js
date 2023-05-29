"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getBreakEvenPrice(isCall, strikePrice, optionPrice, isBaseCollateral) {
    return isCall && !isBaseCollateral ? strikePrice.add(optionPrice) : strikePrice.sub(optionPrice);
}
exports.default = getBreakEvenPrice;
//# sourceMappingURL=getBreakEvenPrice.js.map