import { MatchFunction } from 'path-to-regexp';
import { ModernRoute, ModernRouteInterface } from './route';
export declare class RouteMatcher {
  spec: ModernRouteInterface;
  urlPath: string;
  urlMatcher?: MatchFunction;
  urlReg?: RegExp;
  constructor(spec: ModernRouteInterface);
  generate(url: string): ModernRoute;
  parseURLParams(pathname: string): Record<string, string>;
  matchLength(pathname: string): number | null;
  matchUrlPath(requestUrl: string): boolean;
  matchEntry(entryName: string): boolean;
  private setupUrlPath;
}