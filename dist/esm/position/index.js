import { CollateralUpdateEvent } from '../collateral_update_event';
import { ZERO_BN } from '../constants/bn';
import { Market } from '../market';
import { SettleEvent } from '../settle_event';
import { Trade } from '../trade';
import { TradeEvent } from '../trade_event';
import { TransferEvent } from '../transfer_event';
import fetchOpenPositionDataByOwner from '../utils/fetchOpenPositionDataByOwner';
import fetchPositionDataByID from '../utils/fetchPositionDataByID';
import fetchPositionDataByOwner from '../utils/fetchPositionDataByOwner';
import getAverageCollateralSpotPrice from '../utils/getAverageCollateralSpotPrice';
import getAverageCostPerOption from '../utils/getAverageCostPerOption';
import getBreakEvenPrice from '../utils/getBreakEvenPrice';
import getProjectedSettlePnl from '../utils/getProjectedSettlePnl';
import getPositionPnl from './getPositionPnl';
export class Position {
    constructor(lyra, position) {
        this.lyra = lyra;
        this.__positionData = position;
        this.__source = position.source;
        this.owner = position.owner;
        this.id = position.id;
        this.strikeId = position.strikeId;
        this.strikePrice = position.strikePrice;
        this.expiryTimestamp = position.expiryTimestamp;
        this.marketName = position.marketName;
        this.marketAddress = position.marketAddress;
        this.isCall = position.isCall;
        this.isLong = position.isLong;
        this.state = position.state;
        this.isOpen = position.isOpen;
        this.size = position.size;
        this.isLiquidated = position.isLiquidated;
        this.isSettled = position.isSettled;
        this.collateral = position.collateral;
        this.pricePerOption = position.pricePerOption;
        this.spotPriceAtExpiry = position.spotPriceAtExpiry;
        this.isInTheMoney = position.isInTheMoney;
        this.delta = position.delta;
        this.openTimestamp = position.openTimestamp;
        this.closeTimestamp = position.closeTimestamp;
    }
    // Getters
    static async get(lyra, marketAddressOrName, positionId) {
        const market = await Market.get(lyra, marketAddressOrName);
        const position = await fetchPositionDataByID(lyra, market, positionId);
        return new Position(lyra, position);
    }
    static async getOpenByOwner(lyra, owner) {
        const positions = await fetchOpenPositionDataByOwner(lyra, owner);
        return positions.map(position => new Position(lyra, position));
    }
    static async getByOwner(lyra, owner) {
        const positions = await fetchPositionDataByOwner(lyra, owner);
        return positions.map(position => new Position(lyra, position));
    }
    // Dynamic Fields
    sizeBeforeClose() {
        const lastTrade = this.lastTrade();
        if (!this.isOpen && this.size.isZero() && lastTrade) {
            // Position manually closed, use size before last trade
            return lastTrade.prevSize(this);
        }
        else {
            // Position may be settled or still open
            return this.size;
        }
    }
    averageCostPerOption() {
        return getAverageCostPerOption(this.trades());
    }
    averageCollateralSpotPrice() {
        return getAverageCollateralSpotPrice(this, this.collateralUpdates());
    }
    pnl() {
        return getPositionPnl(this);
    }
    breakEven() {
        return getBreakEvenPrice(this.isCall, this.strikePrice, this.averageCostPerOption());
    }
    toBreakEven() {
        var _a, _b, _c;
        const breakEven = this.breakEven();
        const spotPrice = this.isOpen
            ? this.market().spotPrice
            : this.isSettled
                ? (_a = this.spotPriceAtExpiry) !== null && _a !== void 0 ? _a : ZERO_BN
                : (_c = (_b = this.lastTrade()) === null || _b === void 0 ? void 0 : _b.spotPrice) !== null && _c !== void 0 ? _c : ZERO_BN;
        const breakEvenDiff = breakEven.sub(spotPrice);
        const toBreakEven = this.isCall
            ? spotPrice.gt(breakEven)
                ? ZERO_BN
                : breakEvenDiff
            : spotPrice.lt(breakEven)
                ? ZERO_BN
                : breakEvenDiff;
        return toBreakEven;
    }
    payoff(spotPriceAtExpiry) {
        var _a;
        return getProjectedSettlePnl(this.isLong, this.isCall, this.strikePrice, spotPriceAtExpiry, this.averageCostPerOption(), this.sizeBeforeClose(), (_a = this.collateral) === null || _a === void 0 ? void 0 : _a.liquidationPrice);
    }
    // Edges
    trades() {
        const { trades, collateralUpdates } = this.__positionData;
        const collateralUpdatesByHash = collateralUpdates.reduce((dict, update) => ({ ...dict, [update.transactionHash]: update }), {});
        return trades.map(trade => new TradeEvent(this.lyra, trade, collateralUpdatesByHash[trade.transactionHash]));
    }
    firstTrade() {
        const trades = this.trades();
        return trades.length > 0 ? trades[0] : null;
    }
    lastTrade() {
        const trades = this.trades();
        return trades.length > 0 ? trades[trades.length - 1] : null;
    }
    collateralUpdates() {
        const { trades, collateralUpdates } = this.__positionData;
        const tradesByHash = trades.reduce((dict, trade) => ({ ...dict, [trade.transactionHash]: trade }), {});
        return collateralUpdates.map(collatUpdate => new CollateralUpdateEvent(this.lyra, collatUpdate, tradesByHash[collatUpdate.transactionHash]));
    }
    transfers() {
        const { transfers } = this.__positionData;
        return transfers.map(transferData => new TransferEvent(this.lyra, transferData));
    }
    settle() {
        const { settle } = this.__positionData;
        return settle ? new SettleEvent(this.lyra, settle) : null;
    }
    market() {
        return this.__positionData.market;
    }
    async board() {
        return (await this.strike()).board();
    }
    async strike() {
        return this.market().strike(this.strikeId);
    }
    liveStrike() {
        return this.market().liveStrike(this.strikeId);
    }
    async option() {
        return this.market().option(this.strikeId, this.isCall);
    }
    liveOption() {
        return this.market().liveOption(this.strikeId, this.isCall);
    }
    // Trade
    async trade(isBuy, size, slippage, options) {
        return await Trade.get(this.lyra, this.owner, this.marketAddress, this.strikeId, this.isCall, isBuy, size, slippage, {
            positionId: this.id,
            ...options,
        });
    }
    async open(size, slippage, options) {
        const isBuy = this.isLong;
        return await this.trade(isBuy, size, slippage, options);
    }
    async close(size, slippage, options) {
        const isBuy = !this.isLong;
        return await this.trade(isBuy, size, slippage, options);
    }
}
//# sourceMappingURL=index.js.map