import { ONE_BN, UNIT, ZERO_BN } from '../constants/bn';
import { DataSource } from '../constants/contracts';
import { Market } from '../market';
import { Option } from '../option';
import { getDelta, getGamma, getVega } from '../utils/blackScholes';
import fetchStrikeIVHistory from '../utils/fetchStrikeIVHistory';
import fromBigNumber from '../utils/fromBigNumber';
import getTimeToExpiryAnnualized from '../utils/getTimeToExpiryAnnualized';
import toBigNumber from '../utils/toBigNumber';
export class Strike {
    constructor(lyra, board, strikeView, block) {
        this.__source = DataSource.ContractCall;
        this.lyra = lyra;
        this.__board = board;
        const fields = Strike.getFields(board, strikeView);
        this.block = block;
        this.id = fields.id;
        this.strikePrice = fields.strikePrice;
        this.skew = fields.skew;
        this.iv = fields.iv;
        this.vega = fields.vega;
        this.gamma = fields.gamma;
        this.isDeltaInRange = fields.isDeltaInRange;
        this.openInterest = fields.openInterest;
        this.longCallOpenInterest = fields.longCallOpenInterest;
        this.shortCallOpenInterest = fields.shortCallOpenInterest;
        this.longPutOpenInterest = fields.longPutOpenInterest;
        this.shortPutOpenInterest = fields.shortPutOpenInterest;
        this.params = fields.params;
    }
    static getFields(board, strikeView) {
        const id = strikeView.strikeId.toNumber();
        const strikePrice = strikeView.strikePrice;
        const timeToExpiryAnnualized = getTimeToExpiryAnnualized(board);
        const skew = strikeView.skew;
        const iv = board.baseIv.mul(strikeView.skew).div(UNIT);
        const params = {
            forceCloseSkew: strikeView.forceCloseSkew,
            cachedStdVega: strikeView.cachedGreeks.stdVega,
        };
        if (timeToExpiryAnnualized === 0) {
            return {
                id,
                strikePrice,
                skew: ZERO_BN,
                iv: ZERO_BN,
                vega: ZERO_BN,
                gamma: ZERO_BN,
                openInterest: ZERO_BN,
                longCallOpenInterest: ZERO_BN,
                shortCallOpenInterest: ZERO_BN,
                longPutOpenInterest: ZERO_BN,
                shortPutOpenInterest: ZERO_BN,
                isDeltaInRange: false,
                params,
            };
        }
        else {
            const ivNum = fromBigNumber(iv);
            const spotPrice = fromBigNumber(board.market().spotPrice);
            const strikePriceNum = fromBigNumber(strikePrice);
            const rate = fromBigNumber(board.market().params.rateAndCarry);
            const vega = ivNum > 0 && spotPrice > 0
                ? toBigNumber(getVega(timeToExpiryAnnualized, ivNum, spotPrice, strikePriceNum, rate))
                : ZERO_BN;
            const gamma = ivNum > 0 && spotPrice > 0
                ? toBigNumber(getGamma(timeToExpiryAnnualized, ivNum, spotPrice, strikePriceNum, rate))
                : ZERO_BN;
            const callDelta = ivNum > 0 && spotPrice > 0
                ? toBigNumber(getDelta(timeToExpiryAnnualized, ivNum, spotPrice, strikePriceNum, rate, true))
                : ZERO_BN;
            const minDelta = board.market().params.minDelta;
            const isDeltaInRange = callDelta.gte(minDelta) && callDelta.lte(ONE_BN.sub(minDelta));
            const longCallOpenInterest = strikeView.longCallOpenInterest;
            const shortCallOpenInterest = strikeView.shortCallBaseOpenInterest.add(strikeView.shortCallQuoteOpenInterest);
            const longPutOpenInterest = strikeView.longPutOpenInterest;
            const shortPutOpenInterest = strikeView.shortPutOpenInterest;
            const openInterest = longCallOpenInterest
                .add(shortCallOpenInterest)
                .add(longPutOpenInterest)
                .add(shortPutOpenInterest);
            return {
                id,
                strikePrice,
                skew,
                iv,
                vega,
                gamma,
                isDeltaInRange,
                openInterest,
                longCallOpenInterest,
                shortCallOpenInterest,
                longPutOpenInterest,
                shortPutOpenInterest,
                params,
            };
        }
    }
    // Getters
    static async get(lyra, marketAddressOrName, strikeId) {
        const market = await Market.get(lyra, marketAddressOrName);
        return await market.strike(strikeId);
    }
    async refresh() {
        return Strike.get(this.lyra, this.market().address, this.id);
    }
    // Dynamic Fields
    async ivHistory(lyra, options) {
        return await fetchStrikeIVHistory(lyra, this, options);
    }
    // Edges
    market() {
        return this.__board.market();
    }
    board() {
        return this.__board;
    }
    call() {
        return new Option(this.lyra, this, true, this.block);
    }
    put() {
        return new Option(this.lyra, this, false, this.block);
    }
    option(isCall) {
        return isCall ? this.call() : this.put();
    }
    async quote(isCall, isBuy, size, options) {
        const strike = await this.refresh();
        return strike.quoteSync(isCall, isBuy, size, options);
    }
    quoteSync(isCall, isBuy, size, options) {
        return this.option(isCall).quoteSync(isBuy, size, options);
    }
    async quoteAll(size, options) {
        const strike = await this.refresh();
        return strike.quoteAllSync(size, options);
    }
    quoteAllSync(size, options) {
        const { bid: callBid, ask: callAsk } = this.option(true).quoteAllSync(size, options);
        const { bid: putBid, ask: putAsk } = this.option(false).quoteAllSync(size, options);
        return {
            strike: this,
            callBid,
            callAsk,
            putBid,
            putAsk,
        };
    }
}
//# sourceMappingURL=index.js.map