import { BigNumber } from '@ethersproject/bignumber';
import { PopulatedTransaction } from '@ethersproject/contracts';
import Lyra, { MarketContractAddresses, Version } from '..';
import { LyraContractId, LyraGlobalContractId, LyraMarketContractId } from '../constants/contracts';
import { LyraContractMap, LyraMarketContractMap } from '../constants/mappings';
import { GMXAdapter } from '../contracts/newport/typechain/NewportGMXAdapter';
import { OptionGreekCache } from '../contracts/newport/typechain/NewportOptionGreekCache';
export type AdminMarketGlobalCache = {
    minUpdatedAt: BigNumber;
    minUpdatedAtPrice: BigNumber;
    maxUpdatedAtPrice: BigNumber;
    maxSkewVariance: BigNumber;
    maxIvVariance: BigNumber;
    netGreeks: OptionGreekCache.NetGreeksStruct;
    isGlobalCacheStale: boolean;
};
export type AdminAvalonGreekCacheParams = {
    maxStrikesPerBoard: BigNumber;
    acceptableSpotPricePercentMove: BigNumber;
    staleUpdateDuration: BigNumber;
    varianceIvGWAVPeriod: BigNumber;
    varianceSkewGWAVPeriod: BigNumber;
    optionValueIvGWAVPeriod: BigNumber;
    optionValueSkewGWAVPeriod: BigNumber;
    gwavSkewFloor: BigNumber;
    gwavSkewCap: BigNumber;
    rateAndCarry: BigNumber;
};
export type AdminNewportGreekCacheParams = {
    maxStrikesPerBoard: BigNumber;
    acceptableSpotPricePercentMove: BigNumber;
    staleUpdateDuration: BigNumber;
    varianceIvGWAVPeriod: BigNumber;
    varianceSkewGWAVPeriod: BigNumber;
    optionValueIvGWAVPeriod: BigNumber;
    optionValueSkewGWAVPeriod: BigNumber;
    gwavSkewFloor: BigNumber;
    gwavSkewCap: BigNumber;
};
export type AdminGreekCacheParams<V extends Version> = V extends Version.Avalon ? AdminAvalonGreekCacheParams : V extends Version.Newport ? AdminNewportGreekCacheParams : never;
export type AdminSetMarketParamsReturn<T> = {
    params: T;
    tx: PopulatedTransaction;
};
export type AdminForceCloseParams = {
    ivGWAVPeriod: BigNumber;
    skewGWAVPeriod: BigNumber;
    shortVolShock: BigNumber;
    shortPostCutoffVolShock: BigNumber;
    longVolShock: BigNumber;
    longPostCutoffVolShock: BigNumber;
    liquidateVolShock: BigNumber;
    liquidatePostCutoffVolShock: BigNumber;
    shortSpotMin: BigNumber;
    liquidateSpotMin: BigNumber;
};
export type AdminMinCollateralParams = {
    minStaticQuoteCollateral: BigNumber;
    minStaticBaseCollateral: BigNumber;
    shockVolA: BigNumber;
    shockVolPointA: BigNumber;
    shockVolB: BigNumber;
    shockVolPointB: BigNumber;
    callSpotPriceShock: BigNumber;
    putSpotPriceShock: BigNumber;
};
export type AdminOptionMarketParams = {
    maxBoardExpiry: BigNumber;
    securityModule: string;
    feePortionReserved: BigNumber;
    staticBaseSettlementFee: BigNumber;
};
export type AdminLiquidityPoolParams<V extends Version> = V extends Version.Avalon ? AdminAvalonLiquidityPoolParams : V extends Version.Newport ? AdminNewportLiquidityPoolParams : never;
export type AdminNewportLiquidityPoolParams = {
    minDepositWithdraw: BigNumber;
    depositDelay: BigNumber;
    withdrawalDelay: BigNumber;
    withdrawalFee: BigNumber;
    guardianMultisig: string;
    guardianDelay: BigNumber;
    adjustmentNetScalingFactor: BigNumber;
    callCollatScalingFactor: BigNumber;
    putCollatScalingFactor: BigNumber;
};
export type AdminAvalonLiquidityPoolParams = {
    minDepositWithdraw: BigNumber;
    depositDelay: BigNumber;
    withdrawalDelay: BigNumber;
    withdrawalFee: BigNumber;
    liquidityCBThreshold: BigNumber;
    liquidityCBTimeout: BigNumber;
    ivVarianceCBThreshold: BigNumber;
    skewVarianceCBThreshold: BigNumber;
    ivVarianceCBTimeout: BigNumber;
    skewVarianceCBTimeout: BigNumber;
    guardianMultisig: string;
    guardianDelay: BigNumber;
    boardSettlementCBTimeout: BigNumber;
    maxFeePaid: BigNumber;
};
export type AdminPricingParams = {
    optionPriceFeeCoefficient: BigNumber;
    optionPriceFee1xPoint: BigNumber;
    optionPriceFee2xPoint: BigNumber;
    spotPriceFeeCoefficient: BigNumber;
    spotPriceFee1xPoint: BigNumber;
    spotPriceFee2xPoint: BigNumber;
    vegaFeeCoefficient: BigNumber;
    standardSize: BigNumber;
    skewAdjustmentFactor: BigNumber;
};
export type AdminTradeLimitParams = {
    minDelta: BigNumber;
    minForceCloseDelta: BigNumber;
    tradingCutoff: BigNumber;
    minBaseIV: BigNumber;
    maxBaseIV: BigNumber;
    minSkew: BigNumber;
    maxSkew: BigNumber;
    minVol: BigNumber;
    maxVol: BigNumber;
    absMinSkew: BigNumber;
    absMaxSkew: BigNumber;
    capSkewsToAbs: boolean;
};
export type AdminVarianceFeeParams = {
    defaultVarianceFeeCoefficient: BigNumber;
    forceCloseVarianceFeeCoefficient: BigNumber;
    skewAdjustmentCoefficient: BigNumber;
    referenceSkew: BigNumber;
    minimumStaticSkewAdjustment: BigNumber;
    vegaCoefficient: BigNumber;
    minimumStaticVega: BigNumber;
    ivVarianceCoefficient: BigNumber;
    minimumStaticIvVariance: BigNumber;
};
export type AdminPartialCollatParams = {
    penaltyRatio: BigNumber;
    liquidatorFeeRatio: BigNumber;
    smFeeRatio: BigNumber;
    minLiquidationFee: BigNumber;
};
export type AdminPoolHedgerParams = {
    interactionDelay: BigNumber;
    hedgeCap: BigNumber;
};
export type AdminBoardParams = {
    expiry: BigNumber;
    baseIV: BigNumber;
    strikePrices: BigNumber[];
    skews: BigNumber[];
    frozen: boolean;
};
export type AdminAddBoardReturn = {
    tx: PopulatedTransaction;
    board: AdminBoardParams;
};
export type AdminStrikeParams = {
    boardId: BigNumber;
    strikePrice: BigNumber;
    skew: BigNumber;
};
export type AdminAddStrikeReturn = {
    tx: PopulatedTransaction;
    strike: AdminStrikeParams;
};
export type PoolHedgerParams = {
    interactionDelay: BigNumber;
    hedgeCap: BigNumber;
};
export type FuturesPoolHedgerParams = GMXFuturesPoolHedgerParams | SNXFuturesPoolHedgerParams;
export type SNXFuturesPoolHedgerParams = {
    targetLeverage: BigNumber;
    maximumFundingRate: BigNumber;
    deltaThreshold: BigNumber;
    marketDepthBuffer: BigNumber;
    priceDeltaBuffer: BigNumber;
    worstStableRate: BigNumber;
    maxOrderCap: BigNumber;
};
export type GMXFuturesPoolHedgerParams = {
    acceptableSpotSlippage: BigNumber;
    deltaThreshold: BigNumber;
    marketDepthBuffer: BigNumber;
    targetLeverage: BigNumber;
    maxLeverage: BigNumber;
    minCancelDelay: BigNumber;
    minCollateralUpdate: BigNumber;
    vaultLiquidityCheckEnabled: boolean;
};
export type AdminAdapterMarketPricingParams = {
    staticSwapFeeEstimate: BigNumber;
    gmxUsageThreshold: BigNumber;
    priceVarianceCBPercent: BigNumber;
    chainlinkStalenessCheck: BigNumber;
};
export type AdminAdapterMarketConfigurationParams = {
    staticEstimationDiscount: BigNumber;
    snxPerpV2MarketAddress: string;
    pool: string;
    feeTier: number;
};
export type AdminCircuitBreakerParams = {
    liquidityCBThreshold: BigNumber;
    liquidityCBTimeout: BigNumber;
    ivVarianceCBThreshold: BigNumber;
    skewVarianceCBThreshold: BigNumber;
    ivVarianceCBTimeout: BigNumber;
    skewVarianceCBTimeout: BigNumber;
    boardSettlementCBTimeout: BigNumber;
    contractAdjustmentCBTimeout: BigNumber;
};
export declare class Admin {
    lyra: Lyra;
    constructor(lyra: Lyra);
    static get(lyra: Lyra): Admin;
    contract<V extends Version, C extends LyraContractId>(version: V, contractId: C): LyraContractMap<V, C>;
    marketContract<V extends Version, C extends LyraMarketContractId>(marketContractAddresses: MarketContractAddresses, version: V, contractId: C): LyraMarketContractMap<V, C>;
    globalContract(contractId: LyraGlobalContractId): import("../contracts/common/typechain").MultiDistributor | import("../contracts/common/typechain").Multicall3;
    getMarketContractForAddress<V extends Version>(marketContractAddresses: MarketContractAddresses, version: V, contractAddress: string): {
        contractId: string;
        contract: LyraMarketContractMap<V, LyraMarketContractId>;
    } | null;
    owner(): Promise<string>;
    isMarketPaused(marketAddress: string): Promise<boolean>;
    isGlobalPaused(): Promise<boolean>;
    getMarketGlobalCache(marketAddress: string): Promise<AdminMarketGlobalCache>;
    setGlobalPaused(isPaused: boolean): Promise<PopulatedTransaction>;
    setMarketPaused(marketAddressOrName: string, isPaused: boolean): Promise<PopulatedTransaction>;
    addMarketToViewer(newMarketAddresses: MarketContractAddresses): Promise<PopulatedTransaction>;
    addMarketToRegistry(newMarketAddresses: MarketContractAddresses & {
        gwavOracle: string;
    }): Promise<PopulatedTransaction>;
    addBoard(marketAddressOrName: string, expiry: BigNumber, baseIV: BigNumber, strikePrices: BigNumber[], skews: BigNumber[], frozen?: boolean): Promise<AdminAddBoardReturn>;
    addStrikeToBoard(marketAddresOrName: string, boardId: BigNumber, strike: BigNumber, skew: BigNumber): Promise<AdminAddStrikeReturn>;
    setBoardPaused(marketAddresOrName: string, boardId: BigNumber, isPaused: boolean): Promise<PopulatedTransaction>;
    setBoardBaseIv(marketAddresOrName: string, boardId: BigNumber, baseIv: BigNumber): Promise<PopulatedTransaction>;
    setStrikeSkew(marketAddresOrName: string, strikeId: BigNumber, skew: BigNumber): Promise<PopulatedTransaction>;
    setGreekCacheParams<V extends Version>(version: V, marketAddresOrName: string, greekCacheParams: Partial<AdminGreekCacheParams<V>>): Promise<AdminSetMarketParamsReturn<AdminGreekCacheParams<V>>>;
    setForceCloseParams(marketAddresOrName: string, forceCloseParams: Partial<AdminForceCloseParams>): Promise<AdminSetMarketParamsReturn<AdminForceCloseParams>>;
    setMinCollateralParams(marketAddresOrName: string, minCollateralParams: Partial<AdminMinCollateralParams>): Promise<AdminSetMarketParamsReturn<AdminMinCollateralParams>>;
    setLiquidityPoolParams<V extends Version>(version: V, marketAddressOrName: string, lpParams: Partial<AdminLiquidityPoolParams<V>>): Promise<AdminSetMarketParamsReturn<AdminLiquidityPoolParams<V>>>;
    setPricingParams(marketAddressOrName: string, pricingParams: Partial<AdminPricingParams>): Promise<AdminSetMarketParamsReturn<AdminPricingParams>>;
    setTradeLimitParams(marketAddressOrName: string, tradeLimitParams: Partial<AdminTradeLimitParams>): Promise<AdminSetMarketParamsReturn<AdminTradeLimitParams>>;
    setVarianceFeeParams(marketAddressOrName: string, params: Partial<AdminVarianceFeeParams>): Promise<AdminSetMarketParamsReturn<AdminVarianceFeeParams>>;
    setPartialCollatParams(marketAddressOrName: string, params: Partial<AdminPartialCollatParams>): Promise<AdminSetMarketParamsReturn<AdminPartialCollatParams>>;
    setOptionMarketParams(marketAddressOrName: string, params: Partial<AdminOptionMarketParams>): Promise<AdminSetMarketParamsReturn<AdminOptionMarketParams>>;
    setAdapterMarketPricingParams(marketAddressOrName: string, params: Partial<AdminAdapterMarketPricingParams>): Promise<{
        params: {
            staticSwapFeeEstimate: BigNumber;
            gmxUsageThreshold: BigNumber;
            priceVarianceCBPercent: BigNumber;
            chainlinkStalenessCheck: BigNumber;
            0: BigNumber;
            1: BigNumber;
            2: BigNumber;
            3: BigNumber;
            length: 4;
            toString: (() => string) & (() => string);
            toLocaleString: (() => string) & (() => string);
            pop(): BigNumber | undefined;
            push(...items: BigNumber[]): number;
            concat(...items: ConcatArray<BigNumber>[]): BigNumber[];
            concat(...items: (BigNumber | ConcatArray<BigNumber>)[]): BigNumber[];
            join(separator?: string | undefined): string;
            reverse(): BigNumber[];
            shift(): BigNumber | undefined;
            slice(start?: number | undefined, end?: number | undefined): BigNumber[];
            sort(compareFn?: ((a: BigNumber, b: BigNumber) => number) | undefined): GMXAdapter.MarketPricingParamsStructOutput;
            splice(start: number, deleteCount?: number | undefined): BigNumber[];
            splice(start: number, deleteCount: number, ...items: BigNumber[]): BigNumber[];
            unshift(...items: BigNumber[]): number;
            indexOf(searchElement: BigNumber, fromIndex?: number | undefined): number;
            lastIndexOf(searchElement: BigNumber, fromIndex?: number | undefined): number;
            every<S extends BigNumber>(predicate: (value: BigNumber, index: number, array: BigNumber[]) => value is S, thisArg?: any): this is S[];
            every(predicate: (value: BigNumber, index: number, array: BigNumber[]) => unknown, thisArg?: any): boolean;
            some(predicate: (value: BigNumber, index: number, array: BigNumber[]) => unknown, thisArg?: any): boolean;
            forEach(callbackfn: (value: BigNumber, index: number, array: BigNumber[]) => void, thisArg?: any): void;
            map<U>(callbackfn: (value: BigNumber, index: number, array: BigNumber[]) => U, thisArg?: any): U[];
            filter<S_1 extends BigNumber>(predicate: (value: BigNumber, index: number, array: BigNumber[]) => value is S_1, thisArg?: any): S_1[];
            filter(predicate: (value: BigNumber, index: number, array: BigNumber[]) => unknown, thisArg?: any): BigNumber[];
            reduce(callbackfn: (previousValue: BigNumber, currentValue: BigNumber, currentIndex: number, array: BigNumber[]) => BigNumber): BigNumber;
            reduce(callbackfn: (previousValue: BigNumber, currentValue: BigNumber, currentIndex: number, array: BigNumber[]) => BigNumber, initialValue: BigNumber): BigNumber;
            reduce<U_1>(callbackfn: (previousValue: U_1, currentValue: BigNumber, currentIndex: number, array: BigNumber[]) => U_1, initialValue: U_1): U_1;
            reduceRight(callbackfn: (previousValue: BigNumber, currentValue: BigNumber, currentIndex: number, array: BigNumber[]) => BigNumber): BigNumber;
            reduceRight(callbackfn: (previousValue: BigNumber, currentValue: BigNumber, currentIndex: number, array: BigNumber[]) => BigNumber, initialValue: BigNumber): BigNumber;
            reduceRight<U_2>(callbackfn: (previousValue: U_2, currentValue: BigNumber, currentIndex: number, array: BigNumber[]) => U_2, initialValue: U_2): U_2;
            find<S_2 extends BigNumber>(predicate: (this: void, value: BigNumber, index: number, obj: BigNumber[]) => value is S_2, thisArg?: any): S_2 | undefined;
            find(predicate: (value: BigNumber, index: number, obj: BigNumber[]) => unknown, thisArg?: any): BigNumber | undefined;
            findIndex(predicate: (value: BigNumber, index: number, obj: BigNumber[]) => unknown, thisArg?: any): number;
            fill(value: BigNumber, start?: number | undefined, end?: number | undefined): GMXAdapter.MarketPricingParamsStructOutput;
            copyWithin(target: number, start: number, end?: number | undefined): GMXAdapter.MarketPricingParamsStructOutput;
            entries(): IterableIterator<[number, BigNumber]>;
            keys(): IterableIterator<number>;
            values(): IterableIterator<BigNumber>;
            includes(searchElement: BigNumber, fromIndex?: number | undefined): boolean;
            flatMap<U_3, This = undefined>(callback: (this: This, value: BigNumber, index: number, array: BigNumber[]) => U_3 | readonly U_3[], thisArg?: This | undefined): U_3[];
            flat<A, D extends number = 1>(this: A, depth?: D | undefined): FlatArray<A, D>[];
            [Symbol.iterator](): IterableIterator<BigNumber>;
            [Symbol.unscopables](): {
                copyWithin: boolean;
                entries: boolean;
                fill: boolean;
                find: boolean;
                findIndex: boolean;
                keys: boolean;
                values: boolean;
            };
            at(index: number): BigNumber | undefined;
        };
        tx: PopulatedTransaction;
    }>;
    setAdapterMarketConfigurationParams(marketAddressOrName: string, params: Partial<AdminAdapterMarketConfigurationParams>): Promise<{
        params: {
            staticEstimationDiscount: BigNumber;
            snxPerpV2MarketAddress: string;
            pool: string;
            feeTier: number;
        };
        tx: PopulatedTransaction;
    }>;
    setPoolHedgerParams(marketAddressOrName: string, params: Partial<PoolHedgerParams>): Promise<AdminSetMarketParamsReturn<PoolHedgerParams>>;
    setFuturesPoolHedgerParams(marketAddressOrName: string, params: Partial<FuturesPoolHedgerParams>): Promise<AdminSetMarketParamsReturn<FuturesPoolHedgerParams>>;
    setCircuitBreakerParams(marketAddressOrName: string, params: Partial<AdminCircuitBreakerParams>): Promise<AdminSetMarketParamsReturn<AdminCircuitBreakerParams>>;
    processDepositQueue(marketAddressOrName: string, limit: number): Promise<PopulatedTransaction>;
    processWithdrawalQueue(marketAddressOrName: string, limit: number): Promise<PopulatedTransaction>;
}
