import Lyra from '..';
import { SnapshotOptions } from '../constants/snapshots';
import { Market, MarketLiquiditySnapshot } from '../market';
export default function fetchLiquidityHistory(lyra: Lyra, market: Market, options?: SnapshotOptions): Promise<MarketLiquiditySnapshot[]>;
