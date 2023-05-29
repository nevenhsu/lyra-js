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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Position = void 0;
var collateral_update_event_1 = require("../collateral_update_event");
var bn_1 = require("../constants/bn");
var market_1 = require("../market");
var settle_event_1 = require("../settle_event");
var trade_1 = require("../trade");
var trade_event_1 = require("../trade_event");
var transfer_event_1 = require("../transfer_event");
var fetchOpenPositionDataByOwner_1 = __importDefault(require("../utils/fetchOpenPositionDataByOwner"));
var fetchPositionDataByID_1 = __importDefault(require("../utils/fetchPositionDataByID"));
var fetchPositionDataByOwner_1 = __importDefault(require("../utils/fetchPositionDataByOwner"));
var getAverageCollateralSpotPrice_1 = __importDefault(require("../utils/getAverageCollateralSpotPrice"));
var getAverageCostPerOption_1 = __importDefault(require("../utils/getAverageCostPerOption"));
var getBreakEvenPrice_1 = __importDefault(require("../utils/getBreakEvenPrice"));
var getProjectedSettlePnl_1 = __importDefault(require("../utils/getProjectedSettlePnl"));
var getPositionPnl_1 = __importDefault(require("./getPositionPnl"));
var Position = /** @class */ (function () {
    function Position(lyra, position) {
        this.lyra = lyra;
        this.__positionData = position;
        this.__source = position.source;
        this.owner = position.owner;
        this.id = position.id;
        this.strikeId = position.strikeId;
        this.strikePrice = position.strikePrice;
        this.expiryTimestamp = position.expiryTimestamp;
        this.marketName = position.marketName;
        this.marketAddress = position.marketAddress;
        this.isCall = position.isCall;
        this.isLong = position.isLong;
        this.state = position.state;
        this.isOpen = position.isOpen;
        this.size = position.size;
        this.isLiquidated = position.isLiquidated;
        this.isSettled = position.isSettled;
        this.collateral = position.collateral;
        this.pricePerOption = position.pricePerOption;
        this.spotPriceAtExpiry = position.spotPriceAtExpiry;
        this.isInTheMoney = position.isInTheMoney;
        this.delta = position.delta;
        this.openTimestamp = position.openTimestamp;
        this.closeTimestamp = position.closeTimestamp;
    }
    // Getters
    Position.get = function (lyra, marketAddressOrName, positionId) {
        return __awaiter(this, void 0, void 0, function () {
            var market, position;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, market_1.Market.get(lyra, marketAddressOrName)];
                    case 1:
                        market = _a.sent();
                        return [4 /*yield*/, (0, fetchPositionDataByID_1.default)(lyra, market, positionId)];
                    case 2:
                        position = _a.sent();
                        return [2 /*return*/, new Position(lyra, position)];
                }
            });
        });
    };
    Position.getOpenByOwner = function (lyra, owner) {
        return __awaiter(this, void 0, void 0, function () {
            var positions;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, fetchOpenPositionDataByOwner_1.default)(lyra, owner)];
                    case 1:
                        positions = _a.sent();
                        return [2 /*return*/, positions.map(function (position) { return new Position(lyra, position); })];
                }
            });
        });
    };
    Position.getByOwner = function (lyra, owner) {
        return __awaiter(this, void 0, void 0, function () {
            var positions;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, fetchPositionDataByOwner_1.default)(lyra, owner)];
                    case 1:
                        positions = _a.sent();
                        return [2 /*return*/, positions.map(function (position) { return new Position(lyra, position); })];
                }
            });
        });
    };
    // Dynamic Fields
    Position.prototype.sizeBeforeClose = function () {
        var lastTrade = this.lastTrade();
        if (!this.isOpen && this.size.isZero() && lastTrade) {
            // Position manually closed, use size before last trade
            return lastTrade.prevSize(this);
        }
        else {
            // Position may be settled or still open
            return this.size;
        }
    };
    Position.prototype.averageCostPerOption = function () {
        return (0, getAverageCostPerOption_1.default)(this.trades());
    };
    Position.prototype.averageCollateralSpotPrice = function () {
        return (0, getAverageCollateralSpotPrice_1.default)(this, this.collateralUpdates());
    };
    Position.prototype.pnl = function () {
        return (0, getPositionPnl_1.default)(this);
    };
    Position.prototype.breakEven = function () {
        return (0, getBreakEvenPrice_1.default)(this.isCall, this.strikePrice, this.averageCostPerOption());
    };
    Position.prototype.toBreakEven = function () {
        var _a, _b, _c;
        var breakEven = this.breakEven();
        var spotPrice = this.isOpen
            ? this.market().spotPrice
            : this.isSettled
                ? (_a = this.spotPriceAtExpiry) !== null && _a !== void 0 ? _a : bn_1.ZERO_BN
                : (_c = (_b = this.lastTrade()) === null || _b === void 0 ? void 0 : _b.spotPrice) !== null && _c !== void 0 ? _c : bn_1.ZERO_BN;
        var breakEvenDiff = breakEven.sub(spotPrice);
        var toBreakEven = this.isCall
            ? spotPrice.gt(breakEven)
                ? bn_1.ZERO_BN
                : breakEvenDiff
            : spotPrice.lt(breakEven)
                ? bn_1.ZERO_BN
                : breakEvenDiff;
        return toBreakEven;
    };
    Position.prototype.payoff = function (spotPriceAtExpiry) {
        var _a;
        return (0, getProjectedSettlePnl_1.default)(this.isLong, this.isCall, this.strikePrice, spotPriceAtExpiry, this.averageCostPerOption(), this.sizeBeforeClose(), (_a = this.collateral) === null || _a === void 0 ? void 0 : _a.liquidationPrice);
    };
    // Edges
    Position.prototype.trades = function () {
        var _this = this;
        var _a = this.__positionData, trades = _a.trades, collateralUpdates = _a.collateralUpdates;
        var collateralUpdatesByHash = collateralUpdates.reduce(function (dict, update) {
            var _a;
            return (__assign(__assign({}, dict), (_a = {}, _a[update.transactionHash] = update, _a)));
        }, {});
        return trades.map(function (trade) { return new trade_event_1.TradeEvent(_this.lyra, trade, collateralUpdatesByHash[trade.transactionHash]); });
    };
    Position.prototype.firstTrade = function () {
        var trades = this.trades();
        return trades.length > 0 ? trades[0] : null;
    };
    Position.prototype.lastTrade = function () {
        var trades = this.trades();
        return trades.length > 0 ? trades[trades.length - 1] : null;
    };
    Position.prototype.collateralUpdates = function () {
        var _this = this;
        var _a = this.__positionData, trades = _a.trades, collateralUpdates = _a.collateralUpdates;
        var tradesByHash = trades.reduce(function (dict, trade) {
            var _a;
            return (__assign(__assign({}, dict), (_a = {}, _a[trade.transactionHash] = trade, _a)));
        }, {});
        return collateralUpdates.map(function (collatUpdate) { return new collateral_update_event_1.CollateralUpdateEvent(_this.lyra, collatUpdate, tradesByHash[collatUpdate.transactionHash]); });
    };
    Position.prototype.transfers = function () {
        var _this = this;
        var transfers = this.__positionData.transfers;
        return transfers.map(function (transferData) { return new transfer_event_1.TransferEvent(_this.lyra, transferData); });
    };
    Position.prototype.settle = function () {
        var settle = this.__positionData.settle;
        return settle ? new settle_event_1.SettleEvent(this.lyra, settle) : null;
    };
    Position.prototype.market = function () {
        return this.__positionData.market;
    };
    Position.prototype.board = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.strike()];
                    case 1: return [2 /*return*/, (_a.sent()).board()];
                }
            });
        });
    };
    Position.prototype.strike = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.market().strike(this.strikeId)];
            });
        });
    };
    Position.prototype.liveStrike = function () {
        return this.market().liveStrike(this.strikeId);
    };
    Position.prototype.option = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.market().option(this.strikeId, this.isCall)];
            });
        });
    };
    Position.prototype.liveOption = function () {
        return this.market().liveOption(this.strikeId, this.isCall);
    };
    // Trade
    Position.prototype.trade = function (isBuy, size, slippage, options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, trade_1.Trade.get(this.lyra, this.owner, this.marketAddress, this.strikeId, this.isCall, isBuy, size, slippage, __assign({ positionId: this.id }, options))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Position.prototype.open = function (size, slippage, options) {
        return __awaiter(this, void 0, void 0, function () {
            var isBuy;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        isBuy = this.isLong;
                        return [4 /*yield*/, this.trade(isBuy, size, slippage, options)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Position.prototype.close = function (size, slippage, options) {
        return __awaiter(this, void 0, void 0, function () {
            var isBuy;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        isBuy = !this.isLong;
                        return [4 /*yield*/, this.trade(isBuy, size, slippage, options)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return Position;
}());
exports.Position = Position;
//# sourceMappingURL=index.js.map