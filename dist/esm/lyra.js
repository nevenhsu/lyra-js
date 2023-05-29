import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client/core';
import fetch from 'cross-fetch';
import { Account } from './account';
import { AccountRewardEpoch } from './account_reward_epoch';
import { Admin } from './admin';
import { Board } from './board';
import { Chain } from './constants/chain';
import { LYRA_API_URL } from './constants/links';
import { GlobalRewardEpoch } from './global_reward_epoch';
import { LiquidityDeposit } from './liquidity_deposit';
import { LiquidityWithdrawal } from './liquidity_withdrawal';
import { LyraStaking } from './lyra_staking';
import { Market } from './market';
import { Option } from './option';
import { Position } from './position';
import { Strike } from './strike';
import { TradeEvent } from './trade_event';
import fetchLeaderboard from './utils/fetchLeaderboard';
import fetchMarketAddresses from './utils/fetchMarketAddresses';
import fetchPositionEventDataByHash from './utils/fetchPositionEventDataByHash';
import getLyraChainForChainId from './utils/getLyraChainForChainId';
import getLyraChainIdForChain from './utils/getLyraChainIdForChain';
import getLyraDeploymentForChain from './utils/getLyraDeploymentForChain';
import getLyraDeploymentProvider from './utils/getLyraDeploymentProvider';
import getLyraDeploymentSubgraphURI from './utils/getLyraDeploymentSubgraphURI';
import getNetworkForChain from './utils/getLyraNetworkForChain';
import getVersionForChain from './utils/getVersionForChain';
export var Version;
(function (Version) {
    Version["Avalon"] = "avalon";
    Version["Newport"] = "newport";
})(Version || (Version = {}));
export { Deployment } from './constants/contracts';
export default class Lyra {
    constructor(config = Chain.Optimism) {
        var _a, _b;
        if (typeof config === 'object') {
            // Config
            const configObj = config;
            this.provider = config.provider;
            this.optimismProvider = config.optimismProvider;
            this.ethereumProvider = config.ethereumProvider;
            this.chain = getLyraChainForChainId(this.provider.network.chainId);
            this.subgraphUri = (_a = configObj === null || configObj === void 0 ? void 0 : configObj.subgraphUri) !== null && _a !== void 0 ? _a : getLyraDeploymentSubgraphURI(this.chain);
            this.apiUri = (_b = configObj.apiUri) !== null && _b !== void 0 ? _b : LYRA_API_URL;
        }
        else if (typeof config === 'number') {
            // Chain ID
            this.chain = getLyraChainForChainId(config);
            this.provider = getLyraDeploymentProvider(this.chain);
            this.subgraphUri = getLyraDeploymentSubgraphURI(this.chain);
        }
        else {
            // String
            this.chain = config;
            this.provider = getLyraDeploymentProvider(this.chain);
            this.subgraphUri = getLyraDeploymentSubgraphURI(this.chain);
        }
        this.subgraphClient = new ApolloClient({
            link: new HttpLink({ uri: this.subgraphUri, fetch }),
            cache: new InMemoryCache(),
        });
        this.apiUri = LYRA_API_URL;
        this.chainId = getLyraChainIdForChain(this.chain);
        this.deployment = getLyraDeploymentForChain(this.chain);
        this.network = getNetworkForChain(this.chain);
        this.version = getVersionForChain(this.network);
    }
    // Quote
    async quote(marketAddressOrName, strikeId, isCall, isBuy, size, options) {
        const market = await this.market(marketAddressOrName);
        return await market.quote(strikeId, isCall, isBuy, size, options);
    }
    async quoteOption(marketAddressOrName, strikeId, isCall, size, options) {
        const option = await this.option(marketAddressOrName, strikeId, isCall);
        return option.quoteAllSync(size, options);
    }
    async quoteStrike(marketAddressOrName, strikeId, size, options) {
        const strike = await this.strike(marketAddressOrName, strikeId);
        return strike.quoteAllSync(size, options);
    }
    async quoteBoard(marketAddressOrName, boardId, size, options) {
        const board = await this.board(marketAddressOrName, boardId);
        return board.quoteAllSync(size, options);
    }
    async quoteMarket(marketAddressOrName, size, options) {
        const market = await this.market(marketAddressOrName);
        return market.quoteAllSync(size, options);
    }
    // Trade
    async approveTradeQuote(marketAddressOrName, owner, amountQuote) {
        const market = await this.market(marketAddressOrName);
        return market.approveTradeQuote(owner, amountQuote);
    }
    async approveTradeBase(marketAddressOrName, owner, amountBase) {
        const market = await this.market(marketAddressOrName);
        return market.approveTradeBase(owner, amountBase);
    }
    async trade(owner, marketAddressOrName, strikeId, isCall, isBuy, size, slippage, options) {
        const market = await this.market(marketAddressOrName);
        return await market.trade(owner, strikeId, isCall, isBuy, size, slippage, options);
    }
    onTrade(callback, options) {
        return TradeEvent.on(this, callback, options);
    }
    // Market
    async markets() {
        return await Market.getAll(this);
    }
    async contractAddresses() {
        return await fetchMarketAddresses(this);
    }
    async marketAddresses() {
        return (await this.contractAddresses()).map(({ optionMarket }) => optionMarket);
    }
    async market(marketAddressOrName) {
        return await Market.get(this, marketAddressOrName);
    }
    async board(marketAddressOrName, boardId) {
        return await Board.get(this, marketAddressOrName, boardId);
    }
    async strike(marketAddressOrName, strikeId) {
        return await Strike.get(this, marketAddressOrName, strikeId);
    }
    async option(marketAddressOrName, strikeId, isCall) {
        return await Option.get(this, marketAddressOrName, strikeId, isCall);
    }
    // Position
    async openPositions(owner) {
        return await Position.getOpenByOwner(this, owner);
    }
    async positions(owner) {
        return await Position.getByOwner(this, owner);
    }
    async allPositions(options) {
        return await Position.getAll(this, options);
    }
    async position(marketAddressOrName, positionId) {
        return await Position.get(this, marketAddressOrName, positionId);
    }
    async events(transactionHashOrReceipt) {
        return await fetchPositionEventDataByHash(this, transactionHashOrReceipt);
    }
    async leaderboard(options) {
        return await fetchLeaderboard(this, options);
    }
    // Account
    account(address) {
        return Account.get(this, address);
    }
    drip(owner) {
        const account = Account.get(this, owner);
        return account.drip();
    }
    // Liquidity Deposits
    async deposits(marketAddressOrName, owner) {
        return await LiquidityDeposit.getByOwner(this, marketAddressOrName, owner);
    }
    async approveDeposit(marketAddressOrName, address, amountQuote) {
        const market = await this.market(marketAddressOrName);
        return market.approveDeposit(address, amountQuote);
    }
    async initiateDeposit(marketAddressOrName, beneficiary, amountQuote) {
        const market = await this.market(marketAddressOrName);
        return market.initiateDeposit(beneficiary, amountQuote);
    }
    // Liquidity Withdrawals
    async withdrawals(marketAddressOrName, owner) {
        return await LiquidityWithdrawal.getByOwner(this, marketAddressOrName, owner);
    }
    async initiateWithdraw(marketAddressOrName, beneficiary, amountLiquidityTokens) {
        const market = await this.market(marketAddressOrName);
        return market.initiateWithdraw(beneficiary, amountLiquidityTokens);
    }
    // Admin
    admin() {
        return Admin.get(this);
    }
    // Rewards
    async claimRewards(address, tokenAddresses) {
        return await AccountRewardEpoch.claim(this, address, tokenAddresses);
    }
    async lyraStaking() {
        return await LyraStaking.get(this);
    }
    async lyraStakingAccount(address) {
        return await LyraStaking.getByOwner(this, address);
    }
    async claimableStakingRewards(address) {
        return LyraStaking.claimableRewards(this, address);
    }
    async globalRewardEpochs() {
        return await GlobalRewardEpoch.getAll(this);
    }
    async latestGlobalRewardEpoch() {
        return await GlobalRewardEpoch.getLatest(this);
    }
    async accountRewardEpochs(address) {
        return await AccountRewardEpoch.getByOwner(this, address);
    }
}
//# sourceMappingURL=lyra.js.map