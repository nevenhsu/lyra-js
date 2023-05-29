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
exports.TradeEvent = void 0;
var collateral_update_event_1 = require("../collateral_update_event");
var market_1 = require("../market");
var option_1 = require("../option");
var position_1 = require("../position");
var strike_1 = require("../strike");
var fetchPositionEventDataByHash_1 = __importDefault(require("../utils/fetchPositionEventDataByHash"));
var fetchTradeListener_1 = __importDefault(require("../utils/fetchTradeListener"));
var getAverageCostPerOption_1 = __importDefault(require("../utils/getAverageCostPerOption"));
var getPositionPreviousTrades_1 = __importDefault(require("../utils/getPositionPreviousTrades"));
var getTradePnl_1 = __importDefault(require("../utils/getTradePnl"));
var getTradeEventNewSize_1 = __importDefault(require("./getTradeEventNewSize"));
var getTradeEventPreviousSize_1 = __importDefault(require("./getTradeEventPreviousSize"));
var TradeEvent = /** @class */ (function () {
    function TradeEvent(lyra, trade, collateralUpdate) {
        this.lyra = lyra;
        this.__tradeData = trade;
        if (!trade.isLong && collateralUpdate) {
            // Only set collateral update data for shorts
            this.__collateralUpdateData = collateralUpdate;
        }
        this.__source = trade.source;
        this.positionId = trade.positionId;
        this.marketName = trade.marketName;
        this.marketAddress = trade.marketAddress;
        this.timestamp = trade.timestamp;
        this.blockNumber = trade.blockNumber;
        this.transactionHash = trade.transactionHash;
        this.trader = trade.trader;
        this.size = trade.size;
        this.isCall = trade.isCall;
        this.isOpen = trade.isOpen;
        this.isBuy = trade.isBuy;
        this.isLong = trade.isLong;
        this.strikeId = trade.strikeId;
        this.strikePrice = trade.strikePrice;
        this.expiryTimestamp = trade.expiryTimestamp;
        this.spotPrice = trade.spotPrice;
        this.pricePerOption = trade.pricePerOption;
        this.premium = trade.premium;
        this.fee = trade.fee;
        this.feeComponents = trade.feeComponents;
        this.swap = trade.swap;
        this.iv = trade.iv;
        this.skew = trade.skew;
        this.baseIv = trade.baseIv;
        this.volTraded = trade.volTraded;
        this.collateralAmount = trade.collateralAmount;
        this.collateralValue = trade.collateralValue;
        this.isBaseCollateral = trade.isBaseCollateral;
        this.isForceClose = trade.isForceClose;
        this.isLiquidation = trade.isLiquidation;
        this.liquidation = trade.liquidation;
    }
    // Getters
    TradeEvent.getByHash = function (lyra, transactionHashOrReceipt) {
        return __awaiter(this, void 0, void 0, function () {
            var trades;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, fetchPositionEventDataByHash_1.default)(lyra, transactionHashOrReceipt)];
                    case 1:
                        trades = (_a.sent()).trades;
                        return [2 /*return*/, trades];
                }
            });
        });
    };
    // Dynamic fields
    TradeEvent.prototype.pnl = function (position) {
        // Pnl based on premiums
        return (0, getTradePnl_1.default)(position, this);
    };
    TradeEvent.prototype.newAverageCostPerOption = function (position) {
        return (0, getAverageCostPerOption_1.default)((0, getPositionPreviousTrades_1.default)(position, this).concat([this]));
    };
    TradeEvent.prototype.prevAverageCostPerOption = function (position) {
        return (0, getAverageCostPerOption_1.default)((0, getPositionPreviousTrades_1.default)(position, this));
    };
    TradeEvent.prototype.newSize = function (position) {
        return (0, getTradeEventNewSize_1.default)(position, this);
    };
    TradeEvent.prototype.prevSize = function (position) {
        return (0, getTradeEventPreviousSize_1.default)(position, this);
    };
    // Edges
    TradeEvent.prototype.collateralUpdate = function () {
        if (!this.__collateralUpdateData) {
            return null;
        }
        return new collateral_update_event_1.CollateralUpdateEvent(this.lyra, this.__collateralUpdateData, this.__tradeData);
    };
    TradeEvent.prototype.position = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, position_1.Position.get(this.lyra, this.marketAddress, this.positionId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    TradeEvent.prototype.option = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, option_1.Option.get(this.lyra, this.marketAddress, this.strikeId, this.isCall)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    TradeEvent.prototype.strike = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, strike_1.Strike.get(this.lyra, this.marketAddress, this.strikeId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    TradeEvent.prototype.board = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.strike()];
                    case 1: return [2 /*return*/, (_a.sent()).board()];
                }
            });
        });
    };
    TradeEvent.prototype.market = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, market_1.Market.get(this.lyra, this.marketAddress)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // Listeners
    TradeEvent.on = function (lyra, callback, options) {
        return (0, fetchTradeListener_1.default)(lyra, callback, options);
    };
    return TradeEvent;
}());
exports.TradeEvent = TradeEvent;
//# sourceMappingURL=index.js.map