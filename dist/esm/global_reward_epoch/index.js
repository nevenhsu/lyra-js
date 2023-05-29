import { Deployment } from '..';
import { AccountRewardEpoch } from '../account_reward_epoch';
import { MIN_REWARD_AMOUNT } from '../constants/rewards';
import { SECONDS_IN_DAY, SECONDS_IN_YEAR } from '../constants/time';
import fetchGlobalRewardEpochData from '../utils/fetchGlobalRewardEpochData';
import fetchLyraStakingParams from '../utils/fetchLyraStakingParams';
import findMarketX from '../utils/findMarketX';
import fromBigNumber from '../utils/fromBigNumber';
import getEffectiveLiquidityTokens, { getMinimumStakedLyra } from '../utils/getEffectiveLiquidityTokens';
import getEffectiveTradingFeeRebate from '../utils/getEffectiveTradingFeeRebate';
import getUniqueBy from '../utils/getUniqueBy';
import isMarketEqual from '../utils/isMarketEqual';
export class GlobalRewardEpoch {
    constructor(lyra, id, epoch, markets, marketsLiquidity, stakingParams, block) {
        var _a, _b, _c, _d, _e;
        this.lyra = lyra;
        this.id = id;
        this.epoch = epoch;
        this.markets = markets;
        this.stakingParams = stakingParams;
        this.marketsLiquidity = marketsLiquidity;
        this.tradingFeeRebateTiers = (_b = (_a = epoch.tradingRewardConfig) === null || _a === void 0 ? void 0 : _a.rebateRateTable) === null || _b === void 0 ? void 0 : _b.map(tier => ({
            stakedLyraCutoff: tier.cutoff,
            feeRebate: tier.returnRate,
        }));
        this.blockTimestamp = block.timestamp;
        this.startTimestamp = epoch.startTimestamp;
        this.lastUpdatedTimestamp = epoch.lastUpdated;
        this.endTimestamp = epoch.endTimestamp;
        this.distributionTimestamp = (_c = epoch.distributionTimestamp) !== null && _c !== void 0 ? _c : epoch.endTimestamp;
        this.isDepositPeriod = epoch.isDepositPeriod;
        this.startEarningTimestamp = epoch.startEarningTimestamp;
        this.isCurrent = this.blockTimestamp >= this.startTimestamp && this.blockTimestamp <= this.endTimestamp;
        this.isComplete = this.blockTimestamp > this.endTimestamp;
        const durationSeconds = Math.max(0, this.endTimestamp - this.startTimestamp);
        const progressSeconds = durationSeconds - Math.max(0, this.endTimestamp - this.blockTimestamp);
        this.duration = durationSeconds;
        this.progressDays = progressSeconds / SECONDS_IN_DAY;
        this.totalAverageStakedLyra = this.progressDays ? epoch.totalStkLyraDays / this.progressDays : 0;
        // Trading
        const totalStkLyra = this.isComplete ? this.totalAverageStakedLyra : fromBigNumber(stakingParams.totalSupply);
        this.minTradingFeeRebate = this.tradingFeeRebate(0);
        this.maxTradingFeeRebate = this.tradingFeeRebate(totalStkLyra);
        this.tradingRewardsCap = epoch.tradingRewardConfig.tokens.map(token => ({
            address: token.address,
            symbol: token.symbol,
            decimals: token.decimals,
            amount: token.cap,
        }));
        this.tradingRewardTokens = getUniqueBy(epoch.tradingRewardConfig.tokens.filter(t => t.cap > 0), token => token.address.toLowerCase());
        this.vaultRewardTokens = getUniqueBy(Object.values(epoch.MMVConfig)
            .flatMap(e => e.tokens)
            .filter(t => t.amount > 0), token => token.address.toLowerCase());
        this.rewardTokens = getUniqueBy([...this.tradingRewardTokens, ...this.vaultRewardTokens], r => r.address);
        this.tokenPriceMap =
            (_e = (_d = epoch.tokenPrices) === null || _d === void 0 ? void 0 : _d.reduce((tokenPriceMap, tokenPrice) => ({ ...tokenPriceMap, [tokenPrice.address]: tokenPrice }), {})) !== null && _e !== void 0 ? _e : {};
    }
    // Getters
    static async getAll(lyra) {
        if (lyra.deployment !== Deployment.Mainnet) {
            return [];
        }
        const [epochs, stakingParams, markets, block] = await Promise.all([
            fetchGlobalRewardEpochData(lyra),
            fetchLyraStakingParams(lyra),
            lyra.markets(),
            lyra.provider.getBlock('latest'),
        ]);
        const marketsLiquidity = await Promise.all(markets.map(market => market.liquidity()));
        return epochs
            .map((epoch, idx) => new GlobalRewardEpoch(lyra, idx + 1, epoch, markets, marketsLiquidity, stakingParams, block))
            .sort((a, b) => a.endTimestamp - b.endTimestamp);
    }
    static async getLatest(lyra) {
        var _a;
        if (lyra.deployment !== Deployment.Mainnet) {
            return null;
        }
        const epochs = await this.getAll(lyra);
        const latestEpoch = (_a = epochs.find(r => !r.isComplete)) !== null && _a !== void 0 ? _a : epochs[epochs.length - 1];
        return latestEpoch !== null && latestEpoch !== void 0 ? latestEpoch : null;
    }
    static async getByStartTimestamp(lyra, startTimestamp) {
        if (lyra.deployment !== Deployment.Mainnet) {
            return null;
        }
        const epochs = await this.getAll(lyra);
        const epoch = epochs.find(epoch => epoch.startTimestamp === startTimestamp);
        return epoch !== null && epoch !== void 0 ? epoch : null;
    }
    // Dynamic Fields
    vaultApy(marketAddressOrName, stakedLyraBalance, vaultTokenBalance) {
        const marketIdx = this.markets.findIndex(m => isMarketEqual(m, marketAddressOrName));
        const market = this.markets[marketIdx];
        const marketKey = market.baseToken.symbol;
        const totalAvgVaultTokens = this.totalAverageVaultTokens(marketAddressOrName);
        const mmvConfig = this.epoch.MMVConfig[marketKey];
        const scaledStkLyraDays = this.epoch.scaledStkLyraDays[marketKey];
        if (!mmvConfig) {
            return [];
        }
        const totalAvgScaledStkLyra = this.progressDays ? scaledStkLyraDays / this.progressDays : 0;
        const effectiveLpTokensPerLpToken = getEffectiveLiquidityTokens(vaultTokenBalance, totalAvgVaultTokens, stakedLyraBalance, totalAvgScaledStkLyra, mmvConfig.x);
        const totalAvgBoostedVaultTokens = this.totalAverageBoostedVaultTokens(marketAddressOrName);
        const boostedPortionOfLiquidity = totalAvgBoostedVaultTokens > 0 ? effectiveLpTokensPerLpToken / totalAvgBoostedVaultTokens : 0;
        const basePortionOfLiquidity = totalAvgVaultTokens > 0 ? vaultTokenBalance / totalAvgVaultTokens : 0;
        // This ratio is for no staking -> staking w/ stkLyraBalance (noStakingMultiplier)
        // Vs UI apy multiplier is from zero staking -> staking w/ stkLyraBalance (vaultApyMultiplier)
        const apyMultiplier = basePortionOfLiquidity > 0 ? boostedPortionOfLiquidity / basePortionOfLiquidity : 0;
        // Calculate total vault token balance, including pending deposits
        const tokenPrice = fromBigNumber(this.marketsLiquidity[marketIdx].tokenPrice);
        const totalQueuedVaultTokens = tokenPrice > 0 ? fromBigNumber(this.marketsLiquidity[marketIdx].pendingDeposits) / tokenPrice : 0;
        const totalAvgAndQueuedVaultTokens = totalAvgVaultTokens + totalQueuedVaultTokens;
        const vaultTokensPerDollar = tokenPrice > 0 ? 1 / tokenPrice : 0;
        const pctSharePerDollar = totalAvgAndQueuedVaultTokens > 0 ? vaultTokensPerDollar / totalAvgAndQueuedVaultTokens : 0;
        return mmvConfig.tokens.map(token => {
            var _a, _b;
            const rewards = token.amount;
            const perDollarPerSecond = this.duration > 0 ? (pctSharePerDollar * rewards) / this.duration : 0;
            const price = (_b = (_a = this.tokenPriceMap[token.address]) === null || _a === void 0 ? void 0 : _a.price) !== null && _b !== void 0 ? _b : 0;
            const apy = perDollarPerSecond * price * SECONDS_IN_YEAR * apyMultiplier;
            return {
                amount: apy,
                address: token.address,
                decimals: token.decimals,
                symbol: token.symbol,
            };
        });
    }
    vaultApyTotal(marketAddressOrName, stakedLyraBalance, _vaultTokenBalance) {
        return this.vaultApy(marketAddressOrName, stakedLyraBalance, _vaultTokenBalance).reduce((total, apy) => total + apy.amount, 0);
    }
    vaultMaxBoost(marketAddressOrName, vaultTokenBalance) {
        const market = findMarketX(this.markets, marketAddressOrName);
        const marketKey = market.baseToken.symbol;
        const totalAvgVaultTokens = this.totalAverageVaultTokens(marketAddressOrName);
        const scaledStkLyraDays = this.epoch.scaledStkLyraDays[marketKey];
        const totalAvgScaledStkLyra = this.progressDays ? scaledStkLyraDays / this.progressDays : 0;
        return getMinimumStakedLyra(totalAvgScaledStkLyra, vaultTokenBalance, totalAvgVaultTokens);
    }
    vaultApyMultiplier(marketAddressOrName, stakedLyraBalance, vaultTokenBalance) {
        const baseApy = this.vaultApyTotal(marketAddressOrName, 0, vaultTokenBalance);
        const boostedApy = this.vaultApyTotal(marketAddressOrName, stakedLyraBalance, vaultTokenBalance);
        return baseApy > 0 ? boostedApy / baseApy : 0;
    }
    minVaultApy(marketAddressOrName) {
        return this.vaultApy(marketAddressOrName, 0, 10000);
    }
    maxVaultApy(marketAddressOrName) {
        const market = findMarketX(this.markets, marketAddressOrName);
        const marketKey = market.baseToken.symbol;
        const scaledStkLyraDays = this.epoch.scaledStkLyraDays[marketKey];
        if (!scaledStkLyraDays) {
            return [];
        }
        const totalAvgScaledStkLyra = this.progressDays ? scaledStkLyraDays / this.progressDays : 0;
        return this.vaultApy(marketAddressOrName, totalAvgScaledStkLyra, 10000);
    }
    totalVaultRewards(marketAddressOrName) {
        var _a;
        const market = findMarketX(this.markets, marketAddressOrName);
        const marketKey = market.baseToken.symbol;
        return (_a = this.epoch.globalMMVRewards[marketKey]) !== null && _a !== void 0 ? _a : [];
    }
    totalAverageVaultTokens(marketAddressOrName) {
        var _a;
        const market = findMarketX(this.markets, marketAddressOrName);
        const marketKey = market.baseToken.symbol;
        return this.progressDays ? ((_a = this.epoch.totalLpTokenDays[marketKey]) !== null && _a !== void 0 ? _a : 0) / this.progressDays : 0;
    }
    totalAverageBoostedVaultTokens(marketAddressOrName) {
        var _a;
        const market = findMarketX(this.markets, marketAddressOrName);
        const marketKey = market.baseToken.symbol;
        return this.progressDays ? ((_a = this.epoch.totalBoostedLpTokenDays[marketKey]) !== null && _a !== void 0 ? _a : 0) / this.progressDays : 0;
    }
    tradingFeeRebate(stakedLyraBalance) {
        const { useRebateTable, rebateRateTable, maxRebatePercentage, netVerticalStretch, verticalShift, vertIntercept, stretchiness, } = this.epoch.tradingRewardConfig;
        return getEffectiveTradingFeeRebate(stakedLyraBalance, useRebateTable, rebateRateTable, maxRebatePercentage, netVerticalStretch, verticalShift, vertIntercept, stretchiness);
    }
    tradingRewards(tradingFees, stakedLyraBalance) {
        return this.epoch.tradingRewardConfig.tokens
            .map(token => {
            var _a, _b;
            const currentPrice = (_b = (_a = this.tokenPriceMap[token.address]) === null || _a === void 0 ? void 0 : _a.price) !== null && _b !== void 0 ? _b : 0;
            const price = this.isComplete ? token.fixedPrice : Math.max(currentPrice, token.floorTokenPrice);
            const feeRebate = this.tradingFeeRebate(stakedLyraBalance);
            const feesRebated = feeRebate * tradingFees;
            const rewardAmount = (feesRebated * token.portion) / price;
            return {
                amount: rewardAmount,
                address: token.address,
                decimals: token.decimals,
                symbol: token.symbol,
            };
        })
            .filter(e => e.amount > MIN_REWARD_AMOUNT);
    }
    // Edge
    async accountRewardEpoch(address) {
        const epochs = await AccountRewardEpoch.getByOwner(this.lyra, address);
        const epoch = epochs.find(epoch => epoch.globalEpoch.startTimestamp === this.startTimestamp && epoch.globalEpoch.endTimestamp === this.endTimestamp);
        return epoch !== null && epoch !== void 0 ? epoch : null;
    }
}
//# sourceMappingURL=index.js.map