import Lyra from '../lyra';
import { PositionData } from '../position';
export default function fetchPositionDataByOwner(lyra: Lyra, owner: string): Promise<PositionData[]>;
