import { Deployment, LyraGlobalContractId } from '../constants/contracts';
import { MIN_REWARD_AMOUNT } from '../constants/rewards';
import { GlobalRewardEpoch } from '../global_reward_epoch';
import buildTx from '../utils/buildTx';
import fetchAccountRewardEpochData from '../utils/fetchAccountRewardEpochData';
import fetchClaimAddedEvents from '../utils/fetchClaimAddedEvents';
import fetchClaimEvents from '../utils/fetchClaimEvents';
import findMarketX from '../utils/findMarketX';
import fromBigNumber from '../utils/fromBigNumber';
import getGlobalContract from '../utils/getGlobalContract';
import getUniqueBy from '../utils/getUniqueBy';
import multicall from '../utils/multicall';
import getDistributedTradingRewards from './getDistributedTradingRewards';
import getDistributedVaultRewards from './getDistributedVaultRewards';
import getTotalClaimableTradingRewards from './getTotalClaimableTradingRewards';
import getTotalClaimableVaultRewards from './getTotalClaimableVaultRewards';
export class AccountRewardEpoch {
    constructor(lyra, account, accountEpoch, globalEpoch, balances, lyraBalances, claimAddedEvents, claimEvents, rewardTokens, totalClaimableRewards) {
        var _a, _b;
        this.lyra = lyra;
        this.account = account;
        this.globalEpoch = globalEpoch;
        this.accountEpoch = accountEpoch;
        this.lyraBalances = lyraBalances;
        const avgStkLyraBalance = globalEpoch.progressDays > 0 ? accountEpoch.stakingRewards.stkLyraDays / globalEpoch.progressDays : 0;
        this.stakedLyraBalance = globalEpoch.isComplete
            ? avgStkLyraBalance
            : fromBigNumber(lyraBalances.ethereumStkLyra.add(lyraBalances.optimismStkLyra).add(lyraBalances.arbitrumStkLyra));
        this.vaultTokenBalancesMap = balances.reduce((lpTokenBalances, balance) => ({
            ...lpTokenBalances,
            [balance.baseAsset.symbol]: balance.liquidityToken,
        }), {});
        this.tradingFeeRebate = globalEpoch.tradingFeeRebate(this.stakedLyraBalance);
        const integratorTradingFees = (_b = (_a = accountEpoch.integratorTradingRewards) === null || _a === void 0 ? void 0 : _a.fees) !== null && _b !== void 0 ? _b : 0;
        this.tradingFees = integratorTradingFees > 0 ? integratorTradingFees : accountEpoch.tradingRewards.fees;
        this.tradingRewards = globalEpoch.tradingRewards(this.tradingFees, this.stakedLyraBalance);
        const distributedTradingRewards = getDistributedTradingRewards(globalEpoch, claimAddedEvents);
        this.isTradingRewardsDistributed = !!distributedTradingRewards.find(d => d.amount > 0);
        this.tradingRewards = this.isTradingRewardsDistributed
            ? distributedTradingRewards
            : globalEpoch.tradingRewards(this.tradingFees, this.stakedLyraBalance);
        this.totalClaimableRewards = totalClaimableRewards;
        this.totalClaimableTradingRewards = getTotalClaimableTradingRewards(rewardTokens, claimAddedEvents, claimEvents);
        this.totalClaimableVaultRewardsMap = globalEpoch.markets.reduce((map, market) => ({
            ...map,
            [market.baseToken.symbol]: getTotalClaimableVaultRewards(market, rewardTokens, claimAddedEvents, claimEvents),
        }), {});
        this.distributedVaultRewardsMap = globalEpoch.markets.reduce((map, market) => ({
            ...map,
            [market.baseToken.symbol]: getDistributedVaultRewards(market, globalEpoch, claimAddedEvents),
        }), {});
        this.calculatedVaultRewardsMap = globalEpoch.markets.reduce((map, market) => {
            const marketKey = market.baseToken.symbol;
            const mmvRewards = accountEpoch.mmvRewards ? accountEpoch.mmvRewards[marketKey] : null;
            const isIgnored = !!(mmvRewards === null || mmvRewards === void 0 ? void 0 : mmvRewards.isIgnored);
            return {
                ...map,
                [market.baseToken.symbol]: mmvRewards && !isIgnored ? mmvRewards.rewards.filter(r => r.amount > MIN_REWARD_AMOUNT) : [],
            };
        }, {});
        this.isVaultRewardsDistributedMap = globalEpoch.markets.reduce((map, market) => {
            var _a;
            return ({
                ...map,
                [market.baseToken.symbol]: !!((_a = this.distributedVaultRewardsMap[market.baseToken.symbol]) === null || _a === void 0 ? void 0 : _a.find(d => d.amount > 0)),
            });
        }, {});
    }
    // Getters
    static async getByOwner(lyra, address) {
        if (lyra.deployment !== Deployment.Mainnet) {
            return [];
        }
        const [accountEpochDatas, globalEpochs, lyraBalances, balances, claimAddedEvents, claimEvents] = await Promise.all([
            fetchAccountRewardEpochData(lyra, address),
            GlobalRewardEpoch.getAll(lyra),
            lyra.account(address).lyraBalances(),
            lyra.account(address).balances(),
            fetchClaimAddedEvents(lyra, lyra.chain, address),
            fetchClaimEvents(lyra, lyra.chain, address),
        ]);
        const uniqueRewardTokens = getUniqueBy(globalEpochs.flatMap(e => e.rewardTokens), r => r.address);
        const distributorContract = getGlobalContract(lyra, LyraGlobalContractId.MultiDistributor);
        const { returnData } = await multicall(lyra, uniqueRewardTokens.map(({ address: tokenAddress }) => ({
            contract: distributorContract,
            function: 'claimableBalances',
            args: [address, tokenAddress],
        })));
        const totalClaimableBalances = returnData
            .map((amount, idx) => ({
            ...uniqueRewardTokens[idx],
            amount: fromBigNumber(amount, uniqueRewardTokens[idx].decimals),
        }))
            .filter(({ amount }) => amount > 0);
        return accountEpochDatas
            .map(accountEpochData => {
            const globalEpoch = globalEpochs.find(globalEpoch => globalEpoch.startTimestamp === accountEpochData.startTimestamp &&
                globalEpoch.endTimestamp === accountEpochData.endTimestamp);
            if (!globalEpoch) {
                throw new Error('Missing corresponding global epoch for account epoch');
            }
            return new AccountRewardEpoch(lyra, address, accountEpochData, globalEpoch, balances, lyraBalances, claimAddedEvents, claimEvents, uniqueRewardTokens, totalClaimableBalances);
        })
            .sort((a, b) => a.globalEpoch.endTimestamp - b.globalEpoch.endTimestamp);
    }
    static async getByStartTimestamp(lyra, address, startTimestamp) {
        if (lyra.deployment !== Deployment.Mainnet) {
            return null;
        }
        const epochs = await AccountRewardEpoch.getByOwner(lyra, address);
        const epoch = epochs.find(epoch => epoch.globalEpoch.startTimestamp === startTimestamp);
        return epoch !== null && epoch !== void 0 ? epoch : null;
    }
    static claim(lyra, address, tokenAddresses) {
        const distributorContract = getGlobalContract(lyra, LyraGlobalContractId.MultiDistributor);
        const calldata = distributorContract.interface.encodeFunctionData('claim', [tokenAddresses]);
        return buildTx(lyra.provider, lyra.provider.network.chainId, distributorContract.address, address, calldata);
    }
    // Dynamic Fields
    vaultApy(marketAddressOrName) {
        const vaultTokenBalance = this.vaultTokenBalance(marketAddressOrName);
        if (vaultTokenBalance === 0) {
            return this.globalEpoch.minVaultApy(marketAddressOrName);
        }
        else {
            return this.globalEpoch.vaultApy(marketAddressOrName, this.stakedLyraBalance, vaultTokenBalance);
        }
    }
    vaultMaxBoost(marketAddressOrName) {
        const vaultTokenBalance = this.vaultTokenBalance(marketAddressOrName);
        if (vaultTokenBalance === 0) {
            return this.globalEpoch.vaultMaxBoost(marketAddressOrName, 0);
        }
        else {
            return this.globalEpoch.vaultMaxBoost(marketAddressOrName, vaultTokenBalance);
        }
    }
    vaultApyMultiplier(marketAddressOrName) {
        const vaultTokenBalance = this.vaultTokenBalance(marketAddressOrName);
        if (vaultTokenBalance === 0) {
            return 1;
        }
        else {
            return this.globalEpoch.vaultApyMultiplier(marketAddressOrName, this.stakedLyraBalance, vaultTokenBalance);
        }
    }
    vaultTokenBalance(marketAddressOrName) {
        var _a, _b;
        const market = findMarketX(this.globalEpoch.markets, marketAddressOrName);
        const marketKey = market.baseToken.symbol;
        const boostedLpDays = this.accountEpoch.mmvRewards
            ? (_b = (_a = this.accountEpoch.mmvRewards[marketKey]) === null || _a === void 0 ? void 0 : _a.boostedLpDays) !== null && _b !== void 0 ? _b : 0
            : 0;
        const avgVaultTokenBalance = this.globalEpoch.progressDays > 0 ? boostedLpDays / this.globalEpoch.progressDays : 0;
        const currVaultTokenBalance = fromBigNumber(this.vaultTokenBalancesMap[marketKey].balance);
        // Uses average for historical epochs, realtime for current epoch
        const vaultTokenBalance = this.globalEpoch.isComplete ? avgVaultTokenBalance : currVaultTokenBalance;
        return vaultTokenBalance;
    }
    vaultRewards(marketAddressOrName) {
        const market = findMarketX(this.globalEpoch.markets, marketAddressOrName);
        const marketKey = market.baseToken.symbol;
        if (this.isVaultRewardsDistributed(marketAddressOrName)) {
            return this.distributedVaultRewardsMap[marketKey];
        }
        else {
            return this.calculatedVaultRewardsMap[marketKey];
        }
    }
    totalClaimableVaultRewards(marketAddressOrName) {
        const market = findMarketX(this.globalEpoch.markets, marketAddressOrName);
        const marketKey = market.baseToken.symbol;
        return this.totalClaimableVaultRewardsMap[marketKey];
    }
    isVaultRewardsDistributed(marketAddressOrName) {
        const market = findMarketX(this.globalEpoch.markets, marketAddressOrName);
        const marketKey = market.baseToken.symbol;
        return this.isVaultRewardsDistributedMap[marketKey];
    }
}
//# sourceMappingURL=index.js.map