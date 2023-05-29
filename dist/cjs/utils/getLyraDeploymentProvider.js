"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var providers_1 = require("@ethersproject/providers");
var getLyraDeploymentChainId_1 = __importDefault(require("./getLyraDeploymentChainId"));
var getLyraDeploymentRPCURL_1 = __importDefault(require("./getLyraDeploymentRPCURL"));
var getLyraDeploymentProvider = function (chain) {
    var rpcUrl = (0, getLyraDeploymentRPCURL_1.default)(chain);
    var chainId = (0, getLyraDeploymentChainId_1.default)(chain);
    return new providers_1.StaticJsonRpcProvider(rpcUrl, chainId);
};
exports.default = getLyraDeploymentProvider;
//# sourceMappingURL=getLyraDeploymentProvider.js.map