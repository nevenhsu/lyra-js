"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bn_1 = require("../constants/bn");
var getLiquidationPrice_1 = __importDefault(require("../utils/getLiquidationPrice"));
var getMaxCollateral_1 = __importDefault(require("../utils/getMaxCollateral"));
var getMinCollateralForSpotPrice_1 = __importDefault(require("../utils/getMinCollateralForSpotPrice"));
function getTradeCollateral(_a) {
    var option = _a.option, postTradeSize = _a.postTradeSize, _setCollateralTo = _a.setToCollateral, setToFullCollateral = _a.setToFullCollateral, isBaseCollateral = _a.isBaseCollateral;
    var isBase = option.isCall ? !!isBaseCollateral : false;
    if (postTradeSize.isZero()) {
        // Position is being closed
        return {
            amount: bn_1.ZERO_BN,
            min: bn_1.ZERO_BN,
            max: bn_1.ZERO_BN,
            isMin: false,
            isMax: false,
            liquidationPrice: null,
            isBase: isBase,
        };
    }
    var market = option.market();
    var spotPrice = market.spotPrice;
    var minCollateral = (0, getMinCollateralForSpotPrice_1.default)(option, postTradeSize, spotPrice, isBaseCollateral);
    var maxCollateral = (0, getMaxCollateral_1.default)(option.isCall, option.strike().strikePrice, postTradeSize, isBaseCollateral);
    if (maxCollateral && minCollateral.gt(maxCollateral)) {
        // Account for case where min collateral is greater than max
        maxCollateral = minCollateral;
    }
    var setToCollateral;
    // TODO: Maintain current position collateral
    if (setToFullCollateral) {
        if (!maxCollateral) {
            // No max collateral for cash-secured short calls
            throw new Error('Cannot fully collateralize a cash-secured short call');
        }
        setToCollateral = maxCollateral;
    }
    else {
        setToCollateral = _setCollateralTo !== null && _setCollateralTo !== void 0 ? _setCollateralTo : bn_1.ZERO_BN;
    }
    var isMin = setToCollateral.lte(minCollateral);
    var isMax = !!(maxCollateral && setToCollateral.gte(maxCollateral));
    var liquidationPrice = (0, getLiquidationPrice_1.default)(option, postTradeSize, setToCollateral, isBaseCollateral);
    return {
        amount: setToCollateral,
        isBase: isBase,
        max: maxCollateral,
        min: minCollateral,
        isMin: isMin,
        isMax: isMax,
        liquidationPrice: liquidationPrice,
    };
}
exports.default = getTradeCollateral;
//# sourceMappingURL=getTradeCollateral.js.map