"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bignumber_1 = require("@ethersproject/bignumber");
var bn_1 = require("../constants/bn");
// Round a BN to n decimal places, aassumes BN is 10^18
function roundToDp(val, n, options) {
    var _a, _b;
    if (val.isZero()) {
        return bn_1.ZERO_BN;
    }
    var bnDecimals = (_a = options === null || options === void 0 ? void 0 : options.bnDecimals) !== null && _a !== void 0 ? _a : 18;
    var valBN = val.div(bignumber_1.BigNumber.from(10).pow(bnDecimals - n));
    var ceil = (_b = options === null || options === void 0 ? void 0 : options.ceil) !== null && _b !== void 0 ? _b : true;
    if (ceil) {
        valBN = valBN.add(1);
    }
    return valBN.mul(bignumber_1.BigNumber.from(10).pow(bnDecimals - n));
}
exports.default = roundToDp;
//# sourceMappingURL=roundToDp.js.map