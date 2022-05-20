function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { model, createStore } from '@modern-js-reduck/store';
import immerPlugin from '..';
var count = model('count').define({
  state: {
    value: 1
  },
  actions: {
    add: function add(state) {
      state.value += 1;
    },
    pureAdd: function pureAdd(state) {
      return _objectSpread(_objectSpread({}, state), {}, {
        value: state.value + 1
      });
    }
  }
});
describe('test immer', function () {
  var store = createStore({
    plugins: [immerPlugin]
  });
  test('mutable state state in action should work', function () {
    var _store$use = store.use(count),
        _store$use2 = _slicedToArray(_store$use, 3),
        actions = _store$use2[1],
        subscribe = _store$use2[2];

    var stateUpdated = false;
    var unsubribe = subscribe(function () {
      expect(store.use(count)[0]).toEqual({
        value: 2
      });
      stateUpdated = true;
    });
    actions.add();
    unsubribe();
    expect(stateUpdated).toBe(true);
  });
  test('pure action should work', function () {
    var _store$use3 = store.use(count),
        _store$use4 = _slicedToArray(_store$use3, 3),
        actions = _store$use4[1],
        subscribe = _store$use4[2];

    var stateUpdated = false;
    var unsubribe = subscribe(function () {
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