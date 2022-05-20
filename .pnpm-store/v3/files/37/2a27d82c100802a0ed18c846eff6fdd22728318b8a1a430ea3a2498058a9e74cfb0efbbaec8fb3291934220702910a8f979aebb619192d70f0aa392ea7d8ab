"use strict";

var _store = require("@modern-js-reduck/store");

var _ = _interopRequireDefault(require(".."));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const count = (0, _store.model)('count').define({
  state: {
    value: 1
  },
  actions: {
    add(state) {
      state.value += 1;
    },

    pureAdd(state) {
      return _objectSpread(_objectSpread({}, state), {}, {
        value: state.value + 1
      });
    }

  }
});
describe('test immer', () => {
  const store = (0, _store.createStore)({
    plugins: [_.default]
  });
  test('mutable state state in action should work', () => {
    const [, actions, subscribe] = store.use(count);
    let stateUpdated = false;
    const unsubribe = subscribe(() => {
      expect(store.use(count)[0]).toEqual({
        value: 2
      });
      stateUpdated = true;
    });
    actions.add();
    unsubribe();
    expect(stateUpdated).toBe(true);
  });
  test('pure action should work', () => {
    const [, actions, subscribe] = store.use(count);
    let stateUpdated = false;
    const unsubribe = subscribe(() => {
      expect(store.use(count)[0]).toEqual({
        value: 3
      });
      stateUpdated = true;
    });
    actions.pureAdd();
    unsubribe();
    expect(stateUpdated).toBe(true);
  });
});