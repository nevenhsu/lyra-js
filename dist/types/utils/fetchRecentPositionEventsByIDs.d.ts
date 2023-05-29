import { PositionEventData } from '../constants/events';
import Lyra from '../lyra';
import { Market } from '../market';
type PositionRecentEventData = Omit<PositionEventData, 'settle' | 'transfers'>;
export default function fetchRecentPositionEventsByIDs(lyra: Lyra, market: Market, positionIds: number[]): Promise<Record<number, PositionRecentEventData>>;
export {};
