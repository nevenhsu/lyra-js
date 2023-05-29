import { LiquidityCircuitBreaker, LiquidityDepositEvents } from '../liquidity_deposit';
import Lyra from '../lyra';
import { Market } from '../market';
export default function fetchLiquidityDepositEventDataByOwner(lyra: Lyra, owner: string, market: Market): Promise<{
    events: LiquidityDepositEvents[];
    circuitBreaker: LiquidityCircuitBreaker | null;
}>;
