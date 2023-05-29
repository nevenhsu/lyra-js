import Lyra from '..';
import { SnapshotOptions } from '../constants/snapshots';
import { Option, OptionTradingVolumeSnapshot } from '../option';
export default function fetchOptionVolumeHistory(lyra: Lyra, option: Option, options?: SnapshotOptions): Promise<OptionTradingVolumeSnapshot[]>;
