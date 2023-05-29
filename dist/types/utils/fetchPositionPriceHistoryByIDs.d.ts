import Lyra from '..';
import { SnapshotOptions } from '../constants/snapshots';
import { OptionPriceSnapshot } from '../option';
import { Position } from '../position';
export default function fetchPositionPriceHistoryByIDs(lyra: Lyra, positions: Position[], snapshotOptions?: SnapshotOptions): Promise<Record<number, OptionPriceSnapshot[]>>;
