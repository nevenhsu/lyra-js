"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var contracts_1 = require("../constants/contracts");
var getPositionCollateral_1 = __importDefault(require("../position/getPositionCollateral"));
var getIsBaseCollateral_1 = __importDefault(require("./getIsBaseCollateral"));
var getIsCall_1 = __importDefault(require("./getIsCall"));
var getIsLong_1 = __importDefault(require("./getIsLong"));
function getOpenPositionDataFromStruct(owner, positionStruct, option, trades, collateralUpdates, transfers, settle) {
    // Position struct
    var id = positionStruct.positionId.toNumber();
    var size = positionStruct.amount;
    var optionType = positionStruct.optionType;
    var isCall = (0, getIsCall_1.default)(optionType);
    var isLong = (0, getIsLong_1.default)(optionType);
    var state = positionStruct.state;
    var isOpen = state === contracts_1.PositionState.Active;
    var isLiquidated = state === contracts_1.PositionState.Liquidated;
    var isSettled = state === contracts_1.PositionState.Settled;
    var isBaseCollateral = !isLong && isCall ? (0, getIsBaseCollateral_1.default)(optionType) : undefined;
    var collateral = !isLong
        ? (0, getPositionCollateral_1.default)(option, size, positionStruct.collateral, isBaseCollateral)
        : undefined;
    // Option
    var spotPriceAtExpiry = option.board().spotPriceAtExpiry;
    var spotPrice = option.market().spotPrice;
    var spotPriceOrAtExpiry = spotPriceAtExpiry !== null && spotPriceAtExpiry !== void 0 ? spotPriceAtExpiry : spotPrice;
    var strikePrice = option.strike().strikePrice;
    var isInTheMoney = isCall ? spotPriceOrAtExpiry.gt(strikePrice) : spotPriceOrAtExpiry.lt(strikePrice);
    // Events
    var firstTrade = trades[0];
    var lastTrade = trades[trades.length - 1];
    var market = option.market();
    var strike = option.strike();
    var board = option.board();
    // HACK: Ensure first trade timestamp is always set
    var openTimestamp = firstTrade ? firstTrade.timestamp : 0;
    var closeTimestamp = isSettled && settle ? settle.timestamp : !isOpen ? (lastTrade ? lastTrade.timestamp : null) : null;
    return {
        id: id,
        market: market,
        source: contracts_1.DataSource.ContractCall,
        blockNumber: market.block.number,
        owner: owner,
        marketName: market.name,
        marketAddress: market.address,
        strikeId: strike.id,
        strikePrice: strike.strikePrice,
        expiryTimestamp: board.expiryTimestamp,
        size: size,
        isCall: isCall,
        isLong: isLong,
        state: state,
        isOpen: isOpen,
        isLiquidated: isLiquidated,
        isSettled: isSettled,
        collateral: collateral,
        pricePerOption: option.price,
        spotPriceAtExpiry: spotPriceAtExpiry,
        isInTheMoney: isInTheMoney,
        delta: option.delta,
        openTimestamp: openTimestamp,
        closeTimestamp: closeTimestamp,
        trades: trades,
        collateralUpdates: collateralUpdates,
        transfers: transfers,
        settle: settle,
    };
}
exports.default = getOpenPositionDataFromStruct;
//# sourceMappingURL=getOpenPositionDataFromStruct.js.map