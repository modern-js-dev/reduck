import { Middleware } from './pipeline';
export declare type MiddlewareReturnType<T> = void | undefined | T | Promise<T | void | undefined>;
export declare type KoaMiddleware<T, U = void> = Middleware<T, MiddlewareReturnType<U>>;
export declare const compose: <T, U>(middlewares: KoaMiddleware<T, U>[]) => (context: T, next?: KoaMiddleware<T, U> | undefined) => MiddlewareReturnType<U>;
