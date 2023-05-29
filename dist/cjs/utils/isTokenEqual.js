"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isTokenEqual(token, tokenAddressOrName) {
    return (token.address.toLowerCase() === tokenAddressOrName.toLowerCase() ||
        token.symbol.toLowerCase() === tokenAddressOrName.toLowerCase());
}
exports.default = isTokenEqual;
//# sourceMappingURL=isTokenEqual.js.map