import fetchWithCache from './fetchWithCache';
export default async function fetchLyraPrice(lyra) {
    const res = await fetchWithCache(`${lyra.apiUri}/lyra-price`);
    return res.spotPrice;
}
//# sourceMappingURL=fetchLyraPrice.js.map