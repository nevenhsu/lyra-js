import Lyra from '..';
import { LyraGlobalContractId } from '../constants/contracts';
import { LyraGlobalContractMap } from '../constants/mappings';
export default function getGlobalContract<C extends LyraGlobalContractId>(lyra: Lyra, contractId: C): LyraGlobalContractMap[C];
