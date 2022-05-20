"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRouteName = exports.getMethod = exports.extractModuleInfoFromFilenames = exports.extractAPIHandlersFromModuleInfos = exports.extractAPIHandlers = void 0;

var _path = _interopRequireDefault(require("path"));

var _bffRuntime = require("@modern-js/bff-runtime");

var _utils = require("../utils");

var _constant = require("../constant");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const extractAPIHandlers = _apiDir => {
  const apiDir = _path.default.resolve(_apiDir);

  const lambdaDir = (0, _utils.getLambdaDir)(apiDir);
  const filenames = (0, _utils.getAllAPIFiles)(lambdaDir);
  const moduleInfos = extractModuleInfoFromFilenames(lambdaDir, filenames);
  return extractAPIHandlersFromModuleInfos(moduleInfos);
};

exports.extractAPIHandlers = extractAPIHandlers;

const extractModuleInfoFromFilenames = (apiDir, filenames) => {
  const moduleInfos = [];
  filenames.forEach(filename => {
    try {
      const module = requireModule(filename);
      const name = getRouteName(apiDir, filename);
      moduleInfos.push({
        filename,
        module,
        name
      });
    } catch (err) {
      if (process.env.NODE_ENV === 'production') {
        throw err;
      } else {
        console.error(err);
      }
    }
  });
  return moduleInfos;
};

exports.extractModuleInfoFromFilenames = extractModuleInfoFromFilenames;

const extractAPIHandlersFromModuleInfos = moduleInfos => {
  const apiHandlers = [];
  moduleInfos.forEach(({
    name,
    module
  }) => {
    Object.keys(module).forEach(key => {
      const handler = module[key];

      if ((0, _bffRuntime.isHandler)(handler)) {
        const method = getMethod(key);

        if (method) {
          apiHandlers.push({
            handler,
            method,
            name
          });
        } else {
          throw new Error(`Unknown HTTP Method: ${key}`);
        }
      }
    });
  });
  return apiHandlers;
};

exports.extractAPIHandlersFromModuleInfos = extractAPIHandlersFromModuleInfos;

const getMethod = name => {
  const upperName = name.toUpperCase();

  switch (upperName) {
    case 'GET':
      return _constant.HttpMethod.GET;

    case 'POST':
      return _constant.HttpMethod.POST;

    case 'PUT':
      return _constant.HttpMethod.PUT;

    case 'DELETE':
    case 'DEL':
      return _constant.HttpMethod.DELETE;

    case 'CONNECT':
      return _constant.HttpMethod.CONNECT;

    case 'TRACE':
      return _constant.HttpMethod.TRACE;

    case 'PATCH':
      return _constant.HttpMethod.PATCH;

    case 'OPTION':
      return _constant.HttpMethod.OPTION;
    // 兼容之前的方案，默认导出是 GET

    case 'DEFAULT':
      {
        return _constant.HttpMethod.GET;
      }

    default:
      return upperName;
  }
};

exports.getMethod = getMethod;

const getRouteName = (pwd, filename) => {
  const relativeName = filename.substring(pwd.length);
  const relativePath = relativeName.split('.').slice(0, -1).join('.');
  const nameSplit = relativePath.split(_path.default.sep).map(item => {
    if (item.length > 2) {
      if (item.startsWith('[') && item.endsWith(']')) {
        return `:${item.substring(1, item.length - 1)}`;
      }
    }

    return item;
  });
  const name = nameSplit.join('/');
  const finalName = name.endsWith(_constant.INDEX_SUFFIX) ? name.substring(0, name.length - _constant.INDEX_SUFFIX.length) : name;
  return clearRouteName(finalName);
};

exports.getRouteName = getRouteName;

const clearRouteName = routeName => {
  let finalRouteName = routeName.trim();

  if (!finalRouteName.startsWith('/')) {
    finalRouteName = `/${finalRouteName}`;
  }

  if (finalRouteName.length > 1 && finalRouteName.endsWith('/')) {
    finalRouteName = finalRouteName.substring(0, finalRouteName.length - 1);
  }

  return finalRouteName;
};

const requireModule = filename => {
  const module = require(filename);

  if (isFunction(module)) {
    return {
      default: module
    };
  }

  return module;
};

const isFunction = input => input && {}.toString.call(input) === '[object Function]';