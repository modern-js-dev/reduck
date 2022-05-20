"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPathSnippets = exports.matchBasename = exports.handleBasenames = exports.route = exports.usePrefix = exports.useBasenames = exports.BasenamesContext = void 0;
var tslib_1 = require("tslib");
var path_1 = (0, tslib_1.__importDefault)(require("path"));
var farrow_pipeline_1 = require("farrow-pipeline");
var util_1 = require("./util");
exports.BasenamesContext = (0, farrow_pipeline_1.createContext)([]);
var useBasenames = function () {
    var basenames = exports.BasenamesContext.use();
    return basenames;
};
exports.useBasenames = useBasenames;
var usePrefix = function () {
    var basenames = exports.BasenamesContext.use().value;
    return basenames.join('');
};
exports.usePrefix = usePrefix;
var route = function (name) {
    var pipeline = (0, farrow_pipeline_1.createPipeline)();
    assertRoutePath(name, "expect the basename passed to 'http.route' should be absolute, accept `".concat(name, "`"));
    var middleware = function (request, next) {
        var container = (0, farrow_pipeline_1.useContainer)();
        var basenames = exports.BasenamesContext.use();
        if (!(0, exports.matchBasename)(name, request.pathname)) {
            return next();
        }
        var _a = (0, exports.handleBasenames)([name], request), basename = _a.basename, requestInfo = _a.requestInfo;
        var currentBasenames = basenames.value;
        basenames.value = (0, tslib_1.__spreadArray)((0, tslib_1.__spreadArray)([], (0, tslib_1.__read)(currentBasenames), false), [basename], false);
        var maybeAsyncResponse = pipeline.run(requestInfo, {
            container: container,
            onLast: function () {
                basenames.value = currentBasenames;
                return next(request);
            },
        });
        if ((0, util_1.isPromise)(maybeAsyncResponse)) {
            return maybeAsyncResponse.then(function (response) {
                basenames.value = currentBasenames;
                return response;
            });
        }
        basenames.value = currentBasenames;
        return maybeAsyncResponse;
    };
    return (0, tslib_1.__assign)((0, tslib_1.__assign)({}, pipeline), { middleware: middleware });
};
exports.route = route;
var handleBasenames = function (basenames, requestInfo) {
    var _a = findBasename(basenames, requestInfo.pathname), basename = _a.basename, pathname = _a.pathname;
    var newRequestInfo = (0, tslib_1.__assign)((0, tslib_1.__assign)({}, requestInfo), { pathname: pathname });
    return {
        basename: basename,
        requestInfo: newRequestInfo,
    };
};
exports.handleBasenames = handleBasenames;
var findBasename = function (basenames, pathname) {
    var e_1, _a;
    try {
        for (var basenames_1 = (0, tslib_1.__values)(basenames), basenames_1_1 = basenames_1.next(); !basenames_1_1.done; basenames_1_1 = basenames_1.next()) {
            var basename = basenames_1_1.value;
            if (!(0, exports.matchBasename)(basename, pathname))
                continue;
            var newPathname = pathname.replace(basename, '');
            if (!newPathname.startsWith('/')) {
                newPathname = "/".concat(newPathname);
            }
            return {
                basename: basename,
                pathname: newPathname,
            };
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (basenames_1_1 && !basenames_1_1.done && (_a = basenames_1.return)) _a.call(basenames_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return {
        basename: '',
        pathname: pathname,
    };
};
var matchBasename = function (basename, pathname) {
    var baseSnippets = (0, exports.getPathSnippets)(basename);
    var pathSnippets = (0, exports.getPathSnippets)(pathname);
    for (var i = 0; i < baseSnippets.length; i++) {
        if (baseSnippets[i] !== pathSnippets[i]) {
            return false;
        }
    }
    return true;
};
exports.matchBasename = matchBasename;
var getPathSnippets = function (pathname) {
    var normalized = normalizePath(pathname);
    if (normalized === '/')
        return [];
    return normalized.split('/').slice(1);
};
exports.getPathSnippets = getPathSnippets;
var normalizePath = function (pathname) {
    var result = path_1.default.posix.normalize(pathname);
    if (result.endsWith('/')) {
        result = result.substring(0, result.length - 1);
    }
    if (!result.startsWith('/')) {
        result = "/".concat(result);
    }
    return result;
};
var assertRoutePath = function (pathname, message) {
    if (!path_1.default.posix.isAbsolute(pathname)) {
        throw new Error(message);
    }
};
//# sourceMappingURL=basenames.js.map