import { Schema } from '@modern-js/easy-form-core';
export declare enum Solution {
  MWA = "mwa",
  Module = "module",
  Monorepo = "monorepo",
}
export declare enum SubSolution {
  MWA = "mwa",
  MWATest = "mwa_test",
  Module = "module",
  InnerModule = "inner_module",
}
export declare const SolutionText: Record<Solution, () => string>;
export declare const SubSolutionText: Record<SubSolution, () => string>;
export declare const SolutionSchema: Schema;
export declare function getSolutionNameFromSubSolution(solution: SubSolution): Solution.MWA | Solution.Module | SubSolution.MWA | SubSolution.Module;
export declare const SubSolutionSchema: Schema;
export declare const BaseGenerator = "@modern-js/base-generator";
export declare const SolutionGenerator: Record<Solution, string>;
export declare const SubSolutionGenerator: Record<SubSolution, string>;
export declare const ChangesetGenerator = "@modern-js/changeset-generator";
export declare const DependenceGenerator = "@modern-js/dependence-generator";
export declare const EntryGenerator = "@modern-js/entry-generator";
export declare const ElectronGenerator = "@modern-js/electron-generator";
export declare const EslintGenerator = "@modern-js/eslint-generator";