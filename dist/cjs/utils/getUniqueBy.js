"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getUniqueBy(array, by) {
    return array.filter(function (value, index, self) {
        return self.findIndex(function (item) { return by(item) === by(value); }) === index;
    });
}
exports.default = getUniqueBy;
//# sourceMappingURL=getUniqueBy.js.map