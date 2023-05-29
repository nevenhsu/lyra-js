"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bn_1 = require("../constants/bn");
var getCappedExpectedHedge_1 = __importDefault(require("./getCappedExpectedHedge"));
var hasEnoughMarketDepth = function (hedge, maxTotalMarketSize, marketDepthBuffer, shortInterest, longInterest) {
    var interest = hedge.lt(0) ? shortInterest : longInterest;
    var marketUsage = interest.add(hedge.abs().mul(marketDepthBuffer).div(bn_1.UNIT));
    return marketUsage.lt(maxTotalMarketSize);
};
function canHedgeOnOptimism(spotPrice, netDelta, option, size, increasesPoolDelta, hedgerView, poolHedgerParams) {
    var marketSuspended = hedgerView.marketSuspended, currentHedge = hedgerView.hedgedDelta, futuresPoolHedgerParams = hedgerView.futuresPoolHedgerParams, fundingRate = hedgerView.fundingRate, shortInterest = hedgerView.shortInterest, longInterest = hedgerView.longInterest, maxTotalMarketSize = hedgerView.maxTotalMarketSize, curveRateStable = hedgerView.curveRateStable;
    if (marketSuspended) {
        return false;
    }
    var cappedExpectedHedge = (0, getCappedExpectedHedge_1.default)(option, size, netDelta, poolHedgerParams, increasesPoolDelta);
    var cappedExpectedHedgeAbs = cappedExpectedHedge.abs();
    var currentHedgeAbs = currentHedge.abs();
    if (cappedExpectedHedgeAbs.lte(currentHedgeAbs) && cappedExpectedHedge.mul(currentHedge).gte(0)) {
        // Delta is shrinking (potentially flipping, but still smaller than current hedge), so we skip the check
        return true;
    }
    if (increasesPoolDelta && cappedExpectedHedge.gte(0)) {
        // expected hedge is positive, and trade increases delta of the pool - risk is reduced, so accept trade
        return true;
    }
    if (!increasesPoolDelta && cappedExpectedHedge.lte(0)) {
        // expected hedge is negative, and trade decreases delta of the pool - risk is reduced, so accept trade
        return true;
    }
    // check that the curve swap rates are acceptable
    if (!curveRateStable) {
        return false;
    }
    if (cappedExpectedHedgeAbs.gt(currentHedge.abs())) {
        // check funding rate is within bounds and so is liquidity
        var maxFundingRate = futuresPoolHedgerParams.maximumFundingRate;
        if (fundingRate.abs().gt(maxFundingRate)) {
            return false;
        }
    }
    var marketDepthBuffer = futuresPoolHedgerParams.marketDepthBuffer;
    // Check remaining market liquidity
    if (cappedExpectedHedge.mul(currentHedge).gt(0)) {
        // same sign - so just check the difference
        var hedgeDifference = cappedExpectedHedge.sub(currentHedge);
        if (!hasEnoughMarketDepth(hedgeDifference, maxTotalMarketSize, marketDepthBuffer, shortInterest, longInterest)) {
            return false;
        }
    }
    else {
        if (!hasEnoughMarketDepth(cappedExpectedHedge, maxTotalMarketSize, marketDepthBuffer, shortInterest, longInterest)) {
            return false;
        }
    }
    return true;
}
exports.default = canHedgeOnOptimism;
//# sourceMappingURL=canHedgeOptimism.js.map