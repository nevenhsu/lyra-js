"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bn_1 = require("../constants/bn");
function getCappedExpectedHedge(option, size, netDelta, poolHedgerParams, increasesPoolDelta) {
    var hedgeCap = poolHedgerParams.hedgeCap;
    // netDelta += amount * cached delta * direction
    var deltaImpact = size
        .mul(option.delta)
        .div(bn_1.UNIT)
        .mul(increasesPoolDelta ? 1 : -1);
    var expectedHedge = netDelta.add(deltaImpact);
    var exceedsCap = expectedHedge.abs().gt(hedgeCap);
    var cappedExpectedHedge = exceedsCap ? (expectedHedge.lt(0) ? hedgeCap.mul(-1) : hedgeCap) : expectedHedge;
    return cappedExpectedHedge;
}
exports.default = getCappedExpectedHedge;
//# sourceMappingURL=getCappedExpectedHedge.js.map