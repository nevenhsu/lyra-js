import { parseBytes32String } from '@ethersproject/strings';
import { Board } from '../board';
import { ZERO_BN } from '../constants/bn';
import { DataSource } from '../constants/contracts';
import { Network } from '../constants/network';
import { LiquidityDeposit } from '../liquidity_deposit';
import { LiquidityWithdrawal } from '../liquidity_withdrawal';
import { Version } from '../lyra';
import { Trade } from '../trade';
import fetchAvalonMarketView from '../utils/fetchAvalonMarketView';
import fetchLatestLiquidity from '../utils/fetchLatestLiquidity';
import fetchLatestNetGreeks from '../utils/fetchLatestNetGreeks';
import fetchLiquidityHistory from '../utils/fetchLiquidityHistory';
import fetchMarketAddresses from '../utils/fetchMarketAddresses';
import fetchMarketOwner from '../utils/fetchMarketOwner';
import fetchNetGreeksHistory from '../utils/fetchNetGreeksHistory';
import fetchNewportMarketViews from '../utils/fetchNewportMarketViews';
import fetchNewportOptimismMarketViews from '../utils/fetchNewportOptimismMarketViews';
import fetchSpotPriceHistory from '../utils/fetchSpotPriceHistory';
import fetchTradingVolumeHistory from '../utils/fetchTradingVolumeHistory';
import findMarket from '../utils/findMarket';
import getBoardView from '../utils/getBoardView';
import getBoardViewForStrikeId from '../utils/getBoardViewForStrikeId';
import getLyraMarketContract from '../utils/getLyraMarketContract';
import getMarketName from '../utils/getMarketName';
import isMarketEqual from '../utils/isMarketEqual';
export class Market {
    constructor(lyra, marketView, isGlobalPaused, owner, tokenPrice, block, hedgerView, adapterView, poolHedgerParams, baseLimit) {
        this.__source = DataSource.ContractCall;
        this.lyra = lyra;
        this.block = block;
        this.__data = marketView;
        const fields = Market.getFields(lyra.version, lyra.network, marketView, isGlobalPaused, owner, tokenPrice, hedgerView, adapterView, poolHedgerParams);
        this.address = fields.address;
        this.isBaseCollateralEnabled = !baseLimit || baseLimit.gt(0);
        this.isPaused = fields.isPaused;
        this.spotPrice = fields.spotPrice;
        this.quoteToken = fields.quoteToken;
        this.baseToken = fields.baseToken;
        this.liquidityToken = fields.liquidityToken;
        this.name = fields.name;
        this.contractAddresses = fields.contractAddresses;
        const liveBoards = marketView.liveBoards;
        this.openInterest = liveBoards.reduce((sum, board) => {
            const longCallOpenInterest = board.strikes.reduce((sum, strike) => sum.add(strike.longCallOpenInterest), ZERO_BN);
            const shortCallOpenInterest = board.strikes.reduce((sum, strike) => sum.add(strike.shortCallBaseOpenInterest).add(strike.shortCallQuoteOpenInterest), ZERO_BN);
            const longPutOpenInterest = board.strikes.reduce((sum, strike) => sum.add(strike.longPutOpenInterest), ZERO_BN);
            const shortPutOpenInterest = board.strikes.reduce((sum, strike) => sum.add(strike.shortPutOpenInterest), ZERO_BN);
            return sum.add(longCallOpenInterest).add(shortCallOpenInterest).add(longPutOpenInterest).add(shortPutOpenInterest);
        }, ZERO_BN);
        this.params = fields.params;
        this.liveBoardsMap = liveBoards.reduce((map, boardView) => ({
            ...map,
            [boardView.boardId.toNumber()]: boardView,
        }), {});
    }
    // TODO: @dappbeast Remove getFields
    static getFields(version, network, marketView, isGlobalPaused, owner, tokenPrice, hedgerView, adapterView, poolHedgerParams, baseLimit) {
        var _a;
        const address = marketView.marketAddresses.optionMarket;
        const isPaused = (_a = marketView.isPaused) !== null && _a !== void 0 ? _a : isGlobalPaused;
        let spotPrice, quoteSymbol, baseSymbol, quoteDecimals, baseDecimals;
        let params;
        const pricingParams = marketView.marketParameters.pricingParams;
        const tradeLimitParams = marketView.marketParameters.tradeLimitParams;
        const minCollatParams = marketView.marketParameters.minCollatParams;
        const forceCloseParams = marketView.marketParameters.forceCloseParams;
        const varianceFeeParams = marketView.marketParameters.varianceFeeParams;
        const lpParams = marketView.marketParameters.lpParams;
        const sharedParams = {
            optionPriceFee1xPoint: pricingParams.optionPriceFee1xPoint.toNumber(),
            optionPriceFee2xPoint: pricingParams.optionPriceFee2xPoint.toNumber(),
            optionPriceFeeCoefficient: pricingParams.optionPriceFeeCoefficient,
            spotPriceFee1xPoint: pricingParams.spotPriceFee1xPoint.toNumber(),
            spotPriceFee2xPoint: pricingParams.spotPriceFee2xPoint.toNumber(),
            spotPriceFeeCoefficient: pricingParams.spotPriceFeeCoefficient,
            vegaFeeCoefficient: pricingParams.vegaFeeCoefficient,
            minDelta: tradeLimitParams.minDelta,
            shockVolA: minCollatParams.shockVolA,
            shockVolB: minCollatParams.shockVolB,
            shockVolPointA: minCollatParams.shockVolPointA,
            shockVolPointB: minCollatParams.shockVolPointB,
            minStaticQuoteCollateral: minCollatParams.minStaticQuoteCollateral,
            minStaticBaseCollateral: minCollatParams.minStaticBaseCollateral,
            callSpotPriceShock: minCollatParams.callSpotPriceShock,
            putSpotPriceShock: minCollatParams.putSpotPriceShock,
            standardSize: pricingParams.standardSize,
            skewAdjustmentFactor: pricingParams.skewAdjustmentFactor,
            minForceCloseDelta: tradeLimitParams.minForceCloseDelta,
            shortPostCutoffVolShock: forceCloseParams.shortPostCutoffVolShock,
            shortVolShock: forceCloseParams.shortVolShock,
            longPostCutoffVolShock: forceCloseParams.longPostCutoffVolShock,
            longVolShock: forceCloseParams.longVolShock,
            shortSpotMin: forceCloseParams.shortSpotMin,
            absMinSkew: tradeLimitParams.absMinSkew,
            absMaxSkew: tradeLimitParams.absMaxSkew,
            minSkew: tradeLimitParams.minSkew,
            maxSkew: tradeLimitParams.maxSkew,
            maxBaseIv: tradeLimitParams.maxBaseIV,
            maxVol: tradeLimitParams.maxVol,
            minBaseIv: tradeLimitParams.minBaseIV,
            minVol: tradeLimitParams.minVol,
            forceCloseVarianceFeeCoefficient: varianceFeeParams.forceCloseVarianceFeeCoefficient,
            defaultVarianceFeeCoefficient: varianceFeeParams.defaultVarianceFeeCoefficient,
            minimumStaticVega: varianceFeeParams.minimumStaticVega,
            vegaCoefficient: varianceFeeParams.vegaCoefficient,
            referenceSkew: varianceFeeParams.referenceSkew,
            minimumStaticSkewAdjustment: varianceFeeParams.minimumStaticSkewAdjustment,
            skewAdjustmentCoefficient: varianceFeeParams.skewAdjustmentCoefficient,
            minimumStaticIvVariance: varianceFeeParams.minimumStaticIvVariance,
            ivVarianceCoefficient: varianceFeeParams.ivVarianceCoefficient,
            withdrawalFee: lpParams.withdrawalFee,
            withdrawalDelay: lpParams.withdrawalDelay.toNumber(),
            depositDelay: lpParams.depositDelay.toNumber(),
            tradingCutoff: tradeLimitParams.tradingCutoff.toNumber(),
            NAV: marketView.liquidity.NAV,
            freeLiquidity: marketView.liquidity.freeLiquidity,
            tokenPrice,
            netStdVega: marketView.globalNetGreeks.netStdVega,
            netDelta: marketView.globalNetGreeks.netDelta,
            isGlobalPaused,
            isMarketPaused: marketView.isPaused,
            owner,
            poolHedgerParams: poolHedgerParams !== null && poolHedgerParams !== void 0 ? poolHedgerParams : marketView.marketParameters.poolHedgerParams,
            hedgerView: hedgerView !== null && hedgerView !== void 0 ? hedgerView : null,
            adapterView: adapterView !== null && adapterView !== void 0 ? adapterView : null,
            baseLimit,
        };
        if (version === Version.Avalon) {
            const avalonMarketView = marketView;
            spotPrice = avalonMarketView.exchangeParams.spotPrice;
            quoteSymbol = parseBytes32String(avalonMarketView.exchangeParams.quoteKey);
            baseSymbol = parseBytes32String(avalonMarketView.exchangeParams.baseKey);
            quoteDecimals = 18;
            baseDecimals = 18;
            params = {
                referenceSpotPrice: spotPrice,
                rateAndCarry: avalonMarketView.marketParameters.greekCacheParams.rateAndCarry,
                ...sharedParams,
            };
        }
        else {
            let newportMarketView;
            switch (network) {
                case Network.Arbitrum:
                    if (!adapterView || !hedgerView) {
                        throw new Error('Adapter or hedger view does not exist');
                    }
                    newportMarketView = marketView;
                    spotPrice = adapterView.gmxMaxPrice;
                    quoteSymbol = newportMarketView.quoteSymbol;
                    quoteDecimals = newportMarketView.quoteDecimals.toNumber();
                    baseSymbol = newportMarketView.baseSymbol;
                    baseDecimals = newportMarketView.baseDecimals.toNumber();
                    params = {
                        rateAndCarry: adapterView.rateAndCarry,
                        referenceSpotPrice: newportMarketView.spotPrice,
                        ...sharedParams,
                    };
                    break;
                case Network.Optimism:
                    if (!adapterView) {
                        throw new Error('Adapter or hedger view does not exist');
                    }
                    newportMarketView = marketView;
                    spotPrice = newportMarketView.spotPrice;
                    quoteSymbol = newportMarketView.quoteSymbol;
                    quoteDecimals = newportMarketView.quoteDecimals.toNumber();
                    baseSymbol = newportMarketView.baseSymbol;
                    baseDecimals = newportMarketView.baseDecimals.toNumber();
                    params = {
                        rateAndCarry: adapterView.riskFreeRate,
                        referenceSpotPrice: spotPrice,
                        ...sharedParams,
                    };
            }
        }
        const quoteAddress = marketView.marketAddresses.quoteAsset;
        const baseAddress = marketView.marketAddresses.baseAsset;
        const name = getMarketName(baseSymbol, quoteSymbol);
        const tradingCutoff = marketView.marketParameters.tradeLimitParams.tradingCutoff.toNumber();
        const depositDelay = marketView.marketParameters.lpParams.depositDelay.toNumber();
        const withdrawalDelay = marketView.marketParameters.lpParams.withdrawalDelay.toNumber();
        return {
            address,
            name,
            isPaused,
            spotPrice,
            tradingCutoff,
            quoteToken: {
                address: quoteAddress,
                symbol: quoteSymbol,
                decimals: quoteDecimals,
            },
            baseToken: {
                address: baseAddress,
                symbol: baseSymbol,
                decimals: baseDecimals,
            },
            liquidityToken: {
                address: marketView.marketAddresses.liquidityToken,
                symbol: `${baseSymbol}LP`,
                decimals: 18,
            },
            contractAddresses: marketView.marketAddresses,
            depositDelay,
            withdrawalDelay,
            params,
        };
    }
    // Getters
    static async get(lyra, marketAddressOrName) {
        if (lyra.version === Version.Avalon) {
            const [{ marketView, isGlobalPaused, owner }, block] = await Promise.all([
                fetchAvalonMarketView(lyra, marketAddressOrName),
                lyra.provider.getBlock('latest'),
            ]);
            return new Market(lyra, marketView, isGlobalPaused, owner, marketView.tokenPrice, block);
        }
        else {
            const market = (await Market.getAll(lyra)).find(market => market.isEqual(marketAddressOrName));
            if (!market) {
                throw new Error('Market does not exist');
            }
            return market;
        }
    }
    static async getMany(lyra, marketAddresses) {
        if (lyra.version === Version.Avalon) {
            const [marketViews, block] = await Promise.all([
                Promise.all(marketAddresses.map(marketAddress => fetchAvalonMarketView(lyra, marketAddress))),
                lyra.provider.getBlock('latest'),
            ]);
            return marketViews.map(({ marketView, isGlobalPaused, owner }) => {
                return new Market(lyra, marketView, isGlobalPaused, owner, marketView.tokenPrice, block);
            });
        }
        else {
            return (await Market.getAll(lyra)).filter(market => marketAddresses.includes(market.address));
        }
    }
    static async getAll(lyra) {
        if (lyra.version === Version.Avalon) {
            const marketAddresses = await fetchMarketAddresses(lyra);
            return await Market.getMany(lyra, marketAddresses.map(m => m.optionMarket));
        }
        else {
            const [{ marketViews, isGlobalPaused, owner }, block] = await Promise.all([
                lyra.network === Network.Arbitrum ? fetchNewportMarketViews(lyra) : fetchNewportOptimismMarketViews(lyra),
                lyra.provider.getBlock('latest'),
            ]);
            const markets = marketViews.map(({ marketView, hedgerView, adapterView, poolHedgerParams, tokenPrice, baseLimit }) => new Market(lyra, marketView, isGlobalPaused, owner, tokenPrice, block, hedgerView, adapterView, poolHedgerParams, baseLimit));
            return markets;
        }
    }
    static find(markets, marketAddressOrName) {
        return findMarket(markets, marketAddressOrName);
    }
    async refresh() {
        return await Market.get(this.lyra, this.address);
    }
    // Edges
    isEqual(marketAddressOrName) {
        return isMarketEqual(this, marketAddressOrName);
    }
    liveBoards() {
        return Object.values(this.liveBoardsMap)
            .map(boardView => {
            return new Board(this.lyra, this, boardView, this.block);
        })
            .filter(b => this.block.timestamp < b.expiryTimestamp)
            .sort((a, b) => a.expiryTimestamp - b.expiryTimestamp);
    }
    liveBoard(boardId) {
        const boardView = this.liveBoardsMap[boardId];
        if (!boardView) {
            throw new Error('Board is expired or does not exist for market');
        }
        return new Board(this.lyra, this, boardView, this.block);
    }
    async board(boardId) {
        try {
            // Attempt to return live board
            return this.liveBoard(boardId);
        }
        catch (_e) {
            const [boardView, block] = await Promise.all([
                getBoardView(this.lyra, this.address, boardId),
                this.lyra.provider.getBlock('latest'),
            ]);
            return new Board(this.lyra, this, boardView, block);
        }
    }
    liveStrike(strikeId) {
        const board = this.liveBoards().find(board => board.strikes().find(strike => strike.id === strikeId));
        const strike = board === null || board === void 0 ? void 0 : board.strikes().find(strike => strike.id === strikeId);
        if (!strike) {
            throw new Error('Strike is expired or does not exist for market');
        }
        return strike;
    }
    async strike(strikeId) {
        try {
            return this.liveStrike(strikeId);
        }
        catch (_e) {
            const [boardView, block] = await Promise.all([
                getBoardViewForStrikeId(this.lyra, this.address, strikeId),
                this.lyra.provider.getBlock('latest'),
            ]);
            const board = new Board(this.lyra, this, boardView, block);
            return board.strike(strikeId);
        }
    }
    liveOption(strikeId, isCall) {
        const strike = this.liveStrike(strikeId);
        return strike.option(isCall);
    }
    async option(strikeId, isCall) {
        const strike = await this.strike(strikeId);
        return strike.option(isCall);
    }
    async quote(strikeId, isCall, isBuy, size, options) {
        const market = await this.refresh();
        return market.quoteSync(strikeId, isCall, isBuy, size, options);
    }
    quoteSync(strikeId, isCall, isBuy, size, options) {
        return this.liveOption(strikeId, isCall).quoteSync(isBuy, size, options);
    }
    async quoteAll(size, options) {
        const market = await this.refresh();
        return market.quoteAllSync(size, options);
    }
    quoteAllSync(size, options) {
        return {
            boards: this.liveBoards().map(board => board.quoteAllSync(size, options)),
            market: this,
        };
    }
    contract(contractId) {
        return getLyraMarketContract(this.lyra, this.contractAddresses, this.lyra.version, contractId);
    }
    // Transactions
    async trade(owner, strikeId, isCall, isBuy, size, slippage, options) {
        return await Trade.get(this.lyra, owner, this.address, strikeId, isCall, isBuy, size, slippage, {
            ...options,
        });
    }
    approveDeposit(owner, amountQuote) {
        return LiquidityDeposit.approve(this, owner, amountQuote);
    }
    initiateDeposit(beneficiary, amountQuote) {
        return LiquidityDeposit.initiateDeposit(this, beneficiary, amountQuote);
    }
    initiateWithdraw(beneficiary, amountLiquidityTokens) {
        return LiquidityWithdrawal.initiateWithdraw(this, beneficiary, amountLiquidityTokens);
    }
    approveTradeQuote(owner, amountQuote) {
        return Trade.approveQuote(this, owner, amountQuote);
    }
    approveTradeBase(owner, amountBase) {
        return Trade.approveBase(this, owner, amountBase);
    }
    // Dynamic fields
    async liquidity() {
        return await fetchLatestLiquidity(this.lyra, this);
    }
    async netGreeks() {
        return await fetchLatestNetGreeks(this.lyra, this);
    }
    async liquidityHistory(options) {
        return await fetchLiquidityHistory(this.lyra, this, options);
    }
    async netGreeksHistory(options) {
        return await fetchNetGreeksHistory(this.lyra, this, options);
    }
    async tradingVolumeHistory(options) {
        return await fetchTradingVolumeHistory(this.lyra, this, options);
    }
    async spotPriceHistory(options) {
        return await fetchSpotPriceHistory(this.lyra, this, options);
    }
    async owner() {
        return await fetchMarketOwner(this.lyra, this.contractAddresses);
    }
    async deposits(owner) {
        return await LiquidityDeposit.getByOwner(this.lyra, this, owner);
    }
    async withdrawals(owner) {
        return await LiquidityWithdrawal.getByOwner(this.lyra, this, owner);
    }
}
//# sourceMappingURL=index.js.map