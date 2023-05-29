import { BigNumber } from 'ethers';
import { PoolHedgerParams } from '..';
import { Option } from '../option';
export default function getCappedExpectedHedge(option: Option, size: BigNumber, netDelta: BigNumber, poolHedgerParams: PoolHedgerParams, increasesPoolDelta: boolean): BigNumber;
