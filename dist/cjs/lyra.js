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
exports.Deployment = exports.Version = void 0;
var core_1 = require("@apollo/client/core");
var cross_fetch_1 = __importDefault(require("cross-fetch"));
var account_1 = require("./account");
var account_reward_epoch_1 = require("./account_reward_epoch");
var admin_1 = require("./admin");
var board_1 = require("./board");
var chain_1 = require("./constants/chain");
var links_1 = require("./constants/links");
var global_reward_epoch_1 = require("./global_reward_epoch");
var liquidity_deposit_1 = require("./liquidity_deposit");
var liquidity_withdrawal_1 = require("./liquidity_withdrawal");
var lyra_staking_1 = require("./lyra_staking");
var market_1 = require("./market");
var option_1 = require("./option");
var position_1 = require("./position");
var strike_1 = require("./strike");
var trade_event_1 = require("./trade_event");
var fetchLeaderboard_1 = __importDefault(require("./utils/fetchLeaderboard"));
var fetchMarketAddresses_1 = __importDefault(require("./utils/fetchMarketAddresses"));
var fetchPositionEventDataByHash_1 = __importDefault(require("./utils/fetchPositionEventDataByHash"));
var getLyraChainForChainId_1 = __importDefault(require("./utils/getLyraChainForChainId"));
var getLyraChainIdForChain_1 = __importDefault(require("./utils/getLyraChainIdForChain"));
var getLyraDeploymentForChain_1 = __importDefault(require("./utils/getLyraDeploymentForChain"));
var getLyraDeploymentProvider_1 = __importDefault(require("./utils/getLyraDeploymentProvider"));
var getLyraDeploymentSubgraphURI_1 = __importDefault(require("./utils/getLyraDeploymentSubgraphURI"));
var getLyraNetworkForChain_1 = __importDefault(require("./utils/getLyraNetworkForChain"));
var getVersionForChain_1 = __importDefault(require("./utils/getVersionForChain"));
var Version;
(function (Version) {
    Version["Avalon"] = "avalon";
    Version["Newport"] = "newport";
})(Version = exports.Version || (exports.Version = {}));
var contracts_1 = require("./constants/contracts");
Object.defineProperty(exports, "Deployment", { enumerable: true, get: function () { return contracts_1.Deployment; } });
var Lyra = /** @class */ (function () {
    function Lyra(config) {
        if (config === void 0) { config = chain_1.Chain.Optimism; }
        var _a, _b;
        if (typeof config === 'object') {
            // Config
            var configObj = config;
            this.provider = config.provider;
            this.optimismProvider = config.optimismProvider;
            this.ethereumProvider = config.ethereumProvider;
            this.chain = (0, getLyraChainForChainId_1.default)(this.provider.network.chainId);
            this.subgraphUri = (_a = configObj === null || configObj === void 0 ? void 0 : configObj.subgraphUri) !== null && _a !== void 0 ? _a : (0, getLyraDeploymentSubgraphURI_1.default)(this.chain);
            this.apiUri = (_b = configObj.apiUri) !== null && _b !== void 0 ? _b : links_1.LYRA_API_URL;
        }
        else if (typeof config === 'number') {
            // Chain ID
            this.chain = (0, getLyraChainForChainId_1.default)(config);
            this.provider = (0, getLyraDeploymentProvider_1.default)(this.chain);
            this.subgraphUri = (0, getLyraDeploymentSubgraphURI_1.default)(this.chain);
        }
        else {
            // String
            this.chain = config;
            this.provider = (0, getLyraDeploymentProvider_1.default)(this.chain);
            this.subgraphUri = (0, getLyraDeploymentSubgraphURI_1.default)(this.chain);
        }
        this.subgraphClient = new core_1.ApolloClient({
            link: new core_1.HttpLink({ uri: this.subgraphUri, fetch: cross_fetch_1.default }),
            cache: new core_1.InMemoryCache(),
        });
        this.apiUri = links_1.LYRA_API_URL;
        this.chainId = (0, getLyraChainIdForChain_1.default)(this.chain);
        this.deployment = (0, getLyraDeploymentForChain_1.default)(this.chain);
        this.network = (0, getLyraNetworkForChain_1.default)(this.chain);
        this.version = (0, getVersionForChain_1.default)(this.network);
    }
    // Quote
    Lyra.prototype.quote = function (marketAddressOrName, strikeId, isCall, isBuy, size, options) {
        return __awaiter(this, void 0, void 0, function () {
            var market;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.market(marketAddressOrName)];
                    case 1:
                        market = _a.sent();
                        return [4 /*yield*/, market.quote(strikeId, isCall, isBuy, size, options)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Lyra.prototype.quoteOption = function (marketAddressOrName, strikeId, isCall, size, options) {
        return __awaiter(this, void 0, void 0, function () {
            var option;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.option(marketAddressOrName, strikeId, isCall)];
                    case 1:
                        option = _a.sent();
                        return [2 /*return*/, option.quoteAllSync(size, options)];
                }
            });
        });
    };
    Lyra.prototype.quoteStrike = function (marketAddressOrName, strikeId, size, options) {
        return __awaiter(this, void 0, void 0, function () {
            var strike;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.strike(marketAddressOrName, strikeId)];
                    case 1:
                        strike = _a.sent();
                        return [2 /*return*/, strike.quoteAllSync(size, options)];
                }
            });
        });
    };
    Lyra.prototype.quoteBoard = function (marketAddressOrName, boardId, size, options) {
        return __awaiter(this, void 0, void 0, function () {
            var board;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.board(marketAddressOrName, boardId)];
                    case 1:
                        board = _a.sent();
                        return [2 /*return*/, board.quoteAllSync(size, options)];
                }
            });
        });
    };
    Lyra.prototype.quoteMarket = function (marketAddressOrName, size, options) {
        return __awaiter(this, void 0, void 0, function () {
            var market;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.market(marketAddressOrName)];
                    case 1:
                        market = _a.sent();
                        return [2 /*return*/, market.quoteAllSync(size, options)];
                }
            });
        });
    };
    // Trade
    Lyra.prototype.approveTradeQuote = function (marketAddressOrName, owner, amountQuote) {
        return __awaiter(this, void 0, void 0, function () {
            var market;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.market(marketAddressOrName)];
                    case 1:
                        market = _a.sent();
                        return [2 /*return*/, market.approveTradeQuote(owner, amountQuote)];
                }
            });
        });
    };
    Lyra.prototype.approveTradeBase = function (marketAddressOrName, owner, amountBase) {
        return __awaiter(this, void 0, void 0, function () {
            var market;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.market(marketAddressOrName)];
                    case 1:
                        market = _a.sent();
                        return [2 /*return*/, market.approveTradeBase(owner, amountBase)];
                }
            });
        });
    };
    Lyra.prototype.trade = function (owner, marketAddressOrName, strikeId, isCall, isBuy, size, slippage, options) {
        return __awaiter(this, void 0, void 0, function () {
            var market;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.market(marketAddressOrName)];
                    case 1:
                        market = _a.sent();
                        return [4 /*yield*/, market.trade(owner, strikeId, isCall, isBuy, size, slippage, options)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Lyra.prototype.onTrade = function (callback, options) {
        return trade_event_1.TradeEvent.on(this, callback, options);
    };
    // Market
    Lyra.prototype.markets = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, market_1.Market.getAll(this)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Lyra.prototype.contractAddresses = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, fetchMarketAddresses_1.default)(this)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Lyra.prototype.marketAddresses = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.contractAddresses()];
                    case 1: return [2 /*return*/, (_a.sent()).map(function (_a) {
                            var optionMarket = _a.optionMarket;
                            return optionMarket;
                        })];
                }
            });
        });
    };
    Lyra.prototype.market = function (marketAddressOrName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, market_1.Market.get(this, marketAddressOrName)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Lyra.prototype.board = function (marketAddressOrName, boardId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, board_1.Board.get(this, marketAddressOrName, boardId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Lyra.prototype.strike = function (marketAddressOrName, strikeId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, strike_1.Strike.get(this, marketAddressOrName, strikeId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Lyra.prototype.option = function (marketAddressOrName, strikeId, isCall) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, option_1.Option.get(this, marketAddressOrName, strikeId, isCall)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // Position
    Lyra.prototype.openPositions = function (owner) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, position_1.Position.getOpenByOwner(this, owner)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Lyra.prototype.positions = function (owner) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, position_1.Position.getByOwner(this, owner)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Lyra.prototype.allPositions = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, position_1.Position.getAll(this, options)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Lyra.prototype.position = function (marketAddressOrName, positionId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, position_1.Position.get(this, marketAddressOrName, positionId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Lyra.prototype.events = function (transactionHashOrReceipt) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, fetchPositionEventDataByHash_1.default)(this, transactionHashOrReceipt)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Lyra.prototype.leaderboard = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, fetchLeaderboard_1.default)(this, options)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // Account
    Lyra.prototype.account = function (address) {
        return account_1.Account.get(this, address);
    };
    Lyra.prototype.drip = function (owner) {
        var account = account_1.Account.get(this, owner);
        return account.drip();
    };
    // Liquidity Deposits
    Lyra.prototype.deposits = function (marketAddressOrName, owner) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, liquidity_deposit_1.LiquidityDeposit.getByOwner(this, marketAddressOrName, owner)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Lyra.prototype.approveDeposit = function (marketAddressOrName, address, amountQuote) {
        return __awaiter(this, void 0, void 0, function () {
            var market;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.market(marketAddressOrName)];
                    case 1:
                        market = _a.sent();
                        return [2 /*return*/, market.approveDeposit(address, amountQuote)];
                }
            });
        });
    };
    Lyra.prototype.initiateDeposit = function (marketAddressOrName, beneficiary, amountQuote) {
        return __awaiter(this, void 0, void 0, function () {
            var market;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.market(marketAddressOrName)];
                    case 1:
                        market = _a.sent();
                        return [2 /*return*/, market.initiateDeposit(beneficiary, amountQuote)];
                }
            });
        });
    };
    // Liquidity Withdrawals
    Lyra.prototype.withdrawals = function (marketAddressOrName, owner) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, liquidity_withdrawal_1.LiquidityWithdrawal.getByOwner(this, marketAddressOrName, owner)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Lyra.prototype.initiateWithdraw = function (marketAddressOrName, beneficiary, amountLiquidityTokens) {
        return __awaiter(this, void 0, void 0, function () {
            var market;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.market(marketAddressOrName)];
                    case 1:
                        market = _a.sent();
                        return [2 /*return*/, market.initiateWithdraw(beneficiary, amountLiquidityTokens)];
                }
            });
        });
    };
    // Admin
    Lyra.prototype.admin = function () {
        return admin_1.Admin.get(this);
    };
    // Rewards
    Lyra.prototype.claimRewards = function (address, tokenAddresses) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, account_reward_epoch_1.AccountRewardEpoch.claim(this, address, tokenAddresses)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Lyra.prototype.lyraStaking = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, lyra_staking_1.LyraStaking.get(this)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Lyra.prototype.lyraStakingAccount = function (address) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, lyra_staking_1.LyraStaking.getByOwner(this, address)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Lyra.prototype.claimableStakingRewards = function (address) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, lyra_staking_1.LyraStaking.claimableRewards(this, address)];
            });
        });
    };
    Lyra.prototype.globalRewardEpochs = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, global_reward_epoch_1.GlobalRewardEpoch.getAll(this)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Lyra.prototype.latestGlobalRewardEpoch = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, global_reward_epoch_1.GlobalRewardEpoch.getLatest(this)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Lyra.prototype.accountRewardEpochs = function (address) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, account_reward_epoch_1.AccountRewardEpoch.getByOwner(this, address)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return Lyra;
}());
exports.default = Lyra;
//# sourceMappingURL=lyra.js.map