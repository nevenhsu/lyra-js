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
    constructor(lyra, account, accountEpoch, globalEpoch, claimAddedEvents, claimEvents, rewardTokens, totalClaimableRewards) {
        var _a, _b, _c, _d, _e, _f;
        this.lyra = lyra;
        this.account = account;
        this.globalEpoch = globalEpoch;
        this.accountEpoch = accountEpoch;
        const hasNewRewards = !!accountEpoch.tradingRewards.newRewards;
        const oldTradingRewardTokens = (_c = (_b = (_a = accountEpoch.tradingRewards) === null || _a === void 0 ? void 0 : _a.rewards) === null || _b === void 0 ? void 0 : _b.trading) !== null && _c !== void 0 ? _c : [];
        const newTradingRewardTokens = (_f = (_e = (_d = accountEpoch === null || accountEpoch === void 0 ? void 0 : accountEpoch.tradingRewards) === null || _d === void 0 ? void 0 : _d.newRewards) === null || _e === void 0 ? void 0 : _e.tokens) !== null && _f !== void 0 ? _f : [];
        const tradingRewardTokens = hasNewRewards ? newTradingRewardTokens : oldTradingRewardTokens;
        const distributedTradingRewards = getDistributedTradingRewards(globalEpoch, claimAddedEvents);
        this.isTradingRewardsDistributed = !!distributedTradingRewards.find(d => d.amount > 0);
        this.tradingRewards = this.isTradingRewardsDistributed ? distributedTradingRewards : tradingRewardTokens;
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
    static async getByOwner(lyra, owner) {
        if (lyra.deployment !== Deployment.Mainnet) {
            return [];
        }
        const [accountEpochDatas, globalEpochs, claimAddedEvents, claimEvents] = await Promise.all([
            fetchAccountRewardEpochData(lyra, owner),
            GlobalRewardEpoch.getAll(lyra),
            fetchClaimAddedEvents(lyra, owner),
            fetchClaimEvents(lyra, owner),
        ]);
        const uniqueRewardTokens = getUniqueBy(globalEpochs.flatMap(e => e.rewardTokens), r => r.address);
        const distributorContract = getGlobalContract(lyra, LyraGlobalContractId.MultiDistributor);
        const { returnData } = await multicall(lyra, uniqueRewardTokens.map(({ address: tokenAddress }) => ({
            contract: distributorContract,
            function: 'claimableBalances',
            args: [owner, tokenAddress],
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
            return new AccountRewardEpoch(lyra, owner, accountEpochData, globalEpoch, claimAddedEvents, claimEvents, uniqueRewardTokens, totalClaimableBalances);
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