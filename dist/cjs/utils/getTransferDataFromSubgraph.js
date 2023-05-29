"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var address_1 = require("@ethersproject/address");
var contracts_1 = require("../constants/contracts");
function getTransferDataFromSubgraph(transfer) {
    return {
        source: contracts_1.DataSource.Subgraph,
        from: (0, address_1.getAddress)(transfer.oldOwner),
        to: (0, address_1.getAddress)(transfer.newOwner),
        transactionHash: transfer.transactionHash,
        blockNumber: transfer.blockNumber,
        positionId: transfer.position.positionId,
        marketAddress: (0, address_1.getAddress)(transfer.position.id.split('-')[0]),
    };
}
exports.default = getTransferDataFromSubgraph;
//# sourceMappingURL=getTransferDataFromSubgraph.js.map