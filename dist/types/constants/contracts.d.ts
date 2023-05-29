export declare enum LyraContractId {
    OptionMarketViewer = "OptionMarketViewer",
    LyraRegistry = "LyraRegistry",
    ExchangeAdapter = "ExchangeAdapter",
    TestFaucet = "TestFaucet"
}
export declare enum LyraGlobalContractId {
    MultiDistributor = "MultiDistributor",
    Multicall3 = "Multicall3"
}
export declare enum LyraMarketContractId {
    OptionMarket = "OptionMarket",
    OptionMarketPricer = "OptionMarketPricer",
    OptionToken = "OptionToken",
    ShortCollateral = "ShortCollateral",
    OptionGreekCache = "OptionGreekCache",
    LiquidityToken = "LiquidityToken",
    LiquidityPool = "LiquidityPool",
    PoolHedger = "PoolHedger"
}
export declare enum OptionType {
    LongCall = 0,
    LongPut = 1,
    ShortCoveredCall = 2,
    ShortCall = 3,
    ShortPut = 4
}
export declare enum Deployment {
    Testnet = "testnet",
    Mainnet = "mainnet"
}
export declare const DEFAULT_ITERATIONS = 1;
export declare const DEFAULT_PREMIUM_SLIPPAGE: number;
export declare const DEFAULT_SWAP_SLIPPAGE: number;
export declare const CURVE_POOL_FEE_RATE: number;
export declare enum EventName {
    Trade = "Trade",
    PositionUpdated = "PositionUpdated",
    Transfer = "Transfer"
}
export declare enum PositionState {
    Empty = 0,
    Active = 1,
    Closed = 2,
    Liquidated = 3,
    Settled = 4,
    Merged = 5
}
export declare enum PositionUpdatedType {
    Opened = 0,
    Adjusted = 1,
    Closed = 2,
    SplitFrom = 3,
    SplitInto = 4,
    Merged = 5,
    MergedInto = 6,
    Settled = 7,
    Liquidated = 8,
    Transfer = 9
}
export declare enum TradeDirection {
    Open = 0,
    Close = 1,
    Liquidate = 2
}
export declare enum DataSource {
    ContractCall = "ContractCall",
    Log = "Log",
    Subgraph = "Subgraph"
}
export declare const POSITION_UPDATED_TYPES: PositionUpdatedType[];
export declare const LYRA_ETHEREUM_MAINNET_ADDRESS = "0x01BA67AAC7f75f647D94220Cc98FB30FCc5105Bf";
export declare const OP_OPTIMISM_MAINNET_ADDRESS = "0x4200000000000000000000000000000000000042";
export declare const LYRA_ETHEREUM_KOVAN_ADDRESS = "0xC9801013F0c45F836Ad07Dded1df9C475d2844FC";
export declare const VAULTS_UTILIZATION_THRESHOLD = 0.99;
