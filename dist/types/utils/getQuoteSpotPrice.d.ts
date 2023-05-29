import { Market } from '../market';
export declare enum PriceType {
    MIN_PRICE = 0,
    MAX_PRICE = 1,
    REFERENCE = 2,
    FORCE_MIN = 3,
    FORCE_MAX = 4
}
export default function getQuoteSpotPrice(market: Market, priceType: PriceType): import("ethers").BigNumber;
