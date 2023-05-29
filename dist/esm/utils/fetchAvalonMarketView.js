import { isAddress } from '@ethersproject/address';
import { LyraContractId } from '../constants/contracts';
import { Version } from '../lyra';
import getLyraContract from './getLyraContract';
import multicall from './multicall';
import parseBaseKeyBytes32 from './parseBaseKeyBytes32';
import parseBaseSymbol from './parseBaseSymbol';
export default async function fetchAvalonMarketView(lyra, marketAddressOrName) {
    const viewerContract = getLyraContract(lyra, Version.Avalon, LyraContractId.OptionMarketViewer);
    const exchangeContract = getLyraContract(lyra, Version.Avalon, LyraContractId.ExchangeAdapter);
    const isGlobalPausedReq = {
        contract: exchangeContract,
        function: 'isGlobalPaused',
        args: [],
    };
    const globalOwner = {
        contract: exchangeContract,
        function: 'owner',
        args: [],
    };
    if (isAddress(marketAddressOrName)) {
        const { returnData: [marketView, isGlobalPaused, owner], blockNumber, } = await multicall(lyra, [
            {
                contract: viewerContract,
                function: 'getMarket',
                args: [marketAddressOrName],
            },
            isGlobalPausedReq,
            globalOwner,
        ]);
        return { marketView, isGlobalPaused, owner, blockNumber };
    }
    else {
        const baseSymbol = parseBaseSymbol(lyra, marketAddressOrName);
        const { returnData: [marketView, isGlobalPaused, owner], blockNumber, } = await multicall(lyra, [
            {
                contract: viewerContract,
                function: 'getMarketForBaseKey',
                args: [parseBaseKeyBytes32(baseSymbol)],
            },
            isGlobalPausedReq,
            globalOwner,
        ]);
        return { marketView, isGlobalPaused, owner, blockNumber };
    }
}
//# sourceMappingURL=fetchAvalonMarketView.js.map