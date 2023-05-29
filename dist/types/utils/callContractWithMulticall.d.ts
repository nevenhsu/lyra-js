import { JsonRpcProvider } from '@ethersproject/providers';
import { Contract } from 'ethers';
import Lyra from '..';
type MulticallData = {
    callData: string;
    contract: Contract;
    functionFragment: string;
};
export default function callContractWithMulticall<MulticallResponse>(lyra: Lyra, multicallData: MulticallData[], useCustomProvider?: JsonRpcProvider): Promise<MulticallResponse>;
export {};
