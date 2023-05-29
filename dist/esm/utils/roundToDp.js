import { BigNumber } from '@ethersproject/bignumber';
import { ZERO_BN } from '../constants/bn';
// Round a BN to n decimal places, aassumes BN is 10^18
export default function roundToDp(val, n, options) {
    var _a, _b;
    if (val.isZero()) {
        return ZERO_BN;
    }
    const bnDecimals = (_a = options === null || options === void 0 ? void 0 : options.bnDecimals) !== null && _a !== void 0 ? _a : 18;
    let valBN = val.div(BigNumber.from(10).pow(bnDecimals - n));
    const ceil = (_b = options === null || options === void 0 ? void 0 : options.ceil) !== null && _b !== void 0 ? _b : true;
    if (ceil) {
        valBN = valBN.add(1);
    }
    return valBN.mul(BigNumber.from(10).pow(bnDecimals - n));
}
//# sourceMappingURL=roundToDp.js.map