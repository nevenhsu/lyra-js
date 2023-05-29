import { BigNumber } from 'ethers';
import { PoolHedgerParams } from '../admin';
import { GMXFuturesPoolHedger } from '../contracts/newport/typechain/NewportGMXFuturesPoolHedger';
import { Option } from '../option';
export default function canHedgeOnArbitrum(spotPrice: BigNumber, netDelta: BigNumber, option: Option, size: BigNumber, increasesPoolDelta: boolean, hedgerView: GMXFuturesPoolHedger.GMXFuturesPoolHedgerViewStructOutput, poolHedgerParams: PoolHedgerParams): boolean;
