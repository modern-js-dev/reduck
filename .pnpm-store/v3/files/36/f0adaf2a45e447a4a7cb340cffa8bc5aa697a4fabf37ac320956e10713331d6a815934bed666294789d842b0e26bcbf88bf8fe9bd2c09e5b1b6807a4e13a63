/**
 * Only elements of a unified level can be linked, and parent and child nodes are not allowed to be linked
 * Link yourself, not allowed
 */

import { SchemaEffectedValueType, SchemaValueType } from '../interface/ISchema';
import { isEffectedValue } from '../utils';
import { Graph, Node } from './graph';
import { isEmptyObject } from './types';

// Circulation linkage of processing nodes
class CycleEffectError extends Error {
  constructor(graph: Graph<any>) {
    super('cyclic effect between nodes');
    this.message = graph.toString();
  }
}
export type EffectInfo = {
  key: string;
  value?: SchemaValueType;
};

export type EffectData = {
  [key: string]: SchemaValueType;
};

/**
 * Detect the cycle situation, if it occurs, an error will be reported
 */
export class EffectUtil {
  private readonly effectData: EffectData;

  // checkcycle does not use this graph, because the node will be deleted for loop verification.
  private readonly graph: Graph<EffectInfo>;

  constructor(data: EffectData) {
    this.effectData = data;
    // Graph of full data
    this.graph = this.buildGraph(Object.keys(this.effectData));
    // Build a graph of all data - Object.keys(this.effectData)
    this.checkCycle();
  }

  // When initializing, get the initial default value
  public getInitEffectedValue = () => {
    const result: Record<string, unknown> = {};
    const roots = this.graph.roots('incoming');
    // Get unaffected initial value
    roots.forEach(root => {
      result[root.data.key] = root.data.value;
    });
    return {
      ...result,
      ...this.doGetEffectedValue(result, roots),
    };
  };

  public getEffectedValue = (
    value: Record<string, unknown>,
    formData: Record<string, unknown>, // The latest value of the current form
  ): Record<string, unknown> => {
    const keys: string[] = Object.keys(value);
    // Current node as root node
    const rootNodes: Node<EffectInfo>[] = this.graph.getNodesByKeys(keys);
    return this.doGetEffectedValue({ ...formData, ...value }, rootNodes);
  };

  // When a field changes, update other linkage fields to obtain the results after linkage
  public doGetEffectedValue = (
    formData: Record<string, unknown>, // The latest value of the current form
    rootNodes: Node<EffectInfo>[],
  ): Record<string, unknown> => {
    const result: Record<string, unknown> = {};
    const doGetEffectedValue = (node: Node<EffectInfo>) => {
      const toNodes: {
        [key: string]: Node<EffectInfo>;
      } = node.outgoing;
      if (!isEmptyObject(toNodes)) {
        const toNodesKeys = Object.keys(toNodes);
        for (const each of toNodesKeys) {
          const {
            data: { value: val },
          } = toNodes[each] as Node<EffectInfo>;
          if (val && isEffectedValue(val)) {
            result[each] = (val as SchemaEffectedValueType).action(
              formData,
              formData[each],
            );
            doGetEffectedValue(toNodes[each] as Node<EffectInfo>);
          }
        }
      }
      return result;
    };
    rootNodes.forEach(x => doGetEffectedValue(x));

    return result;
  };

  // eslint-disable-next-line max-statements
  private readonly buildGraph = (nodeKeys: string[]) => {
    const graph = new Graph<EffectInfo>(_data => _data.key);

    if (!nodeKeys.length) {
      return graph;
    }
    const stack: string[] = [nodeKeys.pop() as string];
    let cycleCount = 0;
    const maxCycleCount = Object.keys(this.effectData).length - 1;
    while (stack.length) {
      const nodeKey = stack.pop() as string;
      const node = this.getEffectInfo(this.effectData, nodeKey);
      graph.lookupOrInsertNode(node);

      if (cycleCount++ > maxCycleCount) {
        console.error('max cycle count');
        throw new CycleEffectError(graph);
      }

      if (isEffectedValue(node.value)) {
        const { effectedByFields } = node.value as SchemaEffectedValueType;
        for (const field of effectedByFields) {
          const fromNode = this.getEffectInfo(this.effectData, field);
          graph.insertEdge(fromNode, node);
          stack.push(field);
        }
      }
      if (stack.length === 0 && nodeKeys.length) {
        cycleCount = 0;
        stack.push(nodeKeys.pop() as string);
      }
    }
    return graph;
  };

  private getNodeData(nodeKeys: string[]) {
    const result: EffectData = {};
    nodeKeys.forEach(x => {
      result[x] = this.effectData[x];
    });
    return result;
  }

  private checkCycle() {
    const graph = this.buildGraph(Object.keys(this.effectData));
    while (true) {
      const roots = graph.roots('incoming');
      if (roots.length === 0) {
        if (!graph.isEmpty()) {
          throw new CycleEffectError(graph);
        }
        break;
      }
      for (const root of roots) {
        graph.removeNode(root.data);
      }
    }
  }

  private getEffectInfo(data: EffectData, key: string): EffectInfo {
    return {
      key,
      value: data[key],
    };
  }
}
