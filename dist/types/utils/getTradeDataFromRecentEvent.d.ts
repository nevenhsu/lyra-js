import { PartialTradeEvent, PartialTransferEvent } from '../constants/events';
import { Market } from '../market';
import { TradeEventData } from '../trade_event';
export default function getTradeDataFromRecentEvent(trade: PartialTradeEvent, market: Market, transfers: PartialTransferEvent[]): TradeEventData;
