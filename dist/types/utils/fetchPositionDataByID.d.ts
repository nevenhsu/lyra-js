import Lyra from '../lyra';
import { Market } from '../market';
import { PositionData } from '../position';
export default function fetchPositionDataByID(lyra: Lyra, market: Market, positionId: number): Promise<PositionData>;
