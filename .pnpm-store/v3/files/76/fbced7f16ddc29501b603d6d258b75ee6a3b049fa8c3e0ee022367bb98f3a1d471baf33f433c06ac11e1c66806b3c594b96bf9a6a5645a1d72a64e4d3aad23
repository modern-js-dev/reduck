import { createPlugin } from '@modern-js-reduck/store';
import { getType, mergeActions } from "./utils";
import * as primitiveActions from "./primitive";
import * as arrayActions from "./array";
import { createObjectActions } from "./object";
export default createPlugin(() => ({
  prepareModelDesc(modelDesc) {
    const initialState = modelDesc.state;
    const type = getType(initialState);

    if (type === 'primitive') {
      return mergeActions(modelDesc, primitiveActions);
    }

    if (type === 'array') {
      return mergeActions(modelDesc, arrayActions);
    }

    if (type === 'object') {
      return mergeActions(modelDesc, createObjectActions(modelDesc.state));
    }

    return modelDesc;
  }

}));