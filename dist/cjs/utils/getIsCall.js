"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var contracts_1 = require("../constants/contracts");
function getIsCall(optionType) {
    return [contracts_1.OptionType.LongCall, contracts_1.OptionType.ShortCoveredCall, contracts_1.OptionType.ShortCall].includes(optionType);
}
exports.default = getIsCall;
//# sourceMappingURL=getIsCall.js.map