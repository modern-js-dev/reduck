import { createPlugin } from '@modern-js-reduck/store';
import { devToolsEnhancer } from 'redux-devtools-extension';
export default (config => createPlugin(() => ({
  config: storeConfig => {
    const {
      enhancers = []
    } = storeConfig;
    storeConfig.enhancers = [devToolsEnhancer(config), ...enhancers];
    return storeConfig;
  }
})));