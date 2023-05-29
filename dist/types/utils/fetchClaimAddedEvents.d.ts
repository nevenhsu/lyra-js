import { ClaimAddedEvent } from '../account_reward_epoch';
import { Chain } from '../constants/chain';
import Lyra from '../lyra';
export default function fetchClaimAddedEvents(lyra: Lyra, chain: Chain, address: string): Promise<ClaimAddedEvent[]>;
