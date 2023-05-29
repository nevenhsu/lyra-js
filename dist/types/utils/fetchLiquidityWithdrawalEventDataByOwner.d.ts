import { LiquidityCircuitBreaker } from '../liquidity_deposit';
import { LiquidityWithdrawalEvents } from '../liquidity_withdrawal';
import Lyra from '../lyra';
import { Market } from '../market';
export default function fetchLiquidityWithdrawalEventDataByOwner(lyra: Lyra, owner: string, market: Market): Promise<{
    events: LiquidityWithdrawalEvents[];
    circuitBreaker: LiquidityCircuitBreaker | null;
}>;
