import { parseUnits } from '@ethersproject/units';
export default function toBigNumber(number, decimals = 18) {
    if (isNaN(number)) {
        throw new Error('Passed NaN to BigNumber converter');
    }
    return parseUnits(number.toFixed(18), decimals);
}
//# sourceMappingURL=toBigNumber.js.map