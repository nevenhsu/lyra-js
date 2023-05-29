import { BigNumber } from '@ethersproject/bignumber';
import { PopulatedTransaction } from '@ethersproject/contracts';
import { LiquidityCircuitBreaker, LiquidityDelayReason } from '..';
import Lyra from '../lyra';
import { Market, MarketLiquiditySnapshot } from '../market';
export type LiquidityWithdrawalEvents = {
    isInstant: false;
    isProcessed: false;
    queued: LiquidityWithdrawalQueuedEvent;
} | {
    isInstant: true;
    isProcessed: true;
    processed: LiquidityWithdrawalProcessedEvent;
} | {
    isInstant: false;
    isProcessed: true;
    queued: LiquidityWithdrawalQueuedEvent;
    processed: LiquidityWithdrawalProcessedEvent;
};
export type LiquidityWithdrawalQueuedEvent = {
    withdrawer: string;
    beneficiary: string;
    queueId: number;
    amountWithdrawn: BigNumber;
    totalQueuedWithdrawals: BigNumber;
    timestamp: number;
    transactionHash: string;
};
export type LiquidityWithdrawalProcessedEvent = {
    caller: string;
    beneficiary: string;
    queueId: number;
    amountWithdrawn: BigNumber;
    tokenPrice: BigNumber;
    quoteReceived: BigNumber;
    totalQueuedWithdrawals: BigNumber;
    timestamp: number;
    transactionHash: string;
};
export declare class LiquidityWithdrawal {
    lyra: Lyra;
    __queued?: LiquidityWithdrawalQueuedEvent;
    __processed?: LiquidityWithdrawalProcessedEvent;
    __market: Market;
    queueId?: number;
    beneficiary: string;
    balance: BigNumber;
    tokenPriceAtWithdraw?: BigNumber;
    value?: BigNumber;
    isPending: boolean;
    withdrawalRequestedTimestamp: number;
    withdrawalTimestamp: number;
    timeToWithdrawal: number;
    delayReason: LiquidityDelayReason | null;
    constructor(lyra: Lyra, data: {
        events: LiquidityWithdrawalEvents;
        market: Market;
        circuitBreaker: LiquidityCircuitBreaker | null;
        marketLiquidity: MarketLiquiditySnapshot;
    });
    static getByOwner(lyra: Lyra, market: Market, owner: string): Promise<LiquidityWithdrawal[]>;
    static initiateWithdraw(market: Market, beneficiary: string, amountLiquidityTokens: BigNumber): PopulatedTransaction;
    market(): Market;
}
