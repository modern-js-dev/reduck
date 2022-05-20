"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleResponse = exports.Http = exports.createHttpPipeline = exports.NOT_FOUND_RESPONSE = void 0;
var tslib_1 = require("tslib");
var http_1 = require("http");
var fs_1 = (0, tslib_1.__importDefault)(require("fs"));
var path_1 = (0, tslib_1.__importDefault)(require("path"));
var cookie_1 = require("cookie");
var qs_1 = require("qs");
var cookies_1 = (0, tslib_1.__importDefault)(require("cookies"));
var statuses_1 = (0, tslib_1.__importDefault)(require("statuses"));
var accepts_1 = (0, tslib_1.__importDefault)(require("accepts"));
var encodeurl_1 = (0, tslib_1.__importDefault)(require("encodeurl"));
var escape_html_1 = (0, tslib_1.__importDefault)(require("escape-html"));
var vary_1 = (0, tslib_1.__importDefault)(require("vary"));
var on_finished_1 = (0, tslib_1.__importDefault)(require("on-finished"));
var destroy_1 = (0, tslib_1.__importDefault)(require("destroy"));
var mime_types_1 = (0, tslib_1.__importDefault)(require("mime-types"));
var farrow_pipeline_1 = require("farrow-pipeline");
var response_1 = require("./response");
var basenames_1 = require("./basenames");
var router_1 = require("./router");
var logger_1 = require("./logger");
var util_1 = require("./util");
var context_1 = require("./context");
exports.NOT_FOUND_RESPONSE = response_1.Response.status(404).text('404 Not Found');
var createHttpPipeline = function (options) {
    var isNotProduction = process.env.NODE_ENV !== 'production';
    var config = (0, tslib_1.__assign)({ logger: isNotProduction, errorStack: isNotProduction }, options);
    var loggerOptions = (0, tslib_1.__assign)({ ignoreIntrospectionRequestOfFarrowApi: true }, (!config.logger || typeof config.logger === 'boolean' ? {} : config.logger));
    var logger = config.logger ? (0, logger_1.createLogger)(loggerOptions) : null;
    var router = (0, router_1.Router)();
    var handleRequest = function (req, res, options) {
        var _a, _b, _c;
        if (typeof req.url !== 'string') {
            throw new Error("req.url is not existed");
        }
        var url = req.url;
        var _d = (0, tslib_1.__read)(url.split('?'), 2), _e = _d[0], pathname = _e === void 0 ? '/' : _e, _f = _d[1], search = _f === void 0 ? '' : _f;
        var method = (_a = req.method) !== null && _a !== void 0 ? _a : 'GET';
        var query = (_b = req.query) !== null && _b !== void 0 ? _b : (0, qs_1.parse)(search, config.query);
        var headers = req.headers;
        var cookies = (0, cookie_1.parse)((_c = req.headers['cookie']) !== null && _c !== void 0 ? _c : '', config.cookie);
        var handleRequestLog = function (body) {
            var _a;
            var isIntrospectionRequest = method.toLowerCase() === 'post' && typeof body === 'object' && body && body.type === 'Introspection';
            var shouldLog = logger && !(loggerOptions.ignoreIntrospectionRequestOfFarrowApi && isIntrospectionRequest);
            if (shouldLog) {
                var startTime_1 = Date.now();
                var url_1 = (_a = req.url) !== null && _a !== void 0 ? _a : '';
                var contentLength_1 = 0;
                var hasLogOut_1 = false;
                var logOutput_1 = function (event) {
                    if (hasLogOut_1)
                        return;
                    hasLogOut_1 = true;
                    logger === null || logger === void 0 ? void 0 : logger.logOutput(method, url_1, res.statusCode, startTime_1, contentLength_1 || (0, util_1.getContentLength)(res), event);
                };
                logger.logInput(method, url_1);
                // log close
                res.once('close', function () {
                    logOutput_1('close');
                });
                // log error
                res.once('error', function () {
                    logOutput_1('error');
                });
                // log finish
                res.once('finish', function () {
                    logOutput_1('finish');
                });
                // log stream pipe response
                res.once('pipe', function (readable) {
                    readable.on('data', function (chunk) {
                        contentLength_1 += chunk.length;
                    });
                });
            }
        };
        var handleBody = function (body) {
            var _a, _b;
            handleRequestLog(body);
            var _c = (0, basenames_1.handleBasenames)((_a = config.basenames) !== null && _a !== void 0 ? _a : [], {
                pathname: pathname,
                method: method,
                query: query,
                body: body,
                headers: headers,
                cookies: cookies,
            }), basename = _c.basename, requestInfo = _c.requestInfo;
            var storages = (_b = config.contexts) === null || _b === void 0 ? void 0 : _b.call(config, {
                req: req,
                requestInfo: requestInfo,
                basename: basename,
            });
            var container = (0, farrow_pipeline_1.createContainer)((0, tslib_1.__assign)((0, tslib_1.__assign)({}, storages), { request: context_1.RequestContext.create(req), response: context_1.ResponseContext.create(res), basenames: basenames_1.BasenamesContext.create([basename]), requestInfo: context_1.RequestInfoContext.create(requestInfo) }));
            var maybeAsyncResponse = router.run(requestInfo, {
                container: container,
                onLast: function () {
                    if (options === null || options === void 0 ? void 0 : options.onLast) {
                        return response_1.Response.custom(options.onLast);
                    }
                    return exports.NOT_FOUND_RESPONSE;
                },
            });
            if ((0, util_1.isPromise)(maybeAsyncResponse)) {
                return maybeAsyncResponse.then(function (response) {
                    return (0, exports.handleResponse)({
                        req: req,
                        res: res,
                        requestInfo: requestInfo,
                        responseInfo: response.info,
                        container: container,
                    });
                });
            }
            return (0, exports.handleResponse)({
                req: req,
                res: res,
                requestInfo: requestInfo,
                responseInfo: maybeAsyncResponse.info,
                container: container,
            });
        };
        if (req.body) {
            return handleBody(req.body);
        }
        var maybeAsyncBody = (0, util_1.getBody)(req, config.body);
        if (maybeAsyncBody) {
            return maybeAsyncBody
                .then(function (body) { return handleBody(body); })
                .catch(function (err) {
                throw err;
            });
        }
        return handleBody(maybeAsyncBody);
    };
    var handle = function (req, res, options) {
        var handleError = function (error) {
            var _a, _b;
            var message = (_a = (config.errorStack ? (error === null || error === void 0 ? void 0 : error.stack) || (error === null || error === void 0 ? void 0 : error.message) : error === null || error === void 0 ? void 0 : error.message)) !== null && _a !== void 0 ? _a : '';
            if (!res.headersSent) {
                res.statusCode = (_b = error.statusCode) !== null && _b !== void 0 ? _b : 500;
                res.setHeader('Content-Type', 'text/plain');
                res.setHeader('Content-Length', Buffer.byteLength(message));
            }
            if (!res.writableEnded) {
                res.end(Buffer.from(message));
            }
        };
        try {
            var result = handleRequest(req, res, options);
            if ((0, util_1.isPromise)(result)) {
                return result.catch(handleError);
            }
        }
        catch (error) {
            handleError(error);
        }
    };
    var server = function () {
        return (0, http_1.createServer)(handle);
    };
    var listen = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = server()).listen.apply(_a, (0, tslib_1.__spreadArray)([], (0, tslib_1.__read)(args), false));
    };
    return (0, tslib_1.__assign)((0, tslib_1.__assign)({}, router), { handle: handle, listen: listen, server: server });
};
exports.createHttpPipeline = createHttpPipeline;
exports.Http = exports.createHttpPipeline;
var handleResponse = function (params) {
    var req = params.req, res = params.res, requestInfo = params.requestInfo, responseInfo = params.responseInfo, container = params.container;
    var basenames = container.read(basenames_1.BasenamesContext);
    var prefix = basenames.join('');
    var accept = (0, accepts_1.default)(req);
    // handle response status
    var handleStatus = function (status) {
        var _a;
        if (status === void 0) { status = { code: 200 }; }
        var code = status.code, message = status.message;
        res.statusCode = code;
        res.statusMessage = message || ((_a = statuses_1.default.message[code]) !== null && _a !== void 0 ? _a : '');
    };
    // handle response headers
    var handleHeaders = function (headers) {
        var names = Object.keys(headers);
        for (var i = 0; i < names.length; i++) {
            var name_1 = names[i];
            var value = headers[name_1];
            if (value) {
                res.setHeader(name_1, value);
            }
        }
    };
    // handle response cookies
    var handleCookies = function (cookies) {
        var cookiesInstance = new cookies_1.default(req, res);
        var names = Object.keys(cookies);
        for (var i = 0; i < names.length; i++) {
            var name_2 = names[i];
            var cookie = cookies[name_2];
            if (cookie.value !== null) {
                cookiesInstance.set(name_2, "".concat(cookie.value), cookie.options);
            }
            else {
                cookiesInstance.set(name_2, '', cookie.options);
            }
        }
    };
    var handleEmpty = function () {
        var _a, _b;
        var code = (_b = (_a = responseInfo.status) === null || _a === void 0 ? void 0 : _a.code) !== null && _b !== void 0 ? _b : 204;
        handleStatus({ code: code });
        res.end();
    };
    var handleString = function (content) {
        var length = Buffer.byteLength(content);
        res.setHeader('Content-Length', length);
        res.end(content);
    };
    var handleJson = function (json) {
        var content = JSON.stringify(json);
        var length = Buffer.byteLength(content);
        res.setHeader('Content-Length', length);
        res.end(content);
    };
    var handleRedirect = function (body) {
        var _a, _b;
        var url = body.value;
        if (url === 'back') {
            var referrer = "".concat(req.headers['referer']) || '/';
            url = referrer;
        }
        // handle route name and basename
        if (body.usePrefix && !url.startsWith('//') && url.startsWith('/')) {
            url = prefix + url;
        }
        var code = (_b = (_a = responseInfo.status) === null || _a === void 0 ? void 0 : _a.code) !== null && _b !== void 0 ? _b : 302;
        handleStatus({
            code: statuses_1.default.redirect[code] ? code : 302,
        });
        handleHeaders({
            Location: (0, encodeurl_1.default)(url),
        });
        if (accept.types('html')) {
            handleHeaders({
                'Content-Type': 'text/html; charset=utf-8',
            });
            handleString("Redirecting to ".concat((0, escape_html_1.default)(url)));
        }
        else {
            handleString("Redirecting to ".concat(url));
        }
    };
    var handleBuffer = function (buffer) {
        res.setHeader('Content-Length', buffer.length);
        res.end(buffer);
    };
    var handleFile = function (filename, options) { return (0, tslib_1.__awaiter)(void 0, void 0, void 0, function () {
        var error_1, stream, ext, contentType;
        return (0, tslib_1.__generator)(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, (0, util_1.access)(filename, fs_1.default.constants.F_OK | fs_1.default.constants.R_OK)];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    return [2 /*return*/, (0, exports.handleResponse)((0, tslib_1.__assign)((0, tslib_1.__assign)({}, params), { responseInfo: response_1.Response.status(404).text(error_1.message).info }))];
                case 3:
                    stream = fs_1.default.createReadStream(filename, options);
                    if (!res.getHeader('Content-Type')) {
                        ext = path_1.default.extname(filename);
                        contentType = mime_types_1.default.contentType(ext);
                        if (contentType) {
                            res.setHeader('Content-Type', contentType);
                        }
                    }
                    return [2 /*return*/, handleStream(res, stream)];
            }
        });
    }); };
    var handleBody = function (body) {
        if (!body || body.type === 'empty') {
            return handleEmpty();
        }
        if (body.type === 'string') {
            return handleString(body.value);
        }
        if (body.type === 'json') {
            return handleJson(body.value);
        }
        if (body.type === 'redirect') {
            return handleRedirect(body);
        }
        if (body.type === 'stream') {
            return handleStream(res, body.value);
        }
        if (body.type === 'buffer') {
            return handleBuffer(body.value);
        }
        if (body.type === 'file') {
            return handleFile(body.value);
        }
        if (body.type === 'custom') {
            var handler_1 = body.handler;
            var handleResponse_1 = function () {
                return handler_1({
                    req: req,
                    res: res,
                    requestInfo: requestInfo,
                    responseInfo: omitBody(responseInfo),
                });
            };
            return (0, farrow_pipeline_1.runWithContainer)(handleResponse_1, container);
        }
        throw new Error("Unsupported response body: ".concat(JSON.stringify(body, null, 2)));
    };
    handleStatus(responseInfo.status);
    if (responseInfo.cookies) {
        handleCookies(responseInfo.cookies);
    }
    if (responseInfo.headers) {
        handleHeaders(responseInfo.headers);
    }
    if (responseInfo.vary) {
        (0, vary_1.default)(res, responseInfo.vary);
    }
    return handleBody(responseInfo.body);
};
exports.handleResponse = handleResponse;
var omitBody = function (obj) {
    var body = obj.body, rest = (0, tslib_1.__rest)(obj, ["body"]);
    return rest;
};
var handleStream = function (res, stream) {
    return new Promise(function (resolve, reject) {
        stream.once('error', reject);
        stream.pipe(res);
        (0, on_finished_1.default)(res, function (error) {
            if (error) {
                reject(error);
            }
            else {
                resolve();
            }
            (0, destroy_1.default)(stream);
        });
    });
};
//# sourceMappingURL=http.js.map