"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var contracts_1 = require("../constants/contracts");
function getIsLong(optionType) {
    return [contracts_1.OptionType.LongCall, contracts_1.OptionType.LongPut].includes(optionType);
}
exports.default = getIsLong;
//# sourceMappingURL=getIsLong.js.map