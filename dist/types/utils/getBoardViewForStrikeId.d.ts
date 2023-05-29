import { BoardViewStructOutput } from '../constants/views';
import Lyra from '../lyra';
export default function getBoardViewForStrikeId(lyra: Lyra, marketAddressOrName: string, strikeId: number): Promise<BoardViewStructOutput>;
