"use strict";

var _store = require("@modern-js-reduck/store");

var _react = require("@testing-library/react");

require("@testing-library/jest-dom/extend-expect");

var _ = require("..");

var _jsxRuntime = require("react/jsx-runtime");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const countModel = (0, _store.model)('name').define({
  state: {
    value: 1,
    value1: 1
  },
  actions: {
    addValue(state) {
      return _objectSpread(_objectSpread({}, state), {}, {
        value: state.value + 1
      });
    },

    addValue1(state) {
      return _objectSpread(_objectSpread({}, state), {}, {
        value1: state.value1 + 1
      });
    }

  }
});
describe('test batch', () => {
  test('once store change, update should batch in one render', () => {
    let renderCount = 0;

    function SubApp() {
      renderCount += 1;
      const [{
        value1
      }, {
        addValue1
      }] = (0, _.useModel)(countModel);
      return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          children: ["value1:", value1]
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          onClick: () => {
            addValue1();
          },
          children: "addValue1"
        })]
      });
    }

    function App() {
      const [{
        value
      }, {
        addValue
      }] = (0, _.useModel)(countModel);
      return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          children: ["value:", value]
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          onClick: () => addValue(),
          children: "addValue"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(SubApp, {})]
      });
    }

    const result = (0, _react.render)( /*#__PURE__*/(0, _jsxRuntime.jsx)(_.Provider, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(App, {})
    }));
    expect(renderCount).toBe(1);

    _react.fireEvent.click(result.getByText('addValue'));

    expect(renderCount).toBe(2);
    expect(result.getByText('value:2')).toBeInTheDocument();

    _react.fireEvent.click(result.getByText('addValue1'));

    expect(renderCount).toBe(3);
    expect(result.getByText('value1:2')).toBeInTheDocument();
  });
  test('state selector should reduce the rerender times', () => {
    let parentRenderCount = 0;
    let childRenderCount = 0;

    function SubApp() {
      childRenderCount += 1;
      const [{
        value1
      }, {
        addValue1
      }] = (0, _.useModel)(countModel, state => ({
        value1: state.value1
      }));
      return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          children: ["value1:", value1]
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          onClick: () => {
            addValue1();
          },
          children: "addValue1"
        })]
      });
    }

    function App() {
      parentRenderCount += 1;
      const [{
        value
      }, {
        addValue
      }] = (0, _.useModel)(countModel, state => ({
        value: state.value
      }));
      return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          children: ["value:", value]
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          onClick: () => addValue(),
          children: "addValue"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(SubApp, {})]
      });
    }

    const result = (0, _react.render)( /*#__PURE__*/(0, _jsxRuntime.jsx)(_.Provider, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(App, {})
    }));
    expect(parentRenderCount).toBe(1);
    expect(childRenderCount).toBe(1);

    _react.fireEvent.click(result.getByText('addValue'));

    expect(parentRenderCount).toBe(2);
    expect(childRenderCount).toBe(2);

    _react.fireEvent.click(result.getByText('addValue1'));

    expect(parentRenderCount).toBe(2);
    expect(childRenderCount).toBe(3);
    expect(result.getByText('value:2')).toBeInTheDocument();
    expect(result.getByText('value1:2')).toBeInTheDocument();
  });
});