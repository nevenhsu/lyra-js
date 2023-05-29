"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bignumber_1 = require("@ethersproject/bignumber");
var fromBigNumber_1 = __importDefault(require("./fromBigNumber"));
function replacer(_name, val) {
    if (typeof val === 'object' && val != null) {
        if (!Array.isArray(val)) {
            // Handle objects
            var newVal_1 = Object.assign({}, val);
            Object.entries(val).forEach(function (_a) {
                var key = _a[0], val = _a[1];
                if (bignumber_1.BigNumber.isBigNumber(val)) {
                    newVal_1[key] = (0, fromBigNumber_1.default)(val);
                }
                else {
                    newVal_1[key] = val;
                }
            });
            return newVal_1;
        }
        else {
            // Handle arrays
            return val.map(function (val) {
                if (bignumber_1.BigNumber.isBigNumber(val)) {
                    return (0, fromBigNumber_1.default)(val);
                }
                else {
                    return val;
                }
            });
        }
    }
    else {
        return val;
    }
}
// Handles BigNumber printing (assumes 18dp)
function printObject() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var parsedArgs = args.map(function (arg) {
        if (typeof arg === 'object' && arg != null) {
            return JSON.stringify(arg, replacer, 2).replace(/"/g, '');
        }
        else {
            return arg;
        }
    });
    console.log.apply(console, parsedArgs);
}
exports.default = printObject;
//# sourceMappingURL=printObject.js.map