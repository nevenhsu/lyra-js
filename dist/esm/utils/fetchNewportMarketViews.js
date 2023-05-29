import { ZERO_ADDRESS, ZERO_BN } from '../constants/bn';
import { LyraContractId, LyraMarketContractId } from '../constants/contracts';
import { Version } from '../lyra';
import fetchMarketAddresses from './fetchMarketAddresses';
import getLyraContract from './getLyraContract';
import getLyraMarketContract from './getLyraMarketContract';
import isTestnet from './isTestnet';
import multicall from './multicall';
const TESTNET_HEDGER_VIEW = {
    currentPositions: {
        longPosition: {
            size: ZERO_BN,
            collateral: ZERO_BN,
            averagePrice: ZERO_BN,
            entryFundingRate: ZERO_BN,
            unrealisedPnl: ZERO_BN,
            lastIncreasedTime: ZERO_BN,
            isLong: true,
        },
        shortPosition: {
            size: ZERO_BN,
            collateral: ZERO_BN,
            averagePrice: ZERO_BN,
            entryFundingRate: ZERO_BN,
            unrealisedPnl: ZERO_BN,
            lastIncreasedTime: ZERO_BN,
            isLong: false,
        },
        amountOpen: ZERO_BN,
        isLong: true,
    },
    futuresPoolHedgerParams: {
        acceptableSpotSlippage: ZERO_BN,
        deltaThreshold: ZERO_BN,
        marketDepthBuffer: ZERO_BN,
        targetLeverage: ZERO_BN,
        maxLeverage: ZERO_BN,
        minCancelDelay: ZERO_BN,
        minCollateralUpdate: ZERO_BN,
        vaultLiquidityCheckEnabled: false,
    },
    hedgerAddresses: {
        router: ZERO_ADDRESS,
        positionRouter: ZERO_ADDRESS,
        vault: ZERO_ADDRESS,
        quoteAsset: ZERO_ADDRESS,
        baseAsset: ZERO_ADDRESS,
        weth: ZERO_ADDRESS,
    },
    gmxView: {
        basePoolAmount: ZERO_BN,
        baseReservedAmount: ZERO_BN,
        quotePoolAmount: ZERO_BN,
        quoteReservedAmount: ZERO_BN,
        maxGlobalLongSize: ZERO_BN,
        guaranteedUSD: ZERO_BN,
        maxGlobalShortSize: ZERO_BN,
        shortSize: ZERO_BN,
        minExecutionFee: ZERO_BN,
        remainingLongDollars: ZERO_BN,
        remainingShortDollars: ZERO_BN,
    },
    referralCode: '',
    pendingOrderKey: '',
    lastOrderTimestamp: ZERO_BN,
    spotPrice: ZERO_BN,
    expectedHedge: ZERO_BN,
    currentHedge: ZERO_BN,
    currentLeverage: ZERO_BN,
    pendingCollateralDelta: ZERO_BN,
    baseBal: ZERO_BN,
    quoteBal: ZERO_BN,
    wethBal: ZERO_BN,
};
const TESTNET_POOL_HEDGER_PARAMS = {
    interactionDelay: ZERO_BN,
    hedgeCap: ZERO_BN,
};
export default async function fetchNewportMarketViews(lyra) {
    const viewerContract = getLyraContract(lyra, Version.Newport, LyraContractId.OptionMarketViewer);
    const exchangeAdapterContract = getLyraContract(lyra, Version.Newport, LyraContractId.ExchangeAdapter);
    const globalOwnerReq = {
        contract: exchangeAdapterContract,
        function: 'owner',
        args: [],
    };
    const allMarketAddresses = await fetchMarketAddresses(lyra);
    const hedgerRequests = !isTestnet(lyra)
        ? allMarketAddresses.map(marketAddresses => {
            const poolHedger = getLyraMarketContract(lyra, marketAddresses, Version.Newport, LyraMarketContractId.PoolHedger);
            return {
                contract: poolHedger,
                function: 'getHedgerState',
                args: [],
            };
        })
        : [];
    const adapterRequests = allMarketAddresses.map(marketAddresses => {
        return {
            contract: exchangeAdapterContract,
            function: 'getAdapterState',
            args: [marketAddresses.optionMarket],
        };
    });
    const hedgerParamsRequests = !isTestnet(lyra)
        ? allMarketAddresses.map(marketAddresses => {
            const poolHedger = getLyraMarketContract(lyra, marketAddresses, Version.Newport, LyraMarketContractId.PoolHedger);
            return {
                contract: poolHedger,
                function: 'getPoolHedgerParams',
                args: [],
            };
        })
        : [];
    const tokenPriceRequests = allMarketAddresses.map(marketAddresses => {
        const liquidityPool = getLyraMarketContract(lyra, marketAddresses, Version.Newport, LyraMarketContractId.LiquidityPool);
        return {
            contract: liquidityPool,
            function: 'getTokenPrice',
            args: [],
        };
    });
    const { returnData: [owner, marketViewsRes, ...hedgerAndAdapterViews], blockNumber, } = await multicall(lyra, [
        globalOwnerReq,
        {
            contract: viewerContract,
            function: 'getMarkets',
            args: [allMarketAddresses.map(a => a.optionMarket)],
        },
        ...hedgerRequests,
        ...adapterRequests,
        ...hedgerParamsRequests,
        ...tokenPriceRequests,
    ]);
    const hedgerViews = hedgerAndAdapterViews.slice(0, hedgerRequests.length);
    const adapterViews = hedgerAndAdapterViews.slice(hedgerRequests.length, hedgerRequests.length + adapterRequests.length);
    const poolHedgerParams = hedgerAndAdapterViews.slice(hedgerRequests.length + adapterRequests.length, hedgerRequests.length + adapterRequests.length + hedgerParamsRequests.length);
    const tokenPrices = hedgerAndAdapterViews.slice(hedgerRequests.length + adapterRequests.length + hedgerParamsRequests.length);
    const { isPaused, markets } = marketViewsRes;
    const marketViews = markets.map((marketView, i) => {
        return {
            marketView,
            hedgerView: !isTestnet(lyra)
                ? hedgerViews[i]
                : // HACK: Cast ViewStruct to ViewStructOutput
                    TESTNET_HEDGER_VIEW,
            adapterView: adapterViews[i],
            poolHedgerParams: !isTestnet(lyra) ? poolHedgerParams[i] : TESTNET_POOL_HEDGER_PARAMS,
            tokenPrice: tokenPrices[i],
        };
    });
    return { marketViews, isGlobalPaused: isPaused, owner, blockNumber };
}
//# sourceMappingURL=fetchNewportMarketViews.js.map