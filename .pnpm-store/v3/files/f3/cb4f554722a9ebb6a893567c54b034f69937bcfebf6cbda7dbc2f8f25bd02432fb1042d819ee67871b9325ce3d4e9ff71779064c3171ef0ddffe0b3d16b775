"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAPIHandlerInfos = exports.injectAPIHandlerInfos = void 0;

var _plugin = require("@modern-js/plugin");

var _bffRuntime = require("@modern-js/bff-runtime");

var _farrowApi = require("farrow-api");

var _toJSON = require("farrow-api/dist/toJSON");

var _constant = require("../constant");

var _extractApiHandlers = require("./extract-api-handlers");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const APIHandlerInfosContext = (0, _plugin.createContext)([]);

const useAPIHandlerInfos = () => APIHandlerInfosContext.use().value;

exports.useAPIHandlerInfos = useAPIHandlerInfos;

const injectAPIHandlerInfos = (apiDir, prefix) => {
  let apiHandlerInfos = (0, _extractApiHandlers.extractAPIHandlers)(apiDir);
  const apiEntries = {};

  for (const apiInfo of apiHandlerInfos) {
    const {
      name,
      handler
    } = apiInfo;

    if ((0, _bffRuntime.isSchemaHandler)(handler)) {
      apiEntries[name] = (0, _farrowApi.createApi)(_objectSpread(_objectSpread({}, handler.schema), {}, {
        input: handler.schema.request,
        output: handler.schema.response
      }));
    }
  }

  apiHandlerInfos.push({
    name: _constant.INTROSPECTION_ROUTE_PATH,
    handler: () => (0, _toJSON.toJSON)(apiEntries),
    method: _constant.INTROSPECTION_ROUTE_METHOD
  });

  if (prefix) {
    apiHandlerInfos = apiHandlerInfos.map(({
      name,
      handler,
      method
    }) => ({
      handler,
      method,
      name,
      path: `${prefix}${name}`
    }));
  }

  APIHandlerInfosContext.set(apiHandlerInfos);
};

exports.injectAPIHandlerInfos = injectAPIHandlerInfos;