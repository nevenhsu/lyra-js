"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bn_1 = require("../constants/bn");
var network_1 = require("../constants/network");
var blackScholes_1 = require("../utils/blackScholes");
var canHedge_1 = __importDefault(require("../utils/canHedge"));
var fromBigNumber_1 = __importDefault(require("../utils/fromBigNumber"));
var getPriceVariance_1 = __importDefault(require("../utils/getPriceVariance"));
var getQuoteSpotPrice_1 = __importStar(require("../utils/getQuoteSpotPrice"));
var getTimeToExpiryAnnualized_1 = __importDefault(require("../utils/getTimeToExpiryAnnualized"));
var isTestnet_1 = __importDefault(require("../utils/isTestnet"));
var toBigNumber_1 = __importDefault(require("../utils/toBigNumber"));
var _1 = require(".");
function getQuoteDisabledReason(option, spotPrice, size, premium, newIv, newSkew, newBaseIv, isBuy, isForceClose, priceType, isOpen, network) {
    var market = option.market();
    var board = option.board();
    var strike = option.strike();
    var timeToExpiryAnnualized = (0, getTimeToExpiryAnnualized_1.default)(board);
    if (timeToExpiryAnnualized == 0) {
        return _1.QuoteDisabledReason.Expired;
    }
    if (size.lte(0)) {
        return _1.QuoteDisabledReason.EmptySize;
    }
    // Check trading cutoff
    var isPostCutoff = board.block.timestamp + market.params.tradingCutoff > board.expiryTimestamp;
    if (isPostCutoff && !isForceClose) {
        return _1.QuoteDisabledReason.TradingCutoff;
    }
    var strikePrice = strike.strikePrice;
    // Check delta range
    var rate = market.params.rateAndCarry;
    var callDelta = (0, toBigNumber_1.default)((0, blackScholes_1.getDelta)(timeToExpiryAnnualized, (0, fromBigNumber_1.default)(newIv), (0, fromBigNumber_1.default)(spotPrice), (0, fromBigNumber_1.default)(strikePrice), (0, fromBigNumber_1.default)(rate), true));
    var minDelta = isForceClose ? market.params.minForceCloseDelta : market.params.minDelta;
    if (!isForceClose && (callDelta.lte(minDelta) || callDelta.gte(bn_1.ONE_BN.sub(minDelta)))) {
        return _1.QuoteDisabledReason.DeltaOutOfRange;
    }
    // On force close, base iv is not impacted and should never be out of range
    // On force close, skew is impacted and should use abs min / max
    var minSkew = isForceClose ? market.params.absMinSkew : market.params.minSkew;
    var maxSkew = isForceClose ? market.params.absMaxSkew : market.params.maxSkew;
    if (isBuy) {
        if (newBaseIv.gt(market.params.maxBaseIv)) {
            return _1.QuoteDisabledReason.IVTooHigh;
        }
        else if (newSkew.gt(maxSkew)) {
            return _1.QuoteDisabledReason.SkewTooHigh;
        }
        else if (newIv.gt(market.params.maxVol)) {
            return _1.QuoteDisabledReason.VolTooHigh;
        }
    }
    else {
        if (newBaseIv.lt(market.params.minBaseIv)) {
            return _1.QuoteDisabledReason.IVTooLow;
        }
        else if (newSkew.lt(minSkew)) {
            return _1.QuoteDisabledReason.SkewTooLow;
        }
        else if (newIv.lt(market.params.minVol)) {
            return _1.QuoteDisabledReason.VolTooLow;
        }
    }
    // Check available liquidity
    var freeLiquidity = market.params.freeLiquidity;
    if (
    // Must be opening trade
    !isForceClose &&
        isOpen &&
        (isBuy
            ? option.isCall
                ? freeLiquidity.lt(size.mul(spotPrice).div(bn_1.UNIT))
                : freeLiquidity.lt(size.mul(strikePrice).div(bn_1.UNIT))
            : freeLiquidity.lt(premium))) {
        return _1.QuoteDisabledReason.InsufficientLiquidity;
    }
    // Check if hedger can hedge the additional delta risk introduced by the quote.
    var hedgerView = option.market().params.hedgerView;
    var poolHedgerParams = option.market().params.poolHedgerParams;
    var increasesPoolDelta = (option.delta.lt(0) && isBuy) || (option.delta.gt(0) && !isBuy);
    if (hedgerView &&
        poolHedgerParams &&
        isOpen &&
        !(0, isTestnet_1.default)(option.lyra) &&
        !(0, canHedge_1.default)((0, getQuoteSpotPrice_1.default)(market, priceType), market.params.netDelta, option, size, increasesPoolDelta, hedgerView, poolHedgerParams, network)) {
        return _1.QuoteDisabledReason.UnableToHedgeDelta;
    }
    if (market.lyra.network === network_1.Network.Arbitrum) {
        // Disable quote for opening and closing in the case where the feeds differ by a great amount, but allow force closes.
        var adapterView = option.market().params.adapterView;
        var gmxAdapterView = adapterView;
        if (gmxAdapterView && !isForceClose && (priceType === getQuoteSpotPrice_1.PriceType.MAX_PRICE || priceType === getQuoteSpotPrice_1.PriceType.MIN_PRICE)) {
            var forceMaxSpotPrice = gmxAdapterView.gmxMaxPrice, forceMinSpotPrice = gmxAdapterView.gmxMinPrice;
            var minPriceVariance = (0, getPriceVariance_1.default)(forceMinSpotPrice, market.params.referenceSpotPrice);
            var maxPriceVariance = (0, getPriceVariance_1.default)(forceMaxSpotPrice, market.params.referenceSpotPrice);
            var varianceThreshold = gmxAdapterView.marketPricingParams.priceVarianceCBPercent;
            if (minPriceVariance.gt(varianceThreshold) || maxPriceVariance.gt(varianceThreshold)) {
                return _1.QuoteDisabledReason.PriceVarianceTooHigh;
            }
        }
    }
    return null;
}
exports.default = getQuoteDisabledReason;
//# sourceMappingURL=getQuoteDisabledReason.js.map