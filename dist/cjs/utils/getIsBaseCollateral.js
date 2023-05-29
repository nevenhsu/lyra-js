"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var contracts_1 = require("../constants/contracts");
function getIsBaseCollateral(optionType) {
    return optionType === contracts_1.OptionType.ShortCoveredCall;
}
exports.default = getIsBaseCollateral;
//# sourceMappingURL=getIsBaseCollateral.js.map