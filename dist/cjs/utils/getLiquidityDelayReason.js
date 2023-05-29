"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("..");
var contracts_1 = require("../constants/contracts");
function getLiquidityDelayReason(market, cbTimestamp, marketLiquidity) {
    var currentTimestamp = market.block.timestamp;
    if (cbTimestamp.gt(currentTimestamp)) {
        if (marketLiquidity.utilization > contracts_1.VAULTS_UTILIZATION_THRESHOLD) {
            return __1.LiquidityDelayReason.Liquidity;
        }
        else {
            return __1.LiquidityDelayReason.Volatility;
        }
    }
    else {
        return __1.LiquidityDelayReason.Keeper;
    }
}
exports.default = getLiquidityDelayReason;
//# sourceMappingURL=getLiquidityDelayReason.js.map