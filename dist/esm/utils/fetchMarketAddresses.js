import { LyraContractId } from '../constants/contracts';
import getLyraContract from './getLyraContract';
export default async function fetchMarketAddresses(lyra) {
    const viewer = await getLyraContract(lyra, lyra.version, LyraContractId.OptionMarketViewer);
    return await viewer.getMarketAddresses();
}
//# sourceMappingURL=fetchMarketAddresses.js.map