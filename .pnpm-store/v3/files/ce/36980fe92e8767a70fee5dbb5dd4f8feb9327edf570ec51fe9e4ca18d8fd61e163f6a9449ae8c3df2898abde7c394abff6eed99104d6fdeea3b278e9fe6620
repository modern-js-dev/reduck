"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.autoActions = void 0;
Object.defineProperty(exports, "devtools", {
  enumerable: true,
  get: function () {
    return _pluginDevtools.default;
  }
});
exports.immer = exports.effects = void 0;

var _pluginEffects = require("@modern-js-reduck/plugin-effects");

var _pluginAutoActions = _interopRequireDefault(require("@modern-js-reduck/plugin-auto-actions"));

var _pluginImmutable = _interopRequireDefault(require("@modern-js-reduck/plugin-immutable"));

var _pluginDevtools = _interopRequireDefault(require("@modern-js-reduck/plugin-devtools"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const effects = () => _pluginEffects.plugin;

exports.effects = effects;

const immer = () => _pluginImmutable.default;

exports.immer = immer;

const autoActions = () => _pluginAutoActions.default;

exports.autoActions = autoActions;