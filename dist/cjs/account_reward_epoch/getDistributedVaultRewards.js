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
var CLAIM_ADDED_VAULTS_TAG = 'MMV';
function getDistributedVaultRewards(market, globalRewardEpoch, claimAddedEvents) {
    var vaultRewardsMap = claimAddedEvents
        .filter(function (event) {
        var tags = event.tag.split('-');
        var allUpperCaseTags = tags.map(function (tag) { return tag.toUpperCase(); });
        return (allUpperCaseTags.includes(CLAIM_ADDED_VAULTS_TAG) &&
            allUpperCaseTags.includes(market.baseToken.symbol.toUpperCase()) &&
            market.baseToken.symbol.toUpperCase() !== 'OP' &&
            event.epochTimestamp === globalRewardEpoch.startTimestamp);
    })
        .reduce(function (vaultRewardsMap, event) {
        var _a;
        var rewardToken = globalRewardEpoch.vaultRewardTokens.find(function (t) { return t.address.toLowerCase() === event.rewardToken.toLowerCase(); });
        if (!rewardToken) {
            // console.warn('Missing token info in global epoch config', event.rewardToken)
            return vaultRewardsMap;
        }
        if (vaultRewardsMap[rewardToken.address]) {
            vaultRewardsMap[rewardToken.address].amount += (0, fromBigNumber_1.default)(event.amount, rewardToken.decimals);
        }
        return __assign(__assign({}, vaultRewardsMap), (_a = {}, _a[rewardToken.address] = __assign(__assign({}, rewardToken), { amount: (0, fromBigNumber_1.default)(event.amount, rewardToken.decimals) }), _a));
    }, {});
    return Object.values(vaultRewardsMap);
}
exports.default = getDistributedVaultRewards;
//# sourceMappingURL=getDistributedVaultRewards.js.map