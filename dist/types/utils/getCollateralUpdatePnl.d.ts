import { BigNumber } from '@ethersproject/bignumber';
import { CollateralUpdateEvent } from '../collateral_update_event';
import { Position } from '../position';
import { Trade } from '../trade';
export default function getCollateralUpdatePnl(position: Position, collateralUpdate: CollateralUpdateEvent | Trade): BigNumber;
