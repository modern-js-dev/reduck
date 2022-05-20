"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.supportModern = exports.getModernEntry = void 0;

var _uaParserJs = _interopRequireDefault(require("ua-parser-js"));

var _compareVersions = _interopRequireDefault(require("compare-versions"));

var _browserList = require("./browser-list");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const nativeModules = require('@babel/compat-data/native-modules');

const supportModern = context => {
  var _context$query;

  if ((_context$query = context.query) !== null && _context$query !== void 0 && _context$query.modern_es6) {
    return true;
  } // no ua in request headers


  const userAgent = context.headers['user-agent'];

  if (!userAgent || typeof userAgent !== 'string') {
    return false;
  }

  const parsedUA = (0, _uaParserJs.default)(userAgent);
  const browserName = parsedUA.browser.name;
  const browserVersion = parsedUA.browser.version;

  if (!browserName || !browserVersion) {
    return false;
  }

  const nativeUAName = _browserList.NativeModuleNameMap[browserName];

  if (!nativeUAName) {
    return false;
  }

  const version = nativeModules['es6.module'][nativeUAName];

  if (!version) {
    return false;
  }

  const result = (0, _compareVersions.default)(browserVersion, version);
  return result >= 0;
};

exports.supportModern = supportModern;

const getModernEntry = filepath => filepath.replace(/\.html$/, '-es6.html');

exports.getModernEntry = getModernEntry;