import { ClaimEvent } from '../account_reward_epoch';
import Lyra from '../lyra';
export default function fetchClaimEvents(lyra: Lyra, address: string): Promise<ClaimEvent[]>;
