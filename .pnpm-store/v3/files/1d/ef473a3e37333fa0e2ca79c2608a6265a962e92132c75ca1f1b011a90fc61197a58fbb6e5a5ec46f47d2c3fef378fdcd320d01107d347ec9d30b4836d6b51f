"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.json = exports.html = exports.text = exports.is = exports.type = exports.merge = exports.vary = exports.cookie = exports.cookies = exports.header = exports.headers = exports.status = exports.attachment = exports.file = exports.buffer = exports.stream = exports.custom = exports.redirect = exports.string = exports.empty = void 0;
var tslib_1 = require("tslib");
var mime_types_1 = (0, tslib_1.__importDefault)(require("mime-types"));
var type_is_1 = (0, tslib_1.__importDefault)(require("type-is"));
var content_disposition_1 = (0, tslib_1.__importDefault)(require("content-disposition"));
var empty = function () {
    return {
        body: {
            type: 'empty',
            value: null,
        },
    };
};
exports.empty = empty;
var string = function (value) {
    return {
        body: {
            type: 'string',
            value: value,
        },
    };
};
exports.string = string;
var redirect = function (url, options) {
    var _a;
    return {
        body: {
            type: 'redirect',
            value: url,
            usePrefix: (_a = options === null || options === void 0 ? void 0 : options.usePrefix) !== null && _a !== void 0 ? _a : true,
        },
    };
};
exports.redirect = redirect;
var custom = function (handler) {
    if (handler === void 0) { handler = function () { return undefined; }; }
    return {
        body: {
            type: 'custom',
            handler: handler,
        },
    };
};
exports.custom = custom;
var stream = function (stream) {
    return {
        body: {
            type: 'stream',
            value: stream,
        },
    };
};
exports.stream = stream;
var buffer = function (buffer) {
    return {
        body: {
            type: 'buffer',
            value: buffer,
        },
    };
};
exports.buffer = buffer;
var file = function (filename, options) {
    return {
        body: {
            type: 'file',
            value: filename,
            options: options,
        },
    };
};
exports.file = file;
var attachment = function (filename, options) {
    return (0, exports.headers)({
        'Content-Disposition': (0, content_disposition_1.default)(filename, options),
    });
};
exports.attachment = attachment;
var status = function (code, message) {
    if (message === void 0) { message = ''; }
    return {
        status: {
            code: code,
            message: message,
        },
    };
};
exports.status = status;
var headers = function (headers) {
    return {
        headers: headers,
    };
};
exports.headers = headers;
var header = function (name, value) {
    var _a;
    return (0, exports.headers)((_a = {}, _a[name] = value, _a));
};
exports.header = header;
var cookies = function (config, options) {
    var cookies = {};
    Object.entries(config).forEach(function (_a) {
        var _b = (0, tslib_1.__read)(_a, 2), name = _b[0], value = _b[1];
        cookies[name] = {
            value: value,
            options: options,
        };
    });
    return {
        cookies: cookies,
    };
};
exports.cookies = cookies;
var cookie = function (name, value, options) {
    var _a;
    return (0, exports.cookies)((_a = {}, _a[name] = value, _a), options);
};
exports.cookie = cookie;
var vary = function () {
    var fileds = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        fileds[_i] = arguments[_i];
    }
    return {
        vary: fileds,
    };
};
exports.vary = vary;
var merge = function () {
    var responses = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        responses[_i] = arguments[_i];
    }
    var result = {};
    responses.forEach(function (response) {
        var _a;
        if (response.body) {
            result.body = response.body;
        }
        if (response.status) {
            result.status = Object.assign({}, result.status, response.status);
        }
        if (response.headers) {
            result.headers = Object.assign({}, result.headers, response.headers);
        }
        if (response.cookies) {
            result.cookies = Object.assign({}, result.cookies, response.cookies);
        }
        if (response.vary) {
            result.vary = (0, tslib_1.__spreadArray)((0, tslib_1.__spreadArray)([], (0, tslib_1.__read)(((_a = result.vary) !== null && _a !== void 0 ? _a : [])), false), (0, tslib_1.__read)(response.vary), false);
        }
    });
    return result;
};
exports.merge = merge;
var type = function (type) {
    var contentType = mime_types_1.default.contentType(type);
    if (contentType === false) {
        return (0, exports.headers)({});
    }
    return (0, exports.headers)({
        'Content-Type': contentType,
    });
};
exports.type = type;
var is = function (info) {
    var _a, _b, _c;
    var types = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        types[_i - 1] = arguments[_i];
    }
    var contentType = (_b = (_a = info.headers) === null || _a === void 0 ? void 0 : _a['content-type']) !== null && _b !== void 0 ? _b : (_c = info.headers) === null || _c === void 0 ? void 0 : _c['Content-Type'];
    if (!contentType) {
        return false;
    }
    return type_is_1.default.is(contentType.toString(), types);
};
exports.is = is;
var text = function (value) {
    return (0, exports.merge)((0, exports.type)('text'), (0, exports.string)(value));
};
exports.text = text;
var html = function (value) {
    return (0, exports.merge)((0, exports.type)('html'), (0, exports.string)(value));
};
exports.html = html;
var json = function (value) {
    return (0, exports.merge)((0, exports.type)('json'), {
        body: {
            type: 'json',
            value: value,
        },
    });
};
exports.json = json;
//# sourceMappingURL=responseInfo.js.map