import { BigNumber } from '@ethersproject/bignumber';
import { Option } from '../option';
export type PositionCollateral = {
    amount: BigNumber;
    value: BigNumber;
    min: BigNumber;
    max: BigNumber | null;
    isBase: boolean;
    liquidationPrice: BigNumber | null;
};
export default function getPositionCollateral(option: Option, size: BigNumber, collateral: BigNumber, isBaseCollateral?: boolean): PositionCollateral;
