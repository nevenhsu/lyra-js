import Lyra from '../lyra';
import { PositionData, PositionFilter } from '../position';
export default function fetchAllPositionData(lyra: Lyra, filter?: PositionFilter): Promise<PositionData[]>;
