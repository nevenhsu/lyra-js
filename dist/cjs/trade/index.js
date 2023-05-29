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
exports.Trade = exports.TradeDisabledReason = void 0;
var bignumber_1 = require("@ethersproject/bignumber");
var bn_1 = require("../constants/bn");
var contracts_1 = require("../constants/contracts");
var lyra_1 = require("../lyra");
var position_1 = require("../position");
var quote_1 = require("../quote");
var buildTx_1 = __importDefault(require("../utils/buildTx"));
var convertBNDecimals_1 = require("../utils/convertBNDecimals");
var fromBigNumber_1 = __importDefault(require("../utils/fromBigNumber"));
var getAverageCollateralSpotPrice_1 = __importDefault(require("../utils/getAverageCollateralSpotPrice"));
var getAverageCostPerOption_1 = __importDefault(require("../utils/getAverageCostPerOption"));
var getBreakEvenPrice_1 = __importDefault(require("../utils/getBreakEvenPrice"));
var getERC20Contract_1 = __importDefault(require("../utils/getERC20Contract"));
var getLyraMarketContract_1 = __importDefault(require("../utils/getLyraMarketContract"));
var getOptionType_1 = __importDefault(require("../utils/getOptionType"));
var getProjectedSettlePnl_1 = __importDefault(require("../utils/getProjectedSettlePnl"));
var getTradePnl_1 = __importDefault(require("../utils/getTradePnl"));
var parsePartialPositionUpdatedEventsFromLogs_1 = __importDefault(require("../utils/parsePartialPositionUpdatedEventsFromLogs"));
var parsePartialTradeEventsFromLogs_1 = __importDefault(require("../utils/parsePartialTradeEventsFromLogs"));
var toBigNumber_1 = __importDefault(require("../utils/toBigNumber"));
var getMaxLoss_1 = __importDefault(require("./getMaxLoss"));
var getMaxProfit_1 = __importDefault(require("./getMaxProfit"));
var getTradeCollateral_1 = __importDefault(require("./getTradeCollateral"));
var getTradeDisabledReason_1 = __importDefault(require("./getTradeDisabledReason"));
var TradeDisabledReason;
(function (TradeDisabledReason) {
    TradeDisabledReason["EmptySize"] = "EmptySize";
    TradeDisabledReason["Expired"] = "Expired";
    TradeDisabledReason["TradingCutoff"] = "TradingCutoff";
    TradeDisabledReason["InsufficientLiquidity"] = "InsufficientLiquidity";
    TradeDisabledReason["DeltaOutOfRange"] = "DeltaOutOfRange";
    TradeDisabledReason["VolTooHigh"] = "VolTooHigh";
    TradeDisabledReason["VolTooLow"] = "VolTooLow";
    TradeDisabledReason["IVTooHigh"] = "IVTooHigh";
    TradeDisabledReason["IVTooLow"] = "IVTooLow";
    TradeDisabledReason["SkewTooHigh"] = "SkewTooHigh";
    TradeDisabledReason["SkewTooLow"] = "SkewTooLow";
    TradeDisabledReason["NotEnoughCollateral"] = "NotEnoughCollateral";
    TradeDisabledReason["TooMuchCollateral"] = "TooMuchCollateral";
    TradeDisabledReason["EmptyCollateral"] = "EmptyCollateral";
    TradeDisabledReason["IncorrectOwner"] = "IncorrectOwner";
    TradeDisabledReason["PositionClosed"] = "PositionClosed";
    TradeDisabledReason["PositionNotLargeEnough"] = "PositionNotLargeEnough";
    TradeDisabledReason["PositionClosedLeftoverCollateral"] = "PositionClosedLeftoverCollateral";
    TradeDisabledReason["InsufficientQuoteAllowance"] = "InsufficientQuoteAllowance";
    TradeDisabledReason["InsufficientBaseAllowance"] = "InsufficientBaseAllowance";
    TradeDisabledReason["InsufficientQuoteBalance"] = "InsufficientQuoteBalance";
    TradeDisabledReason["InsufficientBaseBalance"] = "InsufficientBaseBalance";
    TradeDisabledReason["UnableToHedgeDelta"] = "UnableToHedgeDelta";
    TradeDisabledReason["PriceVarianceTooHigh"] = "PriceVarianceTooHigh";
})(TradeDisabledReason = exports.TradeDisabledReason || (exports.TradeDisabledReason = {}));
var Trade = /** @class */ (function () {
    function Trade(lyra, owner, option, isBuy, size, slippage, balances, options) {
        var _a, _b, _c, _d, _e, _f;
        this.__source = contracts_1.DataSource.ContractCall;
        var _g = options !== null && options !== void 0 ? options : {}, position = _g.position, _h = _g.setToCollateral, setToCollateral = _h === void 0 ? bn_1.ZERO_BN : _h, _j = _g.setToFullCollateral, setToFullCollateral = _j === void 0 ? false : _j, _k = _g.iterations, iterations = _k === void 0 ? contracts_1.DEFAULT_ITERATIONS : _k, _isBaseCollateral = _g.isBaseCollateral, _l = _g.referrer, referrer = _l === void 0 ? bn_1.ZERO_ADDRESS : _l;
        this.__option = option;
        this.__position = position;
        this.__balances = balances;
        var strike = option.strike();
        var market = option.market();
        var board = option.board();
        // References
        this.lyra = lyra;
        this.marketName = market.name;
        this.marketAddress = market.address;
        this.expiryTimestamp = board.expiryTimestamp;
        this.boardId = board.id;
        this.strikePrice = strike.strikePrice;
        this.strikeId = strike.id;
        this.isCall = option.isCall;
        this.positionId = position === null || position === void 0 ? void 0 : position.id;
        // Check if opening or closing active position
        this.isBuy = isBuy;
        this.isOpen = position ? (isBuy && position.isLong) || (!isBuy && !position.isLong) : true;
        this.owner = owner;
        this.isLong = position ? position.isLong : isBuy;
        var isBaseCollateral = position ? (_a = position.collateral) === null || _a === void 0 ? void 0 : _a.isBase : _isBaseCollateral;
        this.size = size;
        var quote = quote_1.Quote.getSync(lyra, option, this.isBuy, this.size, {
            iterations: iterations,
            isOpen: this.isOpen,
            isLong: this.isLong,
        });
        if (!this.isOpen &&
            (quote.disabledReason === quote_1.QuoteDisabledReason.DeltaOutOfRange ||
                quote.disabledReason === quote_1.QuoteDisabledReason.TradingCutoff ||
                quote.disabledReason === quote_1.QuoteDisabledReason.PriceVarianceTooHigh)) {
            // Retry quote with force close flag
            quote = quote_1.Quote.getSync(lyra, option, this.isBuy, this.size, {
                iterations: iterations,
                isOpen: this.isOpen,
                isLong: this.isLong,
                isForceClose: true,
            });
        }
        this.isForceClose = quote.isForceClose;
        this.iv = quote.iv;
        this.fairIv = quote.fairIv;
        this.greeks = quote.greeks;
        this.fee = quote.fee;
        this.feeComponents = quote.feeComponents;
        this.forceClosePenalty = quote.forceClosePenalty;
        this.spotPrice = quote.spotPrice;
        this.iterations = quote.iterations;
        // Initialize tokens
        this.quoteToken = __assign(__assign({}, market.quoteToken), { transfer: bn_1.ZERO_BN, receive: bn_1.ZERO_BN, balance: balances.quoteAsset.balance, newBalance: balances.quoteAsset.balance });
        this.baseToken = __assign(__assign({}, market.baseToken), { transfer: bn_1.ZERO_BN, receive: bn_1.ZERO_BN, balance: balances.baseAsset.balance, newBalance: balances.baseAsset.balance });
        this.quoted = quote.premium;
        this.pricePerOption = bn_1.ZERO_BN;
        this.premium = bn_1.ZERO_BN;
        this.newSize = position ? (this.isOpen ? position.size.add(size) : position.size.sub(size)) : size;
        if (this.newSize.lt(0)) {
            this.newSize = bn_1.ZERO_BN;
        }
        this.prevSize = (_b = position === null || position === void 0 ? void 0 : position.size) !== null && _b !== void 0 ? _b : bn_1.ZERO_BN;
        var minOrMaxPremium = quote.premium.mul((0, toBigNumber_1.default)(isBuy ? 1 + slippage : 1 - slippage)).div(bn_1.UNIT);
        this.slippage = slippage
            ? slippage
            : minOrMaxPremium.gt(0)
                ? 1 - (0, fromBigNumber_1.default)(quote.premium.mul(bn_1.UNIT).div(minOrMaxPremium))
                : 0;
        // Use min/max premium for true price per option
        this.premium = minOrMaxPremium;
        this.pricePerOption = size.gt(0) ? this.premium.mul(bn_1.UNIT).div(size) : bn_1.ZERO_BN;
        var netQuoteTransfer = this.quoteToken.transfer;
        var netBaseTransfer = this.baseToken.transfer;
        if (isBuy) {
            // Transferring premium to AMM
            netQuoteTransfer = netQuoteTransfer.add(this.premium);
        }
        else {
            // Receiveing premium from AMM
            netQuoteTransfer = netQuoteTransfer.sub(this.premium);
        }
        // If opening a short position or modifying an existing short position, check collateral
        if ((this.isOpen && !this.isBuy) || (position && !position.isLong)) {
            this.collateral = (0, getTradeCollateral_1.default)({
                option: option,
                postTradeSize: this.newSize,
                setToCollateral: setToCollateral,
                setToFullCollateral: setToFullCollateral,
                isBaseCollateral: isBaseCollateral,
            });
            // Get collateral change
            var collateralDiff = this.collateral.amount.sub((_d = (_c = position === null || position === void 0 ? void 0 : position.collateral) === null || _c === void 0 ? void 0 : _c.amount) !== null && _d !== void 0 ? _d : bn_1.ZERO_BN);
            if (this.collateral.isBase) {
                netBaseTransfer = netBaseTransfer.add(collateralDiff);
            }
            else {
                netQuoteTransfer = netQuoteTransfer.add(collateralDiff);
            }
        }
        if (netQuoteTransfer.gt(0)) {
            this.quoteToken.transfer = (0, convertBNDecimals_1.from18DecimalBN)(netQuoteTransfer, this.quoteToken.decimals);
        }
        else {
            this.quoteToken.receive = (0, convertBNDecimals_1.from18DecimalBN)(netQuoteTransfer.abs(), this.quoteToken.decimals);
        }
        if (netBaseTransfer.gt(0)) {
            this.baseToken.transfer = (0, convertBNDecimals_1.from18DecimalBN)(netBaseTransfer, this.baseToken.decimals);
        }
        else {
            this.baseToken.receive = (0, convertBNDecimals_1.from18DecimalBN)(netBaseTransfer.abs(), this.baseToken.decimals);
        }
        this.quoteToken.newBalance = this.quoteToken.transfer.gt(0)
            ? this.quoteToken.balance.sub(this.quoteToken.transfer)
            : this.quoteToken.balance.add(this.quoteToken.receive);
        this.baseToken.newBalance = this.baseToken.transfer.gt(0)
            ? this.baseToken.balance.sub(this.baseToken.transfer)
            : this.baseToken.balance.add(this.baseToken.receive);
        this.isCollateralUpdate = !!(this.collateral && this.size.isZero() && this.collateral.amount.gt(0));
        var strikeIdBN = bignumber_1.BigNumber.from(strike.id);
        var positionIdBN = position ? bignumber_1.BigNumber.from(position.id) : bn_1.ZERO_BN;
        var iterationsBN = bignumber_1.BigNumber.from(iterations);
        var amount = size;
        var optionType = (0, getOptionType_1.default)(option.isCall, this.isLong, !!isBaseCollateral);
        var setCollateralTo = (_f = (_e = this.collateral) === null || _e === void 0 ? void 0 : _e.amount) !== null && _f !== void 0 ? _f : bn_1.ZERO_BN;
        var minTotalCost = !isBuy && minOrMaxPremium.gt(bn_1.ZERO_BN) ? minOrMaxPremium : bn_1.ZERO_BN;
        var maxTotalCost = isBuy ? minOrMaxPremium : bn_1.MAX_BN;
        this.contract = (0, getLyraMarketContract_1.default)(lyra, market.contractAddresses, lyra.version, contracts_1.LyraMarketContractId.OptionMarket);
        this.method =
            this.isOpen || this.isCollateralUpdate
                ? 'openPosition'
                : !this.isForceClose
                    ? 'closePosition'
                    : 'forceClosePosition';
        if (lyra.version === lyra_1.Version.Avalon) {
            this.params = [
                {
                    strikeId: strikeIdBN,
                    positionId: positionIdBN,
                    iterations: iterationsBN,
                    optionType: optionType,
                    amount: amount,
                    setCollateralTo: setCollateralTo,
                    minTotalCost: minTotalCost,
                    maxTotalCost: maxTotalCost,
                },
            ];
        }
        else {
            this.params = [
                {
                    strikeId: strikeIdBN,
                    positionId: positionIdBN,
                    iterations: iterationsBN,
                    optionType: optionType,
                    amount: amount,
                    setCollateralTo: setCollateralTo,
                    minTotalCost: minTotalCost,
                    maxTotalCost: maxTotalCost,
                    referrer: referrer,
                },
            ];
        }
        this.data = this.contract.interface.encodeFunctionData(this.method, this.params);
        this.disabledReason = (0, getTradeDisabledReason_1.default)({
            isOpen: this.isOpen,
            owner: this.owner,
            size: this.size,
            newSize: this.newSize,
            quote: quote,
            position: position,
            collateral: this.collateral,
            balances: balances,
            quoteTransfer: this.quoteToken.transfer,
            baseTransfer: this.baseToken.transfer,
        });
        this.isDisabled = !!this.disabledReason;
        this.tx = (0, buildTx_1.default)(this.lyra.provider, this.lyra.provider.network.chainId, (0, getLyraMarketContract_1.default)(lyra, market.contractAddresses, lyra.version, contracts_1.LyraMarketContractId.OptionMarket).address, owner, this.data);
    }
    // Getters
    Trade.get = function (lyra, owner, marketAddressOrName, strikeId, isCall, isBuy, size, slippage, options) {
        return __awaiter(this, void 0, void 0, function () {
            var maybeFetchPosition, _a, position, balances, option;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        maybeFetchPosition = function () { return __awaiter(_this, void 0, void 0, function () { var _a; return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    if (!(options === null || options === void 0 ? void 0 : options.positionId)) return [3 /*break*/, 2];
                                    return [4 /*yield*/, position_1.Position.get(lyra, marketAddressOrName, options.positionId)];
                                case 1:
                                    _a = _b.sent();
                                    return [3 /*break*/, 3];
                                case 2:
                                    _a = undefined;
                                    _b.label = 3;
                                case 3: return [2 /*return*/, _a];
                            }
                        }); }); };
                        return [4 /*yield*/, Promise.all([
                                maybeFetchPosition(),
                                lyra.account(owner).marketBalances(marketAddressOrName),
                            ])];
                    case 1:
                        _a = _b.sent(), position = _a[0], balances = _a[1];
                        option = balances.market.liveOption(strikeId, isCall);
                        return [2 /*return*/, new Trade(lyra, owner, option, isBuy, size, slippage, balances, __assign(__assign({}, options), { position: position }))];
                }
            });
        });
    };
    Trade.getSync = function (lyra, owner, option, isBuy, size, slippage, balances, options) {
        return new Trade(lyra, owner, option, isBuy, size, slippage, balances, options);
    };
    // Helper Functions
    Trade.getPositionIdsForLogs = function (logs, network) {
        var trades = (0, parsePartialTradeEventsFromLogs_1.default)(logs, network);
        var updates = (0, parsePartialPositionUpdatedEventsFromLogs_1.default)(logs, network);
        var positionIds = __spreadArray(__spreadArray([], trades.map(function (t) { return t.args.positionId.toNumber(); }), true), updates.map(function (u) { return u.args.positionId.toNumber(); }), true);
        return Array.from(new Set(positionIds));
    };
    Trade.getEventsForLogs = function (logs, network) {
        var trades = (0, parsePartialTradeEventsFromLogs_1.default)(logs, network);
        var updates = (0, parsePartialPositionUpdatedEventsFromLogs_1.default)(logs, network);
        return { trades: trades, updates: updates };
    };
    // Transactions
    Trade.approveQuote = function (market, owner, amountQuote) {
        var optionMarket = (0, getLyraMarketContract_1.default)(market.lyra, market.contractAddresses, market.lyra.version, contracts_1.LyraMarketContractId.OptionMarket);
        var erc20 = (0, getERC20Contract_1.default)(market.lyra.provider, market.quoteToken.address);
        var data = erc20.interface.encodeFunctionData('approve', [optionMarket.address, amountQuote]);
        return (0, buildTx_1.default)(market.lyra.provider, market.lyra.provider.network.chainId, erc20.address, owner, data);
    };
    Trade.prototype.approveQuote = function (amountQuote) {
        return Trade.approveQuote(this.market(), this.owner, amountQuote);
    };
    Trade.approveBase = function (market, owner, amountBase) {
        var optionMarket = (0, getLyraMarketContract_1.default)(market.lyra, market.contractAddresses, market.lyra.version, contracts_1.LyraMarketContractId.OptionMarket);
        var erc20 = (0, getERC20Contract_1.default)(market.lyra.provider, market.baseToken.address);
        var data = erc20.interface.encodeFunctionData('approve', [optionMarket.address, amountBase]);
        return (0, buildTx_1.default)(market.lyra.provider, market.lyra.provider.network.chainId, erc20.address, owner, data);
    };
    Trade.prototype.approveBase = function (amountBase) {
        return Trade.approveBase(this.market(), this.owner, amountBase);
    };
    // Dynamic Fields
    Trade.prototype.pnl = function () {
        var position = this.__position;
        return position ? (0, getTradePnl_1.default)(position, this) : bn_1.ZERO_BN;
    };
    Trade.prototype.newAverageCostPerOption = function () {
        var position = this.__position;
        var trades = position ? position.trades().concat([this]) : [this];
        return (0, getAverageCostPerOption_1.default)(trades);
    };
    Trade.prototype.prevAverageCostPerOption = function () {
        var position = this.__position;
        return position ? (0, getAverageCostPerOption_1.default)(position.trades()) : bn_1.ZERO_BN;
    };
    Trade.prototype.newAverageCollateralSpotPrice = function () {
        if (this.isLong) {
            return bn_1.ZERO_BN;
        }
        var position = this.__position;
        if (!position) {
            return this.market().spotPrice;
        }
        var collateralUpdates = position.collateralUpdates().concat([this]);
        return (0, getAverageCollateralSpotPrice_1.default)(position, collateralUpdates);
    };
    Trade.prototype.prevAverageCollateralSpotPrice = function () {
        var position = this.__position;
        if (this.isLong || !position) {
            return bn_1.ZERO_BN;
        }
        var collateralUpdates = position.collateralUpdates();
        return position ? (0, getAverageCollateralSpotPrice_1.default)(position, collateralUpdates) : bn_1.ZERO_BN;
    };
    Trade.prototype.prevCollateralAmount = function () {
        var _a;
        if (this.isLong || !this.__position) {
            return bn_1.ZERO_BN;
        }
        var collateralUpdates = this.__position.collateralUpdates();
        var prevCollateralUpdate = collateralUpdates.length ? collateralUpdates[collateralUpdates.length - 1] : null;
        return (_a = prevCollateralUpdate === null || prevCollateralUpdate === void 0 ? void 0 : prevCollateralUpdate.amount) !== null && _a !== void 0 ? _a : bn_1.ZERO_BN;
    };
    Trade.prototype.collateralChangeAmount = function () {
        var _a, _b, _c;
        if (this.isLong) {
            return bn_1.ZERO_BN;
        }
        var prevCollateralAmount = this.prevCollateralAmount();
        var currCollateralAmount = (_c = (_b = (_a = this.__position) === null || _a === void 0 ? void 0 : _a.collateral) === null || _b === void 0 ? void 0 : _b.amount) !== null && _c !== void 0 ? _c : bn_1.ZERO_BN;
        return currCollateralAmount.sub(prevCollateralAmount);
    };
    Trade.prototype.payoff = function (spotPriceAtExpiry) {
        var _a;
        return (0, getProjectedSettlePnl_1.default)(this.isLong, this.option().isCall, this.strike().strikePrice, spotPriceAtExpiry, this.newAverageCostPerOption(), this.newSize, (_a = this.collateral) === null || _a === void 0 ? void 0 : _a.liquidationPrice);
    };
    Trade.prototype.breakEven = function () {
        var _a;
        return (0, getBreakEvenPrice_1.default)(this.isCall, this.strikePrice, this.pricePerOption, !!((_a = this.collateral) === null || _a === void 0 ? void 0 : _a.isBase));
    };
    Trade.prototype.maxProfit = function () {
        return (0, getMaxProfit_1.default)(this);
    };
    Trade.prototype.maxLoss = function () {
        return (0, getMaxLoss_1.default)(this);
    };
    // Edges
    Trade.prototype.market = function () {
        return this.__option.market();
    };
    Trade.prototype.board = function () {
        return this.__option.board();
    };
    Trade.prototype.strike = function () {
        return this.__option.strike();
    };
    Trade.prototype.option = function () {
        return this.__option;
    };
    Trade.prototype.position = function () {
        var _a;
        return (_a = this.__position) !== null && _a !== void 0 ? _a : null;
    };
    Trade.prototype.balances = function () {
        return this.__balances;
    };
    return Trade;
}());
exports.Trade = Trade;
//# sourceMappingURL=index.js.map