"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getMarketName(_baseSymbol, quoteSymbol) {
    var baseSymbol = _baseSymbol;
    switch (baseSymbol.toLowerCase()) {
        case 'weth':
            baseSymbol = 'ETH';
            break;
        case 'lyarb':
            baseSymbol = 'ARB';
            break;
    }
    return "".concat(baseSymbol, "-").concat(quoteSymbol);
}
exports.default = getMarketName;
//# sourceMappingURL=getMarketName.js.map