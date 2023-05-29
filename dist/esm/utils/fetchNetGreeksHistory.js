import { gql } from '@apollo/client/core';
import { BigNumber } from '@ethersproject/bignumber';
import { ZERO_BN } from '../constants/bn';
import { MARKET_GREEKS_SNAPSHOT_FRAGMENT, SNAPSHOT_RESULT_LIMIT, } from '../constants/queries';
import fetchSnapshots from './fetchSnapshots';
const marketGreeksSnapshotsQuery = gql `
  query marketGreeksSnapshots(
    $market: String!, $min: Int!, $max: Int! $period: Int!,
  ) {
    marketGreeksSnapshots(first: ${SNAPSHOT_RESULT_LIMIT}, orderBy: timestamp, orderDirection: asc, where: { market: $market, 
      timestamp_gte: $min,
      timestamp_lte: $max,
      period_gte: $period
    }) {
      ${MARKET_GREEKS_SNAPSHOT_FRAGMENT}
    }
  }
`;
const EMPTY = {
    poolNetDelta: ZERO_BN,
    hedgerNetDelta: ZERO_BN,
    netDelta: ZERO_BN,
    netStdVega: ZERO_BN,
};
export default async function fetchNetGreeksHistory(lyra, market, options) {
    var _a;
    const data = await fetchSnapshots(lyra, marketGreeksSnapshotsQuery, {
        market: market.address.toLowerCase(),
    }, {
        ...options,
        endTimestamp: (_a = options === null || options === void 0 ? void 0 : options.endTimestamp) !== null && _a !== void 0 ? _a : market.block.timestamp,
    });
    if (data.length === 0) {
        // Always return at least 1 snapshot
        return [{ ...EMPTY, timestamp: market.block.timestamp }];
    }
    return data.map(marketGreeksSnapshot => {
        const poolNetDelta = BigNumber.from(marketGreeksSnapshot.poolNetDelta);
        const hedgerNetDelta = BigNumber.from(marketGreeksSnapshot.hedgerNetDelta);
        const netDelta = BigNumber.from(marketGreeksSnapshot.netDelta);
        const netStdVega = BigNumber.from(marketGreeksSnapshot.netStdVega);
        return {
            poolNetDelta,
            hedgerNetDelta,
            netDelta,
            netStdVega,
            timestamp: marketGreeksSnapshot.timestamp,
        };
    });
}
//# sourceMappingURL=fetchNetGreeksHistory.js.map