import { gql } from '@apollo/client/core';
import { BigNumber } from '@ethersproject/bignumber';
import { STRIKE_IV_AND_GREEKS_SNAPSHOT_FRAGMENT } from '../constants/queries';
import fetchSnapshots from './fetchSnapshots';
import fromBigNumber from './fromBigNumber';
import groupTimeSnapshots from './groupTimeSnapshots';
const strikeIVAndGreeksSnapshotsQuery = gql `
  query strikeIVAndGreeksSnapshots($strikeId: String!, $min: Int!, $max: Int!, $period: Int!) {
    strikeIVAndGreeksSnapshots(
      first: 1000
      orderBy: timestamp
      orderDirection: asc
      where: { strike: $strikeId, timestamp_gte: $min, timestamp_lte: $max, period_gte: $period }
    ) {
      ${STRIKE_IV_AND_GREEKS_SNAPSHOT_FRAGMENT}
    }
  }
`;
export default async function fetchStrikeIVHistory(lyra, strike, options) {
    var _a;
    const board = strike.board();
    const blockTimestamp = strike.block.timestamp;
    const endTimestamp = Math.min(board.expiryTimestamp, (_a = options === null || options === void 0 ? void 0 : options.endTimestamp) !== null && _a !== void 0 ? _a : blockTimestamp);
    const strikeId = `${strike.market().address.toLowerCase()}-${strike.id}`;
    const data = await fetchSnapshots(lyra, strikeIVAndGreeksSnapshotsQuery, {
        strikeId: strikeId,
    }, {
        ...options,
        endTimestamp,
    });
    const snapshots = groupTimeSnapshots(data.map(snapshot => ({
        iv: fromBigNumber(BigNumber.from(snapshot.iv)),
        timestamp: snapshot.timestamp,
    })), data[0].timestamp, endTimestamp);
    const currSnapshot = { iv: fromBigNumber(strike.iv), timestamp: strike.block.timestamp };
    return [...snapshots, currSnapshot].filter(s => s.iv > 0);
}
//# sourceMappingURL=fetchStrikeIVHistory.js.map