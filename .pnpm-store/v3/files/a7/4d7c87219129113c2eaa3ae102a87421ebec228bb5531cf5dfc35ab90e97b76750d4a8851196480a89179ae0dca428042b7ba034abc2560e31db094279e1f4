"use strict";

var _store = require("@modern-js-reduck/store");

var _ = _interopRequireDefault(require(".."));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const testModel = (0, _store.model)('name').define({
  state: {
    a: 1,
    b: '1',
    c: {
      a: '1'
    }
  }
});
const store = (0, _store.createStore)({
  plugins: [_.default]
});
const [, {
  setA,
  setB,
  setC
}] = store.use(testModel);

const expectState = (key, state) => {
  expect(store.use(testModel)[0][key]).toEqual(state);
};

describe('test object auto actions', () => {
  it('setA', () => {
    setA(2);
    expectState('a', 2);
  });
  it('setB', () => {
    setB('1234');
    expectState('b', '1234');
  });
  it('setC', () => {
    setC({
      a: '666'
    });
    expectState('c', {
      a: '666'
    });
  });
});