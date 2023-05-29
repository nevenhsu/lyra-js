import { CollateralUpdateData } from '../collateral_update_event';
import { PartialPositionUpdatedEvent, PartialTransferEvent } from '../constants/events';
import { Market } from '../market';
export default function getCollateralUpdateDataFromRecentEvent(update: PartialPositionUpdatedEvent, market: Market, transfers: PartialTransferEvent[]): CollateralUpdateData;
