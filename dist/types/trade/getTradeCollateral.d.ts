import { BigNumber } from '@ethersproject/bignumber';
import { TradeCollateral } from '..';
import { Option } from '../option';
export default function getTradeCollateral({ option, postTradeSize, setToCollateral: _setCollateralTo, setToFullCollateral, isBaseCollateral, }: {
    option: Option;
    postTradeSize: BigNumber;
    setToCollateral?: BigNumber;
    setToFullCollateral?: boolean;
    isBaseCollateral?: boolean;
}): TradeCollateral;
