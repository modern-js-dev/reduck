"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.matchBodyType = exports.Response = exports.createResponse = exports.toResponse = void 0;
var tslib_1 = require("tslib");
var responseInfo_1 = require("./responseInfo");
var util_1 = require("./util");
var toResponse = function (f, info) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (0, exports.createResponse)((0, responseInfo_1.merge)(info, f.apply(void 0, (0, tslib_1.__spreadArray)([], (0, tslib_1.__read)(args), false))));
    };
};
exports.toResponse = toResponse;
var createResponse = function (info) {
    return {
        info: info,
        merge: function () {
            var responsers = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                responsers[_i] = arguments[_i];
            }
            var infos = responsers.map(function (responser) { return responser.info; });
            return (0, exports.createResponse)(responseInfo_1.merge.apply(void 0, (0, tslib_1.__spreadArray)([info], (0, tslib_1.__read)(infos), false)));
        },
        is: function () {
            var types = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                types[_i] = arguments[_i];
            }
            return responseInfo_1.is.apply(void 0, (0, tslib_1.__spreadArray)([info], (0, tslib_1.__read)(types), false));
        },
        string: (0, exports.toResponse)(responseInfo_1.string, info),
        json: (0, exports.toResponse)(responseInfo_1.json, info),
        html: (0, exports.toResponse)(responseInfo_1.html, info),
        text: (0, exports.toResponse)(responseInfo_1.text, info),
        redirect: (0, exports.toResponse)(responseInfo_1.redirect, info),
        stream: (0, exports.toResponse)(responseInfo_1.stream, info),
        file: (0, exports.toResponse)(responseInfo_1.file, info),
        vary: (0, exports.toResponse)(responseInfo_1.vary, info),
        cookie: (0, exports.toResponse)(responseInfo_1.cookie, info),
        cookies: (0, exports.toResponse)(responseInfo_1.cookies, info),
        header: (0, exports.toResponse)(responseInfo_1.header, info),
        headers: (0, exports.toResponse)(responseInfo_1.headers, info),
        status: (0, exports.toResponse)(responseInfo_1.status, info),
        buffer: (0, exports.toResponse)(responseInfo_1.buffer, info),
        empty: (0, exports.toResponse)(responseInfo_1.empty, info),
        attachment: (0, exports.toResponse)(responseInfo_1.attachment, info),
        custom: (0, exports.toResponse)(responseInfo_1.custom, info),
        type: (0, exports.toResponse)(responseInfo_1.type, info),
    };
};
exports.createResponse = createResponse;
exports.Response = (0, exports.createResponse)((0, responseInfo_1.empty)());
var matchBodyType = function (type, f) {
    return function (request, next) {
        var _a;
        var response = next(request);
        if ((0, util_1.isPromise)(response)) {
            return response.then(function (response) {
                var _a;
                if (((_a = response.info.body) === null || _a === void 0 ? void 0 : _a.type) === type) {
                    var fResult = f(response.info.body);
                    if ((0, util_1.isPromise)(fResult)) {
                        return fResult.then(response.merge);
                    }
                    return fResult;
                }
                return response;
            });
        }
        if (((_a = response.info.body) === null || _a === void 0 ? void 0 : _a.type) === type) {
            var fResult = f(response.info.body);
            if ((0, util_1.isPromise)(fResult)) {
                return fResult.then(response.merge);
            }
            return fResult;
        }
        return response;
    };
};
exports.matchBodyType = matchBodyType;
//# sourceMappingURL=response.js.map