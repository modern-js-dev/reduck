function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import { createStore, model } from '@modern-js-reduck/store';
import plugin from '..';
var testModel = model('name').define({
  state: [1, 2, 3]
});
var store = createStore({
  plugins: [plugin]
});

var _store$use = store.use(testModel),
    _store$use2 = _slicedToArray(_store$use, 2),
    actions = _store$use2[1];

var expectState = function expectState(state) {
  expect(store.use(testModel)[0]).toEqual(state);
};

describe('test array auto actions', function () {
  test('push', function () {
    actions.push(4);
    expectState([1, 2, 3, 4]);
  });
  test('pop', function () {
    actions.pop();
    expectState([1, 2, 3]);
  });
  test('shift', function () {
    actions.shift();
    expectState([2, 3]);
  });
  test('unshift', function () {
    actions.unshift(1);
    expectState([1, 2, 3]);
  });
  test('concat', function () {
    actions.concat([4, 5]);
    expectState([1, 2, 3, 4, 5]);
  });
  test('splice', function () {
    actions.splice(0, 2);
    expectState([3, 4, 5]);
    actions.splice(0, 0, 1, 2);
    expectState([1, 2, 3, 4, 5]);
  });
  test('filter', function () {
    actions.filter(function (value) {
      return value <= 2;
    });
    expectState([1, 2]);
    actions.push(3);
    expectState([1, 2, 3]);
  });
});