import { OptionMarketViewer } from '../contracts/avalon/typechain/AvalonOptionMarketViewer';
import Lyra from '../lyra';
export default function fetchAvalonMarketView(lyra: Lyra, marketAddressOrName: string): Promise<{
    marketView: OptionMarketViewer.MarketViewWithBoardsStructOutput;
    isGlobalPaused: boolean;
    owner: string;
    blockNumber: number;
}>;
