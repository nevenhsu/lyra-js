import { CollateralUpdateData } from '../collateral_update_event';
import { PositionQueryResult } from '../constants/queries';
import { Market } from '../market';
import { PositionData } from '../position';
import { SettleEventData } from '../settle_event';
import { TradeEventData } from '../trade_event';
import { TransferEventData } from '../transfer_event';
export default function getPositionDataFromSubgraph(position: PositionQueryResult, market: Market, trades: TradeEventData[], collateralUpdates: CollateralUpdateData[], transfers: TransferEventData[], settle: SettleEventData | null, ignoreLiquidationPrice?: boolean): PositionData;
