import { asyncHooks } from './asyncHooksInterface';
export const createHooks = (defaultHooks) => {
    let currentHooks = {};
    const hooks = {};
    for (const key in defaultHooks) {
        const f = ((...args) => {
            var _a;
            const hooks = currentHooks === defaultHooks ? (_a = asyncHooks === null || asyncHooks === void 0 ? void 0 : asyncHooks.get()) !== null && _a !== void 0 ? _a : defaultHooks : currentHooks;
            let handler = hooks[key];
            // tslint:disable-next-line: strict-type-predicates
            if (typeof handler !== 'function') {
                handler = defaultHooks[key];
            }
            return handler(...args);
        });
        hooks[key] = f;
    }
    const run = (f, implementations) => {
        try {
            currentHooks = implementations || defaultHooks;
            asyncHooks === null || asyncHooks === void 0 ? void 0 : asyncHooks.set(currentHooks);
            return f();
        }
        finally {
            currentHooks = defaultHooks;
        }
    };
    return { run, hooks };
};
//# sourceMappingURL=hook.js.map