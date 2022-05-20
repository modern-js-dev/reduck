import LRUCache from 'lru-cache';
import { CacheContent, CacheManagerOptions, CacheResult, CacheContext, CacheConfig } from './type';

declare class CacheManager {
  cache: LRUCache<string, CacheContent>;
  cacheOptions: CacheManagerOptions;
  constructor(cacheOptions: CacheManagerOptions);
  private md5;
  private generateRequestKey;
  private replaceValue;
  private factor;
  private queryFactor;
  private headerFactor;
  private readonly find;
  private best;
  private createCacheContent;
  get(context: CacheContext): Promise<CacheResult | null>;
  set(context: CacheContext, html: string, cacheConfig: CacheConfig, sync?: boolean): Promise<any>;
  del(context: CacheContext, cacheHash: string): Promise<void>;
}

export declare function createCache(): CacheManager;
export declare function destroyCache(): void;
export {};