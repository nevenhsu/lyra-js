import Lyra from '..';
import { WithdrawalQueuedOrProcessedEvent } from '../liquidity_withdrawal';
import { Market } from '../market';
export default function fetchLiquidityWithdrawalEventDataByOwner(lyra: Lyra, owner: string, market: Market): Promise<{
    events: WithdrawalQueuedOrProcessedEvent[];
}>;
