"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SubSolutionText = exports.SubSolutionSchema = exports.SubSolutionGenerator = exports.SubSolution = exports.SolutionText = exports.SolutionSchema = exports.SolutionGenerator = exports.Solution = exports.EslintGenerator = exports.EntryGenerator = exports.ElectronGenerator = exports.DependenceGenerator = exports.ChangesetGenerator = exports.BaseGenerator = void 0;
exports.getSolutionNameFromSubSolution = getSolutionNameFromSubSolution;

var _locale = require("../locale");

let Solution;
exports.Solution = Solution;

(function (Solution) {
  Solution["MWA"] = "mwa";
  Solution["Module"] = "module";
  Solution["Monorepo"] = "monorepo";
})(Solution || (exports.Solution = Solution = {}));

let SubSolution;
exports.SubSolution = SubSolution;

(function (SubSolution) {
  SubSolution["MWA"] = "mwa";
  SubSolution["MWATest"] = "mwa_test";
  SubSolution["Module"] = "module";
  SubSolution["InnerModule"] = "inner_module";
})(SubSolution || (exports.SubSolution = SubSolution = {}));

const SolutionText = {
  [Solution.MWA]: () => _locale.i18n.t(_locale.localeKeys.solution.mwa),
  [Solution.Module]: () => _locale.i18n.t(_locale.localeKeys.solution.module),
  [Solution.Monorepo]: () => _locale.i18n.t(_locale.localeKeys.solution.monorepo)
};
exports.SolutionText = SolutionText;
const SubSolutionText = {
  [SubSolution.MWA]: () => _locale.i18n.t(_locale.localeKeys.sub_solution.mwa),
  [SubSolution.MWATest]: () => _locale.i18n.t(_locale.localeKeys.sub_solution.mwa_test),
  [SubSolution.Module]: () => _locale.i18n.t(_locale.localeKeys.sub_solution.module),
  [SubSolution.InnerModule]: () => _locale.i18n.t(_locale.localeKeys.sub_solution.inner_module)
};
exports.SubSolutionText = SubSolutionText;
const SolutionSchema = {
  key: 'solution_schema',
  isObject: true,
  items: [{
    key: 'solution',
    label: () => _locale.i18n.t(_locale.localeKeys.solution.self),
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
          label: _locale.i18n.t(_locale.localeKeys.solution.custom)
        }];
      }

      return items;
    }
  }, {
    key: 'scenes',
    label: () => _locale.i18n.t(_locale.localeKeys.scenes.self),
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
          label: `${SolutionText[data.solution]()}(${_locale.i18n.t(_locale.localeKeys.solution.default)})`
        });
      }

      return items;
    }
  }]
};
exports.SolutionSchema = SolutionSchema;

function getSolutionNameFromSubSolution(solution) {
  if (solution === SubSolution.MWATest) {
    return Solution.MWA;
  }

  if (solution === SubSolution.InnerModule) {
    return Solution.Module;
  }

  return solution;
}

const SubSolutionSchema = {
  key: 'sub_solution_schema',
  isObject: true,
  items: [{
    key: 'solution',
    label: () => _locale.i18n.t(_locale.localeKeys.sub_solution.self),
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
          label: _locale.i18n.t(_locale.localeKeys.solution.custom)
        }];
      }

      return items;
    }
  }, {
    key: 'scenes',
    label: () => _locale.i18n.t(_locale.localeKeys.scenes.self),
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
          label: `${SubSolutionText[data.solution]()}(${_locale.i18n.t(_locale.localeKeys.solution.default)})`
        });
      }

      return items;
    }
  }]
};
exports.SubSolutionSchema = SubSolutionSchema;
const BaseGenerator = '@modern-js/base-generator';
exports.BaseGenerator = BaseGenerator;
const SolutionGenerator = {
  [Solution.MWA]: '@modern-js/mwa-generator',
  [Solution.Module]: '@modern-js/module-generator',
  [Solution.Monorepo]: '@modern-js/monorepo-generator'
};
exports.SolutionGenerator = SolutionGenerator;
const SubSolutionGenerator = {
  [SubSolution.MWA]: '@modern-js/mwa-generator',
  [SubSolution.MWATest]: '@modern-js/mwa-generator',
  [SubSolution.Module]: '@modern-js/module-generator',
  [SubSolution.InnerModule]: '@modern-js/module-generator'
};
exports.SubSolutionGenerator = SubSolutionGenerator;
const ChangesetGenerator = '@modern-js/changeset-generator';
exports.ChangesetGenerator = ChangesetGenerator;
const DependenceGenerator = '@modern-js/dependence-generator';
exports.DependenceGenerator = DependenceGenerator;
const EntryGenerator = '@modern-js/entry-generator';
exports.EntryGenerator = EntryGenerator;
const ElectronGenerator = '@modern-js/electron-generator';
exports.ElectronGenerator = ElectronGenerator;
const EslintGenerator = '@modern-js/eslint-generator';
exports.EslintGenerator = EslintGenerator;