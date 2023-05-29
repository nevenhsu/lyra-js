import { Block } from '@ethersproject/providers';
import { Market, MarketLiquiditySnapshot } from '..';
import { AccountRewardEpoch } from '../account_reward_epoch';
import Lyra from '../lyra';
import { GlobalRewardEpochData } from '../utils/fetchGlobalRewardEpochData';
import { LyraStakingParams } from '../utils/fetchLyraStakingParams';
export type GlobalRewardEpochTradingFeeRebateTier = {
    stakedLyraCutoff: number;
    feeRebate: number;
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
    stakingParams: LyraStakingParams;
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
    minTradingFeeRebate: number;
    maxTradingFeeRebate: number;
    tradingRewardsCap: RewardEpochTokenAmount[];
    tradingFeeRebateTiers: GlobalRewardEpochTradingFeeRebateTier[];
    vaultRewardTokens: RewardEpochToken[];
    tradingRewardTokens: RewardEpochToken[];
    rewardTokens: RewardEpochToken[];
    private tokenPriceMap;
    constructor(lyra: Lyra, id: number, epoch: GlobalRewardEpochData, markets: Market[], marketsLiquidity: MarketLiquiditySnapshot[], stakingParams: LyraStakingParams, block: Block);
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
    tradingFeeRebate(stakedLyraBalance: number): number;
    tradingRewards(tradingFees: number, stakedLyraBalance: number): RewardEpochTokenAmount[];
    accountRewardEpoch(address: string): Promise<AccountRewardEpoch | null>;
}
