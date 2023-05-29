import { BigNumber } from '@ethersproject/bignumber';
import { Trade } from '../trade';
import { TradeEvent } from '../trade_event';
export default function getAverageCostPerOption(trades: (Trade | TradeEvent)[]): BigNumber;
