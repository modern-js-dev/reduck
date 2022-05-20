import _toConsumableArray from "@babel/runtime/helpers/toConsumableArray";
import _typeof from "@babel/runtime/helpers/typeof";
import assign from './utils/assign';
import { compose } from 'redux';

function enhancer(options) {
  var config = options || {};
  config.features = {
    pause: true,
    export: true,
    test: true
  };
  config.type = 'redux';
  if (config.autoPause === undefined) config.autoPause = true;
  if (config.latency === undefined) config.latency = 500;
  return function (createStore) {
    return function (reducer, preloadedState) {
      var store = createStore(reducer, preloadedState);
      var origDispatch = store.dispatch;

      var devTools = window.__REDUX_DEVTOOLS_EXTENSION__.connect(config);

      devTools.init(store.getState());

      var dispatch = function dispatch(action) {
        var r = origDispatch(action);
        devTools.send(action, store.getState());
        return r;
      };

      if (Object.assign) return Object.assign(store, {
        dispatch: dispatch
      });
      return assign(store, 'dispatch', dispatch);
    };
  };
}

function composeWithEnhancer(config) {
  return function () {
    return compose(compose.apply(void 0, arguments), enhancer(config));
  };
}

export function composeWithDevTools() {
  for (var _len = arguments.length, funcs = new Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  if (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__) {
    if (funcs.length === 0) return enhancer();
    if (_typeof(funcs[0]) === 'object') return composeWithEnhancer(funcs[0]);
    return composeWithEnhancer().apply(void 0, _toConsumableArray(funcs));
  }

  if (funcs.length === 0) return undefined;
  if (_typeof(funcs[0]) === 'object') return compose;
  return compose.apply(void 0, _toConsumableArray(funcs));
}
export var devToolsEnhancer = typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__ ? enhancer : function () {
  return function (noop) {
    return noop;
  };
};