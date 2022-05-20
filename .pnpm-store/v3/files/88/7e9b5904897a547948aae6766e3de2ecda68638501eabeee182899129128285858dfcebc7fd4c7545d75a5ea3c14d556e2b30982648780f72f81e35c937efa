import { createPlugin } from '@modern-js-reduck/store';
import { produce } from 'immer';
export default createPlugin(function () {
  return {
    beforeReducer: function beforeReducer(reducer) {
      return function (state, payload) {
        return produce(state, function (draft) {
          return reducer(draft, payload);
        });
      };
    }
  };
});