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
        while (_) try {
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
/**
 * 淘客相关的接口
 */
var ServerUtil_1 = __importDefault(require("./utils/ServerUtil"));
var ResultUtil_1 = require("./utils/ResultUtil");
var axios_miniprogram_1 = __importDefault(require("axios-miniprogram"));
var TAOKE_API = '/tkapi/api/v1/dtk/apis';
var TaokeApi = /** @class */ (function () {
    function TaokeApi() {
    }
    Object.defineProperty(TaokeApi.prototype, "url", {
        /**
         * 大淘客api
         */
        get: function () {
            return "".concat(this._host).concat(TAOKE_API);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaokeApi.prototype, "host", {
        /**
         * 获取当前设置的服务器host地址
         */
        get: function () {
            var _a;
            return (_a = this._host) !== null && _a !== void 0 ? _a : ServerUtil_1.default.getInstance().host;
        },
        /**
         * 设置 服务器 host 地址
         * @param v 服务器地址,后面的请求将发送到这个地址获取,例子 [https://itbug.shop]
         */
        set: function (v) {
            this._host = v;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * 私有化对象实例,只允许new一个对象,单例模式
     * @constructor
     * @private
     */
    TaokeApi.prototype.TaokeApi = function () {
    };
    /**
     * 封装通用请求函数
     * @param url   接口url
     * @param param 请求参数
     * @param taoke 是否为淘客api接口,默认为true,如果不是将直接使用url
     */
    TaokeApi.prototype.requestT = function (url, param, taoke) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                        var result, response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, axios_miniprogram_1.default.get("".concat((taoke !== null && taoke !== void 0 ? taoke : true) ? this.url : this._host).concat(url), {
                                        method: "GET",
                                        data: param
                                    })];
                                case 1:
                                    response = _a.sent();
                                    result = response.data;
                                    if (result) {
                                        (0, ResultUtil_1.successResultHandle)(result, function (data) {
                                            resolve((0, ResultUtil_1.tkDataToObject)(data));
                                        }, function (message) {
                                            console.log(message);
                                        });
                                    }
                                    else {
                                        console.log('返回为空');
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    /**
     * 获取请求实例
     */
    TaokeApi.getInstance = function () {
        var _a;
        return (_a = this._instance) !== null && _a !== void 0 ? _a : new TaokeApi();
    };
    /**
     * 获取超级大分类
     */
    TaokeApi.prototype.getCategorys = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.requestT('/categorys')];
            });
        });
    };
    /**
     * 获取美团推广链接
     * @param params    生成参数
     */
    TaokeApi.prototype.getMeituanCoupon = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.requestT('/api/zhe/mt/tg', params, false)];
            });
        });
    };
    /**
     * 获取轮播图列表
     */
    TaokeApi.prototype.getCarouselList = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.requestT('/carousel-list')];
            });
        });
    };
    /**
     * 获取品牌列表
     * @param cid   品牌分类id
     * @param pageModel 分页数据
     */
    TaokeApi.prototype.getBrandList = function (cid, pageModel) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.requestT('/brand-list', Object.assign({ cid: cid }, pageModel))];
            });
        });
    };
    /**
     * 查询品牌详情
     * @param brandId 品牌id
     * @param pageModel 分页数据
     */
    TaokeApi.prototype.getBrandDetail = function (brandId, pageModel) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.requestT('/brand-detail', Object.assign({ brandId: brandId }, pageModel))];
            });
        });
    };
    /**
     * 获取单品详情
     * @param id    大淘客商品id
     */
    TaokeApi.prototype.getProductById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.requestT('/detail', { id: id })];
            });
        });
    };
    /**
     * 获取商品列表
     * @param params    请求参数
     */
    TaokeApi.prototype.getProductList = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.requestT('/goods', params)];
            });
        });
    };
    return TaokeApi;
}());
exports.default = TaokeApi;
