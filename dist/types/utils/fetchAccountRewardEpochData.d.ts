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
export type DailyPoint = {
    points: number;
    day: number;
    fees: number;
    premium: number;
    size: number;
    volume: number;
    durationInSeconds: number;
    startOfDayTimestamp: number;
    endOfDayTimestamp: number;
    stakingBoost: number;
    tradingBoost: number;
    referralBoost: number;
    referrer: string | null;
    referrerFees: number;
    referrerBoost: number;
};
export type DailyPoints = {
    [startTimestamp: number]: DailyPoint;
};
export type NewTradingRewardsReferredTraders = {
    [trader: string]: {
        trader: string;
        trades: number;
        fees: number;
        premium: number;
        volume: number;
        tokens: RewardEpochTokenAmount[];
    };
};
export type NewTradingRewards = {
    points: {
        daily: DailyPoints;
        trades: number;
        fees: number;
        premium: number;
        size: number;
        durationInSeconds: number;
        averageBoost: number;
        total: number;
        volume: number;
        totalPercent: number;
    };
    tokens: RewardEpochTokenAmount[];
    referredTraders: NewTradingRewardsReferredTraders;
};
export type AccountTradingRewards = {
    fees: number;
    effectiveRebateRate: number;
    tradingRebateRewardDollars: number;
    shortCollateralRewardDollars: number;
    totalTradingRewardDollars: number;
    shortCallSeconds: number;
    shortPutSeconds: number;
    rewards: {
        trading: RewardEpochTokenAmount[];
        shortCollateral: RewardEpochTokenAmount[];
    };
    newRewards: NewTradingRewards;
};
export default function fetchAccountRewardEpochData(lyra: Lyra, account: string): Promise<AccountRewardEpochData[]>;
