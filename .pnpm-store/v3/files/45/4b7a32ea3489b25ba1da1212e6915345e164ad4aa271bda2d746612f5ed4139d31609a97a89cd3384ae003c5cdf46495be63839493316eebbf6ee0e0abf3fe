function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

import { unstable_batchedUpdates } from 'react-dom';

var isModel = function isModel(model) {
  return Boolean(model._name);
};

var combineSubscribe = function combineSubscribe(store, subscribes) {
  var changed = false;
  var handlers = new Set();
  return function (handler) {
    handlers.add(handler);
    var disposelist = [];
    subscribes.forEach(function (subscribe) {
      disposelist.push(subscribe(function () {
        changed = true;
      }));
    });
    var unsubsribeStore = store.subscribe(function () {
      if (changed) {
        handlers.forEach(function () {
          return handler();
        });
      }

      changed = false;
    });
    return function () {
      unsubsribeStore();
      disposelist.forEach(function (dispose) {
        return dispose();
      });
    };
  };
};

var createBatchManager = function createBatchManager(store) {
  // Models are in using now
  var usingModelsMap = new Map();
  var unsubscribe;
  var updateList = []; // listen to models in using

  var setupSubsribe = function setupSubsribe() {
    if (typeof unsubscribe === 'function') {
      unsubscribe();
    }

    var modelSet = new Set();

    var _iterator = _createForOfIteratorHelper(usingModelsMap),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var _step$value = _slicedToArray(_step.value, 2),
            model = _step$value[0],
            count = _step$value[1];

        if (count !== 0) {
          modelSet.add(model);
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    var subscribe = combineSubscribe(store, _toConsumableArray(modelSet).map(function (m) {
      return store.use(m)[2];
    }));
    unsubscribe = subscribe(function () {
      unstable_batchedUpdates(function () {
        var update = updateList.shift();

        while (update) {
          update();
          update = updateList.shift();
        }
      });
    });
  };

  var changeModels = function changeModels(action) {
    for (var _len = arguments.length, models = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      models[_key - 1] = arguments[_key];
    }

    models.forEach(function (model) {
      if (!isModel(model)) {
        return;
      }

      var usingCount = usingModelsMap.get(model);

      if (action === 'add') {
        usingModelsMap.set(model, (usingCount || 0) + 1);
      } else if (action === 'remove') {
        if (usingCount) {
          usingCount -= 1;

          if (usingCount === 0) {
            usingModelsMap["delete"](model);
          } else {
            usingModelsMap.set(model, usingCount);
          }
        }
      }
    });
    setupSubsribe();
  }; // add models to listen


  var addModels = function addModels() {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return changeModels.apply(void 0, ['add'].concat(args));
  }; // remove models to listen


  var removeModels = function removeModels() {
    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    return changeModels.apply(void 0, ['remove'].concat(args));
  };

  var pushUpdate = function pushUpdate(update) {
    updateList.push(update);
  };

  return {
    addModels: addModels,
    removeModels: removeModels,
    pushUpdate: pushUpdate
  };
};

export { createBatchManager };