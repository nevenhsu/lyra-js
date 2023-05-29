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
exports.LiquidityWithdrawal = void 0;
var bn_1 = require("../constants/bn");
var contracts_1 = require("../constants/contracts");
var buildTx_1 = __importDefault(require("../utils/buildTx"));
var fetchLiquidityWithdrawalEventDataByOwner_1 = __importDefault(require("../utils/fetchLiquidityWithdrawalEventDataByOwner"));
var getLyraMarketContract_1 = __importDefault(require("../utils/getLyraMarketContract"));
var LiquidityWithdrawal = /** @class */ (function () {
    function LiquidityWithdrawal(lyra, data) {
        var _a;
        // Data
        this.lyra = lyra;
        this.__market = data.market;
        // Fields
        var queued = !data.events.isInstant ? data.events.queued : null;
        var processed = data.events.isProcessed ? data.events.processed : null;
        var queuedOrProcessed = queued !== null && queued !== void 0 ? queued : processed;
        if (!queuedOrProcessed) {
            throw new Error('No queued or processed event for LiquidityWithdrawal');
        }
        this.queueId = queuedOrProcessed.queueId;
        this.beneficiary = queuedOrProcessed.beneficiary;
        this.balance = (_a = queued === null || queued === void 0 ? void 0 : queued.amountWithdrawn) !== null && _a !== void 0 ? _a : bn_1.ZERO_BN;
        this.tokenPriceAtWithdraw = processed === null || processed === void 0 ? void 0 : processed.tokenPrice;
        this.value = processed === null || processed === void 0 ? void 0 : processed.amountWithdrawn;
        this.isPending = !processed;
        this.withdrawalRequestedTimestamp = queuedOrProcessed.timestamp;
        this.withdrawalTimestamp = processed
            ? processed.timestamp
            : queued
                ? queued.timestamp + data.market.params.withdrawalDelay
                : // Should never happen
                    0;
        this.timeToWithdrawal = Math.max(0, this.withdrawalTimestamp - data.market.block.timestamp);
        this.delayReason =
            this.timeToWithdrawal === 0 &&
                this.isPending &&
                data.circuitBreaker &&
                data.circuitBreaker.timestamp > data.market.block.timestamp
                ? data.circuitBreaker.reason
                : null;
    }
    // Getters
    LiquidityWithdrawal.getByOwner = function (lyra, market, owner) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, events, circuitBreaker, marketLiquidity, liquidityDeposits;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, Promise.all([
                            (0, fetchLiquidityWithdrawalEventDataByOwner_1.default)(lyra, owner, market),
                            market.liquidity(),
                        ])];
                    case 1:
                        _a = _c.sent(), _b = _a[0], events = _b.events, circuitBreaker = _b.circuitBreaker, marketLiquidity = _a[1];
                        liquidityDeposits = events.map(function (events) {
                            return new LiquidityWithdrawal(lyra, {
                                market: market,
                                events: events,
                                circuitBreaker: circuitBreaker,
                                marketLiquidity: marketLiquidity,
                            });
                        });
                        return [2 /*return*/, liquidityDeposits];
                }
            });
        });
    };
    // Transactions
    LiquidityWithdrawal.initiateWithdraw = function (market, beneficiary, amountLiquidityTokens) {
        var liquidityPoolContract = (0, getLyraMarketContract_1.default)(market.lyra, market.contractAddresses, market.lyra.version, contracts_1.LyraMarketContractId.LiquidityPool);
        var data = liquidityPoolContract.interface.encodeFunctionData('initiateWithdraw', [
            beneficiary,
            amountLiquidityTokens,
        ]);
        return (0, buildTx_1.default)(market.lyra.provider, market.lyra.provider.network.chainId, liquidityPoolContract.address, beneficiary, data);
    };
    // Edges
    LiquidityWithdrawal.prototype.market = function () {
        return this.__market;
    };
    return LiquidityWithdrawal;
}());
exports.LiquidityWithdrawal = LiquidityWithdrawal;
//# sourceMappingURL=index.js.map