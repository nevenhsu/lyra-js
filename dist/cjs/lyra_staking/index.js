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
exports.LyraStaking = void 0;
var contracts_1 = require("../constants/contracts");
var fetchLyraStakingParams_1 = __importDefault(require("../utils/fetchLyraStakingParams"));
var getGlobalContract_1 = __importDefault(require("../utils/getGlobalContract"));
var LyraStaking = /** @class */ (function () {
    function LyraStaking(lyra, stakingParams) {
        this.lyra = lyra;
        this.cooldownPeriod = stakingParams.cooldownPeriod;
        this.unstakeWindow = stakingParams.unstakeWindow;
        this.totalSupply = stakingParams.totalSupply;
        this.tokenPrice = stakingParams.tokenPrice;
        this.apy = stakingParams.apy;
    }
    // Getters
    LyraStaking.get = function (lyra) {
        return __awaiter(this, void 0, void 0, function () {
            var stakingParams;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, fetchLyraStakingParams_1.default)(lyra)];
                    case 1:
                        stakingParams = _a.sent();
                        return [2 /*return*/, new LyraStaking(lyra, stakingParams)];
                }
            });
        });
    };
    LyraStaking.getByOwner = function (lyra, address) {
        return __awaiter(this, void 0, void 0, function () {
            var lyraStakingModuleContract, _a, block, lyraStaking, accountCooldownBN, accountCooldown, cooldownStartTimestamp, cooldownEndTimestamp, unstakeWindowStartTimestamp, unstakeWindowEndTimestamp, isInUnstakeWindow, isInCooldown;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!lyra.ethereumProvider || !lyra.optimismProvider) {
                            throw new Error('Ethereum and Optimism provider required.');
                        }
                        lyraStakingModuleContract = (0, getGlobalContract_1.default)(lyra, contracts_1.LyraGlobalContractId.LyraStakingModule, lyra.ethereumProvider);
                        return [4 /*yield*/, Promise.all([
                                lyra.provider.getBlock('latest'),
                                LyraStaking.get(lyra),
                                lyraStakingModuleContract.stakersCooldowns(address),
                            ])];
                    case 1:
                        _a = _b.sent(), block = _a[0], lyraStaking = _a[1], accountCooldownBN = _a[2];
                        accountCooldown = accountCooldownBN.toNumber();
                        cooldownStartTimestamp = accountCooldown > 0 ? accountCooldown : null;
                        cooldownEndTimestamp = accountCooldown > 0 ? accountCooldown + lyraStaking.cooldownPeriod : null;
                        unstakeWindowStartTimestamp = cooldownEndTimestamp;
                        unstakeWindowEndTimestamp = unstakeWindowStartTimestamp
                            ? unstakeWindowStartTimestamp + lyraStaking.unstakeWindow
                            : null;
                        isInUnstakeWindow = !!unstakeWindowStartTimestamp &&
                            !!unstakeWindowEndTimestamp &&
                            block.timestamp >= unstakeWindowStartTimestamp &&
                            block.timestamp <= unstakeWindowEndTimestamp;
                        isInCooldown = !!cooldownStartTimestamp &&
                            !!cooldownEndTimestamp &&
                            block.timestamp >= cooldownStartTimestamp &&
                            block.timestamp <= cooldownEndTimestamp;
                        return [2 /*return*/, {
                                lyraStaking: lyraStaking,
                                isInUnstakeWindow: isInUnstakeWindow,
                                isInCooldown: isInCooldown,
                                unstakeWindowStartTimestamp: unstakeWindowStartTimestamp,
                                unstakeWindowEndTimestamp: unstakeWindowEndTimestamp,
                            }];
                }
            });
        });
    };
    // TODO: move claimable rewards into get()
    LyraStaking.claimableRewards = function (lyra, address) {
        return __awaiter(this, void 0, void 0, function () {
            var lyraStakingModuleContract;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        lyraStakingModuleContract = (0, getGlobalContract_1.default)(lyra, contracts_1.LyraGlobalContractId.LyraStakingModule, lyra.ethereumProvider);
                        return [4 /*yield*/, lyraStakingModuleContract.getTotalRewardsBalance(address)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return LyraStaking;
}());
exports.LyraStaking = LyraStaking;
//# sourceMappingURL=index.js.map