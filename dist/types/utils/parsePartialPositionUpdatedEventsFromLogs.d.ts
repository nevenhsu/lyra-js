import { Log } from '@ethersproject/providers';
import { PartialPositionUpdatedEvent } from '../constants/events';
export default function parsePartialPositionUpdatedEventsFromLogs(logs: Log[]): PartialPositionUpdatedEvent[];
