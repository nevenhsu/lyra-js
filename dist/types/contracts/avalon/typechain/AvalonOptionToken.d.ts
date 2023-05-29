import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "./common";
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
    type LiquidationFeesStruct = {
        returnCollateral: PromiseOrValue<BigNumberish>;
        lpPremiums: PromiseOrValue<BigNumberish>;
        lpFee: PromiseOrValue<BigNumberish>;
        liquidatorFee: PromiseOrValue<BigNumberish>;
        smFee: PromiseOrValue<BigNumberish>;
        insolventAmount: PromiseOrValue<BigNumberish>;
    };
    type LiquidationFeesStructOutput = [
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber
    ] & {
        returnCollateral: BigNumber;
        lpPremiums: BigNumber;
        lpFee: BigNumber;
        liquidatorFee: BigNumber;
        smFee: BigNumber;
        insolventAmount: BigNumber;
    };
    type PositionWithOwnerStruct = {
        positionId: PromiseOrValue<BigNumberish>;
        strikeId: PromiseOrValue<BigNumberish>;
        optionType: PromiseOrValue<BigNumberish>;
        amount: PromiseOrValue<BigNumberish>;
        collateral: PromiseOrValue<BigNumberish>;
        state: PromiseOrValue<BigNumberish>;
        owner: PromiseOrValue<string>;
    };
    type PositionWithOwnerStructOutput = [
        BigNumber,
        BigNumber,
        number,
        BigNumber,
        BigNumber,
        number,
        string
    ] & {
        positionId: BigNumber;
        strikeId: BigNumber;
        optionType: number;
        amount: BigNumber;
        collateral: BigNumber;
        state: number;
        owner: string;
    };
}
export declare namespace LiquidityPool {
    type LiquidityStruct = {
        freeLiquidity: PromiseOrValue<BigNumberish>;
        burnableLiquidity: PromiseOrValue<BigNumberish>;
        usedCollatLiquidity: PromiseOrValue<BigNumberish>;
        pendingDeltaLiquidity: PromiseOrValue<BigNumberish>;
        usedDeltaLiquidity: PromiseOrValue<BigNumberish>;
        NAV: PromiseOrValue<BigNumberish>;
    };
    type LiquidityStructOutput = [
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber
    ] & {
        freeLiquidity: BigNumber;
        burnableLiquidity: BigNumber;
        usedCollatLiquidity: BigNumber;
        pendingDeltaLiquidity: BigNumber;
        usedDeltaLiquidity: BigNumber;
        NAV: BigNumber;
    };
}
export declare namespace SynthetixAdapter {
    type ExchangeParamsStruct = {
        spotPrice: PromiseOrValue<BigNumberish>;
        quoteKey: PromiseOrValue<BytesLike>;
        baseKey: PromiseOrValue<BytesLike>;
        quoteBaseFeeRate: PromiseOrValue<BigNumberish>;
        baseQuoteFeeRate: PromiseOrValue<BigNumberish>;
    };
    type ExchangeParamsStructOutput = [
        BigNumber,
        string,
        string,
        BigNumber,
        BigNumber
    ] & {
        spotPrice: BigNumber;
        quoteKey: string;
        baseKey: string;
        quoteBaseFeeRate: BigNumber;
        baseQuoteFeeRate: BigNumber;
    };
}
export declare namespace OptionMarket {
    type TradeParametersStruct = {
        isBuy: PromiseOrValue<boolean>;
        isForceClose: PromiseOrValue<boolean>;
        tradeDirection: PromiseOrValue<BigNumberish>;
        optionType: PromiseOrValue<BigNumberish>;
        amount: PromiseOrValue<BigNumberish>;
        expiry: PromiseOrValue<BigNumberish>;
        strikePrice: PromiseOrValue<BigNumberish>;
        liquidity: LiquidityPool.LiquidityStruct;
        exchangeParams: SynthetixAdapter.ExchangeParamsStruct;
    };
    type TradeParametersStructOutput = [
        boolean,
        boolean,
        number,
        number,
        BigNumber,
        BigNumber,
        BigNumber,
        LiquidityPool.LiquidityStructOutput,
        SynthetixAdapter.ExchangeParamsStructOutput
    ] & {
        isBuy: boolean;
        isForceClose: boolean;
        tradeDirection: number;
        optionType: number;
        amount: BigNumber;
        expiry: BigNumber;
        strikePrice: BigNumber;
        liquidity: LiquidityPool.LiquidityStructOutput;
        exchangeParams: SynthetixAdapter.ExchangeParamsStructOutput;
    };
}
export interface AvalonOptionTokenInterface extends utils.Interface {
    functions: {
        "acceptOwnership()": FunctionFragment;
        "addCollateral(uint256,uint256)": FunctionFragment;
        "adjustPosition((bool,bool,uint8,uint8,uint256,uint256,uint256,(uint256,uint256,uint256,uint256,uint256,uint256),(uint256,bytes32,bytes32,uint256,uint256)),uint256,address,uint256,uint256,uint256,bool)": FunctionFragment;
        "approve(address,uint256)": FunctionFragment;
        "balanceOf(address)": FunctionFragment;
        "baseURI()": FunctionFragment;
        "canLiquidate((uint256,uint256,uint8,uint256,uint256,uint8),uint256,uint256,uint256)": FunctionFragment;
        "getApproved(uint256)": FunctionFragment;
        "getLiquidationFees(uint256,uint256,uint256,uint256)": FunctionFragment;
        "getOptionPosition(uint256)": FunctionFragment;
        "getOptionPositions(uint256[])": FunctionFragment;
        "getOwnerPositions(address)": FunctionFragment;
        "getPartialCollatParams()": FunctionFragment;
        "getPositionState(uint256)": FunctionFragment;
        "getPositionWithOwner(uint256)": FunctionFragment;
        "getPositionsWithOwner(uint256[])": FunctionFragment;
        "init(address,address,address,address)": FunctionFragment;
        "isApprovedForAll(address,address)": FunctionFragment;
        "liquidate(uint256,(bool,bool,uint8,uint8,uint256,uint256,uint256,(uint256,uint256,uint256,uint256,uint256,uint256),(uint256,bytes32,bytes32,uint256,uint256)),uint256)": FunctionFragment;
        "merge(uint256[])": FunctionFragment;
        "name()": FunctionFragment;
        "nextId()": FunctionFragment;
        "nominateNewOwner(address)": FunctionFragment;
        "nominatedOwner()": FunctionFragment;
        "owner()": FunctionFragment;
        "ownerOf(uint256)": FunctionFragment;
        "partialCollatParams()": FunctionFragment;
        "positions(uint256)": FunctionFragment;
        "safeTransferFrom(address,address,uint256)": FunctionFragment;
        "safeTransferFrom(address,address,uint256,bytes)": FunctionFragment;
        "setApprovalForAll(address,bool)": FunctionFragment;
        "setPartialCollateralParams((uint256,uint256,uint256,uint256))": FunctionFragment;
        "setURI(string)": FunctionFragment;
        "settlePositions(uint256[])": FunctionFragment;
        "split(uint256,uint256,uint256,address)": FunctionFragment;
        "supportsInterface(bytes4)": FunctionFragment;
        "symbol()": FunctionFragment;
        "tokenByIndex(uint256)": FunctionFragment;
        "tokenOfOwnerByIndex(address,uint256)": FunctionFragment;
        "tokenURI(uint256)": FunctionFragment;
        "totalSupply()": FunctionFragment;
        "transferFrom(address,address,uint256)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "acceptOwnership" | "addCollateral" | "adjustPosition" | "approve" | "balanceOf" | "baseURI" | "canLiquidate" | "getApproved" | "getLiquidationFees" | "getOptionPosition" | "getOptionPositions" | "getOwnerPositions" | "getPartialCollatParams" | "getPositionState" | "getPositionWithOwner" | "getPositionsWithOwner" | "init" | "isApprovedForAll" | "liquidate" | "merge" | "name" | "nextId" | "nominateNewOwner" | "nominatedOwner" | "owner" | "ownerOf" | "partialCollatParams" | "positions" | "safeTransferFrom(address,address,uint256)" | "safeTransferFrom(address,address,uint256,bytes)" | "setApprovalForAll" | "setPartialCollateralParams" | "setURI" | "settlePositions" | "split" | "supportsInterface" | "symbol" | "tokenByIndex" | "tokenOfOwnerByIndex" | "tokenURI" | "totalSupply" | "transferFrom"): FunctionFragment;
    encodeFunctionData(functionFragment: "acceptOwnership", values?: undefined): string;
    encodeFunctionData(functionFragment: "addCollateral", values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "adjustPosition", values: [
        OptionMarket.TradeParametersStruct,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<boolean>
    ]): string;
    encodeFunctionData(functionFragment: "approve", values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "balanceOf", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "baseURI", values?: undefined): string;
    encodeFunctionData(functionFragment: "canLiquidate", values: [
        OptionToken.OptionPositionStruct,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "getApproved", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "getLiquidationFees", values: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "getOptionPosition", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "getOptionPositions", values: [PromiseOrValue<BigNumberish>[]]): string;
    encodeFunctionData(functionFragment: "getOwnerPositions", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "getPartialCollatParams", values?: undefined): string;
    encodeFunctionData(functionFragment: "getPositionState", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "getPositionWithOwner", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "getPositionsWithOwner", values: [PromiseOrValue<BigNumberish>[]]): string;
    encodeFunctionData(functionFragment: "init", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<string>
    ]): string;
    encodeFunctionData(functionFragment: "isApprovedForAll", values: [PromiseOrValue<string>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "liquidate", values: [
        PromiseOrValue<BigNumberish>,
        OptionMarket.TradeParametersStruct,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "merge", values: [PromiseOrValue<BigNumberish>[]]): string;
    encodeFunctionData(functionFragment: "name", values?: undefined): string;
    encodeFunctionData(functionFragment: "nextId", values?: undefined): string;
    encodeFunctionData(functionFragment: "nominateNewOwner", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "nominatedOwner", values?: undefined): string;
    encodeFunctionData(functionFragment: "owner", values?: undefined): string;
    encodeFunctionData(functionFragment: "ownerOf", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "partialCollatParams", values?: undefined): string;
    encodeFunctionData(functionFragment: "positions", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "safeTransferFrom(address,address,uint256)", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "safeTransferFrom(address,address,uint256,bytes)", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BytesLike>
    ]): string;
    encodeFunctionData(functionFragment: "setApprovalForAll", values: [PromiseOrValue<string>, PromiseOrValue<boolean>]): string;
    encodeFunctionData(functionFragment: "setPartialCollateralParams", values: [OptionToken.PartialCollateralParametersStruct]): string;
    encodeFunctionData(functionFragment: "setURI", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "settlePositions", values: [PromiseOrValue<BigNumberish>[]]): string;
    encodeFunctionData(functionFragment: "split", values: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<string>
    ]): string;
    encodeFunctionData(functionFragment: "supportsInterface", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "symbol", values?: undefined): string;
    encodeFunctionData(functionFragment: "tokenByIndex", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "tokenOfOwnerByIndex", values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "tokenURI", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "totalSupply", values?: undefined): string;
    encodeFunctionData(functionFragment: "transferFrom", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>
    ]): string;
    decodeFunctionResult(functionFragment: "acceptOwnership", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "addCollateral", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "adjustPosition", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "approve", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "baseURI", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "canLiquidate", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getApproved", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getLiquidationFees", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getOptionPosition", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getOptionPositions", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getOwnerPositions", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getPartialCollatParams", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getPositionState", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getPositionWithOwner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getPositionsWithOwner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "init", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isApprovedForAll", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "liquidate", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "merge", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "nextId", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "nominateNewOwner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "nominatedOwner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "ownerOf", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "partialCollatParams", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "positions", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "safeTransferFrom(address,address,uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "safeTransferFrom(address,address,uint256,bytes)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setApprovalForAll", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setPartialCollateralParams", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setURI", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "settlePositions", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "split", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "supportsInterface", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "symbol", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "tokenByIndex", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "tokenOfOwnerByIndex", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "tokenURI", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "totalSupply", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferFrom", data: BytesLike): Result;
    events: {
        "Approval(address,address,uint256)": EventFragment;
        "ApprovalForAll(address,address,bool)": EventFragment;
        "OwnerChanged(address,address)": EventFragment;
        "OwnerNominated(address)": EventFragment;
        "PartialCollateralParamsSet(tuple)": EventFragment;
        "PositionUpdated(uint256,address,uint8,tuple,uint256)": EventFragment;
        "Transfer(address,address,uint256)": EventFragment;
        "URISet(string)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "Approval"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ApprovalForAll"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "OwnerChanged"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "OwnerNominated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "PartialCollateralParamsSet"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "PositionUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "Transfer"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "URISet"): EventFragment;
}
export interface ApprovalEventObject {
    owner: string;
    approved: string;
    tokenId: BigNumber;
}
export type ApprovalEvent = TypedEvent<[
    string,
    string,
    BigNumber
], ApprovalEventObject>;
export type ApprovalEventFilter = TypedEventFilter<ApprovalEvent>;
export interface ApprovalForAllEventObject {
    owner: string;
    operator: string;
    approved: boolean;
}
export type ApprovalForAllEvent = TypedEvent<[
    string,
    string,
    boolean
], ApprovalForAllEventObject>;
export type ApprovalForAllEventFilter = TypedEventFilter<ApprovalForAllEvent>;
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
export interface PartialCollateralParamsSetEventObject {
    partialCollateralParams: OptionToken.PartialCollateralParametersStructOutput;
}
export type PartialCollateralParamsSetEvent = TypedEvent<[
    OptionToken.PartialCollateralParametersStructOutput
], PartialCollateralParamsSetEventObject>;
export type PartialCollateralParamsSetEventFilter = TypedEventFilter<PartialCollateralParamsSetEvent>;
export interface PositionUpdatedEventObject {
    positionId: BigNumber;
    owner: string;
    updatedType: number;
    position: OptionToken.OptionPositionStructOutput;
    timestamp: BigNumber;
}
export type PositionUpdatedEvent = TypedEvent<[
    BigNumber,
    string,
    number,
    OptionToken.OptionPositionStructOutput,
    BigNumber
], PositionUpdatedEventObject>;
export type PositionUpdatedEventFilter = TypedEventFilter<PositionUpdatedEvent>;
export interface TransferEventObject {
    from: string;
    to: string;
    tokenId: BigNumber;
}
export type TransferEvent = TypedEvent<[
    string,
    string,
    BigNumber
], TransferEventObject>;
export type TransferEventFilter = TypedEventFilter<TransferEvent>;
export interface URISetEventObject {
    URI: string;
}
export type URISetEvent = TypedEvent<[string], URISetEventObject>;
export type URISetEventFilter = TypedEventFilter<URISetEvent>;
export interface AvalonOptionToken extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: AvalonOptionTokenInterface;
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
        addCollateral(positionId: PromiseOrValue<BigNumberish>, amountCollateral: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        adjustPosition(trade: OptionMarket.TradeParametersStruct, strikeId: PromiseOrValue<BigNumberish>, trader: PromiseOrValue<string>, positionId: PromiseOrValue<BigNumberish>, optionCost: PromiseOrValue<BigNumberish>, setCollateralTo: PromiseOrValue<BigNumberish>, isOpen: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        approve(to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        balanceOf(owner: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[BigNumber]>;
        baseURI(overrides?: CallOverrides): Promise<[string]>;
        canLiquidate(position: OptionToken.OptionPositionStruct, expiry: PromiseOrValue<BigNumberish>, strikePrice: PromiseOrValue<BigNumberish>, spotPrice: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[boolean]>;
        getApproved(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[string]>;
        getLiquidationFees(gwavPremium: PromiseOrValue<BigNumberish>, userPositionCollateral: PromiseOrValue<BigNumberish>, convertedMinLiquidationFee: PromiseOrValue<BigNumberish>, insolvencyMultiplier: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[
            OptionToken.LiquidationFeesStructOutput
        ] & {
            liquidationFees: OptionToken.LiquidationFeesStructOutput;
        }>;
        getOptionPosition(positionId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[OptionToken.OptionPositionStructOutput]>;
        getOptionPositions(positionIds: PromiseOrValue<BigNumberish>[], overrides?: CallOverrides): Promise<[OptionToken.OptionPositionStructOutput[]]>;
        getOwnerPositions(target: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[OptionToken.OptionPositionStructOutput[]]>;
        getPartialCollatParams(overrides?: CallOverrides): Promise<[OptionToken.PartialCollateralParametersStructOutput]>;
        getPositionState(positionId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[number]>;
        getPositionWithOwner(positionId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[OptionToken.PositionWithOwnerStructOutput]>;
        getPositionsWithOwner(positionIds: PromiseOrValue<BigNumberish>[], overrides?: CallOverrides): Promise<[OptionToken.PositionWithOwnerStructOutput[]]>;
        init(_optionMarket: PromiseOrValue<string>, _greekCache: PromiseOrValue<string>, _shortCollateral: PromiseOrValue<string>, _synthetixAdapter: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        isApprovedForAll(owner: PromiseOrValue<string>, operator: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        liquidate(positionId: PromiseOrValue<BigNumberish>, trade: OptionMarket.TradeParametersStruct, totalCost: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        merge(positionIds: PromiseOrValue<BigNumberish>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        name(overrides?: CallOverrides): Promise<[string]>;
        nextId(overrides?: CallOverrides): Promise<[BigNumber]>;
        nominateNewOwner(_owner: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        nominatedOwner(overrides?: CallOverrides): Promise<[string]>;
        owner(overrides?: CallOverrides): Promise<[string]>;
        ownerOf(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[string]>;
        partialCollatParams(overrides?: CallOverrides): Promise<[
            BigNumber,
            BigNumber,
            BigNumber,
            BigNumber
        ] & {
            penaltyRatio: BigNumber;
            liquidatorFeeRatio: BigNumber;
            smFeeRatio: BigNumber;
            minLiquidationFee: BigNumber;
        }>;
        positions(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[
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
        }>;
        "safeTransferFrom(address,address,uint256)"(from: PromiseOrValue<string>, to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "safeTransferFrom(address,address,uint256,bytes)"(from: PromiseOrValue<string>, to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, _data: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        setApprovalForAll(operator: PromiseOrValue<string>, approved: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        setPartialCollateralParams(_partialCollatParams: OptionToken.PartialCollateralParametersStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        setURI(newURI: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        settlePositions(positionIds: PromiseOrValue<BigNumberish>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        split(positionId: PromiseOrValue<BigNumberish>, newAmount: PromiseOrValue<BigNumberish>, newCollateral: PromiseOrValue<BigNumberish>, recipient: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        supportsInterface(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
        symbol(overrides?: CallOverrides): Promise<[string]>;
        tokenByIndex(index: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[BigNumber]>;
        tokenOfOwnerByIndex(owner: PromiseOrValue<string>, index: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[BigNumber]>;
        tokenURI(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[string]>;
        totalSupply(overrides?: CallOverrides): Promise<[BigNumber]>;
        transferFrom(from: PromiseOrValue<string>, to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
    };
    acceptOwnership(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    addCollateral(positionId: PromiseOrValue<BigNumberish>, amountCollateral: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    adjustPosition(trade: OptionMarket.TradeParametersStruct, strikeId: PromiseOrValue<BigNumberish>, trader: PromiseOrValue<string>, positionId: PromiseOrValue<BigNumberish>, optionCost: PromiseOrValue<BigNumberish>, setCollateralTo: PromiseOrValue<BigNumberish>, isOpen: PromiseOrValue<boolean>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    approve(to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    balanceOf(owner: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
    baseURI(overrides?: CallOverrides): Promise<string>;
    canLiquidate(position: OptionToken.OptionPositionStruct, expiry: PromiseOrValue<BigNumberish>, strikePrice: PromiseOrValue<BigNumberish>, spotPrice: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
    getApproved(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
    getLiquidationFees(gwavPremium: PromiseOrValue<BigNumberish>, userPositionCollateral: PromiseOrValue<BigNumberish>, convertedMinLiquidationFee: PromiseOrValue<BigNumberish>, insolvencyMultiplier: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<OptionToken.LiquidationFeesStructOutput>;
    getOptionPosition(positionId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<OptionToken.OptionPositionStructOutput>;
    getOptionPositions(positionIds: PromiseOrValue<BigNumberish>[], overrides?: CallOverrides): Promise<OptionToken.OptionPositionStructOutput[]>;
    getOwnerPositions(target: PromiseOrValue<string>, overrides?: CallOverrides): Promise<OptionToken.OptionPositionStructOutput[]>;
    getPartialCollatParams(overrides?: CallOverrides): Promise<OptionToken.PartialCollateralParametersStructOutput>;
    getPositionState(positionId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<number>;
    getPositionWithOwner(positionId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<OptionToken.PositionWithOwnerStructOutput>;
    getPositionsWithOwner(positionIds: PromiseOrValue<BigNumberish>[], overrides?: CallOverrides): Promise<OptionToken.PositionWithOwnerStructOutput[]>;
    init(_optionMarket: PromiseOrValue<string>, _greekCache: PromiseOrValue<string>, _shortCollateral: PromiseOrValue<string>, _synthetixAdapter: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    isApprovedForAll(owner: PromiseOrValue<string>, operator: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    liquidate(positionId: PromiseOrValue<BigNumberish>, trade: OptionMarket.TradeParametersStruct, totalCost: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    merge(positionIds: PromiseOrValue<BigNumberish>[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    name(overrides?: CallOverrides): Promise<string>;
    nextId(overrides?: CallOverrides): Promise<BigNumber>;
    nominateNewOwner(_owner: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    nominatedOwner(overrides?: CallOverrides): Promise<string>;
    owner(overrides?: CallOverrides): Promise<string>;
    ownerOf(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
    partialCollatParams(overrides?: CallOverrides): Promise<[
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber
    ] & {
        penaltyRatio: BigNumber;
        liquidatorFeeRatio: BigNumber;
        smFeeRatio: BigNumber;
        minLiquidationFee: BigNumber;
    }>;
    positions(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[
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
    }>;
    "safeTransferFrom(address,address,uint256)"(from: PromiseOrValue<string>, to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "safeTransferFrom(address,address,uint256,bytes)"(from: PromiseOrValue<string>, to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, _data: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    setApprovalForAll(operator: PromiseOrValue<string>, approved: PromiseOrValue<boolean>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    setPartialCollateralParams(_partialCollatParams: OptionToken.PartialCollateralParametersStruct, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    setURI(newURI: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    settlePositions(positionIds: PromiseOrValue<BigNumberish>[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    split(positionId: PromiseOrValue<BigNumberish>, newAmount: PromiseOrValue<BigNumberish>, newCollateral: PromiseOrValue<BigNumberish>, recipient: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    supportsInterface(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    symbol(overrides?: CallOverrides): Promise<string>;
    tokenByIndex(index: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
    tokenOfOwnerByIndex(owner: PromiseOrValue<string>, index: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
    tokenURI(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
    totalSupply(overrides?: CallOverrides): Promise<BigNumber>;
    transferFrom(from: PromiseOrValue<string>, to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        acceptOwnership(overrides?: CallOverrides): Promise<void>;
        addCollateral(positionId: PromiseOrValue<BigNumberish>, amountCollateral: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<number>;
        adjustPosition(trade: OptionMarket.TradeParametersStruct, strikeId: PromiseOrValue<BigNumberish>, trader: PromiseOrValue<string>, positionId: PromiseOrValue<BigNumberish>, optionCost: PromiseOrValue<BigNumberish>, setCollateralTo: PromiseOrValue<BigNumberish>, isOpen: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<[BigNumber, BigNumber] & {
            pendingCollateral: BigNumber;
        }>;
        approve(to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        balanceOf(owner: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        baseURI(overrides?: CallOverrides): Promise<string>;
        canLiquidate(position: OptionToken.OptionPositionStruct, expiry: PromiseOrValue<BigNumberish>, strikePrice: PromiseOrValue<BigNumberish>, spotPrice: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
        getApproved(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
        getLiquidationFees(gwavPremium: PromiseOrValue<BigNumberish>, userPositionCollateral: PromiseOrValue<BigNumberish>, convertedMinLiquidationFee: PromiseOrValue<BigNumberish>, insolvencyMultiplier: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<OptionToken.LiquidationFeesStructOutput>;
        getOptionPosition(positionId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<OptionToken.OptionPositionStructOutput>;
        getOptionPositions(positionIds: PromiseOrValue<BigNumberish>[], overrides?: CallOverrides): Promise<OptionToken.OptionPositionStructOutput[]>;
        getOwnerPositions(target: PromiseOrValue<string>, overrides?: CallOverrides): Promise<OptionToken.OptionPositionStructOutput[]>;
        getPartialCollatParams(overrides?: CallOverrides): Promise<OptionToken.PartialCollateralParametersStructOutput>;
        getPositionState(positionId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<number>;
        getPositionWithOwner(positionId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<OptionToken.PositionWithOwnerStructOutput>;
        getPositionsWithOwner(positionIds: PromiseOrValue<BigNumberish>[], overrides?: CallOverrides): Promise<OptionToken.PositionWithOwnerStructOutput[]>;
        init(_optionMarket: PromiseOrValue<string>, _greekCache: PromiseOrValue<string>, _shortCollateral: PromiseOrValue<string>, _synthetixAdapter: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        isApprovedForAll(owner: PromiseOrValue<string>, operator: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        liquidate(positionId: PromiseOrValue<BigNumberish>, trade: OptionMarket.TradeParametersStruct, totalCost: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<OptionToken.LiquidationFeesStructOutput>;
        merge(positionIds: PromiseOrValue<BigNumberish>[], overrides?: CallOverrides): Promise<void>;
        name(overrides?: CallOverrides): Promise<string>;
        nextId(overrides?: CallOverrides): Promise<BigNumber>;
        nominateNewOwner(_owner: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        nominatedOwner(overrides?: CallOverrides): Promise<string>;
        owner(overrides?: CallOverrides): Promise<string>;
        ownerOf(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
        partialCollatParams(overrides?: CallOverrides): Promise<[
            BigNumber,
            BigNumber,
            BigNumber,
            BigNumber
        ] & {
            penaltyRatio: BigNumber;
            liquidatorFeeRatio: BigNumber;
            smFeeRatio: BigNumber;
            minLiquidationFee: BigNumber;
        }>;
        positions(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[
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
        }>;
        "safeTransferFrom(address,address,uint256)"(from: PromiseOrValue<string>, to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        "safeTransferFrom(address,address,uint256,bytes)"(from: PromiseOrValue<string>, to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, _data: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<void>;
        setApprovalForAll(operator: PromiseOrValue<string>, approved: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<void>;
        setPartialCollateralParams(_partialCollatParams: OptionToken.PartialCollateralParametersStruct, overrides?: CallOverrides): Promise<void>;
        setURI(newURI: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        settlePositions(positionIds: PromiseOrValue<BigNumberish>[], overrides?: CallOverrides): Promise<void>;
        split(positionId: PromiseOrValue<BigNumberish>, newAmount: PromiseOrValue<BigNumberish>, newCollateral: PromiseOrValue<BigNumberish>, recipient: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        supportsInterface(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        symbol(overrides?: CallOverrides): Promise<string>;
        tokenByIndex(index: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        tokenOfOwnerByIndex(owner: PromiseOrValue<string>, index: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        tokenURI(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
        totalSupply(overrides?: CallOverrides): Promise<BigNumber>;
        transferFrom(from: PromiseOrValue<string>, to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
    };
    filters: {
        "Approval(address,address,uint256)"(owner?: PromiseOrValue<string> | null, approved?: PromiseOrValue<string> | null, tokenId?: PromiseOrValue<BigNumberish> | null): ApprovalEventFilter;
        Approval(owner?: PromiseOrValue<string> | null, approved?: PromiseOrValue<string> | null, tokenId?: PromiseOrValue<BigNumberish> | null): ApprovalEventFilter;
        "ApprovalForAll(address,address,bool)"(owner?: PromiseOrValue<string> | null, operator?: PromiseOrValue<string> | null, approved?: null): ApprovalForAllEventFilter;
        ApprovalForAll(owner?: PromiseOrValue<string> | null, operator?: PromiseOrValue<string> | null, approved?: null): ApprovalForAllEventFilter;
        "OwnerChanged(address,address)"(oldOwner?: null, newOwner?: null): OwnerChangedEventFilter;
        OwnerChanged(oldOwner?: null, newOwner?: null): OwnerChangedEventFilter;
        "OwnerNominated(address)"(newOwner?: null): OwnerNominatedEventFilter;
        OwnerNominated(newOwner?: null): OwnerNominatedEventFilter;
        "PartialCollateralParamsSet(tuple)"(partialCollateralParams?: null): PartialCollateralParamsSetEventFilter;
        PartialCollateralParamsSet(partialCollateralParams?: null): PartialCollateralParamsSetEventFilter;
        "PositionUpdated(uint256,address,uint8,tuple,uint256)"(positionId?: PromiseOrValue<BigNumberish> | null, owner?: PromiseOrValue<string> | null, updatedType?: PromiseOrValue<BigNumberish> | null, position?: null, timestamp?: null): PositionUpdatedEventFilter;
        PositionUpdated(positionId?: PromiseOrValue<BigNumberish> | null, owner?: PromiseOrValue<string> | null, updatedType?: PromiseOrValue<BigNumberish> | null, position?: null, timestamp?: null): PositionUpdatedEventFilter;
        "Transfer(address,address,uint256)"(from?: PromiseOrValue<string> | null, to?: PromiseOrValue<string> | null, tokenId?: PromiseOrValue<BigNumberish> | null): TransferEventFilter;
        Transfer(from?: PromiseOrValue<string> | null, to?: PromiseOrValue<string> | null, tokenId?: PromiseOrValue<BigNumberish> | null): TransferEventFilter;
        "URISet(string)"(URI?: null): URISetEventFilter;
        URISet(URI?: null): URISetEventFilter;
    };
    estimateGas: {
        acceptOwnership(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        addCollateral(positionId: PromiseOrValue<BigNumberish>, amountCollateral: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        adjustPosition(trade: OptionMarket.TradeParametersStruct, strikeId: PromiseOrValue<BigNumberish>, trader: PromiseOrValue<string>, positionId: PromiseOrValue<BigNumberish>, optionCost: PromiseOrValue<BigNumberish>, setCollateralTo: PromiseOrValue<BigNumberish>, isOpen: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        approve(to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        balanceOf(owner: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        baseURI(overrides?: CallOverrides): Promise<BigNumber>;
        canLiquidate(position: OptionToken.OptionPositionStruct, expiry: PromiseOrValue<BigNumberish>, strikePrice: PromiseOrValue<BigNumberish>, spotPrice: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        getApproved(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        getLiquidationFees(gwavPremium: PromiseOrValue<BigNumberish>, userPositionCollateral: PromiseOrValue<BigNumberish>, convertedMinLiquidationFee: PromiseOrValue<BigNumberish>, insolvencyMultiplier: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        getOptionPosition(positionId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        getOptionPositions(positionIds: PromiseOrValue<BigNumberish>[], overrides?: CallOverrides): Promise<BigNumber>;
        getOwnerPositions(target: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        getPartialCollatParams(overrides?: CallOverrides): Promise<BigNumber>;
        getPositionState(positionId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        getPositionWithOwner(positionId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        getPositionsWithOwner(positionIds: PromiseOrValue<BigNumberish>[], overrides?: CallOverrides): Promise<BigNumber>;
        init(_optionMarket: PromiseOrValue<string>, _greekCache: PromiseOrValue<string>, _shortCollateral: PromiseOrValue<string>, _synthetixAdapter: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        isApprovedForAll(owner: PromiseOrValue<string>, operator: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        liquidate(positionId: PromiseOrValue<BigNumberish>, trade: OptionMarket.TradeParametersStruct, totalCost: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        merge(positionIds: PromiseOrValue<BigNumberish>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        name(overrides?: CallOverrides): Promise<BigNumber>;
        nextId(overrides?: CallOverrides): Promise<BigNumber>;
        nominateNewOwner(_owner: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        nominatedOwner(overrides?: CallOverrides): Promise<BigNumber>;
        owner(overrides?: CallOverrides): Promise<BigNumber>;
        ownerOf(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        partialCollatParams(overrides?: CallOverrides): Promise<BigNumber>;
        positions(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        "safeTransferFrom(address,address,uint256)"(from: PromiseOrValue<string>, to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "safeTransferFrom(address,address,uint256,bytes)"(from: PromiseOrValue<string>, to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, _data: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        setApprovalForAll(operator: PromiseOrValue<string>, approved: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        setPartialCollateralParams(_partialCollatParams: OptionToken.PartialCollateralParametersStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        setURI(newURI: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        settlePositions(positionIds: PromiseOrValue<BigNumberish>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        split(positionId: PromiseOrValue<BigNumberish>, newAmount: PromiseOrValue<BigNumberish>, newCollateral: PromiseOrValue<BigNumberish>, recipient: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        supportsInterface(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        symbol(overrides?: CallOverrides): Promise<BigNumber>;
        tokenByIndex(index: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        tokenOfOwnerByIndex(owner: PromiseOrValue<string>, index: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        tokenURI(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        totalSupply(overrides?: CallOverrides): Promise<BigNumber>;
        transferFrom(from: PromiseOrValue<string>, to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        acceptOwnership(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        addCollateral(positionId: PromiseOrValue<BigNumberish>, amountCollateral: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        adjustPosition(trade: OptionMarket.TradeParametersStruct, strikeId: PromiseOrValue<BigNumberish>, trader: PromiseOrValue<string>, positionId: PromiseOrValue<BigNumberish>, optionCost: PromiseOrValue<BigNumberish>, setCollateralTo: PromiseOrValue<BigNumberish>, isOpen: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        approve(to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        balanceOf(owner: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        baseURI(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        canLiquidate(position: OptionToken.OptionPositionStruct, expiry: PromiseOrValue<BigNumberish>, strikePrice: PromiseOrValue<BigNumberish>, spotPrice: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getApproved(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getLiquidationFees(gwavPremium: PromiseOrValue<BigNumberish>, userPositionCollateral: PromiseOrValue<BigNumberish>, convertedMinLiquidationFee: PromiseOrValue<BigNumberish>, insolvencyMultiplier: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getOptionPosition(positionId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getOptionPositions(positionIds: PromiseOrValue<BigNumberish>[], overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getOwnerPositions(target: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getPartialCollatParams(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getPositionState(positionId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getPositionWithOwner(positionId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getPositionsWithOwner(positionIds: PromiseOrValue<BigNumberish>[], overrides?: CallOverrides): Promise<PopulatedTransaction>;
        init(_optionMarket: PromiseOrValue<string>, _greekCache: PromiseOrValue<string>, _shortCollateral: PromiseOrValue<string>, _synthetixAdapter: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        isApprovedForAll(owner: PromiseOrValue<string>, operator: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        liquidate(positionId: PromiseOrValue<BigNumberish>, trade: OptionMarket.TradeParametersStruct, totalCost: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        merge(positionIds: PromiseOrValue<BigNumberish>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        name(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        nextId(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        nominateNewOwner(_owner: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        nominatedOwner(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        ownerOf(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        partialCollatParams(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        positions(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "safeTransferFrom(address,address,uint256)"(from: PromiseOrValue<string>, to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "safeTransferFrom(address,address,uint256,bytes)"(from: PromiseOrValue<string>, to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, _data: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        setApprovalForAll(operator: PromiseOrValue<string>, approved: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        setPartialCollateralParams(_partialCollatParams: OptionToken.PartialCollateralParametersStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        setURI(newURI: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        settlePositions(positionIds: PromiseOrValue<BigNumberish>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        split(positionId: PromiseOrValue<BigNumberish>, newAmount: PromiseOrValue<BigNumberish>, newCollateral: PromiseOrValue<BigNumberish>, recipient: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        supportsInterface(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        symbol(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        tokenByIndex(index: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        tokenOfOwnerByIndex(owner: PromiseOrValue<string>, index: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        tokenURI(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        totalSupply(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        transferFrom(from: PromiseOrValue<string>, to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
    };
}
