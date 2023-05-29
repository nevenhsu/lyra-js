import { BigNumber } from '@ethersproject/bignumber';
import { Position } from '../position';
import { Trade } from '../trade';
import { TradeEvent } from '../trade_event';
export default function getTradePnl(position: Position, trade: TradeEvent | Trade): BigNumber;
