import { Contract } from '@ethersproject/contracts';
import ERC20_ABI from '../contracts/common/abis/ERC20.json';
export default function getERC20Contract(provider, address) {
    return new Contract(address, ERC20_ABI, provider);
}
//# sourceMappingURL=getERC20Contract.js.map