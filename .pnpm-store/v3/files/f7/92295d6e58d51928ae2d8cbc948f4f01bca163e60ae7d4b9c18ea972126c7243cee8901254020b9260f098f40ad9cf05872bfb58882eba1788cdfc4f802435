import { DevServer as Server } from "./server";
export { Server };
export default (options => {
  if (options == null) {
    throw new Error('can not start mserver without options');
  }

  const server = new Server(options);
  return server.init();
});