"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _model = require("./model");

const mountModel = (context, model) => {
  if (context.apis.getModel(model)) {
    return;
  }

  const {
    onMount,
    trigger: triggerOnMount
  } = createOnMount();
  context.apis.mountingModel(model._name);
  let modelDesc = (0, _model.getModelInitializer)(model)(context, {
    use: context.apis.useModel,
    onMount
  });
  modelDesc.name = model._name;
  modelDesc = context.pluginCore.revokePipeline('prepareModelDesc', modelDesc);

  if (!checkModel(context, modelDesc, model)) {
    return;
  }

  const flattenedActions = flattenActions(modelDesc);
  const reducer = createReducer(context, flattenedActions, modelDesc.state);

  if (reducer) {
    context.apis.addReducers({
      [modelDesc.name]: reducer
    });
  }

  const [dispatchActions, setDispatchAction] = createDispatchActions(context, modelDesc);
  let mountedModel = {
    actions: dispatchActions,
    state: modelDesc.state,
    name: modelDesc.name,
    modelDesc
  };
  ({
    mountedModel
  } = context.pluginCore.revokePipeline('modelMount', {
    modelDesc,
    mountedModel
  }, {
    setDispatchAction
  }));
  context.apis.addModel(model, mountedModel);
  triggerOnMount();
};

const checkModel = (context, modelDesc, model) => {
  // model's name should be a string, which length > 0
  if (!modelDesc.name || typeof modelDesc.name !== 'string') {
    console.error(`model name expected is a valid string, but got ${modelDesc.name}`);
    return false;
  }

  const mountedModel = context.apis.getModelByName(modelDesc.name); // model has mounted

  if (mountedModel) {
    console.info(`model named ${modelDesc.name} has already mounted, so skip`);
    context.apis.addModel(model, mountedModel);
    return false;
  }

  return true;
};
/**
 * Create reducer from model
 */


const createReducer = (context, flattenedActions, initialState) => {
  if (!flattenedActions) {
    return null;
  }

  return (state = initialState, reduxAction) => {
    const reducer = flattenedActions[reduxAction.type];

    if (reducer) {
      return context.pluginCore.revokePipeline('beforeReducer', flattenedActions[reduxAction.type], {
        name: reduxAction.type
      })(state, reduxAction.payload, ...(reduxAction.extraArgs || []));
    }

    return state;
  };
};
/**
 * Flatten nested actions into one layer.
 */


const flattenActions = modelDesc => {
  const flattenedActions = {};
  forEachAction(modelDesc, (path, action) => {
    flattenedActions[path.join('/').toUpperCase()] = action;
  });
  return flattenedActions;
};

const createDispatchActions = (context, modelDesc) => {
  const dispatchActions = {};

  const set = (path, value) => {
    let cur = dispatchActions;
    const len = path.length;

    for (let i = 1; i < len - 1; i++) {
      if (!cur[path[i]]) {
        cur[path[i]] = {};
      }

      cur = cur[path[i]];
    }

    if (!cur[path[len - 1]]) {
      cur[path[len - 1]] = value;
    } else {
      cur[path[len - 1]] = Object.assign(value, cur[path[len - 1]]);
    }
  };

  forEachAction(modelDesc, path => set(path, (payload, ...extraArgs) => {
    context.store.dispatch({
      type: path.join('/').toUpperCase(),
      payload,
      extraArgs
    });
  }));
  return [dispatchActions, set];
};
/**
 * Traverse action utils
 */


const forEachAction = (modelDesc, callback) => {
  const path = [modelDesc.name];

  const traverse = action => {
    if (!action) {
      return null;
    }

    if (typeof action === 'function') {
      return callback(path.slice(), action);
    }

    Object.keys(action).forEach(key => {
      path.push(key);
      traverse(action[key]);
      path.pop();
    });
    return null;
  };

  traverse(modelDesc.actions || {});
};
/**
 * Create onMount hook
 */


const createOnMount = () => {
  const handlers = [];
  const triggered = false;

  const onMount = handler => {
    handlers.push(handler);
  };

  const trigger = () => {
    if (triggered) {
      return;
    }

    handlers.forEach(handler => handler());
  };

  return {
    onMount,
    trigger
  };
};

var _default = mountModel;
exports.default = _default;