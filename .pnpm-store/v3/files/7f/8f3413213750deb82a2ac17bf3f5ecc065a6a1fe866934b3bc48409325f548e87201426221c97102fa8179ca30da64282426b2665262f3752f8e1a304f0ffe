import { LRUCaches } from "./lru";
export async function createPageCaches(max) {
  const constructorOptions = {
    max
  };
  const cacheInstance = new LRUCaches(constructorOptions);
  await cacheInstance.init();
  return cacheInstance;
}