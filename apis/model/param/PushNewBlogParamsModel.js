"use strict";
// 发布博客所需的参数
Object.defineProperty(exports, "__esModule", { value: true });
var PushNewBlogParams = /** @class */ (function () {
    function PushNewBlogParams(title, content, tags, categoryId) {
        this.title = title;
        this.content = content;
        this.tags = tags;
        this.categoryId = categoryId;
    }
    return PushNewBlogParams;
}());
exports.default = PushNewBlogParams;
