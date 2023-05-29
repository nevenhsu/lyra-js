"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMinimumStakedLyra = void 0;
function getEffectiveLiquidityTokens(lpTokens, totalLpTokens, stkLyra, totalStkLyra, x) {
    return totalStkLyra > 0
        ? Math.min(x * lpTokens + (((1 - x) * stkLyra) / totalStkLyra) * totalLpTokens, lpTokens)
        : lpTokens;
}
exports.default = getEffectiveLiquidityTokens;
function getMinimumStakedLyra(totalStkLyra, lpTokens, totalLpTokens) {
    if (totalLpTokens === 0 || lpTokens === 0) {
        return 0;
    }
    return totalStkLyra * (lpTokens / totalLpTokens);
}
exports.getMinimumStakedLyra = getMinimumStakedLyra;
//# sourceMappingURL=getEffectiveLiquidityTokens.js.map