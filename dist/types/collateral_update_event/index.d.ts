import { BigNumber } from '@ethersproject/bignumber';
import { TransactionReceipt } from '@ethersproject/providers';
import { Board } from '../board';
import { DataSource } from '../constants/contracts';
import Lyra from '../lyra';
import { Market } from '../market';
import { Option } from '../option';
import { Position } from '../position';
import { Strike } from '../strike';
import { TradeEvent, TradeEventData } from '../trade_event';
export type CollateralUpdateData = {
    owner: string;
    source: DataSource;
    timestamp: number;
    transactionHash: string;
    positionId: number;
    marketName: string;
    marketAddress: string;
    expiryTimestamp: number;
    strikeId: number;
    strikePrice: BigNumber;
    blockNumber: number;
    amount: BigNumber;
    value: BigNumber;
    isBaseCollateral: boolean;
    isCall: boolean;
    spotPrice: BigNumber;
    swap?: {
        address: string;
    };
};
export declare class CollateralUpdateEvent {
    private __collateralUpdateData;
    private __tradeData?;
    __source: DataSource;
    lyra: Lyra;
    owner: string;
    timestamp: number;
    transactionHash: string;
    positionId: number;
    marketAddress: string;
    marketName: string;
    strikeId: number;
    strikePrice: BigNumber;
    expiryTimestamp: number;
    blockNumber: number;
    amount: BigNumber;
    value: BigNumber;
    isBaseCollateral: boolean;
    isCall: boolean;
    isAdjustment: boolean;
    swap?: {
        address: string;
    };
    spotPrice: BigNumber;
    constructor(lyra: Lyra, update: CollateralUpdateData, trade?: TradeEventData);
    static getByHash(lyra: Lyra, transactionHashOrReceipt: string | TransactionReceipt): Promise<CollateralUpdateEvent[]>;
    pnl(position: Position): BigNumber;
    prevAmount(position: Position): BigNumber;
    changeAmount(position: Position): BigNumber;
    changeValue(position: Position): BigNumber;
    newAverageCollateralSpotPrice(position: Position): BigNumber;
    prevAverageCollateralSpotPrice(position: Position): BigNumber;
    trade(): TradeEvent | null;
    position(): Promise<Position>;
    option(): Promise<Option>;
    strike(): Promise<Strike>;
    board(): Promise<Board>;
    market(): Promise<Market>;
}
