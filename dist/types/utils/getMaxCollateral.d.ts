import { BigNumber } from '@ethersproject/bignumber';
export default function getMaxCollateral(isCall: boolean, strikePrice: BigNumber, postTradeSize: BigNumber, isBaseCollateral?: boolean): BigNumber | null;
