import { BigNumber } from '@ethersproject/bignumber';
import { Option } from '../option';
import { QuoteIteration } from '.';
export default function getQuoteIteration({ option, isBuy, size, spotPrice, baseIv, skew, netStdVega, preTradeAmmNetStdVega, isForceClose, }: {
    option: Option;
    isBuy: boolean;
    size: BigNumber;
    spotPrice: BigNumber;
    baseIv: BigNumber;
    skew: BigNumber;
    netStdVega: BigNumber;
    preTradeAmmNetStdVega: BigNumber;
    isForceClose: boolean;
}): QuoteIteration;
