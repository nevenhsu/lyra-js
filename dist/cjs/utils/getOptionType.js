"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var contracts_1 = require("../constants/contracts");
function getOptionType(isCall, isLong, isBaseCollateral) {
    if (isCall) {
        return isLong ? contracts_1.OptionType.LongCall : isBaseCollateral ? contracts_1.OptionType.ShortCoveredCall : contracts_1.OptionType.ShortCall;
    }
    else {
        return isLong ? contracts_1.OptionType.LongPut : contracts_1.OptionType.ShortPut;
    }
}
exports.default = getOptionType;
//# sourceMappingURL=getOptionType.js.map