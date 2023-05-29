import { PositionEventData } from '../constants/events';
import Lyra from '../lyra';
type PositionInputData = {
    marketAddress: string;
    positionId: number;
};
export default function fetchPositionEventDataByIDs(lyra: Lyra, positionIds: PositionInputData[]): Promise<Record<string, Record<number, PositionEventData>>>;
export {};
