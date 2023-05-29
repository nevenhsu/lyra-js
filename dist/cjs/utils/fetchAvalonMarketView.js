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
var address_1 = require("@ethersproject/address");
var contracts_1 = require("../constants/contracts");
var lyra_1 = require("../lyra");
var getLyraContract_1 = __importDefault(require("./getLyraContract"));
var multicall_1 = __importDefault(require("./multicall"));
var parseBaseKeyBytes32_1 = __importDefault(require("./parseBaseKeyBytes32"));
var parseBaseSymbol_1 = __importDefault(require("./parseBaseSymbol"));
function fetchAvalonMarketView(lyra, marketAddressOrName) {
    return __awaiter(this, void 0, void 0, function () {
        var viewerContract, exchangeContract, isGlobalPausedReq, globalOwner, _a, _b, marketView, isGlobalPaused, owner, blockNumber, baseSymbol, _c, _d, marketView, isGlobalPaused, owner, blockNumber;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    viewerContract = (0, getLyraContract_1.default)(lyra, lyra_1.Version.Avalon, contracts_1.LyraContractId.OptionMarketViewer);
                    exchangeContract = (0, getLyraContract_1.default)(lyra, lyra_1.Version.Avalon, contracts_1.LyraContractId.ExchangeAdapter);
                    isGlobalPausedReq = {
                        contract: exchangeContract,
                        function: 'isGlobalPaused',
                        args: [],
                    };
                    globalOwner = {
                        contract: exchangeContract,
                        function: 'owner',
                        args: [],
                    };
                    if (!(0, address_1.isAddress)(marketAddressOrName)) return [3 /*break*/, 2];
                    return [4 /*yield*/, (0, multicall_1.default)(lyra, [
                            {
                                contract: viewerContract,
                                function: 'getMarket',
                                args: [marketAddressOrName],
                            },
                            isGlobalPausedReq,
                            globalOwner,
                        ])];
                case 1:
                    _a = _e.sent(), _b = _a.returnData, marketView = _b[0], isGlobalPaused = _b[1], owner = _b[2], blockNumber = _a.blockNumber;
                    return [2 /*return*/, { marketView: marketView, isGlobalPaused: isGlobalPaused, owner: owner, blockNumber: blockNumber }];
                case 2:
                    baseSymbol = (0, parseBaseSymbol_1.default)(lyra, marketAddressOrName);
                    return [4 /*yield*/, (0, multicall_1.default)(lyra, [
                            {
                                contract: viewerContract,
                                function: 'getMarketForBaseKey',
                                args: [(0, parseBaseKeyBytes32_1.default)(baseSymbol)],
                            },
                            isGlobalPausedReq,
                            globalOwner,
                        ])];
                case 3:
                    _c = _e.sent(), _d = _c.returnData, marketView = _d[0], isGlobalPaused = _d[1], owner = _d[2], blockNumber = _c.blockNumber;
                    return [2 /*return*/, { marketView: marketView, isGlobalPaused: isGlobalPaused, owner: owner, blockNumber: blockNumber }];
            }
        });
    });
}
exports.default = fetchAvalonMarketView;
//# sourceMappingURL=fetchAvalonMarketView.js.map