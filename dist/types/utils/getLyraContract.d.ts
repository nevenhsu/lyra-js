import { ContractInterface } from '@ethersproject/contracts';
import { JsonRpcProvider } from '@ethersproject/providers';
import Lyra, { Chain, Version } from '..';
import { LyraContractId } from '../constants/contracts';
import { LyraContractMap } from '../constants/mappings';
export declare const getLyraContractAddress: (chain: Chain | 'ethereum', version: Version, contractId: LyraContractId) => string;
export declare const getLyraContractABI: (version: Version, contractId: LyraContractId) => ContractInterface;
export default function getLyraContract<V extends Version, C extends LyraContractId>(lyra: Lyra, version: V, contractId: C, useCustomProvider?: JsonRpcProvider): LyraContractMap<V, C>;
