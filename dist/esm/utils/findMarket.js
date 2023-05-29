import isMarketEqual from './isMarketEqual';
export default function findMarket(markets, marketAddressOrName) {
    const market = Object.values(markets).find(market => isMarketEqual(market, marketAddressOrName));
    return market !== null && market !== void 0 ? market : null;
}
//# sourceMappingURL=findMarket.js.map