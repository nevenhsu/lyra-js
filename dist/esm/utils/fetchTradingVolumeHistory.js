import { gql } from '@apollo/client/core';
import { BigNumber } from '@ethersproject/bignumber';
import { ZERO_BN } from '../constants/bn';
import { MARKET_VOLUME_AND_FEES_SNAPSHOT_FRAGMENT } from '../constants/queries';
import fetchSnapshots from './fetchSnapshots';
const marketVolumeAndFeesSnapshotsQuery = gql `
  query marketVolumeAndFeesSnapshots(
    $market: String!, $min: Int!, $max: Int!, $period: Int!
  ) {
    marketVolumeAndFeesSnapshots(first: 1000, orderBy: timestamp, orderDirection: asc, where: {
      market: $market, 
      timestamp_gte: $min, 
      timestamp_lte: $max, 
      period: $period
    }) {
      ${MARKET_VOLUME_AND_FEES_SNAPSHOT_FRAGMENT}
    }
  }
`;
const EMPTY = {
    premiumVolume: ZERO_BN,
    notionalVolume: ZERO_BN,
    totalShortOpenInterestUSD: ZERO_BN,
    vaultFees: ZERO_BN,
    vaultFeeComponents: {
        spotPriceFees: ZERO_BN,
        optionPriceFees: ZERO_BN,
        vegaUtilFees: ZERO_BN,
        varianceFees: ZERO_BN,
        forceCloseFees: ZERO_BN,
        liquidationFees: ZERO_BN,
    },
    totalPremiumVolume: ZERO_BN,
    totalNotionalVolume: ZERO_BN,
    liquidatorFees: ZERO_BN,
    smLiquidationFees: ZERO_BN,
};
export default async function fetchTradingVolumeHistory(lyra, market, options) {
    var _a;
    const endTimestamp = (_a = options === null || options === void 0 ? void 0 : options.endTimestamp) !== null && _a !== void 0 ? _a : market.block.timestamp;
    const data = await fetchSnapshots(lyra, marketVolumeAndFeesSnapshotsQuery, {
        market: market.address.toLowerCase(),
    }, {
        ...options,
        endTimestamp,
    });
    if (data.length === 0) {
        // Always return at least 1 snapshot
        return [{ ...EMPTY, startTimestamp: market.block.timestamp, endTimestamp: market.block.timestamp }];
    }
    return data.map((marketVolumeAndFeesSnapshot) => {
        const spotPriceFees = BigNumber.from(marketVolumeAndFeesSnapshot.spotPriceFees);
        const optionPriceFees = BigNumber.from(marketVolumeAndFeesSnapshot.optionPriceFees);
        const vegaUtilFees = BigNumber.from(marketVolumeAndFeesSnapshot.vegaFees);
        const varianceFees = BigNumber.from(marketVolumeAndFeesSnapshot.varianceFees);
        const forceCloseFees = BigNumber.from(marketVolumeAndFeesSnapshot.deltaCutoffFees);
        const liquidationFees = BigNumber.from(marketVolumeAndFeesSnapshot.lpLiquidationFees);
        const totalShortPutOpenInterestUSD = BigNumber.from(marketVolumeAndFeesSnapshot.totalShortPutOpenInterestUSD);
        const totalShortCallOpenInterestUSD = BigNumber.from(marketVolumeAndFeesSnapshot.totalShortCallOpenInterestUSD);
        return {
            premiumVolume: BigNumber.from(marketVolumeAndFeesSnapshot.premiumVolume),
            notionalVolume: BigNumber.from(marketVolumeAndFeesSnapshot.notionalVolume),
            totalShortOpenInterestUSD: totalShortCallOpenInterestUSD.add(totalShortPutOpenInterestUSD),
            vaultFees: spotPriceFees
                .add(optionPriceFees)
                .add(vegaUtilFees)
                .add(varianceFees)
                .add(forceCloseFees)
                .add(liquidationFees),
            vaultFeeComponents: {
                spotPriceFees,
                optionPriceFees,
                vegaUtilFees,
                varianceFees,
                forceCloseFees,
                liquidationFees,
            },
            totalPremiumVolume: BigNumber.from(marketVolumeAndFeesSnapshot.totalPremiumVolume),
            totalNotionalVolume: BigNumber.from(marketVolumeAndFeesSnapshot.totalNotionalVolume),
            liquidatorFees: BigNumber.from(marketVolumeAndFeesSnapshot.liquidatorFees),
            smLiquidationFees: BigNumber.from(marketVolumeAndFeesSnapshot.smLiquidationFees),
            startTimestamp: marketVolumeAndFeesSnapshot.timestamp - marketVolumeAndFeesSnapshot.period,
            endTimestamp: marketVolumeAndFeesSnapshot.timestamp,
        };
    });
}
//# sourceMappingURL=fetchTradingVolumeHistory.js.map