import { BigNumber } from '@ethersproject/bignumber';
import { Board } from '../board';
import { CollateralUpdateData, CollateralUpdateEvent } from '../collateral_update_event';
import { DataSource, PositionState } from '../constants/contracts';
import Lyra from '../lyra';
import { Market } from '../market';
import { Option } from '../option';
import { SettleEvent, SettleEventData } from '../settle_event';
import { Strike } from '../strike';
import { Trade, TradeOptions } from '../trade';
import { TradeEvent, TradeEventData } from '../trade_event';
import { TransferEvent, TransferEventData } from '../transfer_event';
import { PositionCollateral } from './getPositionCollateral';
export type PositionData = {
    source: DataSource;
    market: Market;
    id: number;
    blockNumber: number;
    marketName: string;
    marketAddress: string;
    strikeId: number;
    strikePrice: BigNumber;
    expiryTimestamp: number;
    owner: string;
    size: BigNumber;
    isCall: boolean;
    isLong: boolean;
    collateral?: PositionCollateral;
    state: PositionState;
    isOpen: boolean;
    isLiquidated: boolean;
    isSettled: boolean;
    pricePerOption: BigNumber;
    spotPriceAtExpiry?: BigNumber;
    isInTheMoney: boolean;
    delta: BigNumber;
    openTimestamp: number;
    closeTimestamp?: number | null;
    trades: TradeEventData[];
    collateralUpdates: CollateralUpdateData[];
    transfers: TransferEventData[];
    settle: SettleEventData | null;
};
export type PositionPnl = {
    totalAverageOpenCost: BigNumber;
    totalAverageCloseCost: BigNumber;
    unrealizedPnl: BigNumber;
    unrealizedPnlPercentage: BigNumber;
    realizedPnl: BigNumber;
    realizedPnlPercentage: BigNumber;
    settlementPnl: BigNumber;
    settlementPnlPercentage: BigNumber;
};
export type PositionFilter = {
    markets?: string[];
    minOpenTimestamp?: number;
    maxCloseTimestamp?: number;
    minPositionIds?: Record<string, number>;
};
export declare enum PositionLeaderboardSortBy {
    RealizedPnl = "RealizedPnl",
    RealizedLongPnl = "RealizedLongPnl",
    RealizedLongPnlPercentage = "RealizedLongPnlPercentage",
    UnrealizedPnl = "UnrealizedPnl",
    UnrealizedLongPnl = "UnrealizedLongPnl",
    UnrealizedLongPnlPercentage = "UnrealizedLongPnlPercentage"
}
export type PositionLeaderboardFilter = {
    minTotalPremiums?: BigNumber;
    minTotalLongPremiums?: BigNumber;
    sortBy?: PositionLeaderboardSortBy;
    secondarySortBy?: PositionLeaderboardSortBy;
} & PositionFilter;
export type PositionLeaderboard = {
    account: string;
    realizedPnl: BigNumber;
    unrealizedPnl: BigNumber;
    realizedLongPnl: BigNumber;
    realizedLongPnlPercentage: BigNumber;
    unrealizedLongPnl: BigNumber;
    unrealizedLongPnlPercentage: BigNumber;
    totalPremiums: BigNumber;
    totalLongPremiums: BigNumber;
    totalNotionalVolume: BigNumber;
    positions: Position[];
};
export type PositionTradeOptions = Omit<TradeOptions, 'positionId'>;
export declare class Position {
    private __positionData;
    __source: DataSource;
    lyra: Lyra;
    id: number;
    marketName: string;
    marketAddress: string;
    strikeId: number;
    strikePrice: BigNumber;
    expiryTimestamp: number;
    owner: string;
    size: BigNumber;
    isCall: boolean;
    isLong: boolean;
    collateral?: PositionCollateral;
    state: PositionState;
    isOpen: boolean;
    isLiquidated: boolean;
    isSettled: boolean;
    pricePerOption: BigNumber;
    spotPriceAtExpiry?: BigNumber;
    isInTheMoney: boolean;
    delta: BigNumber;
    openTimestamp: number;
    closeTimestamp?: number | null;
    constructor(lyra: Lyra, position: PositionData);
    static get(lyra: Lyra, marketAddressOrName: string, positionId: number): Promise<Position>;
    static getAll(lyra: Lyra, filter?: PositionFilter): Promise<Position[]>;
    static getOpenByOwner(lyra: Lyra, owner: string): Promise<Position[]>;
    static getByOwner(lyra: Lyra, owner: string): Promise<Position[]>;
    sizeBeforeClose(): BigNumber;
    averageCostPerOption(): BigNumber;
    averageCollateralSpotPrice(): BigNumber;
    pnl(): PositionPnl;
    breakEven(): BigNumber;
    toBreakEven(): BigNumber;
    payoff(spotPriceAtExpiry: BigNumber): BigNumber;
    trades(): TradeEvent[];
    firstTrade(): TradeEvent | null;
    lastTrade(): TradeEvent | null;
    collateralUpdates(): CollateralUpdateEvent[];
    transfers(): TransferEvent[];
    settle(): SettleEvent | null;
    market(): Market;
    board(): Promise<Board>;
    strike(): Promise<Strike>;
    option(): Promise<Option>;
    trade(isBuy: boolean, size: BigNumber, slippage: number, options?: PositionTradeOptions): Promise<Trade>;
    open(size: BigNumber, slippage: number, options?: PositionTradeOptions): Promise<Trade>;
    close(size: BigNumber, slippage: number, options?: PositionTradeOptions): Promise<Trade>;
}
