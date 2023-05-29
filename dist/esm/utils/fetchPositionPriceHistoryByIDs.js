import { gql } from '@apollo/client/core';
import { BigNumber } from '@ethersproject/bignumber';
import { OPTION_PRICE_AND_GREEKS_SNAPSHOT_FRAGMENT, } from '../constants/queries';
import fetchSnapshots from './fetchSnapshots';
const optionPriceAndGreeksSnapshotsQuery = gql `
  query optionPriceAndGreeksSnapshots($optionIds: [String!]!, $min: Int!, $max: Int!, $period: Int!) {
    optionPriceAndGreeksSnapshots(
      first: 1000
      orderBy: timestamp
      orderDirection: asc
      where: { option_in: $optionIds, timestamp_gte: $min, timestamp_lte: $max, period_gte: $period }
    ) {
      ${OPTION_PRICE_AND_GREEKS_SNAPSHOT_FRAGMENT}
    }
  }
`;
export default async function fetchPositionPriceHistoryByIDs(lyra, positions, snapshotOptions) {
    const optionIdByPositionId = positions.reduce((dict, { id, marketAddress, strikeId, isCall }) => ({
        ...dict,
        [id]: `${marketAddress.toLowerCase()}-${strikeId}-${isCall ? 'call' : 'put'}`,
    }), {});
    const optionIds = Array.from(new Set(Object.values(optionIdByPositionId)));
    const data = await fetchSnapshots(lyra, optionPriceAndGreeksSnapshotsQuery, {
        optionIds,
    }, snapshotOptions);
    const pricesByOptionId = data.reduce((dict, snapshot) => {
        var _a;
        const prices = (_a = dict[snapshot.option.id]) !== null && _a !== void 0 ? _a : [];
        prices.push({
            optionPrice: BigNumber.from(snapshot.optionPrice),
            timestamp: snapshot.blockTimestamp,
            blockNumber: snapshot.blockNumber,
        });
        return {
            ...dict,
            [snapshot.option.id]: prices,
        };
    }, {});
    const pricesByPositionId = Object.entries(optionIdByPositionId).reduce((dict, [positionId, optionId]) => ({
        ...dict,
        [positionId]: pricesByOptionId[optionId],
    }), {});
    return pricesByPositionId;
}
//# sourceMappingURL=fetchPositionPriceHistoryByIDs.js.map