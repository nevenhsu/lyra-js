"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bn_1 = require("../constants/bn");
function getPositionPnl(position) {
    var _a, _b;
    var trades = position.trades();
    var closingTrades = trades.filter(function (trade) { return !trade.isOpen; });
    var settle = position.settle();
    // Avg. premiums paid / received for open or settled portion of position
    var totalAverageOpenCost = position.averageCostPerOption().mul(position.size).div(bn_1.UNIT);
    // Avg. premiums paid / received for closed portion of position
    var totalAverageCloseCost = closingTrades.reduce(function (sum, closeTrade) {
        // Use average cost per option before closing trade
        var averageOpenPremiums = closeTrade.prevAverageCostPerOption(position).mul(closeTrade.size).div(bn_1.UNIT);
        return sum.add(averageOpenPremiums);
    }, bn_1.ZERO_BN);
    // Total premiums received for closed portion of position
    var totalClosePremiums = closingTrades.reduce(function (sum, closeTrade) { return sum.add(closeTrade.premium); }, bn_1.ZERO_BN);
    if (position.isLong) {
        var unrealizedPnl = bn_1.ZERO_BN;
        var unrealizedPnlPercentage = bn_1.ZERO_BN;
        if (position.isOpen) {
            var positionFairValue = position.pricePerOption.mul(position.size).div(bn_1.UNIT);
            // Open position fair value minus premiums paid
            unrealizedPnl = positionFairValue.sub(totalAverageOpenCost);
            unrealizedPnlPercentage = totalAverageOpenCost.gt(0) ? unrealizedPnl.mul(bn_1.UNIT).div(totalAverageOpenCost) : bn_1.ZERO_BN;
        }
        // Realized premium profits from closes
        var realizedPnl = totalClosePremiums.sub(totalAverageCloseCost);
        var realizedPnlPercentage = totalAverageCloseCost.gt(0)
            ? realizedPnl.mul(bn_1.UNIT).div(totalAverageCloseCost)
            : bn_1.ZERO_BN;
        var settlementPnl = bn_1.ZERO_BN;
        var settlementPnlPercentage = bn_1.ZERO_BN;
        if (settle) {
            // Settlement pnl is cash settled minus premiums paid
            var settlementValue = settle.settlement;
            settlementPnl = settlementValue.sub(totalAverageOpenCost);
            settlementPnlPercentage = totalAverageOpenCost.gt(0) ? settlementPnl.mul(bn_1.UNIT).div(totalAverageOpenCost) : bn_1.ZERO_BN;
        }
        return {
            totalAverageOpenCost: totalAverageOpenCost,
            totalAverageCloseCost: totalAverageCloseCost,
            unrealizedPnl: unrealizedPnl,
            unrealizedPnlPercentage: unrealizedPnlPercentage,
            realizedPnl: realizedPnl,
            realizedPnlPercentage: realizedPnlPercentage,
            settlementPnl: settlementPnl,
            settlementPnlPercentage: settlementPnlPercentage,
        };
    }
    else {
        var unrealizedPnl = bn_1.ZERO_BN;
        var unrealizedPnlPercentage = bn_1.ZERO_BN;
        if (position.isOpen) {
            var positionFairValue = position.pricePerOption.mul(position.size).div(bn_1.UNIT);
            // Open position premiums received minus fair value
            unrealizedPnl = totalAverageOpenCost.sub(positionFairValue);
            unrealizedPnlPercentage = totalAverageOpenCost.gt(0) ? unrealizedPnl.mul(bn_1.UNIT).div(totalAverageOpenCost) : bn_1.ZERO_BN;
        }
        // Realized profits from premiums on close
        var realizedPnl = totalAverageCloseCost.sub(totalClosePremiums);
        var realizedPnlPercentage = totalAverageCloseCost.gt(0)
            ? realizedPnl.mul(bn_1.UNIT).div(totalAverageCloseCost)
            : bn_1.ZERO_BN;
        var settlementPnl = bn_1.ZERO_BN;
        var settlementPnlPercentage = bn_1.ZERO_BN;
        if (settle) {
            var lockedCollateralAmount = (_b = (_a = position.collateral) === null || _a === void 0 ? void 0 : _a.amount) !== null && _b !== void 0 ? _b : bn_1.ZERO_BN; // Always > 0
            var spotPriceAtExpiry = settle.spotPriceAtExpiry;
            var settlementAmount = settle.returnedCollateralAmount;
            var lostCollateralAmount = lockedCollateralAmount.sub(settlementAmount); // E.g. locked 5 sETH, returned 3 sETH, lost 2 sETH
            var lostCollateralValue = settle.isBaseCollateral
                ? lostCollateralAmount.mul(spotPriceAtExpiry).div(bn_1.UNIT) // E.g. Sold 2 sETH to cover cash-settled obligation on expriy
                : lostCollateralAmount;
            settlementPnl = totalAverageOpenCost.sub(lostCollateralValue);
            settlementPnlPercentage = totalAverageOpenCost.gt(0) ? settlementPnl.mul(bn_1.UNIT).div(totalAverageOpenCost) : bn_1.ZERO_BN;
        }
        return {
            totalAverageOpenCost: totalAverageOpenCost,
            totalAverageCloseCost: totalAverageCloseCost,
            unrealizedPnl: unrealizedPnl,
            unrealizedPnlPercentage: unrealizedPnlPercentage,
            realizedPnl: realizedPnl,
            realizedPnlPercentage: realizedPnlPercentage,
            settlementPnl: settlementPnl,
            settlementPnlPercentage: settlementPnlPercentage,
        };
    }
}
exports.default = getPositionPnl;
//# sourceMappingURL=getPositionPnl.js.map