import { gql } from '@apollo/client/core';
import { LyraMarketContractId } from '../constants/contracts';
import { POSITION_QUERY_FRAGMENT } from '../constants/queries';
import getCollateralUpdateDataFromSubgraph from './getCollateralUpdateDataFromSubgraph';
import getIsCall from './getIsCall';
import getLyraMarketContract from './getLyraMarketContract';
import getOpenPositionDataFromStruct from './getOpenPositionDataFromStruct';
import getPositionDataFromSubgraph from './getPositionDataFromSubgraph';
import getSettleDataFromSubgraph from './getSettleDataFromSubgraph';
import getTradeDataFromSubgraph from './getTradeDataFromSubgraph';
import getTransferDataFromSubgraph from './getTransferDataFromSubgraph';
import subgraphRequest from './subgraphRequest';
const positionsQuery = gql `
  query positions($positionId: Int!, $market: String!) {
    positions(first: 1, orderBy: openTimestamp, orderDirection: asc, where: { 
      positionId: $positionId, 
      market: $market,
    }) {
      ${POSITION_QUERY_FRAGMENT}
    }
  }
`;
export default async function fetchPositionDataByID(lyra, market, positionId) {
    var _a, _b, _c, _d;
    const optionToken = getLyraMarketContract(lyra, market.contractAddresses, lyra.version, LyraMarketContractId.OptionToken);
    const [structPromise, subgraphPromise] = await Promise.allSettled([
        optionToken.getPositionWithOwner(positionId),
        subgraphRequest(lyra.subgraphClient, {
            query: positionsQuery,
            variables: {
                positionId,
                market: market.address.toLowerCase(),
            },
        }),
    ]);
    const openPositionStruct = structPromise.status === 'fulfilled' ? structPromise.value : null;
    const subgraphData = subgraphPromise.status === 'fulfilled' ? subgraphPromise.value : null;
    // Subgraph may not have synced trade event
    const subgraphPositionData = (_a = subgraphData === null || subgraphData === void 0 ? void 0 : subgraphData.data) === null || _a === void 0 ? void 0 : _a.positions[0];
    const trades = (_b = subgraphPositionData === null || subgraphPositionData === void 0 ? void 0 : subgraphPositionData.trades.map(getTradeDataFromSubgraph)) !== null && _b !== void 0 ? _b : [];
    const collateralUpdates = (_c = subgraphPositionData === null || subgraphPositionData === void 0 ? void 0 : subgraphPositionData.collateralUpdates.map(getCollateralUpdateDataFromSubgraph)) !== null && _c !== void 0 ? _c : [];
    const transfers = (_d = subgraphPositionData === null || subgraphPositionData === void 0 ? void 0 : subgraphPositionData.transfers.map(getTransferDataFromSubgraph)) !== null && _d !== void 0 ? _d : [];
    const settle = (subgraphPositionData === null || subgraphPositionData === void 0 ? void 0 : subgraphPositionData.settle) ? getSettleDataFromSubgraph(subgraphPositionData.settle) : null;
    if (openPositionStruct) {
        const strikeId = openPositionStruct.strikeId.toNumber();
        const isCall = getIsCall(openPositionStruct.optionType);
        const option = market.liveOption(strikeId, isCall);
        return getOpenPositionDataFromStruct(openPositionStruct.owner, openPositionStruct, option, trades, collateralUpdates, transfers, settle);
    }
    else if (subgraphPositionData) {
        return getPositionDataFromSubgraph(subgraphPositionData, market, trades, collateralUpdates, transfers, settle);
    }
    else {
        // Should never happen
        // An open position should always have state and closed position should always have subgraph data
        throw new Error('Failed to fetch position');
    }
}
//# sourceMappingURL=fetchPositionDataByID.js.map