import { ClaimAddedEvent, GlobalRewardEpoch, RewardEpochTokenAmount } from '..';
export default function getDistributedTradingRewards(globalRewardEpoch: GlobalRewardEpoch, claimAddedEvents: ClaimAddedEvent[]): RewardEpochTokenAmount[];
