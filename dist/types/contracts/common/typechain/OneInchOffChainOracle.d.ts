import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "./common";
export interface OneInchOffChainOracleInterface extends utils.Interface {
    functions: {
        "addConnector(address)": FunctionFragment;
        "addOracle(address,uint8)": FunctionFragment;
        "connectors()": FunctionFragment;
        "getRate(address,address,bool)": FunctionFragment;
        "getRateToEth(address,bool)": FunctionFragment;
        "multiWrapper()": FunctionFragment;
        "oracles()": FunctionFragment;
        "owner()": FunctionFragment;
        "removeConnector(address)": FunctionFragment;
        "removeOracle(address,uint8)": FunctionFragment;
        "renounceOwnership()": FunctionFragment;
        "setMultiWrapper(address)": FunctionFragment;
        "transferOwnership(address)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "addConnector" | "addOracle" | "connectors" | "getRate" | "getRateToEth" | "multiWrapper" | "oracles" | "owner" | "removeConnector" | "removeOracle" | "renounceOwnership" | "setMultiWrapper" | "transferOwnership"): FunctionFragment;
    encodeFunctionData(functionFragment: "addConnector", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "addOracle", values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "connectors", values?: undefined): string;
    encodeFunctionData(functionFragment: "getRate", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<boolean>
    ]): string;
    encodeFunctionData(functionFragment: "getRateToEth", values: [PromiseOrValue<string>, PromiseOrValue<boolean>]): string;
    encodeFunctionData(functionFragment: "multiWrapper", values?: undefined): string;
    encodeFunctionData(functionFragment: "oracles", values?: undefined): string;
    encodeFunctionData(functionFragment: "owner", values?: undefined): string;
    encodeFunctionData(functionFragment: "removeConnector", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "removeOracle", values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "renounceOwnership", values?: undefined): string;
    encodeFunctionData(functionFragment: "setMultiWrapper", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "transferOwnership", values: [PromiseOrValue<string>]): string;
    decodeFunctionResult(functionFragment: "addConnector", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "addOracle", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "connectors", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getRate", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getRateToEth", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "multiWrapper", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "oracles", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "removeConnector", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "removeOracle", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "renounceOwnership", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setMultiWrapper", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferOwnership", data: BytesLike): Result;
    events: {
        "ConnectorAdded(address)": EventFragment;
        "ConnectorRemoved(address)": EventFragment;
        "MultiWrapperUpdated(address)": EventFragment;
        "OracleAdded(address,uint8)": EventFragment;
        "OracleRemoved(address,uint8)": EventFragment;
        "OwnershipTransferred(address,address)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "ConnectorAdded"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ConnectorRemoved"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "MultiWrapperUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "OracleAdded"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "OracleRemoved"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
}
export interface ConnectorAddedEventObject {
    connector: string;
}
export type ConnectorAddedEvent = TypedEvent<[
    string
], ConnectorAddedEventObject>;
export type ConnectorAddedEventFilter = TypedEventFilter<ConnectorAddedEvent>;
export interface ConnectorRemovedEventObject {
    connector: string;
}
export type ConnectorRemovedEvent = TypedEvent<[
    string
], ConnectorRemovedEventObject>;
export type ConnectorRemovedEventFilter = TypedEventFilter<ConnectorRemovedEvent>;
export interface MultiWrapperUpdatedEventObject {
    multiWrapper: string;
}
export type MultiWrapperUpdatedEvent = TypedEvent<[
    string
], MultiWrapperUpdatedEventObject>;
export type MultiWrapperUpdatedEventFilter = TypedEventFilter<MultiWrapperUpdatedEvent>;
export interface OracleAddedEventObject {
    oracle: string;
    oracleType: number;
}
export type OracleAddedEvent = TypedEvent<[
    string,
    number
], OracleAddedEventObject>;
export type OracleAddedEventFilter = TypedEventFilter<OracleAddedEvent>;
export interface OracleRemovedEventObject {
    oracle: string;
    oracleType: number;
}
export type OracleRemovedEvent = TypedEvent<[
    string,
    number
], OracleRemovedEventObject>;
export type OracleRemovedEventFilter = TypedEventFilter<OracleRemovedEvent>;
export interface OwnershipTransferredEventObject {
    previousOwner: string;
    newOwner: string;
}
export type OwnershipTransferredEvent = TypedEvent<[
    string,
    string
], OwnershipTransferredEventObject>;
export type OwnershipTransferredEventFilter = TypedEventFilter<OwnershipTransferredEvent>;
export interface OneInchOffChainOracle extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: OneInchOffChainOracleInterface;
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
        addConnector(connector: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        addOracle(oracle: PromiseOrValue<string>, oracleKind: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        connectors(overrides?: CallOverrides): Promise<[string[]] & {
            allConnectors: string[];
        }>;
        getRate(srcToken: PromiseOrValue<string>, dstToken: PromiseOrValue<string>, useWrappers: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<[BigNumber] & {
            weightedRate: BigNumber;
        }>;
        getRateToEth(srcToken: PromiseOrValue<string>, useSrcWrappers: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<[BigNumber] & {
            weightedRate: BigNumber;
        }>;
        multiWrapper(overrides?: CallOverrides): Promise<[string]>;
        oracles(overrides?: CallOverrides): Promise<[
            string[],
            number[]
        ] & {
            allOracles: string[];
            oracleTypes: number[];
        }>;
        owner(overrides?: CallOverrides): Promise<[string]>;
        removeConnector(connector: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        removeOracle(oracle: PromiseOrValue<string>, oracleKind: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        renounceOwnership(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        setMultiWrapper(_multiWrapper: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        transferOwnership(newOwner: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
    };
    addConnector(connector: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    addOracle(oracle: PromiseOrValue<string>, oracleKind: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    connectors(overrides?: CallOverrides): Promise<string[]>;
    getRate(srcToken: PromiseOrValue<string>, dstToken: PromiseOrValue<string>, useWrappers: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<BigNumber>;
    getRateToEth(srcToken: PromiseOrValue<string>, useSrcWrappers: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<BigNumber>;
    multiWrapper(overrides?: CallOverrides): Promise<string>;
    oracles(overrides?: CallOverrides): Promise<[
        string[],
        number[]
    ] & {
        allOracles: string[];
        oracleTypes: number[];
    }>;
    owner(overrides?: CallOverrides): Promise<string>;
    removeConnector(connector: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    removeOracle(oracle: PromiseOrValue<string>, oracleKind: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    renounceOwnership(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    setMultiWrapper(_multiWrapper: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    transferOwnership(newOwner: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        addConnector(connector: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        addOracle(oracle: PromiseOrValue<string>, oracleKind: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        connectors(overrides?: CallOverrides): Promise<string[]>;
        getRate(srcToken: PromiseOrValue<string>, dstToken: PromiseOrValue<string>, useWrappers: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<BigNumber>;
        getRateToEth(srcToken: PromiseOrValue<string>, useSrcWrappers: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<BigNumber>;
        multiWrapper(overrides?: CallOverrides): Promise<string>;
        oracles(overrides?: CallOverrides): Promise<[
            string[],
            number[]
        ] & {
            allOracles: string[];
            oracleTypes: number[];
        }>;
        owner(overrides?: CallOverrides): Promise<string>;
        removeConnector(connector: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        removeOracle(oracle: PromiseOrValue<string>, oracleKind: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        renounceOwnership(overrides?: CallOverrides): Promise<void>;
        setMultiWrapper(_multiWrapper: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        transferOwnership(newOwner: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
    };
    filters: {
        "ConnectorAdded(address)"(connector?: null): ConnectorAddedEventFilter;
        ConnectorAdded(connector?: null): ConnectorAddedEventFilter;
        "ConnectorRemoved(address)"(connector?: null): ConnectorRemovedEventFilter;
        ConnectorRemoved(connector?: null): ConnectorRemovedEventFilter;
        "MultiWrapperUpdated(address)"(multiWrapper?: null): MultiWrapperUpdatedEventFilter;
        MultiWrapperUpdated(multiWrapper?: null): MultiWrapperUpdatedEventFilter;
        "OracleAdded(address,uint8)"(oracle?: null, oracleType?: null): OracleAddedEventFilter;
        OracleAdded(oracle?: null, oracleType?: null): OracleAddedEventFilter;
        "OracleRemoved(address,uint8)"(oracle?: null, oracleType?: null): OracleRemovedEventFilter;
        OracleRemoved(oracle?: null, oracleType?: null): OracleRemovedEventFilter;
        "OwnershipTransferred(address,address)"(previousOwner?: PromiseOrValue<string> | null, newOwner?: PromiseOrValue<string> | null): OwnershipTransferredEventFilter;
        OwnershipTransferred(previousOwner?: PromiseOrValue<string> | null, newOwner?: PromiseOrValue<string> | null): OwnershipTransferredEventFilter;
    };
    estimateGas: {
        addConnector(connector: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        addOracle(oracle: PromiseOrValue<string>, oracleKind: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        connectors(overrides?: CallOverrides): Promise<BigNumber>;
        getRate(srcToken: PromiseOrValue<string>, dstToken: PromiseOrValue<string>, useWrappers: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<BigNumber>;
        getRateToEth(srcToken: PromiseOrValue<string>, useSrcWrappers: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<BigNumber>;
        multiWrapper(overrides?: CallOverrides): Promise<BigNumber>;
        oracles(overrides?: CallOverrides): Promise<BigNumber>;
        owner(overrides?: CallOverrides): Promise<BigNumber>;
        removeConnector(connector: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        removeOracle(oracle: PromiseOrValue<string>, oracleKind: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        renounceOwnership(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        setMultiWrapper(_multiWrapper: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        transferOwnership(newOwner: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        addConnector(connector: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        addOracle(oracle: PromiseOrValue<string>, oracleKind: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        connectors(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getRate(srcToken: PromiseOrValue<string>, dstToken: PromiseOrValue<string>, useWrappers: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getRateToEth(srcToken: PromiseOrValue<string>, useSrcWrappers: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        multiWrapper(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        oracles(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        removeConnector(connector: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        removeOracle(oracle: PromiseOrValue<string>, oracleKind: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        renounceOwnership(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        setMultiWrapper(_multiWrapper: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        transferOwnership(newOwner: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
    };
}
