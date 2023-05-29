import { LyraMarketContractId, POSITION_UPDATED_TYPES } from '../constants/contracts';
import { Version } from '../lyra';
import filterNulls from './filterNulls';
import getCollateralUpdateDataFromRecentEvent from './getCollateralUpdateDataFromRecentEvent';
import getLyraMarketContract from './getLyraMarketContract';
import getTradeDataFromRecentEvent from './getTradeDataFromRecentEvent';
const BLOCK_LIMIT = 100;
const getTransferKey = (txHash, positionId) => `${txHash}-${positionId}`;
export default async function fetchRecentPositionEventsByIDs(lyra, market, positionIds) {
    if (positionIds.length === 0) {
        return [];
    }
    // Approximately last 1 min of events
    const toBlockNumber = (await lyra.provider.getBlock('latest')).number;
    const fromBlockNumber = toBlockNumber - BLOCK_LIMIT;
    const tokenContract = getLyraMarketContract(lyra, market.contractAddresses, lyra.version, LyraMarketContractId.OptionToken);
    const queryTradeFilter = async () => {
        if (lyra.version === Version.Avalon) {
            const avalonMarketContract = getLyraMarketContract(lyra, market.contractAddresses, Version.Avalon, LyraMarketContractId.OptionMarket);
            const avalonTradeFilter = avalonMarketContract.queryFilter(avalonMarketContract.filters.Trade(null, null, positionIds), fromBlockNumber, toBlockNumber);
            return avalonTradeFilter;
        }
        else {
            const newportMarketContract = getLyraMarketContract(lyra, market.contractAddresses, Version.Newport, LyraMarketContractId.OptionMarket);
            const newportTradeFilter = newportMarketContract.queryFilter(newportMarketContract.filters.Trade(null, positionIds), fromBlockNumber, toBlockNumber);
            return newportTradeFilter;
        }
    };
    const [tradeEvents, updateEvents, transferEvents] = await Promise.all([
        queryTradeFilter(),
        tokenContract.queryFilter(tokenContract.filters.PositionUpdated(positionIds, null, POSITION_UPDATED_TYPES), fromBlockNumber, toBlockNumber),
        tokenContract.queryFilter(tokenContract.filters.Transfer(null, null, positionIds), fromBlockNumber, toBlockNumber),
    ]);
    const transfersByIdAndHash = transferEvents.reduce((dict, transfer) => {
        var _a;
        const key = getTransferKey(transfer.transactionHash, transfer.args.tokenId.toNumber());
        return {
            ...dict,
            [key]: [...((_a = dict[key]) !== null && _a !== void 0 ? _a : []), transfer],
        };
    }, {});
    const eventsByPositionID = positionIds.reduce((dict, positionId) => ({
        ...dict,
        [positionId]: { trades: [], collateralUpdates: [] },
    }), {});
    const trades = filterNulls(tradeEvents.map(tradeEvent => {
        try {
            const transfers = transfersByIdAndHash[getTransferKey(tradeEvent.transactionHash, tradeEvent.args.positionId.toNumber())];
            return getTradeDataFromRecentEvent(tradeEvent, market, transfers);
        }
        catch (e) {
            return null;
        }
    }));
    const collateralUpdates = filterNulls(updateEvents.map(updateEvent => {
        try {
            const transfers = transfersByIdAndHash[getTransferKey(updateEvent.transactionHash, updateEvent.args.positionId.toNumber())];
            return getCollateralUpdateDataFromRecentEvent(updateEvent, market, transfers);
        }
        catch (e) {
            return null;
        }
    }));
    trades.forEach(trade => {
        eventsByPositionID[trade.positionId].trades.push(trade);
    });
    collateralUpdates.forEach(update => {
        eventsByPositionID[update.positionId].collateralUpdates.push(update);
    });
    return eventsByPositionID;
}
//# sourceMappingURL=fetchRecentPositionEventsByIDs.js.map