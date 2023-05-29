import findMarket from './findMarket';
export default function findMarketX(markets, marketAddressOrName) {
    const market = findMarket(markets, marketAddressOrName);
    if (!market) {
        throw new Error('Failed to find market');
    }
    return market;
}
//# sourceMappingURL=findMarketX.js.map