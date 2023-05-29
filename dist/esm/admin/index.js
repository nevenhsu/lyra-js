import { BigNumber } from '@ethersproject/bignumber';
import { Version } from '..';
import { LyraContractId, LyraMarketContractId } from '../constants/contracts';
import buildTx from '../utils/buildTx';
import fetchGlobalOwner from '../utils/fetchGlobalOwner';
import getGlobalContract from '../utils/getGlobalContract';
import getLyraContract from '../utils/getLyraContract';
import getLyraMarketContract from '../utils/getLyraMarketContract';
import getLyraMarketContractForAddress from '../utils/getLyraMarketContractForAddress';
const GAS_LIMIT = BigNumber.from(10000000);
export class Admin {
    constructor(lyra) {
        this.lyra = lyra;
    }
    static get(lyra) {
        return new Admin(lyra);
    }
    contract(version, contractId) {
        return getLyraContract(this.lyra, version, contractId);
    }
    marketContract(marketContractAddresses, version, contractId) {
        return getLyraMarketContract(this.lyra, marketContractAddresses, version, contractId);
    }
    globalContract(contractId) {
        return getGlobalContract(this.lyra, contractId);
    }
    getMarketContractForAddress(marketContractAddresses, version, contractAddress) {
        return getLyraMarketContractForAddress(this.lyra, version, marketContractAddresses, contractAddress);
    }
    async owner() {
        return await fetchGlobalOwner(this.lyra);
    }
    async isMarketPaused(marketAddress) {
        const exchangeAdapter = this.contract(this.lyra.version, LyraContractId.ExchangeAdapter);
        return await exchangeAdapter.isMarketPaused(marketAddress);
    }
    async isGlobalPaused() {
        const exchangeAdapter = this.contract(this.lyra.version, LyraContractId.ExchangeAdapter);
        return await exchangeAdapter.isGlobalPaused();
    }
    async getMarketGlobalCache(marketAddress) {
        const market = await this.lyra.market(marketAddress);
        const optionGreekCache = getLyraMarketContract(this.lyra, market.contractAddresses, this.lyra.version, LyraMarketContractId.OptionGreekCache);
        const [isGlobalCacheStale, globalCache] = await Promise.all([
            optionGreekCache.isGlobalCacheStale(market.spotPrice),
            optionGreekCache.getGlobalCache(),
        ]);
        return { ...globalCache, isGlobalCacheStale };
    }
    async setGlobalPaused(isPaused) {
        const exchangeAdapter = this.contract(this.lyra.version, LyraContractId.ExchangeAdapter);
        const owner = await exchangeAdapter.owner();
        const calldata = exchangeAdapter.interface.encodeFunctionData('setGlobalPaused', [isPaused]);
        const tx = buildTx(this.lyra.provider, this.lyra.provider.network.chainId, exchangeAdapter.address, owner, calldata);
        return {
            ...tx,
            gasLimit: GAS_LIMIT,
        };
    }
    async setMarketPaused(marketAddressOrName, isPaused) {
        const exchangeAdapter = this.contract(this.lyra.version, LyraContractId.ExchangeAdapter);
        const [owner, market] = await Promise.all([exchangeAdapter.owner(), this.lyra.market(marketAddressOrName)]);
        const calldata = exchangeAdapter.interface.encodeFunctionData('setMarketPaused', [market.address, isPaused]);
        const tx = buildTx(this.lyra.provider, this.lyra.provider.network.chainId, exchangeAdapter.address, owner, calldata);
        return {
            ...tx,
            gasLimit: GAS_LIMIT,
        };
    }
    async addMarketToViewer(newMarketAddresses) {
        const viewer = this.contract(this.lyra.version, LyraContractId.OptionMarketViewer);
        const owner = await viewer.owner();
        const calldata = viewer.interface.encodeFunctionData('addMarket', [newMarketAddresses]);
        const tx = buildTx(this.lyra.provider, this.lyra.provider.network.chainId, viewer.address, owner, calldata);
        return {
            ...tx,
            gasLimit: GAS_LIMIT,
        };
    }
    async addMarketToRegistry(newMarketAddresses) {
        const registry = this.contract(this.lyra.version, LyraContractId.LyraRegistry);
        const owner = await registry.owner();
        const calldata = registry.interface.encodeFunctionData('addMarket', [newMarketAddresses]);
        const tx = buildTx(this.lyra.provider, this.lyra.provider.network.chainId, registry.address, owner, calldata);
        return {
            ...tx,
            gasLimit: GAS_LIMIT,
        };
    }
    async addBoard(marketAddressOrName, expiry, baseIV, strikePrices, skews, frozen = false) {
        const market = await this.lyra.market(marketAddressOrName);
        const owner = await market.owner();
        const optionMarket = getLyraMarketContract(this.lyra, market.contractAddresses, this.lyra.version, LyraMarketContractId.OptionMarket);
        const calldata = optionMarket.interface.encodeFunctionData('createOptionBoard', [
            expiry,
            baseIV,
            strikePrices,
            skews,
            frozen,
        ]);
        const tx = buildTx(this.lyra.provider, this.lyra.provider.network.chainId, optionMarket.address, owner, calldata);
        tx.gasLimit = GAS_LIMIT;
        return { tx, board: { expiry, baseIV, strikePrices, skews, frozen } };
    }
    async addStrikeToBoard(marketAddresOrName, boardId, strike, skew) {
        const market = await this.lyra.market(marketAddresOrName);
        const owner = await market.owner();
        const optionMarket = getLyraMarketContract(this.lyra, market.contractAddresses, this.lyra.version, LyraMarketContractId.OptionMarket);
        const calldata = optionMarket.interface.encodeFunctionData('addStrikeToBoard', [boardId, strike, skew]);
        const tx = buildTx(this.lyra.provider, this.lyra.provider.network.chainId, optionMarket.address, owner, calldata);
        tx.gasLimit = GAS_LIMIT;
        return {
            tx,
            strike: {
                boardId,
                strikePrice: strike,
                skew,
            },
        };
    }
    async setBoardPaused(marketAddresOrName, boardId, isPaused) {
        const market = await this.lyra.market(marketAddresOrName);
        const optionMarket = getLyraMarketContract(this.lyra, market.contractAddresses, this.lyra.version, LyraMarketContractId.OptionMarket);
        const owner = await optionMarket.owner();
        const calldata = optionMarket.interface.encodeFunctionData('setBoardFrozen', [boardId, isPaused]);
        const tx = buildTx(this.lyra.provider, this.lyra.provider.network.chainId, optionMarket.address, owner, calldata);
        return {
            ...tx,
            gasLimit: GAS_LIMIT,
        };
    }
    async setBoardBaseIv(marketAddresOrName, boardId, baseIv) {
        const market = await this.lyra.market(marketAddresOrName);
        const optionMarket = getLyraMarketContract(this.lyra, market.contractAddresses, this.lyra.version, LyraMarketContractId.OptionMarket);
        const owner = await optionMarket.owner();
        const calldata = optionMarket.interface.encodeFunctionData('setBoardBaseIv', [boardId, baseIv]);
        const tx = buildTx(this.lyra.provider, this.lyra.provider.network.chainId, optionMarket.address, owner, calldata);
        return {
            ...tx,
            gasLimit: GAS_LIMIT,
        };
    }
    async setStrikeSkew(marketAddresOrName, strikeId, skew) {
        const market = await this.lyra.market(marketAddresOrName);
        const optionMarket = getLyraMarketContract(this.lyra, market.contractAddresses, this.lyra.version, LyraMarketContractId.OptionMarket);
        const owner = await optionMarket.owner();
        const calldata = optionMarket.interface.encodeFunctionData('setStrikeSkew', [strikeId, skew]);
        const tx = buildTx(this.lyra.provider, this.lyra.provider.network.chainId, optionMarket.address, owner, calldata);
        return {
            ...tx,
            gasLimit: GAS_LIMIT,
        };
    }
    async setGreekCacheParams(version, marketAddresOrName, greekCacheParams) {
        const market = await this.lyra.market(marketAddresOrName);
        if (version === Version.Avalon) {
            const toGreekCacheParams = {
                ...market.__data.marketParameters.greekCacheParams,
                ...greekCacheParams,
            };
            const optionGreekCache = getLyraMarketContract(this.lyra, market.contractAddresses, Version.Avalon, LyraMarketContractId.OptionGreekCache);
            const owner = await optionGreekCache.owner();
            const calldata = optionGreekCache.interface.encodeFunctionData('setGreekCacheParameters', [toGreekCacheParams]);
            const tx = buildTx(this.lyra.provider, this.lyra.provider.network.chainId, optionGreekCache.address, owner, calldata);
            tx.gasLimit = GAS_LIMIT;
            return { params: toGreekCacheParams, tx };
        }
        else {
            const toGreekCacheParams = {
                ...market.__data.marketParameters.greekCacheParams,
                ...greekCacheParams,
            };
            const optionGreekCache = getLyraMarketContract(this.lyra, market.contractAddresses, Version.Newport, LyraMarketContractId.OptionGreekCache);
            const owner = await optionGreekCache.owner();
            const calldata = optionGreekCache.interface.encodeFunctionData('setGreekCacheParameters', [toGreekCacheParams]);
            const tx = buildTx(this.lyra.provider, this.lyra.provider.network.chainId, optionGreekCache.address, owner, calldata);
            tx.gasLimit = GAS_LIMIT;
            return { params: toGreekCacheParams, tx };
        }
    }
    async setForceCloseParams(marketAddresOrName, forceCloseParams) {
        const market = await this.lyra.market(marketAddresOrName);
        const toForceCloseParams = {
            ...market.__data.marketParameters.forceCloseParams,
            ...forceCloseParams,
        };
        const optionGreekCache = getLyraMarketContract(this.lyra, market.contractAddresses, this.lyra.version, LyraMarketContractId.OptionGreekCache);
        const owner = await optionGreekCache.owner();
        const calldata = optionGreekCache.interface.encodeFunctionData('setForceCloseParameters', [toForceCloseParams]);
        const tx = buildTx(this.lyra.provider, this.lyra.provider.network.chainId, optionGreekCache.address, owner, calldata);
        tx.gasLimit = GAS_LIMIT;
        return { params: toForceCloseParams, tx };
    }
    async setMinCollateralParams(marketAddresOrName, minCollateralParams) {
        const market = await this.lyra.market(marketAddresOrName);
        const toMinCollateralParams = {
            ...market.__data.marketParameters.minCollatParams,
            ...minCollateralParams,
        };
        const optionGreekCache = getLyraMarketContract(this.lyra, market.contractAddresses, this.lyra.version, LyraMarketContractId.OptionGreekCache);
        const owner = await optionGreekCache.owner();
        const calldata = optionGreekCache.interface.encodeFunctionData('setMinCollateralParameters', [
            toMinCollateralParams,
        ]);
        const tx = buildTx(this.lyra.provider, this.lyra.provider.network.chainId, optionGreekCache.address, owner, calldata);
        tx.gasLimit = GAS_LIMIT;
        return { params: toMinCollateralParams, tx };
    }
    async setLiquidityPoolParams(version, marketAddressOrName, lpParams) {
        const market = await this.lyra.market(marketAddressOrName);
        if (version === Version.Avalon) {
            const params = {
                ...market.__data.marketParameters.lpParams,
                ...lpParams,
            };
            const liquidityPool = getLyraMarketContract(this.lyra, market.contractAddresses, Version.Avalon, LyraMarketContractId.LiquidityPool);
            const owner = await liquidityPool.owner();
            const calldata = liquidityPool.interface.encodeFunctionData('setLiquidityPoolParameters', [params]);
            const tx = buildTx(this.lyra.provider, this.lyra.provider.network.chainId, liquidityPool.address, owner, calldata);
            tx.gasLimit = GAS_LIMIT;
            return { params: params, tx };
        }
        else {
            const params = {
                ...market.__data.marketParameters.lpParams,
                ...lpParams,
            };
            const liquidityPool = getLyraMarketContract(this.lyra, market.contractAddresses, Version.Newport, LyraMarketContractId.LiquidityPool);
            const owner = await liquidityPool.owner();
            const calldata = liquidityPool.interface.encodeFunctionData('setLiquidityPoolParameters', [params]);
            const tx = buildTx(this.lyra.provider, this.lyra.provider.network.chainId, liquidityPool.address, owner, calldata);
            tx.gasLimit = GAS_LIMIT;
            return { params: params, tx };
        }
    }
    async setPricingParams(marketAddressOrName, pricingParams) {
        const market = await this.lyra.market(marketAddressOrName);
        const toPricingParams = {
            ...market.__data.marketParameters.pricingParams,
            ...pricingParams,
        };
        const optionMarketPricer = getLyraMarketContract(this.lyra, market.contractAddresses, this.lyra.version, LyraMarketContractId.OptionMarketPricer);
        const owner = await optionMarketPricer.owner();
        const calldata = optionMarketPricer.interface.encodeFunctionData('setPricingParams', [toPricingParams]);
        const tx = buildTx(this.lyra.provider, this.lyra.provider.network.chainId, optionMarketPricer.address, owner, calldata);
        tx.gasLimit = GAS_LIMIT;
        return { params: toPricingParams, tx };
    }
    async setTradeLimitParams(marketAddressOrName, tradeLimitParams) {
        const market = await this.lyra.market(marketAddressOrName);
        const toTradeLimitParams = {
            ...market.__data.marketParameters.tradeLimitParams,
            ...tradeLimitParams,
        };
        const optionMarketPricer = getLyraMarketContract(this.lyra, market.contractAddresses, this.lyra.version, LyraMarketContractId.OptionMarketPricer);
        const owner = await optionMarketPricer.owner();
        const calldata = optionMarketPricer.interface.encodeFunctionData('setTradeLimitParams', [toTradeLimitParams]);
        const tx = buildTx(this.lyra.provider, this.lyra.provider.network.chainId, optionMarketPricer.address, owner, calldata);
        tx.gasLimit = GAS_LIMIT;
        return { params: toTradeLimitParams, tx };
    }
    async setVarianceFeeParams(marketAddressOrName, params) {
        const market = await this.lyra.market(marketAddressOrName);
        const toParams = {
            ...market.__data.marketParameters.varianceFeeParams,
            ...params,
        };
        const optionMarketPricer = getLyraMarketContract(this.lyra, market.contractAddresses, this.lyra.version, LyraMarketContractId.OptionMarketPricer);
        const owner = await optionMarketPricer.owner();
        const calldata = optionMarketPricer.interface.encodeFunctionData('setVarianceFeeParams', [toParams]);
        const tx = buildTx(this.lyra.provider, this.lyra.provider.network.chainId, optionMarketPricer.address, owner, calldata);
        tx.gasLimit = GAS_LIMIT;
        return { params: toParams, tx };
    }
    async setPartialCollatParams(marketAddressOrName, params) {
        const market = await this.lyra.market(marketAddressOrName);
        const toParams = {
            ...market.__data.marketParameters.partialCollatParams,
            ...params,
        };
        const optionToken = getLyraMarketContract(this.lyra, market.contractAddresses, this.lyra.version, LyraMarketContractId.OptionToken);
        const owner = await optionToken.owner();
        const calldata = optionToken.interface.encodeFunctionData('setPartialCollateralParams', [toParams]);
        const tx = buildTx(this.lyra.provider, this.lyra.provider.network.chainId, optionToken.address, owner, calldata);
        tx.gasLimit = GAS_LIMIT;
        return { params: toParams, tx };
    }
    async setOptionMarketParams(marketAddressOrName, params) {
        const market = await this.lyra.market(marketAddressOrName);
        const toParams = {
            ...market.__data.marketParameters.optionMarketParams,
            ...params,
        };
        const optionMarket = getLyraMarketContract(this.lyra, market.contractAddresses, this.lyra.version, LyraMarketContractId.OptionMarket);
        const owner = await optionMarket.owner();
        const calldata = optionMarket.interface.encodeFunctionData('setOptionMarketParams', [toParams]);
        const tx = buildTx(this.lyra.provider, this.lyra.provider.network.chainId, optionMarket.address, owner, calldata);
        tx.gasLimit = GAS_LIMIT;
        return { params: toParams, tx };
    }
    async setAdapterMarketPricingParams(marketAddressOrName, params) {
        const market = await this.lyra.market(marketAddressOrName);
        if (!market.params.adapterView) {
            throw new Error('Adapter market pricing parameters not supported on this market');
        }
        const toParams = {
            ...market.params.adapterView.marketPricingParams,
            ...params,
        };
        const exchangeAdapter = getLyraContract(this.lyra, Version.Newport, LyraContractId.ExchangeAdapter);
        const owner = await exchangeAdapter.owner();
        const calldata = exchangeAdapter.interface.encodeFunctionData('setMarketPricingParams', [market.address, toParams]);
        const tx = buildTx(this.lyra.provider, this.lyra.provider.network.chainId, exchangeAdapter.address, owner, calldata);
        tx.gasLimit = GAS_LIMIT;
        return { params: toParams, tx };
    }
    async setPoolHedgerParams(marketAddressOrName, params) {
        const market = await this.lyra.market(marketAddressOrName);
        const poolHedger = getLyraMarketContract(this.lyra, market.contractAddresses, market.lyra.version, LyraMarketContractId.PoolHedger);
        const fromParams = await poolHedger.getPoolHedgerParams();
        const toParams = {
            ...fromParams,
            ...params,
        };
        const owner = await market.owner();
        const calldata = poolHedger.interface.encodeFunctionData('setPoolHedgerParams', [toParams]);
        const tx = buildTx(this.lyra.provider, this.lyra.provider.network.chainId, poolHedger.address, owner, calldata);
        tx.gasLimit = BigNumber.from(10000000);
        return { params: toParams, tx };
    }
    async setFuturesPoolHedgerParams(marketAddressOrName, params) {
        const market = await this.lyra.market(marketAddressOrName);
        if (market.lyra.version !== Version.Newport || !market.params.hedgerView) {
            throw new Error('Parameters not supported on version');
        }
        const toParams = {
            ...market.params.hedgerView.futuresPoolHedgerParams,
            ...params,
        };
        const futuresPoolHedger = getLyraMarketContract(this.lyra, market.contractAddresses, market.lyra.version, LyraMarketContractId.PoolHedger);
        const owner = await market.owner();
        const calldata = futuresPoolHedger.interface.encodeFunctionData('setFuturesPoolHedgerParams', [toParams]);
        const tx = buildTx(this.lyra.provider, this.lyra.provider.network.chainId, futuresPoolHedger.address, owner, calldata);
        tx.gasLimit = BigNumber.from(10000000);
        return { params: toParams, tx };
    }
    async setCircuitBreakerParams(marketAddressOrName, params) {
        const market = await this.lyra.market(marketAddressOrName);
        if (market.lyra.version !== Version.Newport || !('cbParams' in market.__data.marketParameters)) {
            throw new Error('Parameters not supported on version');
        }
        const toParams = {
            ...market.__data.marketParameters.cbParams,
            ...params,
        };
        const liquidityPool = getLyraMarketContract(this.lyra, market.contractAddresses, market.lyra.version, LyraMarketContractId.LiquidityPool);
        const owner = await market.owner();
        const calldata = liquidityPool.interface.encodeFunctionData('setCircuitBreakerParameters', [toParams]);
        const tx = buildTx(this.lyra.provider, this.lyra.provider.network.chainId, liquidityPool.address, owner, calldata);
        tx.gasLimit = BigNumber.from(10000000);
        return { params: toParams, tx };
    }
    async processDepositQueue(marketAddressOrName, limit) {
        const market = await this.lyra.market(marketAddressOrName);
        const liquidityPool = getLyraMarketContract(this.lyra, market.contractAddresses, this.lyra.version, LyraMarketContractId.LiquidityPool);
        const owner = await liquidityPool.owner();
        const calldata = liquidityPool.interface.encodeFunctionData('processDepositQueue', [limit]);
        const tx = buildTx(this.lyra.provider, this.lyra.provider.network.chainId, liquidityPool.address, owner, calldata);
        tx.gasLimit = GAS_LIMIT;
        return tx;
    }
    async processWithdrawalQueue(marketAddressOrName, limit) {
        const market = await this.lyra.market(marketAddressOrName);
        const liquidityPool = getLyraMarketContract(this.lyra, market.contractAddresses, this.lyra.version, LyraMarketContractId.LiquidityPool);
        const owner = await liquidityPool.owner();
        const calldata = liquidityPool.interface.encodeFunctionData('processWithdrawalQueue', [limit]);
        const tx = buildTx(this.lyra.provider, this.lyra.provider.network.chainId, liquidityPool.address, owner, calldata);
        tx.gasLimit = GAS_LIMIT;
        return tx;
    }
}
//# sourceMappingURL=index.js.map