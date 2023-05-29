import { ZERO_BN } from '../constants/bn';
import { DataSource } from '../constants/contracts';
import { Market } from '../market';
import { Quote } from '../quote';
import { getBlackScholesPrice, getDelta, getRho, getTheta } from '../utils/blackScholes';
import fetchOptionPriceHistory from '../utils/fetchOptionPriceHistory';
import fetchOptionVolumeHistory from '../utils/fetchOptionVolumeHistory';
import fromBigNumber from '../utils/fromBigNumber';
import getTimeToExpiryAnnualized from '../utils/getTimeToExpiryAnnualized';
import toBigNumber from '../utils/toBigNumber';
export class Option {
    constructor(lyra, strike, isCall, block) {
        this.__source = DataSource.ContractCall;
        this.lyra = lyra;
        this.__strike = strike;
        this.block = block;
        this.isCall = isCall;
        const fields = Option.getFields(strike, isCall);
        this.price = fields.price;
        this.longOpenInterest = fields.longOpenInterest;
        this.shortOpenInterest = fields.shortOpenInterest;
        this.delta = fields.delta;
        this.rho = fields.rho;
        this.theta = fields.theta;
        this.isInTheMoney = fields.isInTheMoney;
    }
    // TODO: @dappbeast Remove getFields
    static getFields(strike, isCall) {
        var _a;
        const market = strike.market();
        const timeToExpiryAnnualized = getTimeToExpiryAnnualized(strike.board());
        const spotPrice = (_a = strike.board().spotPriceAtExpiry) !== null && _a !== void 0 ? _a : market.spotPrice;
        const isInTheMoney = isCall ? spotPrice.gt(strike.strikePrice) : spotPrice.lt(strike.strikePrice);
        if (timeToExpiryAnnualized === 0) {
            return {
                longOpenInterest: ZERO_BN,
                shortOpenInterest: ZERO_BN,
                price: ZERO_BN,
                delta: ZERO_BN,
                theta: ZERO_BN,
                rho: ZERO_BN,
                isInTheMoney,
            };
        }
        else {
            const longOpenInterest = isCall ? strike.longCallOpenInterest : strike.longPutOpenInterest;
            const shortOpenInterest = isCall ? strike.shortCallOpenInterest : strike.shortPutOpenInterest;
            const spotPriceNum = fromBigNumber(spotPrice);
            const strikePriceNum = fromBigNumber(strike.strikePrice);
            const rate = fromBigNumber(market.params.rateAndCarry);
            const strikeIV = fromBigNumber(strike.iv);
            const price = toBigNumber(getBlackScholesPrice(timeToExpiryAnnualized, strikeIV, spotPriceNum, strikePriceNum, rate, isCall));
            const delta = strikeIV > 0
                ? toBigNumber(getDelta(timeToExpiryAnnualized, strikeIV, spotPriceNum, strikePriceNum, rate, isCall))
                : ZERO_BN;
            const theta = strikeIV > 0
                ? toBigNumber(getTheta(timeToExpiryAnnualized, strikeIV, spotPriceNum, strikePriceNum, rate, isCall))
                : ZERO_BN;
            const rho = strikeIV > 0
                ? toBigNumber(getRho(timeToExpiryAnnualized, strikeIV, spotPriceNum, strikePriceNum, rate, isCall))
                : ZERO_BN;
            return {
                longOpenInterest,
                shortOpenInterest,
                price,
                delta,
                theta,
                rho,
                isInTheMoney,
            };
        }
    }
    // Getters
    static async get(lyra, marketAddressOrName, strikeId, isCall) {
        const market = await Market.get(lyra, marketAddressOrName);
        return await market.option(strikeId, isCall);
    }
    async refresh() {
        return Option.get(this.lyra, this.market().address, this.strike().id, this.isCall);
    }
    // Edges
    market() {
        return this.__strike.market();
    }
    board() {
        return this.__strike.board();
    }
    strike() {
        return this.__strike;
    }
    async quote(isBuy, size, options) {
        const option = await this.refresh();
        return option.quoteSync(isBuy, size, options);
    }
    quoteSync(isBuy, size, options) {
        return Quote.getSync(this.lyra, this, isBuy, size, options);
    }
    async quoteAll(size, options) {
        const option = await this.refresh();
        return option.quoteAllSync(size, options);
    }
    quoteAllSync(size, options) {
        return {
            option: this,
            bid: this.quoteSync(false, size, options),
            ask: this.quoteSync(true, size, options),
        };
    }
    async tradingVolumeHistory(options) {
        return await fetchOptionVolumeHistory(this.lyra, this, options);
    }
    async priceHistory(options) {
        return await fetchOptionPriceHistory(this.lyra, this, options);
    }
}
//# sourceMappingURL=index.js.map