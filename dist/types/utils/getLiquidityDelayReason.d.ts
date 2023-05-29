import { BigNumber } from 'ethers';
import { LiquidityDelayReason, Market, MarketLiquiditySnapshot } from '..';
export default function getLiquidityDelayReason(market: Market, cbTimestamp: BigNumber, marketLiquidity: MarketLiquiditySnapshot): LiquidityDelayReason;
