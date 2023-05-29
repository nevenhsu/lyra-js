import { Log } from '@ethersproject/providers';
import { PartialPositionUpdatedEvent } from '../constants/events';
import { Network } from '../constants/network';
export default function parsePartialPositionUpdatedEventsFromLogs(logs: Log[], network: Network): PartialPositionUpdatedEvent[];
