import { ClaimAddedEvent, ClaimEvent, RewardEpochToken, RewardEpochTokenAmount } from '..';
export default function getTotalClaimableTradingRewards(rewardTokens: RewardEpochToken[], claimAddedEvents: ClaimAddedEvent[], claimEvents: ClaimEvent[]): RewardEpochTokenAmount[];
