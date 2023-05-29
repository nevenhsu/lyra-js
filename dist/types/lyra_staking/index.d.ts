import { BigNumber } from '@ethersproject/bignumber';
import Lyra from '../lyra';
import { LyraStakingParams } from '../utils/fetchLyraStakingParams';
export type LyraStakingAccount = {
    lyraStaking: LyraStaking;
    isInUnstakeWindow: boolean;
    isInCooldown: boolean;
    unstakeWindowStartTimestamp: number | null;
    unstakeWindowEndTimestamp: number | null;
};
export declare class LyraStaking {
    lyra: Lyra;
    cooldownPeriod: number;
    unstakeWindow: number;
    totalSupply: BigNumber;
    tokenPrice: BigNumber;
    apy: number;
    constructor(lyra: Lyra, stakingParams: LyraStakingParams);
    static get(lyra: Lyra): Promise<LyraStaking>;
    static getByOwner(lyra: Lyra, address: string): Promise<LyraStakingAccount>;
    static claimableRewards(lyra: Lyra, address: string): Promise<BigNumber>;
}
