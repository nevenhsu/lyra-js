import { BigNumber, BigNumberish } from '@ethersproject/bignumber';
import { OptionType } from '../constants/contracts';
export type WrapperTradeType = 'openLong' | 'addLong' | 'reduceLong' | 'closeLong' | 'openShort' | 'addShort' | 'reduceShort' | 'closeShort';
declare enum DataTypes {
    uint8 = 0,
    uint32 = 1,
    uint64 = 2,
    bool = 3
}
type PackedTradeParameter = {
    offset: number;
    type: DataTypes;
};
export type PackedTradeParameters = {
    [key: string]: PackedTradeParameter;
};
export declare function toUint64(amount: number): BigNumber;
export declare function toUint32(amount: number): BigNumber;
export declare function bnToUint32(amount: BigNumberish, decimals?: number): BigNumber;
export declare function bnToUint64(amount: BigNumberish): BigNumber;
export declare function packOpenLongParams(params: {
    market: BigNumberish;
    token: BigNumberish;
    isCall: boolean;
    iterations: BigNumberish;
    strikeId: BigNumberish;
    maxCost: BigNumberish;
    inputAmount: BigNumberish;
    size: BigNumberish;
}): BigNumber;
export declare function packAddLongParams(params: {
    market: BigNumberish;
    token: BigNumberish;
    iterations: BigNumberish;
    positionId: BigNumberish;
    maxCost: BigNumberish;
    inputAmount: BigNumberish;
    size: BigNumberish;
}): BigNumber;
export declare function packReduceLongParams(params: {
    market: BigNumberish;
    token: BigNumberish;
    iterations: BigNumberish;
    isForceClose: boolean;
    positionId: BigNumberish;
    inputAmount: BigNumberish;
    size: BigNumberish;
    minReceived: BigNumberish;
}): BigNumber;
export declare function packCloseLongParams(params: {
    market: BigNumberish;
    token: BigNumberish;
    iterations: BigNumberish;
    isForceClose: boolean;
    positionId: BigNumberish;
    inputAmount: BigNumberish;
    minReceived: BigNumberish;
}): BigNumber;
export declare function packOpenShortParams(params: {
    market: BigNumberish;
    token: BigNumberish;
    optionType: OptionType;
    iterations: BigNumberish;
    strikeId: BigNumberish;
    minReceived: BigNumberish;
    inputAmount: BigNumberish;
    size: BigNumberish;
    collateral: BigNumberish;
}): BigNumber;
export declare function packAddShortParams(params: {
    market: BigNumberish;
    token: BigNumberish;
    iterations: BigNumberish;
    positionId: BigNumberish;
    inputAmount: BigNumberish;
    minReceived: BigNumberish;
    size: BigNumberish;
    absoluteCollateral: BigNumberish;
}): BigNumber;
export declare function packReduceShortParams(params: {
    market: BigNumberish;
    token: BigNumberish;
    iterations: BigNumberish;
    isForceClose: boolean;
    positionId: BigNumberish;
    inputAmount: BigNumberish;
    maxCost: BigNumberish;
    size: BigNumberish;
    absoluteCollateral: BigNumberish;
}): BigNumber;
export declare function packCloseShortParams(params: {
    market: BigNumberish;
    token: BigNumberish;
    iterations: BigNumberish;
    isForceClose: boolean;
    positionId: BigNumberish;
    inputAmount: BigNumberish;
    maxCost: BigNumberish;
}): BigNumber;
export {};
