import { BigNumber } from 'ethers';
import { PoolHedgerParams } from '../admin';
import { PoolHedgerView } from '../market';
import { Option } from '../option';
export default function canHedge(spotPrice: BigNumber, netDelta: BigNumber, option: Option, size: BigNumber, increasesPoolDelta: boolean, hedgerView: PoolHedgerView, poolHedgerParams: PoolHedgerParams): boolean;
