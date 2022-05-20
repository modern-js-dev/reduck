"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Router = exports.createRouterPipeline = exports.isRouterUrlSchema = exports.isRouterRequestSchema = void 0;
var tslib_1 = require("tslib");
var path_1 = (0, tslib_1.__importDefault)(require("path"));
var path_to_regexp_1 = require("path-to-regexp");
var querystring_1 = require("querystring");
var farrow_pipeline_1 = require("farrow-pipeline");
var Schema = (0, tslib_1.__importStar)(require("farrow-schema"));
var validator_1 = require("farrow-schema/validator");
var basenames_1 = require("./basenames");
var response_1 = require("./response");
var HttpError_1 = require("./HttpError");
var util_1 = require("./util");
var isRouterRequestSchema = function (input) {
    return has(input, 'pathname');
};
exports.isRouterRequestSchema = isRouterRequestSchema;
var isRouterUrlSchema = function (input) {
    return has(input, 'url');
};
exports.isRouterUrlSchema = isRouterUrlSchema;
var createRequestSchemaValidatorAndMatcher = function (schema) {
    var descriptors = {
        pathname: Schema.String,
    };
    if (schema.method) {
        descriptors.method = Schema.String;
    }
    if (schema.params) {
        descriptors.params = schema.params;
    }
    if (schema.query) {
        descriptors.query = schema.query;
    }
    if (schema.body) {
        descriptors.body = schema.body;
    }
    if (schema.headers) {
        descriptors.headers = schema.headers;
    }
    if (schema.cookies) {
        descriptors.cookies = schema.cookies;
    }
    var RequestStruct = Schema.Struct(descriptors);
    var validator = (0, validator_1.createSchemaValidator)(Schema.NonStrict(RequestStruct));
    var matcher = (0, path_to_regexp_1.match)(schema.pathname);
    return {
        validator: validator,
        matcher: matcher,
    };
};
var splitUrlPattern = function (url) {
    var pathname = '';
    var querystring = '';
    var isQuerystring = false;
    for (var i = 0; i < url.length; i++) {
        var item = url.charAt(i);
        if (item === '?' && url.charAt(i + 1) !== ':') {
            isQuerystring = true;
            continue;
        }
        if (isQuerystring) {
            querystring += item;
        }
        else {
            pathname += item;
        }
    }
    return {
        pathname: pathname,
        querystring: querystring,
    };
};
var SchemaMap = {
    string: Schema.String,
    number: Schema.Number,
    boolean: Schema.Boolean,
    int: Schema.Int,
    float: Schema.Float,
    id: Schema.ID,
};
var createSchemaByString = function (str) {
    if (has(SchemaMap, str)) {
        return SchemaMap[str];
    }
    // is union type
    if (str.includes('|')) {
        return Schema.Union.apply(Schema, (0, tslib_1.__spreadArray)([], (0, tslib_1.__read)(str.split('|').map(createSchemaByString)), false));
    }
    // is literal string type
    if (str.startsWith('{') && str.endsWith('}')) {
        var value = str.substring(1, str.length - 1);
        return Schema.Literal(value);
    }
    throw new Error("Unsupported type in url: ".concat(str));
};
var resolveUrlPattern = function (input) {
    var e_1, _a;
    var url = splitUrlPattern(input);
    var params = {};
    var query = {};
    var resolve = function (source, descriptors) {
        return source.replace(/<([^>]*)>/g, function (match) {
            var _a = (0, tslib_1.__read)(match.substring(1, match.length - 1).split(':'), 2), key = _a[0], value = _a[1];
            var Type = createSchemaByString(value);
            if (key.endsWith('?')) {
                var name_1 = key.substr(0, key.length - 1);
                descriptors[name_1] = Schema.Nullable(Type);
            }
            else if (key.endsWith('+') || key.endsWith('*')) {
                var name_2 = key.substr(0, key.length - 1);
                descriptors[name_2] = key.endsWith('*') ? Schema.Nullable(Schema.List(Type)) : Schema.List(Type);
            }
            else {
                descriptors[key] = Type;
            }
            return ":".concat(key);
        });
    };
    var pathname = resolve(url.pathname, params);
    var parsedQuery = (0, querystring_1.parse)(url.querystring);
    resolve(url.querystring, query);
    try {
        for (var _b = (0, tslib_1.__values)(Object.entries(parsedQuery)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var _d = (0, tslib_1.__read)(_c.value, 2), key = _d[0], item = _d[1];
            var isDynamicKey = key.startsWith('<') && key.endsWith('>');
            if (!isDynamicKey) {
                query[key] = Schema.Literal("".concat(item));
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return {
        pathname: pathname,
        params: params,
        query: query,
    };
};
var createUrlSchemaValidatorAndMatcher = function (schema) {
    var url = schema.url, rest = (0, tslib_1.__rest)(schema, ["url"]);
    var _a = resolveUrlPattern(url), pathname = _a.pathname, params = _a.params, query = _a.query;
    var routerRequestSchema = {
        pathname: pathname,
    };
    Object.assign(routerRequestSchema, rest);
    if (Object.keys(params).length) {
        routerRequestSchema.params = params;
    }
    if (Object.keys(query).length) {
        routerRequestSchema.query = query;
    }
    // ensure pathname come from url
    routerRequestSchema.pathname = pathname;
    var result = createRequestSchemaValidatorAndMatcher(routerRequestSchema);
    return (0, tslib_1.__assign)((0, tslib_1.__assign)({}, result), { validator: result.validator });
};
var createRouterPipeline = function () {
    var pipeline = (0, farrow_pipeline_1.createAsyncPipeline)();
    var capture = function (type, f) {
        pipeline.use((0, response_1.matchBodyType)(type, f));
    };
    var route = function (name) {
        var routePipeline = (0, basenames_1.route)(name);
        pipeline.use(routePipeline);
        return routePipeline;
    };
    var serve = function (name, dirname) {
        dirname = path_1.default.normalize(dirname);
        var getIndexHtmlPath = function (filename) {
            if (filename.endsWith('/')) {
                return "".concat(filename, "index.html");
            }
            return "".concat(filename, "/index.html");
        };
        route(name).use(function (request, next) {
            // prevent directory traversal attack
            var filename = path_1.default.normalize(request.pathname);
            var fullpath = path_1.default.join(dirname, filename);
            if (fullpath.indexOf(dirname) !== 0) {
                return next(request);
            }
            return (0, util_1.getStats)(fullpath).then(function (stats) {
                /**
                 * handle file
                 */
                if (stats === null || stats === void 0 ? void 0 : stats.isFile()) {
                    return response_1.Response.file(fullpath);
                }
                /**
                 * handle {dirname}/index.html
                 */
                if (stats === null || stats === void 0 ? void 0 : stats.isDirectory()) {
                    var indexHtmlPath = getIndexHtmlPath(fullpath);
                    return (0, util_1.getStats)(indexHtmlPath).then(function (indexHtmlStats) {
                        if (indexHtmlStats === null || indexHtmlStats === void 0 ? void 0 : indexHtmlStats.isFile()) {
                            return response_1.Response.file(getIndexHtmlPath(fullpath));
                        }
                        return next(request);
                    });
                }
                return next(request);
            });
        });
    };
    var createMatchedPipeline = function (_a) {
        var matchedPipeline = _a.matchedPipeline, method = _a.method, options = _a.options, validator = _a.validator, matcher = _a.matcher;
        var config = (0, tslib_1.__assign)({ block: false }, options);
        var methods = getMethods(method);
        pipeline.use(function (input, next) {
            var container = (0, farrow_pipeline_1.useContainer)();
            if (input.method && !methods.includes(input.method.toLowerCase())) {
                return next();
            }
            var matches = matcher(input.pathname);
            if (!matches) {
                return next();
            }
            var params = matches.params;
            var result = validator((0, tslib_1.__assign)((0, tslib_1.__assign)({}, input), { params: params }));
            if (result.isErr) {
                if (config.onSchemaError) {
                    var response = config.onSchemaError(result.value);
                    if (response)
                        return response;
                }
                var message = result.value.message;
                if (result.value.path) {
                    message = "path: ".concat(JSON.stringify(result.value.path), "\n").concat(message);
                }
                throw new HttpError_1.HttpError(message, 400);
            }
            return matchedPipeline.run(result.value, {
                container: container,
                onLast: function () {
                    if (config.block) {
                        throw new Error("Unhandled request: ".concat(input.pathname));
                    }
                    else {
                        return next();
                    }
                },
            });
        });
        return matchedPipeline;
    };
    var match = function (schema, options) {
        if ((0, exports.isRouterRequestSchema)(schema)) {
            var matchedPipeline = (0, farrow_pipeline_1.createPipeline)();
            var _a = createRequestSchemaValidatorAndMatcher(schema), validator = _a.validator, matcher = _a.matcher;
            return createMatchedPipeline({
                matchedPipeline: matchedPipeline,
                validator: validator,
                matcher: matcher,
                method: schema.method,
                options: options,
            });
        }
        if ((0, exports.isRouterUrlSchema)(schema)) {
            var matchedPipeline = (0, farrow_pipeline_1.createPipeline)();
            var _b = createUrlSchemaValidatorAndMatcher(schema), validator = _b.validator, matcher = _b.matcher;
            return createMatchedPipeline({
                matchedPipeline: matchedPipeline,
                validator: validator,
                matcher: matcher,
                method: schema.method,
                options: options,
            });
        }
        throw new Error("Unsupported schema: {".concat(Object.keys(schema), "}"));
    };
    var createRoutingMethod = function (method) {
        return (function (path, schema, options) {
            return match((0, tslib_1.__assign)((0, tslib_1.__assign)({}, schema), { method: method, url: path }), options);
        });
    };
    var methods = {
        get: createRoutingMethod('GET'),
        post: createRoutingMethod('POST'),
        put: createRoutingMethod('PUT'),
        head: createRoutingMethod('HEAD'),
        delete: createRoutingMethod('DELETE'),
        patch: createRoutingMethod('PATCH'),
        options: createRoutingMethod('OPTIONS'),
    };
    return (0, tslib_1.__assign)((0, tslib_1.__assign)((0, tslib_1.__assign)({}, pipeline), methods), { capture: capture, route: route, serve: serve, match: match });
};
exports.createRouterPipeline = createRouterPipeline;
exports.Router = exports.createRouterPipeline;
var getMethods = function (method) {
    var methods = ['get'];
    if (Array.isArray(method)) {
        methods = method.map(function (str) { return str.toLowerCase(); });
    }
    else if (typeof method === 'string') {
        methods = [method.toLowerCase()];
    }
    return methods;
};
var has = function (target, key) {
    return Object.prototype.hasOwnProperty.call(target, key);
};
//# sourceMappingURL=router.js.map