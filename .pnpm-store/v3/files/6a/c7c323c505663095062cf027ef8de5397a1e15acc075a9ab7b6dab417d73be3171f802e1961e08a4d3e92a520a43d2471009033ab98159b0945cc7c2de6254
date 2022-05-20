function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { model } from '@modern-js-reduck/store';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { useModel, Provider } from '..';
import { jsxs as _jsxs } from "react/jsx-runtime";
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
var countModel = model('name').define({
  state: {
    value: 1,
    value1: 1
  },
  actions: {
    addValue: function addValue(state) {
      return _objectSpread(_objectSpread({}, state), {}, {
        value: state.value + 1
      });
    },
    addValue1: function addValue1(state) {
      return _objectSpread(_objectSpread({}, state), {}, {
        value1: state.value1 + 1
      });
    }
  }
});
describe('test batch', function () {
  test('once store change, update should batch in one render', function () {
    var renderCount = 0;

    function SubApp() {
      renderCount += 1;

      var _useModel = useModel(countModel),
          _useModel2 = _slicedToArray(_useModel, 2),
          value1 = _useModel2[0].value1,
          addValue1 = _useModel2[1].addValue1;

      return /*#__PURE__*/_jsxs(_Fragment, {
        children: [/*#__PURE__*/_jsxs("div", {
          children: ["value1:", value1]
        }), /*#__PURE__*/_jsx("div", {
          onClick: function onClick() {
            addValue1();
          },
          children: "addValue1"
        })]
      });
    }

    function App() {
      var _useModel3 = useModel(countModel),
          _useModel4 = _slicedToArray(_useModel3, 2),
          value = _useModel4[0].value,
          addValue = _useModel4[1].addValue;

      return /*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsxs("div", {
          children: ["value:", value]
        }), /*#__PURE__*/_jsx("div", {
          onClick: function onClick() {
            return addValue();
          },
          children: "addValue"
        }), /*#__PURE__*/_jsx(SubApp, {})]
      });
    }

    var result = render( /*#__PURE__*/_jsx(Provider, {
      children: /*#__PURE__*/_jsx(App, {})
    }));
    expect(renderCount).toBe(1);
    fireEvent.click(result.getByText('addValue'));
    expect(renderCount).toBe(2);
    expect(result.getByText('value:2')).toBeInTheDocument();
    fireEvent.click(result.getByText('addValue1'));
    expect(renderCount).toBe(3);
    expect(result.getByText('value1:2')).toBeInTheDocument();
  });
  test('state selector should reduce the rerender times', function () {
    var parentRenderCount = 0;
    var childRenderCount = 0;

    function SubApp() {
      childRenderCount += 1;

      var _useModel5 = useModel(countModel, function (state) {
        return {
          value1: state.value1
        };
      }),
          _useModel6 = _slicedToArray(_useModel5, 2),
          value1 = _useModel6[0].value1,
          addValue1 = _useModel6[1].addValue1;

      return /*#__PURE__*/_jsxs(_Fragment, {
        children: [/*#__PURE__*/_jsxs("div", {
          children: ["value1:", value1]
        }), /*#__PURE__*/_jsx("div", {
          onClick: function onClick() {
            addValue1();
          },
          children: "addValue1"
        })]
      });
    }

    function App() {
      parentRenderCount += 1;

      var _useModel7 = useModel(countModel, function (state) {
        return {
          value: state.value
        };
      }),
          _useModel8 = _slicedToArray(_useModel7, 2),
          value = _useModel8[0].value,
          addValue = _useModel8[1].addValue;

      return /*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsxs("div", {
          children: ["value:", value]
        }), /*#__PURE__*/_jsx("div", {
          onClick: function onClick() {
            return addValue();
          },
          children: "addValue"
        }), /*#__PURE__*/_jsx(SubApp, {})]
      });
    }

    var result = render( /*#__PURE__*/_jsx(Provider, {
      children: /*#__PURE__*/_jsx(App, {})
    }));
    expect(parentRenderCount).toBe(1);
    expect(childRenderCount).toBe(1);
    fireEvent.click(result.getByText('addValue'));
    expect(parentRenderCount).toBe(2);
    expect(childRenderCount).toBe(2);
    fireEvent.click(result.getByText('addValue1'));
    expect(parentRenderCount).toBe(2);
    expect(childRenderCount).toBe(3);
    expect(result.getByText('value:2')).toBeInTheDocument();
    expect(result.getByText('value1:2')).toBeInTheDocument();
  });
});