import fetchPositionEventDataByHash from '../utils/fetchPositionEventDataByHash';
export class TransferEvent {
    constructor(lyra, transfer) {
        this.lyra = lyra;
        this.__transferData = transfer;
        this.__source = transfer.source;
        this.transactionHash = transfer.transactionHash;
        this.blockNumber = transfer.blockNumber;
        this.from = transfer.from;
        this.to = transfer.to;
        this.positionId = transfer.positionId;
    }
    // Getters
    static async getByHash(lyra, transactionHashOrReceipt) {
        const { transfers } = await fetchPositionEventDataByHash(lyra, transactionHashOrReceipt);
        return transfers;
    }
}
//# sourceMappingURL=index.js.map