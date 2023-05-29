import { ContractInterface } from '@ethersproject/contracts';
import Lyra, { Chain, Network, Version } from '..';
import { LyraContractId } from '../constants/contracts';
import { LyraContractMap } from '../constants/mappings';
export declare const getLyraContractAddress: (chain: Chain, version: Version, contractId: LyraContractId) => string;
export declare const getLyraContractABI: (version: Version, contractId: LyraContractId, network: Network) => ContractInterface;
export default function getLyraContract<V extends Version, C extends LyraContractId>(lyra: Lyra, version: V, contractId: C): LyraContractMap<V, C>;
