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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fromBigNumber_1 = __importDefault(require("../utils/fromBigNumber"));
var CLAIM_ADDED_TRADING_TAG = 'TRADING';
function getTotalClaimableTradingRewards(rewardTokens, claimAddedEvents, claimEvents) {
    var tradingRewardsMap = claimAddedEvents
        .filter(function (event) {
        var tags = event.tag.split('-');
        return tags.includes(CLAIM_ADDED_TRADING_TAG);
    })
        .reduce(function (tradingRewardsMap, event) {
        var _a;
        var isClaimed = claimEvents.some(function (claimEvent) { return claimEvent.timestamp > event.timestamp && claimEvent.rewardToken === event.rewardToken; });
        if (isClaimed) {
            return tradingRewardsMap;
        }
        var rewardToken = rewardTokens.find(function (t) { return t.address.toLowerCase() === event.rewardToken.toLowerCase(); });
        if (!rewardToken) {
            console.warn('Missing token info in global epoch config', event.rewardToken);
            return tradingRewardsMap;
        }
        if (tradingRewardsMap[rewardToken.address]) {
            tradingRewardsMap[rewardToken.address].amount += (0, fromBigNumber_1.default)(event.amount, rewardToken.decimals);
        }
        return __assign(__assign({}, tradingRewardsMap), (_a = {}, _a[rewardToken.address] = __assign(__assign({}, rewardToken), { amount: (0, fromBigNumber_1.default)(event.amount, rewardToken.decimals) }), _a));
    }, {});
    return Object.values(tradingRewardsMap).filter(function (r) { return r.amount > 0; });
}
exports.default = getTotalClaimableTradingRewards;
//# sourceMappingURL=getTotalClaimableTradingRewards.js.map