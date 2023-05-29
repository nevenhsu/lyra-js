"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var time_1 = require("../constants/time");
// generate default period for historical data
function getDefaultPeriod(startTimestamp, endTimestamp) {
    var duration = Math.max(0, endTimestamp - startTimestamp);
    if (duration > time_1.SECONDS_IN_SIX_MONTHS) {
        // 6m+, 1w period, 25+ data points
        return time_1.SECONDS_IN_WEEK;
    }
    else if (duration > time_1.SECONDS_IN_MONTH * 3) {
        // 3m-6m, 2d period, 30-90 data points
        return time_1.SECONDS_IN_DAY * 2;
    }
    else if (duration > time_1.SECONDS_IN_MONTH) {
        // 1m-6m, 1d period, 30-90 data points
        return time_1.SECONDS_IN_DAY;
    }
    else if (duration > time_1.SECONDS_IN_WEEK * 2) {
        // 2w-1m, 12 hr period, 28-56 data points
        return time_1.SECONDS_IN_HOUR * 12;
    }
    else if (duration > time_1.SECONDS_IN_WEEK) {
        // 1w-2w, 6 hr period, 28-56 data points
        return time_1.SECONDS_IN_HOUR * 6;
    }
    else if (duration > time_1.SECONDS_IN_DAY * 4) {
        // 4d-1w, 3 hr period, 32-56 data points
        return time_1.SECONDS_IN_HOUR * 3;
    }
    else {
        // 0d-3d, 1 hr period, <75 data points
        return time_1.SECONDS_IN_HOUR;
    }
}
exports.default = getDefaultPeriod;
//# sourceMappingURL=getDefaultPeriod.js.map