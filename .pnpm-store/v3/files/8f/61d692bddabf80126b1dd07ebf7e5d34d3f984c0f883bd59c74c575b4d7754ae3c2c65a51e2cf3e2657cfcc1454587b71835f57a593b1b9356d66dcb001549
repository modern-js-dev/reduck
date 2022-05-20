import { createStore } from '@modern-js-reduck/store';
import { PropsWithChildren } from 'react';
import { UseModel } from '@modern-js-reduck/store/dist/types/types';
declare type Config = Parameters<typeof createStore>[0];
declare type Store = ReturnType<typeof createStore>;
declare const createApp: (config: Config) => {
  Provider: (props: PropsWithChildren<{
    store?: (import("redux").Store<any, import("redux").AnyAction> & {
      use: UseModel;
    }) | undefined;
    config?: Config;
  }>) => JSX.Element;
  useModel: UseModel;
  useStaticModel: UseModel;
  useLocalModel: UseModel;
};
export default createApp;