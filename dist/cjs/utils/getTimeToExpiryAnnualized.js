"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getTimeToExpiryAnnualized(board) {
    var timeToExpiry = board.timeToExpiry;
    var timeToExpiryAnnualized = timeToExpiry / (60 * 60 * 24 * 365);
    return timeToExpiryAnnualized;
}
exports.default = getTimeToExpiryAnnualized;
//# sourceMappingURL=getTimeToExpiryAnnualized.js.map