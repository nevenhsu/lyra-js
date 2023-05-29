import { gql } from '@apollo/client/core';
import { BigNumber } from '@ethersproject/bignumber';
import { UNIT, ZERO_BN } from '../constants/bn';
import { MARKET_TOTAL_VALUE_SNAPSHOT_FRAGMENT } from '../constants/queries';
import fetchSnapshots from './fetchSnapshots';
import fromBigNumber from './fromBigNumber';
const marketTotalValueSnapshotsQuery = gql `
  query marketTotalValueSnapshots(
    $market: String!, $min: Int!, $max: Int! $period: Int!
  ) {
    marketTotalValueSnapshots(
      first: 1000, orderBy: timestamp, orderDirection: asc, where: { 
        market: $market, 
        NAV_gt: 0
        timestamp_gte: $min, 
        timestamp_lte: $max,
        period: $period 
      }
    ) {
      ${MARKET_TOTAL_VALUE_SNAPSHOT_FRAGMENT}
    }
  }
`;
const EMPTY = {
    freeLiquidity: ZERO_BN,
    burnableLiquidity: ZERO_BN,
    tvl: ZERO_BN,
    utilization: 0,
    reservedCollatLiquidity: ZERO_BN,
    pendingDeltaLiquidity: ZERO_BN,
    usedDeltaLiquidity: ZERO_BN,
    tokenPrice: ZERO_BN,
    pendingDeposits: ZERO_BN,
    pendingWithdrawals: ZERO_BN,
};
export default async function fetchLiquidityHistory(lyra, market, options) {
    var _a;
    const data = await fetchSnapshots(lyra, marketTotalValueSnapshotsQuery, {
        market: market.address.toLowerCase(),
    }, {
        ...options,
        endTimestamp: (_a = options === null || options === void 0 ? void 0 : options.endTimestamp) !== null && _a !== void 0 ? _a : market.block.timestamp,
    });
    if (data.length === 0) {
        // Always return at least 1 snapshot
        return [{ ...EMPTY, market, timestamp: market.block.timestamp }];
    }
    const marketLiquidity = data.map(marketTotalValueSnapshot => {
        const freeLiquidityBN = BigNumber.from(marketTotalValueSnapshot.freeLiquidity);
        const burnableLiquidityBN = BigNumber.from(marketTotalValueSnapshot.burnableLiquidity);
        const tvl = BigNumber.from(marketTotalValueSnapshot.NAV);
        // TODO @michaelxuwu confirm with Paul if this field will be updated with Newport
        const usedCollatLiquidityBN = BigNumber.from(marketTotalValueSnapshot.usedCollatLiquidity);
        const pendingDeltaLiquidityBN = BigNumber.from(marketTotalValueSnapshot.pendingDeltaLiquidity);
        const usedDeltaLiquidityBN = BigNumber.from(marketTotalValueSnapshot.usedDeltaLiquidity);
        const tokenPriceBN = BigNumber.from(marketTotalValueSnapshot.tokenPrice);
        return {
            market,
            freeLiquidity: freeLiquidityBN,
            burnableLiquidity: burnableLiquidityBN,
            tvl,
            utilization: tvl.gt(0) ? fromBigNumber(tvl.sub(freeLiquidityBN).mul(UNIT).div(tvl)) : 0,
            totalWithdrawingDeposits: ZERO_BN,
            reservedCollatLiquidity: usedCollatLiquidityBN,
            pendingDeltaLiquidity: pendingDeltaLiquidityBN,
            usedDeltaLiquidity: usedDeltaLiquidityBN,
            tokenPrice: tokenPriceBN,
            timestamp: marketTotalValueSnapshot.timestamp,
            pendingDeposits: BigNumber.from(marketTotalValueSnapshot.pendingDeposits),
            pendingWithdrawals: BigNumber.from(marketTotalValueSnapshot.pendingWithdrawals),
        };
    });
    return marketLiquidity;
}
//# sourceMappingURL=fetchLiquidityHistory.js.map