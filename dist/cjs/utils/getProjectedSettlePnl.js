"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bn_1 = require("../constants/bn");
// Base calculation for an option payoff
// Set baseCollateralOptions to account for partially collateralized covered calls
function getProjectedSettlePnl(isLong, isCall, strikePrice, spotPriceAtExpiry, pricePerOption, size, liquidationPrice) {
    if (isLong) {
        if (isCall) {
            // Long call
            return (spotPriceAtExpiry.gte(strikePrice)
                ? // ITM
                    spotPriceAtExpiry.sub(strikePrice).sub(pricePerOption)
                : // OTM
                    pricePerOption.mul(-1))
                .mul(size)
                .div(bn_1.UNIT);
        }
        else {
            // Long put
            return (spotPriceAtExpiry.lte(strikePrice)
                ? // ITM
                    strikePrice.sub(spotPriceAtExpiry).sub(pricePerOption)
                : // OTM
                    pricePerOption.mul(-1))
                .mul(size)
                .div(bn_1.UNIT);
        }
    }
    else {
        if (isCall) {
            return (liquidationPrice && spotPriceAtExpiry.gte(liquidationPrice)
                ? pricePerOption.sub(spotPriceAtExpiry) // Liquidation (max loss)
                : spotPriceAtExpiry.lte(strikePrice)
                    ? // OTM
                        pricePerOption
                    : // ITM
                        pricePerOption.sub(spotPriceAtExpiry).add(strikePrice))
                .mul(size)
                .div(bn_1.UNIT);
        }
        else {
            // Cash secured put
            return (liquidationPrice && spotPriceAtExpiry.lte(liquidationPrice)
                ? pricePerOption.sub(strikePrice) // Liquidation (max loss)
                : spotPriceAtExpiry.lte(strikePrice)
                    ? // ITM
                        spotPriceAtExpiry.sub(strikePrice).add(pricePerOption)
                    : // OTM
                        pricePerOption)
                .mul(size)
                .div(bn_1.UNIT);
        }
    }
}
exports.default = getProjectedSettlePnl;
//# sourceMappingURL=getProjectedSettlePnl.js.map