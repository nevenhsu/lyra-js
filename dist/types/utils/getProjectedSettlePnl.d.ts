import { BigNumber } from '@ethersproject/bignumber';
export default function getProjectedSettlePnl(isLong: boolean, isCall: boolean, strikePrice: BigNumber, spotPriceAtExpiry: BigNumber, pricePerOption: BigNumber, size: BigNumber, liquidationPrice?: BigNumber | null): BigNumber;
