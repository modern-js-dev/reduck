import { createContext, createContainer, ContextStorage, Context, Container, assertContainer, isContext, isContainer, assertContext, useContainer, runWithContainer } from './context';
import { Next } from './counter';
export { Next };
export { createContext, createContainer, ContextStorage, Context, Container, useContainer, runWithContainer, assertContainer, isContext, isContainer, assertContext, };
export declare type Middleware<I = unknown, O = unknown> = (input: I, next: Next<I, O>) => O;
export declare type Middlewares<I = unknown, O = unknown> = Middleware<I, O>[];
export declare const isPipeline: (input: any) => input is Pipeline<unknown, unknown>;
declare const PipelineSymbol: unique symbol;
declare type PipelineSymbol = typeof PipelineSymbol;
export declare type PipelineOptions = {
    contexts?: ContextStorage;
};
export declare type RunPipelineOptions<I = unknown, O = unknown> = {
    container?: Container;
    onLast?: (input: I) => O;
    onLastWithContext?: boolean;
};
export declare type MiddlewareInput<I = unknown, O = unknown> = Middleware<I, O> | {
    middleware: Middleware<I, O>;
};
export declare type MiddlewareType<T extends MiddlewareInput> = T extends MiddlewareInput<infer I, infer O> ? Middleware<I, O> : never;
export declare const getMiddleware: <I, O>(input: MiddlewareInput<I, O>) => Middleware<I, O>;
export declare type Pipeline<I = unknown, O = unknown> = {
    [PipelineSymbol]: true;
    use: (...inputs: MiddlewareInput<I, O>[]) => Pipeline<I, O>;
    run: (input: I, options?: RunPipelineOptions<I, O>) => O;
    middleware: Middleware<I, O>;
};
export declare const createPipeline: <I, O>(options?: PipelineOptions | undefined) => Pipeline<I, O>;
export declare type PipelineInput<T extends Pipeline> = T extends Pipeline<infer I> ? I : never;
export declare type PipelineOutput<T extends Pipeline> = T extends Pipeline<any, infer O> ? O : never;
export declare const usePipeline: <I, O>(pipeline: Pipeline<I, O>) => (input: I, options?: RunPipelineOptions<I, O> | undefined) => O;
export declare type MaybeAsync<T> = T | Promise<T>;
export declare type ThunkMiddlewareInput<I, O> = () => MaybeAsync<MiddlewareInput<I, MaybeAsync<O>>>;
export declare type AsyncPipeline<I = unknown, O = unknown> = Pipeline<I, MaybeAsync<O>> & {
    useLazy: (thunk: ThunkMiddlewareInput<I, O>) => AsyncPipeline<I, O>;
};
export declare const createAsyncPipeline: <I, O>(options?: PipelineOptions | undefined) => AsyncPipeline<I, O>;
