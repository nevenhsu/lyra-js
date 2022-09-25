/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export declare namespace SynthetixAdapter {
  export type ExchangeParamsStruct = {
    spotPrice: BigNumberish;
    quoteKey: BytesLike;
    baseKey: BytesLike;
    quoteBaseFeeRate: BigNumberish;
    baseQuoteFeeRate: BigNumberish;
  };

  export type ExchangeParamsStructOutput = [
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

export interface SynthetixAdapterInterface extends utils.Interface {
  contractName: "SynthetixAdapter";
  functions: {
    "acceptOwnership()": FunctionFragment;
    "addressResolver()": FunctionFragment;
    "baseKey(address)": FunctionFragment;
    "delegateApprovals()": FunctionFragment;
    "estimateExchangeToExactBase((uint256,bytes32,bytes32,uint256,uint256),uint256)": FunctionFragment;
    "estimateExchangeToExactQuote((uint256,bytes32,bytes32,uint256,uint256),uint256)": FunctionFragment;
    "exchangeFromExactBase(address,uint256)": FunctionFragment;
    "exchangeFromExactQuote(address,uint256)": FunctionFragment;
    "exchangeRates()": FunctionFragment;
    "exchangeToExactBase((uint256,bytes32,bytes32,uint256,uint256),address,uint256)": FunctionFragment;
    "exchangeToExactBaseWithLimit((uint256,bytes32,bytes32,uint256,uint256),address,uint256,uint256)": FunctionFragment;
    "exchangeToExactQuote((uint256,bytes32,bytes32,uint256,uint256),address,uint256)": FunctionFragment;
    "exchangeToExactQuoteWithLimit((uint256,bytes32,bytes32,uint256,uint256),address,uint256,uint256)": FunctionFragment;
    "exchanger()": FunctionFragment;
    "getExchangeParams(address)": FunctionFragment;
    "getSpotPrice(bytes32)": FunctionFragment;
    "getSpotPriceForMarket(address)": FunctionFragment;
    "initialize()": FunctionFragment;
    "isGlobalPaused()": FunctionFragment;
    "isMarketPaused(address)": FunctionFragment;
    "nominateNewOwner(address)": FunctionFragment;
    "nominatedOwner()": FunctionFragment;
    "owner()": FunctionFragment;
    "quoteKey(address)": FunctionFragment;
    "rewardAddress(address)": FunctionFragment;
    "setAddressResolver(address)": FunctionFragment;
    "setGlobalPaused(bool)": FunctionFragment;
    "setGlobalsForContract(address,bytes32,bytes32,address,bytes32)": FunctionFragment;
    "setMarketPaused(address,bool)": FunctionFragment;
    "synthetix()": FunctionFragment;
    "trackingCode(address)": FunctionFragment;
    "updateSynthetixAddresses()": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "acceptOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "addressResolver",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "baseKey", values: [string]): string;
  encodeFunctionData(
    functionFragment: "delegateApprovals",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "estimateExchangeToExactBase",
    values: [SynthetixAdapter.ExchangeParamsStruct, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "estimateExchangeToExactQuote",
    values: [SynthetixAdapter.ExchangeParamsStruct, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "exchangeFromExactBase",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "exchangeFromExactQuote",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "exchangeRates",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "exchangeToExactBase",
    values: [SynthetixAdapter.ExchangeParamsStruct, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "exchangeToExactBaseWithLimit",
    values: [
      SynthetixAdapter.ExchangeParamsStruct,
      string,
      BigNumberish,
      BigNumberish
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "exchangeToExactQuote",
    values: [SynthetixAdapter.ExchangeParamsStruct, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "exchangeToExactQuoteWithLimit",
    values: [
      SynthetixAdapter.ExchangeParamsStruct,
      string,
      BigNumberish,
      BigNumberish
    ]
  ): string;
  encodeFunctionData(functionFragment: "exchanger", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "getExchangeParams",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "getSpotPrice",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getSpotPriceForMarket",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "initialize",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "isGlobalPaused",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "isMarketPaused",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "nominateNewOwner",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "nominatedOwner",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(functionFragment: "quoteKey", values: [string]): string;
  encodeFunctionData(
    functionFragment: "rewardAddress",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "setAddressResolver",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "setGlobalPaused",
    values: [boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "setGlobalsForContract",
    values: [string, BytesLike, BytesLike, string, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "setMarketPaused",
    values: [string, boolean]
  ): string;
  encodeFunctionData(functionFragment: "synthetix", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "trackingCode",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "updateSynthetixAddresses",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "acceptOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "addressResolver",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "baseKey", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "delegateApprovals",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "estimateExchangeToExactBase",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "estimateExchangeToExactQuote",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "exchangeFromExactBase",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "exchangeFromExactQuote",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "exchangeRates",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "exchangeToExactBase",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "exchangeToExactBaseWithLimit",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "exchangeToExactQuote",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "exchangeToExactQuoteWithLimit",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "exchanger", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getExchangeParams",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getSpotPrice",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getSpotPriceForMarket",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "isGlobalPaused",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isMarketPaused",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "nominateNewOwner",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "nominatedOwner",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "quoteKey", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "rewardAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setAddressResolver",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setGlobalPaused",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setGlobalsForContract",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setMarketPaused",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "synthetix", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "trackingCode",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateSynthetixAddresses",
    data: BytesLike
  ): Result;

  events: {
    "AddressResolverSet(address)": EventFragment;
    "BaseSwappedForQuote(address,address,uint256,uint256)": EventFragment;
    "GlobalPausedSet(bool)": EventFragment;
    "GlobalsSetForContract(address,bytes32,bytes32,address,bytes32)": EventFragment;
    "MarketPausedSet(address,bool)": EventFragment;
    "OwnerChanged(address,address)": EventFragment;
    "OwnerNominated(address)": EventFragment;
    "QuoteSwappedForBase(address,address,uint256,uint256)": EventFragment;
    "SynthetixAddressesUpdated(address,address,address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "AddressResolverSet"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "BaseSwappedForQuote"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "GlobalPausedSet"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "GlobalsSetForContract"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "MarketPausedSet"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnerChanged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnerNominated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "QuoteSwappedForBase"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SynthetixAddressesUpdated"): EventFragment;
}

export type AddressResolverSetEvent = TypedEvent<
  [string],
  { addressResolver: string }
>;

export type AddressResolverSetEventFilter =
  TypedEventFilter<AddressResolverSetEvent>;

export type BaseSwappedForQuoteEvent = TypedEvent<
  [string, string, BigNumber, BigNumber],
  {
    marketAddress: string;
    exchanger: string;
    baseSwapped: BigNumber;
    quoteReceived: BigNumber;
  }
>;

export type BaseSwappedForQuoteEventFilter =
  TypedEventFilter<BaseSwappedForQuoteEvent>;

export type GlobalPausedSetEvent = TypedEvent<[boolean], { isPaused: boolean }>;

export type GlobalPausedSetEventFilter = TypedEventFilter<GlobalPausedSetEvent>;

export type GlobalsSetForContractEvent = TypedEvent<
  [string, string, string, string, string],
  {
    market: string;
    quoteKey: string;
    baseKey: string;
    rewardAddress: string;
    trackingCode: string;
  }
>;

export type GlobalsSetForContractEventFilter =
  TypedEventFilter<GlobalsSetForContractEvent>;

export type MarketPausedSetEvent = TypedEvent<
  [string, boolean],
  { contractAddress: string; isPaused: boolean }
>;

export type MarketPausedSetEventFilter = TypedEventFilter<MarketPausedSetEvent>;

export type OwnerChangedEvent = TypedEvent<
  [string, string],
  { oldOwner: string; newOwner: string }
>;

export type OwnerChangedEventFilter = TypedEventFilter<OwnerChangedEvent>;

export type OwnerNominatedEvent = TypedEvent<[string], { newOwner: string }>;

export type OwnerNominatedEventFilter = TypedEventFilter<OwnerNominatedEvent>;

export type QuoteSwappedForBaseEvent = TypedEvent<
  [string, string, BigNumber, BigNumber],
  {
    marketAddress: string;
    exchanger: string;
    quoteSwapped: BigNumber;
    baseReceived: BigNumber;
  }
>;

export type QuoteSwappedForBaseEventFilter =
  TypedEventFilter<QuoteSwappedForBaseEvent>;

export type SynthetixAddressesUpdatedEvent = TypedEvent<
  [string, string, string, string],
  {
    synthetix: string;
    exchanger: string;
    exchangeRates: string;
    delegateApprovals: string;
  }
>;

export type SynthetixAddressesUpdatedEventFilter =
  TypedEventFilter<SynthetixAddressesUpdatedEvent>;

export interface SynthetixAdapter extends BaseContract {
  contractName: "SynthetixAdapter";
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: SynthetixAdapterInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    acceptOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    addressResolver(overrides?: CallOverrides): Promise<[string]>;

    baseKey(arg0: string, overrides?: CallOverrides): Promise<[string]>;

    delegateApprovals(overrides?: CallOverrides): Promise<[string]>;

    estimateExchangeToExactBase(
      exchangeParams: SynthetixAdapter.ExchangeParamsStruct,
      amountBase: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { quoteNeeded: BigNumber }>;

    estimateExchangeToExactQuote(
      exchangeParams: SynthetixAdapter.ExchangeParamsStruct,
      amountQuote: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { baseNeeded: BigNumber }>;

    exchangeFromExactBase(
      optionMarket: string,
      amountBase: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    exchangeFromExactQuote(
      optionMarket: string,
      amountQuote: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    exchangeRates(overrides?: CallOverrides): Promise<[string]>;

    exchangeToExactBase(
      exchangeParams: SynthetixAdapter.ExchangeParamsStruct,
      optionMarket: string,
      amountBase: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    exchangeToExactBaseWithLimit(
      exchangeParams: SynthetixAdapter.ExchangeParamsStruct,
      optionMarket: string,
      amountBase: BigNumberish,
      quoteLimit: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    exchangeToExactQuote(
      exchangeParams: SynthetixAdapter.ExchangeParamsStruct,
      optionMarket: string,
      amountQuote: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    exchangeToExactQuoteWithLimit(
      exchangeParams: SynthetixAdapter.ExchangeParamsStruct,
      optionMarket: string,
      amountQuote: BigNumberish,
      baseLimit: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    exchanger(overrides?: CallOverrides): Promise<[string]>;

    getExchangeParams(
      optionMarket: string,
      overrides?: CallOverrides
    ): Promise<
      [SynthetixAdapter.ExchangeParamsStructOutput] & {
        exchangeParams: SynthetixAdapter.ExchangeParamsStructOutput;
      }
    >;

    getSpotPrice(
      to: BytesLike,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getSpotPriceForMarket(
      _contractAddress: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { spotPrice: BigNumber }>;

    initialize(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    isGlobalPaused(overrides?: CallOverrides): Promise<[boolean]>;

    isMarketPaused(arg0: string, overrides?: CallOverrides): Promise<[boolean]>;

    nominateNewOwner(
      _owner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    nominatedOwner(overrides?: CallOverrides): Promise<[string]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    quoteKey(arg0: string, overrides?: CallOverrides): Promise<[string]>;

    rewardAddress(arg0: string, overrides?: CallOverrides): Promise<[string]>;

    setAddressResolver(
      _addressResolver: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setGlobalPaused(
      _isPaused: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setGlobalsForContract(
      _contractAddress: string,
      _quoteKey: BytesLike,
      _baseKey: BytesLike,
      _rewardAddress: string,
      _trackingCode: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setMarketPaused(
      _contractAddress: string,
      _isPaused: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    synthetix(overrides?: CallOverrides): Promise<[string]>;

    trackingCode(arg0: string, overrides?: CallOverrides): Promise<[string]>;

    updateSynthetixAddresses(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  acceptOwnership(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  addressResolver(overrides?: CallOverrides): Promise<string>;

  baseKey(arg0: string, overrides?: CallOverrides): Promise<string>;

  delegateApprovals(overrides?: CallOverrides): Promise<string>;

  estimateExchangeToExactBase(
    exchangeParams: SynthetixAdapter.ExchangeParamsStruct,
    amountBase: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  estimateExchangeToExactQuote(
    exchangeParams: SynthetixAdapter.ExchangeParamsStruct,
    amountQuote: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  exchangeFromExactBase(
    optionMarket: string,
    amountBase: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  exchangeFromExactQuote(
    optionMarket: string,
    amountQuote: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  exchangeRates(overrides?: CallOverrides): Promise<string>;

  exchangeToExactBase(
    exchangeParams: SynthetixAdapter.ExchangeParamsStruct,
    optionMarket: string,
    amountBase: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  exchangeToExactBaseWithLimit(
    exchangeParams: SynthetixAdapter.ExchangeParamsStruct,
    optionMarket: string,
    amountBase: BigNumberish,
    quoteLimit: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  exchangeToExactQuote(
    exchangeParams: SynthetixAdapter.ExchangeParamsStruct,
    optionMarket: string,
    amountQuote: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  exchangeToExactQuoteWithLimit(
    exchangeParams: SynthetixAdapter.ExchangeParamsStruct,
    optionMarket: string,
    amountQuote: BigNumberish,
    baseLimit: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  exchanger(overrides?: CallOverrides): Promise<string>;

  getExchangeParams(
    optionMarket: string,
    overrides?: CallOverrides
  ): Promise<SynthetixAdapter.ExchangeParamsStructOutput>;

  getSpotPrice(to: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;

  getSpotPriceForMarket(
    _contractAddress: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  initialize(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  isGlobalPaused(overrides?: CallOverrides): Promise<boolean>;

  isMarketPaused(arg0: string, overrides?: CallOverrides): Promise<boolean>;

  nominateNewOwner(
    _owner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  nominatedOwner(overrides?: CallOverrides): Promise<string>;

  owner(overrides?: CallOverrides): Promise<string>;

  quoteKey(arg0: string, overrides?: CallOverrides): Promise<string>;

  rewardAddress(arg0: string, overrides?: CallOverrides): Promise<string>;

  setAddressResolver(
    _addressResolver: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setGlobalPaused(
    _isPaused: boolean,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setGlobalsForContract(
    _contractAddress: string,
    _quoteKey: BytesLike,
    _baseKey: BytesLike,
    _rewardAddress: string,
    _trackingCode: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setMarketPaused(
    _contractAddress: string,
    _isPaused: boolean,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  synthetix(overrides?: CallOverrides): Promise<string>;

  trackingCode(arg0: string, overrides?: CallOverrides): Promise<string>;

  updateSynthetixAddresses(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    acceptOwnership(overrides?: CallOverrides): Promise<void>;

    addressResolver(overrides?: CallOverrides): Promise<string>;

    baseKey(arg0: string, overrides?: CallOverrides): Promise<string>;

    delegateApprovals(overrides?: CallOverrides): Promise<string>;

    estimateExchangeToExactBase(
      exchangeParams: SynthetixAdapter.ExchangeParamsStruct,
      amountBase: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    estimateExchangeToExactQuote(
      exchangeParams: SynthetixAdapter.ExchangeParamsStruct,
      amountQuote: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    exchangeFromExactBase(
      optionMarket: string,
      amountBase: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    exchangeFromExactQuote(
      optionMarket: string,
      amountQuote: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    exchangeRates(overrides?: CallOverrides): Promise<string>;

    exchangeToExactBase(
      exchangeParams: SynthetixAdapter.ExchangeParamsStruct,
      optionMarket: string,
      amountBase: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & {
        quoteSpent: BigNumber;
        baseReceived: BigNumber;
      }
    >;

    exchangeToExactBaseWithLimit(
      exchangeParams: SynthetixAdapter.ExchangeParamsStruct,
      optionMarket: string,
      amountBase: BigNumberish,
      quoteLimit: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & {
        quoteSpent: BigNumber;
        baseReceived: BigNumber;
      }
    >;

    exchangeToExactQuote(
      exchangeParams: SynthetixAdapter.ExchangeParamsStruct,
      optionMarket: string,
      amountQuote: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & {
        quoteSpent: BigNumber;
        quoteReceived: BigNumber;
      }
    >;

    exchangeToExactQuoteWithLimit(
      exchangeParams: SynthetixAdapter.ExchangeParamsStruct,
      optionMarket: string,
      amountQuote: BigNumberish,
      baseLimit: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & {
        baseSpent: BigNumber;
        quoteReceived: BigNumber;
      }
    >;

    exchanger(overrides?: CallOverrides): Promise<string>;

    getExchangeParams(
      optionMarket: string,
      overrides?: CallOverrides
    ): Promise<SynthetixAdapter.ExchangeParamsStructOutput>;

    getSpotPrice(to: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;

    getSpotPriceForMarket(
      _contractAddress: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    initialize(overrides?: CallOverrides): Promise<void>;

    isGlobalPaused(overrides?: CallOverrides): Promise<boolean>;

    isMarketPaused(arg0: string, overrides?: CallOverrides): Promise<boolean>;

    nominateNewOwner(_owner: string, overrides?: CallOverrides): Promise<void>;

    nominatedOwner(overrides?: CallOverrides): Promise<string>;

    owner(overrides?: CallOverrides): Promise<string>;

    quoteKey(arg0: string, overrides?: CallOverrides): Promise<string>;

    rewardAddress(arg0: string, overrides?: CallOverrides): Promise<string>;

    setAddressResolver(
      _addressResolver: string,
      overrides?: CallOverrides
    ): Promise<void>;

    setGlobalPaused(
      _isPaused: boolean,
      overrides?: CallOverrides
    ): Promise<void>;

    setGlobalsForContract(
      _contractAddress: string,
      _quoteKey: BytesLike,
      _baseKey: BytesLike,
      _rewardAddress: string,
      _trackingCode: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    setMarketPaused(
      _contractAddress: string,
      _isPaused: boolean,
      overrides?: CallOverrides
    ): Promise<void>;

    synthetix(overrides?: CallOverrides): Promise<string>;

    trackingCode(arg0: string, overrides?: CallOverrides): Promise<string>;

    updateSynthetixAddresses(overrides?: CallOverrides): Promise<void>;
  };

  filters: {
    "AddressResolverSet(address)"(
      addressResolver?: null
    ): AddressResolverSetEventFilter;
    AddressResolverSet(addressResolver?: null): AddressResolverSetEventFilter;

    "BaseSwappedForQuote(address,address,uint256,uint256)"(
      marketAddress?: string | null,
      exchanger?: string | null,
      baseSwapped?: null,
      quoteReceived?: null
    ): BaseSwappedForQuoteEventFilter;
    BaseSwappedForQuote(
      marketAddress?: string | null,
      exchanger?: string | null,
      baseSwapped?: null,
      quoteReceived?: null
    ): BaseSwappedForQuoteEventFilter;

    "GlobalPausedSet(bool)"(isPaused?: null): GlobalPausedSetEventFilter;
    GlobalPausedSet(isPaused?: null): GlobalPausedSetEventFilter;

    "GlobalsSetForContract(address,bytes32,bytes32,address,bytes32)"(
      market?: string | null,
      quoteKey?: null,
      baseKey?: null,
      rewardAddress?: null,
      trackingCode?: null
    ): GlobalsSetForContractEventFilter;
    GlobalsSetForContract(
      market?: string | null,
      quoteKey?: null,
      baseKey?: null,
      rewardAddress?: null,
      trackingCode?: null
    ): GlobalsSetForContractEventFilter;

    "MarketPausedSet(address,bool)"(
      contractAddress?: null,
      isPaused?: null
    ): MarketPausedSetEventFilter;
    MarketPausedSet(
      contractAddress?: null,
      isPaused?: null
    ): MarketPausedSetEventFilter;

    "OwnerChanged(address,address)"(
      oldOwner?: null,
      newOwner?: null
    ): OwnerChangedEventFilter;
    OwnerChanged(oldOwner?: null, newOwner?: null): OwnerChangedEventFilter;

    "OwnerNominated(address)"(newOwner?: null): OwnerNominatedEventFilter;
    OwnerNominated(newOwner?: null): OwnerNominatedEventFilter;

    "QuoteSwappedForBase(address,address,uint256,uint256)"(
      marketAddress?: string | null,
      exchanger?: string | null,
      quoteSwapped?: null,
      baseReceived?: null
    ): QuoteSwappedForBaseEventFilter;
    QuoteSwappedForBase(
      marketAddress?: string | null,
      exchanger?: string | null,
      quoteSwapped?: null,
      baseReceived?: null
    ): QuoteSwappedForBaseEventFilter;

    "SynthetixAddressesUpdated(address,address,address,address)"(
      synthetix?: null,
      exchanger?: null,
      exchangeRates?: null,
      delegateApprovals?: null
    ): SynthetixAddressesUpdatedEventFilter;
    SynthetixAddressesUpdated(
      synthetix?: null,
      exchanger?: null,
      exchangeRates?: null,
      delegateApprovals?: null
    ): SynthetixAddressesUpdatedEventFilter;
  };

  estimateGas: {
    acceptOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    addressResolver(overrides?: CallOverrides): Promise<BigNumber>;

    baseKey(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    delegateApprovals(overrides?: CallOverrides): Promise<BigNumber>;

    estimateExchangeToExactBase(
      exchangeParams: SynthetixAdapter.ExchangeParamsStruct,
      amountBase: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    estimateExchangeToExactQuote(
      exchangeParams: SynthetixAdapter.ExchangeParamsStruct,
      amountQuote: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    exchangeFromExactBase(
      optionMarket: string,
      amountBase: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    exchangeFromExactQuote(
      optionMarket: string,
      amountQuote: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    exchangeRates(overrides?: CallOverrides): Promise<BigNumber>;

    exchangeToExactBase(
      exchangeParams: SynthetixAdapter.ExchangeParamsStruct,
      optionMarket: string,
      amountBase: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    exchangeToExactBaseWithLimit(
      exchangeParams: SynthetixAdapter.ExchangeParamsStruct,
      optionMarket: string,
      amountBase: BigNumberish,
      quoteLimit: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    exchangeToExactQuote(
      exchangeParams: SynthetixAdapter.ExchangeParamsStruct,
      optionMarket: string,
      amountQuote: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    exchangeToExactQuoteWithLimit(
      exchangeParams: SynthetixAdapter.ExchangeParamsStruct,
      optionMarket: string,
      amountQuote: BigNumberish,
      baseLimit: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    exchanger(overrides?: CallOverrides): Promise<BigNumber>;

    getExchangeParams(
      optionMarket: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getSpotPrice(to: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;

    getSpotPriceForMarket(
      _contractAddress: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    initialize(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    isGlobalPaused(overrides?: CallOverrides): Promise<BigNumber>;

    isMarketPaused(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    nominateNewOwner(
      _owner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    nominatedOwner(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    quoteKey(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    rewardAddress(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    setAddressResolver(
      _addressResolver: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setGlobalPaused(
      _isPaused: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setGlobalsForContract(
      _contractAddress: string,
      _quoteKey: BytesLike,
      _baseKey: BytesLike,
      _rewardAddress: string,
      _trackingCode: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setMarketPaused(
      _contractAddress: string,
      _isPaused: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    synthetix(overrides?: CallOverrides): Promise<BigNumber>;

    trackingCode(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    updateSynthetixAddresses(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    acceptOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    addressResolver(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    baseKey(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    delegateApprovals(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    estimateExchangeToExactBase(
      exchangeParams: SynthetixAdapter.ExchangeParamsStruct,
      amountBase: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    estimateExchangeToExactQuote(
      exchangeParams: SynthetixAdapter.ExchangeParamsStruct,
      amountQuote: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    exchangeFromExactBase(
      optionMarket: string,
      amountBase: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    exchangeFromExactQuote(
      optionMarket: string,
      amountQuote: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    exchangeRates(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    exchangeToExactBase(
      exchangeParams: SynthetixAdapter.ExchangeParamsStruct,
      optionMarket: string,
      amountBase: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    exchangeToExactBaseWithLimit(
      exchangeParams: SynthetixAdapter.ExchangeParamsStruct,
      optionMarket: string,
      amountBase: BigNumberish,
      quoteLimit: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    exchangeToExactQuote(
      exchangeParams: SynthetixAdapter.ExchangeParamsStruct,
      optionMarket: string,
      amountQuote: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    exchangeToExactQuoteWithLimit(
      exchangeParams: SynthetixAdapter.ExchangeParamsStruct,
      optionMarket: string,
      amountQuote: BigNumberish,
      baseLimit: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    exchanger(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getExchangeParams(
      optionMarket: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getSpotPrice(
      to: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getSpotPriceForMarket(
      _contractAddress: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    initialize(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    isGlobalPaused(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    isMarketPaused(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    nominateNewOwner(
      _owner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    nominatedOwner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    quoteKey(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    rewardAddress(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    setAddressResolver(
      _addressResolver: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setGlobalPaused(
      _isPaused: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setGlobalsForContract(
      _contractAddress: string,
      _quoteKey: BytesLike,
      _baseKey: BytesLike,
      _rewardAddress: string,
      _trackingCode: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setMarketPaused(
      _contractAddress: string,
      _isPaused: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    synthetix(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    trackingCode(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    updateSynthetixAddresses(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
