import { Contract } from '@ethersproject/contracts';
import { Chain } from '..';
import { LyraGlobalContractId } from '../constants/contracts';
import MULTICALL_3_ABI from '../contracts/common/abis/Multicall3.json';
import MULTIDISTRIBUTOR_ABI from '../contracts/common/abis/MultiDistributor.json';
import COMMON_ARBITRUM_MAINNET_ADDRESS_MAP from '../contracts/common/addresses/arbitrum.addresses.json';
import COMMON_ARBITRUM_TESTNET_ADDRESS_MAP from '../contracts/common/addresses/arbitrum-goerli.addresses.json';
import COMMON_OPTIMISM_MAINNET_ADDRESS_MAP from '../contracts/common/addresses/optimism.addresses.json';
import COMMON_OPTIMISM_TESTNET_ADDRESS_MAP from '../contracts/common/addresses/optimism-goerli.addresses.json';
const getGlobalContractAddress = (lyra, contractId) => {
    switch (lyra.chain) {
        case Chain.Arbitrum:
            return COMMON_ARBITRUM_MAINNET_ADDRESS_MAP[contractId];
        case Chain.ArbitrumGoerli:
            return COMMON_ARBITRUM_TESTNET_ADDRESS_MAP[contractId];
        case Chain.Optimism:
            return COMMON_OPTIMISM_MAINNET_ADDRESS_MAP[contractId];
        case Chain.OptimismGoerli:
            return COMMON_OPTIMISM_TESTNET_ADDRESS_MAP[contractId];
    }
};
const getGlobalContractABI = (contractId) => {
    switch (contractId) {
        case LyraGlobalContractId.MultiDistributor:
            return MULTIDISTRIBUTOR_ABI;
        case LyraGlobalContractId.Multicall3:
            return MULTICALL_3_ABI;
    }
};
export default function getGlobalContract(lyra, contractId) {
    const { provider } = lyra;
    const address = getGlobalContractAddress(lyra, contractId);
    if (!address) {
        throw new Error('Contract does not exist for specified chain');
    }
    const abi = getGlobalContractABI(contractId);
    return new Contract(address, abi, provider);
}
//# sourceMappingURL=getGlobalContract.js.map