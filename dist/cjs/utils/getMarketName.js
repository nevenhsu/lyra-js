"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getMarketName(_baseSymbol, quoteSymbol) {
    var baseSymbol = _baseSymbol;
    if (baseSymbol.toLowerCase() === 'weth') {
        baseSymbol = 'ETH';
    }
    return "".concat(baseSymbol, "-").concat(quoteSymbol);
}
exports.default = getMarketName;
//# sourceMappingURL=getMarketName.js.map