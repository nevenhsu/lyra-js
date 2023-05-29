import { UNIT } from '../constants/bn';
import toBigNumber from '../utils/toBigNumber';
export default function getTimeWeightedFee(timeToExpiry, pointA, pointB, coefficient) {
    if (timeToExpiry <= pointA) {
        return coefficient;
    }
    else {
        const factor = toBigNumber(timeToExpiry - pointA)
            .mul(UNIT)
            .div(pointB - pointA)
            .div(UNIT);
        return coefficient.mul(UNIT.add(factor)).div(UNIT);
    }
}
//# sourceMappingURL=getTimeWeightedFee.js.map