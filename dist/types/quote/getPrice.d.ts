import { BigNumber } from '@ethersproject/bignumber';
import { Option } from '../option';
export default function getPrice(option: Option, spotPrice: BigNumber, newBaseIv: BigNumber, newSkew: BigNumber): {
    price: BigNumber;
    volTraded: BigNumber;
};
