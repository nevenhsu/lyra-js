import { BigNumber } from '@ethersproject/bignumber';
type Options = {
    ceil?: boolean;
    bnDecimals?: number;
};
export default function roundToDp(val: BigNumber, n: number, options?: Options): BigNumber;
export {};
