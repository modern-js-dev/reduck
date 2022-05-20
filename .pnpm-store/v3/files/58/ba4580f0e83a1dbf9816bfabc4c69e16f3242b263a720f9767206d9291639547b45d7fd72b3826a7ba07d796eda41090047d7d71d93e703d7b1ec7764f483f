"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.memoize = void 0;
function memoize(fn) {
    const memoized = function (...args) {
        const key = args[0];
        const { cache } = memoized;
        if (cache.has(key)) {
            return cache.get(key);
        }
        // eslint-disable-next-line @babel/no-invalid-this
        const res = fn.apply(this, args);
        memoized.cache.set(key, res);
        return res;
    };
    memoized.cache = new Map();
    return memoized;
}
exports.memoize = memoize;
