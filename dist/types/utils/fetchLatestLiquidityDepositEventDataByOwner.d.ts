import Lyra from '..';
import { LiquidityDepositProcessedEvent, LiquidityDepositQueuedEvent } from '../liquidity_deposit';
import { Market } from '../market';
export default function fetchLatestLiquidityDepositEventDataByOwner(lyra: Lyra, owner: string, market: Market): Promise<{
    queued: LiquidityDepositQueuedEvent[];
    processed: LiquidityDepositProcessedEvent[];
}>;
