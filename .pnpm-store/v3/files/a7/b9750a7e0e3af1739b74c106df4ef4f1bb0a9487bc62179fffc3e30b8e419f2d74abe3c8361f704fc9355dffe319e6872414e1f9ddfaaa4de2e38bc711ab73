import { createPlugin } from '@modern-js-reduck/store';
import { produce } from 'immer';
export default createPlugin(() => ({
  beforeReducer(reducer) {
    return (state, payload) => produce(state, draft => reducer(draft, payload));
  }

}));