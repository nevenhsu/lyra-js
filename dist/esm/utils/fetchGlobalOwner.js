import { LyraContractId } from '../constants/contracts';
import getLyraContract from './getLyraContract';
export default async function fetchGlobalOwner(lyra) {
    const exchangeAdapter = getLyraContract(lyra, lyra.version, LyraContractId.ExchangeAdapter);
    return await exchangeAdapter.owner();
}
//# sourceMappingURL=fetchGlobalOwner.js.map