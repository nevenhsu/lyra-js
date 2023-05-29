type Snapshot = {
    timestamp: number;
};
export default function groupTimeSnapshots<T extends Snapshot>(snapshots: T[], startTimestamp: number, endTimestamp: number, period?: number): T[];
export {};
