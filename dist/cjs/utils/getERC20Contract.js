"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var contracts_1 = require("@ethersproject/contracts");
var ERC20_json_1 = __importDefault(require("../contracts/common/abis/ERC20.json"));
function getERC20Contract(provider, address) {
    return new contracts_1.Contract(address, ERC20_json_1.default, provider);
}
exports.default = getERC20Contract;
//# sourceMappingURL=getERC20Contract.js.map