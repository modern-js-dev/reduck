"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.disable = exports.enable = void 0;
var tslib_1 = require("tslib");
var async_hooks_1 = (0, tslib_1.__importDefault)(require("async_hooks"));
var asyncHooksInterface = (0, tslib_1.__importStar)(require("../asyncHooksInterface"));
var createAsyncHooks = function () {
    var store = new Map();
    var hooks = async_hooks_1.default.createHook({
        init: function (asyncId, _, triggerAsyncId) {
            if (store.has(triggerAsyncId)) {
                var value = store.get(triggerAsyncId);
                if (value) {
                    store.set(asyncId, value);
                }
            }
        },
        destroy: function (asyncId) {
            if (store.has(asyncId)) {
                store.delete(asyncId);
            }
        },
    });
    var set = function (value) {
        store.set(async_hooks_1.default.executionAsyncId(), value);
    };
    var get = function () {
        return store.get(async_hooks_1.default.executionAsyncId());
    };
    var clear = function () {
        store.clear();
    };
    var enable = function () {
        hooks.enable();
    };
    var disable = function () {
        hooks.disable();
        store.clear();
    };
    var entries = function () {
        return store.entries();
    };
    return {
        enable: enable,
        disable: disable,
        set: set,
        get: get,
        clear: clear,
        entries: entries,
    };
};
var enable = function () {
    var hooks = createAsyncHooks();
    (0, exports.disable)();
    asyncHooksInterface.impl(hooks);
    hooks.enable();
};
exports.enable = enable;
var disable = function () {
    var _a;
    (_a = asyncHooksInterface.asyncHooks) === null || _a === void 0 ? void 0 : _a.disable();
    asyncHooksInterface.reset();
};
exports.disable = disable;
//# sourceMappingURL=node.js.map