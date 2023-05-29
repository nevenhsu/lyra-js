import { PositionState } from './contracts';
export declare const MIN_START_TIMESTAMP = 0;
export declare const MAX_END_TIMESTAMP = 2147483647;
export declare const SNAPSHOT_RESULT_LIMIT = 1000;
export declare const TRADE_QUERY_FRAGMENT = "\ntimestamp\nblockNumber\ntransactionHash\ntrader\nsize\nisOpen\nisBuy\nspotPrice\npremium\nspotPriceFee\noptionPriceFee\nvegaUtilFee\nvarianceFee\nexternalSwapFees\nsetCollateralTo\nnewIv\nnewBaseIv\nnewSkew\nvolTraded\nisForceClose\nisLiquidation\nstrike {\n  strikeId\n  strikePrice\n}\nboard {\n  expiryTimestamp\n}\nmarket {\n  name\n  id\n}\noption {\n  isCall\n}\nposition {\n  positionId\n  isLong\n  isBaseCollateral\n}\n";
export declare const COLLATERAL_UPDATE_QUERY_FRAGMENT = "\ntimestamp\ntrader\nblockNumber\ntransactionHash\namount\nisBaseCollateral\nspotPrice\nstrike {\n  strikeId\n  strikePrice\n}\nboard {\n  expiryTimestamp\n}\nmarket {\n  name\n  id\n}\noption {\n  isCall\n}\nposition {\n  positionId\n  isLong\n  isBaseCollateral\n}\n";
export declare const SETTLE_QUERY_FRAGMENT = "\nid\nblockNumber\nprofit\nsize\nspotPriceAtExpiry\ntimestamp\ntransactionHash\nowner\nsettleAmount\nposition {\n  positionId\n  isBaseCollateral\n  isLong\n  strike {\n    strikeId\n    strikePrice\n  }\n  board {\n    expiryTimestamp\n  }\n  market {\n    name\n    id\n    latestSpotPrice\n  }\n  option {\n    isCall\n  }\n}\n";
export declare const TRANSFER_QUERY_FRAGMENT = "\n  oldOwner\n  newOwner\n  transactionHash\n  blockNumber\n  position {\n    id\n    positionId\n  }\n";
export declare const POSITION_QUERY_FRAGMENT: string;
export type PartialPositionQueryResult = {
    positionId: number;
    isLong: boolean;
    isBaseCollateral: boolean;
};
export declare const MARKET_TOTAL_VALUE_SNAPSHOT_FRAGMENT = "\n  id\n  period\n  timestamp\n  tokenPrice\n  freeLiquidity\n  burnableLiquidity\n  usedCollatLiquidity\n  pendingDeltaLiquidity\n  usedDeltaLiquidity\n  NAV\n  netOptionValue\n  pendingDeposits\n  pendingWithdrawals\n";
export declare const MARKET_GREEKS_SNAPSHOT_FRAGMENT = "\n  id\n  period\n  timestamp\n  netDelta\n  poolNetDelta\n  hedgerNetDelta\n  netStdVega\n";
export declare const MARKET_VOLUME_AND_FEES_SNAPSHOT_FRAGMENT = "\n  id\n  timestamp\n  period\n  premiumVolume\n  notionalVolume\n  totalPremiumVolume\n  totalNotionalVolume\n  spotPriceFees\n  optionPriceFees\n  vegaFees\n  varianceFees\n  deltaCutoffFees\n  liquidatorFees\n  smLiquidationFees\n  lpLiquidationFees\n  totalShortPutOpenInterestUSD\n  totalShortCallOpenInterestUSD\n";
export declare const MARKET_PENDING_LIQUIDITY_SNAPSHOT_FRAGMENT = "\n  id\n  period\n  timestamp\n  pendingDepositAmount\n  pendingWithdrawalAmount\n";
export declare const SPOT_PRICE_SNAPSHOT_FRAGMENT = "\n  timestamp\n  spotPrice\n  open\n  high\n  low\n  close\n  blockNumber\n  period\n";
export declare const LONG_OPTION_FRAGMENT = "\n  option {\n    id\n    isCall\n    optionPriceAndGreeksHistory(\n      first: 1000,\n      orderBy: timestamp,\n      orderDirection: desc,\n      where: {\n        timestamp_gte: $startTimestamp,\n        period_gte: $period\n      }\n    ) {\n      id\n      timestamp\n      optionPrice\n    }\n  }\n  id\n  openTimestamp\n  closeTimestamp\n  size\n  collateral\n  trades(\n    first: 1000,\n    orderBy: timestamp,\n    orderDirection: desc,\n  ) {\n    timestamp\n    isBuy\n    size\n    premium\n    blockNumber\n    transactionHash\n    collateralUpdate {\n      timestamp\n      amount\n    }\n  }\n";
export declare const SHORT_OPTION_FRAGMENT: string;
export declare const OPTION_PRICE_AND_GREEKS_SNAPSHOT_FRAGMENT = "\n  timestamp\n  blockTimestamp\n  optionPrice\n  id\n  blockNumber\n  option {\n    id\n  }\n";
export declare const OPTION_VOLUME_FRAGMENT = "\n  notionalVolume\n  premiumVolume\n  timestamp\n";
export declare const STRIKE_IV_AND_GREEKS_SNAPSHOT_FRAGMENT = "\n  timestamp\n  iv\n";
export declare const LIQUIDITY_DEPOSIT_FRAGMENT = "\n  pool {\n    market {\n      id\n    }\n    cbEvents(first:1, orderBy:cbTimestamp, orderDirection:desc) {\n      cbTimestamp\n      ivVarianceCrossed\n      skewVarianceCrossed\n      liquidityVarianceCrossed\n    }\n  }\n  user\n  pendingDepositsAndWithdrawals(where: {\n    isDeposit: true\n  }) {\n    id\n    queueID\n    pendingAmount\n    processedAmount\n    timestamp\n    transactionHash\n  }\n  depositsAndWithdrawals(where: {\n    isDeposit: true\n  }) {\n    id\n    queueID\n    quoteAmount\n    tokenAmount\n    tokenPrice\n    timestamp\n    transactionHash\n  }\n";
export declare const LIQUIDITY_WITHDRAWAL_FRAGMENT = "\n  pool {\n    market {\n      id\n    }\n  }\n  user\n  pendingDepositsAndWithdrawals(where: {\n    isDeposit: false\n  }) {\n    id\n    queueID\n    pendingAmount\n    processedAmount\n    timestamp\n    transactionHash\n  }\n  depositsAndWithdrawals(where: {\n    isDeposit: false\n  }) {\n    id\n    queueID\n    quoteAmount\n    tokenAmount\n    tokenPrice\n    timestamp\n    transactionHash\n  }\n";
export declare const CLAIM_ADDED_FRAGMENT = "\n  amount\n  blockNumber\n  claimer\n  epochTimestamp\n  rewardToken\n  tag\n  timestamp\n";
export declare const CLAIM_FRAGMENT = "\n  amount\n  blockNumber\n  claimer\n  rewardToken\n  timestamp\n";
export declare const CIRCUIT_BREAKER_FRAGMENT = "\n  cbTimestamp\n  ivVarianceCrossed\n  skewVarianceCrossed\n  liquidityVarianceCrossed\n";
export type TradeQueryResult = {
    timestamp: number;
    blockNumber: number;
    transactionHash: string;
    setCollateralTo: string;
    trader: string;
    size: string;
    isOpen: boolean;
    isBuy: boolean;
    spotPrice: string;
    premium: string;
    spotPriceFee: string;
    optionPriceFee: string;
    vegaUtilFee: string;
    varianceFee: string;
    externalSwapFees: string;
    strike: {
        strikeId: string;
        strikePrice: string;
    };
    board: {
        expiryTimestamp: number;
    };
    market: {
        name: string;
        id: string;
    };
    option: {
        isCall: boolean;
    };
    position: {
        positionId: number;
        isLong: boolean;
        isBaseCollateral: boolean;
    };
    newIv: string;
    newBaseIv: string;
    newSkew: string;
    volTraded: string;
    isLiquidation: boolean;
    isForceClose: boolean;
    externalSwapAddress: string;
};
export type TransferQueryResult = {
    oldOwner: string;
    newOwner: string;
    transactionHash: string;
    blockNumber: number;
    position: {
        id: string;
        positionId: number;
    };
};
export type SettleQueryResult = {
    id: string;
    blockNumber: number;
    profit: string;
    size: string;
    spotPriceAtExpiry: string;
    timestamp: number;
    transactionHash: string;
    owner: string;
    settleAmount: string;
    position: {
        positionId: number;
        isBaseCollateral: boolean;
        isLong: boolean;
        strike: {
            strikeId: string;
            strikePrice: string;
        };
        board: {
            expiryTimestamp: number;
        };
        market: {
            name: string;
            id: string;
            latestSpotPrice: string;
        };
        option: {
            isCall: boolean;
        };
    };
};
export type CollateralUpdateQueryResult = {
    timestamp: number;
    blockNumber: number;
    transactionHash: string;
    amount: string;
    trader: string;
    isBaseCollateral: boolean;
    spotPrice: string;
    strike: {
        strikeId: string;
        strikePrice: string;
    };
    board: {
        expiryTimestamp: number;
    };
    market: {
        name: string;
        id: string;
    };
    option: {
        isCall: boolean;
    };
    position: {
        positionId: number;
        isLong: boolean;
        isBaseCollateral: boolean;
    };
    externalSwapFees: string;
    externalSwapAddress: string;
    externalSwapAmount: string;
};
export type PositionQueryResult = {
    id: string;
    positionId: number;
    owner: string;
    size: string;
    isLong: boolean;
    collateral: string | null;
    isBaseCollateral: boolean;
    state: PositionState;
    openTimestamp: number;
    closeTimestamp: number;
    strike: {
        strikeId: string;
        strikePrice: string;
    };
    board: {
        boardId: string;
        expiryTimestamp: number;
        spotPriceAtExpiry: string | null;
    };
    market: {
        name: string;
        id: string;
        latestSpotPrice: string;
    };
    option: {
        isCall: boolean;
        latestOptionPriceAndGreeks: {
            optionPrice: string;
        };
    };
    trades: TradeQueryResult[];
    collateralUpdates: CollateralUpdateQueryResult[];
    transfers: TransferQueryResult[];
    settle: SettleQueryResult;
};
export type MarketTotalValueSnapshotQueryResult = {
    id: string;
    period: number;
    timestamp: number;
    tokenPrice: string;
    freeLiquidity: string;
    burnableLiquidity: string;
    usedCollatLiquidity: string;
    pendingDeltaLiquidity: string;
    usedDeltaLiquidity: string;
    NAV: string;
    netOptionValue: string;
    pendingDeposits: string;
    pendingWithdrawals: string;
};
export type MarketGreeksSnapshotQueryResult = {
    id: string;
    period: number;
    timestamp: number;
    netDelta: string;
    poolNetDelta: string;
    hedgerNetDelta: string;
    netStdVega: string;
};
export type MarketVolumeAndFeesSnapshotQueryResult = {
    id: string;
    timestamp: number;
    period: number;
    premiumVolume: string;
    notionalVolume: string;
    totalPremiumVolume: string;
    totalNotionalVolume: string;
    spotPriceFees: string;
    optionPriceFees: string;
    vegaFees: string;
    varianceFees: string;
    deltaCutoffFees: string;
    liquidatorFees: string;
    smLiquidationFees: string;
    lpLiquidationFees: string;
    totalShortPutOpenInterestUSD: string;
    totalShortCallOpenInterestUSD: string;
};
export type MarketPendingLiquiditySnapshotQueryResult = {
    id: string;
    period: number;
    timestamp: number;
    pendingDepositAmount: string;
    pendingWithdrawalAmount: string;
};
export type OptionPriceAndGreeksSnapshotQueryResult = {
    timestamp: number;
    blockTimestamp: number;
    blockNumber: number;
    optionPrice: string;
    id: string;
    option: {
        id: string;
    };
};
export type OptionVolumeQueryResult = {
    premiumVolume: string;
    notionalVolume: string;
    timestamp: number;
};
export type StrikeIVAndGreeksSnapshotQueryResult = {
    timestamp: number;
    iv: string;
};
export type SpotPriceSnapshotQueryResult = {
    spotPrice: string;
    open: string;
    high: string;
    low: string;
    close: string;
    timestamp: number;
    period: number;
    blockNumber: number;
};
export declare enum SnapshotPeriod {
    FifteenMinutes = 900,
    OneHour = 3600,
    FourHours = 14400,
    EightHours = 28800,
    OneDay = 86400,
    SevenDays = 604800
}
export type CircuitBreakerQueryResult = {
    cbTimestamp: number;
    ivVarianceCrossed: boolean;
    skewVarianceCrossed: boolean;
    liquidityVarianceCrossed: boolean;
};
export type LiquidityDepositQueryResult = {
    pool: {
        id: string;
    };
    user: string;
    pendingDepositsAndWithdrawals: {
        id: string;
        isDeposit: boolean;
        queueID: string;
        pendingAmount: string;
        processedAmount: string;
        timestamp: number;
        transactionHash: string;
    }[];
    depositsAndWithdrawals: {
        id: string;
        isDeposit: boolean;
        queueID: string;
        quoteAmount: string;
        tokenAmount: string;
        tokenPrice: string;
        timestamp: number;
        transactionHash: string;
    }[];
};
export type LiquidityWithdrawalQueryResult = {
    pool: {
        id: string;
    };
    user: string;
    pendingDepositsAndWithdrawals: {
        id: string;
        isDeposit: boolean;
        queueID: string;
        pendingAmount: string;
        processedAmount: string;
        transactionHash: string;
        timestamp: number;
    }[];
    depositsAndWithdrawals: {
        id: string;
        isDeposit: boolean;
        queueID: string;
        quoteAmount: string;
        tokenAmount: string;
        tokenPrice: string;
        timestamp: number;
        transactionHash: string;
    }[];
};
export type ClaimAddedQueryResult = {
    amount: string;
    blockNumber: number;
    claimer: string;
    epochTimestamp: string;
    rewardToken: string;
    tag: string;
    timestamp: number;
};
export type ClaimQueryResult = {
    amount: string;
    blockNumber: number;
    claimer: string;
    rewardToken: string;
    timestamp: number;
};
