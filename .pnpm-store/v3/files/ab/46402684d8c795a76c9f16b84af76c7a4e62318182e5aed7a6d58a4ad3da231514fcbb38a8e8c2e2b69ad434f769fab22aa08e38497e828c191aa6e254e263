function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import { createStore, model } from '@modern-js-reduck/store';
import plugin from '..';
var testModel = model('name').define({
  state: {
    a: 1,
    b: '1',
    c: {
      a: '1'
    }
  }
});
var store = createStore({
  plugins: [plugin]
});

var _store$use = store.use(testModel),
    _store$use2 = _slicedToArray(_store$use, 2),
    _store$use2$ = _store$use2[1],
    setA = _store$use2$.setA,
    setB = _store$use2$.setB,
    setC = _store$use2$.setC;

var expectState = function expectState(key, state) {
  expect(store.use(testModel)[0][key]).toEqual(state);
};

describe('test object auto actions', function () {
  it('setA', function () {
    setA(2);
    expectState('a', 2);
  });
  it('setB', function () {
    setB('1234');
    expectState('b', '1234');
  });
  it('setC', function () {
    setC({
      a: '666'
    });
    expectState('c', {
      a: '666'
    });
  });
});