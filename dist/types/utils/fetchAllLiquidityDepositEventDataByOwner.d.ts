import { LiquidityDepositProcessedEvent, LiquidityDepositQueuedEvent } from '../liquidity_deposit';
import Lyra from '../lyra';
import { Market } from '../market';
export default function fetchAllLiquidityDepositEventDataByOwner(lyra: Lyra, owner: string, market: Market): Promise<{
    queued: LiquidityDepositQueuedEvent[];
    processed: LiquidityDepositProcessedEvent[];
}>;
