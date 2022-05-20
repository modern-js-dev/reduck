import { createHooks } from './hook';
const ContextSymbol = Symbol('Context');
export const isContext = (input) => {
    return Object.prototype.hasOwnProperty.call(input, ContextSymbol);
};
export const assertContext = (input) => {
    if (!isContext(input)) {
        throw new Error(`Expected Context, but received ${input}`);
    }
};
export const createContext = (value) => {
    const id = Symbol('ContextID');
    const create = (value) => {
        const use = () => {
            const container = useContainer();
            return Object.seal({
                get value() {
                    return container.read(Context);
                },
                set value(v) {
                    container.write(Context, v);
                },
            });
        };
        const get = () => {
            const container = useContainer();
            return container.read(Context);
        };
        const set = (v) => {
            const container = useContainer();
            container.write(Context, v);
        };
        const assert = () => {
            const value = get();
            if (value === null || value === undefined) {
                throw new Error(`Expected value is not null or undefined, but got: ${value}`);
            }
            return value;
        };
        const Context = {
            id,
            [ContextSymbol]: value,
            create,
            use,
            get,
            set,
            assert,
        };
        return Context;
    };
    return create(value);
};
export const ContainerSymbol = Symbol('Container');
export const isContainer = (input) => {
    return !!(input && input[ContainerSymbol]);
};
export const assertContainer = (input) => {
    if (!isContainer(input)) {
        throw new Error(`Expected Context, but received ${input}`);
    }
};
const createContextMap = (storage) => {
    const contextMap = new Map();
    const contexts = Object.values(storage);
    for (let i = 0; i < contexts.length; i++) {
        contextMap.set(contexts[i].id, contexts[i]);
    }
    return contextMap;
};
export const createContainer = (ContextStorage = {}) => {
    const contextMap = createContextMap(ContextStorage);
    const read = (context) => {
        const target = contextMap.get(context.id);
        if (target) {
            return target[ContextSymbol];
        }
        return context[ContextSymbol];
    };
    const write = (context, value) => {
        contextMap.set(context.id, context.create(value));
    };
    return Object.freeze({
        [ContainerSymbol]: true,
        read,
        write,
    });
};
const { run, hooks } = createHooks({
    useContainer: () => {
        throw new Error(`Can't call useContainer out of scope, it should be placed on top of the function`);
    },
});
export const runHooks = run;
export const { useContainer } = hooks;
export const fromContainer = (container) => ({
    useContainer: () => {
        return container;
    },
});
export const runWithContainer = (f, container) => {
    return runHooks(f, fromContainer(container));
};
//# sourceMappingURL=context.js.map