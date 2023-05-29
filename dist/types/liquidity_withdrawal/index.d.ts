import { BigNumber } from '@ethersproject/bignumber';
import { PopulatedTransaction } from '@ethersproject/contracts';
import { LiquidityDelayReason } from '..';
import Lyra from '../lyra';
import { Market, MarketLiquiditySnapshot } from '../market';
export type LiquidityWithdrawalFilter = {
    user: string;
};
export type WithdrawalQueuedOrProcessedEvent = {
    queued?: LiquidityWithdrawalQueuedEvent;
    processed?: LiquidityWithdrawalProcessedEvent;
};
export type LiquidityWithdrawalQueuedEvent = {
    withdrawer: string;
    beneficiary: string;
    withdrawalQueueId: BigNumber;
    amountWithdrawn: BigNumber;
    totalQueuedWithdrawals: BigNumber;
    timestamp: BigNumber;
    transactionHash: string;
};
export type LiquidityWithdrawalProcessedEvent = {
    caller: string;
    beneficiary: string;
    withdrawalQueueId: BigNumber;
    amountWithdrawn: BigNumber;
    tokenPrice: BigNumber;
    quoteReceived: BigNumber;
    totalQueuedWithdrawals: BigNumber;
    timestamp: BigNumber;
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
    constructor(lyra: Lyra, market: Market, data: {
        queued?: LiquidityWithdrawalQueuedEvent;
        processed?: LiquidityWithdrawalProcessedEvent;
        cbTimestamp: BigNumber;
        marketLiquidity: MarketLiquiditySnapshot;
    });
    static getByOwner(lyra: Lyra, marketAddress: string, owner: string): Promise<LiquidityWithdrawal[]>;
    static initiateWithdraw(market: Market, beneficiary: string, amountLiquidityTokens: BigNumber): PopulatedTransaction;
    market(): Market;
}
