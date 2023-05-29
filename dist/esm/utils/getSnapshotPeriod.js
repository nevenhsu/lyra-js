import { SNAPSHOT_RESULT_LIMIT } from '../constants/queries';
export default function getSnapshotPeriod(startTimestamp, endTimestamp, periods) {
    const durationSeconds = Math.max(endTimestamp - startTimestamp, 0);
    while (periods.length > 1) {
        const period = periods.shift();
        const numItems = Math.ceil(durationSeconds / period);
        if (numItems > SNAPSHOT_RESULT_LIMIT) {
            continue;
        }
        else {
            return period;
        }
    }
    return periods[0];
}
//# sourceMappingURL=getSnapshotPeriod.js.map