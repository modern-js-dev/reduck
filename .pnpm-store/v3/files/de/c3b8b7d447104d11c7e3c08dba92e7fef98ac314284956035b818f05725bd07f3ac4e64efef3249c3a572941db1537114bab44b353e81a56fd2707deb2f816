import LRU from 'lru-cache';
import { PageCache, PageCachesInterface } from '../type';
export declare class LRUCaches implements PageCachesInterface {
  caches: LRU<string, PageCache>;
  private readonly max;
  constructor(options: {
    max: number;
  });
  init(): Promise<void>;
  keys(): string[];
  get(key: string): Promise<PageCache | null>;
  peek(key: string): PageCache | null;
  set(key: string, cache: PageCache): Promise<void>;
  del(key: string): void;
}