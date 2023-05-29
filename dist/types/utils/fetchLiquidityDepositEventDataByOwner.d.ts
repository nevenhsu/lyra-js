import Lyra from '..';
import { DepositQueuedOrProcessedEvent } from '../liquidity_deposit';
import { Market } from '../market';
export default function fetchLiquidityDepositEventDataByOwner(lyra: Lyra, owner: string, market: Market): Promise<{
    events: DepositQueuedOrProcessedEvent[];
}>;
