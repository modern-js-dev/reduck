import { createPipeline } from './pipeline';
export const compose = (middlewares) => {
    if (!Array.isArray(middlewares)) {
        throw new TypeError('Middleware stack must be an array!');
    }
    for (const fn of middlewares) {
        if (typeof fn !== 'function') {
            throw new TypeError('Middleware must be composed of functions!');
        }
    }
    return (context, next) => {
        const pipeline = createPipeline();
        pipeline.use(...middlewares.map(toKoaMiddleware));
        if (next)
            pipeline.use(next);
        return pipeline.run(context, {
            onLast: async () => { },
        });
    };
};
const toKoaMiddleware = (middleware) => {
    return (context, next) => {
        let count = 0;
        return middleware(context, async (context) => {
            if (count++ > 0)
                throw new Error('next() called multiple times');
            return next(context);
        });
    };
};
//# sourceMappingURL=compose.js.map