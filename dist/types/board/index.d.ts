import { BigNumber } from '@ethersproject/bignumber';
import { Block } from '@ethersproject/providers';
import { DataSource } from '../constants/contracts';
import { BoardViewStructOutput } from '../constants/views';
import Lyra from '../lyra';
import { Market } from '../market';
import { Option } from '../option';
import { Quote, QuoteOptions } from '../quote';
import { Strike, StrikeQuotes } from '../strike';
export type BoardQuotes = {
    strikes: StrikeQuotes[];
    board: Board;
};
export type BoardParams = {
    varianceGwavIv: BigNumber;
    forceCloseGwavIv: BigNumber;
    isBoardPaused: boolean;
};
export declare class Board {
    private __market;
    private liveStrikeMap;
    __source: DataSource;
    lyra: Lyra;
    block: Block;
    id: number;
    expiryTimestamp: number;
    tradingCutoffTimestamp: number;
    isExpired: boolean;
    isTradingCutoff: boolean;
    timeToExpiry: number;
    timeToTradingCutoff: number;
    spotPriceAtExpiry?: BigNumber;
    baseIv: BigNumber;
    isPaused: boolean;
    params: BoardParams;
    constructor(lyra: Lyra, market: Market, boardView: BoardViewStructOutput, block: Block);
    private static getFields;
    static get(lyra: Lyra, marketAddressOrName: string, boardId: number): Promise<Board>;
    refresh(): Promise<Board>;
    market(): Market;
    strikes(): Strike[];
    strike(strikeId: number): Strike;
    option(strikeId: number, isCall: boolean): Option;
    quote(strikeId: number, isCall: boolean, isBuy: boolean, size: BigNumber, options?: QuoteOptions): Promise<Quote>;
    quoteSync(strikeId: number, isCall: boolean, isBuy: boolean, size: BigNumber, options?: QuoteOptions): Quote;
    quoteAll(size: BigNumber, options?: QuoteOptions): Promise<BoardQuotes>;
    quoteAllSync(size: BigNumber, options?: QuoteOptions): BoardQuotes;
}
