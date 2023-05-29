import { CollateralUpdateEvent } from '../collateral_update_event';
import { Market } from '../market';
import { Option } from '../option';
import { Position } from '../position';
import { Strike } from '../strike';
import fetchPositionEventDataByHash from '../utils/fetchPositionEventDataByHash';
import fetchTradeListener from '../utils/fetchTradeListener';
import getAverageCostPerOption from '../utils/getAverageCostPerOption';
import getPositionPreviousTrades from '../utils/getPositionPreviousTrades';
import getTradePnl from '../utils/getTradePnl';
import getTradeEventNewSize from './getTradeEventNewSize';
import getTradeEventPreviousSize from './getTradeEventPreviousSize';
export class TradeEvent {
    constructor(lyra, trade, collateralUpdate) {
        this.lyra = lyra;
        this.__tradeData = trade;
        if (!trade.isLong && collateralUpdate) {
            // Only set collateral update data for shorts
            this.__collateralUpdateData = collateralUpdate;
        }
        this.__source = trade.source;
        this.positionId = trade.positionId;
        this.marketName = trade.marketName;
        this.marketAddress = trade.marketAddress;
        this.timestamp = trade.timestamp;
        this.blockNumber = trade.blockNumber;
        this.transactionHash = trade.transactionHash;
        this.trader = trade.trader;
        this.size = trade.size;
        this.isCall = trade.isCall;
        this.isOpen = trade.isOpen;
        this.isBuy = trade.isBuy;
        this.isLong = trade.isLong;
        this.strikeId = trade.strikeId;
        this.strikePrice = trade.strikePrice;
        this.expiryTimestamp = trade.expiryTimestamp;
        this.spotPrice = trade.spotPrice;
        this.pricePerOption = trade.pricePerOption;
        this.premium = trade.premium;
        this.fee = trade.fee;
        this.feeComponents = trade.feeComponents;
        this.swap = trade.swap;
        this.iv = trade.iv;
        this.skew = trade.skew;
        this.baseIv = trade.baseIv;
        this.volTraded = trade.volTraded;
        this.collateralAmount = trade.collateralAmount;
        this.collateralValue = trade.collateralValue;
        this.isBaseCollateral = trade.isBaseCollateral;
        this.isForceClose = trade.isForceClose;
        this.isLiquidation = trade.isLiquidation;
        this.liquidation = trade.liquidation;
    }
    // Getters
    static async getByHash(lyra, transactionHashOrReceipt) {
        const { trades } = await fetchPositionEventDataByHash(lyra, transactionHashOrReceipt);
        return trades;
    }
    // Dynamic fields
    pnl(position) {
        // Pnl based on premiums
        return getTradePnl(position, this);
    }
    newAverageCostPerOption(position) {
        return getAverageCostPerOption(getPositionPreviousTrades(position, this).concat([this]));
    }
    prevAverageCostPerOption(position) {
        return getAverageCostPerOption(getPositionPreviousTrades(position, this));
    }
    newSize(position) {
        return getTradeEventNewSize(position, this);
    }
    prevSize(position) {
        return getTradeEventPreviousSize(position, this);
    }
    // Edges
    collateralUpdate() {
        if (!this.__collateralUpdateData) {
            return null;
        }
        return new CollateralUpdateEvent(this.lyra, this.__collateralUpdateData, this.__tradeData);
    }
    async position() {
        return await Position.get(this.lyra, this.marketAddress, this.positionId);
    }
    async option() {
        return await Option.get(this.lyra, this.marketAddress, this.strikeId, this.isCall);
    }
    async strike() {
        return await Strike.get(this.lyra, this.marketAddress, this.strikeId);
    }
    async board() {
        return (await this.strike()).board();
    }
    async market() {
        return await Market.get(this.lyra, this.marketAddress);
    }
    // Listeners
    static on(lyra, callback, options) {
        return fetchTradeListener(lyra, callback, options);
    }
}
//# sourceMappingURL=index.js.map