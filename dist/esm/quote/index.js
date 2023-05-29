import { UNIT, ZERO_BN } from '../constants/bn';
import { DataSource, DEFAULT_ITERATIONS } from '../constants/contracts';
import { getDelta, getGamma, getRho, getTheta, getVega } from '../utils/blackScholes';
import fromBigNumber from '../utils/fromBigNumber';
import getBreakEvenPrice from '../utils/getBreakEvenPrice';
import getPriceType from '../utils/getPriceType';
import getQuoteSpotPrice from '../utils/getQuoteSpotPrice';
import getTimeToExpiryAnnualized from '../utils/getTimeToExpiryAnnualized';
import toBigNumber from '../utils/toBigNumber';
import getQuoteDisabledReason from './getQuoteDisabledReason';
import getQuoteIteration from './getQuoteIteration';
export var QuoteDisabledReason;
(function (QuoteDisabledReason) {
    QuoteDisabledReason["EmptySize"] = "EmptySize";
    QuoteDisabledReason["Expired"] = "Expired";
    QuoteDisabledReason["TradingCutoff"] = "TradingCutoff";
    QuoteDisabledReason["InsufficientLiquidity"] = "InsufficientLiquidity";
    QuoteDisabledReason["DeltaOutOfRange"] = "DeltaOutOfRange";
    QuoteDisabledReason["VolTooHigh"] = "VolTooHigh";
    QuoteDisabledReason["VolTooLow"] = "VolTooLow";
    QuoteDisabledReason["IVTooHigh"] = "IVTooHigh";
    QuoteDisabledReason["IVTooLow"] = "IVTooLow";
    QuoteDisabledReason["SkewTooHigh"] = "SkewTooHigh";
    QuoteDisabledReason["SkewTooLow"] = "SkewTooLow";
    QuoteDisabledReason["UnableToHedgeDelta"] = "UnableToHedgeDelta";
    QuoteDisabledReason["PriceVarianceTooHigh"] = "PriceVarianceTooHigh";
})(QuoteDisabledReason || (QuoteDisabledReason = {}));
export class Quote {
    constructor(lyra, option, isBuy, size, options) {
        this.__source = DataSource.ContractCall;
        this.lyra = lyra;
        this.__option = option;
        this.isBuy = isBuy;
        this.size = size;
        this.marketName = option.market().name;
        this.marketAddress = option.market().address;
        this.expiryTimestamp = option.board().expiryTimestamp;
        this.boardId = option.board().id;
        this.strikePrice = option.strike().strikePrice;
        this.strikeId = option.strike().id;
        this.isCall = option.isCall;
        const fields = this.getFields(option, isBuy, size, options);
        this.pricePerOption = fields.pricePerOption;
        this.premium = fields.premium;
        this.fee = fields.fee;
        this.feeComponents = fields.feeComponents;
        this.iv = fields.iv;
        this.fairIv = fields.fairIv;
        this.greeks = fields.greeks;
        this.forceClosePenalty = fields.forceClosePenalty;
        this.isForceClose = fields.isForceClose;
        this.isDisabled = !!fields.disabledReason;
        this.disabledReason = fields.disabledReason;
        this.breakEven = fields.breakEven;
        this.toBreakEven = fields.toBreakEven;
        this.spotPrice = fields.spotPrice;
        this.iterations = fields.iterations;
    }
    getDisabledFields(option, spotPrice, disabledReason) {
        const skew = option.strike().skew;
        const baseIv = option.board().baseIv;
        const iv = skew.mul(baseIv).div(UNIT);
        return {
            pricePerOption: ZERO_BN,
            premium: ZERO_BN,
            iv,
            fairIv: iv,
            fee: ZERO_BN,
            feeComponents: {
                optionPriceFee: ZERO_BN,
                spotPriceFee: ZERO_BN,
                vegaUtilFee: ZERO_BN,
                varianceFee: ZERO_BN,
            },
            greeks: {
                delta: option.delta,
                vega: option.strike().vega,
                gamma: option.strike().gamma,
                theta: option.theta,
                rho: option.rho,
            },
            isForceClose: false,
            forceClosePenalty: ZERO_BN,
            isDisabled: !!disabledReason,
            disabledReason,
            breakEven: ZERO_BN,
            toBreakEven: ZERO_BN,
            spotPrice,
            iterations: [],
        };
    }
    getFields(option, isBuy, size, options) {
        var _a, _b, _c, _d;
        const numIterations = (_a = options === null || options === void 0 ? void 0 : options.iterations) !== null && _a !== void 0 ? _a : DEFAULT_ITERATIONS;
        if (numIterations < 1) {
            throw new Error('Iterations must be greater than or equal to 1');
        }
        const isForceClose = (_b = options === null || options === void 0 ? void 0 : options.isForceClose) !== null && _b !== void 0 ? _b : false;
        const isOpen = (_c = options === null || options === void 0 ? void 0 : options.isOpen) !== null && _c !== void 0 ? _c : true;
        const board = option.board();
        const strike = option.strike();
        const market = option.market();
        const isCall = option.isCall;
        // Read isLong for custom quotes (e.g. closing a position)
        // Default to isLong = isBuy
        const isLong = (_d = options === null || options === void 0 ? void 0 : options.isLong) !== null && _d !== void 0 ? _d : isBuy;
        let baseIv = board.baseIv;
        let skew = strike.skew;
        let preTradeAmmNetStdVega = market.params.netStdVega.mul(-1);
        const timeToExpiryAnnualized = getTimeToExpiryAnnualized(option.board());
        if (timeToExpiryAnnualized === 0) {
            // Early catch for expired positions
            return this.getDisabledFields(option, market.spotPrice, QuoteDisabledReason.Expired);
        }
        const iterationSize = size.div(numIterations);
        const iterations = [];
        const optionStdVega = strike.params.cachedStdVega.mul(-1);
        const priceType = getPriceType(isCall, isForceClose, isLong, isOpen);
        const spotPrice = getQuoteSpotPrice(market, priceType);
        for (let i = 0; i < numIterations; i++) {
            const quote = getQuoteIteration({
                option,
                isBuy,
                size: iterationSize,
                spotPrice,
                baseIv,
                skew,
                netStdVega: optionStdVega,
                preTradeAmmNetStdVega,
                isForceClose,
            });
            iterations.push(quote);
            // Update skew, IV, AMM net std vega
            baseIv = quote.newBaseIv;
            skew = quote.newSkew;
            preTradeAmmNetStdVega = quote.postTradeAmmNetStdVega;
        }
        const fairIv = baseIv.mul(skew).div(UNIT);
        const strikePrice = option.strike().strikePrice;
        const rate = option.market().params.rateAndCarry;
        const delta = toBigNumber(getDelta(timeToExpiryAnnualized, fromBigNumber(fairIv), fromBigNumber(spotPrice), fromBigNumber(strikePrice), fromBigNumber(rate), isCall));
        const vega = toBigNumber(getVega(timeToExpiryAnnualized, fromBigNumber(fairIv), fromBigNumber(spotPrice), fromBigNumber(strikePrice), fromBigNumber(rate)));
        const gamma = fairIv.gt(0) && spotPrice.gt(0)
            ? toBigNumber(getGamma(timeToExpiryAnnualized, fromBigNumber(fairIv), fromBigNumber(spotPrice), fromBigNumber(strikePrice), fromBigNumber(rate)))
            : ZERO_BN;
        const theta = fairIv.gt(0) && spotPrice.gt(0)
            ? toBigNumber(getTheta(timeToExpiryAnnualized, fromBigNumber(fairIv), fromBigNumber(spotPrice), fromBigNumber(strikePrice), fromBigNumber(rate), isCall))
            : ZERO_BN;
        const rho = fairIv.gt(0) && spotPrice.gt(0)
            ? toBigNumber(getRho(timeToExpiryAnnualized, fromBigNumber(fairIv), fromBigNumber(spotPrice), fromBigNumber(strikePrice), fromBigNumber(rate), isCall))
            : ZERO_BN;
        const premium = iterations.reduce((sum, quote) => sum.add(quote.premium), ZERO_BN);
        const disabledReason = getQuoteDisabledReason(option, spotPrice, size, premium, fairIv, skew, baseIv, isBuy, isForceClose, priceType, isOpen);
        if (disabledReason) {
            // For subset of disabled reasons, return empty quote
            switch (disabledReason) {
                case QuoteDisabledReason.EmptySize:
                case QuoteDisabledReason.Expired:
                case QuoteDisabledReason.IVTooHigh:
                case QuoteDisabledReason.IVTooLow:
                case QuoteDisabledReason.SkewTooHigh:
                case QuoteDisabledReason.SkewTooLow:
                case QuoteDisabledReason.VolTooHigh:
                case QuoteDisabledReason.VolTooLow:
                    return this.getDisabledFields(option, spotPrice, disabledReason);
            }
        }
        // Pricing
        const pricePerOption = premium.mul(UNIT).div(size);
        const breakEven = getBreakEvenPrice(option.isCall, strike.strikePrice, premium.mul(UNIT).div(size));
        const breakEvenDiff = breakEven.sub(spotPrice);
        const toBreakEven = this.isCall
            ? spotPrice.gt(breakEven)
                ? ZERO_BN
                : breakEvenDiff
            : spotPrice.lt(breakEven)
                ? ZERO_BN
                : breakEvenDiff;
        const forceClosePenalty = iterations.reduce((sum, quote) => sum.add(quote.forceClosePenalty), ZERO_BN);
        // Fees
        const optionPriceFee = iterations.reduce((sum, quote) => sum.add(quote.optionPriceFee), ZERO_BN);
        const spotPriceFee = iterations.reduce((sum, quote) => sum.add(quote.spotPriceFee), ZERO_BN);
        const vegaUtilFee = iterations.reduce((sum, quote) => sum.add(quote.vegaUtilFee.vegaUtilFee), ZERO_BN);
        const varianceFee = iterations.reduce((sum, quote) => sum.add(quote.varianceFee.varianceFee), ZERO_BN);
        const fee = optionPriceFee.add(spotPriceFee).add(vegaUtilFee).add(varianceFee);
        const ivFeeFactor = fee.gt(0) && vega.gt(0) ? fee.mul(UNIT).div(vega).div(100) : ZERO_BN;
        const iv = isBuy ? fairIv.add(ivFeeFactor) : fairIv.sub(ivFeeFactor);
        return {
            pricePerOption,
            premium,
            fee,
            iv,
            fairIv,
            feeComponents: {
                optionPriceFee,
                spotPriceFee,
                vegaUtilFee,
                varianceFee,
            },
            greeks: {
                delta,
                vega,
                gamma,
                rho,
                theta,
            },
            isForceClose,
            forceClosePenalty,
            isDisabled: !!disabledReason,
            disabledReason,
            breakEven,
            toBreakEven,
            spotPrice,
            iterations,
        };
    }
    // Getters
    static async get(lyra, marketAddressOrName, strikeId, isCall, isBuy, size, options) {
        const option = await lyra.option(marketAddressOrName, strikeId, isCall);
        return Quote.getSync(lyra, option, isBuy, size, options);
    }
    static getSync(lyra, option, isBuy, size, options) {
        return new Quote(lyra, option, isBuy, size, options);
    }
    // Edges
    market() {
        return this.__option.market();
    }
    board() {
        return this.__option.board();
    }
    strike() {
        return this.__option.strike();
    }
    option() {
        return this.__option;
    }
}
//# sourceMappingURL=index.js.map