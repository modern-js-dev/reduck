"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHooks = void 0;
var tslib_1 = require("tslib");
var asyncHooksInterface_1 = require("./asyncHooksInterface");
var createHooks = function (defaultHooks) {
    var currentHooks = {};
    var hooks = {};
    var _loop_1 = function (key) {
        var f = (function () {
            var _a;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var hooks = currentHooks === defaultHooks ? (_a = asyncHooksInterface_1.asyncHooks === null || asyncHooksInterface_1.asyncHooks === void 0 ? void 0 : asyncHooksInterface_1.asyncHooks.get()) !== null && _a !== void 0 ? _a : defaultHooks : currentHooks;
            var handler = hooks[key];
            // tslint:disable-next-line: strict-type-predicates
            if (typeof handler !== 'function') {
                handler = defaultHooks[key];
            }
            return handler.apply(void 0, (0, tslib_1.__spreadArray)([], (0, tslib_1.__read)(args), false));
        });
        hooks[key] = f;
    };
    for (var key in defaultHooks) {
        _loop_1(key);
    }
    var run = function (f, implementations) {
        try {
            currentHooks = implementations || defaultHooks;
            asyncHooksInterface_1.asyncHooks === null || asyncHooksInterface_1.asyncHooks === void 0 ? void 0 : asyncHooksInterface_1.asyncHooks.set(currentHooks);
            return f();
        }
        finally {
            currentHooks = defaultHooks;
        }
    };
    return { run: run, hooks: hooks };
};
exports.createHooks = createHooks;
//# sourceMappingURL=hook.js.map