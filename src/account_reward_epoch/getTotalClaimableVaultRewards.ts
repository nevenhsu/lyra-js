import { ClaimAddedEvent, ClaimEvent, Market, RewardEpochToken, RewardEpochTokenAmount } from '..'
import fromBigNumber from '../utils/fromBigNumber'

const CLAIM_ADDED_VAULTS_TAG = 'MMV'

export default function getTotalClaimableVaultRewards(
  market: Market,
  rewardTokens: RewardEpochToken[],
  claimAddedEvents: ClaimAddedEvent[],
  claimEvents: ClaimEvent[]
): RewardEpochTokenAmount[] {
  const vaultRewardsMap: Record<string, RewardEpochTokenAmount> = claimAddedEvents
    .filter(event => {
      const [program, marketKey] = event.tag.split('-')
      return program === CLAIM_ADDED_VAULTS_TAG && marketKey.toLowerCase() === market.baseToken.symbol.toLowerCase()
    })
    .reduce((vaultRewardsMap, event) => {
      const isClaimed = claimEvents.some(
        claimEvent => claimEvent.timestamp > event.timestamp && claimEvent.rewardToken === event.rewardToken
      )

      if (isClaimed) {
        return vaultRewardsMap
      }

      const rewardToken = rewardTokens.find(t => t.address.toLowerCase() === event.rewardToken.toLowerCase())
      if (!rewardToken) {
        console.warn('Missing token info in global epoch config', event.rewardToken)
        return vaultRewardsMap
      }

      if (vaultRewardsMap[rewardToken.address]) {
        vaultRewardsMap[rewardToken.address].amount += fromBigNumber(event.amount, rewardToken.decimals)
      }

      return {
        ...vaultRewardsMap,
        [rewardToken.address]: { ...rewardToken, amount: fromBigNumber(event.amount, rewardToken.decimals) },
      }
    }, {} as Record<string, RewardEpochTokenAmount>)

  return Object.values(vaultRewardsMap).filter(r => r.amount > 0)
}
