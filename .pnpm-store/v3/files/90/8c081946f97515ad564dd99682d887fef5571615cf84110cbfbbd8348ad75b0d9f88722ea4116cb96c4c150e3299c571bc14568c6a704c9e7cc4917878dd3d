function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { createContext } from '@modern-js/plugin';
import { isSchemaHandler } from '@modern-js/bff-runtime';
import { createApi } from 'farrow-api';
import { toJSON } from 'farrow-api/dist/toJSON';
import { INTROSPECTION_ROUTE_PATH, INTROSPECTION_ROUTE_METHOD } from "../constant";
import { extractAPIHandlers } from "./extract-api-handlers";
const APIHandlerInfosContext = createContext([]);
export const useAPIHandlerInfos = () => APIHandlerInfosContext.use().value;
export const injectAPIHandlerInfos = (apiDir, prefix) => {
  let apiHandlerInfos = extractAPIHandlers(apiDir);
  const apiEntries = {};

  for (const apiInfo of apiHandlerInfos) {
    const {
      name,
      handler
    } = apiInfo;

    if (isSchemaHandler(handler)) {
      apiEntries[name] = createApi(_objectSpread(_objectSpread({}, handler.schema), {}, {
        input: handler.schema.request,
        output: handler.schema.response
      }));
    }
  }

  apiHandlerInfos.push({
    name: INTROSPECTION_ROUTE_PATH,
    handler: () => toJSON(apiEntries),
    method: INTROSPECTION_ROUTE_METHOD
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