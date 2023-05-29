import { LyraMarketContractId } from '../constants/contracts';
import getLyraMarketContract from './getLyraMarketContract';
export default function getLyraMarketContractForAddress(lyra, version, marketContractAddresses, address) {
    const keyValPair = Object.entries(marketContractAddresses).find(([key, val]) => isNaN(parseInt(key)) && val === address);
    if (!keyValPair) {
        return null;
    }
    const [key] = keyValPair;
    let contractId;
    switch (key) {
        case 'optionMarketPricer':
            contractId = LyraMarketContractId.OptionMarketPricer;
            break;
        case 'liquidityPool':
            contractId = LyraMarketContractId.LiquidityPool;
            break;
        case 'liquidityToken':
            contractId = LyraMarketContractId.LiquidityToken;
            break;
        case 'greekCache':
            contractId = LyraMarketContractId.OptionGreekCache;
            break;
        case 'optionMarket':
            contractId = LyraMarketContractId.OptionMarket;
            break;
        case 'optionToken':
            contractId = LyraMarketContractId.OptionToken;
            break;
        case 'shortCollateral':
            contractId = LyraMarketContractId.ShortCollateral;
            break;
        case 'poolHedger':
            contractId = LyraMarketContractId.PoolHedger;
            break;
    }
    if (!contractId) {
        return null;
    }
    return {
        contractId,
        contract: getLyraMarketContract(lyra, marketContractAddresses, version, contractId),
    };
}
//# sourceMappingURL=getLyraMarketContractForAddress.js.map