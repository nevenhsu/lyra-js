import { ClaimAddedEvent } from '../account_reward_epoch';
import Lyra from '../lyra';
export default function fetchClaimAddedEvents(lyra: Lyra, address: string): Promise<ClaimAddedEvent[]>;
