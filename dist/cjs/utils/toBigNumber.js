"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var units_1 = require("@ethersproject/units");
function toBigNumber(number, decimals) {
    if (decimals === void 0) { decimals = 18; }
    if (isNaN(number)) {
        throw new Error('Passed NaN to BigNumber converter');
    }
    return (0, units_1.parseUnits)(number.toFixed(18), decimals);
}
exports.default = toBigNumber;
//# sourceMappingURL=toBigNumber.js.map