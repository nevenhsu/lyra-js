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
var bn_1 = require("../constants/bn");
var position_1 = require("../position");
var fromBigNumber_1 = __importDefault(require("./fromBigNumber"));
var sortBy = function (a, b, sortBy) {
    switch (sortBy) {
        case position_1.PositionLeaderboardSortBy.RealizedPnl:
            return (0, fromBigNumber_1.default)(b.realizedPnl.sub(a.realizedPnl));
        case position_1.PositionLeaderboardSortBy.RealizedLongPnl:
            return (0, fromBigNumber_1.default)(b.realizedLongPnl.sub(a.realizedLongPnl));
        case position_1.PositionLeaderboardSortBy.RealizedLongPnlPercentage:
            return (0, fromBigNumber_1.default)(b.realizedLongPnlPercentage.sub(a.realizedLongPnlPercentage));
        case position_1.PositionLeaderboardSortBy.UnrealizedPnl:
            return (0, fromBigNumber_1.default)(b.unrealizedPnl.sub(a.unrealizedPnl));
        case position_1.PositionLeaderboardSortBy.UnrealizedLongPnl:
            return (0, fromBigNumber_1.default)(b.unrealizedLongPnl.sub(a.unrealizedLongPnl));
        case position_1.PositionLeaderboardSortBy.UnrealizedLongPnlPercentage:
            return (0, fromBigNumber_1.default)(b.unrealizedLongPnlPercentage.sub(a.unrealizedLongPnlPercentage));
    }
};
function fetchLeaderboard(lyra, options) {
    return __awaiter(this, void 0, void 0, function () {
        var positions, minTotalPremiums, minTotalLongPremiums, positionByWallet, leaderboard, secondarySortBy;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, lyra.allPositions(options)];
                case 1:
                    positions = _a.sent();
                    minTotalPremiums = options === null || options === void 0 ? void 0 : options.minTotalPremiums;
                    minTotalLongPremiums = options === null || options === void 0 ? void 0 : options.minTotalLongPremiums;
                    positionByWallet = positions.reduce(function (dict, position) {
                        var _a;
                        var _b;
                        var positions = (_b = dict[position.owner]) !== null && _b !== void 0 ? _b : [];
                        return __assign(__assign({}, dict), (_a = {}, _a[position.owner] = __spreadArray(__spreadArray([], positions, true), [position], false), _a));
                    }, {});
                    leaderboard = Object.entries(positionByWallet)
                        .map(function (_a) {
                        var account = _a[0], positions = _a[1];
                        var accountUnrealizedPnl = bn_1.ZERO_BN;
                        var accountRealizedPnl = bn_1.ZERO_BN;
                        var accountRealizedLongPnl = bn_1.ZERO_BN;
                        var accountUnrealizedLongPnl = bn_1.ZERO_BN;
                        var totalLongAverageCloseOrSettleCost = bn_1.ZERO_BN;
                        var totalLongAverageOpenCost = bn_1.ZERO_BN;
                        var totalNotionalVolume = bn_1.ZERO_BN;
                        var totalPremiums = bn_1.ZERO_BN;
                        var totalLongPremiums = bn_1.ZERO_BN;
                        positions
                            // Ignore transferred positions in P&L calcs
                            .filter(function (p) { return p.transfers().length === 0; })
                            .forEach(function (position) {
                            var isLong = position.isLong, isSettled = position.isSettled;
                            var _a = position.pnl(), realizedPnl = _a.realizedPnl, settlementPnl = _a.settlementPnl, unrealizedPnl = _a.unrealizedPnl, totalAverageCloseCost = _a.totalAverageCloseCost, totalAverageOpenCost = _a.totalAverageOpenCost;
                            accountRealizedPnl = accountRealizedPnl.add(realizedPnl).add(settlementPnl);
                            accountUnrealizedPnl = accountUnrealizedPnl.add(unrealizedPnl);
                            if (isLong) {
                                accountRealizedLongPnl = accountRealizedLongPnl.add(realizedPnl).add(settlementPnl);
                                accountUnrealizedLongPnl = accountUnrealizedLongPnl.add(unrealizedPnl);
                                totalLongAverageCloseOrSettleCost = totalLongAverageCloseOrSettleCost.add(totalAverageCloseCost);
                                if (isSettled) {
                                    // Include avg open cost on settled positions
                                    totalLongAverageCloseOrSettleCost = totalLongAverageCloseOrSettleCost.add(totalAverageOpenCost);
                                }
                                else {
                                    // Ignore avg open cost on settled positions
                                    totalLongAverageOpenCost = totalLongAverageOpenCost.add(totalAverageOpenCost);
                                }
                                totalLongPremiums = totalLongPremiums.add(position.trades().reduce(function (sum, trade) { return sum.add(trade.premium); }, bn_1.ZERO_BN));
                            }
                            totalNotionalVolume = totalNotionalVolume.add(position.trades().reduce(function (sum, trade) {
                                var volume = trade.strikePrice.mul(trade.size).div(bn_1.UNIT);
                                return sum.add(volume);
                            }, bn_1.ZERO_BN));
                            totalPremiums = totalPremiums.add(position.trades().reduce(function (sum, trade) { return sum.add(trade.premium); }, bn_1.ZERO_BN));
                        });
                        var realizedLongPnlPercentage = totalLongAverageCloseOrSettleCost.gt(0)
                            ? accountRealizedLongPnl.mul(bn_1.UNIT).div(totalLongAverageCloseOrSettleCost)
                            : bn_1.ZERO_BN;
                        var unrealizedLongPnlPercentage = totalLongAverageOpenCost.gt(0)
                            ? accountUnrealizedLongPnl.mul(bn_1.UNIT).div(totalLongAverageOpenCost)
                            : bn_1.ZERO_BN;
                        return {
                            account: account,
                            realizedPnl: accountRealizedPnl,
                            unrealizedPnl: accountUnrealizedPnl,
                            realizedLongPnl: accountRealizedLongPnl,
                            realizedLongPnlPercentage: realizedLongPnlPercentage,
                            unrealizedLongPnl: accountUnrealizedLongPnl,
                            unrealizedLongPnlPercentage: unrealizedLongPnlPercentage,
                            totalPremiums: totalPremiums,
                            totalLongPremiums: totalLongPremiums,
                            totalNotionalVolume: totalNotionalVolume,
                            positions: positions,
                        };
                    })
                        .filter(function (user) {
                        if (minTotalPremiums && user.totalPremiums.lt(minTotalPremiums)) {
                            return false;
                        }
                        if (minTotalLongPremiums && user.totalLongPremiums.lt(minTotalLongPremiums)) {
                            return false;
                        }
                        return true;
                    });
                    secondarySortBy = options === null || options === void 0 ? void 0 : options.secondarySortBy;
                    if (secondarySortBy) {
                        leaderboard.sort(function (a, b) { return sortBy(a, b, secondarySortBy); });
                    }
                    leaderboard.sort(function (a, b) { var _a; return sortBy(a, b, (_a = options === null || options === void 0 ? void 0 : options.sortBy) !== null && _a !== void 0 ? _a : position_1.PositionLeaderboardSortBy.RealizedPnl); });
                    return [2 /*return*/, leaderboard];
            }
        });
    });
}
exports.default = fetchLeaderboard;
//# sourceMappingURL=fetchLeaderboard.js.map