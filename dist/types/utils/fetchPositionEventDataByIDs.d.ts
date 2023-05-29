import { PositionEventData } from '../constants/events';
import Lyra from '../lyra';
import { Market } from '../market';
export default function fetchPositionEventDataByIDs(lyra: Lyra, market: Market, positionIds: number[]): Promise<Record<number, PositionEventData>>;
