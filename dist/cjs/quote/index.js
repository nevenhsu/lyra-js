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
exports.Quote = exports.QuoteDisabledReason = void 0;
var bn_1 = require("../constants/bn");
var contracts_1 = require("../constants/contracts");
var blackScholes_1 = require("../utils/blackScholes");
var fromBigNumber_1 = __importDefault(require("../utils/fromBigNumber"));
var getBreakEvenPrice_1 = __importDefault(require("../utils/getBreakEvenPrice"));
var getPriceType_1 = __importDefault(require("../utils/getPriceType"));
var getQuoteSpotPrice_1 = __importDefault(require("../utils/getQuoteSpotPrice"));
var getTimeToExpiryAnnualized_1 = __importDefault(require("../utils/getTimeToExpiryAnnualized"));
var toBigNumber_1 = __importDefault(require("../utils/toBigNumber"));
var getQuoteDisabledReason_1 = __importDefault(require("./getQuoteDisabledReason"));
var getQuoteIteration_1 = __importDefault(require("./getQuoteIteration"));
var QuoteDisabledReason;
(function (QuoteDisabledReason) {
    QuoteDisabledReason["EmptySize"] = "EmptySize";
    QuoteDisabledReason["Expired"] = "Expired";
    QuoteDisabledReason["TradingCutoff"] = "TradingCutoff";
    QuoteDisabledReason["InsufficientLiquidity"] = "InsufficientLiquidity";
    QuoteDisabledReason["DeltaOutOfRange"] = "DeltaOutOfRange";
    QuoteDisabledReason["VolTooHigh"] = "VolTooHigh";
    QuoteDisabledReason["VolTooLow"] = "VolTooLow";
    QuoteDisabledReason["IVTooHigh"] = "IVTooHigh";
    QuoteDisabledReason["IVTooLow"] = "IVTooLow";
    QuoteDisabledReason["SkewTooHigh"] = "SkewTooHigh";
    QuoteDisabledReason["SkewTooLow"] = "SkewTooLow";
    QuoteDisabledReason["UnableToHedgeDelta"] = "UnableToHedgeDelta";
    QuoteDisabledReason["PriceVarianceTooHigh"] = "PriceVarianceTooHigh";
})(QuoteDisabledReason = exports.QuoteDisabledReason || (exports.QuoteDisabledReason = {}));
var Quote = /** @class */ (function () {
    function Quote(lyra, option, isBuy, size, options) {
        this.__source = contracts_1.DataSource.ContractCall;
        this.lyra = lyra;
        this.__option = option;
        this.isBuy = isBuy;
        this.size = size;
        this.marketName = option.market().name;
        this.marketAddress = option.market().address;
        this.expiryTimestamp = option.board().expiryTimestamp;
        this.boardId = option.board().id;
        this.strikePrice = option.strike().strikePrice;
        this.strikeId = option.strike().id;
        this.isCall = option.isCall;
        var fields = this.getFields(option, isBuy, size, options);
        this.pricePerOption = fields.pricePerOption;
        this.premium = fields.premium;
        this.fee = fields.fee;
        this.feeComponents = fields.feeComponents;
        this.iv = fields.iv;
        this.fairIv = fields.fairIv;
        this.greeks = fields.greeks;
        this.forceClosePenalty = fields.forceClosePenalty;
        this.isForceClose = fields.isForceClose;
        this.isDisabled = !!fields.disabledReason;
        this.disabledReason = fields.disabledReason;
        this.breakEven = fields.breakEven;
        this.toBreakEven = fields.toBreakEven;
        this.spotPrice = fields.spotPrice;
        this.iterations = fields.iterations;
    }
    Quote.prototype.getDisabledFields = function (option, spotPrice, disabledReason) {
        var skew = option.strike().skew;
        var baseIv = option.board().baseIv;
        var iv = skew.mul(baseIv).div(bn_1.UNIT);
        return {
            pricePerOption: bn_1.ZERO_BN,
            premium: bn_1.ZERO_BN,
            iv: iv,
            fairIv: iv,
            fee: bn_1.ZERO_BN,
            feeComponents: {
                optionPriceFee: bn_1.ZERO_BN,
                spotPriceFee: bn_1.ZERO_BN,
                vegaUtilFee: bn_1.ZERO_BN,
                varianceFee: bn_1.ZERO_BN,
            },
            greeks: {
                delta: option.delta,
                vega: option.strike().vega,
                gamma: option.strike().gamma,
                theta: option.theta,
                rho: option.rho,
            },
            isForceClose: false,
            forceClosePenalty: bn_1.ZERO_BN,
            isDisabled: !!disabledReason,
            disabledReason: disabledReason,
            breakEven: bn_1.ZERO_BN,
            toBreakEven: bn_1.ZERO_BN,
            spotPrice: spotPrice,
            iterations: [],
        };
    };
    Quote.prototype.getFields = function (option, isBuy, size, options) {
        var _a, _b, _c, _d;
        var numIterations = (_a = options === null || options === void 0 ? void 0 : options.iterations) !== null && _a !== void 0 ? _a : contracts_1.DEFAULT_ITERATIONS;
        if (numIterations < 1) {
            throw new Error('Iterations must be greater than or equal to 1');
        }
        var isForceClose = (_b = options === null || options === void 0 ? void 0 : options.isForceClose) !== null && _b !== void 0 ? _b : false;
        var isOpen = (_c = options === null || options === void 0 ? void 0 : options.isOpen) !== null && _c !== void 0 ? _c : true;
        var board = option.board();
        var strike = option.strike();
        var market = option.market();
        var isCall = option.isCall;
        // Read isLong for custom quotes (e.g. closing a position)
        // Default to isLong = isBuy
        var isLong = (_d = options === null || options === void 0 ? void 0 : options.isLong) !== null && _d !== void 0 ? _d : isBuy;
        var baseIv = board.baseIv;
        var skew = strike.skew;
        var preTradeAmmNetStdVega = market.params.netStdVega.mul(-1);
        var timeToExpiryAnnualized = (0, getTimeToExpiryAnnualized_1.default)(option.board());
        if (timeToExpiryAnnualized === 0) {
            // Early catch for expired positions
            return this.getDisabledFields(option, market.spotPrice, QuoteDisabledReason.Expired);
        }
        var iterationSize = size.div(numIterations);
        var iterations = [];
        var optionStdVega = strike.params.cachedStdVega.mul(-1);
        var priceType = (0, getPriceType_1.default)(isCall, isForceClose, isLong, isOpen);
        var spotPrice = (0, getQuoteSpotPrice_1.default)(market, priceType);
        for (var i = 0; i < numIterations; i++) {
            var quote = (0, getQuoteIteration_1.default)({
                option: option,
                isBuy: isBuy,
                size: iterationSize,
                spotPrice: spotPrice,
                baseIv: baseIv,
                skew: skew,
                netStdVega: optionStdVega,
                preTradeAmmNetStdVega: preTradeAmmNetStdVega,
                isForceClose: isForceClose,
            });
            iterations.push(quote);
            // Update skew, IV, AMM net std vega
            baseIv = quote.newBaseIv;
            skew = quote.newSkew;
            preTradeAmmNetStdVega = quote.postTradeAmmNetStdVega;
        }
        var fairIv = baseIv.mul(skew).div(bn_1.UNIT);
        var strikePrice = option.strike().strikePrice;
        var rate = option.market().params.rateAndCarry;
        var delta = (0, toBigNumber_1.default)((0, blackScholes_1.getDelta)(timeToExpiryAnnualized, (0, fromBigNumber_1.default)(fairIv), (0, fromBigNumber_1.default)(spotPrice), (0, fromBigNumber_1.default)(strikePrice), (0, fromBigNumber_1.default)(rate), isCall));
        var vega = (0, toBigNumber_1.default)((0, blackScholes_1.getVega)(timeToExpiryAnnualized, (0, fromBigNumber_1.default)(fairIv), (0, fromBigNumber_1.default)(spotPrice), (0, fromBigNumber_1.default)(strikePrice), (0, fromBigNumber_1.default)(rate)));
        var gamma = fairIv.gt(0) && spotPrice.gt(0)
            ? (0, toBigNumber_1.default)((0, blackScholes_1.getGamma)(timeToExpiryAnnualized, (0, fromBigNumber_1.default)(fairIv), (0, fromBigNumber_1.default)(spotPrice), (0, fromBigNumber_1.default)(strikePrice), (0, fromBigNumber_1.default)(rate)))
            : bn_1.ZERO_BN;
        var theta = fairIv.gt(0) && spotPrice.gt(0)
            ? (0, toBigNumber_1.default)((0, blackScholes_1.getTheta)(timeToExpiryAnnualized, (0, fromBigNumber_1.default)(fairIv), (0, fromBigNumber_1.default)(spotPrice), (0, fromBigNumber_1.default)(strikePrice), (0, fromBigNumber_1.default)(rate), isCall))
            : bn_1.ZERO_BN;
        var rho = fairIv.gt(0) && spotPrice.gt(0)
            ? (0, toBigNumber_1.default)((0, blackScholes_1.getRho)(timeToExpiryAnnualized, (0, fromBigNumber_1.default)(fairIv), (0, fromBigNumber_1.default)(spotPrice), (0, fromBigNumber_1.default)(strikePrice), (0, fromBigNumber_1.default)(rate), isCall))
            : bn_1.ZERO_BN;
        var premium = iterations.reduce(function (sum, quote) { return sum.add(quote.premium); }, bn_1.ZERO_BN);
        var disabledReason = (0, getQuoteDisabledReason_1.default)(option, spotPrice, size, premium, fairIv, skew, baseIv, isBuy, isForceClose, priceType, isOpen);
        if (disabledReason) {
            // For subset of disabled reasons, return empty quote
            switch (disabledReason) {
                case QuoteDisabledReason.EmptySize:
                case QuoteDisabledReason.Expired:
                case QuoteDisabledReason.IVTooHigh:
                case QuoteDisabledReason.IVTooLow:
                case QuoteDisabledReason.SkewTooHigh:
                case QuoteDisabledReason.SkewTooLow:
                case QuoteDisabledReason.VolTooHigh:
                case QuoteDisabledReason.VolTooLow:
                    return this.getDisabledFields(option, spotPrice, disabledReason);
            }
        }
        // Pricing
        var pricePerOption = premium.mul(bn_1.UNIT).div(size);
        var breakEven = (0, getBreakEvenPrice_1.default)(option.isCall, strike.strikePrice, premium.mul(bn_1.UNIT).div(size));
        var breakEvenDiff = breakEven.sub(spotPrice);
        var toBreakEven = this.isCall
            ? spotPrice.gt(breakEven)
                ? bn_1.ZERO_BN
                : breakEvenDiff
            : spotPrice.lt(breakEven)
                ? bn_1.ZERO_BN
                : breakEvenDiff;
        var forceClosePenalty = iterations.reduce(function (sum, quote) { return sum.add(quote.forceClosePenalty); }, bn_1.ZERO_BN);
        // Fees
        var optionPriceFee = iterations.reduce(function (sum, quote) { return sum.add(quote.optionPriceFee); }, bn_1.ZERO_BN);
        var spotPriceFee = iterations.reduce(function (sum, quote) { return sum.add(quote.spotPriceFee); }, bn_1.ZERO_BN);
        var vegaUtilFee = iterations.reduce(function (sum, quote) { return sum.add(quote.vegaUtilFee.vegaUtilFee); }, bn_1.ZERO_BN);
        var varianceFee = iterations.reduce(function (sum, quote) { return sum.add(quote.varianceFee.varianceFee); }, bn_1.ZERO_BN);
        var fee = optionPriceFee.add(spotPriceFee).add(vegaUtilFee).add(varianceFee);
        var ivFeeFactor = fee.gt(0) && vega.gt(0) ? fee.mul(bn_1.UNIT).div(vega).div(100) : bn_1.ZERO_BN;
        var iv = isBuy ? fairIv.add(ivFeeFactor) : fairIv.sub(ivFeeFactor);
        return {
            pricePerOption: pricePerOption,
            premium: premium,
            fee: fee,
            iv: iv,
            fairIv: fairIv,
            feeComponents: {
                optionPriceFee: optionPriceFee,
                spotPriceFee: spotPriceFee,
                vegaUtilFee: vegaUtilFee,
                varianceFee: varianceFee,
            },
            greeks: {
                delta: delta,
                vega: vega,
                gamma: gamma,
                rho: rho,
                theta: theta,
            },
            isForceClose: isForceClose,
            forceClosePenalty: forceClosePenalty,
            isDisabled: !!disabledReason,
            disabledReason: disabledReason,
            breakEven: breakEven,
            toBreakEven: toBreakEven,
            spotPrice: spotPrice,
            iterations: iterations,
        };
    };
    // Getters
    Quote.get = function (lyra, marketAddressOrName, strikeId, isCall, isBuy, size, options) {
        return __awaiter(this, void 0, void 0, function () {
            var option;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, lyra.option(marketAddressOrName, strikeId, isCall)];
                    case 1:
                        option = _a.sent();
                        return [2 /*return*/, Quote.getSync(lyra, option, isBuy, size, options)];
                }
            });
        });
    };
    Quote.getSync = function (lyra, option, isBuy, size, options) {
        return new Quote(lyra, option, isBuy, size, options);
    };
    // Edges
    Quote.prototype.market = function () {
        return this.__option.market();
    };
    Quote.prototype.board = function () {
        return this.__option.board();
    };
    Quote.prototype.strike = function () {
        return this.__option.strike();
    };
    Quote.prototype.option = function () {
        return this.__option;
    };
    return Quote;
}());
exports.Quote = Quote;
//# sourceMappingURL=index.js.map