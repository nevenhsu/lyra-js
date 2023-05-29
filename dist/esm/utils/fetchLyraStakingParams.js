import { LyraGlobalContractId } from '..';
import { SECONDS_IN_YEAR } from '../constants/time';
import COMMON_ETHEREUM_MAINNET_ADDRESS_MAP from '../contracts/common/addresses/ethereum.addresses.json';
import COMMON_ETHEREUM_GOERLI_MAINNET_ADDRESS_MAP from '../contracts/common/addresses/ethereum-goerli.addresses.json';
import fetchLyraPrice from './fetchLyraPrice';
import fromBigNumber from './fromBigNumber';
import getGlobalContract from './getGlobalContract';
import isTestnet from './isTestnet';
import multicall from './multicall';
import toBigNumber from './toBigNumber';
export default async function fetchLyraStakingParams(lyra) {
    const lyraStakingModuleContract = getGlobalContract(lyra, LyraGlobalContractId.LyraStakingModule, lyra.ethereumProvider);
    // Use direct staking token address, not proxy
    const stakedLyraAddress = (isTestnet(lyra) ? COMMON_ETHEREUM_GOERLI_MAINNET_ADDRESS_MAP : COMMON_ETHEREUM_MAINNET_ADDRESS_MAP)['LyraStakingModule'];
    const [{ returnData: [cooldownPeriod, unstakeWindow, totalSupplyBN, emissionsPerSecondBN], }, tokenPrice,] = await Promise.all([
        multicall(lyra, [
            {
                args: [],
                contract: lyraStakingModuleContract,
                function: 'COOLDOWN_SECONDS',
            },
            {
                args: [],
                contract: lyraStakingModuleContract,
                function: 'UNSTAKE_WINDOW',
            },
            {
                args: [],
                contract: lyraStakingModuleContract,
                function: 'totalSupply',
            },
            {
                args: [stakedLyraAddress],
                contract: lyraStakingModuleContract,
                function: 'assets',
            },
        ], lyra.ethereumProvider),
        fetchLyraPrice(lyra),
    ]);
    const totalSupply = fromBigNumber(totalSupplyBN);
    const tokenPerDollar = tokenPrice > 0 ? 1 / tokenPrice : 0;
    const pctSharePerDollar = totalSupply > 0 ? tokenPerDollar / totalSupply : 0;
    const emissionsPerSecond = fromBigNumber(emissionsPerSecondBN);
    const perDollarPerSecond = emissionsPerSecond * pctSharePerDollar;
    const apy = perDollarPerSecond * tokenPrice * SECONDS_IN_YEAR;
    return {
        cooldownPeriod: cooldownPeriod.toNumber(),
        unstakeWindow: unstakeWindow.toNumber(),
        totalSupply: totalSupplyBN,
        tokenPrice: toBigNumber(tokenPrice),
        apy,
    };
}
//# sourceMappingURL=fetchLyraStakingParams.js.map