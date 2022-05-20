import { i18n, localeKeys } from "../../locale";
export let ActionType;

(function (ActionType) {
  ActionType["Function"] = "function";
  ActionType["Element"] = "element";
  ActionType["Refactor"] = "refactor";
})(ActionType || (ActionType = {}));

export let ActionElement;

(function (ActionElement) {
  ActionElement["Entry"] = "entry";
  ActionElement["Server"] = "server";
})(ActionElement || (ActionElement = {}));

export let ActionFunction;

(function (ActionFunction) {
  ActionFunction["UnBundle"] = "unbundle";
  ActionFunction["TailwindCSS"] = "tailwindcss";
  ActionFunction["Less"] = "less";
  ActionFunction["Sass"] = "sass";
  ActionFunction["BFF"] = "bff";
  ActionFunction["MicroFrontend"] = "micro_frontend";
  ActionFunction["Electron"] = "electron";
  ActionFunction["I18n"] = "i18n";
  ActionFunction["Test"] = "test";
  ActionFunction["E2ETest"] = "e2e_test";
  ActionFunction["Doc"] = "doc";
  ActionFunction["Storybook"] = "storybook";
  ActionFunction["RuntimeApi"] = "runtimeApi";
  ActionFunction["SSG"] = "ssg";
  ActionFunction["Polyfill"] = "polyfill";
  ActionFunction["Deploy"] = "deploy";
  ActionFunction["Proxy"] = "proxy";
})(ActionFunction || (ActionFunction = {}));

export let ActionRefactor;

(function (ActionRefactor) {
  ActionRefactor["BFFToApp"] = "bff_to_app";
})(ActionRefactor || (ActionRefactor = {}));

export const ActionTypeText = {
  [ActionType.Function]: () => i18n.t(localeKeys.action.function.self),
  [ActionType.Element]: () => i18n.t(localeKeys.action.element.self),
  [ActionType.Refactor]: () => i18n.t(localeKeys.action.refactor.self)
};
export const ActionElementText = {
  [ActionElement.Entry]: () => i18n.t(localeKeys.action.element.entry),
  [ActionElement.Server]: () => i18n.t(localeKeys.action.element.server)
};
export const ActionFunctionText = {
  [ActionFunction.UnBundle]: () => i18n.t(localeKeys.action.function.unbundle),
  [ActionFunction.TailwindCSS]: () => i18n.t(localeKeys.action.function.tailwindcss),
  [ActionFunction.Less]: () => i18n.t(localeKeys.action.function.less),
  [ActionFunction.Sass]: () => i18n.t(localeKeys.action.function.sass),
  [ActionFunction.BFF]: () => i18n.t(localeKeys.action.function.bff),
  [ActionFunction.MicroFrontend]: () => i18n.t(localeKeys.action.function.micro_frontend),
  [ActionFunction.Electron]: () => i18n.t(localeKeys.action.function.electron),
  [ActionFunction.I18n]: () => i18n.t(localeKeys.action.function.i18n),
  [ActionFunction.Test]: () => i18n.t(localeKeys.action.function.test),
  [ActionFunction.E2ETest]: () => i18n.t(localeKeys.action.function.e2e_test),
  [ActionFunction.Doc]: () => i18n.t(localeKeys.action.function.doc),
  [ActionFunction.Storybook]: () => i18n.t(localeKeys.action.function.storybook),
  [ActionFunction.RuntimeApi]: () => i18n.t(localeKeys.action.function.runtime_api),
  [ActionFunction.SSG]: () => i18n.t(localeKeys.action.function.ssg),
  [ActionFunction.Polyfill]: () => i18n.t(localeKeys.action.function.polyfill),
  [ActionFunction.Deploy]: () => i18n.t(localeKeys.action.function.deploy),
  [ActionFunction.Proxy]: () => i18n.t(localeKeys.action.function.proxy)
};
export const ActionRefactorText = {
  [ActionRefactor.BFFToApp]: () => i18n.t(localeKeys.action.refactor.bff_to_app)
};
export const ActionTypeTextMap = {
  [ActionType.Element]: ActionElementText,
  [ActionType.Function]: ActionFunctionText,
  [ActionType.Refactor]: ActionRefactorText
};