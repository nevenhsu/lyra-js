"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var units_1 = require("@ethersproject/units");
function fromBigNumber(number, decimals) {
    if (decimals === void 0) { decimals = 18; }
    return parseFloat((0, units_1.formatUnits)(number.toString(), decimals));
}
exports.default = fromBigNumber;
//# sourceMappingURL=fromBigNumber.js.map