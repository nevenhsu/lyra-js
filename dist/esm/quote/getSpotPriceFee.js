import { UNIT } from '../constants/bn';
import getTimeWeightedFee from './getTimeWeightedFee';
export default function getSpotPriceFee(board, size, spotPrice) {
    const market = board.market();
    const timeWeightedSpotPriceFee = getTimeWeightedFee(board.timeToExpiry, market.params.spotPriceFee1xPoint, market.params.spotPriceFee2xPoint, market.params.spotPriceFeeCoefficient);
    const spotPriceFee = timeWeightedSpotPriceFee.mul(size).div(UNIT).mul(spotPrice).div(UNIT);
    return spotPriceFee;
}
//# sourceMappingURL=getSpotPriceFee.js.map