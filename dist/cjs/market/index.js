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
exports.Market = void 0;
var strings_1 = require("@ethersproject/strings");
var board_1 = require("../board");
var bn_1 = require("../constants/bn");
var contracts_1 = require("../constants/contracts");
var liquidity_deposit_1 = require("../liquidity_deposit");
var liquidity_withdrawal_1 = require("../liquidity_withdrawal");
var lyra_1 = require("../lyra");
var trade_1 = require("../trade");
var fetchAvalonMarketView_1 = __importDefault(require("../utils/fetchAvalonMarketView"));
var fetchLatestLiquidity_1 = __importDefault(require("../utils/fetchLatestLiquidity"));
var fetchLatestNetGreeks_1 = __importDefault(require("../utils/fetchLatestNetGreeks"));
var fetchLiquidityHistory_1 = __importDefault(require("../utils/fetchLiquidityHistory"));
var fetchMarketAddresses_1 = __importDefault(require("../utils/fetchMarketAddresses"));
var fetchMarketOwner_1 = __importDefault(require("../utils/fetchMarketOwner"));
var fetchNetGreeksHistory_1 = __importDefault(require("../utils/fetchNetGreeksHistory"));
var fetchNewportMarketViews_1 = __importDefault(require("../utils/fetchNewportMarketViews"));
var fetchSpotPriceHistory_1 = __importDefault(require("../utils/fetchSpotPriceHistory"));
var fetchTradingVolumeHistory_1 = __importDefault(require("../utils/fetchTradingVolumeHistory"));
var findMarket_1 = __importDefault(require("../utils/findMarket"));
var getBoardView_1 = __importDefault(require("../utils/getBoardView"));
var getBoardViewForStrikeId_1 = __importDefault(require("../utils/getBoardViewForStrikeId"));
var getLyraMarketContract_1 = __importDefault(require("../utils/getLyraMarketContract"));
var getMarketName_1 = __importDefault(require("../utils/getMarketName"));
var isMarketEqual_1 = __importDefault(require("../utils/isMarketEqual"));
var Market = /** @class */ (function () {
    function Market(lyra, marketView, isGlobalPaused, owner, tokenPrice, block, 
    // TODO @michaelxuwu remove this when parmas added to viewer
    hedgerView, adapterView, poolHedgerParams) {
        this.__source = contracts_1.DataSource.ContractCall;
        this.lyra = lyra;
        this.block = block;
        this.__data = marketView;
        var fields = Market.getFields(lyra.version, marketView, isGlobalPaused, owner, tokenPrice, hedgerView, adapterView, poolHedgerParams);
        this.address = fields.address;
        this.isPaused = fields.isPaused;
        this.spotPrice = fields.spotPrice;
        this.quoteToken = fields.quoteToken;
        this.baseToken = fields.baseToken;
        this.liquidityToken = fields.liquidityToken;
        this.name = fields.name;
        this.contractAddresses = fields.contractAddresses;
        var liveBoards = marketView.liveBoards;
        this.openInterest = liveBoards.reduce(function (sum, board) {
            var longCallOpenInterest = board.strikes.reduce(function (sum, strike) { return sum.add(strike.longCallOpenInterest); }, bn_1.ZERO_BN);
            var shortCallOpenInterest = board.strikes.reduce(function (sum, strike) { return sum.add(strike.shortCallBaseOpenInterest).add(strike.shortCallQuoteOpenInterest); }, bn_1.ZERO_BN);
            var longPutOpenInterest = board.strikes.reduce(function (sum, strike) { return sum.add(strike.longPutOpenInterest); }, bn_1.ZERO_BN);
            var shortPutOpenInterest = board.strikes.reduce(function (sum, strike) { return sum.add(strike.shortPutOpenInterest); }, bn_1.ZERO_BN);
            return sum.add(longCallOpenInterest).add(shortCallOpenInterest).add(longPutOpenInterest).add(shortPutOpenInterest);
        }, bn_1.ZERO_BN);
        this.params = fields.params;
        this.liveBoardsMap = liveBoards.reduce(function (map, boardView) {
            var _a;
            return (__assign(__assign({}, map), (_a = {}, _a[boardView.boardId.toNumber()] = boardView, _a)));
        }, {});
    }
    // TODO: @dappbeast Remove getFields
    Market.getFields = function (version, marketView, isGlobalPaused, owner, tokenPrice, hedgerView, adapterView, poolHedgerParams) {
        var _a;
        var address = marketView.marketAddresses.optionMarket;
        var isPaused = (_a = marketView.isPaused) !== null && _a !== void 0 ? _a : isGlobalPaused;
        var spotPrice, quoteSymbol, baseSymbol, quoteDecimals, baseDecimals;
        var params;
        var pricingParams = marketView.marketParameters.pricingParams;
        var tradeLimitParams = marketView.marketParameters.tradeLimitParams;
        var minCollatParams = marketView.marketParameters.minCollatParams;
        var forceCloseParams = marketView.marketParameters.forceCloseParams;
        var varianceFeeParams = marketView.marketParameters.varianceFeeParams;
        var lpParams = marketView.marketParameters.lpParams;
        var sharedParams = {
            optionPriceFee1xPoint: pricingParams.optionPriceFee1xPoint.toNumber(),
            optionPriceFee2xPoint: pricingParams.optionPriceFee2xPoint.toNumber(),
            optionPriceFeeCoefficient: pricingParams.optionPriceFeeCoefficient,
            spotPriceFee1xPoint: pricingParams.spotPriceFee1xPoint.toNumber(),
            spotPriceFee2xPoint: pricingParams.spotPriceFee2xPoint.toNumber(),
            spotPriceFeeCoefficient: pricingParams.spotPriceFeeCoefficient,
            vegaFeeCoefficient: pricingParams.vegaFeeCoefficient,
            minDelta: tradeLimitParams.minDelta,
            shockVolA: minCollatParams.shockVolA,
            shockVolB: minCollatParams.shockVolB,
            shockVolPointA: minCollatParams.shockVolPointA,
            shockVolPointB: minCollatParams.shockVolPointB,
            minStaticQuoteCollateral: minCollatParams.minStaticQuoteCollateral,
            minStaticBaseCollateral: minCollatParams.minStaticBaseCollateral,
            callSpotPriceShock: minCollatParams.callSpotPriceShock,
            putSpotPriceShock: minCollatParams.putSpotPriceShock,
            standardSize: pricingParams.standardSize,
            skewAdjustmentFactor: pricingParams.skewAdjustmentFactor,
            minForceCloseDelta: tradeLimitParams.minForceCloseDelta,
            shortPostCutoffVolShock: forceCloseParams.shortPostCutoffVolShock,
            shortVolShock: forceCloseParams.shortVolShock,
            longPostCutoffVolShock: forceCloseParams.longPostCutoffVolShock,
            longVolShock: forceCloseParams.longVolShock,
            shortSpotMin: forceCloseParams.shortSpotMin,
            absMinSkew: tradeLimitParams.absMinSkew,
            absMaxSkew: tradeLimitParams.absMaxSkew,
            minSkew: tradeLimitParams.minSkew,
            maxSkew: tradeLimitParams.maxSkew,
            maxBaseIv: tradeLimitParams.maxBaseIV,
            maxVol: tradeLimitParams.maxVol,
            minBaseIv: tradeLimitParams.minBaseIV,
            minVol: tradeLimitParams.minVol,
            forceCloseVarianceFeeCoefficient: varianceFeeParams.forceCloseVarianceFeeCoefficient,
            defaultVarianceFeeCoefficient: varianceFeeParams.defaultVarianceFeeCoefficient,
            minimumStaticVega: varianceFeeParams.minimumStaticVega,
            vegaCoefficient: varianceFeeParams.vegaCoefficient,
            referenceSkew: varianceFeeParams.referenceSkew,
            minimumStaticSkewAdjustment: varianceFeeParams.minimumStaticSkewAdjustment,
            skewAdjustmentCoefficient: varianceFeeParams.skewAdjustmentCoefficient,
            minimumStaticIvVariance: varianceFeeParams.minimumStaticIvVariance,
            ivVarianceCoefficient: varianceFeeParams.ivVarianceCoefficient,
            withdrawalFee: lpParams.withdrawalFee,
            withdrawalDelay: lpParams.withdrawalDelay.toNumber(),
            depositDelay: lpParams.depositDelay.toNumber(),
            tradingCutoff: tradeLimitParams.tradingCutoff.toNumber(),
            NAV: marketView.liquidity.NAV,
            freeLiquidity: marketView.liquidity.freeLiquidity,
            tokenPrice: tokenPrice,
            netStdVega: marketView.globalNetGreeks.netStdVega,
            netDelta: marketView.globalNetGreeks.netDelta,
            isGlobalPaused: isGlobalPaused,
            isMarketPaused: marketView.isPaused,
            owner: owner,
            poolHedgerParams: poolHedgerParams !== null && poolHedgerParams !== void 0 ? poolHedgerParams : marketView.marketParameters.poolHedgerParams,
            hedgerView: hedgerView !== null && hedgerView !== void 0 ? hedgerView : null,
            adapterView: adapterView !== null && adapterView !== void 0 ? adapterView : null,
        };
        if (version === lyra_1.Version.Avalon) {
            var avalonMarketView = marketView;
            spotPrice = avalonMarketView.exchangeParams.spotPrice;
            quoteSymbol = (0, strings_1.parseBytes32String)(avalonMarketView.exchangeParams.quoteKey);
            baseSymbol = (0, strings_1.parseBytes32String)(avalonMarketView.exchangeParams.baseKey);
            quoteDecimals = 18;
            baseDecimals = 18;
            params = __assign({ referenceSpotPrice: spotPrice, rateAndCarry: avalonMarketView.marketParameters.greekCacheParams.rateAndCarry }, sharedParams);
        }
        else {
            if (!adapterView || !hedgerView) {
                throw new Error('Adapter or hedger view does not exist');
            }
            var newportMarketView = marketView;
            spotPrice = adapterView.gmxMaxPrice;
            quoteSymbol = newportMarketView.quoteSymbol;
            quoteDecimals = newportMarketView.quoteDecimals.toNumber();
            baseSymbol = newportMarketView.baseSymbol;
            baseDecimals = newportMarketView.baseDecimals.toNumber();
            params = __assign({ rateAndCarry: adapterView.rateAndCarry, referenceSpotPrice: newportMarketView.spotPrice }, sharedParams);
        }
        var quoteAddress = marketView.marketAddresses.quoteAsset;
        var baseAddress = marketView.marketAddresses.baseAsset;
        var name = (0, getMarketName_1.default)(baseSymbol, quoteSymbol);
        var tradingCutoff = marketView.marketParameters.tradeLimitParams.tradingCutoff.toNumber();
        var depositDelay = marketView.marketParameters.lpParams.depositDelay.toNumber();
        var withdrawalDelay = marketView.marketParameters.lpParams.withdrawalDelay.toNumber();
        return {
            address: address,
            name: name,
            isPaused: isPaused,
            spotPrice: spotPrice,
            tradingCutoff: tradingCutoff,
            quoteToken: {
                address: quoteAddress,
                symbol: quoteSymbol,
                decimals: quoteDecimals,
            },
            baseToken: {
                address: baseAddress,
                symbol: baseSymbol,
                decimals: baseDecimals,
            },
            liquidityToken: {
                address: marketView.marketAddresses.liquidityToken,
                symbol: "".concat(baseSymbol, "LP"),
                decimals: 18,
            },
            contractAddresses: marketView.marketAddresses,
            depositDelay: depositDelay,
            withdrawalDelay: withdrawalDelay,
            params: params,
        };
    };
    // Getters
    Market.get = function (lyra, marketAddressOrName) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, marketView, isGlobalPaused, owner, block, market;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!(lyra.version === lyra_1.Version.Avalon)) return [3 /*break*/, 2];
                        return [4 /*yield*/, Promise.all([
                                (0, fetchAvalonMarketView_1.default)(lyra, marketAddressOrName),
                                lyra.provider.getBlock('latest'),
                            ])];
                    case 1:
                        _a = _c.sent(), _b = _a[0], marketView = _b.marketView, isGlobalPaused = _b.isGlobalPaused, owner = _b.owner, block = _a[1];
                        return [2 /*return*/, new Market(lyra, marketView, isGlobalPaused, owner, marketView.tokenPrice, block)];
                    case 2: return [4 /*yield*/, Market.getAll(lyra)];
                    case 3:
                        market = (_c.sent()).find(function (market) { return market.isEqual(marketAddressOrName); });
                        if (!market) {
                            throw new Error('Market does not exist');
                        }
                        return [2 /*return*/, market];
                }
            });
        });
    };
    Market.getMany = function (lyra, marketAddresses) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, marketViews, block_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(lyra.version === lyra_1.Version.Avalon)) return [3 /*break*/, 2];
                        return [4 /*yield*/, Promise.all([
                                Promise.all(marketAddresses.map(function (marketAddress) { return (0, fetchAvalonMarketView_1.default)(lyra, marketAddress); })),
                                lyra.provider.getBlock('latest'),
                            ])];
                    case 1:
                        _a = _b.sent(), marketViews = _a[0], block_1 = _a[1];
                        return [2 /*return*/, marketViews.map(function (_a) {
                                var marketView = _a.marketView, isGlobalPaused = _a.isGlobalPaused, owner = _a.owner;
                                return new Market(lyra, marketView, isGlobalPaused, owner, marketView.tokenPrice, block_1);
                            })];
                    case 2: return [4 /*yield*/, Market.getAll(lyra)];
                    case 3: return [2 /*return*/, (_b.sent()).filter(function (market) { return marketAddresses.includes(market.address); })];
                }
            });
        });
    };
    Market.getAll = function (lyra) {
        return __awaiter(this, void 0, void 0, function () {
            var marketAddresses, _a, _b, marketViews, isGlobalPaused_1, owner_1, block_2, markets;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!(lyra.version === lyra_1.Version.Avalon)) return [3 /*break*/, 3];
                        return [4 /*yield*/, (0, fetchMarketAddresses_1.default)(lyra)];
                    case 1:
                        marketAddresses = _c.sent();
                        return [4 /*yield*/, Market.getMany(lyra, marketAddresses.map(function (m) { return m.optionMarket; }))];
                    case 2: return [2 /*return*/, _c.sent()];
                    case 3: return [4 /*yield*/, Promise.all([
                            (0, fetchNewportMarketViews_1.default)(lyra),
                            lyra.provider.getBlock('latest'),
                        ])];
                    case 4:
                        _a = _c.sent(), _b = _a[0], marketViews = _b.marketViews, isGlobalPaused_1 = _b.isGlobalPaused, owner_1 = _b.owner, block_2 = _a[1];
                        markets = marketViews.map(function (_a) {
                            var marketView = _a.marketView, hedgerView = _a.hedgerView, adapterView = _a.adapterView, poolHedgerParams = _a.poolHedgerParams, tokenPrice = _a.tokenPrice;
                            return new Market(lyra, marketView, isGlobalPaused_1, owner_1, tokenPrice, block_2, hedgerView, adapterView, poolHedgerParams);
                        });
                        return [2 /*return*/, markets];
                }
            });
        });
    };
    Market.find = function (markets, marketAddressOrName) {
        return (0, findMarket_1.default)(markets, marketAddressOrName);
    };
    Market.prototype.refresh = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Market.get(this.lyra, this.address)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // Edges
    Market.prototype.isEqual = function (marketAddressOrName) {
        return (0, isMarketEqual_1.default)(this, marketAddressOrName);
    };
    Market.prototype.liveBoards = function () {
        var _this = this;
        return Object.values(this.liveBoardsMap)
            .map(function (boardView) {
            return new board_1.Board(_this.lyra, _this, boardView, _this.block);
        })
            .filter(function (b) { return _this.block.timestamp < b.expiryTimestamp; })
            .sort(function (a, b) { return a.expiryTimestamp - b.expiryTimestamp; });
    };
    Market.prototype.liveBoard = function (boardId) {
        var boardView = this.liveBoardsMap[boardId];
        if (!boardView) {
            throw new Error('Board is expired or does not exist for market');
        }
        return new board_1.Board(this.lyra, this, boardView, this.block);
    };
    Market.prototype.board = function (boardId) {
        return __awaiter(this, void 0, void 0, function () {
            var _e_1, _a, boardView, block;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 1, , 3]);
                        // Attempt to return live board
                        return [2 /*return*/, this.liveBoard(boardId)];
                    case 1:
                        _e_1 = _b.sent();
                        return [4 /*yield*/, Promise.all([
                                (0, getBoardView_1.default)(this.lyra, this.address, boardId),
                                this.lyra.provider.getBlock('latest'),
                            ])];
                    case 2:
                        _a = _b.sent(), boardView = _a[0], block = _a[1];
                        return [2 /*return*/, new board_1.Board(this.lyra, this, boardView, block)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Market.prototype.liveStrike = function (strikeId) {
        var board = this.liveBoards().find(function (board) { return board.strikes().find(function (strike) { return strike.id === strikeId; }); });
        var strike = board === null || board === void 0 ? void 0 : board.strikes().find(function (strike) { return strike.id === strikeId; });
        if (!strike) {
            throw new Error('Strike is expired or does not exist for market');
        }
        return strike;
    };
    Market.prototype.strike = function (strikeId) {
        return __awaiter(this, void 0, void 0, function () {
            var _e_2, _a, boardView, block, board;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 1, , 3]);
                        return [2 /*return*/, this.liveStrike(strikeId)];
                    case 1:
                        _e_2 = _b.sent();
                        return [4 /*yield*/, Promise.all([
                                (0, getBoardViewForStrikeId_1.default)(this.lyra, this.address, strikeId),
                                this.lyra.provider.getBlock('latest'),
                            ])];
                    case 2:
                        _a = _b.sent(), boardView = _a[0], block = _a[1];
                        board = new board_1.Board(this.lyra, this, boardView, block);
                        return [2 /*return*/, board.strike(strikeId)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Market.prototype.liveOption = function (strikeId, isCall) {
        var strike = this.liveStrike(strikeId);
        return strike.option(isCall);
    };
    Market.prototype.option = function (strikeId, isCall) {
        return __awaiter(this, void 0, void 0, function () {
            var strike;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.strike(strikeId)];
                    case 1:
                        strike = _a.sent();
                        return [2 /*return*/, strike.option(isCall)];
                }
            });
        });
    };
    Market.prototype.quote = function (strikeId, isCall, isBuy, size, options) {
        return __awaiter(this, void 0, void 0, function () {
            var market;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.refresh()];
                    case 1:
                        market = _a.sent();
                        return [2 /*return*/, market.quoteSync(strikeId, isCall, isBuy, size, options)];
                }
            });
        });
    };
    Market.prototype.quoteSync = function (strikeId, isCall, isBuy, size, options) {
        return this.liveOption(strikeId, isCall).quoteSync(isBuy, size, options);
    };
    Market.prototype.quoteAll = function (size, options) {
        return __awaiter(this, void 0, void 0, function () {
            var market;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.refresh()];
                    case 1:
                        market = _a.sent();
                        return [2 /*return*/, market.quoteAllSync(size, options)];
                }
            });
        });
    };
    Market.prototype.quoteAllSync = function (size, options) {
        return {
            boards: this.liveBoards().map(function (board) { return board.quoteAllSync(size, options); }),
            market: this,
        };
    };
    Market.prototype.contract = function (contractId) {
        return (0, getLyraMarketContract_1.default)(this.lyra, this.contractAddresses, this.lyra.version, contractId);
    };
    // Transactions
    Market.prototype.trade = function (owner, strikeId, isCall, isBuy, size, slippage, options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, trade_1.Trade.get(this.lyra, owner, this.address, strikeId, isCall, isBuy, size, slippage, __assign({}, options))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Market.prototype.approveDeposit = function (owner, amountQuote) {
        return liquidity_deposit_1.LiquidityDeposit.approve(this, owner, amountQuote);
    };
    Market.prototype.initiateDeposit = function (beneficiary, amountQuote) {
        return liquidity_deposit_1.LiquidityDeposit.initiateDeposit(this, beneficiary, amountQuote);
    };
    Market.prototype.initiateWithdraw = function (beneficiary, amountLiquidityTokens) {
        return liquidity_withdrawal_1.LiquidityWithdrawal.initiateWithdraw(this, beneficiary, amountLiquidityTokens);
    };
    Market.prototype.approveTradeQuote = function (owner, amountQuote) {
        return trade_1.Trade.approveQuote(this, owner, amountQuote);
    };
    Market.prototype.approveTradeBase = function (owner, amountBase) {
        return trade_1.Trade.approveBase(this, owner, amountBase);
    };
    // Dynamic fields
    Market.prototype.liquidity = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, fetchLatestLiquidity_1.default)(this.lyra, this)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Market.prototype.netGreeks = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, fetchLatestNetGreeks_1.default)(this.lyra, this)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Market.prototype.liquidityHistory = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, fetchLiquidityHistory_1.default)(this.lyra, this, options)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Market.prototype.netGreeksHistory = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, fetchNetGreeksHistory_1.default)(this.lyra, this, options)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Market.prototype.tradingVolumeHistory = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, fetchTradingVolumeHistory_1.default)(this.lyra, this, options)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Market.prototype.spotPriceHistory = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, fetchSpotPriceHistory_1.default)(this.lyra, this, options)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Market.prototype.owner = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, fetchMarketOwner_1.default)(this.lyra, this.contractAddresses)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return Market;
}());
exports.Market = Market;
//# sourceMappingURL=index.js.map