"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var getDefaultPeriod_1 = __importDefault(require("./getDefaultPeriod"));
function groupTimeSnapshots(snapshots, startTimestamp, endTimestamp, period) {
    if (!snapshots.length) {
        return [];
    }
    var truePeriod = period !== null && period !== void 0 ? period : (0, getDefaultPeriod_1.default)(startTimestamp, endTimestamp);
    var snapshotIdx = 0;
    var smoothSnapshots = [];
    var timestamp = startTimestamp;
    // allow last snapshot to be captured with +truePeriod
    for (; timestamp < endTimestamp + truePeriod; timestamp += truePeriod) {
        // always ensure there is a next snapshot available
        while (snapshotIdx < snapshots.length - 1 && snapshots[snapshotIdx].timestamp <= timestamp) {
            snapshotIdx++;
        }
        // ensure timestamp is not greater than endTimestamp
        smoothSnapshots.push(__assign(__assign({}, snapshots[snapshotIdx]), { timestamp: Math.min(timestamp, endTimestamp) }));
    }
    return smoothSnapshots;
}
exports.default = groupTimeSnapshots;
//# sourceMappingURL=groupTimeSnapshots.js.map