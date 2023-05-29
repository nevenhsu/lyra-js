"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMarketContractAddress = exports.getMarketContractABI = void 0;
var contracts_1 = require("@ethersproject/contracts");
var __1 = require("..");
var contracts_2 = require("../constants/contracts");
var AvalonLiquidityPool_json_1 = __importDefault(require("../contracts/avalon/abis/AvalonLiquidityPool.json"));
var AvalonLiquidityToken_json_1 = __importDefault(require("../contracts/avalon/abis/AvalonLiquidityToken.json"));
var AvalonOptionGreekCache_json_1 = __importDefault(require("../contracts/avalon/abis/AvalonOptionGreekCache.json"));
var AvalonOptionMarket_json_1 = __importDefault(require("../contracts/avalon/abis/AvalonOptionMarket.json"));
var AvalonOptionMarketPricer_json_1 = __importDefault(require("../contracts/avalon/abis/AvalonOptionMarketPricer.json"));
var AvalonOptionToken_json_1 = __importDefault(require("../contracts/avalon/abis/AvalonOptionToken.json"));
var AvalonShortCollateral_json_1 = __importDefault(require("../contracts/avalon/abis/AvalonShortCollateral.json"));
var AvalonShortPoolHedger_json_1 = __importDefault(require("../contracts/avalon/abis/AvalonShortPoolHedger.json"));
var NewportGMXFuturesPoolHedger_json_1 = __importDefault(require("../contracts/newport/abis/NewportGMXFuturesPoolHedger.json"));
var NewportLiquidityPool_json_1 = __importDefault(require("../contracts/newport/abis/NewportLiquidityPool.json"));
var NewportLiquidityToken_json_1 = __importDefault(require("../contracts/newport/abis/NewportLiquidityToken.json"));
var NewportOptionGreekCache_json_1 = __importDefault(require("../contracts/newport/abis/NewportOptionGreekCache.json"));
var NewportOptionMarketPricer_json_1 = __importDefault(require("../contracts/newport/abis/NewportOptionMarketPricer.json"));
var NewportOptionToken_json_1 = __importDefault(require("../contracts/newport/abis/NewportOptionToken.json"));
var NewportShortCollateral_json_1 = __importDefault(require("../contracts/newport/abis/NewportShortCollateral.json"));
var NewportSNXPerpsV2PoolHedger_json_1 = __importDefault(require("../contracts/newport/abis/NewportSNXPerpsV2PoolHedger.json"));
var NewportOptionMarket_json_1 = __importDefault(require("../contracts/newport/arbitrum/abis/NewportOptionMarket.json"));
var NewportOptionMarket_json_2 = __importDefault(require("../contracts/newport/optimism/abis/NewportOptionMarket.json"));
var getMarketContractABI = function (version, contractId, network) {
    switch (contractId) {
        case contracts_2.LyraMarketContractId.LiquidityPool:
            switch (version) {
                case __1.Version.Avalon:
                    return AvalonLiquidityPool_json_1.default;
                case __1.Version.Newport:
                    return NewportLiquidityPool_json_1.default;
            }
        /* eslint-disable-next-line no-fallthrough */
        case contracts_2.LyraMarketContractId.LiquidityToken:
            switch (version) {
                case __1.Version.Avalon:
                    return AvalonLiquidityToken_json_1.default;
                case __1.Version.Newport:
                    return NewportLiquidityToken_json_1.default;
            }
        /* eslint-disable-next-line no-fallthrough */
        case contracts_2.LyraMarketContractId.OptionGreekCache:
            switch (version) {
                case __1.Version.Avalon:
                    return AvalonOptionGreekCache_json_1.default;
                case __1.Version.Newport:
                    return NewportOptionGreekCache_json_1.default;
            }
        /* eslint-disable-next-line no-fallthrough */
        case contracts_2.LyraMarketContractId.OptionMarket:
            switch (version) {
                case __1.Version.Avalon:
                    return AvalonOptionMarket_json_1.default;
                case __1.Version.Newport:
                    switch (network) {
                        case __1.Network.Arbitrum:
                            return NewportOptionMarket_json_1.default;
                        case __1.Network.Optimism:
                            return NewportOptionMarket_json_2.default;
                    }
            }
        /* eslint-disable-next-line no-fallthrough */
        case contracts_2.LyraMarketContractId.OptionMarketPricer:
            switch (version) {
                case __1.Version.Avalon:
                    return AvalonOptionMarketPricer_json_1.default;
                case __1.Version.Newport:
                    return NewportOptionMarketPricer_json_1.default;
            }
        /* eslint-disable-next-line no-fallthrough */
        case contracts_2.LyraMarketContractId.OptionToken:
            switch (version) {
                case __1.Version.Avalon:
                    return AvalonOptionToken_json_1.default;
                case __1.Version.Newport:
                    return NewportOptionToken_json_1.default;
            }
        /* eslint-disable-next-line no-fallthrough */
        case contracts_2.LyraMarketContractId.PoolHedger:
            switch (version) {
                case __1.Version.Avalon:
                    return AvalonShortPoolHedger_json_1.default;
                case __1.Version.Newport:
                    switch (network) {
                        case __1.Network.Arbitrum:
                            return NewportGMXFuturesPoolHedger_json_1.default;
                        case __1.Network.Optimism:
                            return NewportSNXPerpsV2PoolHedger_json_1.default;
                    }
            }
        /* eslint-disable-next-line no-fallthrough */
        case contracts_2.LyraMarketContractId.ShortCollateral:
            switch (version) {
                case __1.Version.Avalon:
                    return AvalonShortCollateral_json_1.default;
                case __1.Version.Newport:
                    return NewportShortCollateral_json_1.default;
            }
    }
};
exports.getMarketContractABI = getMarketContractABI;
var getMarketContractAddress = function (contractAddresses, contractId) {
    switch (contractId) {
        case contracts_2.LyraMarketContractId.LiquidityPool:
            return contractAddresses.liquidityPool;
        case contracts_2.LyraMarketContractId.LiquidityToken:
            return contractAddresses.liquidityToken;
        case contracts_2.LyraMarketContractId.OptionGreekCache:
            return contractAddresses.greekCache;
        case contracts_2.LyraMarketContractId.OptionMarket:
            return contractAddresses.optionMarket;
        case contracts_2.LyraMarketContractId.OptionMarketPricer:
            return contractAddresses.optionMarketPricer;
        case contracts_2.LyraMarketContractId.OptionToken:
            return contractAddresses.optionToken;
        case contracts_2.LyraMarketContractId.PoolHedger:
            return contractAddresses.poolHedger;
        case contracts_2.LyraMarketContractId.ShortCollateral:
            return contractAddresses.shortCollateral;
    }
};
exports.getMarketContractAddress = getMarketContractAddress;
// TODO: @dappbeast Breakdown lyra components
function getLyraMarketContract(lyra, contractAddresses, version, contractId) {
    var provider = lyra.provider;
    var address = (0, exports.getMarketContractAddress)(contractAddresses, contractId);
    var abi = (0, exports.getMarketContractABI)(version, contractId, lyra.network);
    return new contracts_1.Contract(address, abi, provider);
}
exports.default = getLyraMarketContract;
//# sourceMappingURL=getLyraMarketContract.js.map