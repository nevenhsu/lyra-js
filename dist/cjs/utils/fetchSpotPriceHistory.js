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
var bignumber_1 = require("@ethersproject/bignumber");
var queries_1 = require("../constants/queries");
var getSnapshotPeriod_1 = __importDefault(require("./getSnapshotPeriod"));
var subgraphRequestWithLoop_1 = __importDefault(require("./subgraphRequestWithLoop"));
var SPOT_PRICE_SNAPSHOT_LIMIT = 10000;
var spotPriceSnapshotsQuery = (0, core_1.gql)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  query spotPriceSnapshots(\n    $market: String!, $min: Int!, $max: Int!, $period: Int!, $limit: Int!\n  ) {\n    spotPriceSnapshots(first: $limit, orderBy: timestamp, orderDirection: asc, where: { \n      market: $market, \n      timestamp_gte: $min, \n      timestamp_lte: $max,\n      period: $period \n    }) {\n      ", "\n    }\n  }\n"], ["\n  query spotPriceSnapshots(\n    $market: String!, $min: Int!, $max: Int!, $period: Int!, $limit: Int!\n  ) {\n    spotPriceSnapshots(first: $limit, orderBy: timestamp, orderDirection: asc, where: { \n      market: $market, \n      timestamp_gte: $min, \n      timestamp_lte: $max,\n      period: $period \n    }) {\n      ", "\n    }\n  }\n"])), queries_1.SPOT_PRICE_SNAPSHOT_FRAGMENT);
function fetchSpotPriceHistory(lyra, market, options) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function () {
        var startTimestamp, endTimestamp, candleDuration, estNumCandles, numBatches, data, candles, latestCandle;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    startTimestamp = (_a = options === null || options === void 0 ? void 0 : options.startTimestamp) !== null && _a !== void 0 ? _a : queries_1.MIN_START_TIMESTAMP;
                    endTimestamp = (_b = options === null || options === void 0 ? void 0 : options.endTimestamp) !== null && _b !== void 0 ? _b : market.block.timestamp;
                    candleDuration = (_c = options === null || options === void 0 ? void 0 : options.period) !== null && _c !== void 0 ? _c : (0, getSnapshotPeriod_1.default)(startTimestamp, endTimestamp, [
                        queries_1.SnapshotPeriod.FifteenMinutes,
                        queries_1.SnapshotPeriod.OneHour,
                        queries_1.SnapshotPeriod.FourHours,
                        queries_1.SnapshotPeriod.EightHours,
                        queries_1.SnapshotPeriod.OneDay,
                        queries_1.SnapshotPeriod.SevenDays,
                    ]);
                    estNumCandles = candleDuration > 0 ? (endTimestamp - startTimestamp) / candleDuration : 0;
                    numBatches = Math.ceil(estNumCandles / SPOT_PRICE_SNAPSHOT_LIMIT);
                    return [4 /*yield*/, (0, subgraphRequestWithLoop_1.default)(lyra, spotPriceSnapshotsQuery, {
                            min: startTimestamp,
                            max: endTimestamp,
                            limit: SPOT_PRICE_SNAPSHOT_LIMIT,
                            period: candleDuration,
                            market: market.address.toLowerCase(),
                        }, 'timestamp', {
                            increment: SPOT_PRICE_SNAPSHOT_LIMIT * candleDuration,
                            batch: numBatches,
                        })];
                case 1:
                    data = _d.sent();
                    if (data.length === 0) {
                        return [2 /*return*/, []];
                    }
                    candles = data.map(function (spotPriceSnapshot) { return ({
                        open: bignumber_1.BigNumber.from(spotPriceSnapshot.open),
                        high: bignumber_1.BigNumber.from(spotPriceSnapshot.high),
                        low: bignumber_1.BigNumber.from(spotPriceSnapshot.low),
                        close: bignumber_1.BigNumber.from(spotPriceSnapshot.close),
                        startTimestamp: spotPriceSnapshot.timestamp - spotPriceSnapshot.period,
                        endTimestamp: spotPriceSnapshot.timestamp,
                        period: spotPriceSnapshot.period,
                        startBlockNumber: spotPriceSnapshot.blockNumber,
                    }); });
                    latestCandle = candles.length ? candles[candles.length - 1] : null;
                    if (latestCandle && latestCandle.endTimestamp > market.block.number) {
                        // Update close
                        latestCandle.close = market.spotPrice;
                        // Update low
                        if (market.spotPrice.lt(latestCandle.low)) {
                            latestCandle.low = market.spotPrice;
                        }
                        // Update high
                        if (market.spotPrice.gt(latestCandle.high)) {
                            latestCandle.low = market.spotPrice;
                        }
                    }
                    return [2 /*return*/, candles];
            }
        });
    });
}
exports.default = fetchSpotPriceHistory;
var templateObject_1;
//# sourceMappingURL=fetchSpotPriceHistory.js.map