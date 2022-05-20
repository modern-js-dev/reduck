"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createPageCaches = createPageCaches;

var _lru = require("./lru");

async function createPageCaches(max) {
  const constructorOptions = {
    max
  };
  const cacheInstance = new _lru.LRUCaches(constructorOptions);
  await cacheInstance.init();
  return cacheInstance;
}