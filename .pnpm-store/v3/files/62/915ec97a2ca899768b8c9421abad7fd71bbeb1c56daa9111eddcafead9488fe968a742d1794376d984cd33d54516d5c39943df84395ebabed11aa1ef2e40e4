import { Server } from "./server";
export { Server };
export { ModernServer } from "./server/modern-server";
export { createProxyHandler } from "./libs/proxy";
export * from "./type";
export * from "./constants";
export default (options => {
  if (options == null) {
    throw new Error('can not start mserver without options');
  }

  const server = new Server(options);
  return server.init();
});