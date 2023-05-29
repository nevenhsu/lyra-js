import { UNIT, ZERO_BN } from '../constants/bn';
import { Market } from '../market';
import { Option } from '../option';
import { Position } from '../position';
import { Strike } from '../strike';
import { TradeEvent } from '../trade_event';
import fetchPositionEventDataByHash from '../utils/fetchPositionEventDataByHash';
import getAverageCollateralSpotPrice from '../utils/getAverageCollateralSpotPrice';
import getCollateralUpdatePnl from '../utils/getCollateralUpdatePnl';
export class CollateralUpdateEvent {
    constructor(lyra, update, trade) {
        this.lyra = lyra;
        this.__collateralUpdateData = update;
        this.__tradeData = trade;
        this.__source = update.source;
        this.owner = update.owner;
        this.timestamp = update.timestamp;
        this.transactionHash = update.transactionHash;
        this.positionId = update.positionId;
        this.blockNumber = update.blockNumber;
        this.marketAddress = update.marketAddress;
        this.expiryTimestamp = update.expiryTimestamp;
        this.amount = update.amount;
        this.value = update.value;
        this.marketName = update.marketName;
        this.strikeId = update.strikeId;
        this.strikePrice = update.strikePrice;
        this.isCall = update.isCall;
        this.isBaseCollateral = update.isBaseCollateral;
        this.spotPrice = update.spotPrice;
        this.isAdjustment = !trade;
        this.swap = update.swap;
    }
    // Getters
    static async getByHash(lyra, transactionHashOrReceipt) {
        const { collateralUpdates } = await fetchPositionEventDataByHash(lyra, transactionHashOrReceipt);
        return collateralUpdates;
    }
    // Dynamic Fields
    pnl(position) {
        return getCollateralUpdatePnl(position, this);
    }
    prevAmount(position) {
        var _a;
        const prevCollateralUpdates = position.collateralUpdates().filter(c => c.blockNumber < this.blockNumber);
        const prevCollateralUpdate = prevCollateralUpdates.length
            ? prevCollateralUpdates[prevCollateralUpdates.length - 1]
            : null;
        return (_a = prevCollateralUpdate === null || prevCollateralUpdate === void 0 ? void 0 : prevCollateralUpdate.amount) !== null && _a !== void 0 ? _a : ZERO_BN;
    }
    changeAmount(position) {
        const prevAmount = this.prevAmount(position);
        return this.amount.sub(prevAmount);
    }
    changeValue(position) {
        const changeAmount = this.changeAmount(position);
        return this.isBaseCollateral ? changeAmount.mul(this.spotPrice).div(UNIT) : changeAmount;
    }
    newAverageCollateralSpotPrice(position) {
        // Include this event by block number
        const collateralUpdates = position.collateralUpdates().filter(c => c.blockNumber <= this.blockNumber);
        return getAverageCollateralSpotPrice(position, collateralUpdates);
    }
    prevAverageCollateralSpotPrice(position) {
        // Exclude this event by block number
        const collateralUpdates = position.collateralUpdates().filter(c => c.blockNumber < this.blockNumber);
        return getAverageCollateralSpotPrice(position, collateralUpdates);
    }
    // Edges
    trade() {
        if (!this.__tradeData) {
            return null;
        }
        return new TradeEvent(this.lyra, this.__tradeData, this.__collateralUpdateData);
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
}
//# sourceMappingURL=index.js.map