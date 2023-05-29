import { JsonRpcProvider } from '@ethersproject/providers';
import { Chain } from '../constants/chain';
declare const getLyraDeploymentProvider: (chain: Chain) => JsonRpcProvider;
export default getLyraDeploymentProvider;
