import fetchAllPositionDataByOwner from './fetchAllPositionDataByOwner';
import fetchOpenPositionDataByOwner from './fetchOpenPositionDataByOwner';
import getUniqueBy from './getUniqueBy';
export default async function fetchPositionDataByOwner(lyra, owner) {
    const markets = await lyra.markets();
    const [openPositions, allPositions] = await Promise.all([
        // Contract (realtime) data
        fetchOpenPositionDataByOwner(lyra, owner, markets),
        // Subgraph data
        fetchAllPositionDataByOwner(lyra, owner, markets),
    ]);
    const positions = openPositions.concat(allPositions);
    // Prefer position struct data over position subgrpah data
    return getUniqueBy(positions, p => p.id);
}
//# sourceMappingURL=fetchPositionDataByOwner.js.map