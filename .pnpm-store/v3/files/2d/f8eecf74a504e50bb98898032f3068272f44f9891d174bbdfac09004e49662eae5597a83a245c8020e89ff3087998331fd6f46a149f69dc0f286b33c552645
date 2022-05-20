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
import { useModel, Provider, createApp, useStaticModel, useLocalModel } from '..';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var countModel = model('name').define({
  state: {
    value: 1
  },
  actions: {
    add: function add(state) {
      return _objectSpread(_objectSpread({}, state), {}, {
        value: state.value + 1
      });
    }
  }
});

var App = function App() {
  var _useModel2 = useModel(countModel),
      _useModel3 = _slicedToArray(_useModel2, 2),
      state = _useModel3[0],
      actions = _useModel3[1];

  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx("div", {
      children: state.value
    }), /*#__PURE__*/_jsx("button", {
      type: "button",
      onClick: function onClick() {
        return actions.add();
      },
      children: "add"
    })]
  });
};

describe('test createApp', function () {
  test('createApp should return Provider and useModel', function () {
    var _createApp = createApp({}),
        _Provider = _createApp.Provider,
        _useModel = _createApp.useModel;

    expect(_Provider).toBeTruthy();
    expect(_useModel).toBeTruthy();
  });
  test('Global Provider and useModel should work', function () {
    var result = render( /*#__PURE__*/_jsx(Provider, {
      children: /*#__PURE__*/_jsx(App, {})
    }));
    expect(result.getByText(1)).toBeInTheDocument();
    fireEvent.click(result.getByText('add'));
    expect(result.getByText(2)).toBeInTheDocument();
  });
  test('Local Provider and useModel should work', function () {
    var _createApp2 = createApp({}),
        LocalProvider = _createApp2.Provider,
        useLModel = _createApp2.useModel;

    var SubApp = function SubApp() {
      var _useLModel = useLModel(countModel),
          _useLModel2 = _slicedToArray(_useLModel, 2),
          state = _useLModel2[0],
          actions = _useLModel2[1];

      return /*#__PURE__*/_jsxs(_Fragment, {
        children: [/*#__PURE__*/_jsx("div", {
          children: state.value
        }), /*#__PURE__*/_jsx("button", {
          type: "button",
          onClick: function onClick() {
            return actions.add();
          },
          children: "add"
        })]
      });
    };

    var result = render( /*#__PURE__*/_jsx(LocalProvider, {
      children: /*#__PURE__*/_jsx(SubApp, {})
    }));
    expect(result.getByText(1)).toBeInTheDocument();
    fireEvent.click(result.getByText('add'));
    expect(result.getByText(2)).toBeInTheDocument();
  });
  test('useStaticModel should work', function () {
    var renderTime = 0;
    var currentCount = 0;

    var StaticApp = function StaticApp() {
      renderTime += 1;

      var _useStaticModel = useStaticModel(countModel),
          _useStaticModel2 = _slicedToArray(_useStaticModel, 2),
          state = _useStaticModel2[0],
          actions = _useStaticModel2[1];

      currentCount = state.value;
      return /*#__PURE__*/_jsxs(_Fragment, {
        children: [/*#__PURE__*/_jsx("div", {
          children: state.value
        }), /*#__PURE__*/_jsx("button", {
          type: "button",
          onClick: function onClick() {
            return actions.add();
          },
          children: "add"
        }), /*#__PURE__*/_jsx("button", {
          type: "button",
          onClick: function onClick() {
            currentCount = state.value;
          },
          children: "updateCount"
        })]
      });
    };

    var result = render( /*#__PURE__*/_jsx(Provider, {
      children: /*#__PURE__*/_jsx(StaticApp, {})
    }));
    expect(renderTime).toBe(1);
    expect(currentCount).toBe(1);
    fireEvent.click(result.getByText('add'));
    expect(renderTime).toBe(1);
    expect(currentCount).toBe(1);
    fireEvent.click(result.getByText('updateCount'));
    expect(currentCount).toBe(2);
  });
  test('useLocalModel should work', function () {
    function Container() {
      var _useLocalModel = useLocalModel(countModel),
          _useLocalModel2 = _slicedToArray(_useLocalModel, 2),
          state = _useLocalModel2[0],
          actions = _useLocalModel2[1];

      var _useLocalModel3 = useLocalModel(countModel),
          _useLocalModel4 = _slicedToArray(_useLocalModel3, 2),
          state1 = _useLocalModel4[0],
          actions1 = _useLocalModel4[1];

      return /*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsxs("div", {
          children: ["state: ", state.value]
        }), /*#__PURE__*/_jsxs("div", {
          children: ["state1: ", state1.value]
        }), /*#__PURE__*/_jsx("button", {
          type: "button",
          onClick: function onClick() {
            return actions.add();
          },
          children: "actions add"
        }), /*#__PURE__*/_jsx("button", {
          type: "button",
          onClick: function onClick() {
            return actions1.add();
          },
          children: "actions1 add"
        })]
      });
    }

    var result = render( /*#__PURE__*/_jsx(Container, {}));
    fireEvent.click(result.getByText('actions add'));
    expect(result.getByText('state: 2')).toBeInTheDocument();
    expect(result.getByText('state1: 1')).toBeInTheDocument();
    fireEvent.click(result.getByText('actions1 add'));
    expect(result.getByText('state: 2')).toBeInTheDocument();
    expect(result.getByText('state1: 2')).toBeInTheDocument();
  });
});