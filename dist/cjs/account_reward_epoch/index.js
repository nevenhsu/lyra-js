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
exports.AccountRewardEpoch = void 0;
var contracts_1 = require("../constants/contracts");
var rewards_1 = require("../constants/rewards");
var global_reward_epoch_1 = require("../global_reward_epoch");
var buildTx_1 = __importDefault(require("../utils/buildTx"));
var fetchAccountRewardEpochData_1 = __importDefault(require("../utils/fetchAccountRewardEpochData"));
var fetchClaimAddedEvents_1 = __importDefault(require("../utils/fetchClaimAddedEvents"));
var fetchClaimEvents_1 = __importDefault(require("../utils/fetchClaimEvents"));
var findMarketX_1 = __importDefault(require("../utils/findMarketX"));
var fromBigNumber_1 = __importDefault(require("../utils/fromBigNumber"));
var getGlobalContract_1 = __importDefault(require("../utils/getGlobalContract"));
var getUniqueBy_1 = __importDefault(require("../utils/getUniqueBy"));
var multicall_1 = __importDefault(require("../utils/multicall"));
var getDistributedTradingRewards_1 = __importDefault(require("./getDistributedTradingRewards"));
var getDistributedVaultRewards_1 = __importDefault(require("./getDistributedVaultRewards"));
var getTotalClaimableTradingRewards_1 = __importDefault(require("./getTotalClaimableTradingRewards"));
var getTotalClaimableVaultRewards_1 = __importDefault(require("./getTotalClaimableVaultRewards"));
var AccountRewardEpoch = /** @class */ (function () {
    function AccountRewardEpoch(lyra, account, accountEpoch, globalEpoch, claimAddedEvents, claimEvents, rewardTokens, totalClaimableRewards) {
        var _this = this;
        var _a, _b, _c, _d, _e, _f;
        this.lyra = lyra;
        this.account = account;
        this.globalEpoch = globalEpoch;
        this.accountEpoch = accountEpoch;
        var hasNewRewards = !!accountEpoch.tradingRewards.newRewards;
        var oldTradingRewardTokens = (_c = (_b = (_a = accountEpoch.tradingRewards) === null || _a === void 0 ? void 0 : _a.rewards) === null || _b === void 0 ? void 0 : _b.trading) !== null && _c !== void 0 ? _c : [];
        var newTradingRewardTokens = (_f = (_e = (_d = accountEpoch === null || accountEpoch === void 0 ? void 0 : accountEpoch.tradingRewards) === null || _d === void 0 ? void 0 : _d.newRewards) === null || _e === void 0 ? void 0 : _e.tokens) !== null && _f !== void 0 ? _f : [];
        var tradingRewardTokens = hasNewRewards ? newTradingRewardTokens : oldTradingRewardTokens;
        var distributedTradingRewards = (0, getDistributedTradingRewards_1.default)(globalEpoch, claimAddedEvents);
        this.isTradingRewardsDistributed = !!distributedTradingRewards.find(function (d) { return d.amount > 0; });
        this.tradingRewards = this.isTradingRewardsDistributed ? distributedTradingRewards : tradingRewardTokens;
        this.totalClaimableRewards = totalClaimableRewards;
        this.totalClaimableTradingRewards = (0, getTotalClaimableTradingRewards_1.default)(rewardTokens, claimAddedEvents, claimEvents);
        this.totalClaimableVaultRewardsMap = globalEpoch.markets.reduce(function (map, market) {
            var _a;
            return (__assign(__assign({}, map), (_a = {}, _a[market.baseToken.symbol] = (0, getTotalClaimableVaultRewards_1.default)(market, rewardTokens, claimAddedEvents, claimEvents), _a)));
        }, {});
        this.distributedVaultRewardsMap = globalEpoch.markets.reduce(function (map, market) {
            var _a;
            return (__assign(__assign({}, map), (_a = {}, _a[market.baseToken.symbol] = (0, getDistributedVaultRewards_1.default)(market, globalEpoch, claimAddedEvents), _a)));
        }, {});
        this.calculatedVaultRewardsMap = globalEpoch.markets.reduce(function (map, market) {
            var _a;
            var marketKey = market.baseToken.symbol;
            var mmvRewards = accountEpoch.mmvRewards ? accountEpoch.mmvRewards[marketKey] : null;
            var isIgnored = !!(mmvRewards === null || mmvRewards === void 0 ? void 0 : mmvRewards.isIgnored);
            return __assign(__assign({}, map), (_a = {}, _a[market.baseToken.symbol] = mmvRewards && !isIgnored ? mmvRewards.rewards.filter(function (r) { return r.amount > rewards_1.MIN_REWARD_AMOUNT; }) : [], _a));
        }, {});
        this.isVaultRewardsDistributedMap = globalEpoch.markets.reduce(function (map, market) {
            var _a;
            var _b;
            return (__assign(__assign({}, map), (_a = {}, _a[market.baseToken.symbol] = !!((_b = _this.distributedVaultRewardsMap[market.baseToken.symbol]) === null || _b === void 0 ? void 0 : _b.find(function (d) { return d.amount > 0; })), _a)));
        }, {});
    }
    // Getters
    AccountRewardEpoch.getByOwner = function (lyra, owner) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, accountEpochDatas, globalEpochs, claimAddedEvents, claimEvents, uniqueRewardTokens, distributorContract, returnData, totalClaimableBalances;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (lyra.deployment !== contracts_1.Deployment.Mainnet) {
                            return [2 /*return*/, []];
                        }
                        return [4 /*yield*/, Promise.all([
                                (0, fetchAccountRewardEpochData_1.default)(lyra, owner),
                                global_reward_epoch_1.GlobalRewardEpoch.getAll(lyra),
                                (0, fetchClaimAddedEvents_1.default)(lyra, owner),
                                (0, fetchClaimEvents_1.default)(lyra, owner),
                            ])];
                    case 1:
                        _a = _b.sent(), accountEpochDatas = _a[0], globalEpochs = _a[1], claimAddedEvents = _a[2], claimEvents = _a[3];
                        uniqueRewardTokens = (0, getUniqueBy_1.default)(globalEpochs.flatMap(function (e) { return e.rewardTokens; }), function (r) { return r.address; });
                        distributorContract = (0, getGlobalContract_1.default)(lyra, contracts_1.LyraGlobalContractId.MultiDistributor);
                        return [4 /*yield*/, (0, multicall_1.default)(lyra, uniqueRewardTokens.map(function (_a) {
                                var tokenAddress = _a.address;
                                return ({
                                    contract: distributorContract,
                                    function: 'claimableBalances',
                                    args: [owner, tokenAddress],
                                });
                            }))];
                    case 2:
                        returnData = (_b.sent()).returnData;
                        totalClaimableBalances = returnData
                            .map(function (amount, idx) { return (__assign(__assign({}, uniqueRewardTokens[idx]), { amount: (0, fromBigNumber_1.default)(amount, uniqueRewardTokens[idx].decimals) })); })
                            .filter(function (_a) {
                            var amount = _a.amount;
                            return amount > 0;
                        });
                        return [2 /*return*/, accountEpochDatas
                                .map(function (accountEpochData) {
                                var globalEpoch = globalEpochs.find(function (globalEpoch) {
                                    return globalEpoch.startTimestamp === accountEpochData.startTimestamp &&
                                        globalEpoch.endTimestamp === accountEpochData.endTimestamp;
                                });
                                if (!globalEpoch) {
                                    throw new Error('Missing corresponding global epoch for account epoch');
                                }
                                return new AccountRewardEpoch(lyra, owner, accountEpochData, globalEpoch, claimAddedEvents, claimEvents, uniqueRewardTokens, totalClaimableBalances);
                            })
                                .sort(function (a, b) { return a.globalEpoch.endTimestamp - b.globalEpoch.endTimestamp; })];
                }
            });
        });
    };
    AccountRewardEpoch.getByStartTimestamp = function (lyra, address, startTimestamp) {
        return __awaiter(this, void 0, void 0, function () {
            var epochs, epoch;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (lyra.deployment !== contracts_1.Deployment.Mainnet) {
                            return [2 /*return*/, null];
                        }
                        return [4 /*yield*/, AccountRewardEpoch.getByOwner(lyra, address)];
                    case 1:
                        epochs = _a.sent();
                        epoch = epochs.find(function (epoch) { return epoch.globalEpoch.startTimestamp === startTimestamp; });
                        return [2 /*return*/, epoch !== null && epoch !== void 0 ? epoch : null];
                }
            });
        });
    };
    AccountRewardEpoch.claim = function (lyra, address, tokenAddresses) {
        var distributorContract = (0, getGlobalContract_1.default)(lyra, contracts_1.LyraGlobalContractId.MultiDistributor);
        var calldata = distributorContract.interface.encodeFunctionData('claim', [tokenAddresses]);
        return (0, buildTx_1.default)(lyra.provider, lyra.provider.network.chainId, distributorContract.address, address, calldata);
    };
    // Dynamic Fields
    AccountRewardEpoch.prototype.vaultRewards = function (marketAddressOrName) {
        var market = (0, findMarketX_1.default)(this.globalEpoch.markets, marketAddressOrName);
        var marketKey = market.baseToken.symbol;
        if (this.isVaultRewardsDistributed(marketAddressOrName)) {
            return this.distributedVaultRewardsMap[marketKey];
        }
        else {
            return this.calculatedVaultRewardsMap[marketKey];
        }
    };
    AccountRewardEpoch.prototype.totalClaimableVaultRewards = function (marketAddressOrName) {
        var market = (0, findMarketX_1.default)(this.globalEpoch.markets, marketAddressOrName);
        var marketKey = market.baseToken.symbol;
        return this.totalClaimableVaultRewardsMap[marketKey];
    };
    AccountRewardEpoch.prototype.isVaultRewardsDistributed = function (marketAddressOrName) {
        var market = (0, findMarketX_1.default)(this.globalEpoch.markets, marketAddressOrName);
        var marketKey = market.baseToken.symbol;
        return this.isVaultRewardsDistributedMap[marketKey];
    };
    return AccountRewardEpoch;
}());
exports.AccountRewardEpoch = AccountRewardEpoch;
//# sourceMappingURL=index.js.map