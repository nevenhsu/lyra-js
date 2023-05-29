import { gql } from '@apollo/client/core';
import { COLLATERAL_UPDATE_QUERY_FRAGMENT, SETTLE_QUERY_FRAGMENT, TRADE_QUERY_FRAGMENT, TRANSFER_QUERY_FRAGMENT, } from '../constants/queries';
import getCollateralUpdateDataFromSubgraph from './getCollateralUpdateDataFromSubgraph';
import getSettleDataFromSubgraph from './getSettleDataFromSubgraph';
import getTradeDataFromSubgraph from './getTradeDataFromSubgraph';
import getTransferDataFromSubgraph from './getTransferDataFromSubgraph';
import subgraphRequest from './subgraphRequest';
// TODO: @dappbeast Handle more than 1k trade queries
const positionEventsQuery = gql `
  query positionEvents($positionIds: [String!]!) {
    trades(first: 1000, orderBy: timestamp, orderDirection: asc, where: { position_in: $positionIds }) {
      ${TRADE_QUERY_FRAGMENT}
    }
    collateralUpdates(first: 1000, orderBy: timestamp, orderDirection: asc, where: { position_in: $positionIds }) {
      ${COLLATERAL_UPDATE_QUERY_FRAGMENT}
    }
    settles(first: 1000, orderBy: timestamp, orderDirection: asc, where: { position_in: $positionIds }) {
      ${SETTLE_QUERY_FRAGMENT}
    }
    optionTransfers(first: 1000, orderBy: timestamp, orderDirection: asc, where: { position_in: $positionIds }) {
      ${TRANSFER_QUERY_FRAGMENT}
    }
  }
`;
export default async function fetchPositionEventDataByIDs(lyra, positionIds) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const subgraphData = await subgraphRequest(lyra.subgraphClient, {
        query: positionEventsQuery,
        variables: {
            positionIds: positionIds.map(({ positionId, marketAddress }) => `${marketAddress.toLowerCase()}-${positionId}`),
        },
    });
    const eventsByMarketByPositionID = positionIds.reduce((dict, { positionId, marketAddress }) => ({
        ...dict,
        [marketAddress]: {
            [positionId]: { trades: [], collateralUpdates: [], transfers: [], settle: null },
            ...dict[marketAddress],
        },
    }), {});
    // Initialise with subgraph values
    const trades = (_b = (_a = subgraphData.data) === null || _a === void 0 ? void 0 : _a.trades.map(getTradeDataFromSubgraph)) !== null && _b !== void 0 ? _b : [];
    const collateralUpdates = (_d = (_c = subgraphData.data) === null || _c === void 0 ? void 0 : _c.collateralUpdates.map(getCollateralUpdateDataFromSubgraph)) !== null && _d !== void 0 ? _d : [];
    const transfers = (_f = (_e = subgraphData.data) === null || _e === void 0 ? void 0 : _e.optionTransfers.map(getTransferDataFromSubgraph)) !== null && _f !== void 0 ? _f : [];
    const settles = (_h = (_g = subgraphData.data) === null || _g === void 0 ? void 0 : _g.settles.map(getSettleDataFromSubgraph)) !== null && _h !== void 0 ? _h : [];
    trades.forEach(trade => {
        eventsByMarketByPositionID[trade.marketAddress][trade.positionId].trades.push(trade);
    });
    collateralUpdates.forEach(collateralUpdate => {
        eventsByMarketByPositionID[collateralUpdate.marketAddress][collateralUpdate.positionId].collateralUpdates.push(collateralUpdate);
    });
    transfers.forEach(transfer => {
        eventsByMarketByPositionID[transfer.marketAddress][transfer.positionId].transfers.push(transfer);
    });
    settles.forEach(settle => {
        eventsByMarketByPositionID[settle.marketAddress][settle.positionId].settle = settle;
    });
    return eventsByMarketByPositionID;
}
//# sourceMappingURL=fetchPositionEventDataByIDs.js.map