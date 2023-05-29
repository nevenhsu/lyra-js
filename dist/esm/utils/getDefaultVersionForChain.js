import { Chain, Version } from '..';
export default function getDefaultVersionForChain(chain) {
    switch (chain) {
        case Chain.Arbitrum:
        case Chain.ArbitrumGoerli:
        case Chain.Optimism:
        case Chain.OptimismGoerli:
            return Version.Newport;
    }
}
//# sourceMappingURL=getDefaultVersionForChain.js.map