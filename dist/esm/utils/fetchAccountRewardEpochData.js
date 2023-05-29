import { Deployment } from '../lyra';
import fetchWithCache from './fetchWithCache';
export default async function fetchAccountRewardEpochData(lyra, account) {
    if (lyra.deployment !== Deployment.Mainnet) {
        return [];
    }
    return fetchWithCache(`${lyra.apiUri}/rewards/account?network=${lyra.network}&account=${account}`);
}
//# sourceMappingURL=fetchAccountRewardEpochData.js.map