import { Chain } from '../constants/chain';
const getLyraChainForChainId = (chainId) => {
    switch (chainId) {
        case 420:
            return Chain.OptimismGoerli;
        case 421613:
            return Chain.ArbitrumGoerli;
        case 10:
            return Chain.Optimism;
        case 42161:
            return Chain.Arbitrum;
        default:
            throw new Error('Chain ID is not supported by Lyra');
    }
};
export default getLyraChainForChainId;
//# sourceMappingURL=getLyraChainForChainId.js.map