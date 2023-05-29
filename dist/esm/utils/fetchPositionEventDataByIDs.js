import { gql } from '@apollo/client/core';
import { COLLATERAL_UPDATE_QUERY_FRAGMENT, SETTLE_QUERY_FRAGMENT, TRADE_QUERY_FRAGMENT, TRANSFER_QUERY_FRAGMENT, } from '../constants/queries';
import fetchRecentPositionEventsByIDs from './fetchRecentPositionEventsByIDs';
import getCollateralUpdateDataFromSubgraph from './getCollateralUpdateDataFromSubgraph';
import getSettleDataFromSubgraph from './getSettleDataFromSubgraph';
import getTradeDataFromSubgraph from './getTradeDataFromSubgraph';
import getTransferDataFromSubgraph from './getTransferDataFromSubgraph';
import getUniqueBy from './getUniqueBy';
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
export default async function fetchPositionEventDataByIDs(lyra, market, positionIds) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const [subgraphData, recentContractEvents] = await Promise.all([
        subgraphRequest(lyra.subgraphClient, {
            query: positionEventsQuery,
            variables: {
                positionIds: positionIds.map(pid => `${market.address.toLowerCase()}-${pid}`),
            },
        }),
        fetchRecentPositionEventsByIDs(lyra, market, positionIds),
    ]);
    const eventsByPositionID = positionIds.reduce((dict, positionId) => ({
        ...dict,
        [positionId]: { trades: [], collateralUpdates: [], transfers: [], settle: null },
    }), {});
    // Initialise with subgraph values
    const trades = (_b = (_a = subgraphData.data) === null || _a === void 0 ? void 0 : _a.trades.map(getTradeDataFromSubgraph)) !== null && _b !== void 0 ? _b : [];
    const collateralUpdates = (_d = (_c = subgraphData.data) === null || _c === void 0 ? void 0 : _c.collateralUpdates.map(getCollateralUpdateDataFromSubgraph)) !== null && _d !== void 0 ? _d : [];
    const transfers = (_f = (_e = subgraphData.data) === null || _e === void 0 ? void 0 : _e.optionTransfers.map(getTransferDataFromSubgraph)) !== null && _f !== void 0 ? _f : [];
    const settles = (_h = (_g = subgraphData.data) === null || _g === void 0 ? void 0 : _g.settles.map(getSettleDataFromSubgraph)) !== null && _h !== void 0 ? _h : [];
    trades.forEach(trade => {
        eventsByPositionID[trade.positionId].trades.push(trade);
    });
    collateralUpdates.forEach(collateralUpdate => {
        eventsByPositionID[collateralUpdate.positionId].collateralUpdates.push(collateralUpdate);
    });
    transfers.forEach(transfer => {
        eventsByPositionID[transfer.positionId].transfers.push(transfer);
    });
    settles.forEach(settle => {
        eventsByPositionID[settle.positionId].settle = settle;
    });
    // Merge recent contract events with subgraph events
    Object.entries(recentContractEvents).map(([key, { trades, collateralUpdates }]) => {
        const positionId = parseInt(key);
        eventsByPositionID[positionId].trades = getUniqueBy(
        // Merge events by tx hash, prefer subgraph events
        [...eventsByPositionID[positionId].trades, ...trades], trade => trade.transactionHash);
        eventsByPositionID[positionId].collateralUpdates = getUniqueBy(
        // Merge events by tx hash, prefer subgraph events
        [...eventsByPositionID[positionId].collateralUpdates, ...collateralUpdates], update => update.transactionHash);
    });
    return eventsByPositionID;
}
//# sourceMappingURL=fetchPositionEventDataByIDs.js.map