import { BigNumber } from '@ethersproject/bignumber';
import { Position } from '../position';
import { TradeEvent } from '.';
export default function getTradeEventNewSize(position: Position, trade: TradeEvent): BigNumber;
