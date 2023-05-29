"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var address_1 = require("@ethersproject/address");
var bignumber_1 = require("@ethersproject/bignumber");
var bn_1 = require("../constants/bn");
var contracts_1 = require("../constants/contracts");
function getSettleDataFromSubgraph(settle) {
    var spotPriceAtExpiry = bignumber_1.BigNumber.from(settle.spotPriceAtExpiry);
    var strikePrice = bignumber_1.BigNumber.from(settle.position.strike.strikePrice);
    var expiryTimestamp = settle.position.board.expiryTimestamp;
    var size = bignumber_1.BigNumber.from(settle.size);
    var isLong = settle.position.isLong;
    var isBaseCollateral = settle.position.isBaseCollateral;
    var settleAmount = bignumber_1.BigNumber.from(settle.settleAmount);
    var settlement = isLong ? settleAmount : bn_1.ZERO_BN;
    var returnedCollateralAmount = !isLong ? settleAmount : bn_1.ZERO_BN;
    var returnedCollateralValue = isBaseCollateral
        ? returnedCollateralAmount.mul(spotPriceAtExpiry).div(bn_1.UNIT)
        : returnedCollateralAmount;
    var isCall = settle.position.option.isCall;
    var isInTheMoney = isCall ? spotPriceAtExpiry.gt(strikePrice) : spotPriceAtExpiry.lt(strikePrice);
    return {
        source: contracts_1.DataSource.Subgraph,
        blockNumber: settle.blockNumber,
        positionId: settle.position.positionId,
        timestamp: settle.timestamp,
        size: size,
        spotPriceAtExpiry: spotPriceAtExpiry,
        transactionHash: settle.transactionHash,
        owner: (0, address_1.getAddress)(settle.owner),
        marketName: settle.position.market.name.substring(1),
        marketAddress: (0, address_1.getAddress)(settle.position.market.id),
        expiryTimestamp: expiryTimestamp,
        isCall: settle.position.option.isCall,
        strikePrice: strikePrice,
        isBaseCollateral: settle.position.isBaseCollateral,
        isLong: settle.position.isLong,
        settlement: settlement,
        isInTheMoney: isInTheMoney,
        returnedCollateralAmount: returnedCollateralAmount,
        returnedCollateralValue: returnedCollateralValue,
    };
}
exports.default = getSettleDataFromSubgraph;
//# sourceMappingURL=getSettleDataFromSubgraph.js.map