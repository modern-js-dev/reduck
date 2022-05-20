"use strict";

var _store = require("@modern-js-reduck/store");

var _ = _interopRequireDefault(require(".."));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const testModel = (0, _store.model)('name').define({
  state: 0
});
const testModel1 = (0, _store.model)('name1').define({
  state: 0,
  actions: {
    setState(_state, payload) {
      return payload + 1;
    }

  }
});
const store = (0, _store.createStore)({
  plugins: [_.default]
});
describe('test primitive auto actions', () => {
  it('state is a number, setState action should work', () => {
    const [, actions] = store.use(testModel);
    actions.setState(2);
    expect(store.use(testModel)[0]).toBe(2);
  });
  it("user's action priority is higher than auto actions", () => {
    const [, actions] = store.use(testModel1);
    actions.setState(2);
    expect(store.use(testModel1)[0]).toBe(3);
  });
});