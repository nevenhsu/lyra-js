import { LyraContractId } from '../constants/contracts';
import fetchPositionEventDataByIDs from './fetchPositionEventDataByIDs';
import filterNulls from './filterNulls';
import getIsCall from './getIsCall';
import getLyraContract from './getLyraContract';
import getOpenPositionDataFromStruct from './getOpenPositionDataFromStruct';
export default async function fetchOpenPositionDataByOwner(lyra, owner, markets) {
    // Fetch all owner positions across all markets
    const positionsByMarketAddress = await getLyraContract(lyra, lyra.version, LyraContractId.OptionMarketViewer).getOwnerPositions(owner);
    const marketsByAddress = markets.reduce((dict, market) => ({ ...dict, [market.address]: market }), {});
    const positionStructsByMarket = positionsByMarketAddress.map(({ positions: positionStructs, market: marketAddress }) => ({
        positionStructs,
        market: marketsByAddress[marketAddress],
    }));
    const positions = (await Promise.all(positionStructsByMarket.map(async ({ market, positionStructs }) => {
        const positionIds = positionStructs.map(p => p.positionId.toNumber());
        const eventsByPositionID = await fetchPositionEventDataByIDs(lyra, market, positionIds);
        const positions = filterNulls(positionStructs.map(positionStruct => {
            const positionId = positionStruct.positionId.toNumber();
            const strikeId = positionStruct.strikeId.toNumber();
            const isCall = getIsCall(positionStruct.optionType);
            const { trades, collateralUpdates, transfers, settle } = eventsByPositionID[positionId];
            let option;
            try {
                option = market.liveOption(strikeId, isCall);
            }
            catch (_error) {
                return null;
            }
            return getOpenPositionDataFromStruct(owner, positionStruct, option, trades, collateralUpdates, transfers, settle);
        }));
        return positions;
    }))).flat();
    return positions;
}
//# sourceMappingURL=fetchOpenPositionDataByOwner.js.map