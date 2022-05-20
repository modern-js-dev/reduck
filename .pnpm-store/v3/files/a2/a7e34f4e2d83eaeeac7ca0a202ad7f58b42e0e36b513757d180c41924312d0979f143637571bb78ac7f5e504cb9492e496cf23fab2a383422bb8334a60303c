"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSubscribe = exports.combineSubscribe = void 0;

const createSubscribe = (context, model) => {
  const mountedModel = context.apis.getModel(model);

  if (!mountedModel) {
    return null;
  }

  const {
    name
  } = mountedModel;
  let lastState = null;
  let unsubsribeStore;
  const handlers = new Set();

  const setupSubscribeStore = () => {
    // Already subscribed store
    if (unsubsribeStore) {
      return unsubsribeStore;
    }

    unsubsribeStore = context.store.subscribe(() => {
      const curState = context.store.getState()[name];

      if (lastState !== curState) {
        lastState = curState;
        handlers.forEach(handler => handler());
      }
    });
    return unsubsribeStore;
  };

  return handler => {
    unsubsribeStore = setupSubscribeStore();
    handlers.add(handler);
    return () => {
      handlers.delete(handler);

      if (handlers.size === 0) {
        var _unsubsribeStore;

        (_unsubsribeStore = unsubsribeStore) === null || _unsubsribeStore === void 0 ? void 0 : _unsubsribeStore();
        unsubsribeStore = null;
      }
    };
  };
};

exports.createSubscribe = createSubscribe;

const combineSubscribe = (context, ...subscribes) => {
  const {
    store
  } = context;
  let changed = false;
  const handlers = new Set();
  return handler => {
    handlers.add(handler);
    const disposelist = [];
    subscribes.forEach(subscribe => {
      disposelist.push(subscribe(() => {
        changed = true;
      }));
    });
    const unsubsribeStore = store.subscribe(() => {
      if (changed) {
        changed = false;
        handlers.forEach(() => handler());
      }
    });
    return () => {
      unsubsribeStore();
      disposelist.forEach(dispose => dispose());
    };
  };
};

exports.combineSubscribe = combineSubscribe;