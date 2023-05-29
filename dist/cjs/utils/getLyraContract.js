"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLyraContractABI = exports.getLyraContractAddress = void 0;
var contracts_1 = require("@ethersproject/contracts");
var __1 = require("..");
var contracts_2 = require("../constants/contracts");
var AvalonLyraRegistry_json_1 = __importDefault(require("../contracts/avalon/abis/AvalonLyraRegistry.json"));
var AvalonOptionMarketViewer_json_1 = __importDefault(require("../contracts/avalon/abis/AvalonOptionMarketViewer.json"));
var AvalonSynthetixAdapter_json_1 = __importDefault(require("../contracts/avalon/abis/AvalonSynthetixAdapter.json"));
var AvalonTestFaucet_json_1 = __importDefault(require("../contracts/avalon/abis/AvalonTestFaucet.json"));
var mainnet_addresses_json_1 = __importDefault(require("../contracts/avalon/addresses/mainnet.addresses.json"));
var testnet_addresses_json_1 = __importDefault(require("../contracts/avalon/addresses/testnet.addresses.json"));
var NewportGMXAdapter_json_1 = __importDefault(require("../contracts/newport/abis/NewportGMXAdapter.json"));
var NewportLyraRegistry_json_1 = __importDefault(require("../contracts/newport/abis/NewportLyraRegistry.json"));
var NewportOptionMarketViewer_json_1 = __importDefault(require("../contracts/newport/abis/NewportOptionMarketViewer.json"));
var NewportTestFaucet_json_1 = __importDefault(require("../contracts/newport/abis/NewportTestFaucet.json"));
var arbitrum_addresses_json_1 = __importDefault(require("../contracts/newport/addresses/arbitrum.addresses.json"));
var arbitrum_goerli_addresses_json_1 = __importDefault(require("../contracts/newport/addresses/arbitrum-goerli.addresses.json"));
var getLyraContractAddress = function (chain, version, contractId) {
    switch (chain) {
        case __1.Chain.Arbitrum:
            switch (version) {
                case __1.Version.Avalon:
                    throw new Error('Version.Avalon not supported on Arbitrum');
                case __1.Version.Newport:
                    return arbitrum_addresses_json_1.default[contractId];
            }
            break;
        case __1.Chain.ArbitrumGoerli:
            switch (version) {
                case __1.Version.Avalon:
                    throw new Error('Version.Avalon not supported on Arbitrum Goerli');
                case __1.Version.Newport:
                    return arbitrum_goerli_addresses_json_1.default[contractId];
            }
            break;
        case 'ethereum':
        case __1.Chain.Optimism:
            switch (version) {
                case __1.Version.Avalon:
                    return mainnet_addresses_json_1.default[contractId];
                case __1.Version.Newport:
                    throw new Error('Version.Newport not supported on Optimism');
            }
            break;
        case __1.Chain.OptimismGoerli:
            switch (version) {
                case __1.Version.Avalon:
                    return testnet_addresses_json_1.default[contractId];
                case __1.Version.Newport:
                    throw new Error('Version.Newport not supported on Optimism Goerli');
            }
            break;
    }
};
exports.getLyraContractAddress = getLyraContractAddress;
var getLyraContractABI = function (version, contractId) {
    switch (contractId) {
        case contracts_2.LyraContractId.OptionMarketViewer:
            switch (version) {
                case __1.Version.Avalon:
                    return AvalonOptionMarketViewer_json_1.default;
                case __1.Version.Newport:
                    return NewportOptionMarketViewer_json_1.default;
            }
            break;
        case contracts_2.LyraContractId.LyraRegistry:
            switch (version) {
                case __1.Version.Avalon:
                    return AvalonLyraRegistry_json_1.default;
                case __1.Version.Newport:
                    return NewportLyraRegistry_json_1.default;
            }
            break;
        case contracts_2.LyraContractId.ExchangeAdapter:
            switch (version) {
                case __1.Version.Avalon:
                    return AvalonSynthetixAdapter_json_1.default;
                case __1.Version.Newport:
                    return NewportGMXAdapter_json_1.default;
            }
            break;
        case contracts_2.LyraContractId.TestFaucet:
            switch (version) {
                case __1.Version.Avalon:
                    return AvalonTestFaucet_json_1.default;
                case __1.Version.Newport:
                    return NewportTestFaucet_json_1.default;
            }
            break;
    }
};
exports.getLyraContractABI = getLyraContractABI;
// TODO: @dappbeast Breakdown lyra components
function getLyraContract(lyra, version, contractId, useCustomProvider) {
    var provider = lyra.provider;
    var address = (0, exports.getLyraContractAddress)(lyra.chain, version, contractId);
    var abi = (0, exports.getLyraContractABI)(version, contractId);
    return new contracts_1.Contract(address, abi, useCustomProvider ? useCustomProvider : provider);
}
exports.default = getLyraContract;
//# sourceMappingURL=getLyraContract.js.map