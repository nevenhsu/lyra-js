import fromBigNumber from '../utils/fromBigNumber';
const CLAIM_ADDED_TRADING_TAG = 'TRADING';
export default function getTotalClaimableTradingRewards(rewardTokens, claimAddedEvents, claimEvents) {
    const tradingRewardsMap = claimAddedEvents
        .filter(event => {
        const [program] = event.tag.split('-');
        return program === CLAIM_ADDED_TRADING_TAG;
    })
        .reduce((tradingRewardsMap, event) => {
        const isClaimed = claimEvents.some(claimEvent => claimEvent.timestamp > event.timestamp && claimEvent.rewardToken === event.rewardToken);
        if (isClaimed) {
            return tradingRewardsMap;
        }
        const rewardToken = rewardTokens.find(t => t.address.toLowerCase() === event.rewardToken.toLowerCase());
        if (!rewardToken) {
            console.warn('Missing token info in global epoch config', event.rewardToken);
            return tradingRewardsMap;
        }
        if (tradingRewardsMap[rewardToken.address]) {
            tradingRewardsMap[rewardToken.address].amount += fromBigNumber(event.amount, rewardToken.decimals);
        }
        return {
            ...tradingRewardsMap,
            [rewardToken.address]: { ...rewardToken, amount: fromBigNumber(event.amount, rewardToken.decimals) },
        };
    }, {});
    return Object.values(tradingRewardsMap).filter(r => r.amount > 0);
}
//# sourceMappingURL=getTotalClaimableTradingRewards.js.map