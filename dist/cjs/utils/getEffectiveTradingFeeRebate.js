"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getEffectiveTradingFeeRebate(stkLyraBalance, useRebateTable, rebateRateTable, maxRebatePercentage, netVerticalStretch, verticalShift, vertIntercept, stretchiness) {
    if (useRebateTable) {
        return Math.max.apply(Math, rebateRateTable.filter(function (x) { return stkLyraBalance >= x.cutoff; }).map(function (x) { return x.returnRate; }));
    }
    else {
        return Math.min(maxRebatePercentage, vertIntercept + Math.max(0, netVerticalStretch * (verticalShift + Math.log(stkLyraBalance / stretchiness))));
    }
}
exports.default = getEffectiveTradingFeeRebate;
//# sourceMappingURL=getEffectiveTradingFeeRebate.js.map