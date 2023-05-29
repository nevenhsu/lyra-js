"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@apollo/client/core");
var bignumber_1 = require("@ethersproject/bignumber");
var bn_1 = require("../constants/bn");
var queries_1 = require("../constants/queries");
var fetchSnapshots_1 = __importDefault(require("./fetchSnapshots"));
var marketVolumeAndFeesSnapshotsQuery = (0, core_1.gql)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  query marketVolumeAndFeesSnapshots(\n    $market: String!, $min: Int!, $max: Int!, $period: Int!\n  ) {\n    marketVolumeAndFeesSnapshots(first: 1000, orderBy: timestamp, orderDirection: asc, where: {\n      market: $market, \n      timestamp_gte: $min, \n      timestamp_lte: $max, \n      period: $period\n    }) {\n      ", "\n    }\n  }\n"], ["\n  query marketVolumeAndFeesSnapshots(\n    $market: String!, $min: Int!, $max: Int!, $period: Int!\n  ) {\n    marketVolumeAndFeesSnapshots(first: 1000, orderBy: timestamp, orderDirection: asc, where: {\n      market: $market, \n      timestamp_gte: $min, \n      timestamp_lte: $max, \n      period: $period\n    }) {\n      ", "\n    }\n  }\n"])), queries_1.MARKET_VOLUME_AND_FEES_SNAPSHOT_FRAGMENT);
var EMPTY = {
    premiumVolume: bn_1.ZERO_BN,
    notionalVolume: bn_1.ZERO_BN,
    totalShortOpenInterestUSD: bn_1.ZERO_BN,
    vaultFees: bn_1.ZERO_BN,
    vaultFeeComponents: {
        spotPriceFees: bn_1.ZERO_BN,
        optionPriceFees: bn_1.ZERO_BN,
        vegaUtilFees: bn_1.ZERO_BN,
        varianceFees: bn_1.ZERO_BN,
        forceCloseFees: bn_1.ZERO_BN,
        liquidationFees: bn_1.ZERO_BN,
    },
    totalPremiumVolume: bn_1.ZERO_BN,
    totalNotionalVolume: bn_1.ZERO_BN,
    liquidatorFees: bn_1.ZERO_BN,
    smLiquidationFees: bn_1.ZERO_BN,
};
function fetchTradingVolumeHistory(lyra, market, options) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var endTimestamp, data;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    endTimestamp = (_a = options === null || options === void 0 ? void 0 : options.endTimestamp) !== null && _a !== void 0 ? _a : market.block.timestamp;
                    return [4 /*yield*/, (0, fetchSnapshots_1.default)(lyra, marketVolumeAndFeesSnapshotsQuery, {
                            market: market.address.toLowerCase(),
                        }, __assign(__assign({}, options), { endTimestamp: endTimestamp }))];
                case 1:
                    data = _b.sent();
                    if (data.length === 0) {
                        // Always return at least 1 snapshot
                        return [2 /*return*/, [__assign(__assign({}, EMPTY), { startTimestamp: market.block.timestamp, endTimestamp: market.block.timestamp })]];
                    }
                    return [2 /*return*/, data.map(function (marketVolumeAndFeesSnapshot) {
                            var spotPriceFees = bignumber_1.BigNumber.from(marketVolumeAndFeesSnapshot.spotPriceFees);
                            var optionPriceFees = bignumber_1.BigNumber.from(marketVolumeAndFeesSnapshot.optionPriceFees);
                            var vegaUtilFees = bignumber_1.BigNumber.from(marketVolumeAndFeesSnapshot.vegaFees);
                            var varianceFees = bignumber_1.BigNumber.from(marketVolumeAndFeesSnapshot.varianceFees);
                            var forceCloseFees = bignumber_1.BigNumber.from(marketVolumeAndFeesSnapshot.deltaCutoffFees);
                            var liquidationFees = bignumber_1.BigNumber.from(marketVolumeAndFeesSnapshot.lpLiquidationFees);
                            var totalShortPutOpenInterestUSD = bignumber_1.BigNumber.from(marketVolumeAndFeesSnapshot.totalShortPutOpenInterestUSD);
                            var totalShortCallOpenInterestUSD = bignumber_1.BigNumber.from(marketVolumeAndFeesSnapshot.totalShortCallOpenInterestUSD);
                            return {
                                premiumVolume: bignumber_1.BigNumber.from(marketVolumeAndFeesSnapshot.premiumVolume),
                                notionalVolume: bignumber_1.BigNumber.from(marketVolumeAndFeesSnapshot.notionalVolume),
                                totalShortOpenInterestUSD: totalShortCallOpenInterestUSD.add(totalShortPutOpenInterestUSD),
                                vaultFees: spotPriceFees
                                    .add(optionPriceFees)
                                    .add(vegaUtilFees)
                                    .add(varianceFees)
                                    .add(forceCloseFees)
                                    .add(liquidationFees),
                                vaultFeeComponents: {
                                    spotPriceFees: spotPriceFees,
                                    optionPriceFees: optionPriceFees,
                                    vegaUtilFees: vegaUtilFees,
                                    varianceFees: varianceFees,
                                    forceCloseFees: forceCloseFees,
                                    liquidationFees: liquidationFees,
                                },
                                totalPremiumVolume: bignumber_1.BigNumber.from(marketVolumeAndFeesSnapshot.totalPremiumVolume),
                                totalNotionalVolume: bignumber_1.BigNumber.from(marketVolumeAndFeesSnapshot.totalNotionalVolume),
                                liquidatorFees: bignumber_1.BigNumber.from(marketVolumeAndFeesSnapshot.liquidatorFees),
                                smLiquidationFees: bignumber_1.BigNumber.from(marketVolumeAndFeesSnapshot.smLiquidationFees),
                                startTimestamp: marketVolumeAndFeesSnapshot.timestamp - marketVolumeAndFeesSnapshot.period,
                                endTimestamp: marketVolumeAndFeesSnapshot.timestamp,
                            };
                        })];
            }
        });
    });
}
exports.default = fetchTradingVolumeHistory;
var templateObject_1;
//# sourceMappingURL=fetchTradingVolumeHistory.js.map