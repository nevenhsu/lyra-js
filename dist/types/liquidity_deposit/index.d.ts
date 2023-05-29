import { BigNumber } from '@ethersproject/bignumber';
import { PopulatedTransaction } from '@ethersproject/contracts';
import Lyra from '../lyra';
import { Market, MarketLiquiditySnapshot } from '../market';
export declare enum LiquidityDelayReason {
    Liquidity = "Liquidity",
    Volatility = "Volatility",
    Keeper = "Keeper"
}
export type LiquidityDepositFilter = {
    user: string;
};
export type LiquidityDepositEvents = {
    isInstant: false;
    isProcessed: false;
    queued: LiquidityDepositQueuedEvent;
} | {
    isInstant: true;
    isProcessed: true;
    processed: LiquidityDepositProcessedEvent;
} | {
    isInstant: false;
    isProcessed: true;
    queued: LiquidityDepositQueuedEvent;
    processed: LiquidityDepositProcessedEvent;
};
export type LiquidityCircuitBreaker = {
    timestamp: number;
    reason: LiquidityDelayReason;
};
export type LiquidityDepositQueuedEvent = {
    depositor: string;
    beneficiary: string;
    queueId: number;
    amountDeposited: BigNumber;
    totalQueuedDeposits: BigNumber;
    timestamp: number;
    transactionHash: string;
};
export type LiquidityDepositProcessedEvent = {
    caller: string;
    beneficiary: string;
    queueId: number;
    amountDeposited: BigNumber;
    tokenPrice: BigNumber;
    tokensReceived: BigNumber;
    timestamp: number;
    transactionHash: string;
};
export declare class LiquidityDeposit {
    lyra: Lyra;
    __events: LiquidityDepositEvents;
    __market: Market;
    queueId: number;
    beneficiary: string;
    value: BigNumber;
    tokenPriceAtDeposit?: BigNumber;
    balance?: BigNumber;
    isPending: boolean;
    depositRequestedTimestamp: number;
    depositTimestamp: number;
    timeToDeposit: number;
    transactionHash: string;
    delayReason: LiquidityDelayReason | null;
    constructor(lyra: Lyra, data: {
        market: Market;
        events: LiquidityDepositEvents;
        circuitBreaker: LiquidityCircuitBreaker | null;
        marketLiquidity: MarketLiquiditySnapshot;
    });
    static getByOwner(lyra: Lyra, market: Market, owner: string): Promise<LiquidityDeposit[]>;
    static approve(market: Market, owner: string, amountQuote: BigNumber): PopulatedTransaction;
    static initiateDeposit(market: Market, beneficiary: string, amountQuote: BigNumber): PopulatedTransaction;
    market(): Market;
}
