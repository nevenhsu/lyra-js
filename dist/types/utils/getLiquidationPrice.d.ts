import { BigNumber } from '@ethersproject/bignumber';
import { Option } from '../option';
export default function getLiquidationPrice(option: Option, size: BigNumber, collateral: BigNumber, isBaseCollateral?: boolean): BigNumber | null;
