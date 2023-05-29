"use strict";
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
var bn_1 = require("../constants/bn");
var fetchAllLiquidityWithdrawalEventDataByOwner_1 = __importDefault(require("./fetchAllLiquidityWithdrawalEventDataByOwner"));
var fetchLatestLiquidityWithdrawalEventDataByOwner_1 = __importDefault(require("./fetchLatestLiquidityWithdrawalEventDataByOwner"));
var getUniqueBy_1 = __importDefault(require("./getUniqueBy"));
function fetchLiquidityWithdrawalEventDataByOwner(lyra, owner, market) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, latestLiquidityWithdrawal, allLiquidityWithdrawals, uniqueQueuedWithdrawals, uniqueProcessedWithdrawals, withdrawalQueuedMap, withdrawalProcessedMap, withdrawalQueuedOrProcessedEvents;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, Promise.all([
                        // Contract (realtime) data
                        (0, fetchLatestLiquidityWithdrawalEventDataByOwner_1.default)(lyra, owner, market),
                        // Subgraph data
                        (0, fetchAllLiquidityWithdrawalEventDataByOwner_1.default)(lyra, owner, market),
                    ])];
                case 1:
                    _a = _b.sent(), latestLiquidityWithdrawal = _a[0], allLiquidityWithdrawals = _a[1];
                    uniqueQueuedWithdrawals = (0, getUniqueBy_1.default)(latestLiquidityWithdrawal.queued.concat(allLiquidityWithdrawals.queued), function (withdrawal) { return withdrawal === null || withdrawal === void 0 ? void 0 : withdrawal.timestamp; });
                    uniqueProcessedWithdrawals = (0, getUniqueBy_1.default)(latestLiquidityWithdrawal.processed.concat(allLiquidityWithdrawals.processed), function (withdrawal) { return withdrawal === null || withdrawal === void 0 ? void 0 : withdrawal.timestamp; });
                    withdrawalQueuedMap = {};
                    withdrawalProcessedMap = {};
                    withdrawalQueuedOrProcessedEvents = [];
                    uniqueProcessedWithdrawals.forEach(function (withdrawalProcessedEvent) {
                        if ((withdrawalProcessedEvent === null || withdrawalProcessedEvent === void 0 ? void 0 : withdrawalProcessedEvent.withdrawalQueueId) == bn_1.ZERO_BN) {
                            withdrawalQueuedOrProcessedEvents.push({
                                processed: withdrawalProcessedEvent,
                            });
                        }
                    });
                    uniqueQueuedWithdrawals.forEach(function (withdrawalQueuedEvent) {
                        var id = String(withdrawalQueuedEvent === null || withdrawalQueuedEvent === void 0 ? void 0 : withdrawalQueuedEvent.withdrawalQueueId);
                        withdrawalQueuedMap[id] = withdrawalQueuedEvent;
                    });
                    uniqueProcessedWithdrawals.forEach(function (withdrawalProcessedEvent) {
                        var id = String(withdrawalProcessedEvent === null || withdrawalProcessedEvent === void 0 ? void 0 : withdrawalProcessedEvent.withdrawalQueueId);
                        withdrawalProcessedMap[id] = withdrawalProcessedEvent;
                    });
                    uniqueQueuedWithdrawals.forEach(function (withdrawalQueuedEvent) {
                        var id = String(withdrawalQueuedEvent === null || withdrawalQueuedEvent === void 0 ? void 0 : withdrawalQueuedEvent.withdrawalQueueId);
                        if (withdrawalQueuedMap[id] && withdrawalProcessedMap[id]) {
                            withdrawalQueuedOrProcessedEvents.push({
                                queued: withdrawalQueuedMap[id],
                                processed: withdrawalProcessedMap[id],
                            });
                        }
                        else if (withdrawalQueuedMap[id] && !withdrawalProcessedMap[id]) {
                            withdrawalQueuedOrProcessedEvents.push({
                                queued: withdrawalQueuedMap[id],
                            });
                        }
                    });
                    return [2 /*return*/, {
                            events: withdrawalQueuedOrProcessedEvents,
                        }];
            }
        });
    });
}
exports.default = fetchLiquidityWithdrawalEventDataByOwner;
//# sourceMappingURL=fetchLiquidityWithdrawalEventDataByOwner.js.map