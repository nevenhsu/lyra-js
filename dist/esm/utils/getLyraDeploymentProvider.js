import { StaticJsonRpcProvider } from '@ethersproject/providers';
import getLyraDeploymentChainId from './getLyraDeploymentChainId';
import getLyraDeploymentRPCURL from './getLyraDeploymentRPCURL';
const getLyraDeploymentProvider = (chain) => {
    const rpcUrl = getLyraDeploymentRPCURL(chain);
    const chainId = getLyraDeploymentChainId(chain);
    return new StaticJsonRpcProvider(rpcUrl, chainId);
};
export default getLyraDeploymentProvider;
//# sourceMappingURL=getLyraDeploymentProvider.js.map