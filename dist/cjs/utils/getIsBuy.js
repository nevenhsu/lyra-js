"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var getIsLong_1 = __importDefault(require("./getIsLong"));
function getIsBuy(optionType, isOpen) {
    var isLong = (0, getIsLong_1.default)(optionType);
    return (isLong && isOpen) || (!isLong && !isOpen);
}
exports.default = getIsBuy;
//# sourceMappingURL=getIsBuy.js.map