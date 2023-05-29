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
var bignumber_1 = require("@ethersproject/bignumber");
var contracts_1 = require("@ethersproject/contracts");
var __1 = require("..");
var bn_1 = require("../constants/bn");
var fetchMarketAddresses_1 = __importDefault(require("./fetchMarketAddresses"));
var getLyraMarketContract_1 = require("./getLyraMarketContract");
var DEFAULT_POLL_INTERVAL = 10 * 1000;
function fetchTradeListener(lyra, callback, options) {
    var _this = this;
    var _a, _b;
    var ms = (_a = options === null || options === void 0 ? void 0 : options.pollInterval) !== null && _a !== void 0 ? _a : DEFAULT_POLL_INTERVAL;
    var startBlockTag = (_b = options === null || options === void 0 ? void 0 : options.startBlockNumber) !== null && _b !== void 0 ? _b : 'latest';
    var timeout;
    var optionMarket = new contracts_1.Contract(bn_1.ZERO_ADDRESS, (0, getLyraMarketContract_1.getMarketContractABI)(lyra.version, __1.LyraMarketContractId.OptionMarket, lyra.network));
    Promise.all([(0, fetchMarketAddresses_1.default)(lyra), lyra.provider.getBlock(startBlockTag)]).then(function (_a) {
        var addresses = _a[0], block = _a[1];
        return __awaiter(_this, void 0, void 0, function () {
            var prevBlock, poll;
            var _this = this;
            return __generator(this, function (_b) {
                console.debug("Polling from block ".concat(block.number, " every ").concat(ms, "ms"));
                prevBlock = block;
                poll = function () { return __awaiter(_this, void 0, void 0, function () {
                    var latestBlock, fromBlockNumber, toBlockNumber, trades;
                    var _this = this;
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0: return [4 /*yield*/, lyra.provider.getBlock('latest')];
                            case 1:
                                latestBlock = _b.sent();
                                fromBlockNumber = prevBlock.number + 1;
                                toBlockNumber = latestBlock.number;
                                if (fromBlockNumber >= toBlockNumber) {
                                    // Skip if no new blocks
                                    setTimeout(poll, ms);
                                    return [2 /*return*/];
                                }
                                console.debug("Querying block range: ".concat(fromBlockNumber, " to ").concat(toBlockNumber, " (").concat(toBlockNumber - fromBlockNumber, " blocks)"));
                                return [4 /*yield*/, lyra.provider.send('eth_getLogs', [
                                        {
                                            address: addresses.map(function (a) { return a.optionMarket; }),
                                            fromBlock: bignumber_1.BigNumber.from(fromBlockNumber).toHexString(),
                                            toBlock: bignumber_1.BigNumber.from(toBlockNumber).toHexString(),
                                            topics: [[((_a = optionMarket.filters.Trade().topics) !== null && _a !== void 0 ? _a : [])[0]]],
                                        },
                                    ])];
                            case 2:
                                trades = _b.sent();
                                if (trades.length > 0) {
                                    console.debug("Found ".concat(trades.length, " new trades"));
                                }
                                // Parse trade events
                                return [4 /*yield*/, Promise.all(trades.map(function (trade) { return __awaiter(_this, void 0, void 0, function () {
                                        var tradeEvents;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0: return [4 /*yield*/, __1.TradeEvent.getByHash(lyra, trade.transactionHash)];
                                                case 1:
                                                    tradeEvents = _a.sent();
                                                    tradeEvents.map(function (tradeEvent) { return callback(tradeEvent); });
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); }))
                                    // Poll
                                ];
                            case 3:
                                // Parse trade events
                                _b.sent();
                                // Poll
                                prevBlock = latestBlock;
                                setTimeout(poll, ms);
                                return [2 /*return*/];
                        }
                    });
                }); };
                timeout = setTimeout(poll, ms);
                return [2 /*return*/];
            });
        });
    });
    return {
        off: function () {
            if (timeout) {
                clearTimeout(timeout);
            }
        },
    };
}
exports.default = fetchTradeListener;
//# sourceMappingURL=fetchTradeListener.js.map