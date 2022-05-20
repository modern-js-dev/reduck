/**
 * Only elements of a unified level can be linked, and parent and child nodes are not allowed to be linked
 * Link yourself, not allowed
 */
import { SchemaValueType } from '../interface/ISchema';
import { Node } from './graph';
export declare type EffectInfo = {
  key: string;
  value?: SchemaValueType;
};
export declare type EffectData = {
  [key: string]: SchemaValueType;
};
/**
 * Detect the cycle situation, if it occurs, an error will be reported
 */

export declare class EffectUtil {
  private readonly effectData;
  private readonly graph;
  constructor(data: EffectData);
  getInitEffectedValue: () => {
    [x: string]: unknown;
  };
  getEffectedValue: (value: Record<string, unknown>, formData: Record<string, unknown>) => Record<string, unknown>;
  doGetEffectedValue: (formData: Record<string, unknown>, rootNodes: Node<EffectInfo>[]) => Record<string, unknown>;
  private readonly buildGraph;
  private getNodeData;
  private checkCycle;
  private getEffectInfo;
}