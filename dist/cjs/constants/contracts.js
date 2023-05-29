"use strict";
// NOTE: Do not import typechain types in this file
// Contract name mappings
Object.defineProperty(exports, "__esModule", { value: true });
exports.VAULTS_UTILIZATION_THRESHOLD = exports.LYRA_ETHEREUM_KOVAN_ADDRESS = exports.OP_OPTIMISM_MAINNET_ADDRESS = exports.LYRA_ETHEREUM_MAINNET_ADDRESS = exports.POSITION_UPDATED_TYPES = exports.DataSource = exports.TradeDirection = exports.PositionUpdatedType = exports.PositionState = exports.EventName = exports.CURVE_POOL_FEE_RATE = exports.DEFAULT_SWAP_SLIPPAGE = exports.DEFAULT_PREMIUM_SLIPPAGE = exports.DEFAULT_ITERATIONS = exports.Deployment = exports.OptionType = exports.LyraMarketContractId = exports.LyraGlobalContractId = exports.LyraContractId = void 0;
var LyraContractId;
(function (LyraContractId) {
    LyraContractId["OptionMarketViewer"] = "OptionMarketViewer";
    LyraContractId["LyraRegistry"] = "LyraRegistry";
    LyraContractId["ExchangeAdapter"] = "ExchangeAdapter";
    LyraContractId["TestFaucet"] = "TestFaucet";
})(LyraContractId = exports.LyraContractId || (exports.LyraContractId = {}));
var LyraGlobalContractId;
(function (LyraGlobalContractId) {
    LyraGlobalContractId["MultiDistributor"] = "MultiDistributor";
    LyraGlobalContractId["Multicall3"] = "Multicall3";
})(LyraGlobalContractId = exports.LyraGlobalContractId || (exports.LyraGlobalContractId = {}));
// Per-market contract name mappings
var LyraMarketContractId;
(function (LyraMarketContractId) {
    LyraMarketContractId["OptionMarket"] = "OptionMarket";
    LyraMarketContractId["OptionMarketPricer"] = "OptionMarketPricer";
    LyraMarketContractId["OptionToken"] = "OptionToken";
    LyraMarketContractId["ShortCollateral"] = "ShortCollateral";
    LyraMarketContractId["OptionGreekCache"] = "OptionGreekCache";
    LyraMarketContractId["LiquidityToken"] = "LiquidityToken";
    LyraMarketContractId["LiquidityPool"] = "LiquidityPool";
    LyraMarketContractId["PoolHedger"] = "PoolHedger";
})(LyraMarketContractId = exports.LyraMarketContractId || (exports.LyraMarketContractId = {}));
// Ordered enum from contracts
var OptionType;
(function (OptionType) {
    OptionType[OptionType["LongCall"] = 0] = "LongCall";
    OptionType[OptionType["LongPut"] = 1] = "LongPut";
    OptionType[OptionType["ShortCoveredCall"] = 2] = "ShortCoveredCall";
    OptionType[OptionType["ShortCall"] = 3] = "ShortCall";
    OptionType[OptionType["ShortPut"] = 4] = "ShortPut";
})(OptionType = exports.OptionType || (exports.OptionType = {}));
var Deployment;
(function (Deployment) {
    Deployment["Testnet"] = "testnet";
    Deployment["Mainnet"] = "mainnet";
})(Deployment = exports.Deployment || (exports.Deployment = {}));
exports.DEFAULT_ITERATIONS = 1;
exports.DEFAULT_PREMIUM_SLIPPAGE = 0.1 / 100; // 0.1%
exports.DEFAULT_SWAP_SLIPPAGE = 0.1 / 100; // 0.1%
exports.CURVE_POOL_FEE_RATE = 0.4 / 100; // 0.4%
var EventName;
(function (EventName) {
    EventName["Trade"] = "Trade";
    EventName["PositionUpdated"] = "PositionUpdated";
    EventName["Transfer"] = "Transfer";
})(EventName = exports.EventName || (exports.EventName = {}));
var PositionState;
(function (PositionState) {
    PositionState[PositionState["Empty"] = 0] = "Empty";
    PositionState[PositionState["Active"] = 1] = "Active";
    PositionState[PositionState["Closed"] = 2] = "Closed";
    PositionState[PositionState["Liquidated"] = 3] = "Liquidated";
    PositionState[PositionState["Settled"] = 4] = "Settled";
    PositionState[PositionState["Merged"] = 5] = "Merged";
})(PositionState = exports.PositionState || (exports.PositionState = {}));
var PositionUpdatedType;
(function (PositionUpdatedType) {
    PositionUpdatedType[PositionUpdatedType["Opened"] = 0] = "Opened";
    PositionUpdatedType[PositionUpdatedType["Adjusted"] = 1] = "Adjusted";
    PositionUpdatedType[PositionUpdatedType["Closed"] = 2] = "Closed";
    PositionUpdatedType[PositionUpdatedType["SplitFrom"] = 3] = "SplitFrom";
    PositionUpdatedType[PositionUpdatedType["SplitInto"] = 4] = "SplitInto";
    PositionUpdatedType[PositionUpdatedType["Merged"] = 5] = "Merged";
    PositionUpdatedType[PositionUpdatedType["MergedInto"] = 6] = "MergedInto";
    PositionUpdatedType[PositionUpdatedType["Settled"] = 7] = "Settled";
    PositionUpdatedType[PositionUpdatedType["Liquidated"] = 8] = "Liquidated";
    PositionUpdatedType[PositionUpdatedType["Transfer"] = 9] = "Transfer";
})(PositionUpdatedType = exports.PositionUpdatedType || (exports.PositionUpdatedType = {}));
var TradeDirection;
(function (TradeDirection) {
    TradeDirection[TradeDirection["Open"] = 0] = "Open";
    TradeDirection[TradeDirection["Close"] = 1] = "Close";
    TradeDirection[TradeDirection["Liquidate"] = 2] = "Liquidate";
})(TradeDirection = exports.TradeDirection || (exports.TradeDirection = {}));
var DataSource;
(function (DataSource) {
    DataSource["ContractCall"] = "ContractCall";
    DataSource["Log"] = "Log";
    DataSource["Subgraph"] = "Subgraph";
})(DataSource = exports.DataSource || (exports.DataSource = {}));
exports.POSITION_UPDATED_TYPES = [
    PositionUpdatedType.Adjusted,
    PositionUpdatedType.Closed,
    PositionUpdatedType.Liquidated,
    PositionUpdatedType.Opened,
    PositionUpdatedType.Settled,
    PositionUpdatedType.Merged,
    PositionUpdatedType.MergedInto,
    PositionUpdatedType.SplitFrom,
    PositionUpdatedType.SplitInto,
];
exports.LYRA_ETHEREUM_MAINNET_ADDRESS = '0x01BA67AAC7f75f647D94220Cc98FB30FCc5105Bf';
exports.OP_OPTIMISM_MAINNET_ADDRESS = '0x4200000000000000000000000000000000000042';
exports.LYRA_ETHEREUM_KOVAN_ADDRESS = '0xC9801013F0c45F836Ad07Dded1df9C475d2844FC';
exports.VAULTS_UTILIZATION_THRESHOLD = 0.99;
//# sourceMappingURL=contracts.js.map