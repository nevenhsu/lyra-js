"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var contracts_1 = require("@ethersproject/contracts");
var __1 = require("..");
var contracts_2 = require("../constants/contracts");
var Multicall3_json_1 = __importDefault(require("../contracts/common/abis/Multicall3.json"));
var MultiDistributor_json_1 = __importDefault(require("../contracts/common/abis/MultiDistributor.json"));
var arbitrum_addresses_json_1 = __importDefault(require("../contracts/common/addresses/arbitrum.addresses.json"));
var arbitrum_goerli_addresses_json_1 = __importDefault(require("../contracts/common/addresses/arbitrum-goerli.addresses.json"));
var optimism_addresses_json_1 = __importDefault(require("../contracts/common/addresses/optimism.addresses.json"));
var optimism_goerli_addresses_json_1 = __importDefault(require("../contracts/common/addresses/optimism-goerli.addresses.json"));
var getGlobalContractAddress = function (lyra, contractId) {
    switch (lyra.chain) {
        case __1.Chain.Arbitrum:
            return arbitrum_addresses_json_1.default[contractId];
        case __1.Chain.ArbitrumGoerli:
            return arbitrum_goerli_addresses_json_1.default[contractId];
        case __1.Chain.Optimism:
            return optimism_addresses_json_1.default[contractId];
        case __1.Chain.OptimismGoerli:
            return optimism_goerli_addresses_json_1.default[contractId];
    }
};
var getGlobalContractABI = function (contractId) {
    switch (contractId) {
        case contracts_2.LyraGlobalContractId.MultiDistributor:
            return MultiDistributor_json_1.default;
        case contracts_2.LyraGlobalContractId.Multicall3:
            return Multicall3_json_1.default;
    }
};
function getGlobalContract(lyra, contractId) {
    var provider = lyra.provider;
    var address = getGlobalContractAddress(lyra, contractId);
    if (!address) {
        throw new Error('Contract does not exist for specified chain');
    }
    var abi = getGlobalContractABI(contractId);
    return new contracts_1.Contract(address, abi, provider);
}
exports.default = getGlobalContract;
//# sourceMappingURL=getGlobalContract.js.map