import { ClaimAddedEvent, GlobalRewardEpoch, Market, RewardEpochTokenAmount } from '..';
export default function getDistributedVaultRewards(market: Market, globalRewardEpoch: GlobalRewardEpoch, claimAddedEvents: ClaimAddedEvent[]): RewardEpochTokenAmount[];
