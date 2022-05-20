import NodeAsyncHooks from 'async_hooks';
import * as asyncHooksInterface from '../asyncHooksInterface';
const createAsyncHooks = () => {
    const store = new Map();
    const hooks = NodeAsyncHooks.createHook({
        init: (asyncId, _, triggerAsyncId) => {
            if (store.has(triggerAsyncId)) {
                const value = store.get(triggerAsyncId);
                if (value) {
                    store.set(asyncId, value);
                }
            }
        },
        destroy: (asyncId) => {
            if (store.has(asyncId)) {
                store.delete(asyncId);
            }
        },
    });
    const set = (value) => {
        store.set(NodeAsyncHooks.executionAsyncId(), value);
    };
    const get = () => {
        return store.get(NodeAsyncHooks.executionAsyncId());
    };
    const clear = () => {
        store.clear();
    };
    const enable = () => {
        hooks.enable();
    };
    const disable = () => {
        hooks.disable();
        store.clear();
    };
    const entries = () => {
        return store.entries();
    };
    return {
        enable,
        disable,
        set,
        get,
        clear,
        entries,
    };
};
export const enable = () => {
    const hooks = createAsyncHooks();
    disable();
    asyncHooksInterface.impl(hooks);
    hooks.enable();
};
export const disable = () => {
    var _a;
    (_a = asyncHooksInterface.asyncHooks) === null || _a === void 0 ? void 0 : _a.disable();
    asyncHooksInterface.reset();
};
//# sourceMappingURL=node.js.map