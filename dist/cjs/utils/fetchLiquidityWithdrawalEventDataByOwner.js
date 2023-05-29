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
var ethers_1 = require("ethers");
var bn_1 = require("../constants/bn");
var queries_1 = require("../constants/queries");
var liquidity_deposit_1 = require("../liquidity_deposit");
var subgraphRequest_1 = __importDefault(require("./subgraphRequest"));
var lpUserLiquiditiesQuery = (0, core_1.gql)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  query lpuserLiquidities($user: String!, $pool: String!) {\n    lpuserLiquidities(where: { \n      user: $user,\n      pool: $pool\n    }) {\n      ", "\n    }\n    circuitBreakers(first: 1, where: {\n      pool: $pool\n    }) {\n      ", "\n    }\n  }\n"], ["\n  query lpuserLiquidities($user: String!, $pool: String!) {\n    lpuserLiquidities(where: { \n      user: $user,\n      pool: $pool\n    }) {\n      ", "\n    }\n    circuitBreakers(first: 1, where: {\n      pool: $pool\n    }) {\n      ", "\n    }\n  }\n"])), queries_1.LIQUIDITY_WITHDRAWAL_FRAGMENT, queries_1.CIRCUIT_BREAKER_FRAGMENT);
function fetchLiquidityWithdrawalEventDataByOwner(lyra, owner, market) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var data, userLiquidity, circuitBreakerData, circuitBreaker, withdrawalQueuedEvents, withdrawalProcessedEvents, withdrawalQueuedEventMap, withdrawalProcessedEventMap, instantDepositEvents, withdrawalEvents;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, (0, subgraphRequest_1.default)(lyra.subgraphClient, {
                        query: lpUserLiquiditiesQuery,
                        variables: {
                            user: owner.toLowerCase(),
                            pool: market.contractAddresses.liquidityPool.toLowerCase(),
                        },
                    })];
                case 1:
                    data = (_c.sent()).data;
                    userLiquidity = data === null || data === void 0 ? void 0 : data.lpuserLiquidities[0];
                    circuitBreakerData = data === null || data === void 0 ? void 0 : data.circuitBreakers[0];
                    circuitBreaker = circuitBreakerData
                        ? {
                            timestamp: circuitBreakerData.cbTimestamp,
                            reason: circuitBreakerData.ivVarianceCrossed || circuitBreakerData.skewVarianceCrossed
                                ? liquidity_deposit_1.LiquidityDelayReason.Volatility
                                : circuitBreakerData.liquidityVarianceCrossed
                                    ? liquidity_deposit_1.LiquidityDelayReason.Liquidity
                                    : liquidity_deposit_1.LiquidityDelayReason.Keeper,
                        }
                        : null;
                    if (!userLiquidity) {
                        return [2 /*return*/, { circuitBreaker: circuitBreaker, events: [] }];
                    }
                    withdrawalQueuedEvents = (_a = userLiquidity.pendingDepositsAndWithdrawals.map(function (queuedWithdrawal) {
                        return {
                            withdrawer: owner,
                            beneficiary: owner,
                            queueId: parseInt(queuedWithdrawal.queueID, 10),
                            amountWithdrawn: ethers_1.BigNumber.from(queuedWithdrawal.pendingAmount),
                            totalQueuedWithdrawals: bn_1.ZERO_BN,
                            timestamp: queuedWithdrawal.timestamp,
                            transactionHash: queuedWithdrawal.transactionHash,
                        };
                    })) !== null && _a !== void 0 ? _a : [];
                    withdrawalProcessedEvents = (_b = userLiquidity.depositsAndWithdrawals.map(function (processedWithdrawal) {
                        return {
                            caller: owner,
                            beneficiary: owner,
                            queueId: parseInt(processedWithdrawal.queueID, 10),
                            amountWithdrawn: ethers_1.BigNumber.from(processedWithdrawal.quoteAmount),
                            tokenPrice: ethers_1.BigNumber.from(processedWithdrawal.tokenPrice),
                            quoteReceived: ethers_1.BigNumber.from(processedWithdrawal.tokenAmount),
                            totalQueuedWithdrawals: bn_1.ZERO_BN,
                            timestamp: processedWithdrawal.timestamp,
                            transactionHash: processedWithdrawal.transactionHash,
                        };
                    })) !== null && _b !== void 0 ? _b : [];
                    withdrawalQueuedEventMap = withdrawalQueuedEvents.reduce(function (map, withdrawalQueuedEvent) {
                        var _a;
                        return (__assign(__assign({}, map), (_a = {}, _a[withdrawalQueuedEvent.queueId] = withdrawalQueuedEvent, _a)));
                    }, {});
                    withdrawalProcessedEventMap = withdrawalProcessedEvents.reduce(function (map, withdrawalProcessedEvent) {
                        var _a;
                        if (withdrawalProcessedEvent.queueId === 0) {
                            return map;
                        }
                        else {
                            return __assign(__assign({}, map), (_a = {}, _a[withdrawalProcessedEvent.queueId] = withdrawalProcessedEvent, _a));
                        }
                    }, {});
                    instantDepositEvents = withdrawalProcessedEvents.map(function (processed) { return ({
                        processed: processed,
                        isProcessed: true,
                        isInstant: true,
                    }); });
                    withdrawalEvents = Object.entries(withdrawalQueuedEventMap).map(function (_a) {
                        var withdrawalQueueId = _a[0], queued = _a[1];
                        var processed = withdrawalProcessedEventMap[parseInt(withdrawalQueueId, 10)];
                        if (processed) {
                            return {
                                queued: queued,
                                processed: processed,
                                isProcessed: true,
                                isInstant: false,
                            };
                        }
                        else {
                            return {
                                queued: queued,
                                isProcessed: false,
                                isInstant: false,
                            };
                        }
                    });
                    return [2 /*return*/, {
                            events: instantDepositEvents.concat(withdrawalEvents).sort(function (a, b) {
                                var bTimestamp = b.isProcessed ? b.processed.timestamp : b.queued.timestamp;
                                var aTimestamp = a.isProcessed ? a.processed.timestamp : a.queued.timestamp;
                                return bTimestamp - aTimestamp;
                            }),
                            circuitBreaker: circuitBreaker,
                        }];
            }
        });
    });
}
exports.default = fetchLiquidityWithdrawalEventDataByOwner;
var templateObject_1;
//# sourceMappingURL=fetchLiquidityWithdrawalEventDataByOwner.js.map