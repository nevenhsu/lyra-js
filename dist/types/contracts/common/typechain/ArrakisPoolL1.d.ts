import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "./common";
export interface ArrakisPoolL1Interface extends utils.Interface {
    functions: {
        "GELATO()": FunctionFragment;
        "RESTRICTED_MINT_ENABLED()": FunctionFragment;
        "allowance(address,address)": FunctionFragment;
        "approve(address,uint256)": FunctionFragment;
        "arrakisBalance0()": FunctionFragment;
        "arrakisBalance1()": FunctionFragment;
        "arrakisFeeBPS()": FunctionFragment;
        "arrakisTreasury()": FunctionFragment;
        "balanceOf(address)": FunctionFragment;
        "burn(uint256,address)": FunctionFragment;
        "decimals()": FunctionFragment;
        "decreaseAllowance(address,uint256)": FunctionFragment;
        "executiveRebalance(int24,int24,uint160,uint256,bool)": FunctionFragment;
        "gelatoRebalanceBPS()": FunctionFragment;
        "gelatoSlippageBPS()": FunctionFragment;
        "gelatoSlippageInterval()": FunctionFragment;
        "getMintAmounts(uint256,uint256)": FunctionFragment;
        "getPositionID()": FunctionFragment;
        "getUnderlyingBalances()": FunctionFragment;
        "getUnderlyingBalancesAtPrice(uint160)": FunctionFragment;
        "increaseAllowance(address,uint256)": FunctionFragment;
        "initialize(string,string,address,uint16,int24,int24,address)": FunctionFragment;
        "lowerTick()": FunctionFragment;
        "manager()": FunctionFragment;
        "managerBalance0()": FunctionFragment;
        "managerBalance1()": FunctionFragment;
        "managerFeeBPS()": FunctionFragment;
        "managerTreasury()": FunctionFragment;
        "mint(uint256,address)": FunctionFragment;
        "name()": FunctionFragment;
        "pool()": FunctionFragment;
        "rebalance(uint160,uint256,bool,uint256,address)": FunctionFragment;
        "renounceOwnership()": FunctionFragment;
        "restrictedMintToggle()": FunctionFragment;
        "symbol()": FunctionFragment;
        "toggleRestrictMint()": FunctionFragment;
        "token0()": FunctionFragment;
        "token1()": FunctionFragment;
        "totalSupply()": FunctionFragment;
        "transfer(address,uint256)": FunctionFragment;
        "transferFrom(address,address,uint256)": FunctionFragment;
        "transferOwnership(address)": FunctionFragment;
        "uniswapV3MintCallback(uint256,uint256,bytes)": FunctionFragment;
        "uniswapV3SwapCallback(int256,int256,bytes)": FunctionFragment;
        "updateManagerParams(int16,address,int16,int16,int32)": FunctionFragment;
        "upperTick()": FunctionFragment;
        "version()": FunctionFragment;
        "withdrawArrakisBalance()": FunctionFragment;
        "withdrawManagerBalance()": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "GELATO" | "RESTRICTED_MINT_ENABLED" | "allowance" | "approve" | "arrakisBalance0" | "arrakisBalance1" | "arrakisFeeBPS" | "arrakisTreasury" | "balanceOf" | "burn" | "decimals" | "decreaseAllowance" | "executiveRebalance" | "gelatoRebalanceBPS" | "gelatoSlippageBPS" | "gelatoSlippageInterval" | "getMintAmounts" | "getPositionID" | "getUnderlyingBalances" | "getUnderlyingBalancesAtPrice" | "increaseAllowance" | "initialize" | "lowerTick" | "manager" | "managerBalance0" | "managerBalance1" | "managerFeeBPS" | "managerTreasury" | "mint" | "name" | "pool" | "rebalance" | "renounceOwnership" | "restrictedMintToggle" | "symbol" | "toggleRestrictMint" | "token0" | "token1" | "totalSupply" | "transfer" | "transferFrom" | "transferOwnership" | "uniswapV3MintCallback" | "uniswapV3SwapCallback" | "updateManagerParams" | "upperTick" | "version" | "withdrawArrakisBalance" | "withdrawManagerBalance"): FunctionFragment;
    encodeFunctionData(functionFragment: "GELATO", values?: undefined): string;
    encodeFunctionData(functionFragment: "RESTRICTED_MINT_ENABLED", values?: undefined): string;
    encodeFunctionData(functionFragment: "allowance", values: [PromiseOrValue<string>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "approve", values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "arrakisBalance0", values?: undefined): string;
    encodeFunctionData(functionFragment: "arrakisBalance1", values?: undefined): string;
    encodeFunctionData(functionFragment: "arrakisFeeBPS", values?: undefined): string;
    encodeFunctionData(functionFragment: "arrakisTreasury", values?: undefined): string;
    encodeFunctionData(functionFragment: "balanceOf", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "burn", values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "decimals", values?: undefined): string;
    encodeFunctionData(functionFragment: "decreaseAllowance", values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "executiveRebalance", values: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<boolean>
    ]): string;
    encodeFunctionData(functionFragment: "gelatoRebalanceBPS", values?: undefined): string;
    encodeFunctionData(functionFragment: "gelatoSlippageBPS", values?: undefined): string;
    encodeFunctionData(functionFragment: "gelatoSlippageInterval", values?: undefined): string;
    encodeFunctionData(functionFragment: "getMintAmounts", values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "getPositionID", values?: undefined): string;
    encodeFunctionData(functionFragment: "getUnderlyingBalances", values?: undefined): string;
    encodeFunctionData(functionFragment: "getUnderlyingBalancesAtPrice", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "increaseAllowance", values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "initialize", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<string>
    ]): string;
    encodeFunctionData(functionFragment: "lowerTick", values?: undefined): string;
    encodeFunctionData(functionFragment: "manager", values?: undefined): string;
    encodeFunctionData(functionFragment: "managerBalance0", values?: undefined): string;
    encodeFunctionData(functionFragment: "managerBalance1", values?: undefined): string;
    encodeFunctionData(functionFragment: "managerFeeBPS", values?: undefined): string;
    encodeFunctionData(functionFragment: "managerTreasury", values?: undefined): string;
    encodeFunctionData(functionFragment: "mint", values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "name", values?: undefined): string;
    encodeFunctionData(functionFragment: "pool", values?: undefined): string;
    encodeFunctionData(functionFragment: "rebalance", values: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<boolean>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<string>
    ]): string;
    encodeFunctionData(functionFragment: "renounceOwnership", values?: undefined): string;
    encodeFunctionData(functionFragment: "restrictedMintToggle", values?: undefined): string;
    encodeFunctionData(functionFragment: "symbol", values?: undefined): string;
    encodeFunctionData(functionFragment: "toggleRestrictMint", values?: undefined): string;
    encodeFunctionData(functionFragment: "token0", values?: undefined): string;
    encodeFunctionData(functionFragment: "token1", values?: undefined): string;
    encodeFunctionData(functionFragment: "totalSupply", values?: undefined): string;
    encodeFunctionData(functionFragment: "transfer", values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "transferFrom", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "transferOwnership", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "uniswapV3MintCallback", values: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BytesLike>
    ]): string;
    encodeFunctionData(functionFragment: "uniswapV3SwapCallback", values: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BytesLike>
    ]): string;
    encodeFunctionData(functionFragment: "updateManagerParams", values: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "upperTick", values?: undefined): string;
    encodeFunctionData(functionFragment: "version", values?: undefined): string;
    encodeFunctionData(functionFragment: "withdrawArrakisBalance", values?: undefined): string;
    encodeFunctionData(functionFragment: "withdrawManagerBalance", values?: undefined): string;
    decodeFunctionResult(functionFragment: "GELATO", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "RESTRICTED_MINT_ENABLED", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "allowance", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "approve", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "arrakisBalance0", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "arrakisBalance1", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "arrakisFeeBPS", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "arrakisTreasury", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "burn", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "decimals", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "decreaseAllowance", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "executiveRebalance", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "gelatoRebalanceBPS", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "gelatoSlippageBPS", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "gelatoSlippageInterval", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getMintAmounts", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getPositionID", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getUnderlyingBalances", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getUnderlyingBalancesAtPrice", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "increaseAllowance", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "lowerTick", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "manager", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "managerBalance0", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "managerBalance1", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "managerFeeBPS", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "managerTreasury", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "mint", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "pool", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "rebalance", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "renounceOwnership", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "restrictedMintToggle", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "symbol", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "toggleRestrictMint", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "token0", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "token1", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "totalSupply", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transfer", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferFrom", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferOwnership", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "uniswapV3MintCallback", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "uniswapV3SwapCallback", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "updateManagerParams", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "upperTick", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "version", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "withdrawArrakisBalance", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "withdrawManagerBalance", data: BytesLike): Result;
    events: {
        "Approval(address,address,uint256)": EventFragment;
        "Burned(address,uint256,uint256,uint256,uint128)": EventFragment;
        "FeesEarned(uint256,uint256)": EventFragment;
        "Minted(address,uint256,uint256,uint256,uint128)": EventFragment;
        "OwnershipTransferred(address,address)": EventFragment;
        "Rebalance(int24,int24,uint128,uint128)": EventFragment;
        "Transfer(address,address,uint256)": EventFragment;
        "UpdateManagerParams(uint16,address,uint16,uint16,uint32)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "Approval"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "Burned"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "FeesEarned"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "Minted"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "Rebalance"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "Transfer"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "UpdateManagerParams"): EventFragment;
}
export interface ApprovalEventObject {
    owner: string;
    spender: string;
    value: BigNumber;
}
export type ApprovalEvent = TypedEvent<[
    string,
    string,
    BigNumber
], ApprovalEventObject>;
export type ApprovalEventFilter = TypedEventFilter<ApprovalEvent>;
export interface BurnedEventObject {
    receiver: string;
    burnAmount: BigNumber;
    amount0Out: BigNumber;
    amount1Out: BigNumber;
    liquidityBurned: BigNumber;
}
export type BurnedEvent = TypedEvent<[
    string,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber
], BurnedEventObject>;
export type BurnedEventFilter = TypedEventFilter<BurnedEvent>;
export interface FeesEarnedEventObject {
    feesEarned0: BigNumber;
    feesEarned1: BigNumber;
}
export type FeesEarnedEvent = TypedEvent<[
    BigNumber,
    BigNumber
], FeesEarnedEventObject>;
export type FeesEarnedEventFilter = TypedEventFilter<FeesEarnedEvent>;
export interface MintedEventObject {
    receiver: string;
    mintAmount: BigNumber;
    amount0In: BigNumber;
    amount1In: BigNumber;
    liquidityMinted: BigNumber;
}
export type MintedEvent = TypedEvent<[
    string,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber
], MintedEventObject>;
export type MintedEventFilter = TypedEventFilter<MintedEvent>;
export interface OwnershipTransferredEventObject {
    previousManager: string;
    newManager: string;
}
export type OwnershipTransferredEvent = TypedEvent<[
    string,
    string
], OwnershipTransferredEventObject>;
export type OwnershipTransferredEventFilter = TypedEventFilter<OwnershipTransferredEvent>;
export interface RebalanceEventObject {
    lowerTick_: number;
    upperTick_: number;
    liquidityBefore: BigNumber;
    liquidityAfter: BigNumber;
}
export type RebalanceEvent = TypedEvent<[
    number,
    number,
    BigNumber,
    BigNumber
], RebalanceEventObject>;
export type RebalanceEventFilter = TypedEventFilter<RebalanceEvent>;
export interface TransferEventObject {
    from: string;
    to: string;
    value: BigNumber;
}
export type TransferEvent = TypedEvent<[
    string,
    string,
    BigNumber
], TransferEventObject>;
export type TransferEventFilter = TypedEventFilter<TransferEvent>;
export interface UpdateManagerParamsEventObject {
    managerFeeBPS: number;
    managerTreasury: string;
    gelatoRebalanceBPS: number;
    gelatoSlippageBPS: number;
    gelatoSlippageInterval: number;
}
export type UpdateManagerParamsEvent = TypedEvent<[
    number,
    string,
    number,
    number,
    number
], UpdateManagerParamsEventObject>;
export type UpdateManagerParamsEventFilter = TypedEventFilter<UpdateManagerParamsEvent>;
export interface ArrakisPoolL1 extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: ArrakisPoolL1Interface;
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
        GELATO(overrides?: CallOverrides): Promise<[string]>;
        RESTRICTED_MINT_ENABLED(overrides?: CallOverrides): Promise<[number]>;
        allowance(owner: PromiseOrValue<string>, spender: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[BigNumber]>;
        approve(spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        arrakisBalance0(overrides?: CallOverrides): Promise<[BigNumber]>;
        arrakisBalance1(overrides?: CallOverrides): Promise<[BigNumber]>;
        arrakisFeeBPS(overrides?: CallOverrides): Promise<[number]>;
        arrakisTreasury(overrides?: CallOverrides): Promise<[string]>;
        balanceOf(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[BigNumber]>;
        burn(burnAmount: PromiseOrValue<BigNumberish>, receiver: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        decimals(overrides?: CallOverrides): Promise<[number]>;
        decreaseAllowance(spender: PromiseOrValue<string>, subtractedValue: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        executiveRebalance(newLowerTick: PromiseOrValue<BigNumberish>, newUpperTick: PromiseOrValue<BigNumberish>, swapThresholdPrice: PromiseOrValue<BigNumberish>, swapAmountBPS: PromiseOrValue<BigNumberish>, zeroForOne: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        gelatoRebalanceBPS(overrides?: CallOverrides): Promise<[number]>;
        gelatoSlippageBPS(overrides?: CallOverrides): Promise<[number]>;
        gelatoSlippageInterval(overrides?: CallOverrides): Promise<[number]>;
        getMintAmounts(amount0Max: PromiseOrValue<BigNumberish>, amount1Max: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[
            BigNumber,
            BigNumber,
            BigNumber
        ] & {
            amount0: BigNumber;
            amount1: BigNumber;
            mintAmount: BigNumber;
        }>;
        getPositionID(overrides?: CallOverrides): Promise<[string] & {
            positionID: string;
        }>;
        getUnderlyingBalances(overrides?: CallOverrides): Promise<[
            BigNumber,
            BigNumber
        ] & {
            amount0Current: BigNumber;
            amount1Current: BigNumber;
        }>;
        getUnderlyingBalancesAtPrice(sqrtRatioX96: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[
            BigNumber,
            BigNumber
        ] & {
            amount0Current: BigNumber;
            amount1Current: BigNumber;
        }>;
        increaseAllowance(spender: PromiseOrValue<string>, addedValue: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        initialize(_name: PromiseOrValue<string>, _symbol: PromiseOrValue<string>, _pool: PromiseOrValue<string>, _managerFeeBPS: PromiseOrValue<BigNumberish>, _lowerTick: PromiseOrValue<BigNumberish>, _upperTick: PromiseOrValue<BigNumberish>, _manager_: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        lowerTick(overrides?: CallOverrides): Promise<[number]>;
        manager(overrides?: CallOverrides): Promise<[string]>;
        managerBalance0(overrides?: CallOverrides): Promise<[BigNumber]>;
        managerBalance1(overrides?: CallOverrides): Promise<[BigNumber]>;
        managerFeeBPS(overrides?: CallOverrides): Promise<[number]>;
        managerTreasury(overrides?: CallOverrides): Promise<[string]>;
        mint(mintAmount: PromiseOrValue<BigNumberish>, receiver: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        name(overrides?: CallOverrides): Promise<[string]>;
        pool(overrides?: CallOverrides): Promise<[string]>;
        rebalance(swapThresholdPrice: PromiseOrValue<BigNumberish>, swapAmountBPS: PromiseOrValue<BigNumberish>, zeroForOne: PromiseOrValue<boolean>, feeAmount: PromiseOrValue<BigNumberish>, paymentToken: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        renounceOwnership(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        restrictedMintToggle(overrides?: CallOverrides): Promise<[number]>;
        symbol(overrides?: CallOverrides): Promise<[string]>;
        toggleRestrictMint(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        token0(overrides?: CallOverrides): Promise<[string]>;
        token1(overrides?: CallOverrides): Promise<[string]>;
        totalSupply(overrides?: CallOverrides): Promise<[BigNumber]>;
        transfer(recipient: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        transferFrom(sender: PromiseOrValue<string>, recipient: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        transferOwnership(newOwner: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        uniswapV3MintCallback(amount0Owed: PromiseOrValue<BigNumberish>, amount1Owed: PromiseOrValue<BigNumberish>, arg2: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        uniswapV3SwapCallback(amount0Delta: PromiseOrValue<BigNumberish>, amount1Delta: PromiseOrValue<BigNumberish>, arg2: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        updateManagerParams(newManagerFeeBPS: PromiseOrValue<BigNumberish>, newManagerTreasury: PromiseOrValue<string>, newRebalanceBPS: PromiseOrValue<BigNumberish>, newSlippageBPS: PromiseOrValue<BigNumberish>, newSlippageInterval: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        upperTick(overrides?: CallOverrides): Promise<[number]>;
        version(overrides?: CallOverrides): Promise<[string]>;
        withdrawArrakisBalance(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        withdrawManagerBalance(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
    };
    GELATO(overrides?: CallOverrides): Promise<string>;
    RESTRICTED_MINT_ENABLED(overrides?: CallOverrides): Promise<number>;
    allowance(owner: PromiseOrValue<string>, spender: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
    approve(spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    arrakisBalance0(overrides?: CallOverrides): Promise<BigNumber>;
    arrakisBalance1(overrides?: CallOverrides): Promise<BigNumber>;
    arrakisFeeBPS(overrides?: CallOverrides): Promise<number>;
    arrakisTreasury(overrides?: CallOverrides): Promise<string>;
    balanceOf(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
    burn(burnAmount: PromiseOrValue<BigNumberish>, receiver: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    decimals(overrides?: CallOverrides): Promise<number>;
    decreaseAllowance(spender: PromiseOrValue<string>, subtractedValue: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    executiveRebalance(newLowerTick: PromiseOrValue<BigNumberish>, newUpperTick: PromiseOrValue<BigNumberish>, swapThresholdPrice: PromiseOrValue<BigNumberish>, swapAmountBPS: PromiseOrValue<BigNumberish>, zeroForOne: PromiseOrValue<boolean>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    gelatoRebalanceBPS(overrides?: CallOverrides): Promise<number>;
    gelatoSlippageBPS(overrides?: CallOverrides): Promise<number>;
    gelatoSlippageInterval(overrides?: CallOverrides): Promise<number>;
    getMintAmounts(amount0Max: PromiseOrValue<BigNumberish>, amount1Max: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[
        BigNumber,
        BigNumber,
        BigNumber
    ] & {
        amount0: BigNumber;
        amount1: BigNumber;
        mintAmount: BigNumber;
    }>;
    getPositionID(overrides?: CallOverrides): Promise<string>;
    getUnderlyingBalances(overrides?: CallOverrides): Promise<[
        BigNumber,
        BigNumber
    ] & {
        amount0Current: BigNumber;
        amount1Current: BigNumber;
    }>;
    getUnderlyingBalancesAtPrice(sqrtRatioX96: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[
        BigNumber,
        BigNumber
    ] & {
        amount0Current: BigNumber;
        amount1Current: BigNumber;
    }>;
    increaseAllowance(spender: PromiseOrValue<string>, addedValue: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    initialize(_name: PromiseOrValue<string>, _symbol: PromiseOrValue<string>, _pool: PromiseOrValue<string>, _managerFeeBPS: PromiseOrValue<BigNumberish>, _lowerTick: PromiseOrValue<BigNumberish>, _upperTick: PromiseOrValue<BigNumberish>, _manager_: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    lowerTick(overrides?: CallOverrides): Promise<number>;
    manager(overrides?: CallOverrides): Promise<string>;
    managerBalance0(overrides?: CallOverrides): Promise<BigNumber>;
    managerBalance1(overrides?: CallOverrides): Promise<BigNumber>;
    managerFeeBPS(overrides?: CallOverrides): Promise<number>;
    managerTreasury(overrides?: CallOverrides): Promise<string>;
    mint(mintAmount: PromiseOrValue<BigNumberish>, receiver: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    name(overrides?: CallOverrides): Promise<string>;
    pool(overrides?: CallOverrides): Promise<string>;
    rebalance(swapThresholdPrice: PromiseOrValue<BigNumberish>, swapAmountBPS: PromiseOrValue<BigNumberish>, zeroForOne: PromiseOrValue<boolean>, feeAmount: PromiseOrValue<BigNumberish>, paymentToken: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    renounceOwnership(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    restrictedMintToggle(overrides?: CallOverrides): Promise<number>;
    symbol(overrides?: CallOverrides): Promise<string>;
    toggleRestrictMint(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    token0(overrides?: CallOverrides): Promise<string>;
    token1(overrides?: CallOverrides): Promise<string>;
    totalSupply(overrides?: CallOverrides): Promise<BigNumber>;
    transfer(recipient: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    transferFrom(sender: PromiseOrValue<string>, recipient: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    transferOwnership(newOwner: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    uniswapV3MintCallback(amount0Owed: PromiseOrValue<BigNumberish>, amount1Owed: PromiseOrValue<BigNumberish>, arg2: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    uniswapV3SwapCallback(amount0Delta: PromiseOrValue<BigNumberish>, amount1Delta: PromiseOrValue<BigNumberish>, arg2: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    updateManagerParams(newManagerFeeBPS: PromiseOrValue<BigNumberish>, newManagerTreasury: PromiseOrValue<string>, newRebalanceBPS: PromiseOrValue<BigNumberish>, newSlippageBPS: PromiseOrValue<BigNumberish>, newSlippageInterval: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    upperTick(overrides?: CallOverrides): Promise<number>;
    version(overrides?: CallOverrides): Promise<string>;
    withdrawArrakisBalance(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    withdrawManagerBalance(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        GELATO(overrides?: CallOverrides): Promise<string>;
        RESTRICTED_MINT_ENABLED(overrides?: CallOverrides): Promise<number>;
        allowance(owner: PromiseOrValue<string>, spender: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        approve(spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
        arrakisBalance0(overrides?: CallOverrides): Promise<BigNumber>;
        arrakisBalance1(overrides?: CallOverrides): Promise<BigNumber>;
        arrakisFeeBPS(overrides?: CallOverrides): Promise<number>;
        arrakisTreasury(overrides?: CallOverrides): Promise<string>;
        balanceOf(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        burn(burnAmount: PromiseOrValue<BigNumberish>, receiver: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[
            BigNumber,
            BigNumber,
            BigNumber
        ] & {
            amount0: BigNumber;
            amount1: BigNumber;
            liquidityBurned: BigNumber;
        }>;
        decimals(overrides?: CallOverrides): Promise<number>;
        decreaseAllowance(spender: PromiseOrValue<string>, subtractedValue: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
        executiveRebalance(newLowerTick: PromiseOrValue<BigNumberish>, newUpperTick: PromiseOrValue<BigNumberish>, swapThresholdPrice: PromiseOrValue<BigNumberish>, swapAmountBPS: PromiseOrValue<BigNumberish>, zeroForOne: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<void>;
        gelatoRebalanceBPS(overrides?: CallOverrides): Promise<number>;
        gelatoSlippageBPS(overrides?: CallOverrides): Promise<number>;
        gelatoSlippageInterval(overrides?: CallOverrides): Promise<number>;
        getMintAmounts(amount0Max: PromiseOrValue<BigNumberish>, amount1Max: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[
            BigNumber,
            BigNumber,
            BigNumber
        ] & {
            amount0: BigNumber;
            amount1: BigNumber;
            mintAmount: BigNumber;
        }>;
        getPositionID(overrides?: CallOverrides): Promise<string>;
        getUnderlyingBalances(overrides?: CallOverrides): Promise<[
            BigNumber,
            BigNumber
        ] & {
            amount0Current: BigNumber;
            amount1Current: BigNumber;
        }>;
        getUnderlyingBalancesAtPrice(sqrtRatioX96: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[
            BigNumber,
            BigNumber
        ] & {
            amount0Current: BigNumber;
            amount1Current: BigNumber;
        }>;
        increaseAllowance(spender: PromiseOrValue<string>, addedValue: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
        initialize(_name: PromiseOrValue<string>, _symbol: PromiseOrValue<string>, _pool: PromiseOrValue<string>, _managerFeeBPS: PromiseOrValue<BigNumberish>, _lowerTick: PromiseOrValue<BigNumberish>, _upperTick: PromiseOrValue<BigNumberish>, _manager_: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        lowerTick(overrides?: CallOverrides): Promise<number>;
        manager(overrides?: CallOverrides): Promise<string>;
        managerBalance0(overrides?: CallOverrides): Promise<BigNumber>;
        managerBalance1(overrides?: CallOverrides): Promise<BigNumber>;
        managerFeeBPS(overrides?: CallOverrides): Promise<number>;
        managerTreasury(overrides?: CallOverrides): Promise<string>;
        mint(mintAmount: PromiseOrValue<BigNumberish>, receiver: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[
            BigNumber,
            BigNumber,
            BigNumber
        ] & {
            amount0: BigNumber;
            amount1: BigNumber;
            liquidityMinted: BigNumber;
        }>;
        name(overrides?: CallOverrides): Promise<string>;
        pool(overrides?: CallOverrides): Promise<string>;
        rebalance(swapThresholdPrice: PromiseOrValue<BigNumberish>, swapAmountBPS: PromiseOrValue<BigNumberish>, zeroForOne: PromiseOrValue<boolean>, feeAmount: PromiseOrValue<BigNumberish>, paymentToken: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        renounceOwnership(overrides?: CallOverrides): Promise<void>;
        restrictedMintToggle(overrides?: CallOverrides): Promise<number>;
        symbol(overrides?: CallOverrides): Promise<string>;
        toggleRestrictMint(overrides?: CallOverrides): Promise<void>;
        token0(overrides?: CallOverrides): Promise<string>;
        token1(overrides?: CallOverrides): Promise<string>;
        totalSupply(overrides?: CallOverrides): Promise<BigNumber>;
        transfer(recipient: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
        transferFrom(sender: PromiseOrValue<string>, recipient: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
        transferOwnership(newOwner: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        uniswapV3MintCallback(amount0Owed: PromiseOrValue<BigNumberish>, amount1Owed: PromiseOrValue<BigNumberish>, arg2: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<void>;
        uniswapV3SwapCallback(amount0Delta: PromiseOrValue<BigNumberish>, amount1Delta: PromiseOrValue<BigNumberish>, arg2: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<void>;
        updateManagerParams(newManagerFeeBPS: PromiseOrValue<BigNumberish>, newManagerTreasury: PromiseOrValue<string>, newRebalanceBPS: PromiseOrValue<BigNumberish>, newSlippageBPS: PromiseOrValue<BigNumberish>, newSlippageInterval: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        upperTick(overrides?: CallOverrides): Promise<number>;
        version(overrides?: CallOverrides): Promise<string>;
        withdrawArrakisBalance(overrides?: CallOverrides): Promise<void>;
        withdrawManagerBalance(overrides?: CallOverrides): Promise<void>;
    };
    filters: {
        "Approval(address,address,uint256)"(owner?: PromiseOrValue<string> | null, spender?: PromiseOrValue<string> | null, value?: null): ApprovalEventFilter;
        Approval(owner?: PromiseOrValue<string> | null, spender?: PromiseOrValue<string> | null, value?: null): ApprovalEventFilter;
        "Burned(address,uint256,uint256,uint256,uint128)"(receiver?: null, burnAmount?: null, amount0Out?: null, amount1Out?: null, liquidityBurned?: null): BurnedEventFilter;
        Burned(receiver?: null, burnAmount?: null, amount0Out?: null, amount1Out?: null, liquidityBurned?: null): BurnedEventFilter;
        "FeesEarned(uint256,uint256)"(feesEarned0?: null, feesEarned1?: null): FeesEarnedEventFilter;
        FeesEarned(feesEarned0?: null, feesEarned1?: null): FeesEarnedEventFilter;
        "Minted(address,uint256,uint256,uint256,uint128)"(receiver?: null, mintAmount?: null, amount0In?: null, amount1In?: null, liquidityMinted?: null): MintedEventFilter;
        Minted(receiver?: null, mintAmount?: null, amount0In?: null, amount1In?: null, liquidityMinted?: null): MintedEventFilter;
        "OwnershipTransferred(address,address)"(previousManager?: PromiseOrValue<string> | null, newManager?: PromiseOrValue<string> | null): OwnershipTransferredEventFilter;
        OwnershipTransferred(previousManager?: PromiseOrValue<string> | null, newManager?: PromiseOrValue<string> | null): OwnershipTransferredEventFilter;
        "Rebalance(int24,int24,uint128,uint128)"(lowerTick_?: null, upperTick_?: null, liquidityBefore?: null, liquidityAfter?: null): RebalanceEventFilter;
        Rebalance(lowerTick_?: null, upperTick_?: null, liquidityBefore?: null, liquidityAfter?: null): RebalanceEventFilter;
        "Transfer(address,address,uint256)"(from?: PromiseOrValue<string> | null, to?: PromiseOrValue<string> | null, value?: null): TransferEventFilter;
        Transfer(from?: PromiseOrValue<string> | null, to?: PromiseOrValue<string> | null, value?: null): TransferEventFilter;
        "UpdateManagerParams(uint16,address,uint16,uint16,uint32)"(managerFeeBPS?: null, managerTreasury?: null, gelatoRebalanceBPS?: null, gelatoSlippageBPS?: null, gelatoSlippageInterval?: null): UpdateManagerParamsEventFilter;
        UpdateManagerParams(managerFeeBPS?: null, managerTreasury?: null, gelatoRebalanceBPS?: null, gelatoSlippageBPS?: null, gelatoSlippageInterval?: null): UpdateManagerParamsEventFilter;
    };
    estimateGas: {
        GELATO(overrides?: CallOverrides): Promise<BigNumber>;
        RESTRICTED_MINT_ENABLED(overrides?: CallOverrides): Promise<BigNumber>;
        allowance(owner: PromiseOrValue<string>, spender: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        approve(spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        arrakisBalance0(overrides?: CallOverrides): Promise<BigNumber>;
        arrakisBalance1(overrides?: CallOverrides): Promise<BigNumber>;
        arrakisFeeBPS(overrides?: CallOverrides): Promise<BigNumber>;
        arrakisTreasury(overrides?: CallOverrides): Promise<BigNumber>;
        balanceOf(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        burn(burnAmount: PromiseOrValue<BigNumberish>, receiver: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        decimals(overrides?: CallOverrides): Promise<BigNumber>;
        decreaseAllowance(spender: PromiseOrValue<string>, subtractedValue: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        executiveRebalance(newLowerTick: PromiseOrValue<BigNumberish>, newUpperTick: PromiseOrValue<BigNumberish>, swapThresholdPrice: PromiseOrValue<BigNumberish>, swapAmountBPS: PromiseOrValue<BigNumberish>, zeroForOne: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        gelatoRebalanceBPS(overrides?: CallOverrides): Promise<BigNumber>;
        gelatoSlippageBPS(overrides?: CallOverrides): Promise<BigNumber>;
        gelatoSlippageInterval(overrides?: CallOverrides): Promise<BigNumber>;
        getMintAmounts(amount0Max: PromiseOrValue<BigNumberish>, amount1Max: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        getPositionID(overrides?: CallOverrides): Promise<BigNumber>;
        getUnderlyingBalances(overrides?: CallOverrides): Promise<BigNumber>;
        getUnderlyingBalancesAtPrice(sqrtRatioX96: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        increaseAllowance(spender: PromiseOrValue<string>, addedValue: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        initialize(_name: PromiseOrValue<string>, _symbol: PromiseOrValue<string>, _pool: PromiseOrValue<string>, _managerFeeBPS: PromiseOrValue<BigNumberish>, _lowerTick: PromiseOrValue<BigNumberish>, _upperTick: PromiseOrValue<BigNumberish>, _manager_: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        lowerTick(overrides?: CallOverrides): Promise<BigNumber>;
        manager(overrides?: CallOverrides): Promise<BigNumber>;
        managerBalance0(overrides?: CallOverrides): Promise<BigNumber>;
        managerBalance1(overrides?: CallOverrides): Promise<BigNumber>;
        managerFeeBPS(overrides?: CallOverrides): Promise<BigNumber>;
        managerTreasury(overrides?: CallOverrides): Promise<BigNumber>;
        mint(mintAmount: PromiseOrValue<BigNumberish>, receiver: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        name(overrides?: CallOverrides): Promise<BigNumber>;
        pool(overrides?: CallOverrides): Promise<BigNumber>;
        rebalance(swapThresholdPrice: PromiseOrValue<BigNumberish>, swapAmountBPS: PromiseOrValue<BigNumberish>, zeroForOne: PromiseOrValue<boolean>, feeAmount: PromiseOrValue<BigNumberish>, paymentToken: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        renounceOwnership(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        restrictedMintToggle(overrides?: CallOverrides): Promise<BigNumber>;
        symbol(overrides?: CallOverrides): Promise<BigNumber>;
        toggleRestrictMint(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        token0(overrides?: CallOverrides): Promise<BigNumber>;
        token1(overrides?: CallOverrides): Promise<BigNumber>;
        totalSupply(overrides?: CallOverrides): Promise<BigNumber>;
        transfer(recipient: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        transferFrom(sender: PromiseOrValue<string>, recipient: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        transferOwnership(newOwner: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        uniswapV3MintCallback(amount0Owed: PromiseOrValue<BigNumberish>, amount1Owed: PromiseOrValue<BigNumberish>, arg2: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        uniswapV3SwapCallback(amount0Delta: PromiseOrValue<BigNumberish>, amount1Delta: PromiseOrValue<BigNumberish>, arg2: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        updateManagerParams(newManagerFeeBPS: PromiseOrValue<BigNumberish>, newManagerTreasury: PromiseOrValue<string>, newRebalanceBPS: PromiseOrValue<BigNumberish>, newSlippageBPS: PromiseOrValue<BigNumberish>, newSlippageInterval: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        upperTick(overrides?: CallOverrides): Promise<BigNumber>;
        version(overrides?: CallOverrides): Promise<BigNumber>;
        withdrawArrakisBalance(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        withdrawManagerBalance(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        GELATO(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        RESTRICTED_MINT_ENABLED(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        allowance(owner: PromiseOrValue<string>, spender: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        approve(spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        arrakisBalance0(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        arrakisBalance1(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        arrakisFeeBPS(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        arrakisTreasury(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        balanceOf(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        burn(burnAmount: PromiseOrValue<BigNumberish>, receiver: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        decimals(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        decreaseAllowance(spender: PromiseOrValue<string>, subtractedValue: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        executiveRebalance(newLowerTick: PromiseOrValue<BigNumberish>, newUpperTick: PromiseOrValue<BigNumberish>, swapThresholdPrice: PromiseOrValue<BigNumberish>, swapAmountBPS: PromiseOrValue<BigNumberish>, zeroForOne: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        gelatoRebalanceBPS(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        gelatoSlippageBPS(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        gelatoSlippageInterval(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getMintAmounts(amount0Max: PromiseOrValue<BigNumberish>, amount1Max: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getPositionID(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getUnderlyingBalances(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getUnderlyingBalancesAtPrice(sqrtRatioX96: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        increaseAllowance(spender: PromiseOrValue<string>, addedValue: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        initialize(_name: PromiseOrValue<string>, _symbol: PromiseOrValue<string>, _pool: PromiseOrValue<string>, _managerFeeBPS: PromiseOrValue<BigNumberish>, _lowerTick: PromiseOrValue<BigNumberish>, _upperTick: PromiseOrValue<BigNumberish>, _manager_: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        lowerTick(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        manager(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        managerBalance0(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        managerBalance1(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        managerFeeBPS(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        managerTreasury(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        mint(mintAmount: PromiseOrValue<BigNumberish>, receiver: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        name(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        pool(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        rebalance(swapThresholdPrice: PromiseOrValue<BigNumberish>, swapAmountBPS: PromiseOrValue<BigNumberish>, zeroForOne: PromiseOrValue<boolean>, feeAmount: PromiseOrValue<BigNumberish>, paymentToken: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        renounceOwnership(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        restrictedMintToggle(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        symbol(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        toggleRestrictMint(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        token0(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        token1(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        totalSupply(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        transfer(recipient: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        transferFrom(sender: PromiseOrValue<string>, recipient: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        transferOwnership(newOwner: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        uniswapV3MintCallback(amount0Owed: PromiseOrValue<BigNumberish>, amount1Owed: PromiseOrValue<BigNumberish>, arg2: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        uniswapV3SwapCallback(amount0Delta: PromiseOrValue<BigNumberish>, amount1Delta: PromiseOrValue<BigNumberish>, arg2: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        updateManagerParams(newManagerFeeBPS: PromiseOrValue<BigNumberish>, newManagerTreasury: PromiseOrValue<string>, newRebalanceBPS: PromiseOrValue<BigNumberish>, newSlippageBPS: PromiseOrValue<BigNumberish>, newSlippageInterval: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        upperTick(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        version(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        withdrawArrakisBalance(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        withdrawManagerBalance(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
    };
}
