import { TransactionReceipt } from '@ethersproject/providers';
import { DataSource } from '../constants/contracts';
import Lyra from '../lyra';
export type TransferEventData = {
    transactionHash: string;
    source: DataSource;
    blockNumber: number;
    from: string;
    to: string;
    marketAddress: string;
    positionId: number;
};
export declare class TransferEvent {
    private lyra;
    private __transferData;
    __source: DataSource;
    transactionHash: string;
    blockNumber: number;
    from: string;
    to: string;
    marketAddress: string;
    positionId: number;
    constructor(lyra: Lyra, transfer: TransferEventData);
    static getByHash(lyra: Lyra, transactionHashOrReceipt: string | TransactionReceipt): Promise<TransferEvent[]>;
}
