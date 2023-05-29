import { BigNumber } from '@ethersproject/bignumber';
import { Board } from '../board';
import { DataSource } from '../constants/contracts';
import Lyra from '../lyra';
import { Market } from '../market';
import { Option } from '../option';
import { Strike } from '../strike';
export declare enum QuoteDisabledReason {
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
    UnableToHedgeDelta = "UnableToHedgeDelta",
    PriceVarianceTooHigh = "PriceVarianceTooHigh"
}
export type QuoteIteration = {
    premium: BigNumber;
    optionPriceFee: BigNumber;
    spotPriceFee: BigNumber;
    vegaUtilFee: QuoteVegaUtilFeeComponents;
    varianceFee: QuoteVarianceFeeComponents;
    forceClosePenalty: BigNumber;
    volTraded: BigNumber;
    newBaseIv: BigNumber;
    newSkew: BigNumber;
    postTradeAmmNetStdVega: BigNumber;
    spotPrice: BigNumber;
};
export type QuoteFeeComponents = {
    optionPriceFee: BigNumber;
    spotPriceFee: BigNumber;
    vegaUtilFee: BigNumber;
    varianceFee: BigNumber;
};
export type QuoteVarianceFeeComponents = {
    varianceFeeCoefficient: BigNumber;
    vega: BigNumber;
    vegaCoefficient: BigNumber;
    skew: BigNumber;
    skewCoefficient: BigNumber;
    ivVariance: BigNumber;
    ivVarianceCoefficient: BigNumber;
    varianceFee: BigNumber;
};
export type QuoteVegaUtilFeeComponents = {
    preTradeAmmNetStdVega: BigNumber;
    postTradeAmmNetStdVega: BigNumber;
    vegaUtil: BigNumber;
    volTraded: BigNumber;
    NAV: BigNumber;
    vegaUtilFee: BigNumber;
};
export type QuoteGreeks = {
    delta: BigNumber;
    vega: BigNumber;
    gamma: BigNumber;
    rho: BigNumber;
    theta: BigNumber;
};
export type QuoteOptions = {
    isForceClose?: boolean;
    isOpen?: boolean;
    isLong?: boolean;
    iterations?: number;
};
export declare class Quote {
    private lyra;
    private __option;
    __source: DataSource;
    marketName: string;
    marketAddress: string;
    expiryTimestamp: number;
    boardId: number;
    strikePrice: BigNumber;
    strikeId: number;
    isCall: boolean;
    isBuy: boolean;
    size: BigNumber;
    pricePerOption: BigNumber;
    premium: BigNumber;
    fee: BigNumber;
    feeComponents: QuoteFeeComponents;
    iv: BigNumber;
    fairIv: BigNumber;
    greeks: QuoteGreeks;
    forceClosePenalty: BigNumber;
    isForceClose: boolean;
    breakEven: BigNumber;
    toBreakEven: BigNumber;
    spotPrice: BigNumber;
    isDisabled: boolean;
    disabledReason: QuoteDisabledReason | null;
    iterations: QuoteIteration[];
    constructor(lyra: Lyra, option: Option, isBuy: boolean, size: BigNumber, options?: QuoteOptions);
    private getDisabledFields;
    private getFields;
    static get(lyra: Lyra, marketAddressOrName: string, strikeId: number, isCall: boolean, isBuy: boolean, size: BigNumber, options?: QuoteOptions): Promise<Quote>;
    static getSync(lyra: Lyra, option: Option, isBuy: boolean, size: BigNumber, options?: QuoteOptions): Quote;
    market(): Market;
    board(): Board;
    strike(): Strike;
    option(): Option;
}
