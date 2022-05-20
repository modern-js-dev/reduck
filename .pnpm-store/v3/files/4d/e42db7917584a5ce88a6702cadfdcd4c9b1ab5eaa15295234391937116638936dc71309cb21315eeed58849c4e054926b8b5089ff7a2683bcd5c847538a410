"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getNpmVersion = getNpmVersion;

var _packageJson = _interopRequireDefault(require("package-json"));

var _timeoutPromise = require("./timeoutPromise");

var _constants = require("../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * get package version
 * @param {string} packageName
 * @param {Options} options
 * @returns {string}
 */
async function getNpmVersion(packageName, options) {
  const {
    version
  } = await (0, _timeoutPromise.timeoutPromise)((0, _packageJson.default)(packageName.toLowerCase(), options), _constants.NPM_API_TIMEOUT, `Get npm version of '${packageName}'`);
  return version;
}