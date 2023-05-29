import fetchPositionEventDataByHash from '../utils/fetchPositionEventDataByHash';
export class SettleEvent {
    constructor(lyra, settle) {
        this.lyra = lyra;
        this.__settleData = settle;
        this.__source = settle.source;
        this.blockNumber = settle.blockNumber;
        this.positionId = settle.positionId;
        this.spotPriceAtExpiry = settle.spotPriceAtExpiry;
        this.timestamp = settle.timestamp;
        this.transactionHash = settle.transactionHash;
        this.owner = settle.owner;
        this.size = settle.size;
        this.marketName = settle.marketName;
        this.blockNumber = settle.blockNumber;
        this.marketAddress = settle.marketAddress;
        this.expiryTimestamp = settle.expiryTimestamp;
        this.isCall = settle.isCall;
        this.isLong = settle.isLong;
        this.isBaseCollateral = settle.isBaseCollateral;
        this.strikePrice = settle.strikePrice;
        this.settlement = settle.settlement;
        this.returnedCollateralAmount = settle.returnedCollateralAmount;
        this.returnedCollateralValue = settle.returnedCollateralValue;
        this.isInTheMoney = settle.isInTheMoney;
    }
    // Getters
    static async getByHash(lyra, transactionHashOrReceipt) {
        const { settles } = await fetchPositionEventDataByHash(lyra, transactionHashOrReceipt);
        return settles;
    }
    // Dynamic Fields
    pnl(position) {
        return position.pnl().settlementPnl;
    }
    // Edges
    async position() {
        return await this.lyra.position(this.marketAddress, this.positionId);
    }
}
//# sourceMappingURL=index.js.map