function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import { createStore, model } from '@modern-js-reduck/store';
import plugin from '..';
var testModel = model('name').define({
  state: 0
});
var testModel1 = model('name1').define({
  state: 0,
  actions: {
    setState: function setState(_state, payload) {
      return payload + 1;
    }
  }
});
var store = createStore({
  plugins: [plugin]
});
describe('test primitive auto actions', function () {
  it('state is a number, setState action should work', function () {
    var _store$use = store.use(testModel),
        _store$use2 = _slicedToArray(_store$use, 2),
        actions = _store$use2[1];

    actions.setState(2);
    expect(store.use(testModel)[0]).toBe(2);
  });
  it("user's action priority is higher than auto actions", function () {
    var _store$use3 = store.use(testModel1),
        _store$use4 = _slicedToArray(_store$use3, 2),
        actions = _store$use4[1];

    actions.setState(2);
    expect(store.use(testModel1)[0]).toBe(3);
  });
});