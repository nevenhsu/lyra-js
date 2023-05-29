"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var contracts_1 = require("@ethersproject/contracts");
var bn_1 = require("../constants/bn");
var contracts_2 = require("../constants/contracts");
var lyra_1 = require("../lyra");
var filterNulls_1 = __importDefault(require("./filterNulls"));
var getLyraMarketContract_1 = require("./getLyraMarketContract");
function parsePartialPositionUpdatedEventsFromLogs(logs) {
    var optionToken = new contracts_1.Contract(bn_1.ZERO_ADDRESS, 
    // Hard-coded version as these ABI events are functionally the same
    (0, getLyraMarketContract_1.getMarketContractABI)(lyra_1.Version.Newport, contracts_2.LyraMarketContractId.OptionToken));
    var events = (0, filterNulls_1.default)(logs.map(function (log) {
        try {
            var event_1 = optionToken.interface.parseLog(log);
            if (event_1.name === contracts_2.EventName.PositionUpdated) {
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
exports.default = parsePartialPositionUpdatedEventsFromLogs;
//# sourceMappingURL=parsePartialPositionUpdatedEventsFromLogs.js.map