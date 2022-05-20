function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { getModelInitializer } from "./model";

var mountModel = function mountModel(context, model) {
  if (context.apis.getModel(model)) {
    return;
  }

  var _createOnMount = createOnMount(),
      onMount = _createOnMount.onMount,
      triggerOnMount = _createOnMount.trigger;

  context.apis.mountingModel(model._name);
  var modelDesc = getModelInitializer(model)(context, {
    use: context.apis.useModel,
    onMount: onMount
  });
  modelDesc.name = model._name;
  modelDesc = context.pluginCore.revokePipeline('prepareModelDesc', modelDesc);

  if (!checkModel(context, modelDesc, model)) {
    return;
  }

  var flattenedActions = flattenActions(modelDesc);
  var reducer = createReducer(context, flattenedActions, modelDesc.state);

  if (reducer) {
    context.apis.addReducers(_defineProperty({}, modelDesc.name, reducer));
  }

  var _createDispatchAction = createDispatchActions(context, modelDesc),
      _createDispatchAction2 = _slicedToArray(_createDispatchAction, 2),
      dispatchActions = _createDispatchAction2[0],
      setDispatchAction = _createDispatchAction2[1];

  var mountedModel = {
    actions: dispatchActions,
    state: modelDesc.state,
    name: modelDesc.name,
    modelDesc: modelDesc
  };

  var _context$pluginCore$r = context.pluginCore.revokePipeline('modelMount', {
    modelDesc: modelDesc,
    mountedModel: mountedModel
  }, {
    setDispatchAction: setDispatchAction
  });

  mountedModel = _context$pluginCore$r.mountedModel;
  context.apis.addModel(model, mountedModel);
  triggerOnMount();
};

var checkModel = function checkModel(context, modelDesc, model) {
  // model's name should be a string, which length > 0
  if (!modelDesc.name || typeof modelDesc.name !== 'string') {
    console.error("model name expected is a valid string, but got ".concat(modelDesc.name));
    return false;
  }

  var mountedModel = context.apis.getModelByName(modelDesc.name); // model has mounted

  if (mountedModel) {
    console.info("model named ".concat(modelDesc.name, " has already mounted, so skip"));
    context.apis.addModel(model, mountedModel);
    return false;
  }

  return true;
};
/**
 * Create reducer from model
 */


var createReducer = function createReducer(context, flattenedActions, initialState) {
  if (!flattenedActions) {
    return null;
  }

  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var reduxAction = arguments.length > 1 ? arguments[1] : undefined;
    var reducer = flattenedActions[reduxAction.type];

    if (reducer) {
      return context.pluginCore.revokePipeline('beforeReducer', flattenedActions[reduxAction.type], {
        name: reduxAction.type
      }).apply(void 0, [state, reduxAction.payload].concat(_toConsumableArray(reduxAction.extraArgs || [])));
    }

    return state;
  };
};
/**
 * Flatten nested actions into one layer.
 */


var flattenActions = function flattenActions(modelDesc) {
  var flattenedActions = {};
  forEachAction(modelDesc, function (path, action) {
    flattenedActions[path.join('/').toUpperCase()] = action;
  });
  return flattenedActions;
};

var createDispatchActions = function createDispatchActions(context, modelDesc) {
  var dispatchActions = {};

  var set = function set(path, value) {
    var cur = dispatchActions;
    var len = path.length;

    for (var i = 1; i < len - 1; i++) {
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

  forEachAction(modelDesc, function (path) {
    return set(path, function (payload) {
      for (var _len = arguments.length, extraArgs = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        extraArgs[_key - 1] = arguments[_key];
      }

      context.store.dispatch({
        type: path.join('/').toUpperCase(),
        payload: payload,
        extraArgs: extraArgs
      });
    });
  });
  return [dispatchActions, set];
};
/**
 * Traverse action utils
 */


var forEachAction = function forEachAction(modelDesc, callback) {
  var path = [modelDesc.name];

  var traverse = function traverse(action) {
    if (!action) {
      return null;
    }

    if (typeof action === 'function') {
      return callback(path.slice(), action);
    }

    Object.keys(action).forEach(function (key) {
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


var createOnMount = function createOnMount() {
  var handlers = [];
  var triggered = false;

  var onMount = function onMount(handler) {
    handlers.push(handler);
  };

  var trigger = function trigger() {
    if (triggered) {
      return;
    }

    handlers.forEach(function (handler) {
      return handler();
    });
  };

  return {
    onMount: onMount,
    trigger: trigger
  };
};

export default mountModel;