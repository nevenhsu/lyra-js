"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var address_1 = require("@ethersproject/address");
var bignumber_1 = require("@ethersproject/bignumber");
var bn_1 = require("../constants/bn");
var contracts_1 = require("../constants/contracts");
function getTradeDataFromSubgraph(trade) {
    var _a;
    var size = bignumber_1.BigNumber.from(trade.size);
    var spotPrice = bignumber_1.BigNumber.from(trade.spotPrice);
    var premium = bignumber_1.BigNumber.from(trade.premium);
    var spotPriceFee = bignumber_1.BigNumber.from(trade.spotPriceFee);
    var optionPriceFee = bignumber_1.BigNumber.from(trade.optionPriceFee);
    var vegaUtilFee = bignumber_1.BigNumber.from(trade.vegaUtilFee);
    var varianceFee = bignumber_1.BigNumber.from(trade.varianceFee);
    var swapFee = bignumber_1.BigNumber.from((_a = trade.externalSwapFees) !== null && _a !== void 0 ? _a : 0);
    var strikePrice = bignumber_1.BigNumber.from(trade.strike.strikePrice);
    var collateralAmount = !trade.position.isLong
        ? trade.setCollateralTo
            ? bignumber_1.BigNumber.from(trade.setCollateralTo)
            : bn_1.ZERO_BN
        : undefined;
    var isBaseCollateral = !trade.position.isLong ? trade.position.isBaseCollateral : undefined;
    var collateralValue = collateralAmount
        ? isBaseCollateral
            ? collateralAmount.mul(spotPrice).div(bn_1.UNIT)
            : collateralAmount
        : undefined;
    return {
        timestamp: trade.timestamp,
        source: contracts_1.DataSource.Subgraph,
        positionId: trade.position.positionId,
        blockNumber: trade.blockNumber,
        marketName: trade.market.name.substring(1),
        marketAddress: (0, address_1.getAddress)(trade.market.id),
        isCall: trade.option.isCall,
        strikeId: parseInt(trade.strike.strikeId),
        strikePrice: strikePrice,
        expiryTimestamp: trade.board.expiryTimestamp,
        transactionHash: trade.transactionHash,
        trader: (0, address_1.getAddress)(trade.trader),
        size: size,
        isOpen: trade.isOpen,
        isBuy: trade.isBuy,
        isLong: trade.position.isLong,
        spotPrice: spotPrice,
        pricePerOption: premium.mul(bn_1.UNIT).div(size),
        premium: premium,
        fee: spotPriceFee.add(optionPriceFee).add(vegaUtilFee).add(varianceFee).add(swapFee),
        feeComponents: {
            spotPriceFee: spotPriceFee,
            optionPriceFee: optionPriceFee,
            vegaUtilFee: vegaUtilFee,
            varianceFee: varianceFee,
        },
        iv: bignumber_1.BigNumber.from(trade.newIv),
        baseIv: bignumber_1.BigNumber.from(trade.newBaseIv),
        skew: bignumber_1.BigNumber.from(trade.newSkew),
        volTraded: bignumber_1.BigNumber.from(trade.volTraded),
        collateralAmount: collateralAmount,
        collateralValue: collateralValue,
        isBaseCollateral: isBaseCollateral,
        isForceClose: trade.isForceClose,
        isLiquidation: trade.isLiquidation,
        swap: trade.externalSwapFees
            ? {
                fee: bignumber_1.BigNumber.from(trade.externalSwapFees),
                address: trade.externalSwapAddress,
            }
            : undefined,
    };
}
exports.default = getTradeDataFromSubgraph;
//# sourceMappingURL=getTradeDataFromSubgraph.js.map