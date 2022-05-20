import { unstable_batchedUpdates } from 'react-dom';

const isModel = model => Boolean(model._name);

const combineSubscribe = (store, subscribes) => {
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
        handlers.forEach(() => handler());
      }

      changed = false;
    });
    return () => {
      unsubsribeStore();
      disposelist.forEach(dispose => dispose());
    };
  };
};

const createBatchManager = store => {
  // Models are in using now
  const usingModelsMap = new Map();
  let unsubscribe;
  const updateList = []; // listen to models in using

  const setupSubsribe = () => {
    if (typeof unsubscribe === 'function') {
      unsubscribe();
    }

    const modelSet = new Set();

    for (const [model, count] of usingModelsMap) {
      if (count !== 0) {
        modelSet.add(model);
      }
    }

    const subscribe = combineSubscribe(store, [...modelSet].map(m => store.use(m)[2]));
    unsubscribe = subscribe(() => {
      unstable_batchedUpdates(() => {
        let update = updateList.shift();

        while (update) {
          update();
          update = updateList.shift();
        }
      });
    });
  };

  const changeModels = (action, ...models) => {
    models.forEach(model => {
      if (!isModel(model)) {
        return;
      }

      let usingCount = usingModelsMap.get(model);

      if (action === 'add') {
        usingModelsMap.set(model, (usingCount || 0) + 1);
      } else if (action === 'remove') {
        if (usingCount) {
          usingCount -= 1;

          if (usingCount === 0) {
            usingModelsMap.delete(model);
          } else {
            usingModelsMap.set(model, usingCount);
          }
        }
      }
    });
    setupSubsribe();
  }; // add models to listen


  const addModels = (...args) => changeModels('add', ...args); // remove models to listen


  const removeModels = (...args) => changeModels('remove', ...args);

  const pushUpdate = update => {
    updateList.push(update);
  };

  return {
    addModels,
    removeModels,
    pushUpdate
  };
};

export { createBatchManager };