import { Log } from '@ethersproject/providers';
import { PartialTradeEvent } from '../constants/events';
import { Network } from '../constants/network';
export default function parsePartialTradeEventsFromLogs(logs: Log[], network: Network): PartialTradeEvent[];
