"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.to18DecimalBN = exports.from18DecimalBN = void 0;
var bignumber_1 = require("@ethersproject/bignumber");
function from18DecimalBN(val, decimals) {
    return val.div(bignumber_1.BigNumber.from(10).pow(18 - decimals));
}
exports.from18DecimalBN = from18DecimalBN;
function to18DecimalBN(val, decimals) {
    return val.mul(bignumber_1.BigNumber.from(10).pow(18 - decimals));
}
exports.to18DecimalBN = to18DecimalBN;
//# sourceMappingURL=convertBNDecimals.js.map