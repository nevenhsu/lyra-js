import { LyraMarketContractId } from '../constants/contracts';
import { LyraMarketContractMap } from '../constants/mappings';
import Lyra, { Version } from '../lyra';
import { MarketContractAddresses } from '../market';
export default function getLyraMarketContractForAddress<V extends Version, C extends LyraMarketContractId>(lyra: Lyra, version: V, marketContractAddresses: MarketContractAddresses, address: string): {
    contractId: string;
    contract: LyraMarketContractMap<V, C>;
} | null;
