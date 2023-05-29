import { AccountLyraBalances } from '../account';
import Lyra from '../lyra';
export default function fetchLyraBalances(lyra: Lyra, owner: string): Promise<AccountLyraBalances>;
