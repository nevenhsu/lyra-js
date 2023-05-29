"use strict";
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
var queries_1 = require("../constants/queries");
var subgraphRequest_1 = __importDefault(require("./subgraphRequest"));
// GraphQL supports 32 bit signed int, i.e. max 2^31 - 1
var MAX_SAFE_32_BIT_INT = 2147483647;
function subgraphRequestWithLoop(lyra, query, variables, iteratorKey, batchOptions) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var allFound, data, min, limit, varArr, batch, increment, b, batches, lastBatch;
        var _this = this;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    allFound = false;
                    data = [];
                    min = variables.min;
                    limit = (_a = variables.limit) !== null && _a !== void 0 ? _a : queries_1.SNAPSHOT_RESULT_LIMIT;
                    _b.label = 1;
                case 1:
                    if (!!allFound) return [3 /*break*/, 3];
                    varArr = [];
                    if (batchOptions) {
                        batch = batchOptions.batch, increment = batchOptions.increment;
                        for (b = 0; b < batch; b++) {
                            varArr.push(__assign(__assign({}, variables), { min: min, max: Math.min(min + increment - 1, MAX_SAFE_32_BIT_INT) }));
                            min += increment;
                        }
                    }
                    else {
                        varArr.push(__assign(__assign({}, variables), { limit: limit, min: min }));
                    }
                    return [4 /*yield*/, Promise.all(varArr.map(function (variables) { return __awaiter(_this, void 0, void 0, function () {
                            var data;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, (0, subgraphRequest_1.default)(lyra.subgraphClient, {
                                            query: query,
                                            variables: variables,
                                        })];
                                    case 1:
                                        data = (_a.sent()).data;
                                        return [2 /*return*/, data];
                                }
                            });
                        }); }))];
                case 2:
                    batches = (_b.sent())
                        .filter(function (res) { return res != null; })
                        .map(function (res) { return Object.values(res)[0]; });
                    lastBatch = batches[batches.length - 1];
                    data = __spreadArray(__spreadArray([], data, true), batches.flat(), true);
                    if (!lastBatch || !lastBatch.length || lastBatch.length < limit) {
                        allFound = true;
                    }
                    else {
                        // Set skip to last iterator val
                        min = lastBatch[lastBatch.length - 1][iteratorKey] + 1;
                    }
                    return [3 /*break*/, 1];
                case 3: return [2 /*return*/, data];
            }
        });
    });
}
exports.default = subgraphRequestWithLoop;
//# sourceMappingURL=subgraphRequestWithLoop.js.map