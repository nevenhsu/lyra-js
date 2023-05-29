import Lyra from '..';
import { SnapshotOptions } from '../constants/snapshots';
import { Market, MarketNetGreeksSnapshot } from '../market';
export default function fetchNetGreeksHistory(lyra: Lyra, market: Market, options?: SnapshotOptions): Promise<MarketNetGreeksSnapshot[]>;
