import Lyra from '..';
import { SnapshotOptions } from '../constants/snapshots';
import { Market, MarketTradingVolumeSnapshot } from '../market';
export default function fetchTradingVolumeHistory(lyra: Lyra, market: Market, options?: SnapshotOptions): Promise<MarketTradingVolumeSnapshot[]>;
