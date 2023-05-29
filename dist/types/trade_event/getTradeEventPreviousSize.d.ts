import { BigNumber } from '@ethersproject/bignumber';
import { Position } from '../position';
import { TradeEvent } from '.';
export default function getTradeEventPreviousSize(position: Position, trade: TradeEvent): BigNumber;
