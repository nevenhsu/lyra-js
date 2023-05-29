import Lyra from '../lyra';
import { AccountBalances } from '.';
export default function fetchAccountBalancesAndAllowances(lyra: Lyra, owner: string): Promise<AccountBalances[]>;
