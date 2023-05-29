import { BigNumber } from '@ethersproject/bignumber';
import { CollateralUpdateEvent, Position } from '..';
import { Trade } from '../trade';
export default function getAverageCollateralSpotPrice(position: Position, collateralUpdates: (CollateralUpdateEvent | Trade)[]): BigNumber;
