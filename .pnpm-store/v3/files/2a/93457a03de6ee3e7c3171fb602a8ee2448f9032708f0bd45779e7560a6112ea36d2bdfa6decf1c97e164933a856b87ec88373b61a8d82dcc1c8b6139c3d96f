"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runWithContainer = exports.fromContainer = exports.useContainer = exports.runHooks = exports.createContainer = exports.assertContainer = exports.isContainer = exports.ContainerSymbol = exports.createContext = exports.assertContext = exports.isContext = void 0;
var hook_1 = require("./hook");
var ContextSymbol = Symbol('Context');
var isContext = function (input) {
    return Object.prototype.hasOwnProperty.call(input, ContextSymbol);
};
exports.isContext = isContext;
var assertContext = function (input) {
    if (!(0, exports.isContext)(input)) {
        throw new Error("Expected Context, but received ".concat(input));
    }
};
exports.assertContext = assertContext;
var createContext = function (value) {
    var id = Symbol('ContextID');
    var create = function (value) {
        var _a;
        var use = function () {
            var container = (0, exports.useContainer)();
            return Object.seal({
                get value() {
                    return container.read(Context);
                },
                set value(v) {
                    container.write(Context, v);
                },
            });
        };
        var get = function () {
            var container = (0, exports.useContainer)();
            return container.read(Context);
        };
        var set = function (v) {
            var container = (0, exports.useContainer)();
            container.write(Context, v);
        };
        var assert = function () {
            var value = get();
            if (value === null || value === undefined) {
                throw new Error("Expected value is not null or undefined, but got: ".concat(value));
            }
            return value;
        };
        var Context = (_a = {
                id: id
            },
            _a[ContextSymbol] = value,
            _a.create = create,
            _a.use = use,
            _a.get = get,
            _a.set = set,
            _a.assert = assert,
            _a);
        return Context;
    };
    return create(value);
};
exports.createContext = createContext;
exports.ContainerSymbol = Symbol('Container');
var isContainer = function (input) {
    return !!(input && input[exports.ContainerSymbol]);
};
exports.isContainer = isContainer;
var assertContainer = function (input) {
    if (!(0, exports.isContainer)(input)) {
        throw new Error("Expected Context, but received ".concat(input));
    }
};
exports.assertContainer = assertContainer;
var createContextMap = function (storage) {
    var contextMap = new Map();
    var contexts = Object.values(storage);
    for (var i = 0; i < contexts.length; i++) {
        contextMap.set(contexts[i].id, contexts[i]);
    }
    return contextMap;
};
var createContainer = function (ContextStorage) {
    var _a;
    if (ContextStorage === void 0) { ContextStorage = {}; }
    var contextMap = createContextMap(ContextStorage);
    var read = function (context) {
        var target = contextMap.get(context.id);
        if (target) {
            return target[ContextSymbol];
        }
        return context[ContextSymbol];
    };
    var write = function (context, value) {
        contextMap.set(context.id, context.create(value));
    };
    return Object.freeze((_a = {},
        _a[exports.ContainerSymbol] = true,
        _a.read = read,
        _a.write = write,
        _a));
};
exports.createContainer = createContainer;
var _a = (0, hook_1.createHooks)({
    useContainer: function () {
        throw new Error("Can't call useContainer out of scope, it should be placed on top of the function");
    },
}), run = _a.run, hooks = _a.hooks;
exports.runHooks = run;
exports.useContainer = hooks.useContainer;
var fromContainer = function (container) { return ({
    useContainer: function () {
        return container;
    },
}); };
exports.fromContainer = fromContainer;
var runWithContainer = function (f, container) {
    return (0, exports.runHooks)(f, (0, exports.fromContainer)(container));
};
exports.runWithContainer = runWithContainer;
//# sourceMappingURL=context.js.map