function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

import { applyMiddleware, compose, createStore as createReduxStore } from 'redux';
import { createContext } from "./context";

var createStore = function createStore() {
  var _props$plugins;

  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var store = {};
  var context = createContext(store); // Load all avaliable plugins

  props === null || props === void 0 ? void 0 : (_props$plugins = props.plugins) === null || _props$plugins === void 0 ? void 0 : _props$plugins.forEach(function (plugin) {
    return context.pluginCore.usePlugin(plugin);
  });
  var finialProps = context.pluginCore.revokePipeline('config', props);
  var _finialProps$initialS = finialProps.initialState,
      initialState = _finialProps$initialS === void 0 ? {} : _finialProps$initialS,
      middlewares = finialProps.middlewares,
      _finialProps$enhancer = finialProps.enhancers,
      enhancers = _finialProps$enhancer === void 0 ? [] : _finialProps$enhancer;
  Object.assign(store, createReduxStore(function (state) {
    return state;
  }, initialState, compose.apply(void 0, _toConsumableArray([middlewares ? applyMiddleware.apply(void 0, _toConsumableArray(middlewares)) : undefined].concat(_toConsumableArray(enhancers || [])).filter(Boolean)))));
  store.use = context.apis.useModel;
  context.pluginCore.revokeWaterFall('afterCreateStore', store);
  return store;
};

export default createStore;