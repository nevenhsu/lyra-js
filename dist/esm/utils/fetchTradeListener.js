import { BigNumber } from '@ethersproject/bignumber';
import { Contract } from '@ethersproject/contracts';
import { LyraMarketContractId, TradeEvent, } from '..';
import { ZERO_ADDRESS } from '../constants/bn';
import fetchMarketAddresses from './fetchMarketAddresses';
import { getMarketContractABI } from './getLyraMarketContract';
const DEFAULT_POLL_INTERVAL = 10 * 1000;
export default function fetchTradeListener(lyra, callback, options) {
    var _a, _b;
    const ms = (_a = options === null || options === void 0 ? void 0 : options.pollInterval) !== null && _a !== void 0 ? _a : DEFAULT_POLL_INTERVAL;
    const startBlockTag = (_b = options === null || options === void 0 ? void 0 : options.startBlockNumber) !== null && _b !== void 0 ? _b : 'latest';
    let timeout;
    const optionMarket = new Contract(ZERO_ADDRESS, getMarketContractABI(lyra.version, LyraMarketContractId.OptionMarket, lyra.network));
    Promise.all([fetchMarketAddresses(lyra), lyra.provider.getBlock(startBlockTag)]).then(async ([addresses, block]) => {
        console.debug(`Polling from block ${block.number} every ${ms}ms`);
        let prevBlock = block;
        const poll = async () => {
            var _a;
            const latestBlock = await lyra.provider.getBlock('latest');
            const fromBlockNumber = prevBlock.number + 1;
            const toBlockNumber = latestBlock.number;
            if (fromBlockNumber >= toBlockNumber) {
                // Skip if no new blocks
                setTimeout(poll, ms);
                return;
            }
            console.debug(`Querying block range: ${fromBlockNumber} to ${toBlockNumber} (${toBlockNumber - fromBlockNumber} blocks)`);
            // Fetch new trades
            const trades = await lyra.provider.send('eth_getLogs', [
                {
                    address: addresses.map(a => a.optionMarket),
                    fromBlock: BigNumber.from(fromBlockNumber).toHexString(),
                    toBlock: BigNumber.from(toBlockNumber).toHexString(),
                    topics: [[((_a = optionMarket.filters.Trade().topics) !== null && _a !== void 0 ? _a : [])[0]]],
                },
            ]);
            if (trades.length > 0) {
                console.debug(`Found ${trades.length} new trades`);
            }
            // Parse trade events
            await Promise.all(trades.map(async (trade) => {
                const tradeEvents = await TradeEvent.getByHash(lyra, trade.transactionHash);
                tradeEvents.map(tradeEvent => callback(tradeEvent));
            }));
            // Poll
            prevBlock = latestBlock;
            setTimeout(poll, ms);
        };
        timeout = setTimeout(poll, ms);
    });
    return {
        off: () => {
            if (timeout) {
                clearTimeout(timeout);
            }
        },
    };
}
//# sourceMappingURL=fetchTradeListener.js.map