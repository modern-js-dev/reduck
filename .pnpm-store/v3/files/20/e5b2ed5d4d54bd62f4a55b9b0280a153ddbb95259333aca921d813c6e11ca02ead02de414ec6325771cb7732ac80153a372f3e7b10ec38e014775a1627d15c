function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import packageJson from 'package-json';
import { timeoutPromise } from "./timeoutPromise";
import { NPM_API_TIMEOUT } from "../constants";
export async function getNpmTarballUrl(pkgName, pkgVersion, options) {
  var _pkgJson$dist;

  const pkgJson = await timeoutPromise(packageJson(pkgName.toLowerCase(), _objectSpread(_objectSpread({}, options), {}, {
    fullMetadata: true,
    version: pkgVersion
  })), NPM_API_TIMEOUT, `Get npm tarball url of '${pkgName}'`);

  if (typeof pkgJson.version !== 'string') {
    throw new Error('version not found in package');
  }

  if (!pkgJson.version) {
    throw new Error('version not found');
  }

  const tarball = pkgJson === null || pkgJson === void 0 ? void 0 : (_pkgJson$dist = pkgJson.dist) === null || _pkgJson$dist === void 0 ? void 0 : _pkgJson$dist.tarball;

  if (!tarball) {
    throw new Error('tarball not found');
  }

  return tarball;
}