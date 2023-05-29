import { JsonRpcProvider } from '@ethersproject/providers';
import { Contract } from 'ethers';
import Lyra from '..';
export type MulticallRequest<C extends Contract = Contract, F extends keyof C['functions'] & string = string> = {
    contract: C;
    function: F;
    args: Parameters<C['functions'][F]>;
};
type MulticallResponse<R extends MulticallRequest> = Awaited<ReturnType<R['contract']['functions'][R['function']]>>[0];
type MulticallResponses<Reqs extends MulticallRequest[]> = {
    [K in keyof Reqs]: MulticallResponse<Reqs[K]>;
};
export default function multicall<Reqs extends MulticallRequest[]>(lyra: Lyra, requests: Reqs, customProvider?: JsonRpcProvider): Promise<{
    returnData: MulticallResponses<Reqs>;
    blockNumber: number;
}>;
export {};
