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
var bignumber_1 = require("@ethersproject/bignumber");
var queries_1 = require("../constants/queries");
var fetchSnapshots_1 = __importDefault(require("./fetchSnapshots"));
var optionPriceAndGreeksSnapshotsQuery = (0, core_1.gql)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  query optionPriceAndGreeksSnapshots($optionIds: [String!]!, $min: Int!, $max: Int!, $period: Int!) {\n    optionPriceAndGreeksSnapshots(\n      first: 1000\n      orderBy: timestamp\n      orderDirection: asc\n      where: { option_in: $optionIds, timestamp_gte: $min, timestamp_lte: $max, period_gte: $period }\n    ) {\n      ", "\n    }\n  }\n"], ["\n  query optionPriceAndGreeksSnapshots($optionIds: [String!]!, $min: Int!, $max: Int!, $period: Int!) {\n    optionPriceAndGreeksSnapshots(\n      first: 1000\n      orderBy: timestamp\n      orderDirection: asc\n      where: { option_in: $optionIds, timestamp_gte: $min, timestamp_lte: $max, period_gte: $period }\n    ) {\n      ", "\n    }\n  }\n"])), queries_1.OPTION_PRICE_AND_GREEKS_SNAPSHOT_FRAGMENT);
function fetchPositionPriceHistoryByIDs(lyra, positions, snapshotOptions) {
    return __awaiter(this, void 0, void 0, function () {
        var optionIdByPositionId, optionIds, data, pricesByOptionId, pricesByPositionId;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    optionIdByPositionId = positions.reduce(function (dict, _a) {
                        var _b;
                        var id = _a.id, marketAddress = _a.marketAddress, strikeId = _a.strikeId, isCall = _a.isCall;
                        return (__assign(__assign({}, dict), (_b = {}, _b[id] = "".concat(marketAddress.toLowerCase(), "-").concat(strikeId, "-").concat(isCall ? 'call' : 'put'), _b)));
                    }, {});
                    optionIds = Array.from(new Set(Object.values(optionIdByPositionId)));
                    return [4 /*yield*/, (0, fetchSnapshots_1.default)(lyra, optionPriceAndGreeksSnapshotsQuery, {
                            optionIds: optionIds,
                        }, snapshotOptions)];
                case 1:
                    data = _a.sent();
                    pricesByOptionId = data.reduce(function (dict, snapshot) {
                        var _a;
                        var _b;
                        var prices = (_b = dict[snapshot.option.id]) !== null && _b !== void 0 ? _b : [];
                        prices.push({
                            optionPrice: bignumber_1.BigNumber.from(snapshot.optionPrice),
                            timestamp: snapshot.blockTimestamp,
                            blockNumber: snapshot.blockNumber,
                        });
                        return __assign(__assign({}, dict), (_a = {}, _a[snapshot.option.id] = prices, _a));
                    }, {});
                    pricesByPositionId = Object.entries(optionIdByPositionId).reduce(function (dict, _a) {
                        var _b;
                        var positionId = _a[0], optionId = _a[1];
                        return (__assign(__assign({}, dict), (_b = {}, _b[positionId] = pricesByOptionId[optionId], _b)));
                    }, {});
                    return [2 /*return*/, pricesByPositionId];
            }
        });
    });
}
exports.default = fetchPositionPriceHistoryByIDs;
var templateObject_1;
//# sourceMappingURL=fetchPositionPriceHistoryByIDs.js.map