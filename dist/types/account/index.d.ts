import { BigNumber } from '@ethersproject/bignumber';
import { PopulatedTransaction } from '@ethersproject/contracts';
import Lyra from '../lyra';
import { Market } from '../market';
export type AccountTokenBalance = {
    address: string;
    symbol: string;
    decimals: number;
    balance: BigNumber;
};
export type AccountQuoteBalance = AccountTokenBalance & {
    tradeAllowance: BigNumber;
    depositAllowance: BigNumber;
};
export type AccountBaseBalance = AccountTokenBalance & {
    tradeAllowance: BigNumber;
};
export type AccountLiquidityTokenBalance = AccountTokenBalance;
export type AccountBalances = {
    owner: string;
    market: Market;
    marketAddress: string;
    marketName: string;
    quoteAsset: AccountQuoteBalance;
    baseAsset: AccountBaseBalance;
    liquidityToken: AccountLiquidityTokenBalance;
};
export type AccountLyraBalances = {
    ethereumLyra: BigNumber;
    optimismLyra: BigNumber;
    arbitrumLyra: BigNumber;
    optimismOldStkLyra: BigNumber;
    ethereumStkLyra: BigNumber;
    optimismStkLyra: BigNumber;
    arbitrumStkLyra: BigNumber;
    stakingAllowance: BigNumber;
};
export type AccountPnlSnapshot = {
    timestamp: number;
    livePnl: number;
};
export declare class Account {
    private lyra;
    address: string;
    constructor(lyra: Lyra, address: string);
    static get(lyra: Lyra, account: string): Account;
    balances(): Promise<AccountBalances[]>;
    marketBalances(marketAddressOrName: string): Promise<AccountBalances>;
    lyraBalances(): Promise<AccountLyraBalances>;
    drip(): PopulatedTransaction;
}
