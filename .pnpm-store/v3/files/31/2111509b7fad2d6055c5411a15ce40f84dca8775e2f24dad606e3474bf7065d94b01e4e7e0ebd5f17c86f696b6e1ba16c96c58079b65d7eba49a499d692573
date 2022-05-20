"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAsyncPipeline = exports.usePipeline = exports.createPipeline = exports.getMiddleware = exports.isPipeline = exports.assertContext = exports.isContainer = exports.isContext = exports.assertContainer = exports.runWithContainer = exports.useContainer = exports.createContainer = exports.createContext = void 0;
var tslib_1 = require("tslib");
var context_1 = require("./context");
Object.defineProperty(exports, "createContext", { enumerable: true, get: function () { return context_1.createContext; } });
Object.defineProperty(exports, "createContainer", { enumerable: true, get: function () { return context_1.createContainer; } });
Object.defineProperty(exports, "assertContainer", { enumerable: true, get: function () { return context_1.assertContainer; } });
Object.defineProperty(exports, "isContext", { enumerable: true, get: function () { return context_1.isContext; } });
Object.defineProperty(exports, "isContainer", { enumerable: true, get: function () { return context_1.isContainer; } });
Object.defineProperty(exports, "assertContext", { enumerable: true, get: function () { return context_1.assertContext; } });
Object.defineProperty(exports, "useContainer", { enumerable: true, get: function () { return context_1.useContainer; } });
Object.defineProperty(exports, "runWithContainer", { enumerable: true, get: function () { return context_1.runWithContainer; } });
var counter_1 = require("./counter");
var isPipeline = function (input) {
    return !!(input && input[PipelineSymbol]);
};
exports.isPipeline = isPipeline;
var PipelineSymbol = Symbol('pipeline');
var getMiddleware = function (input) {
    if (typeof input === 'function') {
        return input;
    }
    else if (input && typeof input.middleware === 'function') {
        return input.middleware;
    }
    throw new Error("".concat(input, " is not a Middleware or { middleware: Middleware }"));
};
exports.getMiddleware = getMiddleware;
var createPipeline = function (options) {
    var _a;
    var config = (0, tslib_1.__assign)({}, options);
    var middlewares = [];
    var use = function () {
        var inputs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            inputs[_i] = arguments[_i];
        }
        middlewares.push.apply(middlewares, (0, tslib_1.__spreadArray)([], (0, tslib_1.__read)(inputs.map(exports.getMiddleware)), false));
        return pipeline;
    };
    var createCurrentCounter = function (hooks, onLast, onLastWithContext) {
        return (0, counter_1.createCounter)(function (index, input, next) {
            if (index >= middlewares.length) {
                if (onLast) {
                    if (onLastWithContext) {
                        return (0, context_1.runHooks)(function () { return onLast(input); }, hooks);
                    }
                    return onLast(input);
                }
                throw new Error("Expect returning a value, but all middlewares just calling next()");
            }
            return (0, context_1.runHooks)(function () { return middlewares[index](input, next); }, hooks);
        });
    };
    var currentContainer = (0, context_1.createContainer)(config.contexts);
    var currentHooks = (0, context_1.fromContainer)(currentContainer);
    var currentCounter = createCurrentCounter(currentHooks);
    var getCounter = function (options) {
        if (!options)
            return currentCounter;
        if (options === null || options === void 0 ? void 0 : options.container) {
            var hooks = (0, context_1.fromContainer)(options === null || options === void 0 ? void 0 : options.container);
            return (options === null || options === void 0 ? void 0 : options.onLast)
                ? createCurrentCounter(hooks, options.onLast, typeof options.onLastWithContext === 'boolean' ? options.onLastWithContext : true)
                : createCurrentCounter(hooks);
        }
        return (options === null || options === void 0 ? void 0 : options.onLast)
            ? createCurrentCounter(currentHooks, options.onLast, typeof options.onLastWithContext === 'boolean' ? options.onLastWithContext : true)
            : createCurrentCounter(currentHooks);
    };
    var run = function (input, options) {
        return getCounter(options).start(input);
    };
    var middleware = function (input, next) {
        var container = (0, context_1.useContainer)();
        return run(input, {
            container: container,
            onLast: next,
        });
    };
    var pipeline = (_a = {},
        _a[PipelineSymbol] = true,
        _a.use = use,
        _a.run = run,
        _a.middleware = middleware,
        _a);
    return pipeline;
};
exports.createPipeline = createPipeline;
var usePipeline = function (pipeline) {
    var container = (0, context_1.useContainer)();
    return function (input, options) {
        return pipeline.run(input, (0, tslib_1.__assign)((0, tslib_1.__assign)({}, options), { container: container }));
    };
};
exports.usePipeline = usePipeline;
var createAsyncPipeline = function (options) {
    var pipeline = (0, exports.createPipeline)(options);
    var useLazy = function (thunk) {
        var middleware = null;
        var promise = null;
        pipeline.use(function (input, next) {
            if (middleware)
                return next(input);
            if (!promise) {
                promise = Promise.resolve(thunk()).then(function (result) {
                    middleware = (0, exports.getMiddleware)(result);
                });
            }
            return promise.then(function () { return next(input); });
        });
        pipeline.use(function (input, next) {
            if (!middleware)
                throw new Error("pipeline.useLazy failed to load middleware");
            return middleware(input, next);
        });
        return asyncPipeline;
    };
    var asyncPipeline = (0, tslib_1.__assign)((0, tslib_1.__assign)({}, pipeline), { useLazy: useLazy });
    return asyncPipeline;
};
exports.createAsyncPipeline = createAsyncPipeline;
//# sourceMappingURL=pipeline.js.map