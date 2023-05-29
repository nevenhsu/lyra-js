import { RewardEpochToken, RewardEpochTokenAmount, RewardEpochTokenConfig, RewardEpochTokenPrice } from '../global_reward_epoch';
import Lyra, { Deployment } from '../lyra';
export type GlobalRewardEpochData = {
    deployment: Deployment;
    startTimestamp: number;
    startEarningTimestamp?: number;
    endTimestamp: number;
    distributionTimestamp: number;
    isDepositPeriod?: boolean;
    lastUpdated: number;
    totalStkLyraDays: number;
    scaledStkLyraDays: {
        [market: string]: number;
    };
    totalLpTokenDays: {
        [market: string]: number;
    };
    totalBoostedLpTokenDays: {
        [market: string]: number;
    };
    globalStakingRewards: RewardEpochTokenAmount[];
    globalMMVRewards: {
        [market: string]: RewardEpochTokenAmount[];
    };
    globalTradingRewards: GlobalTradingRewards;
    tradingRewardConfig: GlobalTradingRewardsConfig;
    MMVConfig: GlobalMMVConfig;
    tokenPrices?: RewardEpochTokenPrice[];
};
export type GlobalTradingRewards = {
    totalRewards?: RewardEpochTokenAmount[];
    totalFees: number;
    totalTradingRebateRewards: RewardEpochTokenAmount[];
    totalShortCollateralRewards: RewardEpochTokenAmount[];
    totalShortCallSeconds: number;
    totalShortPutSeconds: number;
    scaleFactors: RewardEpochTokenAmount[];
};
export type GlobalTradingRewardsConfig = {
    useRebateTable: boolean;
    rebateRateTable: {
        cutoff: number;
        returnRate: number;
    }[];
    boostRateTable: {
        stakingCutoff: number;
        tradingCutoff: number;
        isReferred: boolean;
        label: string;
        boostRate: number;
    }[];
    maxRebatePercentage: number;
    netVerticalStretch: number;
    verticalShift: number;
    vertIntercept: number;
    stretchiness: number;
    tokens: GlobalTradingRewardsRewardEpochTokenConfig[];
    referredTradersTokens?: RewardEpochToken[];
};
export type GlobalMMVConfig = {
    [market: string]: {
        tokens: RewardEpochTokenConfig[];
        x: number;
        totalStkScaleFactor: number;
        ignoreList: string[];
    };
};
type GlobalTradingRewardsRewardEpochTokenConfig = RewardEpochToken & {
    cap: number;
    floorTokenPrice: number;
    fixedPrice: number;
    portion: number;
};
export default function fetchGlobalRewardEpochData(lyra: Lyra): Promise<GlobalRewardEpochData[]>;
export {};
