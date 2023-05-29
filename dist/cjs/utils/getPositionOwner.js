"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bn_1 = require("../constants/bn");
function getPositionOwner(transfers, toBlockNumber) {
    var _a;
    var events = transfers
        // Filter out future blocks
        .filter(function (t) { return t.blockNumber <= toBlockNumber; });
    if (events.length === 0) {
        throw new Error('Missing transfer events');
    }
    var lastTransfer = events[events.length - 1];
    if (lastTransfer.args.to === bn_1.ZERO_ADDRESS) {
        // Burn event, use first transfer "from" address with same transaction hash
        var firstLastTransfer = (_a = events.find(function (t) { return t.transactionHash === lastTransfer.transactionHash; })) !== null && _a !== void 0 ? _a : lastTransfer;
        return firstLastTransfer.args.from;
    }
    else {
        // Mint or transfer event, use last transfer "to" address
        return lastTransfer.args.to;
    }
}
exports.default = getPositionOwner;
//# sourceMappingURL=getPositionOwner.js.map