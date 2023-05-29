"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var contracts_1 = require("../constants/contracts");
var getLyraMarketContract_1 = __importDefault(require("./getLyraMarketContract"));
function getLyraMarketContractForAddress(lyra, version, marketContractAddresses, address) {
    var keyValPair = Object.entries(marketContractAddresses).find(function (_a) {
        var key = _a[0], val = _a[1];
        return isNaN(parseInt(key)) && val === address;
    });
    if (!keyValPair) {
        return null;
    }
    var key = keyValPair[0];
    var contractId;
    switch (key) {
        case 'optionMarketPricer':
            contractId = contracts_1.LyraMarketContractId.OptionMarketPricer;
            break;
        case 'liquidityPool':
            contractId = contracts_1.LyraMarketContractId.LiquidityPool;
            break;
        case 'liquidityToken':
            contractId = contracts_1.LyraMarketContractId.LiquidityToken;
            break;
        case 'greekCache':
            contractId = contracts_1.LyraMarketContractId.OptionGreekCache;
            break;
        case 'optionMarket':
            contractId = contracts_1.LyraMarketContractId.OptionMarket;
            break;
        case 'optionToken':
            contractId = contracts_1.LyraMarketContractId.OptionToken;
            break;
        case 'shortCollateral':
            contractId = contracts_1.LyraMarketContractId.ShortCollateral;
            break;
        case 'poolHedger':
            contractId = contracts_1.LyraMarketContractId.PoolHedger;
            break;
    }
    if (!contractId) {
        return null;
    }
    return {
        contractId: contractId,
        contract: (0, getLyraMarketContract_1.default)(lyra, marketContractAddresses, version, contractId),
    };
}
exports.default = getLyraMarketContractForAddress;
//# sourceMappingURL=getLyraMarketContractForAddress.js.map