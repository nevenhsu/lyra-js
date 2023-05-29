import { Chain } from '../constants/chain';
import { Deployment } from '../constants/contracts';
const getLyraDeploymentForChain = (chain) => {
    switch (chain) {
        case Chain.Arbitrum:
        case Chain.Optimism:
            return Deployment.Mainnet;
        case Chain.OptimismGoerli:
        case Chain.ArbitrumGoerli:
            return Deployment.Testnet;
    }
};
export default getLyraDeploymentForChain;
//# sourceMappingURL=getLyraDeploymentForChain.js.map