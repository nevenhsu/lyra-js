export default function getEffectiveTradingFeeRebate(stkLyraBalance: number, useRebateTable: boolean, rebateRateTable: {
    cutoff: number;
    returnRate: number;
}[], maxRebatePercentage: number, netVerticalStretch: number, verticalShift: number, vertIntercept: number, stretchiness: number): number;
