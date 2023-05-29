import { TransactionReceipt } from '@ethersproject/providers';
import Lyra, { CollateralUpdateEvent, SettleEvent, TradeEvent } from '..';
import { TransferEvent } from '../transfer_event';
export default function fetchPositionEventDataByHash(lyra: Lyra, transactionHashOrReceipt: TransactionReceipt | string): Promise<{
    trades: TradeEvent[];
    collateralUpdates: CollateralUpdateEvent[];
    transfers: TransferEvent[];
    settles: SettleEvent[];
}>;
