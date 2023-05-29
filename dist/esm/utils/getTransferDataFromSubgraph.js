import { getAddress } from '@ethersproject/address';
import { DataSource } from '../constants/contracts';
export default function getTransferDataFromSubgraph(transfer) {
    return {
        source: DataSource.Subgraph,
        from: getAddress(transfer.oldOwner),
        to: getAddress(transfer.newOwner),
        transactionHash: transfer.transactionHash,
        blockNumber: transfer.blockNumber,
        positionId: transfer.position.positionId,
    };
}
//# sourceMappingURL=getTransferDataFromSubgraph.js.map