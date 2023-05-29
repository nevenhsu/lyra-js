"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bn_1 = require("../constants/bn");
var contracts_1 = require("../constants/contracts");
var lyra_1 = require("../lyra");
var getIsBaseCollateral_1 = __importDefault(require("./getIsBaseCollateral"));
var getIsBuy_1 = __importDefault(require("./getIsBuy"));
var getIsCall_1 = __importDefault(require("./getIsCall"));
var getIsLong_1 = __importDefault(require("./getIsLong"));
var getPositionOwner_1 = __importDefault(require("./getPositionOwner"));
function getTradeDataFromRecentEvent(trade, market, transfers) {
    var marketName = market.name;
    var marketAddress = market.address;
    var expiryTimestamp = trade.args.trade.expiry.toNumber();
    var strikePrice = trade.args.trade.strikePrice;
    var positionId = trade.args.positionId.toNumber();
    var strikeId;
    if (market.lyra.version === lyra_1.Version.Newport) {
        strikeId = trade.args.trade.strikeId.toNumber();
    }
    else {
        strikeId = trade.args.strikeId.toNumber();
    }
    var isCall = (0, getIsCall_1.default)(trade.args.trade.optionType);
    var isLong = (0, getIsLong_1.default)(trade.args.trade.optionType);
    var isForceClose = trade.args.trade.isForceClose;
    var isOpen = trade.args.trade.tradeDirection === contracts_1.TradeDirection.Open;
    var isBuy = (0, getIsBuy_1.default)(trade.args.trade.optionType, isOpen);
    var size = trade.args.trade.amount;
    var spotPrice = trade.args.trade.spotPrice;
    var isLiquidation = trade.args.trade.tradeDirection === contracts_1.TradeDirection.Liquidate;
    var liquidation = trade.args.liquidation;
    var blockNumber = trade.blockNumber;
    var transactionHash = trade.transactionHash;
    var tradeResults = trade.args.tradeResults;
    if (tradeResults.length === 0) {
        throw new Error('No tradeResults in Trade event');
    }
    var optionPriceFee = tradeResults.reduce(function (sum, res) { return sum.add(res.optionPriceFee); }, bn_1.ZERO_BN);
    var spotPriceFee = tradeResults.reduce(function (sum, res) { return sum.add(res.spotPriceFee); }, bn_1.ZERO_BN);
    var vegaUtilFee = tradeResults.reduce(function (sum, res) { return sum.add(res.vegaUtilFee.vegaUtilFee); }, bn_1.ZERO_BN);
    var varianceFee = tradeResults.reduce(function (sum, res) { return sum.add(res.varianceFee.varianceFee); }, bn_1.ZERO_BN);
    var fee = optionPriceFee.add(spotPriceFee).add(vegaUtilFee).add(varianceFee);
    var premium = tradeResults.reduce(function (sum, res) { return sum.add(res.totalCost); }, bn_1.ZERO_BN);
    var lastTradeResult = tradeResults[tradeResults.length - 1];
    var newBaseIv = lastTradeResult.newBaseIv;
    var newSkew = lastTradeResult.newSkew;
    var newIv = newBaseIv.mul(newSkew).div(bn_1.UNIT);
    var volTraded = lastTradeResult.volTraded;
    var pricePerOption = size.gt(0) ? premium.mul(bn_1.UNIT).div(size) : bn_1.ZERO_BN;
    var collateralAmount = !isLong ? trade.args.trade.setCollateralTo : undefined;
    var isBaseCollateral = !isLong ? (0, getIsBaseCollateral_1.default)(trade.args.trade.optionType) : undefined;
    var collateralValue = collateralAmount
        ? isBaseCollateral
            ? collateralAmount.mul(spotPrice).div(bn_1.UNIT)
            : collateralAmount
        : undefined;
    var timestamp = trade.args.timestamp.toNumber();
    var trader = (0, getPositionOwner_1.default)(transfers, blockNumber);
    return {
        timestamp: timestamp,
        source: contracts_1.DataSource.Log,
        positionId: positionId,
        strikeId: strikeId,
        strikePrice: strikePrice,
        marketName: marketName,
        marketAddress: marketAddress,
        expiryTimestamp: expiryTimestamp,
        blockNumber: blockNumber,
        transactionHash: transactionHash,
        trader: trader,
        size: size,
        premium: premium,
        fee: fee,
        feeComponents: {
            optionPriceFee: optionPriceFee,
            spotPriceFee: spotPriceFee,
            vegaUtilFee: vegaUtilFee,
            varianceFee: varianceFee,
        },
        pricePerOption: pricePerOption,
        isOpen: isOpen,
        isCall: isCall,
        isBuy: isBuy,
        isLong: isLong,
        spotPrice: spotPrice,
        collateralAmount: collateralAmount,
        collateralValue: collateralValue,
        isBaseCollateral: isBaseCollateral,
        isForceClose: isForceClose,
        isLiquidation: isLiquidation,
        liquidation: liquidation,
        iv: newIv,
        skew: newSkew,
        baseIv: newBaseIv,
        volTraded: volTraded,
    };
}
exports.default = getTradeDataFromRecentEvent;
//# sourceMappingURL=getTradeDataFromRecentEvent.js.map