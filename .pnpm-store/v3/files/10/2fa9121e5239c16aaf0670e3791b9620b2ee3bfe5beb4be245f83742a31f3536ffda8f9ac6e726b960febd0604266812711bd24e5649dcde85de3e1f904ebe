function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { createStore } from '@modern-js-reduck/store';
import { createContext, useContext, useEffect, useState, useMemo, useRef } from 'react';
import invariant from 'invariant';
import { createBatchManager } from "./batchManager";
import { jsx as _jsx } from "react/jsx-runtime";

var shadowEqual = function shadowEqual(a, b) {
  if (Object.prototype.toString.call(a) !== '[object Object]' || Object.prototype.toString.call(b) !== '[object Object]') {
    return a === b;
  }

  if (Object.keys(a).length !== Object.keys(b).length) {
    return false;
  }

  return Object.keys(a).every(function (key) {
    return a[key] === b[key];
  });
};

var createApp = function createApp(config) {
  var configFromProvider = null;
  var Context = /*#__PURE__*/createContext(null);

  var Provider = function Provider(props) {
    var children = props.children,
        storeFromProps = props.store,
        _config = props.config;
    var store = storeFromProps || createStore(_objectSpread(_objectSpread({}, config), _config));
    var batchManager = createBatchManager(store);
    configFromProvider = _config;
    return /*#__PURE__*/_jsx(Context.Provider, {
      value: {
        store: store,
        batchManager: batchManager
      },
      children: children
    });
  };

  var createUseModel = function createUseModel(store, batchManager) {
    return function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var initialValue = useMemo(function () {
        return store.use.apply(store, args);
      }, []);

      var _useState = useState(initialValue),
          _useState2 = _slicedToArray(_useState, 2),
          modelValue = _useState2[0],
          setModelValue = _useState2[1];

      var lastValueRef = useRef(initialValue);
      useEffect(function () {
        var unsubsribe = initialValue[2](function () {
          var newValue = store.use.apply(store, args);

          if (!shadowEqual(lastValueRef.current[0], newValue[0]) || !shadowEqual(lastValueRef.current[1], newValue[1])) {
            batchManager.pushUpdate(function () {
              setModelValue(newValue);
              lastValueRef.current = newValue;
            });
          }
        });
        batchManager.addModels.apply(batchManager, args);
        return function () {
          unsubsribe();
          batchManager.removeModels.apply(batchManager, args);
        };
      }, []);
      return modelValue;
    };
  };

  var useModel = function useModel() {
    var context = useContext(Context);
    invariant(Boolean(context), "You should wrap your Component in CreateApp().Provider.");
    var store = context.store,
        batchManager = context.batchManager;
    return useMemo(function () {
      return createUseModel(store, batchManager);
    }, [store]).apply(void 0, arguments);
  };

  var useStaticModel = function useStaticModel() {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    var context = useContext(Context);
    invariant(Boolean(context), 'You should wrap your Component in CreateApp().Provider.');
    var store = context.store;

    var _useMemo = useMemo(function () {
      return store.use.apply(store, args);
    }, []),
        _useMemo2 = _slicedToArray(_useMemo, 3),
        state = _useMemo2[0],
        actions = _useMemo2[1],
        subscribe = _useMemo2[2];

    var value = useRef([// deep clone state in case mutate origin state accidentlly.
    JSON.parse(JSON.stringify(state)), actions, subscribe]);
    useEffect(function () {
      if (Object.prototype.toString.call(state) === '[object Object]') {
        return subscribe(function () {
          var _store$use = store.use.apply(store, args),
              _store$use2 = _slicedToArray(_store$use, 2),
              newState = _store$use2[0],
              newActions = _store$use2[1]; // merge data to old reference


          Object.assign(value.current[0], newState);
          Object.assign(value.current[1], newActions);
        });
      }

      return function () {// do nothing
        // forbid eslint error
      };
    }, []);
    return value.current;
  };

  var useLocalModel = function useLocalModel() {
    var _useMemo3 = useMemo(function () {
      var finalConfig = configFromProvider || config;
      var localStoreConfig = {
        enhanders: (finalConfig === null || finalConfig === void 0 ? void 0 : finalConfig.enhancers) || [],
        middlewares: (finalConfig === null || finalConfig === void 0 ? void 0 : finalConfig.middlewares) || [],
        plugins: finalConfig === null || finalConfig === void 0 ? void 0 : finalConfig.plugins
      };
      var reuckStore = createStore(localStoreConfig);
      return [reuckStore, createBatchManager(reuckStore)];
    }, []),
        _useMemo4 = _slicedToArray(_useMemo3, 2),
        store = _useMemo4[0],
        batchManager = _useMemo4[1];

    return useMemo(function () {
      return createUseModel(store, batchManager);
    }, []).apply(void 0, arguments);
  };

  return {
    Provider: Provider,
    useModel: useModel,
    useStaticModel: useStaticModel,
    useLocalModel: useLocalModel
  };
};

export default createApp;