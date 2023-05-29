"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bn_1 = require("../constants/bn");
var contracts_1 = require("../constants/contracts");
var getIsBaseCollateral_1 = __importDefault(require("./getIsBaseCollateral"));
var getIsCall_1 = __importDefault(require("./getIsCall"));
var getIsLong_1 = __importDefault(require("./getIsLong"));
var getPositionOwner_1 = __importDefault(require("./getPositionOwner"));
function getCollateralUpdateDataFromRecentEvent(update, market, transfers) {
    var positionId = update.args.positionId.toNumber();
    var blockNumber = update.blockNumber;
    var amount = update.args.position.collateral;
    var transactionHash = update.transactionHash;
    var strikeId = update.args.position.strikeId.toNumber();
    var isCall = (0, getIsCall_1.default)(update.args.position.optionType);
    var isLong = (0, getIsLong_1.default)(update.args.position.optionType);
    if (isLong) {
        throw new Error('Attempted to create CollateralUpdate for long position');
    }
    // Warning: Can throw if option isn't live
    var option = market.liveOption(strikeId, isCall);
    var marketName = option.market().name;
    var strikePrice = option.strike().strikePrice;
    var marketAddress = option.market().address;
    var expiryTimestamp = option.board().expiryTimestamp;
    var isBaseCollateral = (0, getIsBaseCollateral_1.default)(update.args.position.optionType);
    // Use current spot price as estimate for recent collateral update
    var spotPrice = option.market().spotPrice;
    var value = isBaseCollateral ? amount.mul(spotPrice).div(bn_1.UNIT) : amount;
    var timestamp = update.args.timestamp.toNumber();
    var owner = (0, getPositionOwner_1.default)(transfers, blockNumber);
    return {
        owner: owner,
        source: contracts_1.DataSource.Log,
        timestamp: timestamp,
        positionId: positionId,
        strikeId: strikeId,
        transactionHash: transactionHash,
        marketAddress: marketAddress,
        expiryTimestamp: expiryTimestamp,
        blockNumber: blockNumber,
        amount: amount,
        value: value,
        marketName: marketName,
        strikePrice: strikePrice,
        isCall: isCall,
        isBaseCollateral: isBaseCollateral,
        spotPrice: spotPrice,
    };
}
exports.default = getCollateralUpdateDataFromRecentEvent;
//# sourceMappingURL=getCollateralUpdateDataFromRecentEvent.js.map