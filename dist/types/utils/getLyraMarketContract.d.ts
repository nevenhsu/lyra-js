import { ContractInterface } from '@ethersproject/contracts';
import Lyra, { MarketContractAddresses, Version } from '..';
import { LyraMarketContractId } from '../constants/contracts';
import { LyraMarketContractMap } from '../constants/mappings';
export declare const getMarketContractABI: (version: Version, contractId: LyraMarketContractId) => ContractInterface;
export declare const getMarketContractAddress: (contractAddresses: MarketContractAddresses, contractId: LyraMarketContractId) => string;
export default function getLyraMarketContract<V extends Version, C extends LyraMarketContractId>(lyra: Lyra, contractAddresses: MarketContractAddresses, version: V, contractId: C): LyraMarketContractMap<V, C>;
