import { ClaimEvent } from '../account_reward_epoch';
import { Chain } from '../constants/chain';
import Lyra from '../lyra';
export default function fetchClaimEvents(lyra: Lyra, chain: Chain, address: string): Promise<ClaimEvent[]>;
