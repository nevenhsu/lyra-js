import { BigNumber } from '@ethersproject/bignumber';
export function from18DecimalBN(val, decimals) {
    return val.div(BigNumber.from(10).pow(18 - decimals));
}
export function to18DecimalBN(val, decimals) {
    return val.mul(BigNumber.from(10).pow(18 - decimals));
}
//# sourceMappingURL=convertBNDecimals.js.map