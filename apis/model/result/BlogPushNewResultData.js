"use strict";
// To parse this data:
//
//   import { Convert, BlogPushNewResultData } from "./file";
//
//   const blogPushNewResultData = Convert.toBlogPushNewResultData(json);
Object.defineProperty(exports, "__esModule", { value: true });
exports.Convert = void 0;
// Converts JSON strings to/from your types
var Convert = /** @class */ (function () {
    function Convert() {
    }
    Convert.toBlogPushNewResultData = function (json) {
        return JSON.parse(json);
    };
    Convert.blogPushNewResultDataToJson = function (value) {
        return JSON.stringify(value);
    };
    return Convert;
}());
exports.Convert = Convert;
