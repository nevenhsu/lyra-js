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
var __1 = require("..");
var time_1 = require("../constants/time");
var ethereum_addresses_json_1 = __importDefault(require("../contracts/common/addresses/ethereum.addresses.json"));
var ethereum_goerli_addresses_json_1 = __importDefault(require("../contracts/common/addresses/ethereum-goerli.addresses.json"));
var fetchLyraPrice_1 = __importDefault(require("./fetchLyraPrice"));
var fromBigNumber_1 = __importDefault(require("./fromBigNumber"));
var getGlobalContract_1 = __importDefault(require("./getGlobalContract"));
var isTestnet_1 = __importDefault(require("./isTestnet"));
var multicall_1 = __importDefault(require("./multicall"));
var toBigNumber_1 = __importDefault(require("./toBigNumber"));
function fetchLyraStakingParams(lyra) {
    return __awaiter(this, void 0, void 0, function () {
        var lyraStakingModuleContract, stakedLyraAddress, _a, _b, cooldownPeriod, unstakeWindow, totalSupplyBN, emissionsPerSecondBN, tokenPrice, totalSupply, tokenPerDollar, pctSharePerDollar, emissionsPerSecond, perDollarPerSecond, apy;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    lyraStakingModuleContract = (0, getGlobalContract_1.default)(lyra, __1.LyraGlobalContractId.LyraStakingModule, lyra.ethereumProvider);
                    stakedLyraAddress = ((0, isTestnet_1.default)(lyra) ? ethereum_goerli_addresses_json_1.default : ethereum_addresses_json_1.default)['LyraStakingModule'];
                    return [4 /*yield*/, Promise.all([
                            (0, multicall_1.default)(lyra, [
                                {
                                    args: [],
                                    contract: lyraStakingModuleContract,
                                    function: 'COOLDOWN_SECONDS',
                                },
                                {
                                    args: [],
                                    contract: lyraStakingModuleContract,
                                    function: 'UNSTAKE_WINDOW',
                                },
                                {
                                    args: [],
                                    contract: lyraStakingModuleContract,
                                    function: 'totalSupply',
                                },
                                {
                                    args: [stakedLyraAddress],
                                    contract: lyraStakingModuleContract,
                                    function: 'assets',
                                },
                            ], lyra.ethereumProvider),
                            (0, fetchLyraPrice_1.default)(lyra),
                        ])];
                case 1:
                    _a = _c.sent(), _b = _a[0].returnData, cooldownPeriod = _b[0], unstakeWindow = _b[1], totalSupplyBN = _b[2], emissionsPerSecondBN = _b[3], tokenPrice = _a[1];
                    totalSupply = (0, fromBigNumber_1.default)(totalSupplyBN);
                    tokenPerDollar = tokenPrice > 0 ? 1 / tokenPrice : 0;
                    pctSharePerDollar = totalSupply > 0 ? tokenPerDollar / totalSupply : 0;
                    emissionsPerSecond = (0, fromBigNumber_1.default)(emissionsPerSecondBN);
                    perDollarPerSecond = emissionsPerSecond * pctSharePerDollar;
                    apy = perDollarPerSecond * tokenPrice * time_1.SECONDS_IN_YEAR;
                    return [2 /*return*/, {
                            cooldownPeriod: cooldownPeriod.toNumber(),
                            unstakeWindow: unstakeWindow.toNumber(),
                            totalSupply: totalSupplyBN,
                            tokenPrice: (0, toBigNumber_1.default)(tokenPrice),
                            apy: apy,
                        }];
            }
        });
    });
}
exports.default = fetchLyraStakingParams;
//# sourceMappingURL=fetchLyraStakingParams.js.map