import { UNIT } from '../constants/bn';
import getCappedExpectedHedge from './getCappedExpectedHedge';
export default function canHedgeOnArbitrum(spotPrice, netDelta, option, size, increasesPoolDelta, hedgerView, poolHedgerParams) {
    const { currentHedge, gmxView, futuresPoolHedgerParams } = hedgerView;
    if (!futuresPoolHedgerParams.vaultLiquidityCheckEnabled) {
        return true;
    }
    const cappedExpectedHedge = getCappedExpectedHedge(option, size, netDelta, poolHedgerParams, increasesPoolDelta);
    const cappedExpectedHedgeAbs = cappedExpectedHedge.abs();
    const currentHedgeAbs = currentHedge.abs();
    if (!futuresPoolHedgerParams) {
        return true;
    }
    if (cappedExpectedHedgeAbs.lte(currentHedgeAbs)) {
        // Delta is shrinking (potentially flipping, but still smaller than current hedge), so we skip the check
        return true;
    }
    // expected hedge is positive, and trade increases delta of the pool - risk is reduced, so accept trade
    if (increasesPoolDelta && cappedExpectedHedge.gte(0)) {
        return true;
    }
    // expected hedge is negative, and trade decreases delta of the pool - risk is reduced, so accept trade
    if (!increasesPoolDelta && cappedExpectedHedge.lte(0)) {
        return true;
    }
    // Figure out the amount of remaining dollars for the specific direction the pool needs to hedge
    let remainingDollars;
    if (cappedExpectedHedge.gt(0)) {
        const { remainingLongDollars } = gmxView;
        remainingDollars = remainingLongDollars;
    }
    else {
        const { remainingShortDollars } = gmxView;
        remainingDollars = remainingShortDollars;
    }
    // Convert the dollar amount to deltas by dividing by spot.
    const remainingDeltas = remainingDollars.div(spotPrice).mul(UNIT);
    const absHedgeDiff = cappedExpectedHedgeAbs.sub(currentHedgeAbs);
    if (remainingDeltas.lt(absHedgeDiff.mul(futuresPoolHedgerParams.marketDepthBuffer).div(UNIT))) {
        return false;
    }
    return true;
}
//# sourceMappingURL=canHedgeArbitrum.js.map