"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var address_1 = require("@ethersproject/address");
var bignumber_1 = require("@ethersproject/bignumber");
var bn_1 = require("../constants/bn");
var contracts_1 = require("../constants/contracts");
var getPositionCollateral_1 = __importDefault(require("../position/getPositionCollateral"));
var getMaxCollateral_1 = __importDefault(require("./getMaxCollateral"));
function getPositionDataFromSubgraph(position, market, trades, collateralUpdates, transfers, settle, ignoreLiquidationPrice) {
    var _a, _b, _c;
    var id = position.positionId;
    var strikeId = parseInt(position.strike.strikeId);
    var boardId = parseInt(position.board.boardId);
    var isCall = position.option.isCall;
    var isLong = position.isLong;
    var state = position.state;
    var isOpen = state === contracts_1.PositionState.Active;
    var isLiquidated = state === contracts_1.PositionState.Liquidated;
    var isSettled = state === contracts_1.PositionState.Settled;
    var size = [contracts_1.PositionState.Closed, contracts_1.PositionState.Liquidated].includes(state)
        ? bn_1.ZERO_BN
        : bignumber_1.BigNumber.from(position.size);
    var liveOption;
    // Try get live board
    try {
        liveOption = boardId ? market.liveBoard(boardId).strike(strikeId).option(isCall) : null;
    }
    catch (_d) {
        liveOption = null;
    }
    var pricePerOption = liveOption ? liveOption.price : bn_1.ZERO_BN;
    var strikePrice = bignumber_1.BigNumber.from(position.strike.strikePrice);
    var isBaseCollateral = isCall ? !!position.isBaseCollateral : false;
    var spotPriceAtExpiry = position.board.spotPriceAtExpiry
        ? bignumber_1.BigNumber.from(position.board.spotPriceAtExpiry)
        : undefined;
    var spotPrice = market.spotPrice;
    var spotPriceOrAtExpiry = spotPriceAtExpiry !== null && spotPriceAtExpiry !== void 0 ? spotPriceAtExpiry : spotPrice;
    var isInTheMoney = isCall ? spotPriceOrAtExpiry.gt(strikePrice) : spotPriceOrAtExpiry.lt(strikePrice);
    // TODO: @dappbeast Fix subgraph to maintain last collateral amount on settle
    var collateralAmount = isOpen || isSettled ? (_b = (_a = collateralUpdates[collateralUpdates.length - 1]) === null || _a === void 0 ? void 0 : _a.amount) !== null && _b !== void 0 ? _b : bn_1.ZERO_BN : bn_1.ZERO_BN;
    var collateral = !isLong
        ? liveOption && !ignoreLiquidationPrice
            ? (0, getPositionCollateral_1.default)(liveOption, size, collateralAmount, isBaseCollateral)
            : {
                amount: collateralAmount,
                value: isBaseCollateral ? collateralAmount.mul(spotPrice).div(bn_1.UNIT) : collateralAmount,
                min: bn_1.ZERO_BN,
                max: (0, getMaxCollateral_1.default)(isCall, strikePrice, size, isBaseCollateral),
                isBase: isBaseCollateral,
                liquidationPrice: null,
            }
        : undefined;
    var marketName = market.name;
    var marketAddress = (0, address_1.getAddress)(market.address);
    var owner = (0, address_1.getAddress)(position.owner);
    var expiryTimestamp = position.board.expiryTimestamp;
    var openTimestamp = trades[0].timestamp;
    var closeTimestamp = isSettled && settle ? settle.timestamp : !isOpen ? trades[trades.length - 1].timestamp : null;
    return {
        id: id,
        market: market,
        source: contracts_1.DataSource.Subgraph,
        blockNumber: market.block.number,
        delta: (_c = liveOption === null || liveOption === void 0 ? void 0 : liveOption.delta) !== null && _c !== void 0 ? _c : bn_1.ZERO_BN,
        owner: owner,
        marketName: marketName,
        marketAddress: marketAddress,
        strikeId: strikeId,
        strikePrice: strikePrice,
        expiryTimestamp: expiryTimestamp,
        isCall: isCall,
        isLong: isLong,
        state: state,
        isOpen: isOpen,
        isLiquidated: isLiquidated,
        isSettled: isSettled,
        size: size,
        collateral: collateral,
        pricePerOption: pricePerOption,
        spotPriceAtExpiry: spotPriceAtExpiry,
        isInTheMoney: isInTheMoney,
        openTimestamp: openTimestamp,
        closeTimestamp: closeTimestamp,
        trades: trades,
        collateralUpdates: collateralUpdates,
        transfers: transfers,
        settle: settle,
    };
}
exports.default = getPositionDataFromSubgraph;
//# sourceMappingURL=getPositionDataFromSubgraph.js.map