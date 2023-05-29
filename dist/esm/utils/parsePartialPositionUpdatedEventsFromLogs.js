import { Contract } from '@ethersproject/contracts';
import { ZERO_ADDRESS } from '../constants/bn';
import { EventName, LyraMarketContractId } from '../constants/contracts';
import { Version } from '../lyra';
import filterNulls from './filterNulls';
import { getMarketContractABI } from './getLyraMarketContract';
export default function parsePartialPositionUpdatedEventsFromLogs(logs, network) {
    const optionToken = new Contract(ZERO_ADDRESS, 
    // Hard-coded version as these ABI events are functionally the same
    getMarketContractABI(Version.Newport, LyraMarketContractId.OptionToken, network));
    const events = filterNulls(logs.map(log => {
        try {
            const event = optionToken.interface.parseLog(log);
            if (event.name === EventName.PositionUpdated) {
                return {
                    address: log.address,
                    blockNumber: log.blockNumber,
                    transactionHash: log.transactionHash,
                    logIndex: log.logIndex,
                    args: event.args,
                };
            }
            return null;
        }
        catch (e) {
            return null;
        }
    }));
    return events;
}
//# sourceMappingURL=parsePartialPositionUpdatedEventsFromLogs.js.map