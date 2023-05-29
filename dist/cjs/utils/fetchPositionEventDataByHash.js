"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("..");
var transfer_event_1 = require("../transfer_event");
var fetchPositionEventDataByIDs_1 = __importDefault(require("./fetchPositionEventDataByIDs"));
var filterNulls_1 = __importDefault(require("./filterNulls"));
var parsePartialPositionUpdatedEventsFromLogs_1 = __importDefault(require("./parsePartialPositionUpdatedEventsFromLogs"));
var parsePartialTradeEventsFromLogs_1 = __importDefault(require("./parsePartialTradeEventsFromLogs"));
function fetchPositionEventDataByHash(lyra, transactionHashOrReceipt) {
    return __awaiter(this, void 0, void 0, function () {
        var receipt, _a, transactionHash, tradeEvents, updateEvents, marketAddress, contractAddresses, optionTokenAddress_1, marketContractAddresses, positionIds, eventsByPositionID, events, trades, collateralUpdates, transfers, settles;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!(typeof transactionHashOrReceipt === 'string')) return [3 /*break*/, 2];
                    return [4 /*yield*/, lyra.provider.getTransactionReceipt(transactionHashOrReceipt)];
                case 1:
                    _a = _b.sent();
                    return [3 /*break*/, 3];
                case 2:
                    _a = transactionHashOrReceipt;
                    _b.label = 3;
                case 3:
                    receipt = _a;
                    transactionHash = receipt.transactionHash;
                    tradeEvents = (0, parsePartialTradeEventsFromLogs_1.default)(receipt.logs, lyra.network);
                    updateEvents = (0, parsePartialPositionUpdatedEventsFromLogs_1.default)(receipt.logs, lyra.network) // Also covers settle events
                    ;
                    marketAddress = null;
                    if (!tradeEvents.length) return [3 /*break*/, 4];
                    marketAddress = tradeEvents[0].address;
                    return [3 /*break*/, 6];
                case 4:
                    if (!updateEvents.length) return [3 /*break*/, 6];
                    return [4 /*yield*/, lyra.contractAddresses()];
                case 5:
                    contractAddresses = _b.sent();
                    optionTokenAddress_1 = updateEvents[0].address;
                    marketContractAddresses = contractAddresses.find(function (marketAddresses) { return marketAddresses.optionToken === optionTokenAddress_1; });
                    if (marketContractAddresses) {
                        marketAddress = marketContractAddresses.optionMarket;
                    }
                    _b.label = 6;
                case 6:
                    if (!marketAddress) {
                        return [2 /*return*/, { trades: [], collateralUpdates: [], transfers: [], settles: [] }];
                    }
                    positionIds = Array.from(new Set(__spreadArray(__spreadArray([], tradeEvents.map(function (trade) { return trade.args.positionId.toNumber(); }), true), updateEvents.map(function (update) { return update.args.positionId.toNumber(); }), true)));
                    return [4 /*yield*/, (0, fetchPositionEventDataByIDs_1.default)(lyra, positionIds.map(function (positionId) { return ({ positionId: positionId, marketAddress: marketAddress }); }))];
                case 7:
                    eventsByPositionID = (_b.sent())[marketAddress];
                    events = Object.values(eventsByPositionID).map(function (_a) {
                        var trades = _a.trades, collateralUpdates = _a.collateralUpdates, transfers = _a.transfers, _settle = _a.settle;
                        var tradeData = trades.find(function (trade) { return trade.transactionHash === transactionHash; });
                        var collateralUpdateData = collateralUpdates.find(function (update) { return update.transactionHash === transactionHash; });
                        var transferData = transfers.find(function (transfer) { return transfer.transactionHash === transactionHash; });
                        var settleData = (_settle === null || _settle === void 0 ? void 0 : _settle.transactionHash) === transactionHash ? _settle : null;
                        var trade = tradeData ? new __1.TradeEvent(lyra, tradeData, collateralUpdateData) : null;
                        var collateralUpdate = collateralUpdateData
                            ? new __1.CollateralUpdateEvent(lyra, collateralUpdateData, tradeData)
                            : null;
                        var transfer = transferData ? new transfer_event_1.TransferEvent(lyra, transferData) : null;
                        var settle = settleData ? new __1.SettleEvent(lyra, settleData) : null;
                        return {
                            trade: trade,
                            collateralUpdate: collateralUpdate,
                            transfer: transfer,
                            settle: settle,
                        };
                    });
                    trades = (0, filterNulls_1.default)(events.map(function (_a) {
                        var trade = _a.trade;
                        return trade;
                    }));
                    collateralUpdates = (0, filterNulls_1.default)(events.map(function (_a) {
                        var collateralUpdate = _a.collateralUpdate;
                        return collateralUpdate;
                    }));
                    transfers = (0, filterNulls_1.default)(events.map(function (_a) {
                        var transfer = _a.transfer;
                        return transfer;
                    }));
                    settles = (0, filterNulls_1.default)(events.map(function (_a) {
                        var settle = _a.settle;
                        return settle;
                    }));
                    return [2 /*return*/, {
                            trades: trades,
                            collateralUpdates: collateralUpdates,
                            transfers: transfers,
                            settles: settles,
                        }];
            }
        });
    });
}
exports.default = fetchPositionEventDataByHash;
//# sourceMappingURL=fetchPositionEventDataByHash.js.map