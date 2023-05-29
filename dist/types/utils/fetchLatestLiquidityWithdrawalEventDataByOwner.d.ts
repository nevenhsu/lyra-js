import Lyra from '..';
import { LiquidityWithdrawalProcessedEvent, LiquidityWithdrawalQueuedEvent } from '../liquidity_withdrawal';
import { Market } from '../market';
export default function fetchLatestLiquidityWithdrawalEventDataByOwner(lyra: Lyra, owner: string, market: Market): Promise<{
    queued: LiquidityWithdrawalQueuedEvent[];
    processed: LiquidityWithdrawalProcessedEvent[];
}>;
