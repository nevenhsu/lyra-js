"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZERO_ADDRESS = exports.MAX_BN = exports.ONE_BN = exports.UNIT = exports.ZERO_BN = void 0;
var bignumber_1 = require("@ethersproject/bignumber");
exports.ZERO_BN = bignumber_1.BigNumber.from(0);
exports.UNIT = bignumber_1.BigNumber.from(10).pow(18);
exports.ONE_BN = bignumber_1.BigNumber.from(1).mul(exports.UNIT);
exports.MAX_BN = bignumber_1.BigNumber.from(2).pow(256).sub(1);
exports.ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
//# sourceMappingURL=bn.js.map