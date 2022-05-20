var createSubscribe = function createSubscribe(context, model) {
  var mountedModel = context.apis.getModel(model);

  if (!mountedModel) {
    return null;
  }

  var name = mountedModel.name;
  var lastState = null;
  var unsubsribeStore;
  var handlers = new Set();

  var setupSubscribeStore = function setupSubscribeStore() {
    // Already subscribed store
    if (unsubsribeStore) {
      return unsubsribeStore;
    }

    unsubsribeStore = context.store.subscribe(function () {
      var curState = context.store.getState()[name];

      if (lastState !== curState) {
        lastState = curState;
        handlers.forEach(function (handler) {
          return handler();
        });
      }
    });
    return unsubsribeStore;
  };

  return function (handler) {
    unsubsribeStore = setupSubscribeStore();
    handlers.add(handler);
    return function () {
      handlers["delete"](handler);

      if (handlers.size === 0) {
        var _unsubsribeStore;

        (_unsubsribeStore = unsubsribeStore) === null || _unsubsribeStore === void 0 ? void 0 : _unsubsribeStore();
        unsubsribeStore = null;
      }
    };
  };
};

var combineSubscribe = function combineSubscribe(context) {
  for (var _len = arguments.length, subscribes = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    subscribes[_key - 1] = arguments[_key];
  }

  var store = context.store;
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
        changed = false;
        handlers.forEach(function () {
          return handler();
        });
      }
    });
    return function () {
      unsubsribeStore();
      disposelist.forEach(function (dispose) {
        return dispose();
      });
    };
  };
};

export { createSubscribe, combineSubscribe };