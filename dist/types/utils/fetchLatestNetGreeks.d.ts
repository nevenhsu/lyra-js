import Lyra from '..';
import { Market, MarketNetGreeksSnapshot } from '../market';
export default function fetchLatestNetGreeks(lyra: Lyra, market: Market): Promise<MarketNetGreeksSnapshot>;
