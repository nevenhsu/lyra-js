export default function getEffectiveLiquidityTokens(lpTokens, totalLpTokens, stkLyra, totalStkLyra, x) {
    return totalStkLyra > 0
        ? Math.min(x * lpTokens + (((1 - x) * stkLyra) / totalStkLyra) * totalLpTokens, lpTokens)
        : lpTokens;
}
export function getMinimumStakedLyra(totalStkLyra, lpTokens, totalLpTokens) {
    if (totalLpTokens === 0 || lpTokens === 0) {
        return 0;
    }
    return totalStkLyra * (lpTokens / totalLpTokens);
}
//# sourceMappingURL=getEffectiveLiquidityTokens.js.map