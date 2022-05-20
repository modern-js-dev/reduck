import { runtime } from "./plugin";
import { initialWrapper } from "./wrap";
import { initialRender } from "./render";
export const initialRuntime = (plugins, manager = runtime) => ({
  wrap: initialWrapper(plugins, manager),
  render: initialRender(plugins, manager)
});