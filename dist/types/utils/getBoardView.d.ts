import { BoardViewStructOutput } from '../constants/views';
import Lyra from '../lyra';
export default function getBoardView(lyra: Lyra, marketAddressOrName: string, boardId: number): Promise<BoardViewStructOutput>;
