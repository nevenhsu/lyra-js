import { BigNumber } from '@ethersproject/bignumber';
import { Block } from '@ethersproject/providers';
import { Board } from '../board';
import { DataSource } from '../constants/contracts';
import { SnapshotOptions } from '../constants/snapshots';
import Lyra from '../lyra';
import { Market } from '../market';
import { Quote, QuoteOptions } from '../quote';
import { Strike } from '../strike';
export type OptionPriceSnapshot = {
    timestamp: number;
    blockNumber: number;
    optionPrice: BigNumber;
};
export type OptionTradingVolumeSnapshot = {
    notionalVolume: BigNumber;
    premiumVolume: BigNumber;
    timestamp: number;
};
export type OptionQuotes = {
    option: Option;
    bid: Quote;
    ask: Quote;
};
export declare class Option {
    private __strike;
    __source: DataSource;
    lyra: Lyra;
    block: Block;
    isCall: boolean;
    price: BigNumber;
    longOpenInterest: BigNumber;
    shortOpenInterest: BigNumber;
    delta: BigNumber;
    theta: BigNumber;
    rho: BigNumber;
    isInTheMoney: boolean;
    constructor(lyra: Lyra, strike: Strike, isCall: boolean, block: Block);
    static getFields(strike: Strike, isCall: boolean): {
        longOpenInterest: BigNumber;
        shortOpenInterest: BigNumber;
        price: BigNumber;
        delta: BigNumber;
        theta: BigNumber;
        rho: BigNumber;
        isInTheMoney: boolean;
    };
    static get(lyra: Lyra, marketAddressOrName: string, strikeId: number, isCall: boolean): Promise<Option>;
    refresh(): Promise<Option>;
    market(): Market;
    board(): Board;
    strike(): Strike;
    quote(isBuy: boolean, size: BigNumber, options?: QuoteOptions): Promise<Quote>;
    quoteSync(isBuy: boolean, size: BigNumber, options?: QuoteOptions): Quote;
    quoteAll(size: BigNumber, options?: QuoteOptions): Promise<OptionQuotes>;
    quoteAllSync(size: BigNumber, options?: QuoteOptions): OptionQuotes;
    tradingVolumeHistory(options?: SnapshotOptions): Promise<OptionTradingVolumeSnapshot[]>;
    priceHistory(options?: SnapshotOptions): Promise<OptionPriceSnapshot[]>;
}
