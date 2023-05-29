import Lyra from '../lyra';
import { Market } from '../market';
import { PositionData } from '../position';
export default function fetchAllPositionDataByOwner(lyra: Lyra, owner: string, markets: Market[]): Promise<PositionData[]>;
