import { BigNumber } from '@ethersproject/bignumber';
import { Option } from '../option';
import { QuoteVarianceFeeComponents } from '.';
export default function getVarianceFee(option: Option, spotPrice: BigNumber, volTraded: BigNumber, newSkew: BigNumber, newBaseIv: BigNumber, size: BigNumber, isForceClose: boolean): QuoteVarianceFeeComponents;
