import { Deployment } from '../lyra';
import fetchWithCache from './fetchWithCache';
const EMPTY = [];
export default async function fetchGlobalRewardEpochData(lyra) {
    if (lyra.deployment !== Deployment.Mainnet) {
        return EMPTY;
    }
    return fetchWithCache(`${lyra.apiUri}/rewards/global?network=${lyra.network}&version=${lyra.version}`);
}
//# sourceMappingURL=fetchGlobalRewardEpochData.js.map