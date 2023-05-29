"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
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
var contracts_1 = require("../constants/contracts");
var queries_1 = require("../constants/queries");
var getCollateralUpdateDataFromSubgraph_1 = __importDefault(require("./getCollateralUpdateDataFromSubgraph"));
var getIsCall_1 = __importDefault(require("./getIsCall"));
var getLyraMarketContract_1 = __importDefault(require("./getLyraMarketContract"));
var getOpenPositionDataFromStruct_1 = __importDefault(require("./getOpenPositionDataFromStruct"));
var getPositionDataFromSubgraph_1 = __importDefault(require("./getPositionDataFromSubgraph"));
var getSettleDataFromSubgraph_1 = __importDefault(require("./getSettleDataFromSubgraph"));
var getTradeDataFromSubgraph_1 = __importDefault(require("./getTradeDataFromSubgraph"));
var getTransferDataFromSubgraph_1 = __importDefault(require("./getTransferDataFromSubgraph"));
var subgraphRequest_1 = __importDefault(require("./subgraphRequest"));
var positionsQuery = (0, core_1.gql)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  query positions($positionId: Int!, $market: String!) {\n    positions(first: 1, orderBy: openTimestamp, orderDirection: asc, where: { \n      positionId: $positionId, \n      market: $market,\n    }) {\n      ", "\n    }\n  }\n"], ["\n  query positions($positionId: Int!, $market: String!) {\n    positions(first: 1, orderBy: openTimestamp, orderDirection: asc, where: { \n      positionId: $positionId, \n      market: $market,\n    }) {\n      ", "\n    }\n  }\n"])), queries_1.POSITION_QUERY_FRAGMENT);
function fetchPositionDataByID(lyra, market, positionId) {
    var _a, _b, _c, _d;
    return __awaiter(this, void 0, void 0, function () {
        var optionToken, _e, structPromise, subgraphPromise, openPositionStruct, subgraphData, subgraphPositionData, trades, collateralUpdates, transfers, settle, strikeId, isCall, option;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    optionToken = (0, getLyraMarketContract_1.default)(lyra, market.contractAddresses, lyra.version, contracts_1.LyraMarketContractId.OptionToken);
                    return [4 /*yield*/, Promise.allSettled([
                            optionToken.getPositionWithOwner(positionId),
                            (0, subgraphRequest_1.default)(lyra.subgraphClient, {
                                query: positionsQuery,
                                variables: {
                                    positionId: positionId,
                                    market: market.address.toLowerCase(),
                                },
                            }),
                        ])];
                case 1:
                    _e = _f.sent(), structPromise = _e[0], subgraphPromise = _e[1];
                    openPositionStruct = structPromise.status === 'fulfilled' ? structPromise.value : null;
                    subgraphData = subgraphPromise.status === 'fulfilled' ? subgraphPromise.value : null;
                    subgraphPositionData = (_a = subgraphData === null || subgraphData === void 0 ? void 0 : subgraphData.data) === null || _a === void 0 ? void 0 : _a.positions[0];
                    trades = (_b = subgraphPositionData === null || subgraphPositionData === void 0 ? void 0 : subgraphPositionData.trades.map(getTradeDataFromSubgraph_1.default)) !== null && _b !== void 0 ? _b : [];
                    collateralUpdates = (_c = subgraphPositionData === null || subgraphPositionData === void 0 ? void 0 : subgraphPositionData.collateralUpdates.map(getCollateralUpdateDataFromSubgraph_1.default)) !== null && _c !== void 0 ? _c : [];
                    transfers = (_d = subgraphPositionData === null || subgraphPositionData === void 0 ? void 0 : subgraphPositionData.transfers.map(getTransferDataFromSubgraph_1.default)) !== null && _d !== void 0 ? _d : [];
                    settle = (subgraphPositionData === null || subgraphPositionData === void 0 ? void 0 : subgraphPositionData.settle) ? (0, getSettleDataFromSubgraph_1.default)(subgraphPositionData.settle) : null;
                    if (openPositionStruct) {
                        strikeId = openPositionStruct.strikeId.toNumber();
                        isCall = (0, getIsCall_1.default)(openPositionStruct.optionType);
                        option = market.liveOption(strikeId, isCall);
                        return [2 /*return*/, (0, getOpenPositionDataFromStruct_1.default)(openPositionStruct.owner, openPositionStruct, option, trades, collateralUpdates, transfers, settle)];
                    }
                    else if (subgraphPositionData) {
                        return [2 /*return*/, (0, getPositionDataFromSubgraph_1.default)(subgraphPositionData, market, trades, collateralUpdates, transfers, settle)];
                    }
                    else {
                        // Should never happen
                        // An open position should always have state and closed position should always have subgraph data
                        throw new Error('Failed to fetch position');
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.default = fetchPositionDataByID;
var templateObject_1;
//# sourceMappingURL=fetchPositionDataByID.js.map