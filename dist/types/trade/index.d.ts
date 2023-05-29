import { BigNumber } from '@ethersproject/bignumber';
import { PopulatedTransaction } from '@ethersproject/contracts';
import { Log } from '@ethersproject/providers';
import { AccountBalances } from '../account';
import { Board } from '../board';
import { DataSource } from '../constants/contracts';
import { Network } from '../constants/network';
import { AvalonOptionMarket } from '../contracts/avalon/typechain';
import { NewportOptionMarket } from '../contracts/newport/arbitrum/typechain';
import Lyra from '../lyra';
import { Market, MarketToken } from '../market';
import { Option } from '../option';
import { Position } from '../position';
import { QuoteFeeComponents, QuoteGreeks, QuoteIteration } from '../quote';
import { Strike } from '../strike';
export declare enum TradeDisabledReason {
    EmptySize = "EmptySize",
    Expired = "Expired",
    TradingCutoff = "TradingCutoff",
    InsufficientLiquidity = "InsufficientLiquidity",
    DeltaOutOfRange = "DeltaOutOfRange",
    VolTooHigh = "VolTooHigh",
    VolTooLow = "VolTooLow",
    IVTooHigh = "IVTooHigh",
    IVTooLow = "IVTooLow",
    SkewTooHigh = "SkewTooHigh",
    SkewTooLow = "SkewTooLow",
    NotEnoughCollateral = "NotEnoughCollateral",
    TooMuchCollateral = "TooMuchCollateral",
    EmptyCollateral = "EmptyCollateral",
    IncorrectOwner = "IncorrectOwner",
    PositionClosed = "PositionClosed",
    PositionNotLargeEnough = "PositionNotLargeEnough",
    PositionClosedLeftoverCollateral = "PositionClosedLeftoverCollateral",
    InsufficientQuoteAllowance = "InsufficientQuoteAllowance",
    InsufficientBaseAllowance = "InsufficientBaseAllowance",
    InsufficientQuoteBalance = "InsufficientQuoteBalance",
    InsufficientBaseBalance = "InsufficientBaseBalance",
    UnableToHedgeDelta = "UnableToHedgeDelta",
    PriceVarianceTooHigh = "PriceVarianceTooHigh"
}
export type TradeCollateral = {
    amount: BigNumber;
    min: BigNumber;
    max: BigNumber | null;
    isMin: boolean;
    isMax: boolean;
    isBase: boolean;
    liquidationPrice: BigNumber | null;
};
export type TradeOptions = {
    positionId?: number;
    setToCollateral?: BigNumber;
    setToFullCollateral?: boolean;
    isBaseCollateral?: boolean;
    iterations?: number;
    referrer?: string;
};
export type TradeOptionsSync = {
    position?: Position;
} & Omit<TradeOptions, 'positionId'>;
export type TradeToken = MarketToken & {
    transfer: BigNumber;
    receive: BigNumber;
    balance: BigNumber;
    newBalance: BigNumber;
};
export declare class Trade {
    lyra: Lyra;
    private __option;
    private __position?;
    private __balances;
    __source: DataSource;
    marketName: string;
    marketAddress: string;
    expiryTimestamp: number;
    boardId: number;
    strikePrice: BigNumber;
    strikeId: number;
    isCall: boolean;
    positionId?: number;
    isBuy: boolean;
    isOpen: boolean;
    isLong: boolean;
    owner: string;
    size: BigNumber;
    newSize: BigNumber;
    prevSize: BigNumber;
    pricePerOption: BigNumber;
    premium: BigNumber;
    quoted: BigNumber;
    fee: BigNumber;
    feeComponents: QuoteFeeComponents;
    collateral?: TradeCollateral;
    iv: BigNumber;
    fairIv: BigNumber;
    greeks: QuoteGreeks;
    slippage: number;
    baseToken: TradeToken;
    quoteToken: TradeToken;
    forceClosePenalty: BigNumber;
    spotPrice: BigNumber;
    isCollateralUpdate: boolean;
    isForceClose: boolean;
    isDisabled: boolean;
    disabledReason: TradeDisabledReason | null;
    tx: PopulatedTransaction;
    iterations: QuoteIteration[];
    contract: AvalonOptionMarket | NewportOptionMarket;
    method: 'openPosition' | 'closePosition' | 'forceClosePosition';
    params: Parameters<(AvalonOptionMarket | NewportOptionMarket)['openPosition']>;
    data: string;
    private constructor();
    static get(lyra: Lyra, owner: string, marketAddressOrName: string, strikeId: number, isCall: boolean, isBuy: boolean, size: BigNumber, slippage: number, options?: TradeOptions): Promise<Trade>;
    static getSync(lyra: Lyra, owner: string, option: Option, isBuy: boolean, size: BigNumber, slippage: number, balances: AccountBalances, options?: TradeOptionsSync): Trade;
    static getPositionIdsForLogs(logs: Log[], network: Network): number[];
    static getEventsForLogs(logs: Log[], network: Network): {
        trades: import("../constants/events").PartialTradeEvent[];
        updates: import("../constants/events").PartialPositionUpdatedEvent[];
    };
    static approveQuote(market: Market, owner: string, amountQuote: BigNumber): PopulatedTransaction;
    approveQuote(amountQuote: BigNumber): PopulatedTransaction;
    static approveBase(market: Market, owner: string, amountBase: BigNumber): PopulatedTransaction;
    approveBase(amountBase: BigNumber): PopulatedTransaction;
    pnl(): BigNumber;
    newAverageCostPerOption(): BigNumber;
    prevAverageCostPerOption(): BigNumber;
    newAverageCollateralSpotPrice(): BigNumber;
    prevAverageCollateralSpotPrice(): BigNumber;
    prevCollateralAmount(): BigNumber;
    collateralChangeAmount(): BigNumber;
    payoff(spotPriceAtExpiry: BigNumber): BigNumber;
    breakEven(): BigNumber;
    maxProfit(): BigNumber;
    maxLoss(): BigNumber;
    market(): Market;
    board(): Board;
    strike(): Strike;
    option(): Option;
    position(): Position | null;
    balances(): AccountBalances;
}
