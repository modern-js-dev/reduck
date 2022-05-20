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
    value: 1
  },
  actions: {
    add(state) {
      return _objectSpread(_objectSpread({}, state), {}, {
        value: state.value + 1
      });
    }

  }
});

const App = () => {
  const [state, actions] = (0, _.useModel)(countModel);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      children: state.value
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
      type: "button",
      onClick: () => actions.add(),
      children: "add"
    })]
  });
};

describe('test createApp', () => {
  test('createApp should return Provider and useModel', () => {
    const {
      Provider: _Provider,
      useModel: _useModel
    } = (0, _.createApp)({});
    expect(_Provider).toBeTruthy();
    expect(_useModel).toBeTruthy();
  });
  test('Global Provider and useModel should work', () => {
    const result = (0, _react.render)( /*#__PURE__*/(0, _jsxRuntime.jsx)(_.Provider, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(App, {})
    }));
    expect(result.getByText(1)).toBeInTheDocument();

    _react.fireEvent.click(result.getByText('add'));

    expect(result.getByText(2)).toBeInTheDocument();
  });
  test('Local Provider and useModel should work', () => {
    const {
      Provider: LocalProvider,
      useModel: useLModel
    } = (0, _.createApp)({});

    const SubApp = () => {
      const [state, actions] = useLModel(countModel);
      return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          children: state.value
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
          type: "button",
          onClick: () => actions.add(),
          children: "add"
        })]
      });
    };

    const result = (0, _react.render)( /*#__PURE__*/(0, _jsxRuntime.jsx)(LocalProvider, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(SubApp, {})
    }));
    expect(result.getByText(1)).toBeInTheDocument();

    _react.fireEvent.click(result.getByText('add'));

    expect(result.getByText(2)).toBeInTheDocument();
  });
  test('useStaticModel should work', () => {
    let renderTime = 0;
    let currentCount = 0;

    const StaticApp = () => {
      renderTime += 1;
      const [state, actions] = (0, _.useStaticModel)(countModel);
      currentCount = state.value;
      return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          children: state.value
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
          type: "button",
          onClick: () => actions.add(),
          children: "add"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
          type: "button",
          onClick: () => {
            currentCount = state.value;
          },
          children: "updateCount"
        })]
      });
    };

    const result = (0, _react.render)( /*#__PURE__*/(0, _jsxRuntime.jsx)(_.Provider, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(StaticApp, {})
    }));
    expect(renderTime).toBe(1);
    expect(currentCount).toBe(1);

    _react.fireEvent.click(result.getByText('add'));

    expect(renderTime).toBe(1);
    expect(currentCount).toBe(1);

    _react.fireEvent.click(result.getByText('updateCount'));

    expect(currentCount).toBe(2);
  });
  test('useLocalModel should work', () => {
    function Container() {
      const [state, actions] = (0, _.useLocalModel)(countModel);
      const [state1, actions1] = (0, _.useLocalModel)(countModel);
      return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          children: ["state: ", state.value]
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          children: ["state1: ", state1.value]
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
          type: "button",
          onClick: () => actions.add(),
          children: "actions add"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
          type: "button",
          onClick: () => actions1.add(),
          children: "actions1 add"
        })]
      });
    }

    const result = (0, _react.render)( /*#__PURE__*/(0, _jsxRuntime.jsx)(Container, {}));

    _react.fireEvent.click(result.getByText('actions add'));

    expect(result.getByText('state: 2')).toBeInTheDocument();
    expect(result.getByText('state1: 1')).toBeInTheDocument();

    _react.fireEvent.click(result.getByText('actions1 add'));

    expect(result.getByText('state: 2')).toBeInTheDocument();
    expect(result.getByText('state1: 2')).toBeInTheDocument();
  });
});