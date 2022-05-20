import { RouteMatchManager, RouteMatcher } from '../route';

declare class RouteAPI {
  private readonly router;
  private current;
  private readonly url;
  constructor(matched: RouteMatcher, router: RouteMatchManager, url: string);
  cur(): import("../route").ModernRoute;
  get(entryName: string): import("../route").ModernRoute | null;
  use(entryName: string): boolean;
}

export declare const createRouteAPI: (matched: RouteMatcher, router: RouteMatchManager, url: string) => RouteAPI;
export {};