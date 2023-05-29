"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function buildTx(provider, chainId, to, from, data) {
    return {
        to: to,
        data: data,
        from: from,
        chainId: chainId !== null && chainId !== void 0 ? chainId : provider.network.chainId,
    };
}
exports.default = buildTx;
//# sourceMappingURL=buildTx.js.map