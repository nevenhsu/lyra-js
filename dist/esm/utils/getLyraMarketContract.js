import { Contract } from '@ethersproject/contracts';
import { Version } from '..';
import { LyraMarketContractId } from '../constants/contracts';
import AVALON_LIQUIDITY_POOL_ABI from '../contracts/avalon/abis/AvalonLiquidityPool.json';
import AVALON_LIQUIDITY_TOKEN_ABI from '../contracts/avalon/abis/AvalonLiquidityToken.json';
import AVALON_OPTION_GREEK_CACHE_ABI from '../contracts/avalon/abis/AvalonOptionGreekCache.json';
import AVALON_OPTION_MARKET_ABI from '../contracts/avalon/abis/AvalonOptionMarket.json';
import AVALON_OPTION_MARKET_PRICER_ABI from '../contracts/avalon/abis/AvalonOptionMarketPricer.json';
import AVALON_OPTION_TOKEN_ABI from '../contracts/avalon/abis/AvalonOptionToken.json';
import AVALON_SHORT_COLLATERAL_ABI from '../contracts/avalon/abis/AvalonShortCollateral.json';
import AVALON_SHORT_POOL_HEDGER_ABI from '../contracts/avalon/abis/AvalonShortPoolHedger.json';
import NEWPORT_POOL_HEDGER_ABI from '../contracts/newport/abis/NewportGMXFuturesPoolHedger.json';
import NEWPORT_LIQUIDITY_POOL_ABI from '../contracts/newport/abis/NewportLiquidityPool.json';
import NEWPORT_LIQUIDITY_TOKEN_ABI from '../contracts/newport/abis/NewportLiquidityToken.json';
import NEWPORT_OPTION_GREEK_CACHE_ABI from '../contracts/newport/abis/NewportOptionGreekCache.json';
import NEWPORT_OPTION_MARKET_ABI from '../contracts/newport/abis/NewportOptionMarket.json';
import NEWPORT_OPTION_MARKET_PRICER_ABI from '../contracts/newport/abis/NewportOptionMarketPricer.json';
import NEWPORT_OPTION_TOKEN_ABI from '../contracts/newport/abis/NewportOptionToken.json';
import NEWPORT_SHORT_COLLATERAL_ABI from '../contracts/newport/abis/NewportShortCollateral.json';
export const getMarketContractABI = (version, contractId) => {
    switch (contractId) {
        case LyraMarketContractId.LiquidityPool:
            switch (version) {
                case Version.Avalon:
                    return AVALON_LIQUIDITY_POOL_ABI;
                case Version.Newport:
                    return NEWPORT_LIQUIDITY_POOL_ABI;
            }
            break;
        case LyraMarketContractId.LiquidityToken:
            switch (version) {
                case Version.Avalon:
                    return AVALON_LIQUIDITY_TOKEN_ABI;
                case Version.Newport:
                    return NEWPORT_LIQUIDITY_TOKEN_ABI;
            }
            break;
        case LyraMarketContractId.OptionGreekCache:
            switch (version) {
                case Version.Avalon:
                    return AVALON_OPTION_GREEK_CACHE_ABI;
                case Version.Newport:
                    return NEWPORT_OPTION_GREEK_CACHE_ABI;
            }
            break;
        case LyraMarketContractId.OptionMarket:
            switch (version) {
                case Version.Avalon:
                    return AVALON_OPTION_MARKET_ABI;
                case Version.Newport:
                    return NEWPORT_OPTION_MARKET_ABI;
            }
            break;
        case LyraMarketContractId.OptionMarketPricer:
            switch (version) {
                case Version.Avalon:
                    return AVALON_OPTION_MARKET_PRICER_ABI;
                case Version.Newport:
                    return NEWPORT_OPTION_MARKET_PRICER_ABI;
            }
            break;
        case LyraMarketContractId.OptionToken:
            switch (version) {
                case Version.Avalon:
                    return AVALON_OPTION_TOKEN_ABI;
                case Version.Newport:
                    return NEWPORT_OPTION_TOKEN_ABI;
            }
            break;
        case LyraMarketContractId.PoolHedger:
            switch (version) {
                case Version.Avalon:
                    return AVALON_SHORT_POOL_HEDGER_ABI;
                case Version.Newport:
                    return NEWPORT_POOL_HEDGER_ABI;
            }
            break;
        case LyraMarketContractId.ShortCollateral:
            switch (version) {
                case Version.Avalon:
                    return AVALON_SHORT_COLLATERAL_ABI;
                case Version.Newport:
                    return NEWPORT_SHORT_COLLATERAL_ABI;
            }
            break;
    }
};
export const getMarketContractAddress = (contractAddresses, contractId) => {
    switch (contractId) {
        case LyraMarketContractId.LiquidityPool:
            return contractAddresses.liquidityPool;
        case LyraMarketContractId.LiquidityToken:
            return contractAddresses.liquidityToken;
        case LyraMarketContractId.OptionGreekCache:
            return contractAddresses.greekCache;
        case LyraMarketContractId.OptionMarket:
            return contractAddresses.optionMarket;
        case LyraMarketContractId.OptionMarketPricer:
            return contractAddresses.optionMarketPricer;
        case LyraMarketContractId.OptionToken:
            return contractAddresses.optionToken;
        case LyraMarketContractId.PoolHedger:
            return contractAddresses.poolHedger;
        case LyraMarketContractId.ShortCollateral:
            return contractAddresses.shortCollateral;
    }
};
// TODO: @dappbeast Breakdown lyra components
export default function getLyraMarketContract(lyra, contractAddresses, version, contractId) {
    const { provider } = lyra;
    const address = getMarketContractAddress(contractAddresses, contractId);
    const abi = getMarketContractABI(version, contractId);
    return new Contract(address, abi, provider);
}
//# sourceMappingURL=getLyraMarketContract.js.map