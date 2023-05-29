import { Chain } from '../constants/chain';
import { Deployment } from '../constants/contracts';
declare const getLyraDeploymentForChain: (chain: Chain | 'ethereum') => Deployment;
export default getLyraDeploymentForChain;
