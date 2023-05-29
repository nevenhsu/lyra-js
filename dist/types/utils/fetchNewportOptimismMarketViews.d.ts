import { BigNumber } from 'ethers';
import { PoolHedgerParams } from '../admin';
import { OptionMarketViewer } from '../contracts/newport/typechain/NewportOptionMarketViewer';
import { SNXPerpsV2PoolHedger } from '../contracts/newport/typechain/NewportSNXPerpsV2PoolHedger';
import { SNXPerpV2Adapter } from '../contracts/newport/typechain/NewportSNXPerpV2Adapter';
import Lyra from '../lyra';
export default function fetchNewportOptimismMarketViews(lyra: Lyra): Promise<{
    marketViews: {
        marketView: OptionMarketViewer.MarketViewStructOutput;
        hedgerView: SNXPerpsV2PoolHedger.HedgerStateStructOutput;
        adapterView: SNXPerpV2Adapter.MarketAdapterStateStructOutput;
        poolHedgerParams: PoolHedgerParams;
        tokenPrice: BigNumber;
        baseLimit: BigNumber;
    }[];
    isGlobalPaused: boolean;
    owner: string;
    blockNumber: number;
}>;
