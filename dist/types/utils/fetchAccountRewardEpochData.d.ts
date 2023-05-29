import { RewardEpochTokenAmount } from '../global_reward_epoch';
import Lyra, { Deployment } from '../lyra';
export type AccountRewardEpochData = {
    account: string;
    deployment: Deployment;
    startTimestamp: number;
    endTimestamp: number;
    lastUpdated: number;
    stakingRewards: AccountStakingRewards;
    mmvRewards: AccountMMVRewards;
    tradingRewards: AccountTradingRewards;
    integratorTradingRewards?: AccountTradingRewards;
};
export type AccountStakingRewards = {
    isIgnored: boolean;
    rewards: RewardEpochTokenAmount[];
    stkLyraDays: number;
};
export type AccountMMVRewards = {
    [market: string]: {
        lpDays: number;
        boostedLpDays: number;
        rewards: RewardEpochTokenAmount[];
        isIgnored: boolean;
    };
};
export type AccountTradingRewards = {
    fees: number;
    effectiveRebateRate: number;
    tradingRebateRewardDollars: number;
    totalTradingRewardDollars: number;
    shortCallSeconds: number;
    shortPutSeconds: number;
    rewards: {
        trading: RewardEpochTokenAmount[];
    };
};
export default function fetchAccountRewardEpochData(lyra: Lyra, account: string): Promise<AccountRewardEpochData[]>;
