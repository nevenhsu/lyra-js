import Lyra, { Market, MarketLiquiditySnapshot } from '..';
export default function fetchLatestLiquidity(lyra: Lyra, market: Market): Promise<MarketLiquiditySnapshot>;
