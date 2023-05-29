import { Chain } from '../constants/chain';
import { Version } from '../lyra';
declare const getLyraDeploymentSubgraphURI: (chain: Chain, version: Version) => string;
export default getLyraDeploymentSubgraphURI;
