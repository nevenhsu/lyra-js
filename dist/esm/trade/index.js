import { BigNumber } from '@ethersproject/bignumber';
import { MAX_BN, UNIT, ZERO_ADDRESS, ZERO_BN } from '../constants/bn';
import { DataSource, DEFAULT_ITERATIONS, LyraMarketContractId } from '../constants/contracts';
import { Version } from '../lyra';
import { Position } from '../position';
import { Quote, QuoteDisabledReason } from '../quote';
import buildTx from '../utils/buildTx';
import { from18DecimalBN } from '../utils/convertBNDecimals';
import fromBigNumber from '../utils/fromBigNumber';
import getAverageCollateralSpotPrice from '../utils/getAverageCollateralSpotPrice';
import getAverageCostPerOption from '../utils/getAverageCostPerOption';
import getBreakEvenPrice from '../utils/getBreakEvenPrice';
import getERC20Contract from '../utils/getERC20Contract';
import getLyraMarketContract from '../utils/getLyraMarketContract';
import getOptionType from '../utils/getOptionType';
import getProjectedSettlePnl from '../utils/getProjectedSettlePnl';
import getTradePnl from '../utils/getTradePnl';
import parsePartialPositionUpdatedEventsFromLogs from '../utils/parsePartialPositionUpdatedEventsFromLogs';
import parsePartialTradeEventsFromLogs from '../utils/parsePartialTradeEventsFromLogs';
import toBigNumber from '../utils/toBigNumber';
import getMaxLoss from './getMaxLoss';
import getMaxProfit from './getMaxProfit';
import getTradeCollateral from './getTradeCollateral';
import getTradeDisabledReason from './getTradeDisabledReason';
export var TradeDisabledReason;
(function (TradeDisabledReason) {
    TradeDisabledReason["EmptySize"] = "EmptySize";
    TradeDisabledReason["Expired"] = "Expired";
    TradeDisabledReason["TradingCutoff"] = "TradingCutoff";
    TradeDisabledReason["InsufficientLiquidity"] = "InsufficientLiquidity";
    TradeDisabledReason["DeltaOutOfRange"] = "DeltaOutOfRange";
    TradeDisabledReason["VolTooHigh"] = "VolTooHigh";
    TradeDisabledReason["VolTooLow"] = "VolTooLow";
    TradeDisabledReason["IVTooHigh"] = "IVTooHigh";
    TradeDisabledReason["IVTooLow"] = "IVTooLow";
    TradeDisabledReason["SkewTooHigh"] = "SkewTooHigh";
    TradeDisabledReason["SkewTooLow"] = "SkewTooLow";
    TradeDisabledReason["NotEnoughCollateral"] = "NotEnoughCollateral";
    TradeDisabledReason["TooMuchCollateral"] = "TooMuchCollateral";
    TradeDisabledReason["EmptyCollateral"] = "EmptyCollateral";
    TradeDisabledReason["IncorrectOwner"] = "IncorrectOwner";
    TradeDisabledReason["PositionClosed"] = "PositionClosed";
    TradeDisabledReason["PositionNotLargeEnough"] = "PositionNotLargeEnough";
    TradeDisabledReason["PositionClosedLeftoverCollateral"] = "PositionClosedLeftoverCollateral";
    TradeDisabledReason["InsufficientQuoteAllowance"] = "InsufficientQuoteAllowance";
    TradeDisabledReason["InsufficientBaseAllowance"] = "InsufficientBaseAllowance";
    TradeDisabledReason["InsufficientQuoteBalance"] = "InsufficientQuoteBalance";
    TradeDisabledReason["InsufficientBaseBalance"] = "InsufficientBaseBalance";
    TradeDisabledReason["UnableToHedgeDelta"] = "UnableToHedgeDelta";
    TradeDisabledReason["PriceVarianceTooHigh"] = "PriceVarianceTooHigh";
})(TradeDisabledReason || (TradeDisabledReason = {}));
export class Trade {
    constructor(lyra, owner, option, isBuy, size, slippage, balances, options) {
        var _a, _b, _c, _d, _e, _f;
        this.__source = DataSource.ContractCall;
        const { position, setToCollateral = ZERO_BN, setToFullCollateral = false, iterations = DEFAULT_ITERATIONS, isBaseCollateral: _isBaseCollateral, referrer = ZERO_ADDRESS, } = options !== null && options !== void 0 ? options : {};
        this.__option = option;
        this.__position = position;
        this.__balances = balances;
        const strike = option.strike();
        const market = option.market();
        const board = option.board();
        // References
        this.lyra = lyra;
        this.marketName = market.name;
        this.marketAddress = market.address;
        this.expiryTimestamp = board.expiryTimestamp;
        this.boardId = board.id;
        this.strikePrice = strike.strikePrice;
        this.strikeId = strike.id;
        this.isCall = option.isCall;
        this.positionId = position === null || position === void 0 ? void 0 : position.id;
        // Check if opening or closing active position
        this.isBuy = isBuy;
        this.isOpen = position ? (isBuy && position.isLong) || (!isBuy && !position.isLong) : true;
        this.owner = owner;
        this.isLong = position ? position.isLong : isBuy;
        const isBaseCollateral = position ? (_a = position.collateral) === null || _a === void 0 ? void 0 : _a.isBase : _isBaseCollateral;
        this.size = size;
        let quote = Quote.getSync(lyra, option, this.isBuy, this.size, {
            iterations,
            isOpen: this.isOpen,
            isLong: this.isLong,
        });
        if (!this.isOpen &&
            (quote.disabledReason === QuoteDisabledReason.DeltaOutOfRange ||
                quote.disabledReason === QuoteDisabledReason.TradingCutoff ||
                quote.disabledReason === QuoteDisabledReason.PriceVarianceTooHigh)) {
            // Retry quote with force close flag
            quote = Quote.getSync(lyra, option, this.isBuy, this.size, {
                iterations,
                isOpen: this.isOpen,
                isLong: this.isLong,
                isForceClose: true,
            });
        }
        this.isForceClose = quote.isForceClose;
        this.iv = quote.iv;
        this.fairIv = quote.fairIv;
        this.greeks = quote.greeks;
        this.fee = quote.fee;
        this.feeComponents = quote.feeComponents;
        this.forceClosePenalty = quote.forceClosePenalty;
        this.spotPrice = quote.spotPrice;
        this.iterations = quote.iterations;
        // Initialize tokens
        this.quoteToken = {
            ...market.quoteToken,
            transfer: ZERO_BN,
            receive: ZERO_BN,
            balance: balances.quoteAsset.balance,
            newBalance: balances.quoteAsset.balance,
        };
        this.baseToken = {
            ...market.baseToken,
            transfer: ZERO_BN,
            receive: ZERO_BN,
            balance: balances.baseAsset.balance,
            newBalance: balances.baseAsset.balance,
        };
        this.quoted = quote.premium;
        this.pricePerOption = ZERO_BN;
        this.premium = ZERO_BN;
        this.newSize = position ? (this.isOpen ? position.size.add(size) : position.size.sub(size)) : size;
        if (this.newSize.lt(0)) {
            this.newSize = ZERO_BN;
        }
        this.prevSize = (_b = position === null || position === void 0 ? void 0 : position.size) !== null && _b !== void 0 ? _b : ZERO_BN;
        const minOrMaxPremium = quote.premium.mul(toBigNumber(isBuy ? 1 + slippage : 1 - slippage)).div(UNIT);
        this.slippage = slippage
            ? slippage
            : minOrMaxPremium.gt(0)
                ? 1 - fromBigNumber(quote.premium.mul(UNIT).div(minOrMaxPremium))
                : 0;
        // Use min/max premium for true price per option
        this.premium = minOrMaxPremium;
        this.pricePerOption = size.gt(0) ? this.premium.mul(UNIT).div(size) : ZERO_BN;
        let netQuoteTransfer = this.quoteToken.transfer;
        let netBaseTransfer = this.baseToken.transfer;
        if (isBuy) {
            // Transferring premium to AMM
            netQuoteTransfer = netQuoteTransfer.add(this.premium);
        }
        else {
            // Receiveing premium from AMM
            netQuoteTransfer = netQuoteTransfer.sub(this.premium);
        }
        // If opening a short position or modifying an existing short position, check collateral
        if ((this.isOpen && !this.isBuy) || (position && !position.isLong)) {
            this.collateral = getTradeCollateral({
                option: option,
                postTradeSize: this.newSize,
                setToCollateral,
                setToFullCollateral,
                isBaseCollateral,
            });
            // Get collateral change
            const collateralDiff = this.collateral.amount.sub((_d = (_c = position === null || position === void 0 ? void 0 : position.collateral) === null || _c === void 0 ? void 0 : _c.amount) !== null && _d !== void 0 ? _d : ZERO_BN);
            if (this.collateral.isBase) {
                netBaseTransfer = netBaseTransfer.add(collateralDiff);
            }
            else {
                netQuoteTransfer = netQuoteTransfer.add(collateralDiff);
            }
        }
        if (netQuoteTransfer.gt(0)) {
            this.quoteToken.transfer = from18DecimalBN(netQuoteTransfer, this.quoteToken.decimals);
        }
        else {
            this.quoteToken.receive = from18DecimalBN(netQuoteTransfer.abs(), this.quoteToken.decimals);
        }
        if (netBaseTransfer.gt(0)) {
            this.baseToken.transfer = from18DecimalBN(netBaseTransfer, this.baseToken.decimals);
        }
        else {
            this.baseToken.receive = from18DecimalBN(netBaseTransfer.abs(), this.baseToken.decimals);
        }
        this.quoteToken.newBalance = this.quoteToken.transfer.gt(0)
            ? this.quoteToken.balance.sub(this.quoteToken.transfer)
            : this.quoteToken.balance.add(this.quoteToken.receive);
        this.baseToken.newBalance = this.baseToken.transfer.gt(0)
            ? this.baseToken.balance.sub(this.baseToken.transfer)
            : this.baseToken.balance.add(this.baseToken.receive);
        this.isCollateralUpdate = !!(this.collateral && this.size.isZero() && this.collateral.amount.gt(0));
        const strikeIdBN = BigNumber.from(strike.id);
        const positionIdBN = position ? BigNumber.from(position.id) : ZERO_BN;
        const iterationsBN = BigNumber.from(iterations);
        const amount = size;
        const optionType = getOptionType(option.isCall, this.isLong, !!isBaseCollateral);
        const setCollateralTo = (_f = (_e = this.collateral) === null || _e === void 0 ? void 0 : _e.amount) !== null && _f !== void 0 ? _f : ZERO_BN;
        const minTotalCost = !isBuy && minOrMaxPremium.gt(ZERO_BN) ? minOrMaxPremium : ZERO_BN;
        const maxTotalCost = isBuy ? minOrMaxPremium : MAX_BN;
        this.contract = getLyraMarketContract(lyra, market.contractAddresses, lyra.version, LyraMarketContractId.OptionMarket);
        this.method =
            this.isOpen || this.isCollateralUpdate
                ? 'openPosition'
                : !this.isForceClose
                    ? 'closePosition'
                    : 'forceClosePosition';
        if (lyra.version === Version.Avalon) {
            this.params = [
                {
                    strikeId: strikeIdBN,
                    positionId: positionIdBN,
                    iterations: iterationsBN,
                    optionType,
                    amount,
                    setCollateralTo,
                    minTotalCost,
                    maxTotalCost,
                },
            ];
        }
        else {
            this.params = [
                {
                    strikeId: strikeIdBN,
                    positionId: positionIdBN,
                    iterations: iterationsBN,
                    optionType,
                    amount,
                    setCollateralTo,
                    minTotalCost,
                    maxTotalCost,
                    referrer: referrer,
                },
            ];
        }
        this.data = this.contract.interface.encodeFunctionData(this.method, this.params);
        this.disabledReason = getTradeDisabledReason({
            isOpen: this.isOpen,
            owner: this.owner,
            size: this.size,
            newSize: this.newSize,
            quote,
            position,
            collateral: this.collateral,
            balances,
            quoteTransfer: this.quoteToken.transfer,
            baseTransfer: this.baseToken.transfer,
        });
        this.isDisabled = !!this.disabledReason;
        this.tx = buildTx(this.lyra.provider, this.lyra.provider.network.chainId, getLyraMarketContract(lyra, market.contractAddresses, lyra.version, LyraMarketContractId.OptionMarket).address, owner, this.data);
    }
    // Getters
    static async get(lyra, owner, marketAddressOrName, strikeId, isCall, isBuy, size, slippage, options) {
        const maybeFetchPosition = async () => (options === null || options === void 0 ? void 0 : options.positionId) ? await Position.get(lyra, marketAddressOrName, options.positionId) : undefined;
        const [position, balances] = await Promise.all([
            maybeFetchPosition(),
            lyra.account(owner).marketBalances(marketAddressOrName),
        ]);
        const option = balances.market.liveOption(strikeId, isCall);
        return new Trade(lyra, owner, option, isBuy, size, slippage, balances, {
            ...options,
            position,
        });
    }
    static getSync(lyra, owner, option, isBuy, size, slippage, balances, options) {
        return new Trade(lyra, owner, option, isBuy, size, slippage, balances, options);
    }
    // Helper Functions
    static getPositionIdsForLogs(logs, network) {
        const trades = parsePartialTradeEventsFromLogs(logs, network);
        const updates = parsePartialPositionUpdatedEventsFromLogs(logs, network);
        const positionIds = [
            ...trades.map(t => t.args.positionId.toNumber()),
            ...updates.map(u => u.args.positionId.toNumber()),
        ];
        return Array.from(new Set(positionIds));
    }
    static getEventsForLogs(logs, network) {
        const trades = parsePartialTradeEventsFromLogs(logs, network);
        const updates = parsePartialPositionUpdatedEventsFromLogs(logs, network);
        return { trades, updates };
    }
    // Transactions
    static approveQuote(market, owner, amountQuote) {
        const optionMarket = getLyraMarketContract(market.lyra, market.contractAddresses, market.lyra.version, LyraMarketContractId.OptionMarket);
        const erc20 = getERC20Contract(market.lyra.provider, market.quoteToken.address);
        const data = erc20.interface.encodeFunctionData('approve', [optionMarket.address, amountQuote]);
        return buildTx(market.lyra.provider, market.lyra.provider.network.chainId, erc20.address, owner, data);
    }
    approveQuote(amountQuote) {
        return Trade.approveQuote(this.market(), this.owner, amountQuote);
    }
    static approveBase(market, owner, amountBase) {
        const optionMarket = getLyraMarketContract(market.lyra, market.contractAddresses, market.lyra.version, LyraMarketContractId.OptionMarket);
        const erc20 = getERC20Contract(market.lyra.provider, market.baseToken.address);
        const data = erc20.interface.encodeFunctionData('approve', [optionMarket.address, amountBase]);
        return buildTx(market.lyra.provider, market.lyra.provider.network.chainId, erc20.address, owner, data);
    }
    approveBase(amountBase) {
        return Trade.approveBase(this.market(), this.owner, amountBase);
    }
    // Dynamic Fields
    pnl() {
        const position = this.__position;
        return position ? getTradePnl(position, this) : ZERO_BN;
    }
    newAverageCostPerOption() {
        const position = this.__position;
        const trades = position ? position.trades().concat([this]) : [this];
        return getAverageCostPerOption(trades);
    }
    prevAverageCostPerOption() {
        const position = this.__position;
        return position ? getAverageCostPerOption(position.trades()) : ZERO_BN;
    }
    newAverageCollateralSpotPrice() {
        if (this.isLong) {
            return ZERO_BN;
        }
        const position = this.__position;
        if (!position) {
            return this.market().spotPrice;
        }
        const collateralUpdates = position.collateralUpdates().concat([this]);
        return getAverageCollateralSpotPrice(position, collateralUpdates);
    }
    prevAverageCollateralSpotPrice() {
        const position = this.__position;
        if (this.isLong || !position) {
            return ZERO_BN;
        }
        const collateralUpdates = position.collateralUpdates();
        return position ? getAverageCollateralSpotPrice(position, collateralUpdates) : ZERO_BN;
    }
    prevCollateralAmount() {
        var _a;
        if (this.isLong || !this.__position) {
            return ZERO_BN;
        }
        const collateralUpdates = this.__position.collateralUpdates();
        const prevCollateralUpdate = collateralUpdates.length ? collateralUpdates[collateralUpdates.length - 1] : null;
        return (_a = prevCollateralUpdate === null || prevCollateralUpdate === void 0 ? void 0 : prevCollateralUpdate.amount) !== null && _a !== void 0 ? _a : ZERO_BN;
    }
    collateralChangeAmount() {
        var _a, _b, _c;
        if (this.isLong) {
            return ZERO_BN;
        }
        const prevCollateralAmount = this.prevCollateralAmount();
        const currCollateralAmount = (_c = (_b = (_a = this.__position) === null || _a === void 0 ? void 0 : _a.collateral) === null || _b === void 0 ? void 0 : _b.amount) !== null && _c !== void 0 ? _c : ZERO_BN;
        return currCollateralAmount.sub(prevCollateralAmount);
    }
    payoff(spotPriceAtExpiry) {
        var _a;
        return getProjectedSettlePnl(this.isLong, this.option().isCall, this.strike().strikePrice, spotPriceAtExpiry, this.newAverageCostPerOption(), this.newSize, (_a = this.collateral) === null || _a === void 0 ? void 0 : _a.liquidationPrice);
    }
    breakEven() {
        var _a;
        return getBreakEvenPrice(this.isCall, this.strikePrice, this.pricePerOption, !!((_a = this.collateral) === null || _a === void 0 ? void 0 : _a.isBase));
    }
    maxProfit() {
        return getMaxProfit(this);
    }
    maxLoss() {
        return getMaxLoss(this);
    }
    // Edges
    market() {
        return this.__option.market();
    }
    board() {
        return this.__option.board();
    }
    strike() {
        return this.__option.strike();
    }
    option() {
        return this.__option;
    }
    position() {
        var _a;
        return (_a = this.__position) !== null && _a !== void 0 ? _a : null;
    }
    balances() {
        return this.__balances;
    }
}
//# sourceMappingURL=index.js.map