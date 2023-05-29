import { BigNumber } from 'ethers';
import fetchWithCache from './fetchWithCache';
import isTestnet from './isTestnet';
export default async function fetchLyraBalances(lyra, owner) {
    const testnet = isTestnet(lyra);
    const data = await fetchWithCache(`${lyra.apiUri}/lyra-balances?&owner=${owner}&testnet=${testnet}`);
    return {
        ethereumLyra: BigNumber.from(data.mainnetLYRA),
        optimismLyra: BigNumber.from(data.opLYRA),
        arbitrumLyra: BigNumber.from(data.arbitrumLYRA),
        optimismOldStkLyra: BigNumber.from(data.opOldStkLYRA),
        ethereumStkLyra: BigNumber.from(data.mainnetStkLYRA),
        optimismStkLyra: BigNumber.from(data.opStkLYRA),
        arbitrumStkLyra: BigNumber.from(data.arbitrumStkLYRA),
        stakingAllowance: BigNumber.from(data.stakingAllowance),
    };
}
//# sourceMappingURL=fetchLyraBalances.js.map