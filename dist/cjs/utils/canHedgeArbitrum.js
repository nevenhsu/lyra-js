"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bn_1 = require("../constants/bn");
var getCappedExpectedHedge_1 = __importDefault(require("./getCappedExpectedHedge"));
function canHedgeOnArbitrum(spotPrice, netDelta, option, size, increasesPoolDelta, hedgerView, poolHedgerParams) {
    var currentHedge = hedgerView.currentHedge, gmxView = hedgerView.gmxView, futuresPoolHedgerParams = hedgerView.futuresPoolHedgerParams;
    if (!futuresPoolHedgerParams.vaultLiquidityCheckEnabled) {
        return true;
    }
    var cappedExpectedHedge = (0, getCappedExpectedHedge_1.default)(option, size, netDelta, poolHedgerParams, increasesPoolDelta);
    var cappedExpectedHedgeAbs = cappedExpectedHedge.abs();
    var currentHedgeAbs = currentHedge.abs();
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
    var remainingDollars;
    if (cappedExpectedHedge.gt(0)) {
        var remainingLongDollars = gmxView.remainingLongDollars;
        remainingDollars = remainingLongDollars;
    }
    else {
        var remainingShortDollars = gmxView.remainingShortDollars;
        remainingDollars = remainingShortDollars;
    }
    // Convert the dollar amount to deltas by dividing by spot.
    var remainingDeltas = remainingDollars.div(spotPrice).mul(bn_1.UNIT);
    var absHedgeDiff = cappedExpectedHedgeAbs.sub(currentHedgeAbs);
    if (remainingDeltas.lt(absHedgeDiff.mul(futuresPoolHedgerParams.marketDepthBuffer).div(bn_1.UNIT))) {
        return false;
    }
    return true;
}
exports.default = canHedgeOnArbitrum;
//# sourceMappingURL=canHedgeArbitrum.js.map