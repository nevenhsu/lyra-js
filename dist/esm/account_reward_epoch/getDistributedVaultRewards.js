import fromBigNumber from '../utils/fromBigNumber';
const CLAIM_ADDED_VAULTS_TAG = 'MMV';
export default function getDistributedVaultRewards(market, globalRewardEpoch, claimAddedEvents) {
    const vaultRewardsMap = claimAddedEvents
        .filter(event => {
        const [program, marketKey] = event.tag.split('-');
        return (program === CLAIM_ADDED_VAULTS_TAG &&
            marketKey.toLowerCase() === market.baseToken.symbol.toLowerCase() &&
            event.epochTimestamp === globalRewardEpoch.startTimestamp);
    })
        .reduce((vaultRewardsMap, event) => {
        const rewardToken = globalRewardEpoch.vaultRewardTokens.find(t => t.address.toLowerCase() === event.rewardToken.toLowerCase());
        if (!rewardToken) {
            // console.warn('Missing token info in global epoch config', event.rewardToken)
            return vaultRewardsMap;
        }
        if (vaultRewardsMap[rewardToken.address]) {
            vaultRewardsMap[rewardToken.address].amount += fromBigNumber(event.amount, rewardToken.decimals);
        }
        return {
            ...vaultRewardsMap,
            [rewardToken.address]: { ...rewardToken, amount: fromBigNumber(event.amount, rewardToken.decimals) },
        };
    }, {});
    return Object.values(vaultRewardsMap);
}
//# sourceMappingURL=getDistributedVaultRewards.js.map