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
var contracts_1 = require("../constants/contracts");
var callContractWithMulticall_1 = __importDefault(require("../utils/callContractWithMulticall"));
var getERC20Contract_1 = __importDefault(require("../utils/getERC20Contract"));
var getLyraMarketContract_1 = __importDefault(require("../utils/getLyraMarketContract"));
function fetchAccountBalancesAndAllowances(lyra, owner) {
    return __awaiter(this, void 0, void 0, function () {
        var markets;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, lyra.markets()];
                case 1:
                    markets = _a.sent();
                    return [4 /*yield*/, Promise.all(markets.map(function (market) { return __awaiter(_this, void 0, void 0, function () {
                            var quoteToken, baseToken, optionMarket, liquidityPool, liquidityToken, _a, quoteSymbol, quoteDecimals, quoteBalance, quoteTradeAllowance, quoteDepositAllowance, baseSymbol, baseDecimals, baseBalance, baseTradeAllowance, liquidityBalance;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        quoteToken = (0, getERC20Contract_1.default)(lyra.provider, market.quoteToken.address);
                                        baseToken = (0, getERC20Contract_1.default)(lyra.provider, market.baseToken.address);
                                        optionMarket = (0, getLyraMarketContract_1.default)(lyra, market.contractAddresses, lyra.version, contracts_1.LyraMarketContractId.OptionMarket);
                                        liquidityPool = (0, getLyraMarketContract_1.default)(lyra, market.contractAddresses, lyra.version, contracts_1.LyraMarketContractId.LiquidityPool);
                                        liquidityToken = (0, getLyraMarketContract_1.default)(lyra, market.contractAddresses, lyra.version, contracts_1.LyraMarketContractId.LiquidityToken);
                                        return [4 /*yield*/, (0, callContractWithMulticall_1.default)(lyra, [
                                                {
                                                    callData: quoteToken.interface.encodeFunctionData('symbol'),
                                                    contract: quoteToken,
                                                    functionFragment: 'symbol',
                                                },
                                                {
                                                    callData: quoteToken.interface.encodeFunctionData('decimals'),
                                                    contract: quoteToken,
                                                    functionFragment: 'decimals',
                                                },
                                                {
                                                    callData: quoteToken.interface.encodeFunctionData('balanceOf', [owner]),
                                                    contract: quoteToken,
                                                    functionFragment: 'balanceOf',
                                                },
                                                {
                                                    callData: quoteToken.interface.encodeFunctionData('allowance', [owner, optionMarket.address]),
                                                    contract: quoteToken,
                                                    functionFragment: 'allowance',
                                                },
                                                {
                                                    callData: quoteToken.interface.encodeFunctionData('allowance', [owner, liquidityPool.address]),
                                                    contract: quoteToken,
                                                    functionFragment: 'allowance',
                                                },
                                                {
                                                    callData: baseToken.interface.encodeFunctionData('symbol'),
                                                    contract: baseToken,
                                                    functionFragment: 'symbol',
                                                },
                                                {
                                                    callData: baseToken.interface.encodeFunctionData('decimals'),
                                                    contract: baseToken,
                                                    functionFragment: 'decimals',
                                                },
                                                {
                                                    callData: baseToken.interface.encodeFunctionData('balanceOf', [owner]),
                                                    contract: baseToken,
                                                    functionFragment: 'balanceOf',
                                                },
                                                {
                                                    callData: baseToken.interface.encodeFunctionData('allowance', [owner, optionMarket.address]),
                                                    contract: baseToken,
                                                    functionFragment: 'allowance',
                                                },
                                                {
                                                    callData: liquidityToken.interface.encodeFunctionData('balanceOf', [owner]),
                                                    contract: liquidityToken,
                                                    functionFragment: 'balanceOf',
                                                },
                                            ])];
                                    case 1:
                                        _a = _b.sent(), quoteSymbol = _a[0][0], quoteDecimals = _a[1][0], quoteBalance = _a[2][0], quoteTradeAllowance = _a[3][0], quoteDepositAllowance = _a[4][0], baseSymbol = _a[5][0], baseDecimals = _a[6][0], baseBalance = _a[7][0], baseTradeAllowance = _a[8][0], liquidityBalance = _a[9][0];
                                        return [2 /*return*/, {
                                                owner: owner,
                                                market: market,
                                                marketAddress: market.address,
                                                marketName: market.name,
                                                quoteAsset: {
                                                    address: quoteToken.address,
                                                    balance: quoteBalance,
                                                    symbol: quoteSymbol,
                                                    decimals: quoteDecimals,
                                                    tradeAllowance: quoteTradeAllowance,
                                                    depositAllowance: quoteDepositAllowance,
                                                },
                                                baseAsset: {
                                                    address: baseToken.address,
                                                    symbol: baseSymbol,
                                                    decimals: baseDecimals,
                                                    balance: baseBalance,
                                                    tradeAllowance: baseTradeAllowance,
                                                },
                                                liquidityToken: {
                                                    address: liquidityToken.address,
                                                    symbol: "".concat(market.baseToken.symbol, "LP"),
                                                    balance: liquidityBalance,
                                                    decimals: 18,
                                                },
                                            }];
                                }
                            });
                        }); }))];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.default = fetchAccountBalancesAndAllowances;
//# sourceMappingURL=fetchAccountBalancesAndAllowances.js.map