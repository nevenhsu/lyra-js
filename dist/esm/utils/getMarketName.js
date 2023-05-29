export default function getMarketName(_baseSymbol, quoteSymbol) {
    let baseSymbol = _baseSymbol;
    if (baseSymbol.toLowerCase() === 'weth') {
        baseSymbol = 'ETH';
    }
    return `${baseSymbol}-${quoteSymbol}`;
}
//# sourceMappingURL=getMarketName.js.map