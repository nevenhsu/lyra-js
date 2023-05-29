import { ClaimAddedEvent, ClaimEvent, Market, RewardEpochToken, RewardEpochTokenAmount } from '..';
export default function getTotalClaimableVaultRewards(market: Market, rewardTokens: RewardEpochToken[], claimAddedEvents: ClaimAddedEvent[], claimEvents: ClaimEvent[]): RewardEpochTokenAmount[];
