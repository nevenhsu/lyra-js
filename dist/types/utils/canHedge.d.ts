import { BigNumber } from 'ethers';
import { Network, PoolHedgerParams } from '..';
import { PoolHedgerView } from '../market';
import { Option } from '../option';
export default function canHedge(quoteSpotPrice: BigNumber, netDelta: BigNumber, option: Option, size: BigNumber, increasesPoolDelta: boolean, hedgerView: PoolHedgerView, poolHedgerParams: PoolHedgerParams, network: Network): boolean;
