import { MAX_END_TIMESTAMP, MIN_START_TIMESTAMP, SnapshotPeriod } from '../constants/queries';
import getSnapshotPeriod from './getSnapshotPeriod';
import subgraphRequestWithLoop from './subgraphRequestWithLoop';
export default async function fetchSnapshots(lyra, query, variables, options) {
    var _a, _b, _c;
    const min = (_a = options === null || options === void 0 ? void 0 : options.startTimestamp) !== null && _a !== void 0 ? _a : MIN_START_TIMESTAMP;
    const max = (_b = options === null || options === void 0 ? void 0 : options.endTimestamp) !== null && _b !== void 0 ? _b : MAX_END_TIMESTAMP;
    // Use 1h, 1d periods common to all snapshots
    const period = (_c = options === null || options === void 0 ? void 0 : options.period) !== null && _c !== void 0 ? _c : getSnapshotPeriod(min, max, [SnapshotPeriod.OneHour, SnapshotPeriod.OneDay]);
    return subgraphRequestWithLoop(lyra, query, { ...variables, min, max, period }, 'timestamp');
}
//# sourceMappingURL=fetchSnapshots.js.map