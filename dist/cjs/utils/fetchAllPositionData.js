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
var address_1 = require("@ethersproject/address");
var queries_1 = require("../constants/queries");
var getCollateralUpdateDataFromSubgraph_1 = __importDefault(require("./getCollateralUpdateDataFromSubgraph"));
var getPositionDataFromSubgraph_1 = __importDefault(require("./getPositionDataFromSubgraph"));
var getSettleDataFromSubgraph_1 = __importDefault(require("./getSettleDataFromSubgraph"));
var getTradeDataFromSubgraph_1 = __importDefault(require("./getTradeDataFromSubgraph"));
var getTransferDataFromSubgraph_1 = __importDefault(require("./getTransferDataFromSubgraph"));
var subgraphRequestWithLoop_1 = __importDefault(require("./subgraphRequestWithLoop"));
var positionsQuery = (0, core_1.gql)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  query positions($max: Int!, $min: Int!, $market: String!) {\n    positions(first: 1000, orderBy: openTimestamp, orderDirection: asc, where: { \n      positionId_gte: $min, \n      positionId_lte: $max,\n      market: $market,\n    }) {\n      ", "\n    }\n  }\n"], ["\n  query positions($max: Int!, $min: Int!, $market: String!) {\n    positions(first: 1000, orderBy: openTimestamp, orderDirection: asc, where: { \n      positionId_gte: $min, \n      positionId_lte: $max,\n      market: $market,\n    }) {\n      ", "\n    }\n  }\n"])), queries_1.POSITION_QUERY_FRAGMENT);
function fetchAllPositionData(lyra, filter) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var markets, _c, data, block, marketsByAddress, minOpenTimestamp, maxCloseTimestamp, positions;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    if (!(filter === null || filter === void 0 ? void 0 : filter.markets)) return [3 /*break*/, 2];
                    return [4 /*yield*/, Promise.all(filter.markets.map(function (market) { return lyra.market(market); }))];
                case 1:
                    markets = _d.sent();
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, lyra.markets()];
                case 3:
                    markets = _d.sent();
                    _d.label = 4;
                case 4: return [4 /*yield*/, Promise.all([
                        Promise.all(markets.map(function (market) {
                            var _a, _b, _c;
                            var minIds = (_a = filter === null || filter === void 0 ? void 0 : filter.minPositionIds) !== null && _a !== void 0 ? _a : {};
                            var minKey = (_b = Object.keys(minIds).find(function (id) { return id.toLowerCase() === market.address.toLowerCase() || id.toLowerCase() === market.name.toLowerCase(); })) !== null && _b !== void 0 ? _b : '';
                            var min = (_c = minIds[minKey]) !== null && _c !== void 0 ? _c : 0;
                            return (0, subgraphRequestWithLoop_1.default)(lyra, positionsQuery, { min: min, max: 0, market: market.address.toLowerCase() }, 'positionId', {
                                increment: 1000,
                                batch: 15,
                            });
                        })),
                        lyra.provider.getBlock('latest'),
                    ])];
                case 5:
                    _c = _d.sent(), data = _c[0], block = _c[1];
                    marketsByAddress = markets.reduce(function (dict, market) {
                        var _a;
                        return (__assign(__assign({}, dict), (_a = {}, _a[market.address] = market, _a)));
                    }, {});
                    minOpenTimestamp = (_a = filter === null || filter === void 0 ? void 0 : filter.minOpenTimestamp) !== null && _a !== void 0 ? _a : queries_1.MIN_START_TIMESTAMP;
                    maxCloseTimestamp = (_b = filter === null || filter === void 0 ? void 0 : filter.maxCloseTimestamp) !== null && _b !== void 0 ? _b : queries_1.MAX_END_TIMESTAMP;
                    positions = data
                        .flat()
                        .filter(function (pos) {
                        // Ignore any positions opened before min open timestamp
                        if (pos.openTimestamp < minOpenTimestamp) {
                            return false;
                        }
                        // After the close timestamp, ignore any open positions
                        if (block.timestamp > maxCloseTimestamp && !pos.closeTimestamp) {
                            return false;
                        }
                        // Ignore any positions closed after max close timestamp
                        if (pos.closeTimestamp > maxCloseTimestamp) {
                            return false;
                        }
                        return true;
                    })
                        .map(function (pos) {
                        var trades = pos.trades.map(getTradeDataFromSubgraph_1.default);
                        var collateralUpdates = pos.collateralUpdates.map(getCollateralUpdateDataFromSubgraph_1.default);
                        var transfers = pos.transfers.map(getTransferDataFromSubgraph_1.default);
                        var settle = pos.settle ? (0, getSettleDataFromSubgraph_1.default)(pos.settle) : null;
                        var market = marketsByAddress[(0, address_1.getAddress)(pos.market.id)];
                        // Ignore liquidation price binary search
                        return (0, getPositionDataFromSubgraph_1.default)(pos, market, trades, collateralUpdates, transfers, settle, true);
                    });
                    return [2 /*return*/, positions];
            }
        });
    });
}
exports.default = fetchAllPositionData;
var templateObject_1;
//# sourceMappingURL=fetchAllPositionData.js.map