"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductUtil = void 0;
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
