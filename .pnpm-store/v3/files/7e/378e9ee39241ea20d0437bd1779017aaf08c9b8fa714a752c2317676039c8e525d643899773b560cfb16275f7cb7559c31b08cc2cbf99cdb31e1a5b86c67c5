"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPromise = exports.getBody = exports.getContentLength = exports.getStats = exports.stat = exports.access = exports.prettyTime = exports.prettyNumber = exports.defaultPrettyNumberOptions = void 0;
var tslib_1 = require("tslib");
var fs_1 = (0, tslib_1.__importDefault)(require("fs"));
var type_is_1 = (0, tslib_1.__importDefault)(require("type-is"));
var co_body_1 = (0, tslib_1.__importDefault)(require("co-body"));
exports.defaultPrettyNumberOptions = {
    delimiter: ',',
    separator: '.',
};
var prettyNumber = function (number, options) {
    var config = (0, tslib_1.__assign)((0, tslib_1.__assign)({}, exports.defaultPrettyNumberOptions), options);
    var delimiter = config.delimiter, separator = config.separator;
    var _a = (0, tslib_1.__read)(number.toString().split('.')), first = _a[0], rest = _a.slice(1);
    var text = first.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1".concat(delimiter));
    return (0, tslib_1.__spreadArray)([text], (0, tslib_1.__read)(rest), false).join(separator);
};
exports.prettyNumber = prettyNumber;
var prettyTime = function (start) {
    var delta = Date.now() - start;
    return (0, exports.prettyNumber)(delta < 10000 ? "".concat(delta, "ms") : "".concat(Math.round(delta / 1000), "s"));
};
exports.prettyTime = prettyTime;
exports.access = (_a = fs_1.default.promises, _a.access), exports.stat = _a.stat;
var getStats = function (filename) {
    return (0, exports.stat)(filename)
        .then(function (stats) { return stats; })
        .catch(function () { return undefined; });
};
exports.getStats = getStats;
var getContentLength = function (res) {
    var contentLength = res.getHeader('Content-Length');
    if (typeof contentLength === 'string') {
        var length_1 = parseFloat(contentLength);
        return isNaN(length_1) ? 0 : length_1;
    }
    if (typeof contentLength !== 'number') {
        return 0;
    }
    return contentLength;
};
exports.getContentLength = getContentLength;
var jsonTypes = ['json', 'application/*+json', 'application/csp-report'];
var formTypes = ['urlencoded'];
var textTypes = ['text'];
var getBody = function (req, options) {
    var type = (0, type_is_1.default)(req, jsonTypes) || (0, type_is_1.default)(req, formTypes) || (0, type_is_1.default)(req, textTypes);
    if (type) {
        return (0, co_body_1.default)(req, options);
    }
    return null;
};
exports.getBody = getBody;
var isPromise = function (input) {
    return input && 'then' in input && typeof input.then === 'function';
};
exports.isPromise = isPromise;
//# sourceMappingURL=util.js.map