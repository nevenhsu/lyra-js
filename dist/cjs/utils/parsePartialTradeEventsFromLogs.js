"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var contracts_1 = require("@ethersproject/contracts");
var __1 = require("..");
var bn_1 = require("../constants/bn");
var contracts_2 = require("../constants/contracts");
var filterNulls_1 = __importDefault(require("./filterNulls"));
var getLyraMarketContract_1 = require("./getLyraMarketContract");
// Some transactions, e.g. liquidations, can have multiple Trade events
function parsePartialTradeEventsFromLogs(logs, network) {
    var optionMarket = new contracts_1.Contract(bn_1.ZERO_ADDRESS, 
    // Hard-coded Version as these ABI events are functionally the same
    (0, getLyraMarketContract_1.getMarketContractABI)(__1.Version.Newport, contracts_2.LyraMarketContractId.OptionMarket, network));
    var events = (0, filterNulls_1.default)(logs.map(function (log) {
        try {
            var event_1 = optionMarket.interface.parseLog(log);
            // Skip any Trade events with empty tradeResults (collateral adjustments)
            if (event_1.name === contracts_2.EventName.Trade && event_1.args.tradeResults.length > 0) {
                return {
                    address: log.address,
                    blockNumber: log.blockNumber,
                    transactionHash: log.transactionHash,
                    logIndex: log.logIndex,
                    args: event_1.args,
                };
            }
            return null;
        }
        catch (e) {
            return null;
        }
    }));
    return events;
}
exports.default = parsePartialTradeEventsFromLogs;
//# sourceMappingURL=parsePartialTradeEventsFromLogs.js.map