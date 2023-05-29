import { ApolloClient, NormalizedCacheObject } from '@apollo/client/core';
import { BigNumber } from '@ethersproject/bignumber';
import { PopulatedTransaction } from '@ethersproject/contracts';
import { JsonRpcProvider, TransactionReceipt } from '@ethersproject/providers';
import { Account } from './account';
import { AccountRewardEpoch } from './account_reward_epoch';
import { Admin } from './admin';
import { Board, BoardQuotes } from './board';
import { CollateralUpdateEvent } from './collateral_update_event';
import { Chain } from './constants/chain';
import { Deployment } from './constants/contracts';
import { Network } from './constants/network';
import { GlobalRewardEpoch } from './global_reward_epoch';
import { LiquidityDeposit } from './liquidity_deposit';
import { LiquidityWithdrawal } from './liquidity_withdrawal';
import { Market, MarketContractAddresses, MarketQuotes, MarketTradeOptions } from './market';
import { Option, OptionQuotes } from './option';
import { Position } from './position';
import { Quote, QuoteOptions } from './quote';
import { SettleEvent } from './settle_event';
import { Strike, StrikeQuotes } from './strike';
import { Trade } from './trade';
import { TradeEvent, TradeEventListener, TradeEventListenerCallback, TradeEventListenerOptions } from './trade_event';
import { TransferEvent } from './transfer_event';
export type LyraConfig = {
    provider: JsonRpcProvider;
    subgraphUri?: string;
    govSubgraphUri?: string;
    apiUri?: string;
    version?: Version;
};
export declare enum Version {
    Avalon = "avalon",
    Newport = "newport"
}
export { Deployment } from './constants/contracts';
export default class Lyra {
    chain: Chain;
    chainId: number;
    provider: JsonRpcProvider;
    subgraphUri: string;
    subgraphClient: ApolloClient<NormalizedCacheObject>;
    govSubgraphUri: string;
    govSubgraphClient: ApolloClient<NormalizedCacheObject>;
    apiUri: string;
    deployment: Deployment;
    network: Network;
    version: Version;
    constructor(config?: LyraConfig | Chain | number);
    quote(marketAddressOrName: string, strikeId: number, isCall: boolean, isBuy: boolean, size: BigNumber, options?: QuoteOptions): Promise<Quote>;
    quoteOption(marketAddressOrName: string, strikeId: number, isCall: boolean, size: BigNumber, options?: QuoteOptions): Promise<OptionQuotes>;
    quoteStrike(marketAddressOrName: string, strikeId: number, size: BigNumber, options?: QuoteOptions): Promise<StrikeQuotes>;
    quoteBoard(marketAddressOrName: string, boardId: number, size: BigNumber, options?: QuoteOptions): Promise<BoardQuotes>;
    quoteMarket(marketAddressOrName: string, size: BigNumber, options?: QuoteOptions): Promise<MarketQuotes>;
    approveTradeQuote(marketAddressOrName: string, owner: string, amountQuote: BigNumber): Promise<PopulatedTransaction>;
    approveTradeBase(marketAddressOrName: string, owner: string, amountBase: BigNumber): Promise<PopulatedTransaction>;
    trade(owner: string, marketAddressOrName: string, strikeId: number, isCall: boolean, isBuy: boolean, size: BigNumber, slippage: number, options?: MarketTradeOptions): Promise<Trade>;
    onTrade(callback: TradeEventListenerCallback, options?: TradeEventListenerOptions): TradeEventListener;
    markets(): Promise<Market[]>;
    contractAddresses(): Promise<MarketContractAddresses[]>;
    marketAddresses(): Promise<string[]>;
    market(marketAddressOrName: string): Promise<Market>;
    board(marketAddressOrName: string, boardId: number): Promise<Board>;
    strike(marketAddressOrName: string, strikeId: number): Promise<Strike>;
    option(marketAddressOrName: string, strikeId: number, isCall: boolean): Promise<Option>;
    openPositions(owner: string): Promise<Position[]>;
    positions(owner: string): Promise<Position[]>;
    position(marketAddressOrName: string, positionId: number): Promise<Position>;
    events(transactionHashOrReceipt: string | TransactionReceipt): Promise<{
        trades: TradeEvent[];
        collateralUpdates: CollateralUpdateEvent[];
        transfers: TransferEvent[];
        settles: SettleEvent[];
    }>;
    account(address: string): Account;
    drip(owner: string): PopulatedTransaction;
    deposits(marketAddressOrName: string, owner: string): Promise<LiquidityDeposit[]>;
    approveDeposit(marketAddressOrName: string, address: string, amountQuote: BigNumber): Promise<PopulatedTransaction | null>;
    initiateDeposit(marketAddressOrName: string, beneficiary: string, amountQuote: BigNumber): Promise<PopulatedTransaction | null>;
    withdrawals(marketAddressOrName: string, owner: string): Promise<LiquidityWithdrawal[]>;
    initiateWithdraw(marketAddressOrName: string, beneficiary: string, amountLiquidityTokens: BigNumber): Promise<PopulatedTransaction | null>;
    admin(): Admin;
    claimRewards(owner: string, tokenAddresses: string[]): Promise<PopulatedTransaction>;
    globalRewardEpochs(): Promise<GlobalRewardEpoch[]>;
    accountRewardEpochs(owner: string): Promise<AccountRewardEpoch[]>;
}
