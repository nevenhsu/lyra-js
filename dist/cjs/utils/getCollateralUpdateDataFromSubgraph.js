"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var address_1 = require("@ethersproject/address");
var bignumber_1 = require("@ethersproject/bignumber");
var bn_1 = require("../constants/bn");
var contracts_1 = require("../constants/contracts");
function getCollateralUpdateDataFromSubgraph(update) {
    var amount = bignumber_1.BigNumber.from(update.amount);
    var spotPrice = bignumber_1.BigNumber.from(update.spotPrice);
    var isBaseCollateral = update.isBaseCollateral;
    var value = isBaseCollateral ? amount.mul(spotPrice).div(bn_1.UNIT) : amount;
    var strikePrice = bignumber_1.BigNumber.from(update.strike.strikePrice);
    // TODO: @dappbeast Fix strikeId type in subgraph
    var strikeId = parseInt(update.strike.strikeId);
    // Remove "s" prefix from name
    var marketName = update.market.name.substring(1);
    return {
        owner: (0, address_1.getAddress)(update.trader),
        source: contracts_1.DataSource.Subgraph,
        timestamp: update.timestamp,
        amount: amount,
        value: value,
        positionId: update.position.positionId,
        blockNumber: update.blockNumber,
        isBaseCollateral: isBaseCollateral,
        marketName: marketName,
        marketAddress: (0, address_1.getAddress)(update.market.id),
        isCall: update.option.isCall,
        strikeId: strikeId,
        strikePrice: strikePrice,
        spotPrice: spotPrice,
        expiryTimestamp: update.board.expiryTimestamp,
        transactionHash: update.transactionHash,
        swap: update.externalSwapFees
            ? {
                address: update.externalSwapAddress,
            }
            : undefined,
    };
}
exports.default = getCollateralUpdateDataFromSubgraph;
//# sourceMappingURL=getCollateralUpdateDataFromSubgraph.js.map