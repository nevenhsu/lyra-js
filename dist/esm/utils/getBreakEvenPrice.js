export default function getBreakEvenPrice(isCall, strikePrice, optionPrice, isBaseCollateral) {
    return isCall && !isBaseCollateral ? strikePrice.add(optionPrice) : strikePrice.sub(optionPrice);
}
//# sourceMappingURL=getBreakEvenPrice.js.map