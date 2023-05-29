import { BigNumber } from 'ethers';
import { PoolHedgerParams } from '../admin';
import { GMXAdapter } from '../contracts/newport/typechain/NewportGMXAdapter';
import { GMXFuturesPoolHedger } from '../contracts/newport/typechain/NewportGMXFuturesPoolHedger';
import { OptionMarketViewer } from '../contracts/newport/typechain/NewportOptionMarketViewer';
import Lyra from '../lyra';
export default function fetchNewportMarketViews(lyra: Lyra): Promise<{
    marketViews: {
        marketView: OptionMarketViewer.MarketViewStructOutput;
        hedgerView: GMXFuturesPoolHedger.GMXFuturesPoolHedgerViewStructOutput;
        adapterView: GMXAdapter.GMXAdapterStateStructOutput;
        poolHedgerParams: PoolHedgerParams;
        tokenPrice: BigNumber;
        baseLimit: null;
    }[];
    isGlobalPaused: boolean;
    owner: string;
    blockNumber: number;
}>;
