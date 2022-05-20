"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _store = require("@modern-js-reduck/store");

var _react = require("react");

var _invariant = _interopRequireDefault(require("invariant"));

var _batchManager = require("./batchManager");

var _jsxRuntime = require("react/jsx-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const shadowEqual = (a, b) => {
  if (Object.prototype.toString.call(a) !== '[object Object]' || Object.prototype.toString.call(b) !== '[object Object]') {
    return a === b;
  }

  if (Object.keys(a).length !== Object.keys(b).length) {
    return false;
  }

  return Object.keys(a).every(key => a[key] === b[key]);
};

const createApp = config => {
  let configFromProvider = null;
  const Context = /*#__PURE__*/(0, _react.createContext)(null);

  const Provider = props => {
    const {
      children,
      store: storeFromProps,
      config: _config
    } = props;
    const store = storeFromProps || (0, _store.createStore)(_objectSpread(_objectSpread({}, config), _config));
    const batchManager = (0, _batchManager.createBatchManager)(store);
    configFromProvider = _config;
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(Context.Provider, {
      value: {
        store,
        batchManager
      },
      children: children
    });
  };

  const createUseModel = (store, batchManager) => (...args) => {
    const initialValue = (0, _react.useMemo)(() => store.use(...args), []);
    const [modelValue, setModelValue] = (0, _react.useState)(initialValue);
    const lastValueRef = (0, _react.useRef)(initialValue);
    (0, _react.useEffect)(() => {
      const unsubsribe = initialValue[2](() => {
        const newValue = store.use(...args);

        if (!shadowEqual(lastValueRef.current[0], newValue[0]) || !shadowEqual(lastValueRef.current[1], newValue[1])) {
          batchManager.pushUpdate(() => {
            setModelValue(newValue);
            lastValueRef.current = newValue;
          });
        }
      });
      batchManager.addModels(...args);
      return () => {
        unsubsribe();
        batchManager.removeModels(...args);
      };
    }, []);
    return modelValue;
  };

  const useModel = (...args) => {
    const context = (0, _react.useContext)(Context);
    (0, _invariant.default)(Boolean(context), `You should wrap your Component in CreateApp().Provider.`);
    const {
      store,
      batchManager
    } = context;
    return (0, _react.useMemo)(() => createUseModel(store, batchManager), [store])(...args);
  };

  const useStaticModel = (...args) => {
    const context = (0, _react.useContext)(Context);
    (0, _invariant.default)(Boolean(context), 'You should wrap your Component in CreateApp().Provider.');
    const {
      store
    } = context;
    const [state, actions, subscribe] = (0, _react.useMemo)(() => store.use(...args), []);
    const value = (0, _react.useRef)([// deep clone state in case mutate origin state accidentlly.
    JSON.parse(JSON.stringify(state)), actions, subscribe]);
    (0, _react.useEffect)(() => {
      if (Object.prototype.toString.call(state) === '[object Object]') {
        return subscribe(() => {
          const [newState, newActions] = store.use(...args); // merge data to old reference

          Object.assign(value.current[0], newState);
          Object.assign(value.current[1], newActions);
        });
      }

      return () => {// do nothing
        // forbid eslint error
      };
    }, []);
    return value.current;
  };

  const useLocalModel = (...args) => {
    const [store, batchManager] = (0, _react.useMemo)(() => {
      const finalConfig = configFromProvider || config;
      const localStoreConfig = {
        enhanders: (finalConfig === null || finalConfig === void 0 ? void 0 : finalConfig.enhancers) || [],
        middlewares: (finalConfig === null || finalConfig === void 0 ? void 0 : finalConfig.middlewares) || [],
        plugins: finalConfig === null || finalConfig === void 0 ? void 0 : finalConfig.plugins
      };
      const reuckStore = (0, _store.createStore)(localStoreConfig);
      return [reuckStore, (0, _batchManager.createBatchManager)(reuckStore)];
    }, []);
    return (0, _react.useMemo)(() => createUseModel(store, batchManager), [])(...args);
  };

  return {
    Provider,
    useModel,
    useStaticModel,
    useLocalModel
  };
};

var _default = createApp;
exports.default = _default;