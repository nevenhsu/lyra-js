import { BigNumber } from '@ethersproject/bignumber';
import { UNIT } from '../constants/bn';
const TWO_BN = BigNumber.from(2);
var DataTypes;
(function (DataTypes) {
    DataTypes[DataTypes["uint8"] = 0] = "uint8";
    DataTypes[DataTypes["uint32"] = 1] = "uint32";
    DataTypes[DataTypes["uint64"] = 2] = "uint64";
    DataTypes[DataTypes["bool"] = 3] = "bool";
})(DataTypes || (DataTypes = {}));
const PACKED_PARAMS = {
    openLong: {
        market: { offset: 0, type: DataTypes.uint8 },
        token: { offset: 8, type: DataTypes.uint8 },
        isCall: { offset: 16, type: DataTypes.bool },
        iterations: { offset: 24, type: DataTypes.uint8 },
        strikeId: { offset: 32, type: DataTypes.uint32 },
        maxCost: { offset: 64, type: DataTypes.uint32 },
        inputAmount: { offset: 96, type: DataTypes.uint32 },
        size: { offset: 128, type: DataTypes.uint64 },
    },
    addLong: {
        market: { offset: 0, type: DataTypes.uint8 },
        token: { offset: 8, type: DataTypes.uint8 },
        iterations: { offset: 16, type: DataTypes.uint8 },
        positionId: { offset: 24, type: DataTypes.uint32 },
        maxCost: { offset: 56, type: DataTypes.uint32 },
        inputAmount: { offset: 88, type: DataTypes.uint32 },
        size: { offset: 120, type: DataTypes.uint64 },
    },
    reduceLong: {
        market: { offset: 0, type: DataTypes.uint8 },
        token: { offset: 8, type: DataTypes.uint8 },
        iterations: { offset: 16, type: DataTypes.uint8 },
        isForceClose: { offset: 24, type: DataTypes.bool },
        positionId: { offset: 32, type: DataTypes.uint32 },
        inputAmount: { offset: 64, type: DataTypes.uint32 },
        size: { offset: 96, type: DataTypes.uint64 },
        minReceived: { offset: 160, type: DataTypes.uint32 },
    },
    closeLong: {
        market: { offset: 0, type: DataTypes.uint8 },
        token: { offset: 8, type: DataTypes.uint8 },
        iterations: { offset: 16, type: DataTypes.uint8 },
        isForceClose: { offset: 24, type: DataTypes.bool },
        positionId: { offset: 32, type: DataTypes.uint32 },
        inputAmount: { offset: 64, type: DataTypes.uint32 },
        minReceived: { offset: 96, type: DataTypes.uint32 },
    },
    openShort: {
        market: { offset: 0, type: DataTypes.uint8 },
        token: { offset: 8, type: DataTypes.uint8 },
        optionType: { offset: 16, type: DataTypes.uint8 },
        iterations: { offset: 24, type: DataTypes.uint8 },
        strikeId: { offset: 32, type: DataTypes.uint32 },
        minReceived: { offset: 64, type: DataTypes.uint32 },
        inputAmount: { offset: 96, type: DataTypes.uint32 },
        size: { offset: 128, type: DataTypes.uint64 },
        collateral: { offset: 192, type: DataTypes.uint64 },
    },
    addShort: {
        market: { offset: 0, type: DataTypes.uint8 },
        token: { offset: 8, type: DataTypes.uint8 },
        iterations: { offset: 16, type: DataTypes.uint8 },
        positionId: { offset: 24, type: DataTypes.uint32 },
        inputAmount: { offset: 56, type: DataTypes.uint32 },
        minReceived: { offset: 88, type: DataTypes.uint32 },
        size: { offset: 120, type: DataTypes.uint64 },
        absoluteCollateral: { offset: 184, type: DataTypes.uint64 },
    },
    reduceShort: {
        market: { offset: 0, type: DataTypes.uint8 },
        token: { offset: 8, type: DataTypes.uint8 },
        iterations: { offset: 16, type: DataTypes.uint8 },
        isForceClose: { offset: 24, type: DataTypes.bool },
        positionId: { offset: 32, type: DataTypes.uint32 },
        inputAmount: { offset: 64, type: DataTypes.uint32 },
        maxCost: { offset: 96, type: DataTypes.uint32 },
        size: { offset: 128, type: DataTypes.uint64 },
        absoluteCollateral: { offset: 196, type: DataTypes.uint64 },
    },
    closeShort: {
        market: { offset: 0, type: DataTypes.uint8 },
        token: { offset: 8, type: DataTypes.uint8 },
        iterations: { offset: 16, type: DataTypes.uint8 },
        isForceClose: { offset: 24, type: DataTypes.bool },
        positionId: { offset: 32, type: DataTypes.uint32 },
        inputAmount: { offset: 64, type: DataTypes.uint32 },
        maxCost: { offset: 96, type: DataTypes.uint32 },
    },
};
export function toUint64(amount) {
    // This is converting to 1dp of precision
    return BigNumber.from(amount).mul(100000000);
}
export function toUint32(amount) {
    // This is converting to 1dp of precision
    const bn = BigNumber.from(amount).mul(100);
    return BigNumber.from(Math.ceil(bn.toNumber() / 10) * 10);
}
export function bnToUint32(amount, decimals = 18) {
    return BigNumber.from(amount).mul(100).div(BigNumber.from(10).pow(decimals));
}
export function bnToUint64(amount) {
    return BigNumber.from(amount).mul(100000000).div(UNIT);
}
function paramAddValue(val, paramMeta) {
    if (val === true || val === false) {
        if (paramMeta.type == DataTypes.bool) {
            return BigNumber.from(val ? 1 : 0).mul(TWO_BN.pow(paramMeta.offset));
        }
        throw Error('boolean value has non bool datatype');
    }
    const bnVal = BigNumber.from(val);
    if (paramMeta.type == DataTypes.uint8 && bnVal.gte(TWO_BN.pow(8)))
        throw Error('value too large for datatype uint8');
    if (paramMeta.type == DataTypes.uint32 && bnVal.gte(TWO_BN.pow(32)))
        throw Error('value too large for datatype uint32');
    if (paramMeta.type == DataTypes.uint64 && bnVal.gte(TWO_BN.pow(64)))
        throw Error('value too large for datatype uint64');
    return bnVal.mul(TWO_BN.pow(paramMeta.offset));
}
function getPackedParams(params, paramsForType) {
    let packedParams = BigNumber.from(0);
    for (const key of Object.keys(params)) {
        if (!paramsForType[key])
            throw Error(`key ${key} missing from paramsForType ${JSON.stringify(paramsForType)}`);
        packedParams = packedParams.add(paramAddValue(params[key], paramsForType[key]));
    }
    return packedParams;
}
export function packOpenLongParams(params) {
    return getPackedParams(params, PACKED_PARAMS.openLong);
}
export function packAddLongParams(params) {
    return getPackedParams(params, PACKED_PARAMS.addLong);
}
export function packReduceLongParams(params) {
    return getPackedParams(params, PACKED_PARAMS.reduceLong);
}
export function packCloseLongParams(params) {
    return getPackedParams(params, PACKED_PARAMS.closeLong);
}
export function packOpenShortParams(params) {
    return getPackedParams(params, PACKED_PARAMS.openShort);
}
export function packAddShortParams(params) {
    return getPackedParams(params, PACKED_PARAMS.addShort);
}
export function packReduceShortParams(params) {
    return getPackedParams(params, PACKED_PARAMS.reduceShort);
}
export function packCloseShortParams(params) {
    return getPackedParams(params, PACKED_PARAMS.closeShort);
}
//# sourceMappingURL=packTrades.js.map