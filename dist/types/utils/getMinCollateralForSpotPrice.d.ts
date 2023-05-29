import { BigNumber } from '@ethersproject/bignumber';
import { Market } from '../market';
import { Option } from '../option';
export declare const getMinStaticCollateral: (market: Market, isBaseCollateral?: boolean) => BigNumber;
export default function getMinCollateralForSpotPrice(option: Option, size: BigNumber, spotPrice: BigNumber, isBaseCollateral?: boolean, isMaxMinCollateral?: boolean): BigNumber;
