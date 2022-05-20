import { RouteMatcher } from './matcher';
import { ModernRoute, ModernRouteInterface } from './route';
export declare class RouteMatchManager {
  matchers: RouteMatcher[];
  private specs;
  constructor();
  private filter;
  private best;
  reset(specs: ModernRouteInterface[]): void;
  match(pathname: string): RouteMatcher | undefined;
  matchEntry(entryname: string): RouteMatcher | undefined;
  getBundles(): (string | undefined)[];
}
export type { ModernRouteInterface, ModernRoute };
export { RouteMatcher };