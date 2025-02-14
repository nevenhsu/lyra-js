import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "./common";
export declare namespace LiquidityPool {
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
}
export interface NewportLiquidityPoolInterface extends utils.Interface {
    functions: {
        "CBTimestamp()": FunctionFragment;
        "acceptOwnership()": FunctionFragment;
        "boardSettlement(uint256,uint256,uint256,uint256)": FunctionFragment;
        "cbParams()": FunctionFragment;
        "exchangeBase()": FunctionFragment;
        "freeCallCollateralAndSendPremium(uint256,address,uint256,uint256,uint256)": FunctionFragment;
        "freePutCollateralAndSendPremium(uint256,address,uint256,uint256,uint256)": FunctionFragment;
        "getCBParams()": FunctionFragment;
        "getLiquidity()": FunctionFragment;
        "getLpParams()": FunctionFragment;
        "getTokenPrice()": FunctionFragment;
        "getTokenPriceWithCheck()": FunctionFragment;
        "getTotalPoolValueQuote()": FunctionFragment;
        "getTotalTokenSupply()": FunctionFragment;
        "init(address,address,address,address,address,address,address,address)": FunctionFragment;
        "initiateDeposit(address,uint256)": FunctionFragment;
        "initiateWithdraw(address,uint256)": FunctionFragment;
        "insolventSettlementAmount()": FunctionFragment;
        "liquidationInsolventAmount()": FunctionFragment;
        "lockCallCollateral(uint256,uint256,uint256)": FunctionFragment;
        "lockPutCollateral(uint256,uint256)": FunctionFragment;
        "lockedCollateral()": FunctionFragment;
        "lpParams()": FunctionFragment;
        "nextQueuedDepositId()": FunctionFragment;
        "nextQueuedWithdrawalId()": FunctionFragment;
        "nominateNewOwner(address)": FunctionFragment;
        "nominatedOwner()": FunctionFragment;
        "owner()": FunctionFragment;
        "poolHedger()": FunctionFragment;
        "processDepositQueue(uint256)": FunctionFragment;
        "processWithdrawalQueue(uint256)": FunctionFragment;
        "protectedQuote()": FunctionFragment;
        "queuedDepositHead()": FunctionFragment;
        "queuedDeposits(uint256)": FunctionFragment;
        "queuedWithdrawalHead()": FunctionFragment;
        "queuedWithdrawals(uint256)": FunctionFragment;
        "quoteAsset()": FunctionFragment;
        "reclaimInsolventBase(uint256)": FunctionFragment;
        "reclaimInsolventQuote(uint256)": FunctionFragment;
        "recoverFunds(address,address)": FunctionFragment;
        "sendSettlementValue(address,uint256)": FunctionFragment;
        "sendShortPremium(address,uint256,uint256,uint256,uint256,bool)": FunctionFragment;
        "setCircuitBreakerParameters((uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256))": FunctionFragment;
        "setLiquidityPoolParameters((uint256,uint256,uint256,uint256,address,uint256,uint256,uint256,uint256))": FunctionFragment;
        "setPoolHedger(address)": FunctionFragment;
        "totalOutstandingSettlements()": FunctionFragment;
        "totalQueuedDeposits()": FunctionFragment;
        "totalQueuedWithdrawals()": FunctionFragment;
        "transferQuoteToHedge(uint256)": FunctionFragment;
        "updateCBs()": FunctionFragment;
        "updateLiquidationInsolvency(uint256)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "CBTimestamp" | "acceptOwnership" | "boardSettlement" | "cbParams" | "exchangeBase" | "freeCallCollateralAndSendPremium" | "freePutCollateralAndSendPremium" | "getCBParams" | "getLiquidity" | "getLpParams" | "getTokenPrice" | "getTokenPriceWithCheck" | "getTotalPoolValueQuote" | "getTotalTokenSupply" | "init" | "initiateDeposit" | "initiateWithdraw" | "insolventSettlementAmount" | "liquidationInsolventAmount" | "lockCallCollateral" | "lockPutCollateral" | "lockedCollateral" | "lpParams" | "nextQueuedDepositId" | "nextQueuedWithdrawalId" | "nominateNewOwner" | "nominatedOwner" | "owner" | "poolHedger" | "processDepositQueue" | "processWithdrawalQueue" | "protectedQuote" | "queuedDepositHead" | "queuedDeposits" | "queuedWithdrawalHead" | "queuedWithdrawals" | "quoteAsset" | "reclaimInsolventBase" | "reclaimInsolventQuote" | "recoverFunds" | "sendSettlementValue" | "sendShortPremium" | "setCircuitBreakerParameters" | "setLiquidityPoolParameters" | "setPoolHedger" | "totalOutstandingSettlements" | "totalQueuedDeposits" | "totalQueuedWithdrawals" | "transferQuoteToHedge" | "updateCBs" | "updateLiquidationInsolvency"): FunctionFragment;
    encodeFunctionData(functionFragment: "CBTimestamp", values?: undefined): string;
    encodeFunctionData(functionFragment: "acceptOwnership", values?: undefined): string;
    encodeFunctionData(functionFragment: "boardSettlement", values: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "cbParams", values?: undefined): string;
    encodeFunctionData(functionFragment: "exchangeBase", values?: undefined): string;
    encodeFunctionData(functionFragment: "freeCallCollateralAndSendPremium", values: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "freePutCollateralAndSendPremium", values: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "getCBParams", values?: undefined): string;
    encodeFunctionData(functionFragment: "getLiquidity", values?: undefined): string;
    encodeFunctionData(functionFragment: "getLpParams", values?: undefined): string;
    encodeFunctionData(functionFragment: "getTokenPrice", values?: undefined): string;
    encodeFunctionData(functionFragment: "getTokenPriceWithCheck", values?: undefined): string;
    encodeFunctionData(functionFragment: "getTotalPoolValueQuote", values?: undefined): string;
    encodeFunctionData(functionFragment: "getTotalTokenSupply", values?: undefined): string;
    encodeFunctionData(functionFragment: "init", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<string>
    ]): string;
    encodeFunctionData(functionFragment: "initiateDeposit", values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "initiateWithdraw", values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "insolventSettlementAmount", values?: undefined): string;
    encodeFunctionData(functionFragment: "liquidationInsolventAmount", values?: undefined): string;
    encodeFunctionData(functionFragment: "lockCallCollateral", values: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "lockPutCollateral", values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "lockedCollateral", values?: undefined): string;
    encodeFunctionData(functionFragment: "lpParams", values?: undefined): string;
    encodeFunctionData(functionFragment: "nextQueuedDepositId", values?: undefined): string;
    encodeFunctionData(functionFragment: "nextQueuedWithdrawalId", values?: undefined): string;
    encodeFunctionData(functionFragment: "nominateNewOwner", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "nominatedOwner", values?: undefined): string;
    encodeFunctionData(functionFragment: "owner", values?: undefined): string;
    encodeFunctionData(functionFragment: "poolHedger", values?: undefined): string;
    encodeFunctionData(functionFragment: "processDepositQueue", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "processWithdrawalQueue", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "protectedQuote", values?: undefined): string;
    encodeFunctionData(functionFragment: "queuedDepositHead", values?: undefined): string;
    encodeFunctionData(functionFragment: "queuedDeposits", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "queuedWithdrawalHead", values?: undefined): string;
    encodeFunctionData(functionFragment: "queuedWithdrawals", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "quoteAsset", values?: undefined): string;
    encodeFunctionData(functionFragment: "reclaimInsolventBase", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "reclaimInsolventQuote", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "recoverFunds", values: [PromiseOrValue<string>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "sendSettlementValue", values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "sendShortPremium", values: [
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<boolean>
    ]): string;
    encodeFunctionData(functionFragment: "setCircuitBreakerParameters", values: [LiquidityPool.CircuitBreakerParametersStruct]): string;
    encodeFunctionData(functionFragment: "setLiquidityPoolParameters", values: [LiquidityPool.LiquidityPoolParametersStruct]): string;
    encodeFunctionData(functionFragment: "setPoolHedger", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "totalOutstandingSettlements", values?: undefined): string;
    encodeFunctionData(functionFragment: "totalQueuedDeposits", values?: undefined): string;
    encodeFunctionData(functionFragment: "totalQueuedWithdrawals", values?: undefined): string;
    encodeFunctionData(functionFragment: "transferQuoteToHedge", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "updateCBs", values?: undefined): string;
    encodeFunctionData(functionFragment: "updateLiquidationInsolvency", values: [PromiseOrValue<BigNumberish>]): string;
    decodeFunctionResult(functionFragment: "CBTimestamp", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "acceptOwnership", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "boardSettlement", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "cbParams", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "exchangeBase", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "freeCallCollateralAndSendPremium", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "freePutCollateralAndSendPremium", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getCBParams", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getLiquidity", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getLpParams", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getTokenPrice", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getTokenPriceWithCheck", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getTotalPoolValueQuote", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getTotalTokenSupply", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "init", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "initiateDeposit", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "initiateWithdraw", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "insolventSettlementAmount", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "liquidationInsolventAmount", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "lockCallCollateral", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "lockPutCollateral", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "lockedCollateral", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "lpParams", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "nextQueuedDepositId", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "nextQueuedWithdrawalId", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "nominateNewOwner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "nominatedOwner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "poolHedger", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "processDepositQueue", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "processWithdrawalQueue", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "protectedQuote", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "queuedDepositHead", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "queuedDeposits", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "queuedWithdrawalHead", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "queuedWithdrawals", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "quoteAsset", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "reclaimInsolventBase", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "reclaimInsolventQuote", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "recoverFunds", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "sendSettlementValue", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "sendShortPremium", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setCircuitBreakerParameters", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setLiquidityPoolParameters", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setPoolHedger", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "totalOutstandingSettlements", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "totalQueuedDeposits", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "totalQueuedWithdrawals", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferQuoteToHedge", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "updateCBs", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "updateLiquidationInsolvency", data: BytesLike): Result;
    events: {
        "BasePurchased(uint256,uint256)": EventFragment;
        "BaseSold(uint256,uint256)": EventFragment;
        "BoardSettlement(uint256,uint256,uint256)": EventFragment;
        "BoardSettlementCircuitBreakerUpdated(uint256)": EventFragment;
        "CallCollateralFreed(uint256,uint256)": EventFragment;
        "CallCollateralLocked(uint256,uint256)": EventFragment;
        "CheckingCanProcess(uint256,bool,bool,bool,bool)": EventFragment;
        "CircuitBreakerParametersUpdated(tuple)": EventFragment;
        "CircuitBreakerUpdated(uint256,bool,bool,bool,bool)": EventFragment;
        "DepositProcessed(address,address,uint256,uint256,uint256,uint256,uint256)": EventFragment;
        "DepositQueued(address,address,uint256,uint256,uint256,uint256)": EventFragment;
        "InsolventSettlementAmountUpdated(uint256,uint256)": EventFragment;
        "LiquidityPoolParametersUpdated(tuple)": EventFragment;
        "OutstandingSettlementSent(address,uint256,uint256)": EventFragment;
        "OwnerChanged(address,address)": EventFragment;
        "OwnerNominated(address)": EventFragment;
        "PoolHedgerUpdated(address)": EventFragment;
        "PremiumTransferred(address,uint256,uint256)": EventFragment;
        "PutCollateralFreed(uint256,uint256)": EventFragment;
        "PutCollateralLocked(uint256,uint256)": EventFragment;
        "QuoteTransferredToPoolHedger(uint256)": EventFragment;
        "WithdrawPartiallyProcessed(address,address,uint256,uint256,uint256,uint256,uint256,uint256)": EventFragment;
        "WithdrawProcessed(address,address,uint256,uint256,uint256,uint256,uint256,uint256)": EventFragment;
        "WithdrawQueued(address,address,uint256,uint256,uint256,uint256)": EventFragment;
        "WithdrawReverted(address,address,uint256,uint256,uint256,uint256,uint256)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "BasePurchased"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "BaseSold"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "BoardSettlement"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "BoardSettlementCircuitBreakerUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "CallCollateralFreed"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "CallCollateralLocked"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "CheckingCanProcess"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "CircuitBreakerParametersUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "CircuitBreakerUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "DepositProcessed"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "DepositQueued"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "InsolventSettlementAmountUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "LiquidityPoolParametersUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "OutstandingSettlementSent"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "OwnerChanged"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "OwnerNominated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "PoolHedgerUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "PremiumTransferred"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "PutCollateralFreed"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "PutCollateralLocked"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "QuoteTransferredToPoolHedger"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "WithdrawPartiallyProcessed"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "WithdrawProcessed"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "WithdrawQueued"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "WithdrawReverted"): EventFragment;
}
export interface BasePurchasedEventObject {
    quoteSpent: BigNumber;
    baseReceived: BigNumber;
}
export type BasePurchasedEvent = TypedEvent<[
    BigNumber,
    BigNumber
], BasePurchasedEventObject>;
export type BasePurchasedEventFilter = TypedEventFilter<BasePurchasedEvent>;
export interface BaseSoldEventObject {
    amountBase: BigNumber;
    quoteReceived: BigNumber;
}
export type BaseSoldEvent = TypedEvent<[
    BigNumber,
    BigNumber
], BaseSoldEventObject>;
export type BaseSoldEventFilter = TypedEventFilter<BaseSoldEvent>;
export interface BoardSettlementEventObject {
    insolventSettlementAmount: BigNumber;
    amountQuoteReserved: BigNumber;
    totalOutstandingSettlements: BigNumber;
}
export type BoardSettlementEvent = TypedEvent<[
    BigNumber,
    BigNumber,
    BigNumber
], BoardSettlementEventObject>;
export type BoardSettlementEventFilter = TypedEventFilter<BoardSettlementEvent>;
export interface BoardSettlementCircuitBreakerUpdatedEventObject {
    newTimestamp: BigNumber;
}
export type BoardSettlementCircuitBreakerUpdatedEvent = TypedEvent<[
    BigNumber
], BoardSettlementCircuitBreakerUpdatedEventObject>;
export type BoardSettlementCircuitBreakerUpdatedEventFilter = TypedEventFilter<BoardSettlementCircuitBreakerUpdatedEvent>;
export interface CallCollateralFreedEventObject {
    baseFreed: BigNumber;
    lockedCollateralBase: BigNumber;
}
export type CallCollateralFreedEvent = TypedEvent<[
    BigNumber,
    BigNumber
], CallCollateralFreedEventObject>;
export type CallCollateralFreedEventFilter = TypedEventFilter<CallCollateralFreedEvent>;
export interface CallCollateralLockedEventObject {
    baseLocked: BigNumber;
    lockedCollateralBase: BigNumber;
}
export type CallCollateralLockedEvent = TypedEvent<[
    BigNumber,
    BigNumber
], CallCollateralLockedEventObject>;
export type CallCollateralLockedEventFilter = TypedEventFilter<CallCollateralLockedEvent>;
export interface CheckingCanProcessEventObject {
    entryId: BigNumber;
    boardNotStale: boolean;
    validEntry: boolean;
    guardianBypass: boolean;
    delaysExpired: boolean;
}
export type CheckingCanProcessEvent = TypedEvent<[
    BigNumber,
    boolean,
    boolean,
    boolean,
    boolean
], CheckingCanProcessEventObject>;
export type CheckingCanProcessEventFilter = TypedEventFilter<CheckingCanProcessEvent>;
export interface CircuitBreakerParametersUpdatedEventObject {
    cbParams: LiquidityPool.CircuitBreakerParametersStructOutput;
}
export type CircuitBreakerParametersUpdatedEvent = TypedEvent<[
    LiquidityPool.CircuitBreakerParametersStructOutput
], CircuitBreakerParametersUpdatedEventObject>;
export type CircuitBreakerParametersUpdatedEventFilter = TypedEventFilter<CircuitBreakerParametersUpdatedEvent>;
export interface CircuitBreakerUpdatedEventObject {
    newTimestamp: BigNumber;
    ivVarianceThresholdCrossed: boolean;
    skewVarianceThresholdCrossed: boolean;
    liquidityThresholdCrossed: boolean;
    contractAdjustmentEvent: boolean;
}
export type CircuitBreakerUpdatedEvent = TypedEvent<[
    BigNumber,
    boolean,
    boolean,
    boolean,
    boolean
], CircuitBreakerUpdatedEventObject>;
export type CircuitBreakerUpdatedEventFilter = TypedEventFilter<CircuitBreakerUpdatedEvent>;
export interface DepositProcessedEventObject {
    caller: string;
    beneficiary: string;
    depositQueueId: BigNumber;
    amountDeposited: BigNumber;
    tokenPrice: BigNumber;
    tokensReceived: BigNumber;
    timestamp: BigNumber;
}
export type DepositProcessedEvent = TypedEvent<[
    string,
    string,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber
], DepositProcessedEventObject>;
export type DepositProcessedEventFilter = TypedEventFilter<DepositProcessedEvent>;
export interface DepositQueuedEventObject {
    depositor: string;
    beneficiary: string;
    depositQueueId: BigNumber;
    amountDeposited: BigNumber;
    totalQueuedDeposits: BigNumber;
    timestamp: BigNumber;
}
export type DepositQueuedEvent = TypedEvent<[
    string,
    string,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber
], DepositQueuedEventObject>;
export type DepositQueuedEventFilter = TypedEventFilter<DepositQueuedEvent>;
export interface InsolventSettlementAmountUpdatedEventObject {
    amountQuoteAdded: BigNumber;
    totalInsolventSettlementAmount: BigNumber;
}
export type InsolventSettlementAmountUpdatedEvent = TypedEvent<[
    BigNumber,
    BigNumber
], InsolventSettlementAmountUpdatedEventObject>;
export type InsolventSettlementAmountUpdatedEventFilter = TypedEventFilter<InsolventSettlementAmountUpdatedEvent>;
export interface LiquidityPoolParametersUpdatedEventObject {
    lpParams: LiquidityPool.LiquidityPoolParametersStructOutput;
}
export type LiquidityPoolParametersUpdatedEvent = TypedEvent<[
    LiquidityPool.LiquidityPoolParametersStructOutput
], LiquidityPoolParametersUpdatedEventObject>;
export type LiquidityPoolParametersUpdatedEventFilter = TypedEventFilter<LiquidityPoolParametersUpdatedEvent>;
export interface OutstandingSettlementSentEventObject {
    user: string;
    amount: BigNumber;
    totalOutstandingSettlements: BigNumber;
}
export type OutstandingSettlementSentEvent = TypedEvent<[
    string,
    BigNumber,
    BigNumber
], OutstandingSettlementSentEventObject>;
export type OutstandingSettlementSentEventFilter = TypedEventFilter<OutstandingSettlementSentEvent>;
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
export interface PoolHedgerUpdatedEventObject {
    poolHedger: string;
}
export type PoolHedgerUpdatedEvent = TypedEvent<[
    string
], PoolHedgerUpdatedEventObject>;
export type PoolHedgerUpdatedEventFilter = TypedEventFilter<PoolHedgerUpdatedEvent>;
export interface PremiumTransferredEventObject {
    recipient: string;
    recipientPortion: BigNumber;
    optionMarketPortion: BigNumber;
}
export type PremiumTransferredEvent = TypedEvent<[
    string,
    BigNumber,
    BigNumber
], PremiumTransferredEventObject>;
export type PremiumTransferredEventFilter = TypedEventFilter<PremiumTransferredEvent>;
export interface PutCollateralFreedEventObject {
    quoteFreed: BigNumber;
    lockedCollateralQuote: BigNumber;
}
export type PutCollateralFreedEvent = TypedEvent<[
    BigNumber,
    BigNumber
], PutCollateralFreedEventObject>;
export type PutCollateralFreedEventFilter = TypedEventFilter<PutCollateralFreedEvent>;
export interface PutCollateralLockedEventObject {
    quoteLocked: BigNumber;
    lockedCollateralQuote: BigNumber;
}
export type PutCollateralLockedEvent = TypedEvent<[
    BigNumber,
    BigNumber
], PutCollateralLockedEventObject>;
export type PutCollateralLockedEventFilter = TypedEventFilter<PutCollateralLockedEvent>;
export interface QuoteTransferredToPoolHedgerEventObject {
    amountQuote: BigNumber;
}
export type QuoteTransferredToPoolHedgerEvent = TypedEvent<[
    BigNumber
], QuoteTransferredToPoolHedgerEventObject>;
export type QuoteTransferredToPoolHedgerEventFilter = TypedEventFilter<QuoteTransferredToPoolHedgerEvent>;
export interface WithdrawPartiallyProcessedEventObject {
    caller: string;
    beneficiary: string;
    withdrawalQueueId: BigNumber;
    amountWithdrawn: BigNumber;
    tokenPrice: BigNumber;
    quoteReceived: BigNumber;
    totalQueuedWithdrawals: BigNumber;
    timestamp: BigNumber;
}
export type WithdrawPartiallyProcessedEvent = TypedEvent<[
    string,
    string,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber
], WithdrawPartiallyProcessedEventObject>;
export type WithdrawPartiallyProcessedEventFilter = TypedEventFilter<WithdrawPartiallyProcessedEvent>;
export interface WithdrawProcessedEventObject {
    caller: string;
    beneficiary: string;
    withdrawalQueueId: BigNumber;
    amountWithdrawn: BigNumber;
    tokenPrice: BigNumber;
    quoteReceived: BigNumber;
    totalQueuedWithdrawals: BigNumber;
    timestamp: BigNumber;
}
export type WithdrawProcessedEvent = TypedEvent<[
    string,
    string,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber
], WithdrawProcessedEventObject>;
export type WithdrawProcessedEventFilter = TypedEventFilter<WithdrawProcessedEvent>;
export interface WithdrawQueuedEventObject {
    withdrawer: string;
    beneficiary: string;
    withdrawalQueueId: BigNumber;
    amountWithdrawn: BigNumber;
    totalQueuedWithdrawals: BigNumber;
    timestamp: BigNumber;
}
export type WithdrawQueuedEvent = TypedEvent<[
    string,
    string,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber
], WithdrawQueuedEventObject>;
export type WithdrawQueuedEventFilter = TypedEventFilter<WithdrawQueuedEvent>;
export interface WithdrawRevertedEventObject {
    caller: string;
    beneficiary: string;
    withdrawalQueueId: BigNumber;
    tokenPrice: BigNumber;
    totalQueuedWithdrawals: BigNumber;
    timestamp: BigNumber;
    tokensReturned: BigNumber;
}
export type WithdrawRevertedEvent = TypedEvent<[
    string,
    string,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber
], WithdrawRevertedEventObject>;
export type WithdrawRevertedEventFilter = TypedEventFilter<WithdrawRevertedEvent>;
export interface NewportLiquidityPool extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: NewportLiquidityPoolInterface;
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
        CBTimestamp(overrides?: CallOverrides): Promise<[BigNumber]>;
        acceptOwnership(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        boardSettlement(insolventSettlements: PromiseOrValue<BigNumberish>, amountQuoteFreed: PromiseOrValue<BigNumberish>, amountQuoteReserved: PromiseOrValue<BigNumberish>, amountBaseFreed: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        cbParams(overrides?: CallOverrides): Promise<[
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
        }>;
        exchangeBase(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        freeCallCollateralAndSendPremium(amountBase: PromiseOrValue<BigNumberish>, recipient: PromiseOrValue<string>, totalCost: PromiseOrValue<BigNumberish>, reservedFee: PromiseOrValue<BigNumberish>, longScaleFactor: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        freePutCollateralAndSendPremium(amountQuoteFreed: PromiseOrValue<BigNumberish>, recipient: PromiseOrValue<string>, totalCost: PromiseOrValue<BigNumberish>, reservedFee: PromiseOrValue<BigNumberish>, longScaleFactor: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        getCBParams(overrides?: CallOverrides): Promise<[LiquidityPool.CircuitBreakerParametersStructOutput]>;
        getLiquidity(overrides?: CallOverrides): Promise<[LiquidityPool.LiquidityStructOutput]>;
        getLpParams(overrides?: CallOverrides): Promise<[LiquidityPool.LiquidityPoolParametersStructOutput]>;
        getTokenPrice(overrides?: CallOverrides): Promise<[BigNumber]>;
        getTokenPriceWithCheck(overrides?: CallOverrides): Promise<[
            BigNumber,
            boolean,
            BigNumber
        ] & {
            tokenPrice: BigNumber;
            isStale: boolean;
            circuitBreakerExpiry: BigNumber;
        }>;
        getTotalPoolValueQuote(overrides?: CallOverrides): Promise<[BigNumber] & {
            totalPoolValue: BigNumber;
        }>;
        getTotalTokenSupply(overrides?: CallOverrides): Promise<[BigNumber]>;
        init(_exchangeAdapter: PromiseOrValue<string>, _optionMarket: PromiseOrValue<string>, _liquidityToken: PromiseOrValue<string>, _greekCache: PromiseOrValue<string>, _poolHedger: PromiseOrValue<string>, _shortCollateral: PromiseOrValue<string>, _quoteAsset: PromiseOrValue<string>, _baseAsset: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        initiateDeposit(beneficiary: PromiseOrValue<string>, amountQuote: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        initiateWithdraw(beneficiary: PromiseOrValue<string>, amountLiquidityToken: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        insolventSettlementAmount(overrides?: CallOverrides): Promise<[BigNumber]>;
        liquidationInsolventAmount(overrides?: CallOverrides): Promise<[BigNumber]>;
        lockCallCollateral(amount: PromiseOrValue<BigNumberish>, spotPrice: PromiseOrValue<BigNumberish>, freeLiquidity: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        lockPutCollateral(amount: PromiseOrValue<BigNumberish>, freeLiquidity: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        lockedCollateral(overrides?: CallOverrides): Promise<[BigNumber, BigNumber] & {
            quote: BigNumber;
            base: BigNumber;
        }>;
        lpParams(overrides?: CallOverrides): Promise<[
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
        }>;
        nextQueuedDepositId(overrides?: CallOverrides): Promise<[BigNumber]>;
        nextQueuedWithdrawalId(overrides?: CallOverrides): Promise<[BigNumber]>;
        nominateNewOwner(_owner: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        nominatedOwner(overrides?: CallOverrides): Promise<[string]>;
        owner(overrides?: CallOverrides): Promise<[string]>;
        poolHedger(overrides?: CallOverrides): Promise<[string]>;
        processDepositQueue(limit: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        processWithdrawalQueue(limit: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        protectedQuote(overrides?: CallOverrides): Promise<[BigNumber]>;
        queuedDepositHead(overrides?: CallOverrides): Promise<[BigNumber]>;
        queuedDeposits(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[
            BigNumber,
            string,
            BigNumber,
            BigNumber,
            BigNumber
        ] & {
            id: BigNumber;
            beneficiary: string;
            amountLiquidity: BigNumber;
            mintedTokens: BigNumber;
            depositInitiatedTime: BigNumber;
        }>;
        queuedWithdrawalHead(overrides?: CallOverrides): Promise<[BigNumber]>;
        queuedWithdrawals(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[
            BigNumber,
            string,
            BigNumber,
            BigNumber,
            BigNumber
        ] & {
            id: BigNumber;
            beneficiary: string;
            amountTokens: BigNumber;
            quoteSent: BigNumber;
            withdrawInitiatedTime: BigNumber;
        }>;
        quoteAsset(overrides?: CallOverrides): Promise<[string]>;
        reclaimInsolventBase(amountBase: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        reclaimInsolventQuote(amountQuote: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        recoverFunds(token: PromiseOrValue<string>, recipient: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        sendSettlementValue(user: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        sendShortPremium(recipient: PromiseOrValue<string>, amountContracts: PromiseOrValue<BigNumberish>, premium: PromiseOrValue<BigNumberish>, freeLiquidity: PromiseOrValue<BigNumberish>, reservedFee: PromiseOrValue<BigNumberish>, isCall: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        setCircuitBreakerParameters(_cbParams: LiquidityPool.CircuitBreakerParametersStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        setLiquidityPoolParameters(_lpParams: LiquidityPool.LiquidityPoolParametersStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        setPoolHedger(newPoolHedger: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        totalOutstandingSettlements(overrides?: CallOverrides): Promise<[BigNumber]>;
        totalQueuedDeposits(overrides?: CallOverrides): Promise<[BigNumber]>;
        totalQueuedWithdrawals(overrides?: CallOverrides): Promise<[BigNumber]>;
        transferQuoteToHedge(amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        updateCBs(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        updateLiquidationInsolvency(insolvencyAmountInQuote: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
    };
    CBTimestamp(overrides?: CallOverrides): Promise<BigNumber>;
    acceptOwnership(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    boardSettlement(insolventSettlements: PromiseOrValue<BigNumberish>, amountQuoteFreed: PromiseOrValue<BigNumberish>, amountQuoteReserved: PromiseOrValue<BigNumberish>, amountBaseFreed: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    cbParams(overrides?: CallOverrides): Promise<[
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
    }>;
    exchangeBase(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    freeCallCollateralAndSendPremium(amountBase: PromiseOrValue<BigNumberish>, recipient: PromiseOrValue<string>, totalCost: PromiseOrValue<BigNumberish>, reservedFee: PromiseOrValue<BigNumberish>, longScaleFactor: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    freePutCollateralAndSendPremium(amountQuoteFreed: PromiseOrValue<BigNumberish>, recipient: PromiseOrValue<string>, totalCost: PromiseOrValue<BigNumberish>, reservedFee: PromiseOrValue<BigNumberish>, longScaleFactor: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    getCBParams(overrides?: CallOverrides): Promise<LiquidityPool.CircuitBreakerParametersStructOutput>;
    getLiquidity(overrides?: CallOverrides): Promise<LiquidityPool.LiquidityStructOutput>;
    getLpParams(overrides?: CallOverrides): Promise<LiquidityPool.LiquidityPoolParametersStructOutput>;
    getTokenPrice(overrides?: CallOverrides): Promise<BigNumber>;
    getTokenPriceWithCheck(overrides?: CallOverrides): Promise<[
        BigNumber,
        boolean,
        BigNumber
    ] & {
        tokenPrice: BigNumber;
        isStale: boolean;
        circuitBreakerExpiry: BigNumber;
    }>;
    getTotalPoolValueQuote(overrides?: CallOverrides): Promise<BigNumber>;
    getTotalTokenSupply(overrides?: CallOverrides): Promise<BigNumber>;
    init(_exchangeAdapter: PromiseOrValue<string>, _optionMarket: PromiseOrValue<string>, _liquidityToken: PromiseOrValue<string>, _greekCache: PromiseOrValue<string>, _poolHedger: PromiseOrValue<string>, _shortCollateral: PromiseOrValue<string>, _quoteAsset: PromiseOrValue<string>, _baseAsset: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    initiateDeposit(beneficiary: PromiseOrValue<string>, amountQuote: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    initiateWithdraw(beneficiary: PromiseOrValue<string>, amountLiquidityToken: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    insolventSettlementAmount(overrides?: CallOverrides): Promise<BigNumber>;
    liquidationInsolventAmount(overrides?: CallOverrides): Promise<BigNumber>;
    lockCallCollateral(amount: PromiseOrValue<BigNumberish>, spotPrice: PromiseOrValue<BigNumberish>, freeLiquidity: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    lockPutCollateral(amount: PromiseOrValue<BigNumberish>, freeLiquidity: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    lockedCollateral(overrides?: CallOverrides): Promise<[BigNumber, BigNumber] & {
        quote: BigNumber;
        base: BigNumber;
    }>;
    lpParams(overrides?: CallOverrides): Promise<[
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
    }>;
    nextQueuedDepositId(overrides?: CallOverrides): Promise<BigNumber>;
    nextQueuedWithdrawalId(overrides?: CallOverrides): Promise<BigNumber>;
    nominateNewOwner(_owner: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    nominatedOwner(overrides?: CallOverrides): Promise<string>;
    owner(overrides?: CallOverrides): Promise<string>;
    poolHedger(overrides?: CallOverrides): Promise<string>;
    processDepositQueue(limit: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    processWithdrawalQueue(limit: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    protectedQuote(overrides?: CallOverrides): Promise<BigNumber>;
    queuedDepositHead(overrides?: CallOverrides): Promise<BigNumber>;
    queuedDeposits(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[
        BigNumber,
        string,
        BigNumber,
        BigNumber,
        BigNumber
    ] & {
        id: BigNumber;
        beneficiary: string;
        amountLiquidity: BigNumber;
        mintedTokens: BigNumber;
        depositInitiatedTime: BigNumber;
    }>;
    queuedWithdrawalHead(overrides?: CallOverrides): Promise<BigNumber>;
    queuedWithdrawals(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[
        BigNumber,
        string,
        BigNumber,
        BigNumber,
        BigNumber
    ] & {
        id: BigNumber;
        beneficiary: string;
        amountTokens: BigNumber;
        quoteSent: BigNumber;
        withdrawInitiatedTime: BigNumber;
    }>;
    quoteAsset(overrides?: CallOverrides): Promise<string>;
    reclaimInsolventBase(amountBase: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    reclaimInsolventQuote(amountQuote: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    recoverFunds(token: PromiseOrValue<string>, recipient: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    sendSettlementValue(user: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    sendShortPremium(recipient: PromiseOrValue<string>, amountContracts: PromiseOrValue<BigNumberish>, premium: PromiseOrValue<BigNumberish>, freeLiquidity: PromiseOrValue<BigNumberish>, reservedFee: PromiseOrValue<BigNumberish>, isCall: PromiseOrValue<boolean>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    setCircuitBreakerParameters(_cbParams: LiquidityPool.CircuitBreakerParametersStruct, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    setLiquidityPoolParameters(_lpParams: LiquidityPool.LiquidityPoolParametersStruct, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    setPoolHedger(newPoolHedger: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    totalOutstandingSettlements(overrides?: CallOverrides): Promise<BigNumber>;
    totalQueuedDeposits(overrides?: CallOverrides): Promise<BigNumber>;
    totalQueuedWithdrawals(overrides?: CallOverrides): Promise<BigNumber>;
    transferQuoteToHedge(amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    updateCBs(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    updateLiquidationInsolvency(insolvencyAmountInQuote: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        CBTimestamp(overrides?: CallOverrides): Promise<BigNumber>;
        acceptOwnership(overrides?: CallOverrides): Promise<void>;
        boardSettlement(insolventSettlements: PromiseOrValue<BigNumberish>, amountQuoteFreed: PromiseOrValue<BigNumberish>, amountQuoteReserved: PromiseOrValue<BigNumberish>, amountBaseFreed: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        cbParams(overrides?: CallOverrides): Promise<[
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
        }>;
        exchangeBase(overrides?: CallOverrides): Promise<void>;
        freeCallCollateralAndSendPremium(amountBase: PromiseOrValue<BigNumberish>, recipient: PromiseOrValue<string>, totalCost: PromiseOrValue<BigNumberish>, reservedFee: PromiseOrValue<BigNumberish>, longScaleFactor: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        freePutCollateralAndSendPremium(amountQuoteFreed: PromiseOrValue<BigNumberish>, recipient: PromiseOrValue<string>, totalCost: PromiseOrValue<BigNumberish>, reservedFee: PromiseOrValue<BigNumberish>, longScaleFactor: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        getCBParams(overrides?: CallOverrides): Promise<LiquidityPool.CircuitBreakerParametersStructOutput>;
        getLiquidity(overrides?: CallOverrides): Promise<LiquidityPool.LiquidityStructOutput>;
        getLpParams(overrides?: CallOverrides): Promise<LiquidityPool.LiquidityPoolParametersStructOutput>;
        getTokenPrice(overrides?: CallOverrides): Promise<BigNumber>;
        getTokenPriceWithCheck(overrides?: CallOverrides): Promise<[
            BigNumber,
            boolean,
            BigNumber
        ] & {
            tokenPrice: BigNumber;
            isStale: boolean;
            circuitBreakerExpiry: BigNumber;
        }>;
        getTotalPoolValueQuote(overrides?: CallOverrides): Promise<BigNumber>;
        getTotalTokenSupply(overrides?: CallOverrides): Promise<BigNumber>;
        init(_exchangeAdapter: PromiseOrValue<string>, _optionMarket: PromiseOrValue<string>, _liquidityToken: PromiseOrValue<string>, _greekCache: PromiseOrValue<string>, _poolHedger: PromiseOrValue<string>, _shortCollateral: PromiseOrValue<string>, _quoteAsset: PromiseOrValue<string>, _baseAsset: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        initiateDeposit(beneficiary: PromiseOrValue<string>, amountQuote: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        initiateWithdraw(beneficiary: PromiseOrValue<string>, amountLiquidityToken: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        insolventSettlementAmount(overrides?: CallOverrides): Promise<BigNumber>;
        liquidationInsolventAmount(overrides?: CallOverrides): Promise<BigNumber>;
        lockCallCollateral(amount: PromiseOrValue<BigNumberish>, spotPrice: PromiseOrValue<BigNumberish>, freeLiquidity: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        lockPutCollateral(amount: PromiseOrValue<BigNumberish>, freeLiquidity: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        lockedCollateral(overrides?: CallOverrides): Promise<[BigNumber, BigNumber] & {
            quote: BigNumber;
            base: BigNumber;
        }>;
        lpParams(overrides?: CallOverrides): Promise<[
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
        }>;
        nextQueuedDepositId(overrides?: CallOverrides): Promise<BigNumber>;
        nextQueuedWithdrawalId(overrides?: CallOverrides): Promise<BigNumber>;
        nominateNewOwner(_owner: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        nominatedOwner(overrides?: CallOverrides): Promise<string>;
        owner(overrides?: CallOverrides): Promise<string>;
        poolHedger(overrides?: CallOverrides): Promise<string>;
        processDepositQueue(limit: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        processWithdrawalQueue(limit: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        protectedQuote(overrides?: CallOverrides): Promise<BigNumber>;
        queuedDepositHead(overrides?: CallOverrides): Promise<BigNumber>;
        queuedDeposits(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[
            BigNumber,
            string,
            BigNumber,
            BigNumber,
            BigNumber
        ] & {
            id: BigNumber;
            beneficiary: string;
            amountLiquidity: BigNumber;
            mintedTokens: BigNumber;
            depositInitiatedTime: BigNumber;
        }>;
        queuedWithdrawalHead(overrides?: CallOverrides): Promise<BigNumber>;
        queuedWithdrawals(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[
            BigNumber,
            string,
            BigNumber,
            BigNumber,
            BigNumber
        ] & {
            id: BigNumber;
            beneficiary: string;
            amountTokens: BigNumber;
            quoteSent: BigNumber;
            withdrawInitiatedTime: BigNumber;
        }>;
        quoteAsset(overrides?: CallOverrides): Promise<string>;
        reclaimInsolventBase(amountBase: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        reclaimInsolventQuote(amountQuote: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        recoverFunds(token: PromiseOrValue<string>, recipient: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        sendSettlementValue(user: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        sendShortPremium(recipient: PromiseOrValue<string>, amountContracts: PromiseOrValue<BigNumberish>, premium: PromiseOrValue<BigNumberish>, freeLiquidity: PromiseOrValue<BigNumberish>, reservedFee: PromiseOrValue<BigNumberish>, isCall: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<void>;
        setCircuitBreakerParameters(_cbParams: LiquidityPool.CircuitBreakerParametersStruct, overrides?: CallOverrides): Promise<void>;
        setLiquidityPoolParameters(_lpParams: LiquidityPool.LiquidityPoolParametersStruct, overrides?: CallOverrides): Promise<void>;
        setPoolHedger(newPoolHedger: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        totalOutstandingSettlements(overrides?: CallOverrides): Promise<BigNumber>;
        totalQueuedDeposits(overrides?: CallOverrides): Promise<BigNumber>;
        totalQueuedWithdrawals(overrides?: CallOverrides): Promise<BigNumber>;
        transferQuoteToHedge(amount: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        updateCBs(overrides?: CallOverrides): Promise<void>;
        updateLiquidationInsolvency(insolvencyAmountInQuote: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
    };
    filters: {
        "BasePurchased(uint256,uint256)"(quoteSpent?: null, baseReceived?: null): BasePurchasedEventFilter;
        BasePurchased(quoteSpent?: null, baseReceived?: null): BasePurchasedEventFilter;
        "BaseSold(uint256,uint256)"(amountBase?: null, quoteReceived?: null): BaseSoldEventFilter;
        BaseSold(amountBase?: null, quoteReceived?: null): BaseSoldEventFilter;
        "BoardSettlement(uint256,uint256,uint256)"(insolventSettlementAmount?: null, amountQuoteReserved?: null, totalOutstandingSettlements?: null): BoardSettlementEventFilter;
        BoardSettlement(insolventSettlementAmount?: null, amountQuoteReserved?: null, totalOutstandingSettlements?: null): BoardSettlementEventFilter;
        "BoardSettlementCircuitBreakerUpdated(uint256)"(newTimestamp?: null): BoardSettlementCircuitBreakerUpdatedEventFilter;
        BoardSettlementCircuitBreakerUpdated(newTimestamp?: null): BoardSettlementCircuitBreakerUpdatedEventFilter;
        "CallCollateralFreed(uint256,uint256)"(baseFreed?: null, lockedCollateralBase?: null): CallCollateralFreedEventFilter;
        CallCollateralFreed(baseFreed?: null, lockedCollateralBase?: null): CallCollateralFreedEventFilter;
        "CallCollateralLocked(uint256,uint256)"(baseLocked?: null, lockedCollateralBase?: null): CallCollateralLockedEventFilter;
        CallCollateralLocked(baseLocked?: null, lockedCollateralBase?: null): CallCollateralLockedEventFilter;
        "CheckingCanProcess(uint256,bool,bool,bool,bool)"(entryId?: null, boardNotStale?: null, validEntry?: null, guardianBypass?: null, delaysExpired?: null): CheckingCanProcessEventFilter;
        CheckingCanProcess(entryId?: null, boardNotStale?: null, validEntry?: null, guardianBypass?: null, delaysExpired?: null): CheckingCanProcessEventFilter;
        "CircuitBreakerParametersUpdated(tuple)"(cbParams?: null): CircuitBreakerParametersUpdatedEventFilter;
        CircuitBreakerParametersUpdated(cbParams?: null): CircuitBreakerParametersUpdatedEventFilter;
        "CircuitBreakerUpdated(uint256,bool,bool,bool,bool)"(newTimestamp?: null, ivVarianceThresholdCrossed?: null, skewVarianceThresholdCrossed?: null, liquidityThresholdCrossed?: null, contractAdjustmentEvent?: null): CircuitBreakerUpdatedEventFilter;
        CircuitBreakerUpdated(newTimestamp?: null, ivVarianceThresholdCrossed?: null, skewVarianceThresholdCrossed?: null, liquidityThresholdCrossed?: null, contractAdjustmentEvent?: null): CircuitBreakerUpdatedEventFilter;
        "DepositProcessed(address,address,uint256,uint256,uint256,uint256,uint256)"(caller?: PromiseOrValue<string> | null, beneficiary?: PromiseOrValue<string> | null, depositQueueId?: PromiseOrValue<BigNumberish> | null, amountDeposited?: null, tokenPrice?: null, tokensReceived?: null, timestamp?: null): DepositProcessedEventFilter;
        DepositProcessed(caller?: PromiseOrValue<string> | null, beneficiary?: PromiseOrValue<string> | null, depositQueueId?: PromiseOrValue<BigNumberish> | null, amountDeposited?: null, tokenPrice?: null, tokensReceived?: null, timestamp?: null): DepositProcessedEventFilter;
        "DepositQueued(address,address,uint256,uint256,uint256,uint256)"(depositor?: PromiseOrValue<string> | null, beneficiary?: PromiseOrValue<string> | null, depositQueueId?: PromiseOrValue<BigNumberish> | null, amountDeposited?: null, totalQueuedDeposits?: null, timestamp?: null): DepositQueuedEventFilter;
        DepositQueued(depositor?: PromiseOrValue<string> | null, beneficiary?: PromiseOrValue<string> | null, depositQueueId?: PromiseOrValue<BigNumberish> | null, amountDeposited?: null, totalQueuedDeposits?: null, timestamp?: null): DepositQueuedEventFilter;
        "InsolventSettlementAmountUpdated(uint256,uint256)"(amountQuoteAdded?: null, totalInsolventSettlementAmount?: null): InsolventSettlementAmountUpdatedEventFilter;
        InsolventSettlementAmountUpdated(amountQuoteAdded?: null, totalInsolventSettlementAmount?: null): InsolventSettlementAmountUpdatedEventFilter;
        "LiquidityPoolParametersUpdated(tuple)"(lpParams?: null): LiquidityPoolParametersUpdatedEventFilter;
        LiquidityPoolParametersUpdated(lpParams?: null): LiquidityPoolParametersUpdatedEventFilter;
        "OutstandingSettlementSent(address,uint256,uint256)"(user?: PromiseOrValue<string> | null, amount?: null, totalOutstandingSettlements?: null): OutstandingSettlementSentEventFilter;
        OutstandingSettlementSent(user?: PromiseOrValue<string> | null, amount?: null, totalOutstandingSettlements?: null): OutstandingSettlementSentEventFilter;
        "OwnerChanged(address,address)"(oldOwner?: null, newOwner?: null): OwnerChangedEventFilter;
        OwnerChanged(oldOwner?: null, newOwner?: null): OwnerChangedEventFilter;
        "OwnerNominated(address)"(newOwner?: null): OwnerNominatedEventFilter;
        OwnerNominated(newOwner?: null): OwnerNominatedEventFilter;
        "PoolHedgerUpdated(address)"(poolHedger?: null): PoolHedgerUpdatedEventFilter;
        PoolHedgerUpdated(poolHedger?: null): PoolHedgerUpdatedEventFilter;
        "PremiumTransferred(address,uint256,uint256)"(recipient?: PromiseOrValue<string> | null, recipientPortion?: null, optionMarketPortion?: null): PremiumTransferredEventFilter;
        PremiumTransferred(recipient?: PromiseOrValue<string> | null, recipientPortion?: null, optionMarketPortion?: null): PremiumTransferredEventFilter;
        "PutCollateralFreed(uint256,uint256)"(quoteFreed?: null, lockedCollateralQuote?: null): PutCollateralFreedEventFilter;
        PutCollateralFreed(quoteFreed?: null, lockedCollateralQuote?: null): PutCollateralFreedEventFilter;
        "PutCollateralLocked(uint256,uint256)"(quoteLocked?: null, lockedCollateralQuote?: null): PutCollateralLockedEventFilter;
        PutCollateralLocked(quoteLocked?: null, lockedCollateralQuote?: null): PutCollateralLockedEventFilter;
        "QuoteTransferredToPoolHedger(uint256)"(amountQuote?: null): QuoteTransferredToPoolHedgerEventFilter;
        QuoteTransferredToPoolHedger(amountQuote?: null): QuoteTransferredToPoolHedgerEventFilter;
        "WithdrawPartiallyProcessed(address,address,uint256,uint256,uint256,uint256,uint256,uint256)"(caller?: PromiseOrValue<string> | null, beneficiary?: PromiseOrValue<string> | null, withdrawalQueueId?: PromiseOrValue<BigNumberish> | null, amountWithdrawn?: null, tokenPrice?: null, quoteReceived?: null, totalQueuedWithdrawals?: null, timestamp?: null): WithdrawPartiallyProcessedEventFilter;
        WithdrawPartiallyProcessed(caller?: PromiseOrValue<string> | null, beneficiary?: PromiseOrValue<string> | null, withdrawalQueueId?: PromiseOrValue<BigNumberish> | null, amountWithdrawn?: null, tokenPrice?: null, quoteReceived?: null, totalQueuedWithdrawals?: null, timestamp?: null): WithdrawPartiallyProcessedEventFilter;
        "WithdrawProcessed(address,address,uint256,uint256,uint256,uint256,uint256,uint256)"(caller?: PromiseOrValue<string> | null, beneficiary?: PromiseOrValue<string> | null, withdrawalQueueId?: PromiseOrValue<BigNumberish> | null, amountWithdrawn?: null, tokenPrice?: null, quoteReceived?: null, totalQueuedWithdrawals?: null, timestamp?: null): WithdrawProcessedEventFilter;
        WithdrawProcessed(caller?: PromiseOrValue<string> | null, beneficiary?: PromiseOrValue<string> | null, withdrawalQueueId?: PromiseOrValue<BigNumberish> | null, amountWithdrawn?: null, tokenPrice?: null, quoteReceived?: null, totalQueuedWithdrawals?: null, timestamp?: null): WithdrawProcessedEventFilter;
        "WithdrawQueued(address,address,uint256,uint256,uint256,uint256)"(withdrawer?: PromiseOrValue<string> | null, beneficiary?: PromiseOrValue<string> | null, withdrawalQueueId?: PromiseOrValue<BigNumberish> | null, amountWithdrawn?: null, totalQueuedWithdrawals?: null, timestamp?: null): WithdrawQueuedEventFilter;
        WithdrawQueued(withdrawer?: PromiseOrValue<string> | null, beneficiary?: PromiseOrValue<string> | null, withdrawalQueueId?: PromiseOrValue<BigNumberish> | null, amountWithdrawn?: null, totalQueuedWithdrawals?: null, timestamp?: null): WithdrawQueuedEventFilter;
        "WithdrawReverted(address,address,uint256,uint256,uint256,uint256,uint256)"(caller?: PromiseOrValue<string> | null, beneficiary?: PromiseOrValue<string> | null, withdrawalQueueId?: PromiseOrValue<BigNumberish> | null, tokenPrice?: null, totalQueuedWithdrawals?: null, timestamp?: null, tokensReturned?: null): WithdrawRevertedEventFilter;
        WithdrawReverted(caller?: PromiseOrValue<string> | null, beneficiary?: PromiseOrValue<string> | null, withdrawalQueueId?: PromiseOrValue<BigNumberish> | null, tokenPrice?: null, totalQueuedWithdrawals?: null, timestamp?: null, tokensReturned?: null): WithdrawRevertedEventFilter;
    };
    estimateGas: {
        CBTimestamp(overrides?: CallOverrides): Promise<BigNumber>;
        acceptOwnership(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        boardSettlement(insolventSettlements: PromiseOrValue<BigNumberish>, amountQuoteFreed: PromiseOrValue<BigNumberish>, amountQuoteReserved: PromiseOrValue<BigNumberish>, amountBaseFreed: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        cbParams(overrides?: CallOverrides): Promise<BigNumber>;
        exchangeBase(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        freeCallCollateralAndSendPremium(amountBase: PromiseOrValue<BigNumberish>, recipient: PromiseOrValue<string>, totalCost: PromiseOrValue<BigNumberish>, reservedFee: PromiseOrValue<BigNumberish>, longScaleFactor: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        freePutCollateralAndSendPremium(amountQuoteFreed: PromiseOrValue<BigNumberish>, recipient: PromiseOrValue<string>, totalCost: PromiseOrValue<BigNumberish>, reservedFee: PromiseOrValue<BigNumberish>, longScaleFactor: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        getCBParams(overrides?: CallOverrides): Promise<BigNumber>;
        getLiquidity(overrides?: CallOverrides): Promise<BigNumber>;
        getLpParams(overrides?: CallOverrides): Promise<BigNumber>;
        getTokenPrice(overrides?: CallOverrides): Promise<BigNumber>;
        getTokenPriceWithCheck(overrides?: CallOverrides): Promise<BigNumber>;
        getTotalPoolValueQuote(overrides?: CallOverrides): Promise<BigNumber>;
        getTotalTokenSupply(overrides?: CallOverrides): Promise<BigNumber>;
        init(_exchangeAdapter: PromiseOrValue<string>, _optionMarket: PromiseOrValue<string>, _liquidityToken: PromiseOrValue<string>, _greekCache: PromiseOrValue<string>, _poolHedger: PromiseOrValue<string>, _shortCollateral: PromiseOrValue<string>, _quoteAsset: PromiseOrValue<string>, _baseAsset: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        initiateDeposit(beneficiary: PromiseOrValue<string>, amountQuote: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        initiateWithdraw(beneficiary: PromiseOrValue<string>, amountLiquidityToken: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        insolventSettlementAmount(overrides?: CallOverrides): Promise<BigNumber>;
        liquidationInsolventAmount(overrides?: CallOverrides): Promise<BigNumber>;
        lockCallCollateral(amount: PromiseOrValue<BigNumberish>, spotPrice: PromiseOrValue<BigNumberish>, freeLiquidity: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        lockPutCollateral(amount: PromiseOrValue<BigNumberish>, freeLiquidity: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        lockedCollateral(overrides?: CallOverrides): Promise<BigNumber>;
        lpParams(overrides?: CallOverrides): Promise<BigNumber>;
        nextQueuedDepositId(overrides?: CallOverrides): Promise<BigNumber>;
        nextQueuedWithdrawalId(overrides?: CallOverrides): Promise<BigNumber>;
        nominateNewOwner(_owner: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        nominatedOwner(overrides?: CallOverrides): Promise<BigNumber>;
        owner(overrides?: CallOverrides): Promise<BigNumber>;
        poolHedger(overrides?: CallOverrides): Promise<BigNumber>;
        processDepositQueue(limit: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        processWithdrawalQueue(limit: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        protectedQuote(overrides?: CallOverrides): Promise<BigNumber>;
        queuedDepositHead(overrides?: CallOverrides): Promise<BigNumber>;
        queuedDeposits(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        queuedWithdrawalHead(overrides?: CallOverrides): Promise<BigNumber>;
        queuedWithdrawals(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        quoteAsset(overrides?: CallOverrides): Promise<BigNumber>;
        reclaimInsolventBase(amountBase: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        reclaimInsolventQuote(amountQuote: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        recoverFunds(token: PromiseOrValue<string>, recipient: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        sendSettlementValue(user: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        sendShortPremium(recipient: PromiseOrValue<string>, amountContracts: PromiseOrValue<BigNumberish>, premium: PromiseOrValue<BigNumberish>, freeLiquidity: PromiseOrValue<BigNumberish>, reservedFee: PromiseOrValue<BigNumberish>, isCall: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        setCircuitBreakerParameters(_cbParams: LiquidityPool.CircuitBreakerParametersStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        setLiquidityPoolParameters(_lpParams: LiquidityPool.LiquidityPoolParametersStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        setPoolHedger(newPoolHedger: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        totalOutstandingSettlements(overrides?: CallOverrides): Promise<BigNumber>;
        totalQueuedDeposits(overrides?: CallOverrides): Promise<BigNumber>;
        totalQueuedWithdrawals(overrides?: CallOverrides): Promise<BigNumber>;
        transferQuoteToHedge(amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        updateCBs(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        updateLiquidationInsolvency(insolvencyAmountInQuote: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        CBTimestamp(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        acceptOwnership(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        boardSettlement(insolventSettlements: PromiseOrValue<BigNumberish>, amountQuoteFreed: PromiseOrValue<BigNumberish>, amountQuoteReserved: PromiseOrValue<BigNumberish>, amountBaseFreed: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        cbParams(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        exchangeBase(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        freeCallCollateralAndSendPremium(amountBase: PromiseOrValue<BigNumberish>, recipient: PromiseOrValue<string>, totalCost: PromiseOrValue<BigNumberish>, reservedFee: PromiseOrValue<BigNumberish>, longScaleFactor: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        freePutCollateralAndSendPremium(amountQuoteFreed: PromiseOrValue<BigNumberish>, recipient: PromiseOrValue<string>, totalCost: PromiseOrValue<BigNumberish>, reservedFee: PromiseOrValue<BigNumberish>, longScaleFactor: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        getCBParams(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getLiquidity(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getLpParams(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getTokenPrice(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getTokenPriceWithCheck(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getTotalPoolValueQuote(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getTotalTokenSupply(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        init(_exchangeAdapter: PromiseOrValue<string>, _optionMarket: PromiseOrValue<string>, _liquidityToken: PromiseOrValue<string>, _greekCache: PromiseOrValue<string>, _poolHedger: PromiseOrValue<string>, _shortCollateral: PromiseOrValue<string>, _quoteAsset: PromiseOrValue<string>, _baseAsset: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        initiateDeposit(beneficiary: PromiseOrValue<string>, amountQuote: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        initiateWithdraw(beneficiary: PromiseOrValue<string>, amountLiquidityToken: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        insolventSettlementAmount(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        liquidationInsolventAmount(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        lockCallCollateral(amount: PromiseOrValue<BigNumberish>, spotPrice: PromiseOrValue<BigNumberish>, freeLiquidity: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        lockPutCollateral(amount: PromiseOrValue<BigNumberish>, freeLiquidity: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        lockedCollateral(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        lpParams(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        nextQueuedDepositId(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        nextQueuedWithdrawalId(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        nominateNewOwner(_owner: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        nominatedOwner(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        poolHedger(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        processDepositQueue(limit: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        processWithdrawalQueue(limit: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        protectedQuote(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        queuedDepositHead(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        queuedDeposits(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        queuedWithdrawalHead(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        queuedWithdrawals(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        quoteAsset(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        reclaimInsolventBase(amountBase: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        reclaimInsolventQuote(amountQuote: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        recoverFunds(token: PromiseOrValue<string>, recipient: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        sendSettlementValue(user: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        sendShortPremium(recipient: PromiseOrValue<string>, amountContracts: PromiseOrValue<BigNumberish>, premium: PromiseOrValue<BigNumberish>, freeLiquidity: PromiseOrValue<BigNumberish>, reservedFee: PromiseOrValue<BigNumberish>, isCall: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        setCircuitBreakerParameters(_cbParams: LiquidityPool.CircuitBreakerParametersStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        setLiquidityPoolParameters(_lpParams: LiquidityPool.LiquidityPoolParametersStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        setPoolHedger(newPoolHedger: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        totalOutstandingSettlements(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        totalQueuedDeposits(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        totalQueuedWithdrawals(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        transferQuoteToHedge(amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        updateCBs(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        updateLiquidationInsolvency(insolvencyAmountInQuote: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
    };
}
