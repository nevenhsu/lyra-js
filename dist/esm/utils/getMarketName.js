export default function getMarketName(_baseSymbol, quoteSymbol) {
    let baseSymbol = _baseSymbol;
    switch (baseSymbol.toLowerCase()) {
        case 'weth':
            baseSymbol = 'ETH';
            break;
        case 'lyarb':
            baseSymbol = 'ARB';
            break;
    }
    return `${baseSymbol}-${quoteSymbol}`;
}
//# sourceMappingURL=getMarketName.js.map