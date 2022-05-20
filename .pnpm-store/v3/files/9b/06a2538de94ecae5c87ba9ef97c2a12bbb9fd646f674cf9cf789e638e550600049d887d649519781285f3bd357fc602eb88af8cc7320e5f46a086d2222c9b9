export declare type AnyFn = (...args: any) => any;
export declare type Hooks = {
    [key: string]: AnyFn;
};
export declare type AsyncHooks = {
    enable: () => void;
    disable: () => void;
    set: (value: Hooks) => void;
    get: () => Hooks | undefined;
    clear: () => void;
    entries: () => IterableIterator<[number, Hooks]>;
} | undefined;
export declare let asyncHooks: AsyncHooks;
export declare const impl: (implimentations: AsyncHooks) => void;
export declare const reset: () => void;
