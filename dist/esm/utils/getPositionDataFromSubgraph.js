import { getAddress } from '@ethersproject/address';
import { BigNumber } from '@ethersproject/bignumber';
import { UNIT, ZERO_BN } from '../constants/bn';
import { DataSource, PositionState } from '../constants/contracts';
import getPositionCollateral from '../position/getPositionCollateral';
import getMaxCollateral from './getMaxCollateral';
export default function getPositionDataFromSubgraph(position, market, trades, collateralUpdates, transfers, settle, ignoreLiquidationPrice) {
    var _a, _b, _c;
    const id = position.positionId;
    const strikeId = parseInt(position.strike.strikeId);
    const boardId = parseInt(position.board.boardId);
    const isCall = position.option.isCall;
    const isLong = position.isLong;
    const state = position.state;
    const isOpen = state === PositionState.Active;
    const isLiquidated = state === PositionState.Liquidated;
    const isSettled = state === PositionState.Settled;
    const size = [PositionState.Closed, PositionState.Liquidated].includes(state)
        ? ZERO_BN
        : BigNumber.from(position.size);
    let liveOption;
    // Try get live board
    try {
        liveOption = boardId ? market.liveBoard(boardId).strike(strikeId).option(isCall) : null;
    }
    catch (_d) {
        liveOption = null;
    }
    const pricePerOption = liveOption ? liveOption.price : ZERO_BN;
    const strikePrice = BigNumber.from(position.strike.strikePrice);
    const isBaseCollateral = isCall ? !!position.isBaseCollateral : false;
    const spotPriceAtExpiry = position.board.spotPriceAtExpiry
        ? BigNumber.from(position.board.spotPriceAtExpiry)
        : undefined;
    const spotPrice = market.spotPrice;
    const spotPriceOrAtExpiry = spotPriceAtExpiry !== null && spotPriceAtExpiry !== void 0 ? spotPriceAtExpiry : spotPrice;
    const isInTheMoney = isCall ? spotPriceOrAtExpiry.gt(strikePrice) : spotPriceOrAtExpiry.lt(strikePrice);
    // TODO: @dappbeast Fix subgraph to maintain last collateral amount on settle
    const collateralAmount = isOpen || isSettled ? (_b = (_a = collateralUpdates[collateralUpdates.length - 1]) === null || _a === void 0 ? void 0 : _a.amount) !== null && _b !== void 0 ? _b : ZERO_BN : ZERO_BN;
    const collateral = !isLong
        ? liveOption && !ignoreLiquidationPrice
            ? getPositionCollateral(liveOption, size, collateralAmount, isBaseCollateral)
            : {
                amount: collateralAmount,
                value: isBaseCollateral ? collateralAmount.mul(spotPrice).div(UNIT) : collateralAmount,
                min: ZERO_BN,
                max: getMaxCollateral(isCall, strikePrice, size, isBaseCollateral),
                isBase: isBaseCollateral,
                liquidationPrice: null,
            }
        : undefined;
    const marketName = market.name;
    const marketAddress = getAddress(market.address);
    const owner = getAddress(position.owner);
    const expiryTimestamp = position.board.expiryTimestamp;
    const openTimestamp = trades[0].timestamp;
    const closeTimestamp = isSettled && settle ? settle.timestamp : !isOpen ? trades[trades.length - 1].timestamp : null;
    return {
        id,
        market,
        source: DataSource.Subgraph,
        blockNumber: market.block.number,
        delta: (_c = liveOption === null || liveOption === void 0 ? void 0 : liveOption.delta) !== null && _c !== void 0 ? _c : ZERO_BN,
        owner,
        marketName,
        marketAddress,
        strikeId,
        strikePrice,
        expiryTimestamp,
        isCall,
        isLong,
        state,
        isOpen,
        isLiquidated,
        isSettled,
        size,
        collateral,
        pricePerOption,
        spotPriceAtExpiry,
        isInTheMoney,
        openTimestamp,
        closeTimestamp,
        trades,
        collateralUpdates,
        transfers,
        settle,
    };
}
//# sourceMappingURL=getPositionDataFromSubgraph.js.map