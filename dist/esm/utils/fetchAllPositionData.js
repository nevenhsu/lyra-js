import { gql } from '@apollo/client/core';
import { getAddress } from '@ethersproject/address';
import { MAX_END_TIMESTAMP, MIN_START_TIMESTAMP, POSITION_QUERY_FRAGMENT, } from '../constants/queries';
import getCollateralUpdateDataFromSubgraph from './getCollateralUpdateDataFromSubgraph';
import getPositionDataFromSubgraph from './getPositionDataFromSubgraph';
import getSettleDataFromSubgraph from './getSettleDataFromSubgraph';
import getTradeDataFromSubgraph from './getTradeDataFromSubgraph';
import getTransferDataFromSubgraph from './getTransferDataFromSubgraph';
import subgraphRequestWithLoop from './subgraphRequestWithLoop';
const positionsQuery = gql `
  query positions($max: Int!, $min: Int!, $market: String!) {
    positions(first: 1000, orderBy: openTimestamp, orderDirection: asc, where: { 
      positionId_gte: $min, 
      positionId_lte: $max,
      market: $market,
    }) {
      ${POSITION_QUERY_FRAGMENT}
    }
  }
`;
export default async function fetchAllPositionData(lyra, filter) {
    var _a, _b;
    let markets;
    if (filter === null || filter === void 0 ? void 0 : filter.markets) {
        markets = await Promise.all(filter.markets.map(market => lyra.market(market)));
    }
    else {
        markets = await lyra.markets();
    }
    const [data, block] = await Promise.all([
        Promise.all(markets.map(market => {
            var _a, _b, _c;
            const minIds = (_a = filter === null || filter === void 0 ? void 0 : filter.minPositionIds) !== null && _a !== void 0 ? _a : {};
            const minKey = (_b = Object.keys(minIds).find(id => id.toLowerCase() === market.address.toLowerCase() || id.toLowerCase() === market.name.toLowerCase())) !== null && _b !== void 0 ? _b : '';
            const min = (_c = minIds[minKey]) !== null && _c !== void 0 ? _c : 0;
            return subgraphRequestWithLoop(lyra, positionsQuery, { min, max: 0, market: market.address.toLowerCase() }, 'positionId', {
                increment: 1000,
                batch: 15,
            });
        })),
        lyra.provider.getBlock('latest'),
    ]);
    const marketsByAddress = markets.reduce((dict, market) => ({ ...dict, [market.address]: market }), {});
    const minOpenTimestamp = (_a = filter === null || filter === void 0 ? void 0 : filter.minOpenTimestamp) !== null && _a !== void 0 ? _a : MIN_START_TIMESTAMP;
    const maxCloseTimestamp = (_b = filter === null || filter === void 0 ? void 0 : filter.maxCloseTimestamp) !== null && _b !== void 0 ? _b : MAX_END_TIMESTAMP;
    const positions = data
        .flat()
        .filter(pos => {
        // Ignore any positions opened before min open timestamp
        if (pos.openTimestamp < minOpenTimestamp) {
            return false;
        }
        // After the close timestamp, ignore any open positions
        if (block.timestamp > maxCloseTimestamp && !pos.closeTimestamp) {
            return false;
        }
        // Ignore any positions closed after max close timestamp
        if (pos.closeTimestamp > maxCloseTimestamp) {
            return false;
        }
        return true;
    })
        .map(pos => {
        const trades = pos.trades.map(getTradeDataFromSubgraph);
        const collateralUpdates = pos.collateralUpdates.map(getCollateralUpdateDataFromSubgraph);
        const transfers = pos.transfers.map(getTransferDataFromSubgraph);
        const settle = pos.settle ? getSettleDataFromSubgraph(pos.settle) : null;
        const market = marketsByAddress[getAddress(pos.market.id)];
        // Ignore liquidation price binary search
        return getPositionDataFromSubgraph(pos, market, trades, collateralUpdates, transfers, settle, true);
    });
    return positions;
}
//# sourceMappingURL=fetchAllPositionData.js.map