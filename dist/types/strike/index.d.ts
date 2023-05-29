import { BigNumber } from '@ethersproject/bignumber';
import { Block } from '@ethersproject/providers';
import { Board } from '../board';
import { DataSource } from '../constants/contracts';
import { SnapshotOptions } from '../constants/snapshots';
import { StrikeViewStructOutput } from '../constants/views';
import Lyra from '../lyra';
import { Market } from '../market';
import { Option } from '../option';
import { Quote, QuoteOptions } from '../quote';
export type StrikeHistoryOptions = {
    startTimestamp?: number;
};
export type StrikeIVHistory = {
    iv: number;
    timestamp: number;
};
export type StrikeQuotes = {
    callBid: Quote;
    callAsk: Quote;
    putBid: Quote;
    putAsk: Quote;
    strike: Strike;
};
export type StrikeParams = {
    forceCloseSkew: BigNumber;
    cachedStdVega: BigNumber;
};
export declare class Strike {
    private __board;
    __source: DataSource;
    lyra: Lyra;
    block: Block;
    id: number;
    strikePrice: BigNumber;
    skew: BigNumber;
    iv: BigNumber;
    vega: BigNumber;
    gamma: BigNumber;
    isDeltaInRange: boolean;
    openInterest: BigNumber;
    longCallOpenInterest: BigNumber;
    shortCallOpenInterest: BigNumber;
    longPutOpenInterest: BigNumber;
    shortPutOpenInterest: BigNumber;
    params: StrikeParams;
    constructor(lyra: Lyra, board: Board, strikeView: StrikeViewStructOutput, block: Block);
    private static getFields;
    static get(lyra: Lyra, marketAddressOrName: string, strikeId: number): Promise<Strike>;
    refresh(): Promise<Strike>;
    ivHistory(lyra: Lyra, options?: SnapshotOptions): Promise<StrikeIVHistory[]>;
    market(): Market;
    board(): Board;
    call(): Option;
    put(): Option;
    option(isCall: boolean): Option;
    quote(isCall: boolean, isBuy: boolean, size: BigNumber, options?: QuoteOptions): Promise<Quote>;
    quoteSync(isCall: boolean, isBuy: boolean, size: BigNumber, options?: QuoteOptions): Quote;
    quoteAll(size: BigNumber, options?: QuoteOptions): Promise<StrikeQuotes>;
    quoteAllSync(size: BigNumber, options?: QuoteOptions): StrikeQuotes;
}
