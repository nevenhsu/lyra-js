import Lyra from '../lyra';
import { PositionData } from '../position';
export default function fetchOpenPositionDataByOwner(lyra: Lyra, owner: string): Promise<PositionData[]>;
