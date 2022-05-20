import { applyMiddleware, compose, createStore as createReduxStore } from 'redux';
import { createContext } from "./context";

const createStore = (props = {}) => {
  var _props$plugins;

  const store = {};
  const context = createContext(store); // Load all avaliable plugins

  props === null || props === void 0 ? void 0 : (_props$plugins = props.plugins) === null || _props$plugins === void 0 ? void 0 : _props$plugins.forEach(plugin => context.pluginCore.usePlugin(plugin));
  const finialProps = context.pluginCore.revokePipeline('config', props);
  const {
    initialState = {},
    middlewares,
    enhancers = []
  } = finialProps;
  Object.assign(store, createReduxStore(state => state, initialState, compose(...[middlewares ? applyMiddleware(...middlewares) : undefined, ...(enhancers || [])].filter(Boolean))));
  store.use = context.apis.useModel;
  context.pluginCore.revokeWaterFall('afterCreateStore', store);
  return store;
};

export default createStore;