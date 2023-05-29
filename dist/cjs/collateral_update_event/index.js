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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollateralUpdateEvent = void 0;
var bn_1 = require("../constants/bn");
var market_1 = require("../market");
var option_1 = require("../option");
var position_1 = require("../position");
var strike_1 = require("../strike");
var trade_event_1 = require("../trade_event");
var fetchPositionEventDataByHash_1 = __importDefault(require("../utils/fetchPositionEventDataByHash"));
var getAverageCollateralSpotPrice_1 = __importDefault(require("../utils/getAverageCollateralSpotPrice"));
var getCollateralUpdatePnl_1 = __importDefault(require("../utils/getCollateralUpdatePnl"));
var CollateralUpdateEvent = /** @class */ (function () {
    function CollateralUpdateEvent(lyra, update, trade) {
        this.lyra = lyra;
        this.__collateralUpdateData = update;
        this.__tradeData = trade;
        this.__source = update.source;
        this.owner = update.owner;
        this.timestamp = update.timestamp;
        this.transactionHash = update.transactionHash;
        this.positionId = update.positionId;
        this.blockNumber = update.blockNumber;
        this.marketAddress = update.marketAddress;
        this.expiryTimestamp = update.expiryTimestamp;
        this.amount = update.amount;
        this.value = update.value;
        this.marketName = update.marketName;
        this.strikeId = update.strikeId;
        this.strikePrice = update.strikePrice;
        this.isCall = update.isCall;
        this.isBaseCollateral = update.isBaseCollateral;
        this.spotPrice = update.spotPrice;
        this.isAdjustment = !trade;
        this.swap = update.swap;
    }
    // Getters
    CollateralUpdateEvent.getByHash = function (lyra, transactionHashOrReceipt) {
        return __awaiter(this, void 0, void 0, function () {
            var collateralUpdates;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, fetchPositionEventDataByHash_1.default)(lyra, transactionHashOrReceipt)];
                    case 1:
                        collateralUpdates = (_a.sent()).collateralUpdates;
                        return [2 /*return*/, collateralUpdates];
                }
            });
        });
    };
    // Dynamic Fields
    CollateralUpdateEvent.prototype.pnl = function (position) {
        return (0, getCollateralUpdatePnl_1.default)(position, this);
    };
    CollateralUpdateEvent.prototype.prevAmount = function (position) {
        var _this = this;
        var _a;
        var prevCollateralUpdates = position.collateralUpdates().filter(function (c) { return c.blockNumber < _this.blockNumber; });
        var prevCollateralUpdate = prevCollateralUpdates.length
            ? prevCollateralUpdates[prevCollateralUpdates.length - 1]
            : null;
        return (_a = prevCollateralUpdate === null || prevCollateralUpdate === void 0 ? void 0 : prevCollateralUpdate.amount) !== null && _a !== void 0 ? _a : bn_1.ZERO_BN;
    };
    CollateralUpdateEvent.prototype.changeAmount = function (position) {
        var prevAmount = this.prevAmount(position);
        return this.amount.sub(prevAmount);
    };
    CollateralUpdateEvent.prototype.changeValue = function (position) {
        var changeAmount = this.changeAmount(position);
        return this.isBaseCollateral ? changeAmount.mul(this.spotPrice).div(bn_1.UNIT) : changeAmount;
    };
    CollateralUpdateEvent.prototype.newAverageCollateralSpotPrice = function (position) {
        var _this = this;
        // Include this event by block number
        var collateralUpdates = position.collateralUpdates().filter(function (c) { return c.blockNumber <= _this.blockNumber; });
        return (0, getAverageCollateralSpotPrice_1.default)(position, collateralUpdates);
    };
    CollateralUpdateEvent.prototype.prevAverageCollateralSpotPrice = function (position) {
        var _this = this;
        // Exclude this event by block number
        var collateralUpdates = position.collateralUpdates().filter(function (c) { return c.blockNumber < _this.blockNumber; });
        return (0, getAverageCollateralSpotPrice_1.default)(position, collateralUpdates);
    };
    // Edges
    CollateralUpdateEvent.prototype.trade = function () {
        if (!this.__tradeData) {
            return null;
        }
        return new trade_event_1.TradeEvent(this.lyra, this.__tradeData, this.__collateralUpdateData);
    };
    CollateralUpdateEvent.prototype.position = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, position_1.Position.get(this.lyra, this.marketAddress, this.positionId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CollateralUpdateEvent.prototype.option = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, option_1.Option.get(this.lyra, this.marketAddress, this.strikeId, this.isCall)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CollateralUpdateEvent.prototype.strike = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, strike_1.Strike.get(this.lyra, this.marketAddress, this.strikeId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CollateralUpdateEvent.prototype.board = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.strike()];
                    case 1: return [2 /*return*/, (_a.sent()).board()];
                }
            });
        });
    };
    CollateralUpdateEvent.prototype.market = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, market_1.Market.get(this.lyra, this.marketAddress)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return CollateralUpdateEvent;
}());
exports.CollateralUpdateEvent = CollateralUpdateEvent;
//# sourceMappingURL=index.js.map