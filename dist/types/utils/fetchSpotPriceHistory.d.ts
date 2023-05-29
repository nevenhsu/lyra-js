import Lyra from '..';
import { SnapshotOptions } from '../constants/snapshots';
import { Market, MarketSpotCandle } from '../market';
export default function fetchSpotPriceHistory(lyra: Lyra, market: Market, options?: SnapshotOptions): Promise<MarketSpotCandle[]>;
