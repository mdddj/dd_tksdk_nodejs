"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ServerUtil = /** @class */ (function () {
    function ServerUtil() {
        this.defaultHost = 'https://itbug.shop';
    }
    ServerUtil.prototype.ServeUtil = function () {
    };
    ServerUtil.getInstance = function () {
        var _a;
        return (_a = this.instance) !== null && _a !== void 0 ? _a : new ServerUtil();
    };
    Object.defineProperty(ServerUtil.prototype, "host", {
        get: function () {
            var _a;
            return (_a = this._host) !== null && _a !== void 0 ? _a : this.defaultHost;
        },
        set: function (value) {
            this._host = value;
            console.log("\u521D\u59CB\u5316host\u6210\u529F,host is :  ".concat(value));
        },
        enumerable: false,
        configurable: true
    });
    return ServerUtil;
}());
exports.default = ServerUtil;
