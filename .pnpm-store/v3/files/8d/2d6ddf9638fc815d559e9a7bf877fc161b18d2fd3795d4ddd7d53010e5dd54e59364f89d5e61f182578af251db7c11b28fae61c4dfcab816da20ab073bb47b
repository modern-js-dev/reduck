"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createContext = void 0;

var _redux = require("redux");

var _useModel = require("../model/useModel");

var _plugin = require("../plugin");

var _subscribe = require("../model/subscribe");

const createContext = store => {
  const reducers = {};
  const mountedModels = new Map();
  const subscriptions = new WeakMap();
  const mountingModelNames = new Set();
  let lastState;
  /**
   * Dynamic add reducer to store
   */

  const addReducers = _reducers => {
    if (!lastState) {
      store.subscribe(() => {
        lastState = store.getState();
      });
    }

    Object.assign(reducers, _reducers);
    Object.keys(_reducers).forEach(key => mountingModelNames.delete(key));
    store.replaceReducer((0, _redux.combineReducers)(reducers));
  };
  /**
   * Add to exported models
   */


  const addModel = (model, mountedModel) => {
    mountedModels.set(model, mountedModel);
    subscriptions.set(model, (0, _subscribe.createSubscribe)(context, model));
  };

  const getModel = model => {
    const mountedModel = mountedModels.get(model);

    if (!mountedModel) {
      return null;
    }

    return {
      name: mountedModel.name,
      state: lastState[mountedModel.name],
      actions: mountedModel.actions,
      modelDesc: mountedModel.modelDesc
    };
  };

  const getModelByName = name => {
    let model = null;

    for (const [, mountedModel] of mountedModels) {
      if (mountedModel.name === name) {
        model = mountedModel;
        break;
      }
    }

    return model;
  }; // Get function to subsribe model


  const getModelSubscribe = model => subscriptions.get(model);

  const mountingModel = name => {
    if (mountingModelNames.has(name)) {
      throw new Error(`Perhaps you mount a model named ${name} are in mounting already`);
    }

    mountingModelNames.add(name);
  };

  const pluginCore = (0, _plugin.createPluginCore)({
    store
  });
  /**
   * Add all to context
   */

  const context = {
    store,
    apis: {
      addReducers,
      addModel,
      getModel,
      getModelSubscribe,
      getModelByName,
      mountingModel
    },
    pluginCore
  };
  context.apis.useModel = (0, _useModel.createUseModel)(context);
  return context;
};

exports.createContext = createContext;