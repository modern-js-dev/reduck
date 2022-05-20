function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

import mountModel from "./mountModel";
import { combineSubscribe } from "./subscribe";
import { isModel } from "./model";

function createUseModel(context) {
  function useModel() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var flattenedArgs = Array.isArray(args[0]) ? [].concat(_toConsumableArray(args[0]), _toConsumableArray(args.slice(1))) : args;
    flattenedArgs.forEach(function (model) {
      if (isModel(model)) {
        mountModel(context, model);
      }
    });

    var _parseModelParams = parseModelParams(context, flattenedArgs),
        getState = _parseModelParams.getState,
        getActions = _parseModelParams.getActions,
        subscribe = _parseModelParams.subscribe,
        actualModels = _parseModelParams.actualModels;

    var _ref = [getState(), getActions()],
        state = _ref[0],
        actions = _ref[1];

    var _context$pluginCore$r = context.pluginCore.revokePipeline('useModel', {
      state: state,
      actions: actions
    }, {
      models: actualModels,
      mountedModels: actualModels.map(function (model) {
        return context.apis.getModel(model);
      })
    });

    state = _context$pluginCore$r.state;
    actions = _context$pluginCore$r.actions;
    return [state, actions, subscribe];
  }

  return useModel;
}

var parseModelParams = function parseModelParams(context, _models) {
  var models = Array.isArray(_models) ? _models : [_models];
  var actualModels = [];
  var stateSelector = null;
  var actionSelector = null;

  var _iterator = _createForOfIteratorHelper(models),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var model = _step.value;

      if (typeof model === 'function' && !isModel(model)) {
        if (!stateSelector) {
          stateSelector = model;
        } else if (!actionSelector) {
          actionSelector = model;
        }

        continue;
      }

      actualModels.push(model);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  if (actualModels.length > 1) {
    actualModels.forEach(function (m) {
      if (Object.prototype.toString.call(context.apis.getModel(m).state) !== '[object Object]') {
        throw new Error("You cant use mutiple model one of which's state is primitive data");
      }
    });
  }

  stateSelector = stateSelector || function () {
    for (var _len2 = arguments.length, states = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      states[_key2] = arguments[_key2];
    }

    if (states.length === 1) {
      return states[0];
    }

    return states.reduce(function (res, state) {
      return Object.assign(res, state);
    }, {});
  };

  actionSelector = actionSelector || function () {
    for (var _len3 = arguments.length, actions = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      actions[_key3] = arguments[_key3];
    }

    return actions.reduce(function (res, action) {
      return Object.assign(res, action);
    }, {});
  };

  return {
    getState: function getState() {
      return stateSelector.apply(void 0, _toConsumableArray(actualModels.map(function (model) {
        return context.apis.getModel(model).state;
      })));
    },
    getActions: function getActions() {
      return actionSelector.apply(void 0, _toConsumableArray(actualModels.map(function (model) {
        return context.apis.getModel(model).actions;
      })));
    },
    subscribe: function subscribe(handler) {
      return combineSubscribe.apply(void 0, [context].concat(_toConsumableArray(actualModels.map(function (model) {
        return context.apis.getModelSubscribe(model);
      }))))(handler);
    },
    actualModels: actualModels
  };
};

export { createUseModel };