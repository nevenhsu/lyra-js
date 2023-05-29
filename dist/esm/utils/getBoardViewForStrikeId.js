import { LyraContractId } from '../constants/contracts';
import getLyraContract from './getLyraContract';
export default async function getBoardViewForStrikeId(lyra, marketAddressOrName, strikeId) {
    const viewer = getLyraContract(lyra, lyra.version, LyraContractId.OptionMarketViewer);
    return await viewer.getBoardForStrikeId(marketAddressOrName, strikeId);
}
//# sourceMappingURL=getBoardViewForStrikeId.js.map