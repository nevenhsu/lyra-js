import fetch from 'cross-fetch';
const CACHE = {};
const CACHE_TIMEOUT = 10 * 1000;
async function fetcher(url) {
    const data = await fetch(url);
    return await data.json();
}
export default async function fetchWithCache(url) {
    const now = Date.now();
    if (!CACHE[url] || now > CACHE[url].lastUpdated + CACHE_TIMEOUT) {
        CACHE[url] = {
            fetch: fetcher(url),
            lastUpdated: now,
        };
    }
    return CACHE[url].fetch;
}
//# sourceMappingURL=fetchWithCache.js.map