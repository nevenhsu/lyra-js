export const MIN_START_TIMESTAMP = 0;
export const MAX_END_TIMESTAMP = 2147483647;
export const SNAPSHOT_RESULT_LIMIT = 1000;
export const TRADE_QUERY_FRAGMENT = `
timestamp
blockNumber
transactionHash
trader
size
isOpen
isBuy
spotPrice
premium
spotPriceFee
optionPriceFee
vegaUtilFee
varianceFee
externalSwapFees
setCollateralTo
newIv
newBaseIv
newSkew
volTraded
isForceClose
isLiquidation
strike {
  strikeId
  strikePrice
}
board {
  expiryTimestamp
}
market {
  name
  id
}
option {
  isCall
}
position {
  positionId
  isLong
  isBaseCollateral
}
`;
export const COLLATERAL_UPDATE_QUERY_FRAGMENT = `
timestamp
trader
blockNumber
transactionHash
amount
isBaseCollateral
spotPrice
strike {
  strikeId
  strikePrice
}
board {
  expiryTimestamp
}
market {
  name
  id
}
option {
  isCall
}
position {
  positionId
  isLong
  isBaseCollateral
}
`;
export const SETTLE_QUERY_FRAGMENT = `
id
blockNumber
profit
size
spotPriceAtExpiry
timestamp
transactionHash
owner
settleAmount
position {
  positionId
  isBaseCollateral
  isLong
  strike {
    strikeId
    strikePrice
  }
  board {
    expiryTimestamp
  }
  market {
    name
    id
    latestSpotPrice
  }
  option {
    isCall
  }
}
`;
export const TRANSFER_QUERY_FRAGMENT = `
  oldOwner
  newOwner
  transactionHash
  blockNumber
  position {
    id
    positionId
  }
`;
export const POSITION_QUERY_FRAGMENT = `
id
positionId
owner
size
isLong
collateral
isBaseCollateral
state
openTimestamp
closeTimestamp
strike {
  strikeId
  strikePrice
}
board {
  boardId
  expiryTimestamp
  spotPriceAtExpiry
}
market {
  name
  id
  latestSpotPrice
}
option {
  isCall
  latestOptionPriceAndGreeks {
    optionPrice
  }
}
trades(orderBy: timestamp, orderDirection: asc) {
  ${TRADE_QUERY_FRAGMENT}
}
collateralUpdates(orderBy: timestamp, orderDirection: asc) {
  ${COLLATERAL_UPDATE_QUERY_FRAGMENT}
}
transfers(orderBy: timestamp, orderDirection: asc) {
  ${TRANSFER_QUERY_FRAGMENT}
}
settle {
  ${SETTLE_QUERY_FRAGMENT}
}
`;
export const MARKET_TOTAL_VALUE_SNAPSHOT_FRAGMENT = `
  id
  period
  timestamp
  tokenPrice
  freeLiquidity
  burnableLiquidity
  usedCollatLiquidity
  pendingDeltaLiquidity
  usedDeltaLiquidity
  NAV
  netOptionValue
  pendingDeposits
  pendingWithdrawals
`;
export const MARKET_GREEKS_SNAPSHOT_FRAGMENT = `
  id
  period
  timestamp
  netDelta
  poolNetDelta
  hedgerNetDelta
  netStdVega
`;
export const MARKET_VOLUME_AND_FEES_SNAPSHOT_FRAGMENT = `
  id
  timestamp
  period
  premiumVolume
  notionalVolume
  totalPremiumVolume
  totalNotionalVolume
  spotPriceFees
  optionPriceFees
  vegaFees
  varianceFees
  deltaCutoffFees
  liquidatorFees
  smLiquidationFees
  lpLiquidationFees
  totalShortPutOpenInterestUSD
  totalShortCallOpenInterestUSD
`;
export const MARKET_PENDING_LIQUIDITY_SNAPSHOT_FRAGMENT = `
  id
  period
  timestamp
  pendingDepositAmount
  pendingWithdrawalAmount
`;
export const SPOT_PRICE_SNAPSHOT_FRAGMENT = `
  timestamp
  spotPrice
  open
  high
  low
  close
  blockNumber
  period
`;
export const LONG_OPTION_FRAGMENT = `
  option {
    id
    isCall
    optionPriceAndGreeksHistory(
      first: 1000,
      orderBy: timestamp,
      orderDirection: desc,
      where: {
        timestamp_gte: $startTimestamp,
        period_gte: $period
      }
    ) {
      id
      timestamp
      optionPrice
    }
  }
  id
  openTimestamp
  closeTimestamp
  size
  collateral
  trades(
    first: 1000,
    orderBy: timestamp,
    orderDirection: desc,
  ) {
    timestamp
    isBuy
    size
    premium
    blockNumber
    transactionHash
    collateralUpdate {
      timestamp
      amount
    }
  }
`;
export const SHORT_OPTION_FRAGMENT = `
  ${LONG_OPTION_FRAGMENT}
  collateralUpdates(
    first: 1000,
    orderBy: timestamp,
    orderDirection: desc,
  ) {
    id
    timestamp
    amount
  }
`;
export const OPTION_PRICE_AND_GREEKS_SNAPSHOT_FRAGMENT = `
  timestamp
  blockTimestamp
  optionPrice
  id
  blockNumber
  option {
    id
  }
`;
export const OPTION_VOLUME_FRAGMENT = `
  notionalVolume
  premiumVolume
  timestamp
`;
export const STRIKE_IV_AND_GREEKS_SNAPSHOT_FRAGMENT = `
  timestamp
  iv
`;
export const LIQUIDITY_DEPOSIT_FRAGMENT = `
  pool {
    market {
      id
    }
    cbEvents(first:1, orderBy:cbTimestamp, orderDirection:desc) {
      cbTimestamp
      ivVarianceCrossed
      skewVarianceCrossed
      liquidityVarianceCrossed
    }
  }
  user
  pendingDepositsAndWithdrawals(where: {
    isDeposit: true
  }) {
    id
    queueID
    pendingAmount
    processedAmount
    timestamp
    transactionHash
  }
  depositsAndWithdrawals(where: {
    isDeposit: true
  }) {
    id
    queueID
    quoteAmount
    tokenAmount
    tokenPrice
    timestamp
    transactionHash
  }
`;
export const LIQUIDITY_WITHDRAWAL_FRAGMENT = `
  pool {
    market {
      id
    }
  }
  user
  pendingDepositsAndWithdrawals(where: {
    isDeposit: false
  }) {
    id
    queueID
    pendingAmount
    processedAmount
    timestamp
    transactionHash
  }
  depositsAndWithdrawals(where: {
    isDeposit: false
  }) {
    id
    queueID
    quoteAmount
    tokenAmount
    tokenPrice
    timestamp
    transactionHash
  }
`;
export const CLAIM_ADDED_FRAGMENT = `
  amount
  blockNumber
  claimer
  epochTimestamp
  rewardToken
  tag
  timestamp
`;
export const CLAIM_FRAGMENT = `
  amount
  blockNumber
  claimer
  rewardToken
  timestamp
`;
export const CIRCUIT_BREAKER_FRAGMENT = `
  cbTimestamp
  ivVarianceCrossed
  skewVarianceCrossed
  liquidityVarianceCrossed
`;
export var SnapshotPeriod;
(function (SnapshotPeriod) {
    SnapshotPeriod[SnapshotPeriod["FifteenMinutes"] = 900] = "FifteenMinutes";
    SnapshotPeriod[SnapshotPeriod["OneHour"] = 3600] = "OneHour";
    SnapshotPeriod[SnapshotPeriod["FourHours"] = 14400] = "FourHours";
    SnapshotPeriod[SnapshotPeriod["EightHours"] = 28800] = "EightHours";
    SnapshotPeriod[SnapshotPeriod["OneDay"] = 86400] = "OneDay";
    SnapshotPeriod[SnapshotPeriod["SevenDays"] = 604800] = "SevenDays";
})(SnapshotPeriod || (SnapshotPeriod = {}));
//# sourceMappingURL=queries.js.map