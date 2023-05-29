import { BigNumber, PopulatedTransaction } from 'ethers';
import { GlobalRewardEpoch, RewardEpochToken } from '../global_reward_epoch';
import { RewardEpochTokenAmount } from '../global_reward_epoch';
import Lyra from '../lyra';
import { AccountRewardEpochData } from '../utils/fetchAccountRewardEpochData';
export type ClaimAddedEvent = {
    amount: BigNumber;
    blockNumber: number;
    claimer: string;
    epochTimestamp: number;
    rewardToken: string;
    tag: string;
    timestamp: number;
};
export type ClaimEvent = {
    amount: BigNumber;
    blockNumber: number;
    claimer: string;
    rewardToken: string;
    timestamp: number;
};
export declare class AccountRewardEpoch {
    lyra: Lyra;
    account: string;
    globalEpoch: GlobalRewardEpoch;
    accountEpoch: AccountRewardEpochData;
    tradingRewards: RewardEpochTokenAmount[];
    isTradingRewardsDistributed: boolean;
    totalClaimableRewards: RewardEpochTokenAmount[];
    totalClaimableTradingRewards: RewardEpochTokenAmount[];
    private totalClaimableVaultRewardsMap;
    private distributedVaultRewardsMap;
    private calculatedVaultRewardsMap;
    private isVaultRewardsDistributedMap;
    constructor(lyra: Lyra, account: string, accountEpoch: AccountRewardEpochData, globalEpoch: GlobalRewardEpoch, claimAddedEvents: ClaimAddedEvent[], claimEvents: ClaimEvent[], rewardTokens: RewardEpochToken[], totalClaimableRewards: RewardEpochTokenAmount[]);
    static getByOwner(lyra: Lyra, owner: string): Promise<AccountRewardEpoch[]>;
    static getByStartTimestamp(lyra: Lyra, address: string, startTimestamp: number): Promise<AccountRewardEpoch | null>;
    static claim(lyra: Lyra, address: string, tokenAddresses: string[]): PopulatedTransaction;
    vaultRewards(marketAddressOrName: string): RewardEpochTokenAmount[];
    totalClaimableVaultRewards(marketAddressOrName: string): RewardEpochTokenAmount[];
    isVaultRewardsDistributed(marketAddressOrName: string): boolean;
}
