import { i18n, localeKeys } from "../locale";
export let Solution;

(function (Solution) {
  Solution["MWA"] = "mwa";
  Solution["Module"] = "module";
  Solution["Monorepo"] = "monorepo";
})(Solution || (Solution = {}));

export let SubSolution;

(function (SubSolution) {
  SubSolution["MWA"] = "mwa";
  SubSolution["MWATest"] = "mwa_test";
  SubSolution["Module"] = "module";
  SubSolution["InnerModule"] = "inner_module";
})(SubSolution || (SubSolution = {}));

export const SolutionText = {
  [Solution.MWA]: () => i18n.t(localeKeys.solution.mwa),
  [Solution.Module]: () => i18n.t(localeKeys.solution.module),
  [Solution.Monorepo]: () => i18n.t(localeKeys.solution.monorepo)
};
export const SubSolutionText = {
  [SubSolution.MWA]: () => i18n.t(localeKeys.sub_solution.mwa),
  [SubSolution.MWATest]: () => i18n.t(localeKeys.sub_solution.mwa_test),
  [SubSolution.Module]: () => i18n.t(localeKeys.sub_solution.module),
  [SubSolution.InnerModule]: () => i18n.t(localeKeys.sub_solution.inner_module)
};
export const SolutionSchema = {
  key: 'solution_schema',
  isObject: true,
  items: [{
    key: 'solution',
    label: () => i18n.t(localeKeys.solution.self),
    type: ['string'],
    mutualExclusion: true,
    items: (_data, extra) => {
      var _extra$customPlugin, _extra$customPlugin$c;

      const items = Object.values(Solution).map(solution => ({
        key: solution,
        label: SolutionText[solution]
      }));

      if (extra !== null && extra !== void 0 && (_extra$customPlugin = extra.customPlugin) !== null && _extra$customPlugin !== void 0 && (_extra$customPlugin$c = _extra$customPlugin.custom) !== null && _extra$customPlugin$c !== void 0 && _extra$customPlugin$c.length) {
        return [...items, {
          key: 'custom',
          label: i18n.t(localeKeys.solution.custom)
        }];
      }

      return items;
    }
  }, {
    key: 'scenes',
    label: () => i18n.t(localeKeys.scenes.self),
    type: ['string'],
    mutualExclusion: true,
    when: (data, extra) => (extra === null || extra === void 0 ? void 0 : extra.customPlugin) && extra.customPlugin[data.solution] && extra.customPlugin[data.solution].length > 0,
    items: (data, extra) => {
      const items = (extra !== null && extra !== void 0 && extra.customPlugin ? (extra === null || extra === void 0 ? void 0 : extra.customPlugin[data.solution]) || [] : []).map(plugin => ({
        key: plugin.key,
        label: plugin.name
      }));

      if (data.solution && data.solution !== 'custom') {
        items.unshift({
          key: data.solution,
          label: `${SolutionText[data.solution]()}(${i18n.t(localeKeys.solution.default)})`
        });
      }

      return items;
    }
  }]
};
export function getSolutionNameFromSubSolution(solution) {
  if (solution === SubSolution.MWATest) {
    return Solution.MWA;
  }

  if (solution === SubSolution.InnerModule) {
    return Solution.Module;
  }

  return solution;
}
export const SubSolutionSchema = {
  key: 'sub_solution_schema',
  isObject: true,
  items: [{
    key: 'solution',
    label: () => i18n.t(localeKeys.sub_solution.self),
    type: ['string'],
    mutualExclusion: true,
    items: (_data, extra) => {
      var _extra$customPlugin2, _extra$customPlugin2$;

      const items = Object.values(SubSolution).map(solution => ({
        key: solution,
        label: SubSolutionText[solution]
      }));

      if (extra !== null && extra !== void 0 && (_extra$customPlugin2 = extra.customPlugin) !== null && _extra$customPlugin2 !== void 0 && (_extra$customPlugin2$ = _extra$customPlugin2.custom) !== null && _extra$customPlugin2$ !== void 0 && _extra$customPlugin2$.length) {
        return [...items, {
          key: 'custom',
          label: i18n.t(localeKeys.solution.custom)
        }];
      }

      return items;
    }
  }, {
    key: 'scenes',
    label: () => i18n.t(localeKeys.scenes.self),
    type: ['string'],
    mutualExclusion: true,
    when: (data, extra) => (extra === null || extra === void 0 ? void 0 : extra.customPlugin) && extra.customPlugin[getSolutionNameFromSubSolution(data.solution)] && extra.customPlugin[getSolutionNameFromSubSolution(data.solution)].length > 0,
    items: (data, extra) => {
      const solution = getSolutionNameFromSubSolution(data.solution);
      const items = (extra !== null && extra !== void 0 && extra.customPlugin ? (extra === null || extra === void 0 ? void 0 : extra.customPlugin[solution]) || [] : []).map(plugin => ({
        key: plugin.key,
        label: plugin.name
      }));

      if (data.solution && data.solution !== 'custom') {
        items.unshift({
          key: data.solution,
          label: `${SubSolutionText[data.solution]()}(${i18n.t(localeKeys.solution.default)})`
        });
      }

      return items;
    }
  }]
};
export const BaseGenerator = '@modern-js/base-generator';
export const SolutionGenerator = {
  [Solution.MWA]: '@modern-js/mwa-generator',
  [Solution.Module]: '@modern-js/module-generator',
  [Solution.Monorepo]: '@modern-js/monorepo-generator'
};
export const SubSolutionGenerator = {
  [SubSolution.MWA]: '@modern-js/mwa-generator',
  [SubSolution.MWATest]: '@modern-js/mwa-generator',
  [SubSolution.Module]: '@modern-js/module-generator',
  [SubSolution.InnerModule]: '@modern-js/module-generator'
};
export const ChangesetGenerator = '@modern-js/changeset-generator';
export const DependenceGenerator = '@modern-js/dependence-generator';
export const EntryGenerator = '@modern-js/entry-generator';
export const ElectronGenerator = '@modern-js/electron-generator';
export const EslintGenerator = '@modern-js/eslint-generator';