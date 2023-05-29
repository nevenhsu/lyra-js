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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@apollo/client/core");
var queries_1 = require("../constants/queries");
var fetchRecentPositionEventsByIDs_1 = __importDefault(require("./fetchRecentPositionEventsByIDs"));
var getCollateralUpdateDataFromSubgraph_1 = __importDefault(require("./getCollateralUpdateDataFromSubgraph"));
var getSettleDataFromSubgraph_1 = __importDefault(require("./getSettleDataFromSubgraph"));
var getTradeDataFromSubgraph_1 = __importDefault(require("./getTradeDataFromSubgraph"));
var getTransferDataFromSubgraph_1 = __importDefault(require("./getTransferDataFromSubgraph"));
var getUniqueBy_1 = __importDefault(require("./getUniqueBy"));
var subgraphRequest_1 = __importDefault(require("./subgraphRequest"));
// TODO: @dappbeast Handle more than 1k trade queries
var positionEventsQuery = (0, core_1.gql)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  query positionEvents($positionIds: [String!]!) {\n    trades(first: 1000, orderBy: timestamp, orderDirection: asc, where: { position_in: $positionIds }) {\n      ", "\n    }\n    collateralUpdates(first: 1000, orderBy: timestamp, orderDirection: asc, where: { position_in: $positionIds }) {\n      ", "\n    }\n    settles(first: 1000, orderBy: timestamp, orderDirection: asc, where: { position_in: $positionIds }) {\n      ", "\n    }\n    optionTransfers(first: 1000, orderBy: timestamp, orderDirection: asc, where: { position_in: $positionIds }) {\n      ", "\n    }\n  }\n"], ["\n  query positionEvents($positionIds: [String!]!) {\n    trades(first: 1000, orderBy: timestamp, orderDirection: asc, where: { position_in: $positionIds }) {\n      ", "\n    }\n    collateralUpdates(first: 1000, orderBy: timestamp, orderDirection: asc, where: { position_in: $positionIds }) {\n      ", "\n    }\n    settles(first: 1000, orderBy: timestamp, orderDirection: asc, where: { position_in: $positionIds }) {\n      ", "\n    }\n    optionTransfers(first: 1000, orderBy: timestamp, orderDirection: asc, where: { position_in: $positionIds }) {\n      ", "\n    }\n  }\n"])), queries_1.TRADE_QUERY_FRAGMENT, queries_1.COLLATERAL_UPDATE_QUERY_FRAGMENT, queries_1.SETTLE_QUERY_FRAGMENT, queries_1.TRANSFER_QUERY_FRAGMENT);
function fetchPositionEventDataByIDs(lyra, market, positionIds) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    return __awaiter(this, void 0, void 0, function () {
        var _j, subgraphData, recentContractEvents, eventsByPositionID, trades, collateralUpdates, transfers, settles;
        return __generator(this, function (_k) {
            switch (_k.label) {
                case 0: return [4 /*yield*/, Promise.all([
                        (0, subgraphRequest_1.default)(lyra.subgraphClient, {
                            query: positionEventsQuery,
                            variables: {
                                positionIds: positionIds.map(function (pid) { return "".concat(market.address.toLowerCase(), "-").concat(pid); }),
                            },
                        }),
                        (0, fetchRecentPositionEventsByIDs_1.default)(lyra, market, positionIds),
                    ])];
                case 1:
                    _j = _k.sent(), subgraphData = _j[0], recentContractEvents = _j[1];
                    eventsByPositionID = positionIds.reduce(function (dict, positionId) {
                        var _a;
                        return (__assign(__assign({}, dict), (_a = {}, _a[positionId] = { trades: [], collateralUpdates: [], transfers: [], settle: null }, _a)));
                    }, {});
                    trades = (_b = (_a = subgraphData.data) === null || _a === void 0 ? void 0 : _a.trades.map(getTradeDataFromSubgraph_1.default)) !== null && _b !== void 0 ? _b : [];
                    collateralUpdates = (_d = (_c = subgraphData.data) === null || _c === void 0 ? void 0 : _c.collateralUpdates.map(getCollateralUpdateDataFromSubgraph_1.default)) !== null && _d !== void 0 ? _d : [];
                    transfers = (_f = (_e = subgraphData.data) === null || _e === void 0 ? void 0 : _e.optionTransfers.map(getTransferDataFromSubgraph_1.default)) !== null && _f !== void 0 ? _f : [];
                    settles = (_h = (_g = subgraphData.data) === null || _g === void 0 ? void 0 : _g.settles.map(getSettleDataFromSubgraph_1.default)) !== null && _h !== void 0 ? _h : [];
                    trades.forEach(function (trade) {
                        eventsByPositionID[trade.positionId].trades.push(trade);
                    });
                    collateralUpdates.forEach(function (collateralUpdate) {
                        eventsByPositionID[collateralUpdate.positionId].collateralUpdates.push(collateralUpdate);
                    });
                    transfers.forEach(function (transfer) {
                        eventsByPositionID[transfer.positionId].transfers.push(transfer);
                    });
                    settles.forEach(function (settle) {
                        eventsByPositionID[settle.positionId].settle = settle;
                    });
                    // Merge recent contract events with subgraph events
                    Object.entries(recentContractEvents).map(function (_a) {
                        var key = _a[0], _b = _a[1], trades = _b.trades, collateralUpdates = _b.collateralUpdates;
                        var positionId = parseInt(key);
                        eventsByPositionID[positionId].trades = (0, getUniqueBy_1.default)(__spreadArray(__spreadArray([], eventsByPositionID[positionId].trades, true), trades, true), function (trade) { return trade.transactionHash; });
                        eventsByPositionID[positionId].collateralUpdates = (0, getUniqueBy_1.default)(__spreadArray(__spreadArray([], eventsByPositionID[positionId].collateralUpdates, true), collateralUpdates, true), function (update) { return update.transactionHash; });
                    });
                    return [2 /*return*/, eventsByPositionID];
            }
        });
    });
}
exports.default = fetchPositionEventDataByIDs;
var templateObject_1;
//# sourceMappingURL=fetchPositionEventDataByIDs.js.map