"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lyra_1 = require("../lyra");
function parseBaseSymbol(lyra, marketAddressOrName) {
    var rawBaseKey = marketAddressOrName.split('-')[0];
    if (lyra.version === lyra_1.Version.Avalon) {
        // Hardcode sETH, sBTC, sSOL
        switch (rawBaseKey.toLowerCase()) {
            case 'eth':
            case 'seth':
                return 'sETH';
            case 'btc':
            case 'sbtc':
                return 'sBTC';
            case 'sol':
            case 'ssol':
                return 'sSOL';
            default:
                // Not reachable
                return rawBaseKey;
        }
    }
    else {
        switch (rawBaseKey.toLowerCase()) {
            case 'eth':
            case 'weth':
                return 'WETH';
            case 'btc':
            case 'wbtc':
                return 'WBTC';
            default:
                // Add overrides for markets as individual cases
                return rawBaseKey.toUpperCase();
        }
    }
}
exports.default = parseBaseSymbol;
//# sourceMappingURL=parseBaseSymbol.js.map