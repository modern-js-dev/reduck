import { createBabelChain } from '@modern-js/babel-chain';
import { getPresetChain } from "./presets";
import { getPluginsChain } from "./plugins";
export const getBaseBabelChain = option => {
  const chain = createBabelChain();
  const presetsChain = getPresetChain(option);
  const pluginsChain = getPluginsChain(option);
  chain.merge(presetsChain).merge(pluginsChain);
  return chain;
};
export const getBaseBabelConfig = option => getBaseBabelChain(option).toJSON();
export * from "./type";