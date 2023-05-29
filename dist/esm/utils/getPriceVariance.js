import { UNIT } from '../constants/bn';
export default function getPriceVariance(price, refPrice) {
    return price.mul(UNIT).div(refPrice).sub(UNIT).abs();
}
//# sourceMappingURL=getPriceVariance.js.map