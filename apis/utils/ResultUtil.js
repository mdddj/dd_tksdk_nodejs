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
Object.defineProperty(exports, "__esModule", { value: true });
exports.antdTableParamAsT = exports.ParseResultToProTable = exports.simpleHandleResultMessage = exports.tkDataToObject = exports.successResultHandle = exports.responseIsSuccess = void 0;
/**
 * 判断请求是否成功
 * @param result  服务器返回的数据
 */
function responseIsSuccess(result) {
    return result.state === 200;
}
exports.responseIsSuccess = responseIsSuccess;
/**
 * 当请求成功的时候处理函数
 * @param result    返回结果
 * @param success   成功执行方法 如果result.data 为null时不执行success方法
 * @param error 返回错误信息
 */
function successResultHandle(result, success, error) {
    if (responseIsSuccess(result)) {
        if (result.data) {
            success(result.data);
        }
    }
    else {
        error === null || error === void 0 ? void 0 : error(result.message);
    }
}
exports.successResultHandle = successResultHandle;
/**
 * 淘客数据转换 json string 字符串转对象
 * @param data  json字符串  Result.data 类型是json类型转成T
 */
function tkDataToObject(data) {
    return JSON.parse(data);
}
exports.tkDataToObject = tkDataToObject;
/**
 * 简单处理服务器的消息
 * @param result  服务器返回的数据
 * @param success 操作成功返回的数据
 * @param showSuccessMessage 是否显示成功消息
 * @param error 操作失败的回调
 */
function simpleHandleResultMessage(result, success, showSuccessMessage, error) {
    return __awaiter(this, void 0, void 0, function () {
        var data, paramsError;
        return __generator(this, function (_a) {
            if (responseIsSuccess(result)) {
                success && success(result.data);
            }
            else {
                if (result.state == 505) {
                    data = result.data;
                    paramsError = data;
                    error === null || error === void 0 ? void 0 : error(paramsError);
                }
                error === null || error === void 0 ? void 0 : error(undefined);
            }
            return [2 /*return*/];
        });
    });
}
exports.simpleHandleResultMessage = simpleHandleResultMessage;
/**
 * 使用实例
 const fetchDataList = async (params: any, _: any, __: any) => {
    const param = coverAntdPageParamModelToRequestParam(params);
    const result = await GetResourceCategoryList(param);
    return ParseResultToProTable<ResCategory>(result)  // <<<<<---------------这里
  }
 * @param result
 * @constructor
 */
var ParseResultToProTable = function (result) {
    return {
        data: result.data.list,
        success: responseIsSuccess(result),
        total: result.data.page.total,
        current: result.data.page.currentPage,
    };
};
exports.ParseResultToProTable = ParseResultToProTable;
/**
 *
 * 将查询参数转成对象类型
 *
 * 去除了 current 参数
 * 去除了value为空的参数
 *
 * 使用示例
 *  const fetchDataList = async (params: any, _: any, __: any) => {
    const param = coverAntdPageParamModelToRequestParam(params);
    const result = await GetResourceCategoryList(param,antdTableParamAsT(params)); // <<<<<---------------这里
    return ParseResultToProTable<ResCategory>(result);
  };
 *
 * @param params
 */
var antdTableParamAsT = function (params) {
    if (params.current) {
        delete params.current;
    }
    if (params.pageSize) {
        delete params.pageSize;
    }
    for (var key in params) {
        if (params[key] === '') {
            delete params[key];
        }
    }
    return params;
};
exports.antdTableParamAsT = antdTableParamAsT;
