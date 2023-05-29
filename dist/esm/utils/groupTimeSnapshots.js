import getDefaultPeriod from './getDefaultPeriod';
export default function groupTimeSnapshots(snapshots, startTimestamp, endTimestamp, period) {
    if (!snapshots.length) {
        return [];
    }
    const truePeriod = period !== null && period !== void 0 ? period : getDefaultPeriod(startTimestamp, endTimestamp);
    let snapshotIdx = 0;
    const smoothSnapshots = [];
    let timestamp = startTimestamp;
    // allow last snapshot to be captured with +truePeriod
    for (; timestamp < endTimestamp + truePeriod; timestamp += truePeriod) {
        // always ensure there is a next snapshot available
        while (snapshotIdx < snapshots.length - 1 && snapshots[snapshotIdx].timestamp <= timestamp) {
            snapshotIdx++;
        }
        // ensure timestamp is not greater than endTimestamp
        smoothSnapshots.push({ ...snapshots[snapshotIdx], timestamp: Math.min(timestamp, endTimestamp) });
    }
    return smoothSnapshots;
}
//# sourceMappingURL=groupTimeSnapshots.js.map