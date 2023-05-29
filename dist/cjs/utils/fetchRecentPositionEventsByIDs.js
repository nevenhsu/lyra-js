"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var contracts_1 = require("../constants/contracts");
var lyra_1 = require("../lyra");
var filterNulls_1 = __importDefault(require("./filterNulls"));
var getCollateralUpdateDataFromRecentEvent_1 = __importDefault(require("./getCollateralUpdateDataFromRecentEvent"));
var getLyraMarketContract_1 = __importDefault(require("./getLyraMarketContract"));
var getTradeDataFromRecentEvent_1 = __importDefault(require("./getTradeDataFromRecentEvent"));
var BLOCK_LIMIT = 100;
var getTransferKey = function (txHash, positionId) { return "".concat(txHash, "-").concat(positionId); };
function fetchRecentPositionEventsByIDs(lyra, market, positionIds) {
    return __awaiter(this, void 0, void 0, function () {
        var toBlockNumber, fromBlockNumber, tokenContract, queryTradeFilter, _a, tradeEvents, updateEvents, transferEvents, transfersByIdAndHash, eventsByPositionID, trades, collateralUpdates;
        var _this = this;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (positionIds.length === 0) {
                        return [2 /*return*/, []];
                    }
                    return [4 /*yield*/, lyra.provider.getBlock('latest')];
                case 1:
                    toBlockNumber = (_b.sent()).number;
                    fromBlockNumber = toBlockNumber - BLOCK_LIMIT;
                    tokenContract = (0, getLyraMarketContract_1.default)(lyra, market.contractAddresses, lyra.version, contracts_1.LyraMarketContractId.OptionToken);
                    queryTradeFilter = function () { return __awaiter(_this, void 0, void 0, function () {
                        var avalonMarketContract, avalonTradeFilter, newportMarketContract, newportTradeFilter;
                        return __generator(this, function (_a) {
                            if (lyra.version === lyra_1.Version.Avalon) {
                                avalonMarketContract = (0, getLyraMarketContract_1.default)(lyra, market.contractAddresses, lyra_1.Version.Avalon, contracts_1.LyraMarketContractId.OptionMarket);
                                avalonTradeFilter = avalonMarketContract.queryFilter(avalonMarketContract.filters.Trade(null, null, positionIds), fromBlockNumber, toBlockNumber);
                                return [2 /*return*/, avalonTradeFilter];
                            }
                            else {
                                newportMarketContract = (0, getLyraMarketContract_1.default)(lyra, market.contractAddresses, lyra_1.Version.Newport, contracts_1.LyraMarketContractId.OptionMarket);
                                newportTradeFilter = newportMarketContract.queryFilter(newportMarketContract.filters.Trade(null, positionIds), fromBlockNumber, toBlockNumber);
                                return [2 /*return*/, newportTradeFilter];
                            }
                            return [2 /*return*/];
                        });
                    }); };
                    return [4 /*yield*/, Promise.all([
                            queryTradeFilter(),
                            tokenContract.queryFilter(tokenContract.filters.PositionUpdated(positionIds, null, contracts_1.POSITION_UPDATED_TYPES), fromBlockNumber, toBlockNumber),
                            tokenContract.queryFilter(tokenContract.filters.Transfer(null, null, positionIds), fromBlockNumber, toBlockNumber),
                        ])];
                case 2:
                    _a = _b.sent(), tradeEvents = _a[0], updateEvents = _a[1], transferEvents = _a[2];
                    transfersByIdAndHash = transferEvents.reduce(function (dict, transfer) {
                        var _a;
                        var _b;
                        var key = getTransferKey(transfer.transactionHash, transfer.args.tokenId.toNumber());
                        return __assign(__assign({}, dict), (_a = {}, _a[key] = __spreadArray(__spreadArray([], ((_b = dict[key]) !== null && _b !== void 0 ? _b : []), true), [transfer], false), _a));
                    }, {});
                    eventsByPositionID = positionIds.reduce(function (dict, positionId) {
                        var _a;
                        return (__assign(__assign({}, dict), (_a = {}, _a[positionId] = { trades: [], collateralUpdates: [] }, _a)));
                    }, {});
                    trades = (0, filterNulls_1.default)(tradeEvents.map(function (tradeEvent) {
                        try {
                            var transfers = transfersByIdAndHash[getTransferKey(tradeEvent.transactionHash, tradeEvent.args.positionId.toNumber())];
                            return (0, getTradeDataFromRecentEvent_1.default)(tradeEvent, market, transfers);
                        }
                        catch (e) {
                            return null;
                        }
                    }));
                    collateralUpdates = (0, filterNulls_1.default)(updateEvents.map(function (updateEvent) {
                        try {
                            var transfers = transfersByIdAndHash[getTransferKey(updateEvent.transactionHash, updateEvent.args.positionId.toNumber())];
                            return (0, getCollateralUpdateDataFromRecentEvent_1.default)(updateEvent, market, transfers);
                        }
                        catch (e) {
                            return null;
                        }
                    }));
                    trades.forEach(function (trade) {
                        eventsByPositionID[trade.positionId].trades.push(trade);
                    });
                    collateralUpdates.forEach(function (update) {
                        eventsByPositionID[update.positionId].collateralUpdates.push(update);
                    });
                    return [2 /*return*/, eventsByPositionID];
            }
        });
    });
}
exports.default = fetchRecentPositionEventsByIDs;
//# sourceMappingURL=fetchRecentPositionEventsByIDs.js.map