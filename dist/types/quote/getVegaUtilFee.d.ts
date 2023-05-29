import { BigNumber } from '@ethersproject/bignumber';
import { Market } from '../market';
import { QuoteVegaUtilFeeComponents } from '.';
export default function getVegaUtilFee(market: Market, preTradeAmmNetStdVega: BigNumber, postTradeAmmNetStdVega: BigNumber, volTraded: BigNumber, size: BigNumber): QuoteVegaUtilFeeComponents;
