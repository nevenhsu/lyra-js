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
exports.Option = void 0;
var bn_1 = require("../constants/bn");
var contracts_1 = require("../constants/contracts");
var market_1 = require("../market");
var quote_1 = require("../quote");
var blackScholes_1 = require("../utils/blackScholes");
var fetchOptionPriceHistory_1 = __importDefault(require("../utils/fetchOptionPriceHistory"));
var fetchOptionVolumeHistory_1 = __importDefault(require("../utils/fetchOptionVolumeHistory"));
var fromBigNumber_1 = __importDefault(require("../utils/fromBigNumber"));
var getTimeToExpiryAnnualized_1 = __importDefault(require("../utils/getTimeToExpiryAnnualized"));
var toBigNumber_1 = __importDefault(require("../utils/toBigNumber"));
var Option = /** @class */ (function () {
    function Option(lyra, strike, isCall, block) {
        this.__source = contracts_1.DataSource.ContractCall;
        this.lyra = lyra;
        this.__strike = strike;
        this.block = block;
        this.isCall = isCall;
        var fields = Option.getFields(strike, isCall);
        this.price = fields.price;
        this.longOpenInterest = fields.longOpenInterest;
        this.shortOpenInterest = fields.shortOpenInterest;
        this.delta = fields.delta;
        this.rho = fields.rho;
        this.theta = fields.theta;
        this.isInTheMoney = fields.isInTheMoney;
    }
    // TODO: @dappbeast Remove getFields
    Option.getFields = function (strike, isCall) {
        var _a;
        var market = strike.market();
        var timeToExpiryAnnualized = (0, getTimeToExpiryAnnualized_1.default)(strike.board());
        var spotPrice = (_a = strike.board().spotPriceAtExpiry) !== null && _a !== void 0 ? _a : market.spotPrice;
        var isInTheMoney = isCall ? spotPrice.gt(strike.strikePrice) : spotPrice.lt(strike.strikePrice);
        if (timeToExpiryAnnualized === 0) {
            return {
                longOpenInterest: bn_1.ZERO_BN,
                shortOpenInterest: bn_1.ZERO_BN,
                price: bn_1.ZERO_BN,
                delta: bn_1.ZERO_BN,
                theta: bn_1.ZERO_BN,
                rho: bn_1.ZERO_BN,
                isInTheMoney: isInTheMoney,
            };
        }
        else {
            var longOpenInterest = isCall ? strike.longCallOpenInterest : strike.longPutOpenInterest;
            var shortOpenInterest = isCall ? strike.shortCallOpenInterest : strike.shortPutOpenInterest;
            var spotPriceNum = (0, fromBigNumber_1.default)(spotPrice);
            var strikePriceNum = (0, fromBigNumber_1.default)(strike.strikePrice);
            var rate = (0, fromBigNumber_1.default)(market.params.rateAndCarry);
            var strikeIV = (0, fromBigNumber_1.default)(strike.iv);
            var price = (0, toBigNumber_1.default)((0, blackScholes_1.getBlackScholesPrice)(timeToExpiryAnnualized, strikeIV, spotPriceNum, strikePriceNum, rate, isCall));
            var delta = strikeIV > 0
                ? (0, toBigNumber_1.default)((0, blackScholes_1.getDelta)(timeToExpiryAnnualized, strikeIV, spotPriceNum, strikePriceNum, rate, isCall))
                : bn_1.ZERO_BN;
            var theta = strikeIV > 0
                ? (0, toBigNumber_1.default)((0, blackScholes_1.getTheta)(timeToExpiryAnnualized, strikeIV, spotPriceNum, strikePriceNum, rate, isCall))
                : bn_1.ZERO_BN;
            var rho = strikeIV > 0
                ? (0, toBigNumber_1.default)((0, blackScholes_1.getRho)(timeToExpiryAnnualized, strikeIV, spotPriceNum, strikePriceNum, rate, isCall))
                : bn_1.ZERO_BN;
            return {
                longOpenInterest: longOpenInterest,
                shortOpenInterest: shortOpenInterest,
                price: price,
                delta: delta,
                theta: theta,
                rho: rho,
                isInTheMoney: isInTheMoney,
            };
        }
    };
    // Getters
    Option.get = function (lyra, marketAddressOrName, strikeId, isCall) {
        return __awaiter(this, void 0, void 0, function () {
            var market;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, market_1.Market.get(lyra, marketAddressOrName)];
                    case 1:
                        market = _a.sent();
                        return [4 /*yield*/, market.option(strikeId, isCall)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Option.prototype.refresh = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, Option.get(this.lyra, this.market().address, this.strike().id, this.isCall)];
            });
        });
    };
    // Edges
    Option.prototype.market = function () {
        return this.__strike.market();
    };
    Option.prototype.board = function () {
        return this.__strike.board();
    };
    Option.prototype.strike = function () {
        return this.__strike;
    };
    Option.prototype.quote = function (isBuy, size, options) {
        return __awaiter(this, void 0, void 0, function () {
            var option;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.refresh()];
                    case 1:
                        option = _a.sent();
                        return [2 /*return*/, option.quoteSync(isBuy, size, options)];
                }
            });
        });
    };
    Option.prototype.quoteSync = function (isBuy, size, options) {
        return quote_1.Quote.getSync(this.lyra, this, isBuy, size, options);
    };
    Option.prototype.quoteAll = function (size, options) {
        return __awaiter(this, void 0, void 0, function () {
            var option;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.refresh()];
                    case 1:
                        option = _a.sent();
                        return [2 /*return*/, option.quoteAllSync(size, options)];
                }
            });
        });
    };
    Option.prototype.quoteAllSync = function (size, options) {
        return {
            option: this,
            bid: this.quoteSync(false, size, options),
            ask: this.quoteSync(true, size, options),
        };
    };
    Option.prototype.tradingVolumeHistory = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, fetchOptionVolumeHistory_1.default)(this.lyra, this, options)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Option.prototype.priceHistory = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, fetchOptionPriceHistory_1.default)(this.lyra, this, options)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return Option;
}());
exports.Option = Option;
//# sourceMappingURL=index.js.map