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
const countModel = model('name').define({
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
  const [state, actions] = useModel(countModel);
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx("div", {
      children: state.value
    }), /*#__PURE__*/_jsx("button", {
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
    } = createApp({});
    expect(_Provider).toBeTruthy();
    expect(_useModel).toBeTruthy();
  });
  test('Global Provider and useModel should work', () => {
    const result = render( /*#__PURE__*/_jsx(Provider, {
      children: /*#__PURE__*/_jsx(App, {})
    }));
    expect(result.getByText(1)).toBeInTheDocument();
    fireEvent.click(result.getByText('add'));
    expect(result.getByText(2)).toBeInTheDocument();
  });
  test('Local Provider and useModel should work', () => {
    const {
      Provider: LocalProvider,
      useModel: useLModel
    } = createApp({});

    const SubApp = () => {
      const [state, actions] = useLModel(countModel);
      return /*#__PURE__*/_jsxs(_Fragment, {
        children: [/*#__PURE__*/_jsx("div", {
          children: state.value
        }), /*#__PURE__*/_jsx("button", {
          type: "button",
          onClick: () => actions.add(),
          children: "add"
        })]
      });
    };

    const result = render( /*#__PURE__*/_jsx(LocalProvider, {
      children: /*#__PURE__*/_jsx(SubApp, {})
    }));
    expect(result.getByText(1)).toBeInTheDocument();
    fireEvent.click(result.getByText('add'));
    expect(result.getByText(2)).toBeInTheDocument();
  });
  test('useStaticModel should work', () => {
    let renderTime = 0;
    let currentCount = 0;

    const StaticApp = () => {
      renderTime += 1;
      const [state, actions] = useStaticModel(countModel);
      currentCount = state.value;
      return /*#__PURE__*/_jsxs(_Fragment, {
        children: [/*#__PURE__*/_jsx("div", {
          children: state.value
        }), /*#__PURE__*/_jsx("button", {
          type: "button",
          onClick: () => actions.add(),
          children: "add"
        }), /*#__PURE__*/_jsx("button", {
          type: "button",
          onClick: () => {
            currentCount = state.value;
          },
          children: "updateCount"
        })]
      });
    };

    const result = render( /*#__PURE__*/_jsx(Provider, {
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
  test('useLocalModel should work', () => {
    function Container() {
      const [state, actions] = useLocalModel(countModel);
      const [state1, actions1] = useLocalModel(countModel);
      return /*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsxs("div", {
          children: ["state: ", state.value]
        }), /*#__PURE__*/_jsxs("div", {
          children: ["state1: ", state1.value]
        }), /*#__PURE__*/_jsx("button", {
          type: "button",
          onClick: () => actions.add(),
          children: "actions add"
        }), /*#__PURE__*/_jsx("button", {
          type: "button",
          onClick: () => actions1.add(),
          children: "actions1 add"
        })]
      });
    }

    const result = render( /*#__PURE__*/_jsx(Container, {}));
    fireEvent.click(result.getByText('actions add'));
    expect(result.getByText('state: 2')).toBeInTheDocument();
    expect(result.getByText('state1: 1')).toBeInTheDocument();
    fireEvent.click(result.getByText('actions1 add'));
    expect(result.getByText('state: 2')).toBeInTheDocument();
    expect(result.getByText('state1: 2')).toBeInTheDocument();
  });
});