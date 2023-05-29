"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fromBigNumber_1 = __importDefault(require("./fromBigNumber"));
// Checks if a BigNumber has greater than (or equal to) n decimal places
function isNDecimalPlaces(val, n) {
    var exp = Math.pow(10, (n - 1));
    var valNum = (0, fromBigNumber_1.default)(val);
    var floor = Math.floor(valNum * exp);
    var ceil = Math.ceil(valNum * exp);
    return floor < valNum * exp && valNum * exp < ceil;
}
exports.default = isNDecimalPlaces;
//# sourceMappingURL=isNDecimalPlaces.js.map