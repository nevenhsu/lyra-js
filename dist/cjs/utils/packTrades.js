"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.packCloseShortParams = exports.packReduceShortParams = exports.packAddShortParams = exports.packOpenShortParams = exports.packCloseLongParams = exports.packReduceLongParams = exports.packAddLongParams = exports.packOpenLongParams = exports.bnToUint64 = exports.bnToUint32 = exports.toUint32 = exports.toUint64 = void 0;
var bignumber_1 = require("@ethersproject/bignumber");
var bn_1 = require("../constants/bn");
var TWO_BN = bignumber_1.BigNumber.from(2);
var DataTypes;
(function (DataTypes) {
    DataTypes[DataTypes["uint8"] = 0] = "uint8";
    DataTypes[DataTypes["uint32"] = 1] = "uint32";
    DataTypes[DataTypes["uint64"] = 2] = "uint64";
    DataTypes[DataTypes["bool"] = 3] = "bool";
})(DataTypes || (DataTypes = {}));
var PACKED_PARAMS = {
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
function toUint64(amount) {
    // This is converting to 1dp of precision
    return bignumber_1.BigNumber.from(amount).mul(100000000);
}
exports.toUint64 = toUint64;
function toUint32(amount) {
    // This is converting to 1dp of precision
    var bn = bignumber_1.BigNumber.from(amount).mul(100);
    return bignumber_1.BigNumber.from(Math.ceil(bn.toNumber() / 10) * 10);
}
exports.toUint32 = toUint32;
function bnToUint32(amount, decimals) {
    if (decimals === void 0) { decimals = 18; }
    return bignumber_1.BigNumber.from(amount).mul(100).div(bignumber_1.BigNumber.from(10).pow(decimals));
}
exports.bnToUint32 = bnToUint32;
function bnToUint64(amount) {
    return bignumber_1.BigNumber.from(amount).mul(100000000).div(bn_1.UNIT);
}
exports.bnToUint64 = bnToUint64;
function paramAddValue(val, paramMeta) {
    if (val === true || val === false) {
        if (paramMeta.type == DataTypes.bool) {
            return bignumber_1.BigNumber.from(val ? 1 : 0).mul(TWO_BN.pow(paramMeta.offset));
        }
        throw Error('boolean value has non bool datatype');
    }
    var bnVal = bignumber_1.BigNumber.from(val);
    if (paramMeta.type == DataTypes.uint8 && bnVal.gte(TWO_BN.pow(8)))
        throw Error('value too large for datatype uint8');
    if (paramMeta.type == DataTypes.uint32 && bnVal.gte(TWO_BN.pow(32)))
        throw Error('value too large for datatype uint32');
    if (paramMeta.type == DataTypes.uint64 && bnVal.gte(TWO_BN.pow(64)))
        throw Error('value too large for datatype uint64');
    return bnVal.mul(TWO_BN.pow(paramMeta.offset));
}
function getPackedParams(params, paramsForType) {
    var packedParams = bignumber_1.BigNumber.from(0);
    for (var _i = 0, _a = Object.keys(params); _i < _a.length; _i++) {
        var key = _a[_i];
        if (!paramsForType[key])
            throw Error("key ".concat(key, " missing from paramsForType ").concat(JSON.stringify(paramsForType)));
        packedParams = packedParams.add(paramAddValue(params[key], paramsForType[key]));
    }
    return packedParams;
}
function packOpenLongParams(params) {
    return getPackedParams(params, PACKED_PARAMS.openLong);
}
exports.packOpenLongParams = packOpenLongParams;
function packAddLongParams(params) {
    return getPackedParams(params, PACKED_PARAMS.addLong);
}
exports.packAddLongParams = packAddLongParams;
function packReduceLongParams(params) {
    return getPackedParams(params, PACKED_PARAMS.reduceLong);
}
exports.packReduceLongParams = packReduceLongParams;
function packCloseLongParams(params) {
    return getPackedParams(params, PACKED_PARAMS.closeLong);
}
exports.packCloseLongParams = packCloseLongParams;
function packOpenShortParams(params) {
    return getPackedParams(params, PACKED_PARAMS.openShort);
}
exports.packOpenShortParams = packOpenShortParams;
function packAddShortParams(params) {
    return getPackedParams(params, PACKED_PARAMS.addShort);
}
exports.packAddShortParams = packAddShortParams;
function packReduceShortParams(params) {
    return getPackedParams(params, PACKED_PARAMS.reduceShort);
}
exports.packReduceShortParams = packReduceShortParams;
function packCloseShortParams(params) {
    return getPackedParams(params, PACKED_PARAMS.closeShort);
}
exports.packCloseShortParams = packCloseShortParams;
//# sourceMappingURL=packTrades.js.map