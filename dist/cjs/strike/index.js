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
exports.Strike = void 0;
var bn_1 = require("../constants/bn");
var contracts_1 = require("../constants/contracts");
var market_1 = require("../market");
var option_1 = require("../option");
var blackScholes_1 = require("../utils/blackScholes");
var fetchStrikeIVHistory_1 = __importDefault(require("../utils/fetchStrikeIVHistory"));
var fromBigNumber_1 = __importDefault(require("../utils/fromBigNumber"));
var getTimeToExpiryAnnualized_1 = __importDefault(require("../utils/getTimeToExpiryAnnualized"));
var toBigNumber_1 = __importDefault(require("../utils/toBigNumber"));
var Strike = /** @class */ (function () {
    function Strike(lyra, board, strikeView, block) {
        this.__source = contracts_1.DataSource.ContractCall;
        this.lyra = lyra;
        this.__board = board;
        var fields = Strike.getFields(board, strikeView);
        this.block = block;
        this.id = fields.id;
        this.strikePrice = fields.strikePrice;
        this.skew = fields.skew;
        this.iv = fields.iv;
        this.vega = fields.vega;
        this.gamma = fields.gamma;
        this.isDeltaInRange = fields.isDeltaInRange;
        this.openInterest = fields.openInterest;
        this.longCallOpenInterest = fields.longCallOpenInterest;
        this.shortCallOpenInterest = fields.shortCallOpenInterest;
        this.longPutOpenInterest = fields.longPutOpenInterest;
        this.shortPutOpenInterest = fields.shortPutOpenInterest;
        this.params = fields.params;
    }
    Strike.getFields = function (board, strikeView) {
        var id = strikeView.strikeId.toNumber();
        var strikePrice = strikeView.strikePrice;
        var timeToExpiryAnnualized = (0, getTimeToExpiryAnnualized_1.default)(board);
        var skew = strikeView.skew;
        var iv = board.baseIv.mul(strikeView.skew).div(bn_1.UNIT);
        var params = {
            forceCloseSkew: strikeView.forceCloseSkew,
            cachedStdVega: strikeView.cachedGreeks.stdVega,
        };
        if (timeToExpiryAnnualized === 0) {
            return {
                id: id,
                strikePrice: strikePrice,
                skew: bn_1.ZERO_BN,
                iv: bn_1.ZERO_BN,
                vega: bn_1.ZERO_BN,
                gamma: bn_1.ZERO_BN,
                openInterest: bn_1.ZERO_BN,
                longCallOpenInterest: bn_1.ZERO_BN,
                shortCallOpenInterest: bn_1.ZERO_BN,
                longPutOpenInterest: bn_1.ZERO_BN,
                shortPutOpenInterest: bn_1.ZERO_BN,
                isDeltaInRange: false,
                params: params,
            };
        }
        else {
            var ivNum = (0, fromBigNumber_1.default)(iv);
            var spotPrice = (0, fromBigNumber_1.default)(board.market().spotPrice);
            var strikePriceNum = (0, fromBigNumber_1.default)(strikePrice);
            var rate = (0, fromBigNumber_1.default)(board.market().params.rateAndCarry);
            var vega = ivNum > 0 && spotPrice > 0
                ? (0, toBigNumber_1.default)((0, blackScholes_1.getVega)(timeToExpiryAnnualized, ivNum, spotPrice, strikePriceNum, rate))
                : bn_1.ZERO_BN;
            var gamma = ivNum > 0 && spotPrice > 0
                ? (0, toBigNumber_1.default)((0, blackScholes_1.getGamma)(timeToExpiryAnnualized, ivNum, spotPrice, strikePriceNum, rate))
                : bn_1.ZERO_BN;
            var callDelta = ivNum > 0 && spotPrice > 0
                ? (0, toBigNumber_1.default)((0, blackScholes_1.getDelta)(timeToExpiryAnnualized, ivNum, spotPrice, strikePriceNum, rate, true))
                : bn_1.ZERO_BN;
            var minDelta = board.market().params.minDelta;
            var isDeltaInRange = callDelta.gte(minDelta) && callDelta.lte(bn_1.ONE_BN.sub(minDelta));
            var longCallOpenInterest = strikeView.longCallOpenInterest;
            var shortCallOpenInterest = strikeView.shortCallBaseOpenInterest.add(strikeView.shortCallQuoteOpenInterest);
            var longPutOpenInterest = strikeView.longPutOpenInterest;
            var shortPutOpenInterest = strikeView.shortPutOpenInterest;
            var openInterest = longCallOpenInterest
                .add(shortCallOpenInterest)
                .add(longPutOpenInterest)
                .add(shortPutOpenInterest);
            return {
                id: id,
                strikePrice: strikePrice,
                skew: skew,
                iv: iv,
                vega: vega,
                gamma: gamma,
                isDeltaInRange: isDeltaInRange,
                openInterest: openInterest,
                longCallOpenInterest: longCallOpenInterest,
                shortCallOpenInterest: shortCallOpenInterest,
                longPutOpenInterest: longPutOpenInterest,
                shortPutOpenInterest: shortPutOpenInterest,
                params: params,
            };
        }
    };
    // Getters
    Strike.get = function (lyra, marketAddressOrName, strikeId) {
        return __awaiter(this, void 0, void 0, function () {
            var market;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, market_1.Market.get(lyra, marketAddressOrName)];
                    case 1:
                        market = _a.sent();
                        return [4 /*yield*/, market.strike(strikeId)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Strike.prototype.refresh = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, Strike.get(this.lyra, this.market().address, this.id)];
            });
        });
    };
    // Dynamic Fields
    Strike.prototype.ivHistory = function (lyra, options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, fetchStrikeIVHistory_1.default)(lyra, this, options)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // Edges
    Strike.prototype.market = function () {
        return this.__board.market();
    };
    Strike.prototype.board = function () {
        return this.__board;
    };
    Strike.prototype.call = function () {
        return new option_1.Option(this.lyra, this, true, this.block);
    };
    Strike.prototype.put = function () {
        return new option_1.Option(this.lyra, this, false, this.block);
    };
    Strike.prototype.option = function (isCall) {
        return isCall ? this.call() : this.put();
    };
    Strike.prototype.quote = function (isCall, isBuy, size, options) {
        return __awaiter(this, void 0, void 0, function () {
            var strike;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.refresh()];
                    case 1:
                        strike = _a.sent();
                        return [2 /*return*/, strike.quoteSync(isCall, isBuy, size, options)];
                }
            });
        });
    };
    Strike.prototype.quoteSync = function (isCall, isBuy, size, options) {
        return this.option(isCall).quoteSync(isBuy, size, options);
    };
    Strike.prototype.quoteAll = function (size, options) {
        return __awaiter(this, void 0, void 0, function () {
            var strike;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.refresh()];
                    case 1:
                        strike = _a.sent();
                        return [2 /*return*/, strike.quoteAllSync(size, options)];
                }
            });
        });
    };
    Strike.prototype.quoteAllSync = function (size, options) {
        var _a = this.option(true).quoteAllSync(size, options), callBid = _a.bid, callAsk = _a.ask;
        var _b = this.option(false).quoteAllSync(size, options), putBid = _b.bid, putAsk = _b.ask;
        return {
            strike: this,
            callBid: callBid,
            callAsk: callAsk,
            putBid: putBid,
            putAsk: putAsk,
        };
    };
    return Strike;
}());
exports.Strike = Strike;
//# sourceMappingURL=index.js.map