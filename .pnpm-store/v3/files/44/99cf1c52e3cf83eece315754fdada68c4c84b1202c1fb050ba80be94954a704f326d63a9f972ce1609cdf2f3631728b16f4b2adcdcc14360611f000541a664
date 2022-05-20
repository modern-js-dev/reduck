"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createUseModel = createUseModel;

var _mountModel = _interopRequireDefault(require("./mountModel"));

var _subscribe = require("./subscribe");

var _model = require("./model");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createUseModel(context) {
  function useModel(...args) {
    const flattenedArgs = Array.isArray(args[0]) ? [...args[0], ...args.slice(1)] : args;
    flattenedArgs.forEach(model => {
      if ((0, _model.isModel)(model)) {
        (0, _mountModel.default)(context, model);
      }
    });
    const {
      getState,
      getActions,
      subscribe,
      actualModels
    } = parseModelParams(context, flattenedArgs);
    let [state, actions] = [getState(), getActions()];
    ({
      state,
      actions
    } = context.pluginCore.revokePipeline('useModel', {
      state,
      actions
    }, {
      models: actualModels,
      mountedModels: actualModels.map(model => context.apis.getModel(model))
    }));
    return [state, actions, subscribe];
  }

  return useModel;
}

const parseModelParams = (context, _models) => {
  const models = Array.isArray(_models) ? _models : [_models];
  const actualModels = [];
  let stateSelector = null;
  let actionSelector = null;

  for (const model of models) {
    if (typeof model === 'function' && !(0, _model.isModel)(model)) {
      if (!stateSelector) {
        stateSelector = model;
      } else if (!actionSelector) {
        actionSelector = model;
      }

      continue;
    }

    actualModels.push(model);
  }

  if (actualModels.length > 1) {
    actualModels.forEach(m => {
      if (Object.prototype.toString.call(context.apis.getModel(m).state) !== '[object Object]') {
        throw new Error(`You cant use mutiple model one of which's state is primitive data`);
      }
    });
  }

  stateSelector = stateSelector || ((...states) => {
    if (states.length === 1) {
      return states[0];
    }

    return states.reduce((res, state) => Object.assign(res, state), {});
  });

  actionSelector = actionSelector || ((...actions) => actions.reduce((res, action) => Object.assign(res, action), {}));

  return {
    getState: () => stateSelector(...actualModels.map(model => context.apis.getModel(model).state)),
    getActions: () => actionSelector(...actualModels.map(model => context.apis.getModel(model).actions)),
    subscribe: handler => (0, _subscribe.combineSubscribe)(context, ...actualModels.map(model => context.apis.getModelSubscribe(model)))(handler),
    actualModels
  };
};