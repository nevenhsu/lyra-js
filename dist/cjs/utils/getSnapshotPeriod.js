"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var queries_1 = require("../constants/queries");
function getSnapshotPeriod(startTimestamp, endTimestamp, periods) {
    var durationSeconds = Math.max(endTimestamp - startTimestamp, 0);
    while (periods.length > 1) {
        var period = periods.shift();
        var numItems = Math.ceil(durationSeconds / period);
        if (numItems > queries_1.SNAPSHOT_RESULT_LIMIT) {
            continue;
        }
        else {
            return period;
        }
    }
    return periods[0];
}
exports.default = getSnapshotPeriod;
//# sourceMappingURL=getSnapshotPeriod.js.map