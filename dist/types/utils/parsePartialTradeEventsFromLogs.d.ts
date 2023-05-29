import { Log } from '@ethersproject/providers';
import Lyra from '..';
import { PartialTradeEvent } from '../constants/events';
export default function parsePartialTradeEventsFromLogs(lyra: Lyra, logs: Log[]): PartialTradeEvent[];
