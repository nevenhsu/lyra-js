import Lyra from '..';
import { SnapshotOptions } from '../constants/snapshots';
import { Option, OptionPriceSnapshot } from '../option';
export default function fetchOptionPriceHistory(lyra: Lyra, option: Option, options?: SnapshotOptions): Promise<OptionPriceSnapshot[]>;
