import { JsonRpcProvider } from '@ethersproject/providers';
import { ERC20 } from '../contracts/common/typechain/ERC20';
export default function getERC20Contract(provider: JsonRpcProvider, address: string): ERC20;
