"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var strings_1 = require("@ethersproject/strings");
function parseBaseKeyBytes32(baseKey) {
    if (baseKey.startsWith('0x')) {
        // Assume variable is base key in bytes32
        return baseKey;
    }
    else {
        // Account for "sETH", "ETH" or "eth" formats
        // Check that key starts with "s" and rest of string is uppercase
        var parsedBasekey = baseKey.startsWith('s') && baseKey.substring(1).toUpperCase() === baseKey.substring(1)
            ? baseKey
            : baseKey.startsWith('s')
                ? 's' + baseKey.substring(1).toUpperCase()
                : 's' + baseKey.toUpperCase();
        return (0, strings_1.formatBytes32String)(parsedBasekey);
    }
}
exports.default = parseBaseKeyBytes32;
//# sourceMappingURL=parseBaseKeyBytes32.js.map