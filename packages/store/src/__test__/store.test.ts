import { createStore, model } from '..';

const countModel = model<{ value: number }>('counter').define({
  name: 'counter',
  state: {
    value: 1,
  },
  actions: {
    add(state) {
      return {
        ...state,
        // FIXME: ESlint 校验时，无法正确获取参数 state 的类型信息，识别为 any
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        value: state.value + 1,
      };
    },
  },
});

describe('createStore', () => {
  test('create store works', () => {
    const store = createStore();

    expect(store.getState()).toEqual({});
  });

  test('store use model works', () => {
    const store = createStore();
    const [state] = store.use(countModel);

    expect(state).toEqual({ value: 1 });
    expect(store.getState()).toEqual({
      counter: { value: 1 },
    });
  });

  test('model actions should works', () => {
    const store = createStore();
    const [state, actions] = store.use(countModel);

    expect(state).toEqual({ value: 1 });
    expect(store.getState()).toEqual({
      counter: { value: 1 },
    });

    actions.add();
    expect(store.getState()).toEqual({
      counter: { value: 2 },
    });
  });
});
