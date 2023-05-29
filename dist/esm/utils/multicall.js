import { LyraGlobalContractId } from '../constants/contracts';
import getGlobalContract from './getGlobalContract';
export default async function multicall(lyra, requests, customProvider) {
    const multicall3Contract = getGlobalContract(lyra, LyraGlobalContractId.Multicall3, customProvider ? customProvider : lyra.provider);
    const calls = requests.map(req => ({
        target: req.contract.address,
        callData: req.contract.interface.encodeFunctionData(req.function, req.args),
    }));
    const { returnData, blockNumber } = await multicall3Contract.callStatic.aggregate(calls);
    const result = requests.map((req, idx) => {
        const contract = req.contract;
        const result = contract.interface.decodeFunctionResult(req.function, returnData[idx]);
        return result[0];
    });
    return {
        returnData: result,
        blockNumber: blockNumber.toNumber(),
    };
}
//# sourceMappingURL=multicall.js.map