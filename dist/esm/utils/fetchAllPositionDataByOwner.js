import { gql } from '@apollo/client/core';
import { getAddress } from '@ethersproject/address';
import { POSITION_QUERY_FRAGMENT } from '../constants/queries';
import filterNulls from './filterNulls';
import getCollateralUpdateDataFromSubgraph from './getCollateralUpdateDataFromSubgraph';
import getPositionDataFromSubgraph from './getPositionDataFromSubgraph';
import getSettleDataFromSubgraph from './getSettleDataFromSubgraph';
import getTradeDataFromSubgraph from './getTradeDataFromSubgraph';
import getTransferDataFromSubgraph from './getTransferDataFromSubgraph';
import getUniqueBy from './getUniqueBy';
import subgraphRequest from './subgraphRequest';
// TODO: @dappbeast Handle more than 1k position queries
const positionsQuery = gql `
  query positions($owner: String) {
    # Get all positions that have been transferred to $owner
    optionTransfers(first: 1000, where:{newOwner: $owner}) {
      position {
        ${POSITION_QUERY_FRAGMENT}
      }
    }
    # Get all positions that have been traded by $owner
    # This covers any positions a trader opened as well as collateral updates
    trades(first: 1000, where:{trader:$owner}) {
      position {
        ${POSITION_QUERY_FRAGMENT}
      }
    }
  }
`;
export default async function fetchAllPositionDataByOwner(lyra, owner) {
    var _a, _b;
    const [{ data }, markets] = await Promise.all([
        subgraphRequest(lyra.subgraphClient, {
            query: positionsQuery,
            variables: {
                owner: owner.toLowerCase(),
            },
        }),
        lyra.markets(),
    ]);
    const transferPositions = (_a = data === null || data === void 0 ? void 0 : data.optionTransfers.map(t => t.position)) !== null && _a !== void 0 ? _a : [];
    const tradedPositions = (_b = data === null || data === void 0 ? void 0 : data.trades.map(t => t.position)) !== null && _b !== void 0 ? _b : [];
    const positions = getUniqueBy(tradedPositions.concat(transferPositions), p => p.id);
    const marketsByAddress = markets.reduce((dict, market) => ({ ...dict, [market.address]: market }), {});
    return filterNulls(positions.map(pos => {
        const market = marketsByAddress[getAddress(pos.market.id)];
        if (!market) {
            // Handle positions from previous versions
            return null;
        }
        const trades = pos.trades.map(getTradeDataFromSubgraph);
        const collateralUpdates = pos.collateralUpdates.map(getCollateralUpdateDataFromSubgraph);
        const transfers = pos.transfers.map(getTransferDataFromSubgraph);
        const settle = pos.settle ? getSettleDataFromSubgraph(pos.settle) : null;
        return getPositionDataFromSubgraph(pos, market, trades, collateralUpdates, transfers, settle);
    }));
}
//# sourceMappingURL=fetchAllPositionDataByOwner.js.map