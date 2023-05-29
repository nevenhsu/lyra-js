export default function buildTx(provider, chainId, to, from, data) {
    return {
        to,
        data,
        from,
        chainId: chainId !== null && chainId !== void 0 ? chainId : provider.network.chainId,
    };
}
//# sourceMappingURL=buildTx.js.map