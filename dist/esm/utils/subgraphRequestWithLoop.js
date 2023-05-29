import { SNAPSHOT_RESULT_LIMIT } from '../constants/queries';
import subgraphRequest from './subgraphRequest';
// GraphQL supports 32 bit signed int, i.e. max 2^31 - 1
const MAX_SAFE_32_BIT_INT = 2147483647;
export default async function subgraphRequestWithLoop(lyra, query, variables, iteratorKey, batchOptions) {
    var _a;
    let allFound = false;
    let data = [];
    let min = variables.min;
    const limit = (_a = variables.limit) !== null && _a !== void 0 ? _a : SNAPSHOT_RESULT_LIMIT;
    while (!allFound) {
        const varArr = [];
        if (batchOptions) {
            // when you have absolute min and next min for a query, optimize with batching
            // e.g. querying positions by position ID, absolute min = 0 and next min = 1000
            const { batch, increment } = batchOptions;
            for (let b = 0; b < batch; b++) {
                varArr.push({
                    ...variables,
                    min,
                    max: Math.min(min + increment - 1, MAX_SAFE_32_BIT_INT),
                });
                min += increment;
            }
        }
        else {
            varArr.push({
                ...variables,
                limit,
                min,
            });
        }
        const batches = (await Promise.all(varArr.map(async (variables) => {
            const { data } = await subgraphRequest(lyra.subgraphClient, {
                query,
                variables,
            });
            return data;
        })))
            .filter(res => res != null)
            .map(res => Object.values(res)[0]);
        const lastBatch = batches[batches.length - 1];
        data = [...data, ...batches.flat()];
        if (!lastBatch || !lastBatch.length || lastBatch.length < limit) {
            allFound = true;
        }
        else {
            // Set skip to last iterator val
            min = lastBatch[lastBatch.length - 1][iteratorKey] + 1;
        }
    }
    return data;
}
//# sourceMappingURL=subgraphRequestWithLoop.js.map