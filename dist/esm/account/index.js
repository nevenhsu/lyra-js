import { Deployment, LyraContractId } from '../constants/contracts';
import buildTx from '../utils/buildTx';
import getLyraContract from '../utils/getLyraContract';
import fetchAccountBalancesAndAllowances from './fetchAccountBalancesAndAllowances';
export class Account {
    constructor(lyra, address) {
        this.lyra = lyra;
        this.address = address;
    }
    // Getters
    static get(lyra, account) {
        return new Account(lyra, account);
    }
    // Dynamic Fields
    async balances() {
        return await fetchAccountBalancesAndAllowances(this.lyra, this.address);
    }
    async marketBalances(marketAddressOrName) {
        const [market, balances] = await Promise.all([this.lyra.market(marketAddressOrName), this.balances()]);
        const balance = balances.find(balance => balance.marketAddress.toLowerCase() === market.address.toLowerCase());
        if (!balance) {
            throw new Error(`No balances exist for market`);
        }
        return balance;
    }
    drip() {
        if (this.lyra.deployment !== Deployment.Testnet) {
            throw new Error('Faucet is only supported on testnet contracts');
        }
        const faucet = getLyraContract(this.lyra, this.lyra.version, LyraContractId.TestFaucet);
        const data = faucet.interface.encodeFunctionData('drip');
        return buildTx(this.lyra.provider, this.lyra.provider.network.chainId, faucet.address, this.address, data);
    }
}
//# sourceMappingURL=index.js.map