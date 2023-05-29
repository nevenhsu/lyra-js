import { LyraGlobalContractId } from '../constants/contracts';
import getGlobalContract from './getGlobalContract';
export default async function callContractWithMulticall(lyra, multicallData, useCustomProvider) {
    const multicall3Contract = getGlobalContract(lyra, LyraGlobalContractId.Multicall3, useCustomProvider ? useCustomProvider : lyra.provider);
    const calls = multicallData.map(data => {
        return {
            target: data.contract.address,
            callData: data.callData,
        };
    });
    const multicallResponse = await multicall3Contract.callStatic.aggregate(calls);
    let responseCount = 0;
    const result = multicallData.reduce((result, data) => {
        const contract = data.contract;
        const functionResult = contract.interface.decodeFunctionResult(data.functionFragment, multicallResponse[1][responseCount]);
        responseCount++;
        result.push(functionResult);
        return result;
    }, []);
    return result;
}
//# sourceMappingURL=callContractWithMulticall.js.map