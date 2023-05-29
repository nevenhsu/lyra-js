import { Chain } from '../constants/chain';
import Lyra from '../lyra';
declare const getLyraGovernanceSubgraphURI: (lyra: Lyra, chain: Chain | 'ethereum') => string;
export default getLyraGovernanceSubgraphURI;
