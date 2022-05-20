"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _redux = require("redux");

var _context = require("./context");

const createStore = (props = {}) => {
  var _props$plugins;

  const store = {};
  const context = (0, _context.createContext)(store); // Load all avaliable plugins

  props === null || props === void 0 ? void 0 : (_props$plugins = props.plugins) === null || _props$plugins === void 0 ? void 0 : _props$plugins.forEach(plugin => context.pluginCore.usePlugin(plugin));
  const finialProps = context.pluginCore.revokePipeline('config', props);
  const {
    initialState = {},
    middlewares,
    enhancers = []
  } = finialProps;
  Object.assign(store, (0, _redux.createStore)(state => state, initialState, (0, _redux.compose)(...[middlewares ? (0, _redux.applyMiddleware)(...middlewares) : undefined, ...(enhancers || [])].filter(Boolean))));
  store.use = context.apis.useModel;
  context.pluginCore.revokeWaterFall('afterCreateStore', store);
  return store;
};

var _default = createStore;
exports.default = _default;