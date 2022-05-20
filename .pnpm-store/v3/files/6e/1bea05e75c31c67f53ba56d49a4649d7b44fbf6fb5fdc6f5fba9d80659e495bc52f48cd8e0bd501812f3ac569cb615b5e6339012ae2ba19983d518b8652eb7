"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActionTypeTextMap = exports.ActionTypeText = exports.ActionType = exports.ActionRefactorText = exports.ActionRefactor = exports.ActionFunctionText = exports.ActionFunction = exports.ActionElementText = exports.ActionElement = void 0;

var _locale = require("../../locale");

let ActionType;
exports.ActionType = ActionType;

(function (ActionType) {
  ActionType["Function"] = "function";
  ActionType["Element"] = "element";
  ActionType["Refactor"] = "refactor";
})(ActionType || (exports.ActionType = ActionType = {}));

let ActionElement;
exports.ActionElement = ActionElement;

(function (ActionElement) {
  ActionElement["Entry"] = "entry";
  ActionElement["Server"] = "server";
})(ActionElement || (exports.ActionElement = ActionElement = {}));

let ActionFunction;
exports.ActionFunction = ActionFunction;

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
})(ActionFunction || (exports.ActionFunction = ActionFunction = {}));

let ActionRefactor;
exports.ActionRefactor = ActionRefactor;

(function (ActionRefactor) {
  ActionRefactor["BFFToApp"] = "bff_to_app";
})(ActionRefactor || (exports.ActionRefactor = ActionRefactor = {}));

const ActionTypeText = {
  [ActionType.Function]: () => _locale.i18n.t(_locale.localeKeys.action.function.self),
  [ActionType.Element]: () => _locale.i18n.t(_locale.localeKeys.action.element.self),
  [ActionType.Refactor]: () => _locale.i18n.t(_locale.localeKeys.action.refactor.self)
};
exports.ActionTypeText = ActionTypeText;
const ActionElementText = {
  [ActionElement.Entry]: () => _locale.i18n.t(_locale.localeKeys.action.element.entry),
  [ActionElement.Server]: () => _locale.i18n.t(_locale.localeKeys.action.element.server)
};
exports.ActionElementText = ActionElementText;
const ActionFunctionText = {
  [ActionFunction.UnBundle]: () => _locale.i18n.t(_locale.localeKeys.action.function.unbundle),
  [ActionFunction.TailwindCSS]: () => _locale.i18n.t(_locale.localeKeys.action.function.tailwindcss),
  [ActionFunction.Less]: () => _locale.i18n.t(_locale.localeKeys.action.function.less),
  [ActionFunction.Sass]: () => _locale.i18n.t(_locale.localeKeys.action.function.sass),
  [ActionFunction.BFF]: () => _locale.i18n.t(_locale.localeKeys.action.function.bff),
  [ActionFunction.MicroFrontend]: () => _locale.i18n.t(_locale.localeKeys.action.function.micro_frontend),
  [ActionFunction.Electron]: () => _locale.i18n.t(_locale.localeKeys.action.function.electron),
  [ActionFunction.I18n]: () => _locale.i18n.t(_locale.localeKeys.action.function.i18n),
  [ActionFunction.Test]: () => _locale.i18n.t(_locale.localeKeys.action.function.test),
  [ActionFunction.E2ETest]: () => _locale.i18n.t(_locale.localeKeys.action.function.e2e_test),
  [ActionFunction.Doc]: () => _locale.i18n.t(_locale.localeKeys.action.function.doc),
  [ActionFunction.Storybook]: () => _locale.i18n.t(_locale.localeKeys.action.function.storybook),
  [ActionFunction.RuntimeApi]: () => _locale.i18n.t(_locale.localeKeys.action.function.runtime_api),
  [ActionFunction.SSG]: () => _locale.i18n.t(_locale.localeKeys.action.function.ssg),
  [ActionFunction.Polyfill]: () => _locale.i18n.t(_locale.localeKeys.action.function.polyfill),
  [ActionFunction.Deploy]: () => _locale.i18n.t(_locale.localeKeys.action.function.deploy),
  [ActionFunction.Proxy]: () => _locale.i18n.t(_locale.localeKeys.action.function.proxy)
};
exports.ActionFunctionText = ActionFunctionText;
const ActionRefactorText = {
  [ActionRefactor.BFFToApp]: () => _locale.i18n.t(_locale.localeKeys.action.refactor.bff_to_app)
};
exports.ActionRefactorText = ActionRefactorText;
const ActionTypeTextMap = {
  [ActionType.Element]: ActionElementText,
  [ActionType.Function]: ActionFunctionText,
  [ActionType.Refactor]: ActionRefactorText
};
exports.ActionTypeTextMap = ActionTypeTextMap;