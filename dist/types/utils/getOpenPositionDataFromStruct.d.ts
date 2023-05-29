import { CollateralUpdateData } from '..';
import { OptionToken as AvalonOptionToken } from '../contracts/avalon/typechain/AvalonOptionToken';
import { OptionToken as NewportOptionToken } from '../contracts/newport/typechain/NewportOptionToken';
import { Option } from '../option';
import { PositionData } from '../position';
import { SettleEventData } from '../settle_event';
import { TradeEventData } from '../trade_event';
import { TransferEventData } from '../transfer_event';
export default function getOpenPositionDataFromStruct(owner: string, positionStruct: NewportOptionToken.OptionPositionStructOutput | NewportOptionToken.PositionWithOwnerStructOutput | AvalonOptionToken.OptionPositionStructOutput | AvalonOptionToken.PositionWithOwnerStructOutput, option: Option, trades: TradeEventData[], collateralUpdates: CollateralUpdateData[], transfers: TransferEventData[], settle: SettleEventData | null): PositionData;
