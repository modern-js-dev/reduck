import { runtime } from "./plugin";
import { initialWrapper } from "./wrap";
import { initialRender } from "./render";
export var initialRuntime = function initialRuntime(plugins) {
  var manager = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : runtime;
  return {
    wrap: initialWrapper(plugins, manager),
    render: initialRender(plugins, manager)
  };
};