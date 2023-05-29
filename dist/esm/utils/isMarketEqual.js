import { getAddress, isAddress } from '@ethersproject/address';
import parseBaseSymbol from './parseBaseSymbol';
export default function isMarketEqual(market, marketAddressOrName) {
    if (isAddress(marketAddressOrName)) {
        return market.address === getAddress(marketAddressOrName);
    }
    else {
        return market.baseToken.symbol.toLowerCase() === parseBaseSymbol(market.lyra, marketAddressOrName).toLowerCase();
    }
}
//# sourceMappingURL=isMarketEqual.js.map