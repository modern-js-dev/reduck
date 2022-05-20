"use strict";

var _url = _interopRequireDefault(require("url"));

var _spr = require("../spr");

var _util = require("../util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('test spr util functions', () => {
  it('should return value correctly', () => {
    expect((0, _util.connectFactor)('bar', 'foo')).toBe('bar-foo');
    expect((0, _util.fname)(1)).toBe('f1');
    expect((0, _util.namespaceHash)('modern', '!@#$%^&')).toBe('modern/!@#$%^&');
  });
  it('should create or destroy instance correctly', () => {
    const ins1 = (0, _spr.createCache)();
    const ins2 = (0, _spr.createCache)();
    expect(ins1 === ins2).toBe(true);
    (0, _spr.destroyCache)();
    const ins3 = (0, _spr.createCache)();
    expect(ins1 === ins3).toBe(false);
    expect(ins2 === ins3).toBe(false);
  });
  it('should return function correctly', () => {
    const urlParams = (() => new _url.default.URLSearchParams())();

    urlParams.set('name', 'modern');
    const getParam = (0, _util.valueFactory)(urlParams);
    expect(getParam('name')).toBe('modern');
    const headers = {
      age: '12345'
    };
    const getHeader = (0, _util.valueFactory)(headers);
    expect(getHeader('age')).toBe('12345');
  });
  it('should add target html content', () => {
    const contentNoHead = '<div>123</div>';
    const html = (0, _util.cacheAddition)(contentNoHead, Math.random().toString());
    expect(html).toBe(contentNoHead);
    const contentWithHead = '<head></head><div>123</div>';
    const hash = Math.random().toString();
    const htmlWithHead = (0, _util.cacheAddition)(contentWithHead, hash);
    expect(htmlWithHead).toBe(`<head><meta name="x-moden-spr" content="${hash}"></head><div>123</div>`);
  });
  it('should only invoke func one time', async () => {
    let index = 0;
    const fn = (0, _util.withCoalescedInvoke)(async () => new Promise(resolve => {
      setTimeout(() => {
        index += 1;
        resolve(index);
      }, 500);
    }));
    const key = 'test';
    const [res1, res2] = await Promise.all([fn(key, []), fn(key, [])]);
    expect(res1.isOrigin && res2.isOrigin).toBe(false);
    expect(res1.isOrigin || res2.isOrigin).toBe(true);
    expect(res1.value).toBe(1);
    expect(res2.value).toBe(1);
  });
  it('should invoke sync or async', async () => {
    const foo = '';
    const async = await (0, _util.maybeSync)(() => new Promise(resolve => {
      setTimeout(() => {
        resolve(foo);
      }, 100);
    }))(false);
    expect(async).toBeUndefined();
    const sync = await (0, _util.maybeSync)(() => new Promise(resolve => {
      setTimeout(() => {
        resolve(foo);
      }, 100);
    }))(true);
    expect(sync).toBe(foo);
  });
});