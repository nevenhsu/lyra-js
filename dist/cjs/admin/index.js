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
exports.Admin = void 0;
var bignumber_1 = require("@ethersproject/bignumber");
var __1 = require("..");
var contracts_1 = require("../constants/contracts");
var buildTx_1 = __importDefault(require("../utils/buildTx"));
var fetchGlobalOwner_1 = __importDefault(require("../utils/fetchGlobalOwner"));
var getGlobalContract_1 = __importDefault(require("../utils/getGlobalContract"));
var getLyraContract_1 = __importDefault(require("../utils/getLyraContract"));
var getLyraMarketContract_1 = __importDefault(require("../utils/getLyraMarketContract"));
var getLyraMarketContractForAddress_1 = __importDefault(require("../utils/getLyraMarketContractForAddress"));
var GAS_LIMIT = bignumber_1.BigNumber.from(10000000);
var Admin = /** @class */ (function () {
    function Admin(lyra) {
        this.lyra = lyra;
    }
    Admin.get = function (lyra) {
        return new Admin(lyra);
    };
    Admin.prototype.contract = function (version, contractId) {
        return (0, getLyraContract_1.default)(this.lyra, version, contractId);
    };
    Admin.prototype.marketContract = function (marketContractAddresses, version, contractId) {
        return (0, getLyraMarketContract_1.default)(this.lyra, marketContractAddresses, version, contractId);
    };
    Admin.prototype.globalContract = function (contractId) {
        return (0, getGlobalContract_1.default)(this.lyra, contractId);
    };
    Admin.prototype.getMarketContractForAddress = function (marketContractAddresses, version, contractAddress) {
        return (0, getLyraMarketContractForAddress_1.default)(this.lyra, version, marketContractAddresses, contractAddress);
    };
    Admin.prototype.owner = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, fetchGlobalOwner_1.default)(this.lyra)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Admin.prototype.isMarketPaused = function (marketAddress) {
        return __awaiter(this, void 0, void 0, function () {
            var exchangeAdapter;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        exchangeAdapter = this.contract(this.lyra.version, contracts_1.LyraContractId.ExchangeAdapter);
                        return [4 /*yield*/, exchangeAdapter.isMarketPaused(marketAddress)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Admin.prototype.isGlobalPaused = function () {
        return __awaiter(this, void 0, void 0, function () {
            var exchangeAdapter;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        exchangeAdapter = this.contract(this.lyra.version, contracts_1.LyraContractId.ExchangeAdapter);
                        return [4 /*yield*/, exchangeAdapter.isGlobalPaused()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Admin.prototype.getMarketGlobalCache = function (marketAddress) {
        return __awaiter(this, void 0, void 0, function () {
            var market, optionGreekCache, _a, isGlobalCacheStale, globalCache;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.lyra.market(marketAddress)];
                    case 1:
                        market = _b.sent();
                        optionGreekCache = (0, getLyraMarketContract_1.default)(this.lyra, market.contractAddresses, this.lyra.version, contracts_1.LyraMarketContractId.OptionGreekCache);
                        return [4 /*yield*/, Promise.all([
                                optionGreekCache.isGlobalCacheStale(market.spotPrice),
                                optionGreekCache.getGlobalCache(),
                            ])];
                    case 2:
                        _a = _b.sent(), isGlobalCacheStale = _a[0], globalCache = _a[1];
                        return [2 /*return*/, __assign(__assign({}, globalCache), { isGlobalCacheStale: isGlobalCacheStale })];
                }
            });
        });
    };
    Admin.prototype.setGlobalPaused = function (isPaused) {
        return __awaiter(this, void 0, void 0, function () {
            var exchangeAdapter, owner, calldata, tx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        exchangeAdapter = this.contract(this.lyra.version, contracts_1.LyraContractId.ExchangeAdapter);
                        return [4 /*yield*/, exchangeAdapter.owner()];
                    case 1:
                        owner = _a.sent();
                        calldata = exchangeAdapter.interface.encodeFunctionData('setGlobalPaused', [isPaused]);
                        tx = (0, buildTx_1.default)(this.lyra.provider, this.lyra.provider.network.chainId, exchangeAdapter.address, owner, calldata);
                        return [2 /*return*/, __assign(__assign({}, tx), { gasLimit: GAS_LIMIT })];
                }
            });
        });
    };
    Admin.prototype.setMarketPaused = function (marketAddressOrName, isPaused) {
        return __awaiter(this, void 0, void 0, function () {
            var exchangeAdapter, _a, owner, market, calldata, tx;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        exchangeAdapter = this.contract(this.lyra.version, contracts_1.LyraContractId.ExchangeAdapter);
                        return [4 /*yield*/, Promise.all([exchangeAdapter.owner(), this.lyra.market(marketAddressOrName)])];
                    case 1:
                        _a = _b.sent(), owner = _a[0], market = _a[1];
                        calldata = exchangeAdapter.interface.encodeFunctionData('setMarketPaused', [market.address, isPaused]);
                        tx = (0, buildTx_1.default)(this.lyra.provider, this.lyra.provider.network.chainId, exchangeAdapter.address, owner, calldata);
                        return [2 /*return*/, __assign(__assign({}, tx), { gasLimit: GAS_LIMIT })];
                }
            });
        });
    };
    Admin.prototype.addMarketToViewer = function (newMarketAddresses) {
        return __awaiter(this, void 0, void 0, function () {
            var viewer, owner, calldata, tx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        viewer = this.contract(this.lyra.version, contracts_1.LyraContractId.OptionMarketViewer);
                        return [4 /*yield*/, viewer.owner()];
                    case 1:
                        owner = _a.sent();
                        calldata = viewer.interface.encodeFunctionData('addMarket', [newMarketAddresses]);
                        tx = (0, buildTx_1.default)(this.lyra.provider, this.lyra.provider.network.chainId, viewer.address, owner, calldata);
                        return [2 /*return*/, __assign(__assign({}, tx), { gasLimit: GAS_LIMIT })];
                }
            });
        });
    };
    Admin.prototype.addMarketToRegistry = function (newMarketAddresses) {
        return __awaiter(this, void 0, void 0, function () {
            var registry, owner, calldata, tx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        registry = this.contract(this.lyra.version, contracts_1.LyraContractId.LyraRegistry);
                        return [4 /*yield*/, registry.owner()];
                    case 1:
                        owner = _a.sent();
                        calldata = registry.interface.encodeFunctionData('addMarket', [newMarketAddresses]);
                        tx = (0, buildTx_1.default)(this.lyra.provider, this.lyra.provider.network.chainId, registry.address, owner, calldata);
                        return [2 /*return*/, __assign(__assign({}, tx), { gasLimit: GAS_LIMIT })];
                }
            });
        });
    };
    Admin.prototype.addBoard = function (marketAddressOrName, expiry, baseIV, strikePrices, skews, frozen) {
        if (frozen === void 0) { frozen = false; }
        return __awaiter(this, void 0, void 0, function () {
            var market, owner, optionMarket, calldata, tx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.lyra.market(marketAddressOrName)];
                    case 1:
                        market = _a.sent();
                        return [4 /*yield*/, market.owner()];
                    case 2:
                        owner = _a.sent();
                        optionMarket = (0, getLyraMarketContract_1.default)(this.lyra, market.contractAddresses, this.lyra.version, contracts_1.LyraMarketContractId.OptionMarket);
                        calldata = optionMarket.interface.encodeFunctionData('createOptionBoard', [
                            expiry,
                            baseIV,
                            strikePrices,
                            skews,
                            frozen,
                        ]);
                        tx = (0, buildTx_1.default)(this.lyra.provider, this.lyra.provider.network.chainId, optionMarket.address, owner, calldata);
                        tx.gasLimit = GAS_LIMIT;
                        return [2 /*return*/, { tx: tx, board: { expiry: expiry, baseIV: baseIV, strikePrices: strikePrices, skews: skews, frozen: frozen } }];
                }
            });
        });
    };
    Admin.prototype.addStrikeToBoard = function (marketAddresOrName, boardId, strike, skew) {
        return __awaiter(this, void 0, void 0, function () {
            var market, owner, optionMarket, calldata, tx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.lyra.market(marketAddresOrName)];
                    case 1:
                        market = _a.sent();
                        return [4 /*yield*/, market.owner()];
                    case 2:
                        owner = _a.sent();
                        optionMarket = (0, getLyraMarketContract_1.default)(this.lyra, market.contractAddresses, this.lyra.version, contracts_1.LyraMarketContractId.OptionMarket);
                        calldata = optionMarket.interface.encodeFunctionData('addStrikeToBoard', [boardId, strike, skew]);
                        tx = (0, buildTx_1.default)(this.lyra.provider, this.lyra.provider.network.chainId, optionMarket.address, owner, calldata);
                        tx.gasLimit = GAS_LIMIT;
                        return [2 /*return*/, {
                                tx: tx,
                                strike: {
                                    boardId: boardId,
                                    strikePrice: strike,
                                    skew: skew,
                                },
                            }];
                }
            });
        });
    };
    Admin.prototype.setBoardPaused = function (marketAddresOrName, boardId, isPaused) {
        return __awaiter(this, void 0, void 0, function () {
            var market, optionMarket, owner, calldata, tx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.lyra.market(marketAddresOrName)];
                    case 1:
                        market = _a.sent();
                        optionMarket = (0, getLyraMarketContract_1.default)(this.lyra, market.contractAddresses, this.lyra.version, contracts_1.LyraMarketContractId.OptionMarket);
                        return [4 /*yield*/, optionMarket.owner()];
                    case 2:
                        owner = _a.sent();
                        calldata = optionMarket.interface.encodeFunctionData('setBoardFrozen', [boardId, isPaused]);
                        tx = (0, buildTx_1.default)(this.lyra.provider, this.lyra.provider.network.chainId, optionMarket.address, owner, calldata);
                        return [2 /*return*/, __assign(__assign({}, tx), { gasLimit: GAS_LIMIT })];
                }
            });
        });
    };
    Admin.prototype.setBoardBaseIv = function (marketAddresOrName, boardId, baseIv) {
        return __awaiter(this, void 0, void 0, function () {
            var market, optionMarket, owner, calldata, tx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.lyra.market(marketAddresOrName)];
                    case 1:
                        market = _a.sent();
                        optionMarket = (0, getLyraMarketContract_1.default)(this.lyra, market.contractAddresses, this.lyra.version, contracts_1.LyraMarketContractId.OptionMarket);
                        return [4 /*yield*/, optionMarket.owner()];
                    case 2:
                        owner = _a.sent();
                        calldata = optionMarket.interface.encodeFunctionData('setBoardBaseIv', [boardId, baseIv]);
                        tx = (0, buildTx_1.default)(this.lyra.provider, this.lyra.provider.network.chainId, optionMarket.address, owner, calldata);
                        return [2 /*return*/, __assign(__assign({}, tx), { gasLimit: GAS_LIMIT })];
                }
            });
        });
    };
    Admin.prototype.setStrikeSkew = function (marketAddresOrName, strikeId, skew) {
        return __awaiter(this, void 0, void 0, function () {
            var market, optionMarket, owner, calldata, tx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.lyra.market(marketAddresOrName)];
                    case 1:
                        market = _a.sent();
                        optionMarket = (0, getLyraMarketContract_1.default)(this.lyra, market.contractAddresses, this.lyra.version, contracts_1.LyraMarketContractId.OptionMarket);
                        return [4 /*yield*/, optionMarket.owner()];
                    case 2:
                        owner = _a.sent();
                        calldata = optionMarket.interface.encodeFunctionData('setStrikeSkew', [strikeId, skew]);
                        tx = (0, buildTx_1.default)(this.lyra.provider, this.lyra.provider.network.chainId, optionMarket.address, owner, calldata);
                        return [2 /*return*/, __assign(__assign({}, tx), { gasLimit: GAS_LIMIT })];
                }
            });
        });
    };
    Admin.prototype.setGreekCacheParams = function (version, marketAddresOrName, greekCacheParams) {
        return __awaiter(this, void 0, void 0, function () {
            var market, toGreekCacheParams, optionGreekCache, owner, calldata, tx, toGreekCacheParams, optionGreekCache, owner, calldata, tx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.lyra.market(marketAddresOrName)];
                    case 1:
                        market = _a.sent();
                        if (!(version === __1.Version.Avalon)) return [3 /*break*/, 3];
                        toGreekCacheParams = __assign(__assign({}, market.__data.marketParameters.greekCacheParams), greekCacheParams);
                        optionGreekCache = (0, getLyraMarketContract_1.default)(this.lyra, market.contractAddresses, __1.Version.Avalon, contracts_1.LyraMarketContractId.OptionGreekCache);
                        return [4 /*yield*/, optionGreekCache.owner()];
                    case 2:
                        owner = _a.sent();
                        calldata = optionGreekCache.interface.encodeFunctionData('setGreekCacheParameters', [toGreekCacheParams]);
                        tx = (0, buildTx_1.default)(this.lyra.provider, this.lyra.provider.network.chainId, optionGreekCache.address, owner, calldata);
                        tx.gasLimit = GAS_LIMIT;
                        return [2 /*return*/, { params: toGreekCacheParams, tx: tx }];
                    case 3:
                        toGreekCacheParams = __assign(__assign({}, market.__data.marketParameters.greekCacheParams), greekCacheParams);
                        optionGreekCache = (0, getLyraMarketContract_1.default)(this.lyra, market.contractAddresses, __1.Version.Newport, contracts_1.LyraMarketContractId.OptionGreekCache);
                        return [4 /*yield*/, optionGreekCache.owner()];
                    case 4:
                        owner = _a.sent();
                        calldata = optionGreekCache.interface.encodeFunctionData('setGreekCacheParameters', [toGreekCacheParams]);
                        tx = (0, buildTx_1.default)(this.lyra.provider, this.lyra.provider.network.chainId, optionGreekCache.address, owner, calldata);
                        tx.gasLimit = GAS_LIMIT;
                        return [2 /*return*/, { params: toGreekCacheParams, tx: tx }];
                }
            });
        });
    };
    Admin.prototype.setForceCloseParams = function (marketAddresOrName, forceCloseParams) {
        return __awaiter(this, void 0, void 0, function () {
            var market, toForceCloseParams, optionGreekCache, owner, calldata, tx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.lyra.market(marketAddresOrName)];
                    case 1:
                        market = _a.sent();
                        toForceCloseParams = __assign(__assign({}, market.__data.marketParameters.forceCloseParams), forceCloseParams);
                        optionGreekCache = (0, getLyraMarketContract_1.default)(this.lyra, market.contractAddresses, this.lyra.version, contracts_1.LyraMarketContractId.OptionGreekCache);
                        return [4 /*yield*/, optionGreekCache.owner()];
                    case 2:
                        owner = _a.sent();
                        calldata = optionGreekCache.interface.encodeFunctionData('setForceCloseParameters', [toForceCloseParams]);
                        tx = (0, buildTx_1.default)(this.lyra.provider, this.lyra.provider.network.chainId, optionGreekCache.address, owner, calldata);
                        tx.gasLimit = GAS_LIMIT;
                        return [2 /*return*/, { params: toForceCloseParams, tx: tx }];
                }
            });
        });
    };
    Admin.prototype.setMinCollateralParams = function (marketAddresOrName, minCollateralParams) {
        return __awaiter(this, void 0, void 0, function () {
            var market, toMinCollateralParams, optionGreekCache, owner, calldata, tx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.lyra.market(marketAddresOrName)];
                    case 1:
                        market = _a.sent();
                        toMinCollateralParams = __assign(__assign({}, market.__data.marketParameters.minCollatParams), minCollateralParams);
                        optionGreekCache = (0, getLyraMarketContract_1.default)(this.lyra, market.contractAddresses, this.lyra.version, contracts_1.LyraMarketContractId.OptionGreekCache);
                        return [4 /*yield*/, optionGreekCache.owner()];
                    case 2:
                        owner = _a.sent();
                        calldata = optionGreekCache.interface.encodeFunctionData('setMinCollateralParameters', [
                            toMinCollateralParams,
                        ]);
                        tx = (0, buildTx_1.default)(this.lyra.provider, this.lyra.provider.network.chainId, optionGreekCache.address, owner, calldata);
                        tx.gasLimit = GAS_LIMIT;
                        return [2 /*return*/, { params: toMinCollateralParams, tx: tx }];
                }
            });
        });
    };
    Admin.prototype.setLiquidityPoolParams = function (version, marketAddressOrName, lpParams) {
        return __awaiter(this, void 0, void 0, function () {
            var market, params, liquidityPool, owner, calldata, tx, params, liquidityPool, owner, calldata, tx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.lyra.market(marketAddressOrName)];
                    case 1:
                        market = _a.sent();
                        if (!(version === __1.Version.Avalon)) return [3 /*break*/, 3];
                        params = __assign(__assign({}, market.__data.marketParameters.lpParams), lpParams);
                        liquidityPool = (0, getLyraMarketContract_1.default)(this.lyra, market.contractAddresses, __1.Version.Avalon, contracts_1.LyraMarketContractId.LiquidityPool);
                        return [4 /*yield*/, liquidityPool.owner()];
                    case 2:
                        owner = _a.sent();
                        calldata = liquidityPool.interface.encodeFunctionData('setLiquidityPoolParameters', [params]);
                        tx = (0, buildTx_1.default)(this.lyra.provider, this.lyra.provider.network.chainId, liquidityPool.address, owner, calldata);
                        tx.gasLimit = GAS_LIMIT;
                        return [2 /*return*/, { params: params, tx: tx }];
                    case 3:
                        params = __assign(__assign({}, market.__data.marketParameters.lpParams), lpParams);
                        liquidityPool = (0, getLyraMarketContract_1.default)(this.lyra, market.contractAddresses, __1.Version.Newport, contracts_1.LyraMarketContractId.LiquidityPool);
                        return [4 /*yield*/, liquidityPool.owner()];
                    case 4:
                        owner = _a.sent();
                        calldata = liquidityPool.interface.encodeFunctionData('setLiquidityPoolParameters', [params]);
                        tx = (0, buildTx_1.default)(this.lyra.provider, this.lyra.provider.network.chainId, liquidityPool.address, owner, calldata);
                        tx.gasLimit = GAS_LIMIT;
                        return [2 /*return*/, { params: params, tx: tx }];
                }
            });
        });
    };
    Admin.prototype.setPricingParams = function (marketAddressOrName, pricingParams) {
        return __awaiter(this, void 0, void 0, function () {
            var market, toPricingParams, optionMarketPricer, owner, calldata, tx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.lyra.market(marketAddressOrName)];
                    case 1:
                        market = _a.sent();
                        toPricingParams = __assign(__assign({}, market.__data.marketParameters.pricingParams), pricingParams);
                        optionMarketPricer = (0, getLyraMarketContract_1.default)(this.lyra, market.contractAddresses, this.lyra.version, contracts_1.LyraMarketContractId.OptionMarketPricer);
                        return [4 /*yield*/, optionMarketPricer.owner()];
                    case 2:
                        owner = _a.sent();
                        calldata = optionMarketPricer.interface.encodeFunctionData('setPricingParams', [toPricingParams]);
                        tx = (0, buildTx_1.default)(this.lyra.provider, this.lyra.provider.network.chainId, optionMarketPricer.address, owner, calldata);
                        tx.gasLimit = GAS_LIMIT;
                        return [2 /*return*/, { params: toPricingParams, tx: tx }];
                }
            });
        });
    };
    Admin.prototype.setTradeLimitParams = function (marketAddressOrName, tradeLimitParams) {
        return __awaiter(this, void 0, void 0, function () {
            var market, toTradeLimitParams, optionMarketPricer, owner, calldata, tx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.lyra.market(marketAddressOrName)];
                    case 1:
                        market = _a.sent();
                        toTradeLimitParams = __assign(__assign({}, market.__data.marketParameters.tradeLimitParams), tradeLimitParams);
                        optionMarketPricer = (0, getLyraMarketContract_1.default)(this.lyra, market.contractAddresses, this.lyra.version, contracts_1.LyraMarketContractId.OptionMarketPricer);
                        return [4 /*yield*/, optionMarketPricer.owner()];
                    case 2:
                        owner = _a.sent();
                        calldata = optionMarketPricer.interface.encodeFunctionData('setTradeLimitParams', [toTradeLimitParams]);
                        tx = (0, buildTx_1.default)(this.lyra.provider, this.lyra.provider.network.chainId, optionMarketPricer.address, owner, calldata);
                        tx.gasLimit = GAS_LIMIT;
                        return [2 /*return*/, { params: toTradeLimitParams, tx: tx }];
                }
            });
        });
    };
    Admin.prototype.setVarianceFeeParams = function (marketAddressOrName, params) {
        return __awaiter(this, void 0, void 0, function () {
            var market, toParams, optionMarketPricer, owner, calldata, tx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.lyra.market(marketAddressOrName)];
                    case 1:
                        market = _a.sent();
                        toParams = __assign(__assign({}, market.__data.marketParameters.varianceFeeParams), params);
                        optionMarketPricer = (0, getLyraMarketContract_1.default)(this.lyra, market.contractAddresses, this.lyra.version, contracts_1.LyraMarketContractId.OptionMarketPricer);
                        return [4 /*yield*/, optionMarketPricer.owner()];
                    case 2:
                        owner = _a.sent();
                        calldata = optionMarketPricer.interface.encodeFunctionData('setVarianceFeeParams', [toParams]);
                        tx = (0, buildTx_1.default)(this.lyra.provider, this.lyra.provider.network.chainId, optionMarketPricer.address, owner, calldata);
                        tx.gasLimit = GAS_LIMIT;
                        return [2 /*return*/, { params: toParams, tx: tx }];
                }
            });
        });
    };
    Admin.prototype.setPartialCollatParams = function (marketAddressOrName, params) {
        return __awaiter(this, void 0, void 0, function () {
            var market, toParams, optionToken, owner, calldata, tx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.lyra.market(marketAddressOrName)];
                    case 1:
                        market = _a.sent();
                        toParams = __assign(__assign({}, market.__data.marketParameters.partialCollatParams), params);
                        optionToken = (0, getLyraMarketContract_1.default)(this.lyra, market.contractAddresses, this.lyra.version, contracts_1.LyraMarketContractId.OptionToken);
                        return [4 /*yield*/, optionToken.owner()];
                    case 2:
                        owner = _a.sent();
                        calldata = optionToken.interface.encodeFunctionData('setPartialCollateralParams', [toParams]);
                        tx = (0, buildTx_1.default)(this.lyra.provider, this.lyra.provider.network.chainId, optionToken.address, owner, calldata);
                        tx.gasLimit = GAS_LIMIT;
                        return [2 /*return*/, { params: toParams, tx: tx }];
                }
            });
        });
    };
    Admin.prototype.setOptionMarketParams = function (marketAddressOrName, params) {
        return __awaiter(this, void 0, void 0, function () {
            var market, toParams, optionMarket, owner, calldata, tx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.lyra.market(marketAddressOrName)];
                    case 1:
                        market = _a.sent();
                        toParams = __assign(__assign({}, market.__data.marketParameters.optionMarketParams), params);
                        optionMarket = (0, getLyraMarketContract_1.default)(this.lyra, market.contractAddresses, this.lyra.version, contracts_1.LyraMarketContractId.OptionMarket);
                        return [4 /*yield*/, optionMarket.owner()];
                    case 2:
                        owner = _a.sent();
                        calldata = optionMarket.interface.encodeFunctionData('setOptionMarketParams', [toParams]);
                        tx = (0, buildTx_1.default)(this.lyra.provider, this.lyra.provider.network.chainId, optionMarket.address, owner, calldata);
                        tx.gasLimit = GAS_LIMIT;
                        return [2 /*return*/, { params: toParams, tx: tx }];
                }
            });
        });
    };
    Admin.prototype.setAdapterMarketPricingParams = function (marketAddressOrName, params) {
        return __awaiter(this, void 0, void 0, function () {
            var market, toParams, exchangeAdapter, owner, calldata, tx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.lyra.market(marketAddressOrName)];
                    case 1:
                        market = _a.sent();
                        if (!market.params.adapterView) {
                            throw new Error('Adapter market pricing parameters not supported on this market');
                        }
                        toParams = __assign(__assign({}, market.params.adapterView.marketPricingParams), params);
                        exchangeAdapter = (0, getLyraContract_1.default)(this.lyra, __1.Version.Newport, contracts_1.LyraContractId.ExchangeAdapter);
                        return [4 /*yield*/, exchangeAdapter.owner()];
                    case 2:
                        owner = _a.sent();
                        calldata = exchangeAdapter.interface.encodeFunctionData('setMarketPricingParams', [market.address, toParams]);
                        tx = (0, buildTx_1.default)(this.lyra.provider, this.lyra.provider.network.chainId, exchangeAdapter.address, owner, calldata);
                        tx.gasLimit = GAS_LIMIT;
                        return [2 /*return*/, { params: toParams, tx: tx }];
                }
            });
        });
    };
    Admin.prototype.setPoolHedgerParams = function (marketAddressOrName, params) {
        return __awaiter(this, void 0, void 0, function () {
            var market, poolHedger, fromParams, toParams, owner, calldata, tx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.lyra.market(marketAddressOrName)];
                    case 1:
                        market = _a.sent();
                        poolHedger = (0, getLyraMarketContract_1.default)(this.lyra, market.contractAddresses, market.lyra.version, contracts_1.LyraMarketContractId.PoolHedger);
                        return [4 /*yield*/, poolHedger.getPoolHedgerParams()];
                    case 2:
                        fromParams = _a.sent();
                        toParams = __assign(__assign({}, fromParams), params);
                        return [4 /*yield*/, market.owner()];
                    case 3:
                        owner = _a.sent();
                        calldata = poolHedger.interface.encodeFunctionData('setPoolHedgerParams', [toParams]);
                        tx = (0, buildTx_1.default)(this.lyra.provider, this.lyra.provider.network.chainId, poolHedger.address, owner, calldata);
                        tx.gasLimit = bignumber_1.BigNumber.from(10000000);
                        return [2 /*return*/, { params: toParams, tx: tx }];
                }
            });
        });
    };
    Admin.prototype.setFuturesPoolHedgerParams = function (marketAddressOrName, params) {
        return __awaiter(this, void 0, void 0, function () {
            var market, toParams, futuresPoolHedger, owner, calldata, tx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.lyra.market(marketAddressOrName)];
                    case 1:
                        market = _a.sent();
                        if (market.lyra.version !== __1.Version.Newport || !market.params.hedgerView) {
                            throw new Error('Parameters not supported on version');
                        }
                        toParams = __assign(__assign({}, market.params.hedgerView.futuresPoolHedgerParams), params);
                        futuresPoolHedger = (0, getLyraMarketContract_1.default)(this.lyra, market.contractAddresses, market.lyra.version, contracts_1.LyraMarketContractId.PoolHedger);
                        return [4 /*yield*/, market.owner()];
                    case 2:
                        owner = _a.sent();
                        calldata = futuresPoolHedger.interface.encodeFunctionData('setFuturesPoolHedgerParams', [toParams]);
                        tx = (0, buildTx_1.default)(this.lyra.provider, this.lyra.provider.network.chainId, futuresPoolHedger.address, owner, calldata);
                        tx.gasLimit = bignumber_1.BigNumber.from(10000000);
                        return [2 /*return*/, { params: toParams, tx: tx }];
                }
            });
        });
    };
    Admin.prototype.setCircuitBreakerParams = function (marketAddressOrName, params) {
        return __awaiter(this, void 0, void 0, function () {
            var market, toParams, liquidityPool, owner, calldata, tx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.lyra.market(marketAddressOrName)];
                    case 1:
                        market = _a.sent();
                        if (market.lyra.version !== __1.Version.Newport || !('cbParams' in market.__data.marketParameters)) {
                            throw new Error('Parameters not supported on version');
                        }
                        toParams = __assign(__assign({}, market.__data.marketParameters.cbParams), params);
                        liquidityPool = (0, getLyraMarketContract_1.default)(this.lyra, market.contractAddresses, market.lyra.version, contracts_1.LyraMarketContractId.LiquidityPool);
                        return [4 /*yield*/, market.owner()];
                    case 2:
                        owner = _a.sent();
                        calldata = liquidityPool.interface.encodeFunctionData('setCircuitBreakerParameters', [toParams]);
                        tx = (0, buildTx_1.default)(this.lyra.provider, this.lyra.provider.network.chainId, liquidityPool.address, owner, calldata);
                        tx.gasLimit = bignumber_1.BigNumber.from(10000000);
                        return [2 /*return*/, { params: toParams, tx: tx }];
                }
            });
        });
    };
    Admin.prototype.processDepositQueue = function (marketAddressOrName, limit) {
        return __awaiter(this, void 0, void 0, function () {
            var market, liquidityPool, owner, calldata, tx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.lyra.market(marketAddressOrName)];
                    case 1:
                        market = _a.sent();
                        liquidityPool = (0, getLyraMarketContract_1.default)(this.lyra, market.contractAddresses, this.lyra.version, contracts_1.LyraMarketContractId.LiquidityPool);
                        return [4 /*yield*/, liquidityPool.owner()];
                    case 2:
                        owner = _a.sent();
                        calldata = liquidityPool.interface.encodeFunctionData('processDepositQueue', [limit]);
                        tx = (0, buildTx_1.default)(this.lyra.provider, this.lyra.provider.network.chainId, liquidityPool.address, owner, calldata);
                        tx.gasLimit = GAS_LIMIT;
                        return [2 /*return*/, tx];
                }
            });
        });
    };
    Admin.prototype.processWithdrawalQueue = function (marketAddressOrName, limit) {
        return __awaiter(this, void 0, void 0, function () {
            var market, liquidityPool, owner, calldata, tx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.lyra.market(marketAddressOrName)];
                    case 1:
                        market = _a.sent();
                        liquidityPool = (0, getLyraMarketContract_1.default)(this.lyra, market.contractAddresses, this.lyra.version, contracts_1.LyraMarketContractId.LiquidityPool);
                        return [4 /*yield*/, liquidityPool.owner()];
                    case 2:
                        owner = _a.sent();
                        calldata = liquidityPool.interface.encodeFunctionData('processWithdrawalQueue', [limit]);
                        tx = (0, buildTx_1.default)(this.lyra.provider, this.lyra.provider.network.chainId, liquidityPool.address, owner, calldata);
                        tx.gasLimit = GAS_LIMIT;
                        return [2 /*return*/, tx];
                }
            });
        });
    };
    return Admin;
}());
exports.Admin = Admin;
//# sourceMappingURL=index.js.map