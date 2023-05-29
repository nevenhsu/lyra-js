import { BigNumber } from 'ethers';
import Lyra from '..';
export type LyraStakingParams = {
    cooldownPeriod: number;
    unstakeWindow: number;
    totalSupply: BigNumber;
    tokenPrice: BigNumber;
    apy: number;
};
export default function fetchLyraStakingParams(lyra: Lyra): Promise<LyraStakingParams>;
