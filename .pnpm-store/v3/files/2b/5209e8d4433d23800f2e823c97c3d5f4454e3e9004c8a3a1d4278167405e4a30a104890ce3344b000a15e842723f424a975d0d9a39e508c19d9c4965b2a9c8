declare const ContextSymbol: unique symbol;
export declare type Context<T = any> = {
    id: symbol;
    [ContextSymbol]: T;
    create: (value: T) => Context<T>;
    use: () => {
        value: T;
    };
    get: () => T;
    set: (value: T) => void;
    assert: () => Exclude<T, undefined | null>;
};
export declare const isContext: (input: any) => input is Context<any>;
declare type AssertContext = (input: any) => asserts input is Context;
export declare const assertContext: AssertContext;
export declare const createContext: <T>(value: T) => Context<T>;
export declare type ContextStorage = {
    [key: string]: Context;
};
export declare const ContainerSymbol: unique symbol;
export declare type ContextSymbol = typeof ContainerSymbol;
export declare const isContainer: (input: any) => input is Container;
declare type AssertContainer = (input: any) => asserts input is Container;
export declare const assertContainer: AssertContainer;
export declare type Container = {
    [ContainerSymbol]: true;
    read: <V>(Context: Context<V>) => V;
    write: <V>(Context: Context<V>, value: V) => void;
};
export declare const createContainer: (ContextStorage?: ContextStorage) => Container;
export declare type Hooks = {
    useContainer: () => Container;
};
export declare const runHooks: <F extends import("./asyncHooksInterface").AnyFn>(f: F, implementations: Hooks) => ReturnType<F>;
export declare const useContainer: () => Container;
export declare const fromContainer: (container: Container) => Hooks;
export declare const runWithContainer: <F extends (...args: any) => any>(f: F, container: Container) => ReturnType<F>;
export {};
