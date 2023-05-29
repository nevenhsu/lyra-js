import Lyra from '../lyra';
import { PositionData } from '../position';
export default function fetchAllPositionDataByOwner(lyra: Lyra, owner: string): Promise<PositionData[]>;
