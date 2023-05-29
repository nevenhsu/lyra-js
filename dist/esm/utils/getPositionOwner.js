import { ZERO_ADDRESS } from '../constants/bn';
export default function getPositionOwner(transfers, toBlockNumber) {
    var _a;
    const events = transfers
        // Filter out future blocks
        .filter(t => t.blockNumber <= toBlockNumber);
    if (events.length === 0) {
        throw new Error('Missing transfer events');
    }
    const lastTransfer = events[events.length - 1];
    if (lastTransfer.args.to === ZERO_ADDRESS) {
        // Burn event, use first transfer "from" address with same transaction hash
        const firstLastTransfer = (_a = events.find(t => t.transactionHash === lastTransfer.transactionHash)) !== null && _a !== void 0 ? _a : lastTransfer;
        return firstLastTransfer.args.from;
    }
    else {
        // Mint or transfer event, use last transfer "to" address
        return lastTransfer.args.to;
    }
}
//# sourceMappingURL=getPositionOwner.js.map