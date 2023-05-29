import { MAX_BN, ZERO_BN } from '../constants/bn';
import { LyraContractId, LyraMarketContractId } from '../constants/contracts';
import { Version } from '../lyra';
import fetchMarketAddresses from './fetchMarketAddresses';
import getLyraContract from './getLyraContract';
import getLyraMarketContract from './getLyraMarketContract';
import isTestnet from './isTestnet';
import multicall from './multicall';
const TESTNET_POOL_HEDGER_PARAMS = {
    interactionDelay: ZERO_BN,
    hedgeCap: ZERO_BN,
};
const TESTNET_HEDGER_VIEW = {
    lastInteraction: ZERO_BN,
    hedgedDelta: ZERO_BN,
    margin: ZERO_BN,
    leverage: ZERO_BN,
    hedgerQuoteBalance: ZERO_BN,
    hedgerMarginQuoteBalance: ZERO_BN,
    canHedgeDeltaIncrease: true,
    canHedgeDeltaDecrease: true,
    cappedExpectedHedge: ZERO_BN,
    snxHasEnoughMarketDepth: true,
    marketSuspended: false,
    curveRateStable: true,
    pendingDeltaLiquidity: ZERO_BN,
    usedDeltaLiquidity: ZERO_BN,
    pendingDelta: ZERO_BN,
    pendingMargin: ZERO_BN,
    fundingRate: ZERO_BN,
    trackingCode: '',
    optionMarket: '',
    perpsMarket: '',
    curveSwap: '',
    quoteAsset: '',
    futuresPoolHedgerParams: {
        targetLeverage: ZERO_BN,
        maximumFundingRate: ZERO_BN,
        deltaThreshold: ZERO_BN,
        marketDepthBuffer: ZERO_BN,
        priceDeltaBuffer: ZERO_BN,
        worstStableRate: ZERO_BN,
        maxOrderCap: ZERO_BN,
    },
    poolHedgerParams: {
        interactionDelay: ZERO_BN,
        hedgeCap: ZERO_BN,
    },
    longInterest: ZERO_BN,
    shortInterest: ZERO_BN,
    maxTotalMarketSize: MAX_BN,
};
export default async function fetchNewportOptimismMarketViews(lyra) {
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
    const adapterRequests = !isTestnet(lyra)
        ? allMarketAddresses.map(marketAddresses => {
            return {
                contract: exchangeAdapterContract,
                function: 'getAdapterState',
                args: [marketAddresses.optionMarket],
            };
        })
        : [];
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
    const tokenPriceRequests = !isTestnet(lyra)
        ? allMarketAddresses.map(marketAddresses => {
            const liquidityPool = getLyraMarketContract(lyra, marketAddresses, Version.Newport, LyraMarketContractId.LiquidityPool);
            return {
                contract: liquidityPool,
                function: 'getTokenPrice',
                args: [],
            };
        })
        : [];
    const baseLimitRequests = allMarketAddresses.map(marketAddresses => {
        const optionMarket = getLyraMarketContract(lyra, marketAddresses, Version.Newport, LyraMarketContractId.OptionMarket);
        return {
            contract: optionMarket,
            function: 'baseLimit',
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
    const { returnData: baseLimits } = await multicall(lyra, baseLimitRequests);
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
            baseLimit: baseLimits[i],
        };
    });
    return { marketViews, isGlobalPaused: isPaused, owner, blockNumber };
}
//# sourceMappingURL=fetchNewportOptimismMarketViews.js.map