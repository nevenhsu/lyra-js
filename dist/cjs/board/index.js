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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Board = void 0;
var bn_1 = require("../constants/bn");
var contracts_1 = require("../constants/contracts");
var lyra_1 = require("../lyra");
var market_1 = require("../market");
var strike_1 = require("../strike");
var Board = /** @class */ (function () {
    function Board(lyra, market, boardView, block) {
        this.__source = contracts_1.DataSource.ContractCall;
        this.lyra = lyra;
        this.block = block;
        this.__market = market;
        this.block = block;
        var fields = Board.getFields(market, boardView, block);
        this.id = fields.id;
        this.expiryTimestamp = fields.expiryTimestamp;
        this.timeToExpiry = fields.timeToExpiry;
        this.isExpired = fields.isExpired;
        this.baseIv = fields.baseIv;
        this.spotPriceAtExpiry = fields.spotPriceAtExpiry;
        this.isPaused = fields.isPaused;
        this.tradingCutoffTimestamp = fields.tradingCutoffTimestamp;
        this.timeToTradingCutoff = fields.timeToTradingCutoff;
        this.isTradingCutoff = fields.isTradingCutoff;
        this.params = fields.params;
        this.liveStrikeMap = boardView.strikes.reduce(function (map, strikeView) {
            var _a;
            return (__assign(__assign({}, map), (_a = {}, _a[strikeView.strikeId.toNumber()] = strikeView, _a)));
        }, {});
    }
    // TODO: @dappbeast Remove getFields
    Board.getFields = function (market, boardView, block) {
        var _a;
        var id = boardView.boardId.toNumber();
        var expiryTimestamp = boardView.expiry.toNumber();
        var timeToExpiry = Math.max(0, expiryTimestamp - block.timestamp);
        var tradingCutoffTimestamp = expiryTimestamp - market.params.tradingCutoff;
        var timeToTradingCutoff = Math.max(0, tradingCutoffTimestamp - block.timestamp);
        var spotPriceAtExpiry = !boardView.priceAtExpiry.isZero() ? boardView.priceAtExpiry : undefined;
        // Expired flag is determined by priceAtExpiry state being set
        var isExpired = !!spotPriceAtExpiry && timeToExpiry === 0;
        var isTradingCutoff = timeToTradingCutoff === 0;
        var baseIv = !isExpired ? boardView.baseIv : bn_1.ZERO_BN;
        var isPaused = (_a = boardView.isPaused) !== null && _a !== void 0 ? _a : market.isPaused;
        var varianceGwavIv;
        var forceCloseGwavIv;
        if (market.lyra.version === lyra_1.Version.Avalon) {
            var avalonBoardView = boardView;
            // HACK: use forceCloseGwavIV as varianceGwavIv
            varianceGwavIv = avalonBoardView.forceCloseGwavIV;
            forceCloseGwavIv = avalonBoardView.forceCloseGwavIV;
        }
        else {
            var newportBoardView = boardView;
            varianceGwavIv = newportBoardView.varianceGwavIv;
            forceCloseGwavIv = newportBoardView.forceCloseGwavIv;
        }
        return {
            id: id,
            expiryTimestamp: expiryTimestamp,
            tradingCutoffTimestamp: tradingCutoffTimestamp,
            timeToExpiry: timeToExpiry,
            timeToTradingCutoff: timeToTradingCutoff,
            isExpired: isExpired,
            isTradingCutoff: isTradingCutoff,
            spotPriceAtExpiry: spotPriceAtExpiry,
            baseIv: baseIv,
            isPaused: isPaused,
            params: {
                varianceGwavIv: varianceGwavIv,
                forceCloseGwavIv: forceCloseGwavIv,
                isBoardPaused: boardView.isPaused,
            },
        };
    };
    // Getters
    Board.get = function (lyra, marketAddressOrName, boardId) {
        return __awaiter(this, void 0, void 0, function () {
            var market;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, market_1.Market.get(lyra, marketAddressOrName)];
                    case 1:
                        market = _a.sent();
                        return [4 /*yield*/, market.board(boardId)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Board.prototype.refresh = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Board.get(this.lyra, this.market().address, this.id)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // Edges
    Board.prototype.market = function () {
        return this.__market;
    };
    Board.prototype.strikes = function () {
        var _this = this;
        return Object.values(this.liveStrikeMap).map(function (strikeView) {
            return new strike_1.Strike(_this.lyra, _this, strikeView, _this.block);
        });
    };
    Board.prototype.strike = function (strikeId) {
        var strikeView = this.liveStrikeMap[strikeId];
        if (!strikeView) {
            throw new Error('Strike does not exist for board');
        }
        return new strike_1.Strike(this.lyra, this, strikeView, this.block);
    };
    Board.prototype.option = function (strikeId, isCall) {
        var strike = this.strike(strikeId);
        return strike.option(isCall);
    };
    Board.prototype.quote = function (strikeId, isCall, isBuy, size, options) {
        return __awaiter(this, void 0, void 0, function () {
            var board;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.refresh()];
                    case 1:
                        board = _a.sent();
                        return [2 /*return*/, board.quoteSync(strikeId, isCall, isBuy, size, options)];
                }
            });
        });
    };
    Board.prototype.quoteSync = function (strikeId, isCall, isBuy, size, options) {
        return this.option(strikeId, isCall).quoteSync(isBuy, size, options);
    };
    Board.prototype.quoteAll = function (size, options) {
        return __awaiter(this, void 0, void 0, function () {
            var board;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.refresh()];
                    case 1:
                        board = _a.sent();
                        return [2 /*return*/, board.quoteAllSync(size, options)];
                }
            });
        });
    };
    Board.prototype.quoteAllSync = function (size, options) {
        return {
            strikes: this.strikes().map(function (strike) { return strike.quoteAllSync(size, options); }),
            board: this,
        };
    };
    return Board;
}());
exports.Board = Board;
//# sourceMappingURL=index.js.map