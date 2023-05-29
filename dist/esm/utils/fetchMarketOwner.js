import { LyraMarketContractId } from '../constants/contracts';
import getLyraMarketContract from './getLyraMarketContract';
export default async function fetchMarketOwner(lyra, marketContractAddresses) {
    const optionMarket = getLyraMarketContract(lyra, marketContractAddresses, lyra.version, LyraMarketContractId.OptionMarket);
    return await optionMarket.owner();
}
//# sourceMappingURL=fetchMarketOwner.js.map