import { Server } from '@modern-js/prod-server';
import { ModernDevServer } from "./dev-server";
import { ModernAPIDevServer, ModernSSRDevServer } from "./dev-server-split";

const createDevServer = options => {
  if (options.apiOnly) {
    return new ModernAPIDevServer(options);
  } else if (options.ssrOnly) {
    return new ModernSSRDevServer(options);
  } else {
    return new ModernDevServer(options);
  }
};

export class DevServer extends Server {
  constructor(options) {
    super(options);

    if (options.dev) {
      this.serverImpl = createDevServer;
    }
  }

}