import { createContext, createContainer, assertContainer, isContext, isContainer, assertContext, fromContainer, runHooks, useContainer, runWithContainer, } from './context';
import { createCounter } from './counter';
export { createContext, createContainer, useContainer, runWithContainer, assertContainer, isContext, isContainer, assertContext, };
export const isPipeline = (input) => {
    return !!(input && input[PipelineSymbol]);
};
const PipelineSymbol = Symbol('pipeline');
export const getMiddleware = (input) => {
    if (typeof input === 'function') {
        return input;
    }
    else if (input && typeof input.middleware === 'function') {
        return input.middleware;
    }
    throw new Error(`${input} is not a Middleware or { middleware: Middleware }`);
};
export const createPipeline = (options) => {
    const config = {
        ...options,
    };
    const middlewares = [];
    const use = (...inputs) => {
        middlewares.push(...inputs.map(getMiddleware));
        return pipeline;
    };
    const createCurrentCounter = (hooks, onLast, onLastWithContext) => {
        return createCounter((index, input, next) => {
            if (index >= middlewares.length) {
                if (onLast) {
                    if (onLastWithContext) {
                        return runHooks(() => onLast(input), hooks);
                    }
                    return onLast(input);
                }
                throw new Error(`Expect returning a value, but all middlewares just calling next()`);
            }
            return runHooks(() => middlewares[index](input, next), hooks);
        });
    };
    const currentContainer = createContainer(config.contexts);
    const currentHooks = fromContainer(currentContainer);
    const currentCounter = createCurrentCounter(currentHooks);
    const getCounter = (options) => {
        if (!options)
            return currentCounter;
        if (options === null || options === void 0 ? void 0 : options.container) {
            const hooks = fromContainer(options === null || options === void 0 ? void 0 : options.container);
            return (options === null || options === void 0 ? void 0 : options.onLast)
                ? createCurrentCounter(hooks, options.onLast, typeof options.onLastWithContext === 'boolean' ? options.onLastWithContext : true)
                : createCurrentCounter(hooks);
        }
        return (options === null || options === void 0 ? void 0 : options.onLast)
            ? createCurrentCounter(currentHooks, options.onLast, typeof options.onLastWithContext === 'boolean' ? options.onLastWithContext : true)
            : createCurrentCounter(currentHooks);
    };
    const run = (input, options) => {
        return getCounter(options).start(input);
    };
    const middleware = (input, next) => {
        const container = useContainer();
        return run(input, {
            container,
            onLast: next,
        });
    };
    const pipeline = {
        [PipelineSymbol]: true,
        use,
        run,
        middleware,
    };
    return pipeline;
};
export const usePipeline = (pipeline) => {
    const container = useContainer();
    return (input, options) => {
        return pipeline.run(input, { ...options, container });
    };
};
export const createAsyncPipeline = (options) => {
    const pipeline = createPipeline(options);
    const useLazy = (thunk) => {
        let middleware = null;
        let promise = null;
        pipeline.use((input, next) => {
            if (middleware)
                return next(input);
            if (!promise) {
                promise = Promise.resolve(thunk()).then((result) => {
                    middleware = getMiddleware(result);
                });
            }
            return promise.then(() => next(input));
        });
        pipeline.use((input, next) => {
            if (!middleware)
                throw new Error(`pipeline.useLazy failed to load middleware`);
            return middleware(input, next);
        });
        return asyncPipeline;
    };
    const asyncPipeline = {
        ...pipeline,
        useLazy,
    };
    return asyncPipeline;
};
//# sourceMappingURL=pipeline.js.map