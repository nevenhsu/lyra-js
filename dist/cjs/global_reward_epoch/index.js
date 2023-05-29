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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
exports.GlobalRewardEpoch = void 0;
var __1 = require("..");
var account_reward_epoch_1 = require("../account_reward_epoch");
var time_1 = require("../constants/time");
var fetchGlobalRewardEpochData_1 = __importDefault(require("../utils/fetchGlobalRewardEpochData"));
var findMarketX_1 = __importDefault(require("../utils/findMarketX"));
var fromBigNumber_1 = __importDefault(require("../utils/fromBigNumber"));
var getEffectiveLiquidityTokens_1 = __importStar(require("../utils/getEffectiveLiquidityTokens"));
var getUniqueBy_1 = __importDefault(require("../utils/getUniqueBy"));
var isMarketEqual_1 = __importDefault(require("../utils/isMarketEqual"));
var GlobalRewardEpoch = /** @class */ (function () {
    function GlobalRewardEpoch(lyra, id, epoch, markets, marketsLiquidity, block) {
        var _a, _b, _c, _d, _e;
        this.lyra = lyra;
        this.id = id;
        this.epoch = epoch;
        this.markets = markets;
        this.marketsLiquidity = marketsLiquidity;
        this.tradingBoostTiers = (_b = (_a = epoch.tradingRewardConfig) === null || _a === void 0 ? void 0 : _a.boostRateTable) === null || _b === void 0 ? void 0 : _b.map(function (tier) { return ({
            stakingCutoff: tier.stakingCutoff,
            tradingCutoff: tier.tradingCutoff,
            isReferred: tier.isReferred,
            label: tier.label,
            boost: tier.boostRate,
        }); });
        this.blockTimestamp = block.timestamp;
        this.startTimestamp = epoch.startTimestamp;
        this.lastUpdatedTimestamp = epoch.lastUpdated;
        this.endTimestamp = epoch.endTimestamp;
        this.distributionTimestamp = (_c = epoch.distributionTimestamp) !== null && _c !== void 0 ? _c : epoch.endTimestamp;
        this.isDepositPeriod = epoch.isDepositPeriod;
        this.startEarningTimestamp = epoch.startEarningTimestamp;
        this.isCurrent = this.blockTimestamp >= this.startTimestamp && this.blockTimestamp <= this.endTimestamp;
        this.isComplete = this.blockTimestamp > this.endTimestamp;
        var durationSeconds = Math.max(0, this.endTimestamp - this.startTimestamp);
        var progressSeconds = durationSeconds - Math.max(0, this.endTimestamp - this.blockTimestamp);
        this.duration = durationSeconds;
        this.progressDays = progressSeconds / time_1.SECONDS_IN_DAY;
        this.totalAverageStakedLyra = this.progressDays ? epoch.totalStkLyraDays / this.progressDays : 0;
        // Trading
        this.tradingRewardsCap = epoch.tradingRewardConfig.tokens.map(function (token) { return ({
            address: token.address,
            symbol: token.symbol,
            decimals: token.decimals,
            amount: token.cap,
        }); });
        this.tradingRewardTokens = (0, getUniqueBy_1.default)(epoch.tradingRewardConfig.tokens.filter(function (t) { return t.cap > 0; }), function (token) { return token.address.toLowerCase(); });
        this.vaultRewardTokens = (0, getUniqueBy_1.default)(Object.values(epoch.MMVConfig)
            .flatMap(function (e) { return e.tokens; })
            .filter(function (t) { return t.amount > 0; }), function (token) { return token.address.toLowerCase(); });
        this.rewardTokens = (0, getUniqueBy_1.default)(__spreadArray(__spreadArray([], this.tradingRewardTokens, true), this.vaultRewardTokens, true), function (r) { return r.address; });
        this.tokenPriceMap =
            (_e = (_d = epoch.tokenPrices) === null || _d === void 0 ? void 0 : _d.reduce(function (tokenPriceMap, tokenPrice) {
                var _a;
                return (__assign(__assign({}, tokenPriceMap), (_a = {}, _a[tokenPrice.address] = tokenPrice, _a)));
            }, {})) !== null && _e !== void 0 ? _e : {};
    }
    // Getters
    GlobalRewardEpoch.getAll = function (lyra) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, epochs, markets, block, marketsLiquidity;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (lyra.deployment !== __1.Deployment.Mainnet) {
                            return [2 /*return*/, []];
                        }
                        return [4 /*yield*/, Promise.all([
                                (0, fetchGlobalRewardEpochData_1.default)(lyra),
                                lyra.markets(),
                                lyra.provider.getBlock('latest'),
                            ])];
                    case 1:
                        _a = _b.sent(), epochs = _a[0], markets = _a[1], block = _a[2];
                        return [4 /*yield*/, Promise.all(markets.map(function (market) { return market.liquidity(); }))];
                    case 2:
                        marketsLiquidity = _b.sent();
                        return [2 /*return*/, epochs
                                .map(function (epoch, idx) { return new GlobalRewardEpoch(lyra, idx + 1, epoch, markets, marketsLiquidity, block); })
                                .sort(function (a, b) { return a.endTimestamp - b.endTimestamp; })];
                }
            });
        });
    };
    GlobalRewardEpoch.getLatest = function (lyra) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var epochs, latestEpoch;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (lyra.deployment !== __1.Deployment.Mainnet) {
                            return [2 /*return*/, null];
                        }
                        return [4 /*yield*/, this.getAll(lyra)];
                    case 1:
                        epochs = _b.sent();
                        latestEpoch = (_a = epochs.find(function (r) { return !r.isComplete; })) !== null && _a !== void 0 ? _a : epochs[epochs.length - 1];
                        return [2 /*return*/, latestEpoch !== null && latestEpoch !== void 0 ? latestEpoch : null];
                }
            });
        });
    };
    GlobalRewardEpoch.getByStartTimestamp = function (lyra, startTimestamp) {
        return __awaiter(this, void 0, void 0, function () {
            var epochs, epoch;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (lyra.deployment !== __1.Deployment.Mainnet) {
                            return [2 /*return*/, null];
                        }
                        return [4 /*yield*/, this.getAll(lyra)];
                    case 1:
                        epochs = _a.sent();
                        epoch = epochs.find(function (epoch) { return epoch.startTimestamp === startTimestamp; });
                        return [2 /*return*/, epoch !== null && epoch !== void 0 ? epoch : null];
                }
            });
        });
    };
    // Dynamic Fields
    GlobalRewardEpoch.prototype.vaultApy = function (marketAddressOrName, stakedLyraBalance, vaultTokenBalance) {
        var _this = this;
        var marketIdx = this.markets.findIndex(function (m) { return (0, isMarketEqual_1.default)(m, marketAddressOrName); });
        var market = this.markets[marketIdx];
        var marketKey = market.baseToken.symbol;
        var totalAvgVaultTokens = this.totalAverageVaultTokens(marketAddressOrName);
        var mmvConfig = this.epoch.MMVConfig[marketKey];
        var scaledStkLyraDays = this.epoch.scaledStkLyraDays[marketKey];
        if (!mmvConfig) {
            return [];
        }
        var totalAvgScaledStkLyra = this.progressDays ? scaledStkLyraDays / this.progressDays : 0;
        var effectiveLpTokensPerLpToken = (0, getEffectiveLiquidityTokens_1.default)(vaultTokenBalance, totalAvgVaultTokens, stakedLyraBalance, totalAvgScaledStkLyra, mmvConfig.x);
        // This ratio is for no staking -> staking w/ stkLyraBalance (noStakingMultiplier)
        // Vs UI apy multiplier is from zero staking -> staking w/ stkLyraBalance (vaultApyMultiplier)
        var apyMultiplier = (effectiveLpTokensPerLpToken / vaultTokenBalance) * 2;
        // const apyMultiplier = basePortionOfLiquidity > 0 ? boostedPortionOfLiquidity / basePortionOfLiquidity : 0
        // Calculate total vault token balance, including pending deposits
        var tokenPrice = (0, fromBigNumber_1.default)(this.marketsLiquidity[marketIdx].tokenPrice);
        var totalQueuedVaultTokens = tokenPrice > 0 ? (0, fromBigNumber_1.default)(this.marketsLiquidity[marketIdx].pendingDeposits) / tokenPrice : 0;
        var totalAvgAndQueuedVaultTokens = totalAvgVaultTokens + totalQueuedVaultTokens;
        var vaultTokensPerDollar = tokenPrice > 0 ? 1 / tokenPrice : 0;
        var pctSharePerDollar = totalAvgAndQueuedVaultTokens > 0 ? vaultTokensPerDollar / totalAvgAndQueuedVaultTokens : 0;
        return mmvConfig.tokens.map(function (token) {
            var _a, _b;
            var rewards = token.amount;
            var perDollarPerSecond = _this.duration > 0 ? (pctSharePerDollar * rewards) / _this.duration : 0;
            var price = (_b = (_a = _this.tokenPriceMap[token.address]) === null || _a === void 0 ? void 0 : _a.price) !== null && _b !== void 0 ? _b : 0;
            var apy = perDollarPerSecond * price * time_1.SECONDS_IN_YEAR * apyMultiplier;
            return {
                amount: apy,
                address: token.address,
                decimals: token.decimals,
                symbol: token.symbol,
            };
        });
    };
    GlobalRewardEpoch.prototype.vaultApyTotal = function (marketAddressOrName, stakedLyraBalance, _vaultTokenBalance) {
        return this.vaultApy(marketAddressOrName, stakedLyraBalance, _vaultTokenBalance).reduce(function (total, apy) { return total + apy.amount; }, 0);
    };
    GlobalRewardEpoch.prototype.vaultMaxBoost = function (marketAddressOrName, vaultTokenBalance) {
        var market = (0, findMarketX_1.default)(this.markets, marketAddressOrName);
        var marketKey = market.baseToken.symbol;
        var totalAvgVaultTokens = this.totalAverageVaultTokens(marketAddressOrName);
        var scaledStkLyraDays = this.epoch.scaledStkLyraDays[marketKey];
        var totalAvgScaledStkLyra = this.progressDays ? scaledStkLyraDays / this.progressDays : 0;
        return (0, getEffectiveLiquidityTokens_1.getMinimumStakedLyra)(totalAvgScaledStkLyra, vaultTokenBalance, totalAvgVaultTokens);
    };
    GlobalRewardEpoch.prototype.vaultApyMultiplier = function (marketAddressOrName, stakedLyraBalance, vaultTokenBalance) {
        var baseApy = this.vaultApyTotal(marketAddressOrName, 0, vaultTokenBalance);
        var boostedApy = this.vaultApyTotal(marketAddressOrName, stakedLyraBalance, vaultTokenBalance);
        return baseApy > 0 ? boostedApy / baseApy : 0;
    };
    GlobalRewardEpoch.prototype.minVaultApy = function (marketAddressOrName) {
        return this.vaultApy(marketAddressOrName, 0, 10000);
    };
    GlobalRewardEpoch.prototype.maxVaultApy = function (marketAddressOrName) {
        var market = (0, findMarketX_1.default)(this.markets, marketAddressOrName);
        var marketKey = market.baseToken.symbol;
        var scaledStkLyraDays = this.epoch.scaledStkLyraDays[marketKey];
        if (!scaledStkLyraDays) {
            return [];
        }
        var totalAvgScaledStkLyra = this.progressDays ? scaledStkLyraDays / this.progressDays : 0;
        return this.vaultApy(marketAddressOrName, totalAvgScaledStkLyra, 10000);
    };
    GlobalRewardEpoch.prototype.totalVaultRewards = function (marketAddressOrName) {
        var _a;
        var market = (0, findMarketX_1.default)(this.markets, marketAddressOrName);
        var marketKey = market.baseToken.symbol;
        return (_a = this.epoch.globalMMVRewards[marketKey]) !== null && _a !== void 0 ? _a : [];
    };
    GlobalRewardEpoch.prototype.totalAverageVaultTokens = function (marketAddressOrName) {
        var market = (0, findMarketX_1.default)(this.markets, marketAddressOrName);
        var marketKey = market.baseToken.symbol;
        return (0, fromBigNumber_1.default)(market.params.NAV);
        // const test = await market.liquidity()
        // test.
        // return this.progressDays ? (this.epoch.totalLpTokenDays[marketKey] ?? 0) / this.progressDays : 0
    };
    GlobalRewardEpoch.prototype.totalAverageBoostedVaultTokens = function (marketAddressOrName) {
        var _a;
        var market = (0, findMarketX_1.default)(this.markets, marketAddressOrName);
        var marketKey = market.baseToken.symbol;
        return this.progressDays ? ((_a = this.epoch.totalBoostedLpTokenDays[marketKey]) !== null && _a !== void 0 ? _a : 0) / this.progressDays : 0;
    };
    // Edge
    GlobalRewardEpoch.prototype.accountRewardEpoch = function (address) {
        return __awaiter(this, void 0, void 0, function () {
            var epochs, epoch;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, account_reward_epoch_1.AccountRewardEpoch.getByOwner(this.lyra, address)];
                    case 1:
                        epochs = _a.sent();
                        epoch = epochs.find(function (epoch) {
                            return epoch.globalEpoch.startTimestamp === _this.startTimestamp && epoch.globalEpoch.endTimestamp === _this.endTimestamp;
                        });
                        return [2 /*return*/, epoch !== null && epoch !== void 0 ? epoch : null];
                }
            });
        });
    };
    return GlobalRewardEpoch;
}());
exports.GlobalRewardEpoch = GlobalRewardEpoch;
//# sourceMappingURL=index.js.map