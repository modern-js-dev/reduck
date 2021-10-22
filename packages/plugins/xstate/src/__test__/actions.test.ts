import { createStore, model } from '@modern-js-reduck/store';
import { plugin } from '..';
import { createMachine, interpret } from '@/machine';

const b = createUseModel;

const a = createMachine({
  initial: 'idle',
  states: {
    idle: {
      on: {
        WALK: 'walking',
      },
    },
    walking: {
      on: {
        STOP: 'idle',
      },
    },
  },
});

describe('common actions', () => {
  it('should work with machine object', () => {
    const store = createStore({ plugins: [plugin] });

    const fooModel = model('foo').define({
      state: {
        foo: 1,
      },
      machine: createMachine({
        initial: 'idle',
        states: {
          idle: {
            on: {
              WALK: 'walking',
            },
          },
          walking: {
            on: {
              STOP: 'idle',
            },
          },
        },
      }),
    });

    const [firstState, actions] = store.use(fooModel);

    expect(firstState.machine.state.value).toBe('idle');
    actions.send('WALK');

    const [secondState] = store.use(fooModel);
    expect(secondState.machine.state.value).toBe('walking');
  });

  it('should work with JSON object', () => {
    const store = createStore({ plugins: [plugin] });

    const fooModel = model('foo').define({
      state: {
        foo: 1,
      },
      machine: {
        initial: 'idle',
        states: {
          idle: {
            on: {
              WALK: 'walking',
            },
          },
          walking: {
            on: {
              STOP: 'idle',
            },
          },
        },
      },
    });

    const [firstState, actions] = store.use(fooModel);

    expect(firstState.machine.state.value).toBe('idle');
    actions.send('WALK');

    const [secondState] = store.use(fooModel);
    expect(secondState.machine.state.value).toBe('walking');
  });
});
