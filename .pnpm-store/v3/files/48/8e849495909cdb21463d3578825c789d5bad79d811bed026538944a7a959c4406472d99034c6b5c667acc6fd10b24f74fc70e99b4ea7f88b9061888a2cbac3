function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

import { combineReducers } from 'redux';
import { createUseModel } from "../model/useModel";
import { createPluginCore } from "../plugin";
import { createSubscribe } from "../model/subscribe";

var createContext = function createContext(store) {
  var reducers = {};
  var mountedModels = new Map();
  var subscriptions = new WeakMap();
  var mountingModelNames = new Set();
  var lastState;
  /**
   * Dynamic add reducer to store
   */

  var addReducers = function addReducers(_reducers) {
    if (!lastState) {
      store.subscribe(function () {
        lastState = store.getState();
      });
    }

    Object.assign(reducers, _reducers);
    Object.keys(_reducers).forEach(function (key) {
      return mountingModelNames["delete"](key);
    });
    store.replaceReducer(combineReducers(reducers));
  };
  /**
   * Add to exported models
   */


  var addModel = function addModel(model, mountedModel) {
    mountedModels.set(model, mountedModel);
    subscriptions.set(model, createSubscribe(context, model));
  };

  var getModel = function getModel(model) {
    var mountedModel = mountedModels.get(model);

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

  var getModelByName = function getModelByName(name) {
    var model = null;

    var _iterator = _createForOfIteratorHelper(mountedModels),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var _step$value = _slicedToArray(_step.value, 2),
            mountedModel = _step$value[1];

        if (mountedModel.name === name) {
          model = mountedModel;
          break;
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    return model;
  }; // Get function to subsribe model


  var getModelSubscribe = function getModelSubscribe(model) {
    return subscriptions.get(model);
  };

  var mountingModel = function mountingModel(name) {
    if (mountingModelNames.has(name)) {
      throw new Error("Perhaps you mount a model named ".concat(name, " are in mounting already"));
    }

    mountingModelNames.add(name);
  };

  var pluginCore = createPluginCore({
    store: store
  });
  /**
   * Add all to context
   */

  var context = {
    store: store,
    apis: {
      addReducers: addReducers,
      addModel: addModel,
      getModel: getModel,
      getModelSubscribe: getModelSubscribe,
      getModelByName: getModelByName,
      mountingModel: mountingModel
    },
    pluginCore: pluginCore
  };
  context.apis.useModel = createUseModel(context);
  return context;
};

export { createContext };