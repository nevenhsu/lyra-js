"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function parseMarketName(marketName) {
    var _a = marketName.split('-'), baseKey = _a[0], quoteKey = _a[1];
    if (!baseKey) {
        throw new Error("Invalid market name arg: ".concat(marketName));
    }
    return { baseKey: baseKey, quoteKey: quoteKey };
}
exports.default = parseMarketName;
//# sourceMappingURL=parseMarketName.js.map