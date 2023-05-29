import { BigNumber } from '@ethersproject/bignumber';
import { Option } from '../option';
export default function getIVImpactForTrade(option: Option, baseIv: BigNumber, skew: BigNumber, size: BigNumber, isBuy: boolean): {
    newSkew: BigNumber;
    newBaseIv: BigNumber;
};
