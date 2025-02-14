import { LiquidityDelayReason } from '..';
import { VAULTS_UTILIZATION_THRESHOLD } from '../constants/contracts';
export default function getLiquidityDelayReason(market, cbTimestamp, marketLiquidity) {
    const currentTimestamp = market.block.timestamp;
    if (cbTimestamp.gt(currentTimestamp)) {
        if (marketLiquidity.utilization > VAULTS_UTILIZATION_THRESHOLD) {
            return LiquidityDelayReason.Liquidity;
        }
        else {
            return LiquidityDelayReason.Volatility;
        }
    }
    else {
        return LiquidityDelayReason.Keeper;
    }
}
//# sourceMappingURL=getLiquidityDelayReason.js.map