"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bn_1 = require("../constants/bn");
function getAverageCostPerOption(trades) {
    if (trades.length === 0) {
        return bn_1.ZERO_BN;
    }
    var currOpenSize = trades[0].size;
    var averageCostPerOption = trades[0].pricePerOption;
    for (var _i = 0, _a = trades.slice(1); _i < _a.length; _i++) {
        var trade = _a[_i];
        var prevOpenSize = currOpenSize;
        var size = trade.size, premium = trade.premium, isOpen = trade.isOpen;
        // Add or remove size from position
        currOpenSize = isOpen ? currOpenSize.add(size) : currOpenSize.sub(size);
        if (isOpen && currOpenSize.gt(0)) {
            var prevTotalCost = averageCostPerOption.mul(prevOpenSize).div(bn_1.UNIT);
            var newTotalCost = prevTotalCost.add(premium);
            averageCostPerOption = newTotalCost.mul(bn_1.UNIT).div(currOpenSize);
        }
    }
    return averageCostPerOption;
}
exports.default = getAverageCostPerOption;
//# sourceMappingURL=getAverageCostPerOption.js.map