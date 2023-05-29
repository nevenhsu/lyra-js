import { LyraMarketContractId } from '../constants/contracts';
import getERC20Contract from '../utils/getERC20Contract';
import getLyraMarketContract from '../utils/getLyraMarketContract';
import multicall from '../utils/multicall';
export default async function fetchAccountBalancesAndAllowances(lyra, owner) {
    const markets = await lyra.markets();
    return await Promise.all(markets.map(async (market) => {
        const quoteToken = getERC20Contract(lyra.provider, market.quoteToken.address);
        const baseToken = getERC20Contract(lyra.provider, market.baseToken.address);
        const optionMarket = getLyraMarketContract(lyra, market.contractAddresses, lyra.version, LyraMarketContractId.OptionMarket);
        const liquidityPool = getLyraMarketContract(lyra, market.contractAddresses, lyra.version, LyraMarketContractId.LiquidityPool);
        const liquidityToken = getLyraMarketContract(lyra, market.contractAddresses, lyra.version, LyraMarketContractId.LiquidityToken);
        const { returnData: [quoteSymbol, quoteDecimals, quoteBalance, quoteTradeAllowance, quoteDepositAllowance, baseSymbol, baseDecimals, baseBalance, baseTradeAllowance, liquidityBalance,], } = await multicall(lyra, [
            {
                contract: quoteToken,
                function: 'symbol',
                args: [],
            },
            {
                contract: quoteToken,
                function: 'decimals',
                args: [],
            },
            {
                contract: quoteToken,
                function: 'balanceOf',
                args: [owner],
            },
            {
                contract: quoteToken,
                function: 'allowance',
                args: [owner, optionMarket.address],
            },
            {
                contract: quoteToken,
                function: 'allowance',
                args: [owner, liquidityPool.address],
            },
            {
                contract: baseToken,
                function: 'symbol',
                args: [],
            },
            {
                contract: baseToken,
                function: 'decimals',
                args: [],
            },
            {
                contract: baseToken,
                function: 'balanceOf',
                args: [owner],
            },
            {
                contract: baseToken,
                function: 'allowance',
                args: [owner, optionMarket.address],
            },
            {
                contract: liquidityToken,
                function: 'balanceOf',
                args: [owner],
            },
        ]);
        return {
            owner,
            market,
            marketAddress: market.address,
            marketName: market.name,
            quoteAsset: {
                address: quoteToken.address,
                balance: quoteBalance,
                symbol: quoteSymbol,
                decimals: quoteDecimals,
                tradeAllowance: quoteTradeAllowance,
                depositAllowance: quoteDepositAllowance,
            },
            baseAsset: {
                address: baseToken.address,
                symbol: baseSymbol,
                decimals: baseDecimals,
                balance: baseBalance,
                tradeAllowance: baseTradeAllowance,
            },
            liquidityToken: {
                address: liquidityToken.address,
                symbol: `${market.baseToken.symbol}LP`,
                balance: liquidityBalance,
                decimals: 18,
            },
        };
    }));
}
//# sourceMappingURL=fetchAccountBalancesAndAllowances.js.map