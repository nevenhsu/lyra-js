import { Chain } from '../';
export default function isTestnet(lyra) {
    switch (lyra.chain) {
        case Chain.Arbitrum:
        case Chain.Optimism:
            return false;
        case Chain.ArbitrumGoerli:
        case Chain.OptimismGoerli:
            return true;
    }
}
//# sourceMappingURL=isTestnet.js.map