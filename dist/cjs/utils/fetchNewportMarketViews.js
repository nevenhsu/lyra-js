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
var bn_1 = require("../constants/bn");
var contracts_1 = require("../constants/contracts");
var lyra_1 = require("../lyra");
var fetchMarketAddresses_1 = __importDefault(require("./fetchMarketAddresses"));
var getLyraContract_1 = __importDefault(require("./getLyraContract"));
var getLyraMarketContract_1 = __importDefault(require("./getLyraMarketContract"));
var isTestnet_1 = __importDefault(require("./isTestnet"));
var multicall_1 = __importDefault(require("./multicall"));
var TESTNET_HEDGER_VIEW = {
    currentPositions: {
        longPosition: {
            size: bn_1.ZERO_BN,
            collateral: bn_1.ZERO_BN,
            averagePrice: bn_1.ZERO_BN,
            entryFundingRate: bn_1.ZERO_BN,
            unrealisedPnl: bn_1.ZERO_BN,
            lastIncreasedTime: bn_1.ZERO_BN,
            isLong: true,
        },
        shortPosition: {
            size: bn_1.ZERO_BN,
            collateral: bn_1.ZERO_BN,
            averagePrice: bn_1.ZERO_BN,
            entryFundingRate: bn_1.ZERO_BN,
            unrealisedPnl: bn_1.ZERO_BN,
            lastIncreasedTime: bn_1.ZERO_BN,
            isLong: false,
        },
        amountOpen: bn_1.ZERO_BN,
        isLong: true,
    },
    futuresPoolHedgerParams: {
        acceptableSpotSlippage: bn_1.ZERO_BN,
        deltaThreshold: bn_1.ZERO_BN,
        marketDepthBuffer: bn_1.ZERO_BN,
        targetLeverage: bn_1.ZERO_BN,
        maxLeverage: bn_1.ZERO_BN,
        minCancelDelay: bn_1.ZERO_BN,
        minCollateralUpdate: bn_1.ZERO_BN,
        vaultLiquidityCheckEnabled: false,
    },
    hedgerAddresses: {
        router: bn_1.ZERO_ADDRESS,
        positionRouter: bn_1.ZERO_ADDRESS,
        vault: bn_1.ZERO_ADDRESS,
        quoteAsset: bn_1.ZERO_ADDRESS,
        baseAsset: bn_1.ZERO_ADDRESS,
        weth: bn_1.ZERO_ADDRESS,
    },
    gmxView: {
        basePoolAmount: bn_1.ZERO_BN,
        baseReservedAmount: bn_1.ZERO_BN,
        quotePoolAmount: bn_1.ZERO_BN,
        quoteReservedAmount: bn_1.ZERO_BN,
        maxGlobalLongSize: bn_1.ZERO_BN,
        guaranteedUSD: bn_1.ZERO_BN,
        maxGlobalShortSize: bn_1.ZERO_BN,
        shortSize: bn_1.ZERO_BN,
        minExecutionFee: bn_1.ZERO_BN,
        remainingLongDollars: bn_1.ZERO_BN,
        remainingShortDollars: bn_1.ZERO_BN,
    },
    referralCode: '',
    pendingOrderKey: '',
    lastOrderTimestamp: bn_1.ZERO_BN,
    spotPrice: bn_1.ZERO_BN,
    expectedHedge: bn_1.ZERO_BN,
    currentHedge: bn_1.ZERO_BN,
    currentLeverage: bn_1.ZERO_BN,
    pendingCollateralDelta: bn_1.ZERO_BN,
    baseBal: bn_1.ZERO_BN,
    quoteBal: bn_1.ZERO_BN,
    wethBal: bn_1.ZERO_BN,
};
var TESTNET_POOL_HEDGER_PARAMS = {
    interactionDelay: bn_1.ZERO_BN,
    hedgeCap: bn_1.ZERO_BN,
};
function fetchNewportMarketViews(lyra) {
    return __awaiter(this, void 0, void 0, function () {
        var viewerContract, exchangeAdapterContract, globalOwnerReq, allMarketAddresses, hedgerRequests, adapterRequests, hedgerParamsRequests, tokenPriceRequests, _a, _b, owner, marketViewsRes, hedgerAndAdapterViews, blockNumber, hedgerViews, adapterViews, poolHedgerParams, tokenPrices, isPaused, markets, marketViews;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    viewerContract = (0, getLyraContract_1.default)(lyra, lyra_1.Version.Newport, contracts_1.LyraContractId.OptionMarketViewer);
                    exchangeAdapterContract = (0, getLyraContract_1.default)(lyra, lyra_1.Version.Newport, contracts_1.LyraContractId.ExchangeAdapter);
                    globalOwnerReq = {
                        contract: exchangeAdapterContract,
                        function: 'owner',
                        args: [],
                    };
                    return [4 /*yield*/, (0, fetchMarketAddresses_1.default)(lyra)];
                case 1:
                    allMarketAddresses = _c.sent();
                    hedgerRequests = !(0, isTestnet_1.default)(lyra)
                        ? allMarketAddresses.map(function (marketAddresses) {
                            var poolHedger = (0, getLyraMarketContract_1.default)(lyra, marketAddresses, lyra_1.Version.Newport, contracts_1.LyraMarketContractId.PoolHedger);
                            return {
                                contract: poolHedger,
                                function: 'getHedgerState',
                                args: [],
                            };
                        })
                        : [];
                    adapterRequests = allMarketAddresses.map(function (marketAddresses) {
                        return {
                            contract: exchangeAdapterContract,
                            function: 'getAdapterState',
                            args: [marketAddresses.optionMarket],
                        };
                    });
                    hedgerParamsRequests = !(0, isTestnet_1.default)(lyra)
                        ? allMarketAddresses.map(function (marketAddresses) {
                            var poolHedger = (0, getLyraMarketContract_1.default)(lyra, marketAddresses, lyra_1.Version.Newport, contracts_1.LyraMarketContractId.PoolHedger);
                            return {
                                contract: poolHedger,
                                function: 'getPoolHedgerParams',
                                args: [],
                            };
                        })
                        : [];
                    tokenPriceRequests = allMarketAddresses.map(function (marketAddresses) {
                        var liquidityPool = (0, getLyraMarketContract_1.default)(lyra, marketAddresses, lyra_1.Version.Newport, contracts_1.LyraMarketContractId.LiquidityPool);
                        return {
                            contract: liquidityPool,
                            function: 'getTokenPrice',
                            args: [],
                        };
                    });
                    return [4 /*yield*/, (0, multicall_1.default)(lyra, __spreadArray(__spreadArray(__spreadArray(__spreadArray([
                            globalOwnerReq,
                            {
                                contract: viewerContract,
                                function: 'getMarkets',
                                args: [allMarketAddresses.map(function (a) { return a.optionMarket; })],
                            }
                        ], hedgerRequests, true), adapterRequests, true), hedgerParamsRequests, true), tokenPriceRequests, true))];
                case 2:
                    _a = _c.sent(), _b = _a.returnData, owner = _b[0], marketViewsRes = _b[1], hedgerAndAdapterViews = _b.slice(2), blockNumber = _a.blockNumber;
                    hedgerViews = hedgerAndAdapterViews.slice(0, hedgerRequests.length);
                    adapterViews = hedgerAndAdapterViews.slice(hedgerRequests.length, hedgerRequests.length + adapterRequests.length);
                    poolHedgerParams = hedgerAndAdapterViews.slice(hedgerRequests.length + adapterRequests.length, hedgerRequests.length + adapterRequests.length + hedgerParamsRequests.length);
                    tokenPrices = hedgerAndAdapterViews.slice(hedgerRequests.length + adapterRequests.length + hedgerParamsRequests.length);
                    isPaused = marketViewsRes.isPaused, markets = marketViewsRes.markets;
                    marketViews = markets.map(function (marketView, i) {
                        return {
                            marketView: marketView,
                            hedgerView: !(0, isTestnet_1.default)(lyra)
                                ? hedgerViews[i]
                                : // HACK: Cast ViewStruct to ViewStructOutput
                                    TESTNET_HEDGER_VIEW,
                            adapterView: adapterViews[i],
                            poolHedgerParams: !(0, isTestnet_1.default)(lyra) ? poolHedgerParams[i] : TESTNET_POOL_HEDGER_PARAMS,
                            tokenPrice: tokenPrices[i],
                            baseLimit: null,
                        };
                    });
                    return [2 /*return*/, { marketViews: marketViews, isGlobalPaused: isPaused, owner: owner, blockNumber: blockNumber }];
            }
        });
    });
}
exports.default = fetchNewportMarketViews;
//# sourceMappingURL=fetchNewportMarketViews.js.map