import { Block } from '@ethersproject/providers';
import { Market, MarketLiquiditySnapshot } from '..';
import { AccountRewardEpoch } from '../account_reward_epoch';
import Lyra from '../lyra';
import { GlobalRewardEpochData } from '../utils/fetchGlobalRewardEpochData';
export type GlobalRewardEpochTradingBoostTier = {
    stakingCutoff: number;
    tradingCutoff: number;
    isReferred: boolean;
    label: string;
    boost: number;
};
export type RewardEpochToken = {
    address: string;
    symbol: string;
    decimals: number;
};
export type RewardEpochTokenAmount = RewardEpochToken & {
    amount: number;
};
export type RewardEpochTokenPrice = RewardEpochToken & {
    price: number;
};
export type RewardEpochTokenConfig = RewardEpochToken & {
    amount: number;
};
export declare class GlobalRewardEpoch {
    lyra: Lyra;
    epoch: GlobalRewardEpochData;
    id: number;
    progressDays: number;
    markets: Market[];
    marketsLiquidity: MarketLiquiditySnapshot[];
    blockTimestamp: number;
    startTimestamp: number;
    distributionTimestamp: number;
    startEarningTimestamp?: number;
    endTimestamp: number;
    isDepositPeriod?: boolean;
    duration: number;
    lastUpdatedTimestamp: number;
    isCurrent: boolean;
    isComplete: boolean;
    totalAverageStakedLyra: number;
    tradingRewardsCap: RewardEpochTokenAmount[];
    tradingBoostTiers: GlobalRewardEpochTradingBoostTier[];
    vaultRewardTokens: RewardEpochToken[];
    tradingRewardTokens: RewardEpochToken[];
    rewardTokens: RewardEpochToken[];
    private tokenPriceMap;
    constructor(lyra: Lyra, id: number, epoch: GlobalRewardEpochData, markets: Market[], marketsLiquidity: MarketLiquiditySnapshot[], block: Block);
    static getAll(lyra: Lyra): Promise<GlobalRewardEpoch[]>;
    static getLatest(lyra: Lyra): Promise<GlobalRewardEpoch | null>;
    static getByStartTimestamp(lyra: Lyra, startTimestamp: number): Promise<GlobalRewardEpoch | null>;
    vaultApy(marketAddressOrName: string, stakedLyraBalance: number, vaultTokenBalance: number): RewardEpochTokenAmount[];
    vaultApyTotal(marketAddressOrName: string, stakedLyraBalance: number, _vaultTokenBalance: number): number;
    vaultMaxBoost(marketAddressOrName: string, vaultTokenBalance: number): number;
    vaultApyMultiplier(marketAddressOrName: string, stakedLyraBalance: number, vaultTokenBalance: number): number;
    minVaultApy(marketAddressOrName: string): RewardEpochTokenAmount[];
    maxVaultApy(marketAddressOrName: string): RewardEpochTokenAmount[];
    totalVaultRewards(marketAddressOrName: string): RewardEpochTokenAmount[];
    totalAverageVaultTokens(marketAddressOrName: string): number;
    totalAverageBoostedVaultTokens(marketAddressOrName: string): number;
    accountRewardEpoch(address: string): Promise<AccountRewardEpoch | null>;
}
