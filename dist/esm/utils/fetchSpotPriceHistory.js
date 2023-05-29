import { gql } from '@apollo/client/core';
import { BigNumber } from '@ethersproject/bignumber';
import { MIN_START_TIMESTAMP, SnapshotPeriod, SPOT_PRICE_SNAPSHOT_FRAGMENT, } from '../constants/queries';
import getSnapshotPeriod from './getSnapshotPeriod';
import subgraphRequestWithLoop from './subgraphRequestWithLoop';
const SPOT_PRICE_SNAPSHOT_LIMIT = 10000;
const spotPriceSnapshotsQuery = gql `
  query spotPriceSnapshots(
    $market: String!, $min: Int!, $max: Int!, $period: Int!, $limit: Int!
  ) {
    spotPriceSnapshots(first: $limit, orderBy: timestamp, orderDirection: asc, where: { 
      market: $market, 
      timestamp_gte: $min, 
      timestamp_lte: $max,
      period: $period 
    }) {
      ${SPOT_PRICE_SNAPSHOT_FRAGMENT}
    }
  }
`;
export default async function fetchSpotPriceHistory(lyra, market, options) {
    var _a, _b, _c;
    const startTimestamp = (_a = options === null || options === void 0 ? void 0 : options.startTimestamp) !== null && _a !== void 0 ? _a : MIN_START_TIMESTAMP;
    const endTimestamp = (_b = options === null || options === void 0 ? void 0 : options.endTimestamp) !== null && _b !== void 0 ? _b : market.block.timestamp;
    const candleDuration = (_c = options === null || options === void 0 ? void 0 : options.period) !== null && _c !== void 0 ? _c : getSnapshotPeriod(startTimestamp, endTimestamp, [
        SnapshotPeriod.FifteenMinutes,
        SnapshotPeriod.OneHour,
        SnapshotPeriod.FourHours,
        SnapshotPeriod.EightHours,
        SnapshotPeriod.OneDay,
        SnapshotPeriod.SevenDays,
    ]);
    const estNumCandles = candleDuration > 0 ? (endTimestamp - startTimestamp) / candleDuration : 0;
    const numBatches = Math.ceil(estNumCandles / SPOT_PRICE_SNAPSHOT_LIMIT);
    const data = await subgraphRequestWithLoop(lyra, spotPriceSnapshotsQuery, {
        min: startTimestamp,
        max: endTimestamp,
        limit: SPOT_PRICE_SNAPSHOT_LIMIT,
        period: candleDuration,
        market: market.address.toLowerCase(),
    }, 'timestamp', {
        increment: SPOT_PRICE_SNAPSHOT_LIMIT * candleDuration,
        batch: numBatches,
    });
    if (data.length === 0) {
        return [];
    }
    const candles = data.map(spotPriceSnapshot => ({
        open: BigNumber.from(spotPriceSnapshot.open),
        high: BigNumber.from(spotPriceSnapshot.high),
        low: BigNumber.from(spotPriceSnapshot.low),
        close: BigNumber.from(spotPriceSnapshot.close),
        startTimestamp: spotPriceSnapshot.timestamp - spotPriceSnapshot.period,
        endTimestamp: spotPriceSnapshot.timestamp,
        period: spotPriceSnapshot.period,
        startBlockNumber: spotPriceSnapshot.blockNumber,
    }));
    const latestCandle = candles.length ? candles[candles.length - 1] : null;
    if (latestCandle && latestCandle.endTimestamp > market.block.number) {
        // Update close
        latestCandle.close = market.spotPrice;
        // Update low
        if (market.spotPrice.lt(latestCandle.low)) {
            latestCandle.low = market.spotPrice;
        }
        // Update high
        if (market.spotPrice.gt(latestCandle.high)) {
            latestCandle.low = market.spotPrice;
        }
    }
    return candles;
}
//# sourceMappingURL=fetchSpotPriceHistory.js.map