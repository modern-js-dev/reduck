function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { createCache, destroyCache } from "../spr";
import { errorConfiguration } from "./error-configuration";
import { cacheabelAry } from "./cacheable";
import { matchedCacheableAry } from "./matched-cache";

const createCacheConfig = (config = {}) => _objectSpread({
  excludes: null,
  includes: null,
  interval: 10,
  staleLimit: false,
  level: 0,
  fallback: false,
  matches: null
}, config);

jest.setTimeout(60000);
describe('cache', () => {
  it('should cache correctly', async () => {
    destroyCache();
    const cache = createCache();
    const context = {
      entry: '',
      pathname: '',
      query: {},
      headers: {}
    };
    const content = 'hello';
    const cacheConfig = createCacheConfig();
    await cache.set(context, content, cacheConfig, true);
    const cacheResult = await cache.get(context);
    expect(cacheResult).not.toBe(null);
    expect(cacheResult === null || cacheResult === void 0 ? void 0 : cacheResult.content).toBe('hello');
  });
  it('should ignore cache set when cache config not exist', async () => {
    destroyCache();
    destroyCache();
    const cache = createCache();
    const context = {
      entry: '',
      pathname: '',
      query: {},
      headers: {}
    };
    const content = 'hello';
    const shouldCache = await cache.set(context, content, null, true);
    expect(shouldCache).toBe(false);
  });
  it('should calcual cache key error', async () => {
    destroyCache();
    const cache = createCache();
    const content = 'hello';

    for (const config of errorConfiguration) {
      const cacheConfig = createCacheConfig(config);
      const tmpEntry = Math.random().toString();
      const context = {
        entry: tmpEntry,
        pathname: '',
        query: {},
        headers: {}
      };
      const shouldCache = await cache.set(context, content, cacheConfig);
      expect(shouldCache).toBe(false);
    }
  });
  it('should get nothing for diff requestKey', async () => {
    destroyCache();
    const cache = createCache();
    const context = {
      entry: '',
      pathname: '',
      query: {},
      headers: {}
    };
    const content = 'hello';
    const cacheConfig = createCacheConfig({
      level: 1,
      includes: {
        query: ['name']
      }
    });
    await cache.set(context, content, cacheConfig, true);
    const context_req = {
      entry: '',
      pathname: '/home',
      query: {},
      headers: {}
    };
    const cacheResult = await cache.get(context_req);
    expect(cacheResult).toBe(null);
  });
  it('should get nothing for diff cacheHash', async () => {
    destroyCache();
    const cache = createCache();
    const context = {
      entry: '',
      pathname: '',
      query: {},
      headers: {}
    };
    const content = 'hello';
    const cacheConfig = createCacheConfig({
      level: 1,
      includes: {
        query: ['name']
      }
    });
    await cache.set(context, content, cacheConfig, true);
    const context_req = {
      entry: '',
      pathname: '',
      query: {
        name: 'zll'
      },
      headers: {}
    };
    const cacheResult = await cache.get(context_req);
    expect(cacheResult).toBe(null);
  });
  it('should get cache correctly', async () => {
    destroyCache();
    const cache = createCache();

    for (const cacheable of cacheabelAry) {
      const context = {
        entry: '',
        pathname: cacheable.requestOpt.url,
        query: cacheable.requestOpt.query || {},
        headers: cacheable.requestOpt.headers || {}
      };
      const cacheConfig = createCacheConfig(cacheable.cacheConfig || {});
      await cache.set(context, cacheable.content, cacheConfig, true);
      const cacheResult = await cache.get(context);
      expect(cacheResult === null || cacheResult === void 0 ? void 0 : cacheResult.content).toBe(cacheable.content);
    }
  });
  it('should match cache correctly', async () => {
    destroyCache();
    const cache = createCache();

    for (const cacheable of matchedCacheableAry) {
      const [baseCacheable, matchOne, ...other] = cacheable;
      const {
        requestOpt = {},
        cacheConfig,
        content
      } = baseCacheable;
      const context = {
        entry: '',
        pathname: requestOpt.url,
        query: requestOpt.query,
        headers: requestOpt.headers
      };
      await cache.set(context, content, createCacheConfig(cacheConfig), true);
      const matchContext = {
        entry: '',
        pathname: matchOne.url,
        query: matchOne.query,
        headers: matchOne.headers
      };
      const cacheResult = await cache.get(matchContext);
      expect(cacheResult === null || cacheResult === void 0 ? void 0 : cacheResult.content).toBe(content);

      for (const notMatch of other) {
        const notMatchContext = {
          entry: '',
          pathname: notMatch.url,
          query: notMatch.query,
          headers: notMatch.headers
        };
        const nothing = await cache.get(notMatchContext);
        expect(nothing).toBe(null);
      }
    }
  });
  it('should stale cache correctly', async () => {
    destroyCache();
    const cache = createCache();
    const context = {
      entry: '',
      pathname: '',
      query: {},
      headers: {}
    };
    const config = createCacheConfig({
      interval: 5
    });
    const content = 'hello';
    const shouldCache = await cache.set(context, content, config, true);
    expect(shouldCache.value).toBe(true);
    const freshResult = await cache.get(context);
    expect(freshResult === null || freshResult === void 0 ? void 0 : freshResult.isStale).toBe(false);
    await new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 6000);
    });
    const staleResult = await cache.get(context);
    expect(staleResult === null || staleResult === void 0 ? void 0 : staleResult.isStale).toBe(true);
  });
  it('should garbage cache correctly', async () => {
    destroyCache();
    const cache = createCache();
    const context = {
      entry: '',
      pathname: '',
      query: {},
      headers: {}
    };
    const config = createCacheConfig({
      interval: 3,
      staleLimit: 8
    });
    const content = 'hello';
    const shouldCache = await cache.set(context, content, config, true);
    expect(shouldCache.value).toBe(true);
    const freshResult = await cache.get(context);
    expect(freshResult === null || freshResult === void 0 ? void 0 : freshResult.isGarbage).toBe(false);
    await new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 10000);
    });
    const staleResult = await cache.get(context);
    expect(staleResult === null || staleResult === void 0 ? void 0 : staleResult.isGarbage).toBe(true);
  });
});