import { LiquidityWithdrawalProcessedEvent, LiquidityWithdrawalQueuedEvent } from '../liquidity_withdrawal';
import Lyra from '../lyra';
import { Market } from '../market';
export default function fetchAllLiquidityWithdrawalEventDataByOwner(lyra: Lyra, owner: string, market: Market): Promise<{
    queued: LiquidityWithdrawalQueuedEvent[];
    processed: LiquidityWithdrawalProcessedEvent[];
}>;
