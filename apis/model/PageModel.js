"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductUtil = exports.coverAntdPageParamModelToRequestParam = void 0;
var coverAntdPageParamModelToRequestParam = function (params) {
    var _a, _b;
    return {
        page: ((_a = params.current) !== null && _a !== void 0 ? _a : 1) - 1,
        pageSize: (_b = params.pageSize) !== null && _b !== void 0 ? _b : 10,
    };
};
exports.coverAntdPageParamModelToRequestParam = coverAntdPageParamModelToRequestParam;
/// 产品工具类
var ProductUtil = /** @class */ (function () {
    function ProductUtil() {
    }
    /// 商品详情字符串转对象
    ProductUtil.prototype.detailCovert = function (str) {
        return JSON.parse(str);
    };
    return ProductUtil;
}());
exports.ProductUtil = ProductUtil;
