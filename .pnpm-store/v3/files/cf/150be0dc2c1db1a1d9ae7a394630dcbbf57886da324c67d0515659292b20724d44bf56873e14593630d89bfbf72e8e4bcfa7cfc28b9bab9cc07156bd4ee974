"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compose = void 0;
var tslib_1 = require("tslib");
var pipeline_1 = require("./pipeline");
var compose = function (middlewares) {
    var e_1, _a;
    if (!Array.isArray(middlewares)) {
        throw new TypeError('Middleware stack must be an array!');
    }
    try {
        for (var middlewares_1 = (0, tslib_1.__values)(middlewares), middlewares_1_1 = middlewares_1.next(); !middlewares_1_1.done; middlewares_1_1 = middlewares_1.next()) {
            var fn = middlewares_1_1.value;
            if (typeof fn !== 'function') {
                throw new TypeError('Middleware must be composed of functions!');
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (middlewares_1_1 && !middlewares_1_1.done && (_a = middlewares_1.return)) _a.call(middlewares_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return function (context, next) {
        var pipeline = (0, pipeline_1.createPipeline)();
        pipeline.use.apply(pipeline, (0, tslib_1.__spreadArray)([], (0, tslib_1.__read)(middlewares.map(toKoaMiddleware)), false));
        if (next)
            pipeline.use(next);
        return pipeline.run(context, {
            onLast: function () { return (0, tslib_1.__awaiter)(void 0, void 0, void 0, function () { return (0, tslib_1.__generator)(this, function (_a) {
                return [2 /*return*/];
            }); }); },
        });
    };
};
exports.compose = compose;
var toKoaMiddleware = function (middleware) {
    return function (context, next) {
        var count = 0;
        return middleware(context, function (context) { return (0, tslib_1.__awaiter)(void 0, void 0, void 0, function () {
            return (0, tslib_1.__generator)(this, function (_a) {
                if (count++ > 0)
                    throw new Error('next() called multiple times');
                return [2 /*return*/, next(context)];
            });
        }); });
    };
};
//# sourceMappingURL=compose.js.map