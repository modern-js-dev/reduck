import { Hooks, AnyFn } from './asyncHooksInterface';
export declare const createHooks: <HS extends Hooks>(defaultHooks: HS) => {
    run: <F extends AnyFn>(f: F, implementations: HS) => ReturnType<F>;
    hooks: HS;
};
