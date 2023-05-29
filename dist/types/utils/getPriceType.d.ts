import { PriceType } from './getQuoteSpotPrice';
export default function getPriceType(isCall: boolean, isForceClose: boolean, isLong: boolean, isOpen: boolean): PriceType.MIN_PRICE | PriceType.MAX_PRICE | PriceType.FORCE_MIN | PriceType.FORCE_MAX;
