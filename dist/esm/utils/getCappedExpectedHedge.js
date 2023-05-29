import { UNIT } from '../constants/bn';
export default function getCappedExpectedHedge(option, size, netDelta, poolHedgerParams, increasesPoolDelta) {
    const hedgeCap = poolHedgerParams.hedgeCap;
    // netDelta += amount * cached delta * direction
    const deltaImpact = size
        .mul(option.delta)
        .div(UNIT)
        .mul(increasesPoolDelta ? 1 : -1);
    const expectedHedge = netDelta.add(deltaImpact);
    const exceedsCap = expectedHedge.abs().gt(hedgeCap);
    const cappedExpectedHedge = exceedsCap ? (expectedHedge.lt(0) ? hedgeCap.mul(-1) : hedgeCap) : expectedHedge;
    return cappedExpectedHedge;
}
//# sourceMappingURL=getCappedExpectedHedge.js.map