import { gql } from '@apollo/client/core';
import { BigNumber } from '@ethersproject/bignumber';
import { OPTION_PRICE_AND_GREEKS_SNAPSHOT_FRAGMENT, } from '../constants/queries';
import fetchSnapshots from './fetchSnapshots';
const optionPriceAndGreeksSnapshotsQuery = gql `
  query optionPriceAndGreeksSnapshots($optionId: String!, $min: Int!, $max: Int!, $period: Int!) {
    optionPriceAndGreeksSnapshots(
      first: 1000
      orderBy: timestamp
      orderDirection: asc
      where: { option: $optionId, timestamp_gte: $min, timestamp_lte: $max, period_gte: $period }
    ) {
      ${OPTION_PRICE_AND_GREEKS_SNAPSHOT_FRAGMENT}
    }
  }
`;
export default async function fetchOptionPriceHistory(lyra, option, options) {
    var _a;
    const board = option.board();
    const blockTimestamp = option.block.timestamp;
    const endTimestamp = Math.min(board.expiryTimestamp, (_a = options === null || options === void 0 ? void 0 : options.endTimestamp) !== null && _a !== void 0 ? _a : blockTimestamp);
    const data = await fetchSnapshots(lyra, optionPriceAndGreeksSnapshotsQuery, {
        optionId: `${option.market().address.toLowerCase()}-${option.strike().id}-${option.isCall ? 'call' : 'put'}`,
    }, {
        ...options,
        endTimestamp,
    });
    const subgraphSnapshots = data.map((snapshot) => ({
        optionPrice: BigNumber.from(snapshot.optionPrice),
        blockNumber: snapshot.blockNumber,
        timestamp: snapshot.timestamp,
    }));
    const currSnapshot = {
        optionPrice: option.price,
        blockNumber: option.block.number,
        timestamp: endTimestamp,
    };
    return [...subgraphSnapshots, currSnapshot].filter(s => s.optionPrice.gt(0));
}
//# sourceMappingURL=fetchOptionPriceHistory.js.map