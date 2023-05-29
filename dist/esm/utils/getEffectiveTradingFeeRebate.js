export default function getEffectiveTradingFeeRebate(stkLyraBalance, useRebateTable, rebateRateTable, maxRebatePercentage, netVerticalStretch, verticalShift, vertIntercept, stretchiness) {
    if (useRebateTable) {
        return Math.max(...rebateRateTable.filter(x => stkLyraBalance >= x.cutoff).map(x => x.returnRate));
    }
    else {
        return Math.min(maxRebatePercentage, vertIntercept + Math.max(0, netVerticalStretch * (verticalShift + Math.log(stkLyraBalance / stretchiness))));
    }
}
//# sourceMappingURL=getEffectiveTradingFeeRebate.js.map