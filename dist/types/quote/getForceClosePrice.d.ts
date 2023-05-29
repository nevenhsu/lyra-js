import { BigNumber } from '@ethersproject/bignumber';
import { Option } from '../option';
export default function getForceClosePrice(option: Option, isBuy: boolean, spotPrice: BigNumber, newBaseIv: BigNumber, newSkew: BigNumber): {
    volTraded: BigNumber;
    price: BigNumber;
};
