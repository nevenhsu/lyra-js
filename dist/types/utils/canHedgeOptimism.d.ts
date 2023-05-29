import { BigNumber } from 'ethers';
import { PoolHedgerParams } from '../admin';
import { SNXPerpsV2PoolHedger } from '../contracts/newport/typechain/NewportSNXPerpsV2PoolHedger';
import { Option } from '../option';
export default function canHedgeOnOptimism(spotPrice: BigNumber, netDelta: BigNumber, option: Option, size: BigNumber, increasesPoolDelta: boolean, hedgerView: SNXPerpsV2PoolHedger.HedgerStateStructOutput, poolHedgerParams: PoolHedgerParams): boolean;
