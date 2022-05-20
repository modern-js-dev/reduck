import type { Entrypoint, Route } from '@modern-js/types';
export interface RuntimePlugin {
  name: string;
  options: string;
  args?: string;
}
export declare const index: ({
  mountId,
  imports,
  renderFunction,
  exportStatement
}: {
  mountId: string;
  imports: string;
  exportStatement: string;
  renderFunction: string;
}) => string;
export declare const renderFunction: ({
  plugins,
  customBootstrap,
  fileSystemRoutes
}: {
  plugins: RuntimePlugin[];
  customBootstrap?: string | false | undefined;
  fileSystemRoutes: Entrypoint['fileSystemRoutes'];
}) => string;
export declare const html: (partials: {
  top: string[];
  head: string[];
  body: string[];
}) => string;
export declare const fileSystemRoutes: ({
  routes
}: {
  routes: Route[];
}) => string;