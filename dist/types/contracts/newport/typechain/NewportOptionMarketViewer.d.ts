import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "./common";
export declare namespace OptionMarketViewer {
    type OptionMarketAddressesStruct = {
        liquidityPool: PromiseOrValue<string>;
        liquidityToken: PromiseOrValue<string>;
        greekCache: PromiseOrValue<string>;
        optionMarket: PromiseOrValue<string>;
        optionMarketPricer: PromiseOrValue<string>;
        optionToken: PromiseOrValue<string>;
        shortCollateral: PromiseOrValue<string>;
        poolHedger: PromiseOrValue<string>;
        quoteAsset: PromiseOrValue<string>;
        baseAsset: PromiseOrValue<string>;
    };
    type OptionMarketAddressesStructOutput = [
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string
    ] & {
        liquidityPool: string;
        liquidityToken: string;
        greekCache: string;
        optionMarket: string;
        optionMarketPricer: string;
        optionToken: string;
        shortCollateral: string;
        poolHedger: string;
        quoteAsset: string;
        baseAsset: string;
    };
    type StrikeViewStruct = {
        strikeId: PromiseOrValue<BigNumberish>;
        boardId: PromiseOrValue<BigNumberish>;
        strikePrice: PromiseOrValue<BigNumberish>;
        skew: PromiseOrValue<BigNumberish>;
        forceCloseSkew: PromiseOrValue<BigNumberish>;
        cachedGreeks: OptionGreekCache.StrikeGreeksStruct;
        baseReturnedRatio: PromiseOrValue<BigNumberish>;
        longCallOpenInterest: PromiseOrValue<BigNumberish>;
        longPutOpenInterest: PromiseOrValue<BigNumberish>;
        shortCallBaseOpenInterest: PromiseOrValue<BigNumberish>;
        shortCallQuoteOpenInterest: PromiseOrValue<BigNumberish>;
        shortPutOpenInterest: PromiseOrValue<BigNumberish>;
    };
    type StrikeViewStructOutput = [
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        OptionGreekCache.StrikeGreeksStructOutput,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber
    ] & {
        strikeId: BigNumber;
        boardId: BigNumber;
        strikePrice: BigNumber;
        skew: BigNumber;
        forceCloseSkew: BigNumber;
        cachedGreeks: OptionGreekCache.StrikeGreeksStructOutput;
        baseReturnedRatio: BigNumber;
        longCallOpenInterest: BigNumber;
        longPutOpenInterest: BigNumber;
        shortCallBaseOpenInterest: BigNumber;
        shortCallQuoteOpenInterest: BigNumber;
        shortPutOpenInterest: BigNumber;
    };
    type BoardViewStruct = {
        market: PromiseOrValue<string>;
        boardId: PromiseOrValue<BigNumberish>;
        expiry: PromiseOrValue<BigNumberish>;
        baseIv: PromiseOrValue<BigNumberish>;
        priceAtExpiry: PromiseOrValue<BigNumberish>;
        isPaused: PromiseOrValue<boolean>;
        varianceGwavIv: PromiseOrValue<BigNumberish>;
        forceCloseGwavIv: PromiseOrValue<BigNumberish>;
        longScaleFactor: PromiseOrValue<BigNumberish>;
        netGreeks: OptionGreekCache.NetGreeksStruct;
        strikes: OptionMarketViewer.StrikeViewStruct[];
    };
    type BoardViewStructOutput = [
        string,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        boolean,
        BigNumber,
        BigNumber,
        BigNumber,
        OptionGreekCache.NetGreeksStructOutput,
        OptionMarketViewer.StrikeViewStructOutput[]
    ] & {
        market: string;
        boardId: BigNumber;
        expiry: BigNumber;
        baseIv: BigNumber;
        priceAtExpiry: BigNumber;
        isPaused: boolean;
        varianceGwavIv: BigNumber;
        forceCloseGwavIv: BigNumber;
        longScaleFactor: BigNumber;
        netGreeks: OptionGreekCache.NetGreeksStructOutput;
        strikes: OptionMarketViewer.StrikeViewStructOutput[];
    };
    type MarketParametersStruct = {
        optionMarketParams: OptionMarket.OptionMarketParametersStruct;
        lpParams: LiquidityPool.LiquidityPoolParametersStruct;
        cbParams: LiquidityPool.CircuitBreakerParametersStruct;
        greekCacheParams: OptionGreekCache.GreekCacheParametersStruct;
        forceCloseParams: OptionGreekCache.ForceCloseParametersStruct;
        minCollatParams: OptionGreekCache.MinCollateralParametersStruct;
        pricingParams: OptionMarketPricer.PricingParametersStruct;
        tradeLimitParams: OptionMarketPricer.TradeLimitParametersStruct;
        varianceFeeParams: OptionMarketPricer.VarianceFeeParametersStruct;
        partialCollatParams: OptionToken.PartialCollateralParametersStruct;
    };
    type MarketParametersStructOutput = [
        OptionMarket.OptionMarketParametersStructOutput,
        LiquidityPool.LiquidityPoolParametersStructOutput,
        LiquidityPool.CircuitBreakerParametersStructOutput,
        OptionGreekCache.GreekCacheParametersStructOutput,
        OptionGreekCache.ForceCloseParametersStructOutput,
        OptionGreekCache.MinCollateralParametersStructOutput,
        OptionMarketPricer.PricingParametersStructOutput,
        OptionMarketPricer.TradeLimitParametersStructOutput,
        OptionMarketPricer.VarianceFeeParametersStructOutput,
        OptionToken.PartialCollateralParametersStructOutput
    ] & {
        optionMarketParams: OptionMarket.OptionMarketParametersStructOutput;
        lpParams: LiquidityPool.LiquidityPoolParametersStructOutput;
        cbParams: LiquidityPool.CircuitBreakerParametersStructOutput;
        greekCacheParams: OptionGreekCache.GreekCacheParametersStructOutput;
        forceCloseParams: OptionGreekCache.ForceCloseParametersStructOutput;
        minCollatParams: OptionGreekCache.MinCollateralParametersStructOutput;
        pricingParams: OptionMarketPricer.PricingParametersStructOutput;
        tradeLimitParams: OptionMarketPricer.TradeLimitParametersStructOutput;
        varianceFeeParams: OptionMarketPricer.VarianceFeeParametersStructOutput;
        partialCollatParams: OptionToken.PartialCollateralParametersStructOutput;
    };
    type MarketViewStruct = {
        isPaused: PromiseOrValue<boolean>;
        spotPrice: PromiseOrValue<BigNumberish>;
        quoteSymbol: PromiseOrValue<string>;
        quoteDecimals: PromiseOrValue<BigNumberish>;
        baseSymbol: PromiseOrValue<string>;
        baseDecimals: PromiseOrValue<BigNumberish>;
        liquidity: LiquidityPool.LiquidityStruct;
        marketAddresses: OptionMarketViewer.OptionMarketAddressesStruct;
        marketParameters: OptionMarketViewer.MarketParametersStruct;
        globalNetGreeks: OptionGreekCache.NetGreeksStruct;
        liveBoards: OptionMarketViewer.BoardViewStruct[];
    };
    type MarketViewStructOutput = [
        boolean,
        BigNumber,
        string,
        BigNumber,
        string,
        BigNumber,
        LiquidityPool.LiquidityStructOutput,
        OptionMarketViewer.OptionMarketAddressesStructOutput,
        OptionMarketViewer.MarketParametersStructOutput,
        OptionGreekCache.NetGreeksStructOutput,
        OptionMarketViewer.BoardViewStructOutput[]
    ] & {
        isPaused: boolean;
        spotPrice: BigNumber;
        quoteSymbol: string;
        quoteDecimals: BigNumber;
        baseSymbol: string;
        baseDecimals: BigNumber;
        liquidity: LiquidityPool.LiquidityStructOutput;
        marketAddresses: OptionMarketViewer.OptionMarketAddressesStructOutput;
        marketParameters: OptionMarketViewer.MarketParametersStructOutput;
        globalNetGreeks: OptionGreekCache.NetGreeksStructOutput;
        liveBoards: OptionMarketViewer.BoardViewStructOutput[];
    };
    type MarketsViewStruct = {
        isPaused: PromiseOrValue<boolean>;
        markets: OptionMarketViewer.MarketViewStruct[];
    };
    type MarketsViewStructOutput = [
        boolean,
        OptionMarketViewer.MarketViewStructOutput[]
    ] & {
        isPaused: boolean;
        markets: OptionMarketViewer.MarketViewStructOutput[];
    };
    type MarketOptionPositionsStruct = {
        market: PromiseOrValue<string>;
        positions: OptionToken.OptionPositionStruct[];
    };
    type MarketOptionPositionsStructOutput = [
        string,
        OptionToken.OptionPositionStructOutput[]
    ] & {
        market: string;
        positions: OptionToken.OptionPositionStructOutput[];
    };
}
export declare namespace OptionGreekCache {
    type NetGreeksStruct = {
        netDelta: PromiseOrValue<BigNumberish>;
        netStdVega: PromiseOrValue<BigNumberish>;
        netOptionValue: PromiseOrValue<BigNumberish>;
    };
    type NetGreeksStructOutput = [BigNumber, BigNumber, BigNumber] & {
        netDelta: BigNumber;
        netStdVega: BigNumber;
        netOptionValue: BigNumber;
    };
    type StrikeGreeksStruct = {
        callDelta: PromiseOrValue<BigNumberish>;
        putDelta: PromiseOrValue<BigNumberish>;
        stdVega: PromiseOrValue<BigNumberish>;
        callPrice: PromiseOrValue<BigNumberish>;
        putPrice: PromiseOrValue<BigNumberish>;
    };
    type StrikeGreeksStructOutput = [
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber
    ] & {
        callDelta: BigNumber;
        putDelta: BigNumber;
        stdVega: BigNumber;
        callPrice: BigNumber;
        putPrice: BigNumber;
    };
    type GreekCacheParametersStruct = {
        maxStrikesPerBoard: PromiseOrValue<BigNumberish>;
        acceptableSpotPricePercentMove: PromiseOrValue<BigNumberish>;
        staleUpdateDuration: PromiseOrValue<BigNumberish>;
        varianceIvGWAVPeriod: PromiseOrValue<BigNumberish>;
        varianceSkewGWAVPeriod: PromiseOrValue<BigNumberish>;
        optionValueIvGWAVPeriod: PromiseOrValue<BigNumberish>;
        optionValueSkewGWAVPeriod: PromiseOrValue<BigNumberish>;
        gwavSkewFloor: PromiseOrValue<BigNumberish>;
        gwavSkewCap: PromiseOrValue<BigNumberish>;
    };
    type GreekCacheParametersStructOutput = [
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber
    ] & {
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
    type ForceCloseParametersStruct = {
        ivGWAVPeriod: PromiseOrValue<BigNumberish>;
        skewGWAVPeriod: PromiseOrValue<BigNumberish>;
        shortVolShock: PromiseOrValue<BigNumberish>;
        shortPostCutoffVolShock: PromiseOrValue<BigNumberish>;
        longVolShock: PromiseOrValue<BigNumberish>;
        longPostCutoffVolShock: PromiseOrValue<BigNumberish>;
        liquidateVolShock: PromiseOrValue<BigNumberish>;
        liquidatePostCutoffVolShock: PromiseOrValue<BigNumberish>;
        shortSpotMin: PromiseOrValue<BigNumberish>;
        liquidateSpotMin: PromiseOrValue<BigNumberish>;
    };
    type ForceCloseParametersStructOutput = [
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber
    ] & {
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
    type MinCollateralParametersStruct = {
        minStaticQuoteCollateral: PromiseOrValue<BigNumberish>;
        minStaticBaseCollateral: PromiseOrValue<BigNumberish>;
        shockVolA: PromiseOrValue<BigNumberish>;
        shockVolPointA: PromiseOrValue<BigNumberish>;
        shockVolB: PromiseOrValue<BigNumberish>;
        shockVolPointB: PromiseOrValue<BigNumberish>;
        callSpotPriceShock: PromiseOrValue<BigNumberish>;
        putSpotPriceShock: PromiseOrValue<BigNumberish>;
    };
    type MinCollateralParametersStructOutput = [
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber
    ] & {
        minStaticQuoteCollateral: BigNumber;
        minStaticBaseCollateral: BigNumber;
        shockVolA: BigNumber;
        shockVolPointA: BigNumber;
        shockVolB: BigNumber;
        shockVolPointB: BigNumber;
        callSpotPriceShock: BigNumber;
        putSpotPriceShock: BigNumber;
    };
}
export declare namespace LiquidityPool {
    type LiquidityStruct = {
        freeLiquidity: PromiseOrValue<BigNumberish>;
        burnableLiquidity: PromiseOrValue<BigNumberish>;
        reservedCollatLiquidity: PromiseOrValue<BigNumberish>;
        pendingDeltaLiquidity: PromiseOrValue<BigNumberish>;
        usedDeltaLiquidity: PromiseOrValue<BigNumberish>;
        NAV: PromiseOrValue<BigNumberish>;
        longScaleFactor: PromiseOrValue<BigNumberish>;
    };
    type LiquidityStructOutput = [
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber
    ] & {
        freeLiquidity: BigNumber;
        burnableLiquidity: BigNumber;
        reservedCollatLiquidity: BigNumber;
        pendingDeltaLiquidity: BigNumber;
        usedDeltaLiquidity: BigNumber;
        NAV: BigNumber;
        longScaleFactor: BigNumber;
    };
    type LiquidityPoolParametersStruct = {
        minDepositWithdraw: PromiseOrValue<BigNumberish>;
        depositDelay: PromiseOrValue<BigNumberish>;
        withdrawalDelay: PromiseOrValue<BigNumberish>;
        withdrawalFee: PromiseOrValue<BigNumberish>;
        guardianMultisig: PromiseOrValue<string>;
        guardianDelay: PromiseOrValue<BigNumberish>;
        adjustmentNetScalingFactor: PromiseOrValue<BigNumberish>;
        callCollatScalingFactor: PromiseOrValue<BigNumberish>;
        putCollatScalingFactor: PromiseOrValue<BigNumberish>;
    };
    type LiquidityPoolParametersStructOutput = [
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        string,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber
    ] & {
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
    type CircuitBreakerParametersStruct = {
        liquidityCBThreshold: PromiseOrValue<BigNumberish>;
        liquidityCBTimeout: PromiseOrValue<BigNumberish>;
        ivVarianceCBThreshold: PromiseOrValue<BigNumberish>;
        skewVarianceCBThreshold: PromiseOrValue<BigNumberish>;
        ivVarianceCBTimeout: PromiseOrValue<BigNumberish>;
        skewVarianceCBTimeout: PromiseOrValue<BigNumberish>;
        boardSettlementCBTimeout: PromiseOrValue<BigNumberish>;
        contractAdjustmentCBTimeout: PromiseOrValue<BigNumberish>;
    };
    type CircuitBreakerParametersStructOutput = [
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber
    ] & {
        liquidityCBThreshold: BigNumber;
        liquidityCBTimeout: BigNumber;
        ivVarianceCBThreshold: BigNumber;
        skewVarianceCBThreshold: BigNumber;
        ivVarianceCBTimeout: BigNumber;
        skewVarianceCBTimeout: BigNumber;
        boardSettlementCBTimeout: BigNumber;
        contractAdjustmentCBTimeout: BigNumber;
    };
}
export declare namespace OptionMarket {
    type OptionMarketParametersStruct = {
        maxBoardExpiry: PromiseOrValue<BigNumberish>;
        securityModule: PromiseOrValue<string>;
        feePortionReserved: PromiseOrValue<BigNumberish>;
        staticBaseSettlementFee: PromiseOrValue<BigNumberish>;
    };
    type OptionMarketParametersStructOutput = [
        BigNumber,
        string,
        BigNumber,
        BigNumber
    ] & {
        maxBoardExpiry: BigNumber;
        securityModule: string;
        feePortionReserved: BigNumber;
        staticBaseSettlementFee: BigNumber;
    };
}
export declare namespace OptionMarketPricer {
    type PricingParametersStruct = {
        optionPriceFeeCoefficient: PromiseOrValue<BigNumberish>;
        optionPriceFee1xPoint: PromiseOrValue<BigNumberish>;
        optionPriceFee2xPoint: PromiseOrValue<BigNumberish>;
        spotPriceFeeCoefficient: PromiseOrValue<BigNumberish>;
        spotPriceFee1xPoint: PromiseOrValue<BigNumberish>;
        spotPriceFee2xPoint: PromiseOrValue<BigNumberish>;
        vegaFeeCoefficient: PromiseOrValue<BigNumberish>;
        standardSize: PromiseOrValue<BigNumberish>;
        skewAdjustmentFactor: PromiseOrValue<BigNumberish>;
    };
    type PricingParametersStructOutput = [
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber
    ] & {
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
    type TradeLimitParametersStruct = {
        minDelta: PromiseOrValue<BigNumberish>;
        minForceCloseDelta: PromiseOrValue<BigNumberish>;
        tradingCutoff: PromiseOrValue<BigNumberish>;
        minBaseIV: PromiseOrValue<BigNumberish>;
        maxBaseIV: PromiseOrValue<BigNumberish>;
        minSkew: PromiseOrValue<BigNumberish>;
        maxSkew: PromiseOrValue<BigNumberish>;
        minVol: PromiseOrValue<BigNumberish>;
        maxVol: PromiseOrValue<BigNumberish>;
        absMinSkew: PromiseOrValue<BigNumberish>;
        absMaxSkew: PromiseOrValue<BigNumberish>;
        capSkewsToAbs: PromiseOrValue<boolean>;
    };
    type TradeLimitParametersStructOutput = [
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        boolean
    ] & {
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
    type VarianceFeeParametersStruct = {
        defaultVarianceFeeCoefficient: PromiseOrValue<BigNumberish>;
        forceCloseVarianceFeeCoefficient: PromiseOrValue<BigNumberish>;
        skewAdjustmentCoefficient: PromiseOrValue<BigNumberish>;
        referenceSkew: PromiseOrValue<BigNumberish>;
        minimumStaticSkewAdjustment: PromiseOrValue<BigNumberish>;
        vegaCoefficient: PromiseOrValue<BigNumberish>;
        minimumStaticVega: PromiseOrValue<BigNumberish>;
        ivVarianceCoefficient: PromiseOrValue<BigNumberish>;
        minimumStaticIvVariance: PromiseOrValue<BigNumberish>;
    };
    type VarianceFeeParametersStructOutput = [
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber
    ] & {
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
}
export declare namespace OptionToken {
    type PartialCollateralParametersStruct = {
        penaltyRatio: PromiseOrValue<BigNumberish>;
        liquidatorFeeRatio: PromiseOrValue<BigNumberish>;
        smFeeRatio: PromiseOrValue<BigNumberish>;
        minLiquidationFee: PromiseOrValue<BigNumberish>;
    };
    type PartialCollateralParametersStructOutput = [
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber
    ] & {
        penaltyRatio: BigNumber;
        liquidatorFeeRatio: BigNumber;
        smFeeRatio: BigNumber;
        minLiquidationFee: BigNumber;
    };
    type OptionPositionStruct = {
        positionId: PromiseOrValue<BigNumberish>;
        strikeId: PromiseOrValue<BigNumberish>;
        optionType: PromiseOrValue<BigNumberish>;
        amount: PromiseOrValue<BigNumberish>;
        collateral: PromiseOrValue<BigNumberish>;
        state: PromiseOrValue<BigNumberish>;
    };
    type OptionPositionStructOutput = [
        BigNumber,
        BigNumber,
        number,
        BigNumber,
        BigNumber,
        number
    ] & {
        positionId: BigNumber;
        strikeId: BigNumber;
        optionType: number;
        amount: BigNumber;
        collateral: BigNumber;
        state: number;
    };
}
export interface NewportOptionMarketViewerInterface extends utils.Interface {
    functions: {
        "acceptOwnership()": FunctionFragment;
        "addMarket((address,address,address,address,address,address,address,address,address,address))": FunctionFragment;
        "exchangeAdapter()": FunctionFragment;
        "getBoard(address,uint256)": FunctionFragment;
        "getBoardForBase(string,uint256)": FunctionFragment;
        "getBoardForStrikeId(address,uint256)": FunctionFragment;
        "getMarket(address)": FunctionFragment;
        "getMarketAddresses()": FunctionFragment;
        "getMarketForBase(string)": FunctionFragment;
        "getMarkets(address[])": FunctionFragment;
        "getOwnerPositions(address)": FunctionFragment;
        "init(address)": FunctionFragment;
        "initialized()": FunctionFragment;
        "marketAddresses(address)": FunctionFragment;
        "nominateNewOwner(address)": FunctionFragment;
        "nominatedOwner()": FunctionFragment;
        "optionMarkets(uint256)": FunctionFragment;
        "owner()": FunctionFragment;
        "removeMarket(address)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "acceptOwnership" | "addMarket" | "exchangeAdapter" | "getBoard" | "getBoardForBase" | "getBoardForStrikeId" | "getMarket" | "getMarketAddresses" | "getMarketForBase" | "getMarkets" | "getOwnerPositions" | "init" | "initialized" | "marketAddresses" | "nominateNewOwner" | "nominatedOwner" | "optionMarkets" | "owner" | "removeMarket"): FunctionFragment;
    encodeFunctionData(functionFragment: "acceptOwnership", values?: undefined): string;
    encodeFunctionData(functionFragment: "addMarket", values: [OptionMarketViewer.OptionMarketAddressesStruct]): string;
    encodeFunctionData(functionFragment: "exchangeAdapter", values?: undefined): string;
    encodeFunctionData(functionFragment: "getBoard", values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "getBoardForBase", values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "getBoardForStrikeId", values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "getMarket", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "getMarketAddresses", values?: undefined): string;
    encodeFunctionData(functionFragment: "getMarketForBase", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "getMarkets", values: [PromiseOrValue<string>[]]): string;
    encodeFunctionData(functionFragment: "getOwnerPositions", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "init", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "initialized", values?: undefined): string;
    encodeFunctionData(functionFragment: "marketAddresses", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "nominateNewOwner", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "nominatedOwner", values?: undefined): string;
    encodeFunctionData(functionFragment: "optionMarkets", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "owner", values?: undefined): string;
    encodeFunctionData(functionFragment: "removeMarket", values: [PromiseOrValue<string>]): string;
    decodeFunctionResult(functionFragment: "acceptOwnership", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "addMarket", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "exchangeAdapter", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getBoard", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getBoardForBase", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getBoardForStrikeId", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getMarket", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getMarketAddresses", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getMarketForBase", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getMarkets", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getOwnerPositions", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "init", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "initialized", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "marketAddresses", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "nominateNewOwner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "nominatedOwner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "optionMarkets", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "removeMarket", data: BytesLike): Result;
    events: {
        "MarketAdded(tuple)": EventFragment;
        "MarketRemoved(address)": EventFragment;
        "OwnerChanged(address,address)": EventFragment;
        "OwnerNominated(address)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "MarketAdded"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "MarketRemoved"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "OwnerChanged"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "OwnerNominated"): EventFragment;
}
export interface MarketAddedEventObject {
    market: OptionMarketViewer.OptionMarketAddressesStructOutput;
}
export type MarketAddedEvent = TypedEvent<[
    OptionMarketViewer.OptionMarketAddressesStructOutput
], MarketAddedEventObject>;
export type MarketAddedEventFilter = TypedEventFilter<MarketAddedEvent>;
export interface MarketRemovedEventObject {
    market: string;
}
export type MarketRemovedEvent = TypedEvent<[string], MarketRemovedEventObject>;
export type MarketRemovedEventFilter = TypedEventFilter<MarketRemovedEvent>;
export interface OwnerChangedEventObject {
    oldOwner: string;
    newOwner: string;
}
export type OwnerChangedEvent = TypedEvent<[
    string,
    string
], OwnerChangedEventObject>;
export type OwnerChangedEventFilter = TypedEventFilter<OwnerChangedEvent>;
export interface OwnerNominatedEventObject {
    newOwner: string;
}
export type OwnerNominatedEvent = TypedEvent<[
    string
], OwnerNominatedEventObject>;
export type OwnerNominatedEventFilter = TypedEventFilter<OwnerNominatedEvent>;
export interface NewportOptionMarketViewer extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: NewportOptionMarketViewerInterface;
    queryFilter<TEvent extends TypedEvent>(event: TypedEventFilter<TEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TEvent>>;
    listeners<TEvent extends TypedEvent>(eventFilter?: TypedEventFilter<TEvent>): Array<TypedListener<TEvent>>;
    listeners(eventName?: string): Array<Listener>;
    removeAllListeners<TEvent extends TypedEvent>(eventFilter: TypedEventFilter<TEvent>): this;
    removeAllListeners(eventName?: string): this;
    off: OnEvent<this>;
    on: OnEvent<this>;
    once: OnEvent<this>;
    removeListener: OnEvent<this>;
    functions: {
        acceptOwnership(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        addMarket(newMarketAddresses: OptionMarketViewer.OptionMarketAddressesStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        exchangeAdapter(overrides?: CallOverrides): Promise<[string]>;
        getBoard(market: PromiseOrValue<string>, boardId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[OptionMarketViewer.BoardViewStructOutput]>;
        getBoardForBase(baseSymbol: PromiseOrValue<string>, boardId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[OptionMarketViewer.BoardViewStructOutput]>;
        getBoardForStrikeId(market: PromiseOrValue<string>, strikeId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[OptionMarketViewer.BoardViewStructOutput]>;
        getMarket(market: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[
            OptionMarketViewer.MarketViewStructOutput
        ] & {
            marketView: OptionMarketViewer.MarketViewStructOutput;
        }>;
        getMarketAddresses(overrides?: CallOverrides): Promise<[OptionMarketViewer.OptionMarketAddressesStructOutput[]]>;
        getMarketForBase(baseSymbol: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[
            OptionMarketViewer.MarketViewStructOutput
        ] & {
            marketView: OptionMarketViewer.MarketViewStructOutput;
        }>;
        getMarkets(markets: PromiseOrValue<string>[], overrides?: CallOverrides): Promise<[
            OptionMarketViewer.MarketsViewStructOutput
        ] & {
            marketsView: OptionMarketViewer.MarketsViewStructOutput;
        }>;
        getOwnerPositions(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[OptionMarketViewer.MarketOptionPositionsStructOutput[]]>;
        init(_exchangeAdapter: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        initialized(overrides?: CallOverrides): Promise<[boolean]>;
        marketAddresses(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[
            string,
            string,
            string,
            string,
            string,
            string,
            string,
            string,
            string,
            string
        ] & {
            liquidityPool: string;
            liquidityToken: string;
            greekCache: string;
            optionMarket: string;
            optionMarketPricer: string;
            optionToken: string;
            shortCollateral: string;
            poolHedger: string;
            quoteAsset: string;
            baseAsset: string;
        }>;
        nominateNewOwner(_owner: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        nominatedOwner(overrides?: CallOverrides): Promise<[string]>;
        optionMarkets(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[string]>;
        owner(overrides?: CallOverrides): Promise<[string]>;
        removeMarket(market: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
    };
    acceptOwnership(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    addMarket(newMarketAddresses: OptionMarketViewer.OptionMarketAddressesStruct, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    exchangeAdapter(overrides?: CallOverrides): Promise<string>;
    getBoard(market: PromiseOrValue<string>, boardId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<OptionMarketViewer.BoardViewStructOutput>;
    getBoardForBase(baseSymbol: PromiseOrValue<string>, boardId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<OptionMarketViewer.BoardViewStructOutput>;
    getBoardForStrikeId(market: PromiseOrValue<string>, strikeId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<OptionMarketViewer.BoardViewStructOutput>;
    getMarket(market: PromiseOrValue<string>, overrides?: CallOverrides): Promise<OptionMarketViewer.MarketViewStructOutput>;
    getMarketAddresses(overrides?: CallOverrides): Promise<OptionMarketViewer.OptionMarketAddressesStructOutput[]>;
    getMarketForBase(baseSymbol: PromiseOrValue<string>, overrides?: CallOverrides): Promise<OptionMarketViewer.MarketViewStructOutput>;
    getMarkets(markets: PromiseOrValue<string>[], overrides?: CallOverrides): Promise<OptionMarketViewer.MarketsViewStructOutput>;
    getOwnerPositions(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<OptionMarketViewer.MarketOptionPositionsStructOutput[]>;
    init(_exchangeAdapter: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    initialized(overrides?: CallOverrides): Promise<boolean>;
    marketAddresses(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string
    ] & {
        liquidityPool: string;
        liquidityToken: string;
        greekCache: string;
        optionMarket: string;
        optionMarketPricer: string;
        optionToken: string;
        shortCollateral: string;
        poolHedger: string;
        quoteAsset: string;
        baseAsset: string;
    }>;
    nominateNewOwner(_owner: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    nominatedOwner(overrides?: CallOverrides): Promise<string>;
    optionMarkets(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
    owner(overrides?: CallOverrides): Promise<string>;
    removeMarket(market: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        acceptOwnership(overrides?: CallOverrides): Promise<void>;
        addMarket(newMarketAddresses: OptionMarketViewer.OptionMarketAddressesStruct, overrides?: CallOverrides): Promise<void>;
        exchangeAdapter(overrides?: CallOverrides): Promise<string>;
        getBoard(market: PromiseOrValue<string>, boardId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<OptionMarketViewer.BoardViewStructOutput>;
        getBoardForBase(baseSymbol: PromiseOrValue<string>, boardId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<OptionMarketViewer.BoardViewStructOutput>;
        getBoardForStrikeId(market: PromiseOrValue<string>, strikeId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<OptionMarketViewer.BoardViewStructOutput>;
        getMarket(market: PromiseOrValue<string>, overrides?: CallOverrides): Promise<OptionMarketViewer.MarketViewStructOutput>;
        getMarketAddresses(overrides?: CallOverrides): Promise<OptionMarketViewer.OptionMarketAddressesStructOutput[]>;
        getMarketForBase(baseSymbol: PromiseOrValue<string>, overrides?: CallOverrides): Promise<OptionMarketViewer.MarketViewStructOutput>;
        getMarkets(markets: PromiseOrValue<string>[], overrides?: CallOverrides): Promise<OptionMarketViewer.MarketsViewStructOutput>;
        getOwnerPositions(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<OptionMarketViewer.MarketOptionPositionsStructOutput[]>;
        init(_exchangeAdapter: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        initialized(overrides?: CallOverrides): Promise<boolean>;
        marketAddresses(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[
            string,
            string,
            string,
            string,
            string,
            string,
            string,
            string,
            string,
            string
        ] & {
            liquidityPool: string;
            liquidityToken: string;
            greekCache: string;
            optionMarket: string;
            optionMarketPricer: string;
            optionToken: string;
            shortCollateral: string;
            poolHedger: string;
            quoteAsset: string;
            baseAsset: string;
        }>;
        nominateNewOwner(_owner: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        nominatedOwner(overrides?: CallOverrides): Promise<string>;
        optionMarkets(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
        owner(overrides?: CallOverrides): Promise<string>;
        removeMarket(market: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
    };
    filters: {
        "MarketAdded(tuple)"(market?: null): MarketAddedEventFilter;
        MarketAdded(market?: null): MarketAddedEventFilter;
        "MarketRemoved(address)"(market?: null): MarketRemovedEventFilter;
        MarketRemoved(market?: null): MarketRemovedEventFilter;
        "OwnerChanged(address,address)"(oldOwner?: null, newOwner?: null): OwnerChangedEventFilter;
        OwnerChanged(oldOwner?: null, newOwner?: null): OwnerChangedEventFilter;
        "OwnerNominated(address)"(newOwner?: null): OwnerNominatedEventFilter;
        OwnerNominated(newOwner?: null): OwnerNominatedEventFilter;
    };
    estimateGas: {
        acceptOwnership(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        addMarket(newMarketAddresses: OptionMarketViewer.OptionMarketAddressesStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        exchangeAdapter(overrides?: CallOverrides): Promise<BigNumber>;
        getBoard(market: PromiseOrValue<string>, boardId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        getBoardForBase(baseSymbol: PromiseOrValue<string>, boardId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        getBoardForStrikeId(market: PromiseOrValue<string>, strikeId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        getMarket(market: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        getMarketAddresses(overrides?: CallOverrides): Promise<BigNumber>;
        getMarketForBase(baseSymbol: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        getMarkets(markets: PromiseOrValue<string>[], overrides?: CallOverrides): Promise<BigNumber>;
        getOwnerPositions(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        init(_exchangeAdapter: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        initialized(overrides?: CallOverrides): Promise<BigNumber>;
        marketAddresses(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        nominateNewOwner(_owner: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        nominatedOwner(overrides?: CallOverrides): Promise<BigNumber>;
        optionMarkets(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        owner(overrides?: CallOverrides): Promise<BigNumber>;
        removeMarket(market: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        acceptOwnership(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        addMarket(newMarketAddresses: OptionMarketViewer.OptionMarketAddressesStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        exchangeAdapter(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getBoard(market: PromiseOrValue<string>, boardId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getBoardForBase(baseSymbol: PromiseOrValue<string>, boardId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getBoardForStrikeId(market: PromiseOrValue<string>, strikeId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getMarket(market: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getMarketAddresses(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getMarketForBase(baseSymbol: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getMarkets(markets: PromiseOrValue<string>[], overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getOwnerPositions(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        init(_exchangeAdapter: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        initialized(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        marketAddresses(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        nominateNewOwner(_owner: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        nominatedOwner(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        optionMarkets(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        removeMarket(market: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
    };
}
