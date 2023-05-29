import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PayableOverrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "./common";
export declare namespace SNXPerpsV2PoolHedger {
    type SNXPerpsV2PoolHedgerParametersStruct = {
        targetLeverage: PromiseOrValue<BigNumberish>;
        maximumFundingRate: PromiseOrValue<BigNumberish>;
        deltaThreshold: PromiseOrValue<BigNumberish>;
        marketDepthBuffer: PromiseOrValue<BigNumberish>;
        priceDeltaBuffer: PromiseOrValue<BigNumberish>;
        worstStableRate: PromiseOrValue<BigNumberish>;
        maxOrderCap: PromiseOrValue<BigNumberish>;
    };
    type SNXPerpsV2PoolHedgerParametersStructOutput = [
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber
    ] & {
        targetLeverage: BigNumber;
        maximumFundingRate: BigNumber;
        deltaThreshold: BigNumber;
        marketDepthBuffer: BigNumber;
        priceDeltaBuffer: BigNumber;
        worstStableRate: BigNumber;
        maxOrderCap: BigNumber;
    };
    type HedgerStateStruct = {
        lastInteraction: PromiseOrValue<BigNumberish>;
        hedgedDelta: PromiseOrValue<BigNumberish>;
        margin: PromiseOrValue<BigNumberish>;
        leverage: PromiseOrValue<BigNumberish>;
        hedgerQuoteBalance: PromiseOrValue<BigNumberish>;
        hedgerMarginQuoteBalance: PromiseOrValue<BigNumberish>;
        canHedgeDeltaIncrease: PromiseOrValue<boolean>;
        canHedgeDeltaDecrease: PromiseOrValue<boolean>;
        cappedExpectedHedge: PromiseOrValue<BigNumberish>;
        snxHasEnoughMarketDepth: PromiseOrValue<boolean>;
        marketSuspended: PromiseOrValue<boolean>;
        curveRateStable: PromiseOrValue<boolean>;
        pendingDeltaLiquidity: PromiseOrValue<BigNumberish>;
        usedDeltaLiquidity: PromiseOrValue<BigNumberish>;
        pendingDelta: PromiseOrValue<BigNumberish>;
        longInterest: PromiseOrValue<BigNumberish>;
        shortInterest: PromiseOrValue<BigNumberish>;
        maxTotalMarketSize: PromiseOrValue<BigNumberish>;
        pendingMargin: PromiseOrValue<BigNumberish>;
        fundingRate: PromiseOrValue<BigNumberish>;
        trackingCode: PromiseOrValue<BytesLike>;
        optionMarket: PromiseOrValue<string>;
        perpsMarket: PromiseOrValue<string>;
        curveSwap: PromiseOrValue<string>;
        quoteAsset: PromiseOrValue<string>;
        futuresPoolHedgerParams: SNXPerpsV2PoolHedger.SNXPerpsV2PoolHedgerParametersStruct;
        poolHedgerParams: PoolHedger.PoolHedgerParametersStruct;
    };
    type HedgerStateStructOutput = [
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        boolean,
        boolean,
        BigNumber,
        boolean,
        boolean,
        boolean,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        string,
        string,
        string,
        string,
        string,
        SNXPerpsV2PoolHedger.SNXPerpsV2PoolHedgerParametersStructOutput,
        PoolHedger.PoolHedgerParametersStructOutput
    ] & {
        lastInteraction: BigNumber;
        hedgedDelta: BigNumber;
        margin: BigNumber;
        leverage: BigNumber;
        hedgerQuoteBalance: BigNumber;
        hedgerMarginQuoteBalance: BigNumber;
        canHedgeDeltaIncrease: boolean;
        canHedgeDeltaDecrease: boolean;
        cappedExpectedHedge: BigNumber;
        snxHasEnoughMarketDepth: boolean;
        marketSuspended: boolean;
        curveRateStable: boolean;
        pendingDeltaLiquidity: BigNumber;
        usedDeltaLiquidity: BigNumber;
        pendingDelta: BigNumber;
        longInterest: BigNumber;
        shortInterest: BigNumber;
        maxTotalMarketSize: BigNumber;
        pendingMargin: BigNumber;
        fundingRate: BigNumber;
        trackingCode: string;
        optionMarket: string;
        perpsMarket: string;
        curveSwap: string;
        quoteAsset: string;
        futuresPoolHedgerParams: SNXPerpsV2PoolHedger.SNXPerpsV2PoolHedgerParametersStructOutput;
        poolHedgerParams: PoolHedger.PoolHedgerParametersStructOutput;
    };
}
export declare namespace PoolHedger {
    type PoolHedgerParametersStruct = {
        interactionDelay: PromiseOrValue<BigNumberish>;
        hedgeCap: PromiseOrValue<BigNumberish>;
    };
    type PoolHedgerParametersStructOutput = [BigNumber, BigNumber] & {
        interactionDelay: BigNumber;
        hedgeCap: BigNumber;
    };
}
export interface NewportSNXPerpsV2PoolHedgerInterface extends utils.Interface {
    functions: {
        "acceptOwnership()": FunctionFragment;
        "addressResolver()": FunctionFragment;
        "canHedge(uint256,bool,uint256)": FunctionFragment;
        "curveSwap()": FunctionFragment;
        "exchangeAdapter()": FunctionFragment;
        "futuresPoolHedgerParams()": FunctionFragment;
        "getCappedExpectedHedge()": FunctionFragment;
        "getCurrentHedgedNetDelta()": FunctionFragment;
        "getCurrentPositionMargin()": FunctionFragment;
        "getHedgerState()": FunctionFragment;
        "getHedgingLiquidity(uint256)": FunctionFragment;
        "getPoolHedgerParams()": FunctionFragment;
        "hedgeDelta()": FunctionFragment;
        "init(address,address,address,address,address,address,address,address,address,bytes32)": FunctionFragment;
        "lastInteraction()": FunctionFragment;
        "marketKey()": FunctionFragment;
        "nominateNewOwner(address)": FunctionFragment;
        "nominatedOwner()": FunctionFragment;
        "owner()": FunctionFragment;
        "perpsMarket()": FunctionFragment;
        "resetInteractionDelay()": FunctionFragment;
        "setFuturesPoolHedgerParams((uint256,uint256,uint256,uint256,uint256,uint256,uint256))": FunctionFragment;
        "setPoolHedgerParams((uint256,uint256))": FunctionFragment;
        "setTrackingCode(bytes32)": FunctionFragment;
        "trackingCode()": FunctionFragment;
        "updateCollateral()": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "acceptOwnership" | "addressResolver" | "canHedge" | "curveSwap" | "exchangeAdapter" | "futuresPoolHedgerParams" | "getCappedExpectedHedge" | "getCurrentHedgedNetDelta" | "getCurrentPositionMargin" | "getHedgerState" | "getHedgingLiquidity" | "getPoolHedgerParams" | "hedgeDelta" | "init" | "lastInteraction" | "marketKey" | "nominateNewOwner" | "nominatedOwner" | "owner" | "perpsMarket" | "resetInteractionDelay" | "setFuturesPoolHedgerParams" | "setPoolHedgerParams" | "setTrackingCode" | "trackingCode" | "updateCollateral"): FunctionFragment;
    encodeFunctionData(functionFragment: "acceptOwnership", values?: undefined): string;
    encodeFunctionData(functionFragment: "addressResolver", values?: undefined): string;
    encodeFunctionData(functionFragment: "canHedge", values: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<boolean>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "curveSwap", values?: undefined): string;
    encodeFunctionData(functionFragment: "exchangeAdapter", values?: undefined): string;
    encodeFunctionData(functionFragment: "futuresPoolHedgerParams", values?: undefined): string;
    encodeFunctionData(functionFragment: "getCappedExpectedHedge", values?: undefined): string;
    encodeFunctionData(functionFragment: "getCurrentHedgedNetDelta", values?: undefined): string;
    encodeFunctionData(functionFragment: "getCurrentPositionMargin", values?: undefined): string;
    encodeFunctionData(functionFragment: "getHedgerState", values?: undefined): string;
    encodeFunctionData(functionFragment: "getHedgingLiquidity", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "getPoolHedgerParams", values?: undefined): string;
    encodeFunctionData(functionFragment: "hedgeDelta", values?: undefined): string;
    encodeFunctionData(functionFragment: "init", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BytesLike>
    ]): string;
    encodeFunctionData(functionFragment: "lastInteraction", values?: undefined): string;
    encodeFunctionData(functionFragment: "marketKey", values?: undefined): string;
    encodeFunctionData(functionFragment: "nominateNewOwner", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "nominatedOwner", values?: undefined): string;
    encodeFunctionData(functionFragment: "owner", values?: undefined): string;
    encodeFunctionData(functionFragment: "perpsMarket", values?: undefined): string;
    encodeFunctionData(functionFragment: "resetInteractionDelay", values?: undefined): string;
    encodeFunctionData(functionFragment: "setFuturesPoolHedgerParams", values: [SNXPerpsV2PoolHedger.SNXPerpsV2PoolHedgerParametersStruct]): string;
    encodeFunctionData(functionFragment: "setPoolHedgerParams", values: [PoolHedger.PoolHedgerParametersStruct]): string;
    encodeFunctionData(functionFragment: "setTrackingCode", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "trackingCode", values?: undefined): string;
    encodeFunctionData(functionFragment: "updateCollateral", values?: undefined): string;
    decodeFunctionResult(functionFragment: "acceptOwnership", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "addressResolver", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "canHedge", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "curveSwap", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "exchangeAdapter", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "futuresPoolHedgerParams", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getCappedExpectedHedge", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getCurrentHedgedNetDelta", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getCurrentPositionMargin", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getHedgerState", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getHedgingLiquidity", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getPoolHedgerParams", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "hedgeDelta", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "init", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "lastInteraction", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "marketKey", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "nominateNewOwner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "nominatedOwner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "perpsMarket", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "resetInteractionDelay", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setFuturesPoolHedgerParams", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setPoolHedgerParams", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setTrackingCode", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "trackingCode", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "updateCollateral", data: BytesLike): Result;
    events: {
        "CollateralUpdated(uint256,uint256)": EventFragment;
        "FuturesPoolHedgerParamsSet(tuple)": EventFragment;
        "OwnerChanged(address,address)": EventFragment;
        "OwnerNominated(address)": EventFragment;
        "PoolHedgerParametersSet(tuple)": EventFragment;
        "PositionUpdateSubmitted(int256,int256,int256)": EventFragment;
        "QuoteReturnedToLP(uint256)": EventFragment;
        "SlippageOutOfBounds(address,address,uint256,uint256)": EventFragment;
        "TrackingCodeSet(bytes32)": EventFragment;
        "USDCCollateralSwapForMargin(address,address,uint256,uint256)": EventFragment;
        "sUSDCollateralSwap(address,address,uint256,uint256)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "CollateralUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "FuturesPoolHedgerParamsSet"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "OwnerChanged"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "OwnerNominated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "PoolHedgerParametersSet"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "PositionUpdateSubmitted"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "QuoteReturnedToLP"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "SlippageOutOfBounds"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "TrackingCodeSet"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "USDCCollateralSwapForMargin"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "sUSDCollateralSwap"): EventFragment;
}
export interface CollateralUpdatedEventObject {
    oldCollat: BigNumber;
    newCollat: BigNumber;
}
export type CollateralUpdatedEvent = TypedEvent<[
    BigNumber,
    BigNumber
], CollateralUpdatedEventObject>;
export type CollateralUpdatedEventFilter = TypedEventFilter<CollateralUpdatedEvent>;
export interface FuturesPoolHedgerParamsSetEventObject {
    params: SNXPerpsV2PoolHedger.SNXPerpsV2PoolHedgerParametersStructOutput;
}
export type FuturesPoolHedgerParamsSetEvent = TypedEvent<[
    SNXPerpsV2PoolHedger.SNXPerpsV2PoolHedgerParametersStructOutput
], FuturesPoolHedgerParamsSetEventObject>;
export type FuturesPoolHedgerParamsSetEventFilter = TypedEventFilter<FuturesPoolHedgerParamsSetEvent>;
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
export interface PoolHedgerParametersSetEventObject {
    poolHedgerParams: PoolHedger.PoolHedgerParametersStructOutput;
}
export type PoolHedgerParametersSetEvent = TypedEvent<[
    PoolHedger.PoolHedgerParametersStructOutput
], PoolHedgerParametersSetEventObject>;
export type PoolHedgerParametersSetEventFilter = TypedEventFilter<PoolHedgerParametersSetEvent>;
export interface PositionUpdateSubmittedEventObject {
    oldNetDelta: BigNumber;
    currentNetDelta: BigNumber;
    expectedNetDelta: BigNumber;
}
export type PositionUpdateSubmittedEvent = TypedEvent<[
    BigNumber,
    BigNumber,
    BigNumber
], PositionUpdateSubmittedEventObject>;
export type PositionUpdateSubmittedEventFilter = TypedEventFilter<PositionUpdateSubmittedEvent>;
export interface QuoteReturnedToLPEventObject {
    amountQuote: BigNumber;
}
export type QuoteReturnedToLPEvent = TypedEvent<[
    BigNumber
], QuoteReturnedToLPEventObject>;
export type QuoteReturnedToLPEventFilter = TypedEventFilter<QuoteReturnedToLPEvent>;
export interface SlippageOutOfBoundsEventObject {
    quoteAsset: string;
    sUSD: string;
    curve_rate: BigNumber;
    maxSlippage: BigNumber;
}
export type SlippageOutOfBoundsEvent = TypedEvent<[
    string,
    string,
    BigNumber,
    BigNumber
], SlippageOutOfBoundsEventObject>;
export type SlippageOutOfBoundsEventFilter = TypedEventFilter<SlippageOutOfBoundsEvent>;
export interface TrackingCodeSetEventObject {
    trackingCode: string;
}
export type TrackingCodeSetEvent = TypedEvent<[
    string
], TrackingCodeSetEventObject>;
export type TrackingCodeSetEventFilter = TypedEventFilter<TrackingCodeSetEvent>;
export interface USDCCollateralSwapForMarginEventObject {
    quoteAsset: string;
    sUSD: string;
    amountIn: BigNumber;
    amountOut: BigNumber;
}
export type USDCCollateralSwapForMarginEvent = TypedEvent<[
    string,
    string,
    BigNumber,
    BigNumber
], USDCCollateralSwapForMarginEventObject>;
export type USDCCollateralSwapForMarginEventFilter = TypedEventFilter<USDCCollateralSwapForMarginEvent>;
export interface sUSDCollateralSwapEventObject {
    quoteAsset: string;
    sUSD: string;
    amountIn: BigNumber;
    amountOut: BigNumber;
}
export type sUSDCollateralSwapEvent = TypedEvent<[
    string,
    string,
    BigNumber,
    BigNumber
], sUSDCollateralSwapEventObject>;
export type sUSDCollateralSwapEventFilter = TypedEventFilter<sUSDCollateralSwapEvent>;
export interface NewportSNXPerpsV2PoolHedger extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: NewportSNXPerpsV2PoolHedgerInterface;
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
        addressResolver(overrides?: CallOverrides): Promise<[string]>;
        canHedge(arg0: PromiseOrValue<BigNumberish>, deltaIncrease: PromiseOrValue<boolean>, arg2: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[boolean]>;
        curveSwap(overrides?: CallOverrides): Promise<[string]>;
        exchangeAdapter(overrides?: CallOverrides): Promise<[string]>;
        futuresPoolHedgerParams(overrides?: CallOverrides): Promise<[
            BigNumber,
            BigNumber,
            BigNumber,
            BigNumber,
            BigNumber,
            BigNumber,
            BigNumber
        ] & {
            targetLeverage: BigNumber;
            maximumFundingRate: BigNumber;
            deltaThreshold: BigNumber;
            marketDepthBuffer: BigNumber;
            priceDeltaBuffer: BigNumber;
            worstStableRate: BigNumber;
            maxOrderCap: BigNumber;
        }>;
        getCappedExpectedHedge(overrides?: CallOverrides): Promise<[BigNumber]>;
        getCurrentHedgedNetDelta(overrides?: CallOverrides): Promise<[BigNumber]>;
        getCurrentPositionMargin(overrides?: CallOverrides): Promise<[BigNumber]>;
        getHedgerState(overrides?: CallOverrides): Promise<[SNXPerpsV2PoolHedger.HedgerStateStructOutput]>;
        getHedgingLiquidity(spotPrice: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[
            BigNumber,
            BigNumber
        ] & {
            pendingDeltaLiquidity: BigNumber;
            usedDeltaLiquidity: BigNumber;
        }>;
        getPoolHedgerParams(overrides?: CallOverrides): Promise<[PoolHedger.PoolHedgerParametersStructOutput]>;
        hedgeDelta(overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        init(_addressResolver: PromiseOrValue<string>, _exchangeAdapter: PromiseOrValue<string>, _optionMarket: PromiseOrValue<string>, _optionGreekCache: PromiseOrValue<string>, _liquidityPool: PromiseOrValue<string>, _perpMarketProxy: PromiseOrValue<string>, _quoteAsset: PromiseOrValue<string>, _sUSD: PromiseOrValue<string>, _curveSwap: PromiseOrValue<string>, _marketKey: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        lastInteraction(overrides?: CallOverrides): Promise<[BigNumber]>;
        marketKey(overrides?: CallOverrides): Promise<[string]>;
        nominateNewOwner(_owner: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        nominatedOwner(overrides?: CallOverrides): Promise<[string]>;
        owner(overrides?: CallOverrides): Promise<[string]>;
        perpsMarket(overrides?: CallOverrides): Promise<[string]>;
        resetInteractionDelay(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        setFuturesPoolHedgerParams(_futuresPoolHedgerParams: SNXPerpsV2PoolHedger.SNXPerpsV2PoolHedgerParametersStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        setPoolHedgerParams(_poolHedgerParams: PoolHedger.PoolHedgerParametersStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        setTrackingCode(_trackingCode: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        trackingCode(overrides?: CallOverrides): Promise<[string]>;
        updateCollateral(overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
    };
    acceptOwnership(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    addressResolver(overrides?: CallOverrides): Promise<string>;
    canHedge(arg0: PromiseOrValue<BigNumberish>, deltaIncrease: PromiseOrValue<boolean>, arg2: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
    curveSwap(overrides?: CallOverrides): Promise<string>;
    exchangeAdapter(overrides?: CallOverrides): Promise<string>;
    futuresPoolHedgerParams(overrides?: CallOverrides): Promise<[
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber
    ] & {
        targetLeverage: BigNumber;
        maximumFundingRate: BigNumber;
        deltaThreshold: BigNumber;
        marketDepthBuffer: BigNumber;
        priceDeltaBuffer: BigNumber;
        worstStableRate: BigNumber;
        maxOrderCap: BigNumber;
    }>;
    getCappedExpectedHedge(overrides?: CallOverrides): Promise<BigNumber>;
    getCurrentHedgedNetDelta(overrides?: CallOverrides): Promise<BigNumber>;
    getCurrentPositionMargin(overrides?: CallOverrides): Promise<BigNumber>;
    getHedgerState(overrides?: CallOverrides): Promise<SNXPerpsV2PoolHedger.HedgerStateStructOutput>;
    getHedgingLiquidity(spotPrice: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[
        BigNumber,
        BigNumber
    ] & {
        pendingDeltaLiquidity: BigNumber;
        usedDeltaLiquidity: BigNumber;
    }>;
    getPoolHedgerParams(overrides?: CallOverrides): Promise<PoolHedger.PoolHedgerParametersStructOutput>;
    hedgeDelta(overrides?: PayableOverrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    init(_addressResolver: PromiseOrValue<string>, _exchangeAdapter: PromiseOrValue<string>, _optionMarket: PromiseOrValue<string>, _optionGreekCache: PromiseOrValue<string>, _liquidityPool: PromiseOrValue<string>, _perpMarketProxy: PromiseOrValue<string>, _quoteAsset: PromiseOrValue<string>, _sUSD: PromiseOrValue<string>, _curveSwap: PromiseOrValue<string>, _marketKey: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    lastInteraction(overrides?: CallOverrides): Promise<BigNumber>;
    marketKey(overrides?: CallOverrides): Promise<string>;
    nominateNewOwner(_owner: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    nominatedOwner(overrides?: CallOverrides): Promise<string>;
    owner(overrides?: CallOverrides): Promise<string>;
    perpsMarket(overrides?: CallOverrides): Promise<string>;
    resetInteractionDelay(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    setFuturesPoolHedgerParams(_futuresPoolHedgerParams: SNXPerpsV2PoolHedger.SNXPerpsV2PoolHedgerParametersStruct, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    setPoolHedgerParams(_poolHedgerParams: PoolHedger.PoolHedgerParametersStruct, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    setTrackingCode(_trackingCode: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    trackingCode(overrides?: CallOverrides): Promise<string>;
    updateCollateral(overrides?: PayableOverrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        acceptOwnership(overrides?: CallOverrides): Promise<void>;
        addressResolver(overrides?: CallOverrides): Promise<string>;
        canHedge(arg0: PromiseOrValue<BigNumberish>, deltaIncrease: PromiseOrValue<boolean>, arg2: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
        curveSwap(overrides?: CallOverrides): Promise<string>;
        exchangeAdapter(overrides?: CallOverrides): Promise<string>;
        futuresPoolHedgerParams(overrides?: CallOverrides): Promise<[
            BigNumber,
            BigNumber,
            BigNumber,
            BigNumber,
            BigNumber,
            BigNumber,
            BigNumber
        ] & {
            targetLeverage: BigNumber;
            maximumFundingRate: BigNumber;
            deltaThreshold: BigNumber;
            marketDepthBuffer: BigNumber;
            priceDeltaBuffer: BigNumber;
            worstStableRate: BigNumber;
            maxOrderCap: BigNumber;
        }>;
        getCappedExpectedHedge(overrides?: CallOverrides): Promise<BigNumber>;
        getCurrentHedgedNetDelta(overrides?: CallOverrides): Promise<BigNumber>;
        getCurrentPositionMargin(overrides?: CallOverrides): Promise<BigNumber>;
        getHedgerState(overrides?: CallOverrides): Promise<SNXPerpsV2PoolHedger.HedgerStateStructOutput>;
        getHedgingLiquidity(spotPrice: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[
            BigNumber,
            BigNumber
        ] & {
            pendingDeltaLiquidity: BigNumber;
            usedDeltaLiquidity: BigNumber;
        }>;
        getPoolHedgerParams(overrides?: CallOverrides): Promise<PoolHedger.PoolHedgerParametersStructOutput>;
        hedgeDelta(overrides?: CallOverrides): Promise<void>;
        init(_addressResolver: PromiseOrValue<string>, _exchangeAdapter: PromiseOrValue<string>, _optionMarket: PromiseOrValue<string>, _optionGreekCache: PromiseOrValue<string>, _liquidityPool: PromiseOrValue<string>, _perpMarketProxy: PromiseOrValue<string>, _quoteAsset: PromiseOrValue<string>, _sUSD: PromiseOrValue<string>, _curveSwap: PromiseOrValue<string>, _marketKey: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<void>;
        lastInteraction(overrides?: CallOverrides): Promise<BigNumber>;
        marketKey(overrides?: CallOverrides): Promise<string>;
        nominateNewOwner(_owner: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        nominatedOwner(overrides?: CallOverrides): Promise<string>;
        owner(overrides?: CallOverrides): Promise<string>;
        perpsMarket(overrides?: CallOverrides): Promise<string>;
        resetInteractionDelay(overrides?: CallOverrides): Promise<void>;
        setFuturesPoolHedgerParams(_futuresPoolHedgerParams: SNXPerpsV2PoolHedger.SNXPerpsV2PoolHedgerParametersStruct, overrides?: CallOverrides): Promise<void>;
        setPoolHedgerParams(_poolHedgerParams: PoolHedger.PoolHedgerParametersStruct, overrides?: CallOverrides): Promise<void>;
        setTrackingCode(_trackingCode: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<void>;
        trackingCode(overrides?: CallOverrides): Promise<string>;
        updateCollateral(overrides?: CallOverrides): Promise<void>;
    };
    filters: {
        "CollateralUpdated(uint256,uint256)"(oldCollat?: null, newCollat?: null): CollateralUpdatedEventFilter;
        CollateralUpdated(oldCollat?: null, newCollat?: null): CollateralUpdatedEventFilter;
        "FuturesPoolHedgerParamsSet(tuple)"(params?: null): FuturesPoolHedgerParamsSetEventFilter;
        FuturesPoolHedgerParamsSet(params?: null): FuturesPoolHedgerParamsSetEventFilter;
        "OwnerChanged(address,address)"(oldOwner?: null, newOwner?: null): OwnerChangedEventFilter;
        OwnerChanged(oldOwner?: null, newOwner?: null): OwnerChangedEventFilter;
        "OwnerNominated(address)"(newOwner?: null): OwnerNominatedEventFilter;
        OwnerNominated(newOwner?: null): OwnerNominatedEventFilter;
        "PoolHedgerParametersSet(tuple)"(poolHedgerParams?: null): PoolHedgerParametersSetEventFilter;
        PoolHedgerParametersSet(poolHedgerParams?: null): PoolHedgerParametersSetEventFilter;
        "PositionUpdateSubmitted(int256,int256,int256)"(oldNetDelta?: null, currentNetDelta?: null, expectedNetDelta?: null): PositionUpdateSubmittedEventFilter;
        PositionUpdateSubmitted(oldNetDelta?: null, currentNetDelta?: null, expectedNetDelta?: null): PositionUpdateSubmittedEventFilter;
        "QuoteReturnedToLP(uint256)"(amountQuote?: null): QuoteReturnedToLPEventFilter;
        QuoteReturnedToLP(amountQuote?: null): QuoteReturnedToLPEventFilter;
        "SlippageOutOfBounds(address,address,uint256,uint256)"(quoteAsset?: null, sUSD?: null, curve_rate?: null, maxSlippage?: null): SlippageOutOfBoundsEventFilter;
        SlippageOutOfBounds(quoteAsset?: null, sUSD?: null, curve_rate?: null, maxSlippage?: null): SlippageOutOfBoundsEventFilter;
        "TrackingCodeSet(bytes32)"(trackingCode?: null): TrackingCodeSetEventFilter;
        TrackingCodeSet(trackingCode?: null): TrackingCodeSetEventFilter;
        "USDCCollateralSwapForMargin(address,address,uint256,uint256)"(quoteAsset?: null, sUSD?: null, amountIn?: null, amountOut?: null): USDCCollateralSwapForMarginEventFilter;
        USDCCollateralSwapForMargin(quoteAsset?: null, sUSD?: null, amountIn?: null, amountOut?: null): USDCCollateralSwapForMarginEventFilter;
        "sUSDCollateralSwap(address,address,uint256,uint256)"(quoteAsset?: null, sUSD?: null, amountIn?: null, amountOut?: null): sUSDCollateralSwapEventFilter;
        sUSDCollateralSwap(quoteAsset?: null, sUSD?: null, amountIn?: null, amountOut?: null): sUSDCollateralSwapEventFilter;
    };
    estimateGas: {
        acceptOwnership(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        addressResolver(overrides?: CallOverrides): Promise<BigNumber>;
        canHedge(arg0: PromiseOrValue<BigNumberish>, deltaIncrease: PromiseOrValue<boolean>, arg2: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        curveSwap(overrides?: CallOverrides): Promise<BigNumber>;
        exchangeAdapter(overrides?: CallOverrides): Promise<BigNumber>;
        futuresPoolHedgerParams(overrides?: CallOverrides): Promise<BigNumber>;
        getCappedExpectedHedge(overrides?: CallOverrides): Promise<BigNumber>;
        getCurrentHedgedNetDelta(overrides?: CallOverrides): Promise<BigNumber>;
        getCurrentPositionMargin(overrides?: CallOverrides): Promise<BigNumber>;
        getHedgerState(overrides?: CallOverrides): Promise<BigNumber>;
        getHedgingLiquidity(spotPrice: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        getPoolHedgerParams(overrides?: CallOverrides): Promise<BigNumber>;
        hedgeDelta(overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        init(_addressResolver: PromiseOrValue<string>, _exchangeAdapter: PromiseOrValue<string>, _optionMarket: PromiseOrValue<string>, _optionGreekCache: PromiseOrValue<string>, _liquidityPool: PromiseOrValue<string>, _perpMarketProxy: PromiseOrValue<string>, _quoteAsset: PromiseOrValue<string>, _sUSD: PromiseOrValue<string>, _curveSwap: PromiseOrValue<string>, _marketKey: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        lastInteraction(overrides?: CallOverrides): Promise<BigNumber>;
        marketKey(overrides?: CallOverrides): Promise<BigNumber>;
        nominateNewOwner(_owner: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        nominatedOwner(overrides?: CallOverrides): Promise<BigNumber>;
        owner(overrides?: CallOverrides): Promise<BigNumber>;
        perpsMarket(overrides?: CallOverrides): Promise<BigNumber>;
        resetInteractionDelay(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        setFuturesPoolHedgerParams(_futuresPoolHedgerParams: SNXPerpsV2PoolHedger.SNXPerpsV2PoolHedgerParametersStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        setPoolHedgerParams(_poolHedgerParams: PoolHedger.PoolHedgerParametersStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        setTrackingCode(_trackingCode: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        trackingCode(overrides?: CallOverrides): Promise<BigNumber>;
        updateCollateral(overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        acceptOwnership(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        addressResolver(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        canHedge(arg0: PromiseOrValue<BigNumberish>, deltaIncrease: PromiseOrValue<boolean>, arg2: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        curveSwap(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        exchangeAdapter(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        futuresPoolHedgerParams(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getCappedExpectedHedge(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getCurrentHedgedNetDelta(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getCurrentPositionMargin(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getHedgerState(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getHedgingLiquidity(spotPrice: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getPoolHedgerParams(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        hedgeDelta(overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        init(_addressResolver: PromiseOrValue<string>, _exchangeAdapter: PromiseOrValue<string>, _optionMarket: PromiseOrValue<string>, _optionGreekCache: PromiseOrValue<string>, _liquidityPool: PromiseOrValue<string>, _perpMarketProxy: PromiseOrValue<string>, _quoteAsset: PromiseOrValue<string>, _sUSD: PromiseOrValue<string>, _curveSwap: PromiseOrValue<string>, _marketKey: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        lastInteraction(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        marketKey(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        nominateNewOwner(_owner: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        nominatedOwner(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        perpsMarket(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        resetInteractionDelay(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        setFuturesPoolHedgerParams(_futuresPoolHedgerParams: SNXPerpsV2PoolHedger.SNXPerpsV2PoolHedgerParametersStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        setPoolHedgerParams(_poolHedgerParams: PoolHedger.PoolHedgerParametersStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        setTrackingCode(_trackingCode: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        trackingCode(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        updateCollateral(overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
    };
}
