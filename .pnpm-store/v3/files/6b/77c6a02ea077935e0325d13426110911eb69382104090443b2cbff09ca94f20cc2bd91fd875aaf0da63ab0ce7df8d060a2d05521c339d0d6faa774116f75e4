"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Https = exports.createHttpsPipeline = void 0;
var tslib_1 = require("tslib");
var https_1 = require("https");
var cookie_1 = require("cookie");
var qs_1 = require("qs");
var farrow_pipeline_1 = require("farrow-pipeline");
var http_1 = require("./http");
var router_1 = require("./router");
var response_1 = require("./response");
var logger_1 = require("./logger");
var basenames_1 = require("./basenames");
var context_1 = require("./context");
var util_1 = require("./util");
var createHttpsPipeline = function (options) {
    var isNotProduction = process.env.NODE_ENV !== 'production';
    var config = (0, tslib_1.__assign)({ logger: isNotProduction, errorStack: isNotProduction }, options);
    var loggerOptions = !config.logger || typeof config.logger === 'boolean' ? {} : config.logger;
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
        var handleBody = function (body) {
            var _a, _b;
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
                    return http_1.NOT_FOUND_RESPONSE;
                },
            });
            if ((0, util_1.isPromise)(maybeAsyncResponse)) {
                return maybeAsyncResponse.then(function (response) {
                    return (0, http_1.handleResponse)({
                        req: req,
                        res: res,
                        requestInfo: requestInfo,
                        responseInfo: response.info,
                        container: container,
                    });
                });
            }
            return (0, http_1.handleResponse)({
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
        var _a, _b, _c, _d;
        if (logger) {
            var startTime_1 = Date.now();
            var method_1 = (_a = req.method) !== null && _a !== void 0 ? _a : 'GET';
            var url_1 = (_b = req.url) !== null && _b !== void 0 ? _b : '';
            var contentLength_1 = 0;
            var hasLogOut_1 = false;
            var logOutput_1 = function (event) {
                if (hasLogOut_1)
                    return;
                hasLogOut_1 = true;
                logger === null || logger === void 0 ? void 0 : logger.logOutput(method_1, url_1, res.statusCode, startTime_1, contentLength_1 || (0, util_1.getContentLength)(res), event);
            };
            logger.logInput(method_1, url_1);
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
        try {
            return handleRequest(req, res, options);
        }
        catch (error) {
            var message = (_c = (config.errorStack ? (error === null || error === void 0 ? void 0 : error.stack) || (error === null || error === void 0 ? void 0 : error.message) : error === null || error === void 0 ? void 0 : error.message)) !== null && _c !== void 0 ? _c : '';
            if (!res.headersSent) {
                res.statusCode = (_d = error.statusCode) !== null && _d !== void 0 ? _d : 500;
                res.setHeader('Content-Type', 'text/plain');
                res.setHeader('Content-Length', Buffer.byteLength(message));
            }
            if (!res.writableEnded) {
                res.end(Buffer.from(message));
            }
        }
    };
    var server = function () {
        return (options === null || options === void 0 ? void 0 : options.tls) ? (0, https_1.createServer)(options.tls, handle) : (0, https_1.createServer)(handle);
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
exports.createHttpsPipeline = createHttpsPipeline;
exports.Https = exports.createHttpsPipeline;
//# sourceMappingURL=https.js.map