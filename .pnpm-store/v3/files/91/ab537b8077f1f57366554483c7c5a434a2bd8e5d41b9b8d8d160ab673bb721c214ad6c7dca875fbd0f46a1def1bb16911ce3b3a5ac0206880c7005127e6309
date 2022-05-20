/// <reference types="node" />
export declare const defaultIgnores: string[];
export interface DependencyTreeOptions {
  root: string;
  ignore?: string[];
}
export interface TreeNode {
  module: NodeModule;
  parent: Set<TreeNode>;
  children: Set<TreeNode>;
}
/**
 * `require.cache` already is a dependency tree, however require cache's
 * `module.parent` is the module that first required. so we have to implement
 *  a new tree which revisit the cache tree to find all parent node
 */

export declare class DependencyTree {
  private readonly tree;
  private readonly ignore;
  constructor();
  getNode(path: string): TreeNode | undefined;
  /**
   * update dependency tree
   *
   * @param cache
   */

  update(cache: any): void;
  private shouldIgnore;
}