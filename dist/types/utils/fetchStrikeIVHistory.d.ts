import Lyra, { Strike } from '..';
import { SnapshotOptions } from '../constants/snapshots';
import { StrikeIVHistory } from '../strike';
export default function fetchStrikeIVHistory(lyra: Lyra, strike: Strike, options?: SnapshotOptions): Promise<StrikeIVHistory[]>;
