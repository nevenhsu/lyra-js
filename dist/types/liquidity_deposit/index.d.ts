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
export type DepositQueuedOrProcessedEvent = {
    queued?: LiquidityDepositQueuedEvent;
    processed?: LiquidityDepositProcessedEvent;
};
export type LiquidityDepositQueuedEvent = {
    depositor: string;
    beneficiary: string;
    depositQueueId: BigNumber;
    amountDeposited: BigNumber;
    totalQueuedDeposits: BigNumber;
    timestamp: BigNumber;
    transactionHash: string;
};
export type LiquidityDepositProcessedEvent = {
    caller: string;
    beneficiary: string;
    depositQueueId: BigNumber;
    amountDeposited: BigNumber;
    tokenPrice: BigNumber;
    tokensReceived: BigNumber;
    timestamp: BigNumber;
    transactionHash: string;
};
export declare class LiquidityDeposit {
    lyra: Lyra;
    __queued?: LiquidityDepositQueuedEvent;
    __processed?: LiquidityDepositProcessedEvent;
    __market: Market;
    queueId?: number;
    beneficiary: string;
    value: BigNumber;
    tokenPriceAtDeposit?: BigNumber;
    balance?: BigNumber;
    isPending: boolean;
    depositRequestedTimestamp: number;
    depositTimestamp: number;
    timeToDeposit: number;
    delayReason: LiquidityDelayReason | null;
    constructor(lyra: Lyra, market: Market, data: {
        queued?: LiquidityDepositQueuedEvent;
        processed?: LiquidityDepositProcessedEvent;
        cbTimestamp: BigNumber;
        marketLiquidity: MarketLiquiditySnapshot;
    });
    static getByOwner(lyra: Lyra, marketAddress: string, owner: string): Promise<LiquidityDeposit[]>;
    static approve(market: Market, owner: string, amountQuote: BigNumber): PopulatedTransaction;
    static initiateDeposit(market: Market, beneficiary: string, amountQuote: BigNumber): PopulatedTransaction;
    market(): Market;
}
