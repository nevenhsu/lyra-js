import { BigNumber } from '@ethersproject/bignumber';
import { Option } from '../option';
import { PriceType } from '../utils/getQuoteSpotPrice';
import { QuoteDisabledReason } from '.';
export default function getQuoteDisabledReason(option: Option, spotPrice: BigNumber, size: BigNumber, premium: BigNumber, newIv: BigNumber, newSkew: BigNumber, newBaseIv: BigNumber, isBuy: boolean, isForceClose: boolean, priceType: PriceType, isOpen: boolean): QuoteDisabledReason | null;
