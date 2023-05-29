"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require(".");
function getTradeDisabledReason(_a) {
    var isOpen = _a.isOpen, owner = _a.owner, size = _a.size, newSize = _a.newSize, quote = _a.quote, position = _a.position, collateral = _a.collateral, balances = _a.balances, quoteTransfer = _a.quoteTransfer, baseTransfer = _a.baseTransfer;
    if (quote.disabledReason) {
        // Hack: QuoteDisabledReason overlaps with TradeDisabledReason
        var disabledReason = quote.disabledReason;
        if (disabledReason === _1.TradeDisabledReason.EmptySize &&
            (position === null || position === void 0 ? void 0 : position.collateral) &&
            collateral &&
            !collateral.amount.eq(position.collateral.amount)) {
            // Skip disabled flag for collateral adjustments
        }
        else if (disabledReason === _1.TradeDisabledReason.InsufficientLiquidity && !isOpen) {
            // Skip disabled flag for closing trades with insufficient liquidity
        }
        else {
            return disabledReason;
        }
    }
    if ((position && position.owner !== owner) || balances.owner !== owner) {
        // Not correct owner
        return _1.TradeDisabledReason.IncorrectOwner;
    }
    if (position) {
        if (!position.isOpen) {
            // Position is already closed
            return _1.TradeDisabledReason.PositionClosed;
        }
        else if (!isOpen && size.gt(position.size)) {
            // Trying to close more than is open
            return _1.TradeDisabledReason.PositionNotLargeEnough;
        }
        else if (!isOpen && newSize.isZero() && collateral && !collateral.amount.isZero()) {
            // Trying to close completely without removing all collateral
            return _1.TradeDisabledReason.PositionClosedLeftoverCollateral;
        }
    }
    if (quoteTransfer.gt(0)) {
        if (balances.quoteAsset.balance.lt(quoteTransfer)) {
            return _1.TradeDisabledReason.InsufficientQuoteBalance;
        }
        else if (balances.quoteAsset.tradeAllowance.lt(quoteTransfer)) {
            return _1.TradeDisabledReason.InsufficientQuoteAllowance;
        }
    }
    if (baseTransfer.gt(0)) {
        if (balances.baseAsset.balance.lt(baseTransfer)) {
            return _1.TradeDisabledReason.InsufficientBaseBalance;
        }
        else if (balances.baseAsset.tradeAllowance.lt(baseTransfer)) {
            return _1.TradeDisabledReason.InsufficientBaseAllowance;
        }
    }
    if (((isOpen && !quote.isBuy) || (position && !position.isLong)) &&
        (!collateral || (position && !quote.isBuy && newSize.isZero() && collateral.amount.isZero()))) {
        return _1.TradeDisabledReason.EmptyCollateral;
    }
    else if (newSize.gt(0) && collateral && collateral.amount.lt(collateral.min)) {
        return _1.TradeDisabledReason.NotEnoughCollateral;
    }
    else if (newSize.gt(0) && collateral && collateral.max && collateral.amount.gt(collateral.max)) {
        return _1.TradeDisabledReason.TooMuchCollateral;
    }
    return null;
}
exports.default = getTradeDisabledReason;
//# sourceMappingURL=getTradeDisabledReason.js.map