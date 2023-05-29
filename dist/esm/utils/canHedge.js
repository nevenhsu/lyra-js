import { Network } from '..';
import canHedgeOnArbitrum from './canHedgeArbitrum';
import canHedgeOnOptimism from './canHedgeOptimism';
export default function canHedge(quoteSpotPrice, netDelta, option, size, increasesPoolDelta, hedgerView, poolHedgerParams, network) {
    switch (network) {
        case Network.Arbitrum:
            return canHedgeOnArbitrum(quoteSpotPrice, netDelta, option, size, increasesPoolDelta, hedgerView, poolHedgerParams);
        case Network.Optimism:
            return canHedgeOnOptimism(quoteSpotPrice, netDelta, option, size, increasesPoolDelta, hedgerView, poolHedgerParams);
    }
}
//# sourceMappingURL=canHedge.js.map