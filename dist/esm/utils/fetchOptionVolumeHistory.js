import { gql } from '@apollo/client/core';
import { BigNumber } from '@ethersproject/bignumber';
import { MAX_END_TIMESTAMP, OPTION_VOLUME_FRAGMENT, SnapshotPeriod, } from '../constants/queries';
import fetchSnapshots from './fetchSnapshots';
const optionVolumeQuery = gql `
  query optionVolumeQuery($optionId: String!, $min: Int!, $max: Int!, $period: Int!) {
    optionVolumeSnapshots(
      first: 1000
      orderBy: timestamp
      orderDirection: asc
      where: { option: $optionId, timestamp_gte: $min, timestamp_lte: $max, period: $period }
    ) {
      ${OPTION_VOLUME_FRAGMENT}
    }
  }
`;
export default async function fetchOptionVolumeHistory(lyra, option, options) {
    var _a;
    const board = option.board();
    const endTimestamp = Math.min(board.expiryTimestamp, (_a = options === null || options === void 0 ? void 0 : options.endTimestamp) !== null && _a !== void 0 ? _a : MAX_END_TIMESTAMP);
    const optionId = `${option.market().address.toLowerCase()}-${option.strike().id}-${option.isCall ? 'call' : 'put'}`;
    const data = await fetchSnapshots(lyra, optionVolumeQuery, {
        optionId,
    }, {
        ...options,
        period: SnapshotPeriod.OneHour,
        endTimestamp,
    });
    return data.map(snapshot => ({
        notionalVolume: BigNumber.from(snapshot.notionalVolume),
        premiumVolume: BigNumber.from(snapshot.premiumVolume),
        timestamp: snapshot.timestamp,
    }));
}
//# sourceMappingURL=fetchOptionVolumeHistory.js.map