"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getQuoteSpotPrice_1 = require("./getQuoteSpotPrice");
function getPriceType(isCall, isForceClose, isLong, isOpen) {
    // LONG_CALL or SHORT_PUT
    if ((isLong && isCall) || (!isLong && !isCall)) {
        return isOpen ? getQuoteSpotPrice_1.PriceType.MAX_PRICE : isForceClose ? getQuoteSpotPrice_1.PriceType.FORCE_MIN : getQuoteSpotPrice_1.PriceType.MIN_PRICE;
    }
    else {
        return isOpen ? getQuoteSpotPrice_1.PriceType.MIN_PRICE : isForceClose ? getQuoteSpotPrice_1.PriceType.FORCE_MAX : getQuoteSpotPrice_1.PriceType.MAX_PRICE;
    }
}
exports.default = getPriceType;
//# sourceMappingURL=getPriceType.js.map