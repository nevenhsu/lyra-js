import Lyra from '..';
import { PositionLeaderboard, PositionLeaderboardFilter } from '../position';
export default function fetchLeaderboard(lyra: Lyra, options?: PositionLeaderboardFilter): Promise<PositionLeaderboard[]>;
