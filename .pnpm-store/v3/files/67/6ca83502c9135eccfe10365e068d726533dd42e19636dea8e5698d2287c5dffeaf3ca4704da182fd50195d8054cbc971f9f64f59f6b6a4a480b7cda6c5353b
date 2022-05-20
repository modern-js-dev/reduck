const _excluded = ["Component"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import { Route, matchPath } from 'react-router-dom';
import { DefaultNotFound } from "./DefaultNotFound";
import { jsx as _jsx } from "react/jsx-runtime";
export function renderRoutes(routesConfig, extraProps = {}) {
  const Layout = _ref => {
    let {
      Component
    } = _ref,
        props = _objectWithoutProperties(_ref, _excluded);

    const GlobalLayout = routesConfig === null || routesConfig === void 0 ? void 0 : routesConfig.globalApp;

    if (!GlobalLayout) {
      return /*#__PURE__*/_jsx(Component, _objectSpread({}, props));
    }

    return /*#__PURE__*/_jsx(GlobalLayout, _objectSpread({
      Component: Component
    }, props));
  };

  const findMatchedRoute = pathname => {
    var _routesConfig$routes;

    return routesConfig === null || routesConfig === void 0 ? void 0 : (_routesConfig$routes = routesConfig.routes) === null || _routesConfig$routes === void 0 ? void 0 : _routesConfig$routes.find(route => {
      const info = matchPath(pathname, {
        path: route.path,
        exact: route.exact,
        sensitive: route.sensitive
      });
      return Boolean(info);
    });
  };

  return /*#__PURE__*/_jsx(Route, {
    path: "/",
    render: props => {
      const matchedRoute = findMatchedRoute(props.location.pathname);

      if (!matchedRoute) {
        return /*#__PURE__*/_jsx(DefaultNotFound, {});
      }

      return /*#__PURE__*/_jsx(Route, {
        path: matchedRoute.path,
        exact: matchedRoute.exact,
        sensitive: matchedRoute.sensitive,
        render: routeProps => /*#__PURE__*/_jsx(Layout, _objectSpread(_objectSpread({
          Component: matchedRoute.component
        }, routeProps), extraProps))
      });
    }
  });
}
export function getLocation(serverContext) {
  const {
    pathname,
    url
  } = (serverContext === null || serverContext === void 0 ? void 0 : serverContext.request) || {};
  const cleanUrl = url.replace('http://', '').replace('https://', '');
  const index = (cleanUrl || '').indexOf(pathname);

  if (index === -1) {
    return pathname;
  }

  return cleanUrl.substring(index);
}
export const urlJoin = (...parts) => {
  const separator = '/';
  const replace = new RegExp(`${separator}{1,}`, 'g');
  return standardSlash(parts.join(separator).replace(replace, separator));
};
export function standardSlash(str) {
  let addr = str;

  if (!addr || typeof addr !== 'string') {
    return addr;
  }

  if (addr.startsWith('.')) {
    addr = addr.slice(1);
  }

  if (!addr.startsWith('/')) {
    addr = `/${addr}`;
  }

  if (addr.endsWith('/') && addr !== '/') {
    addr = addr.slice(0, addr.length - 1);
  }

  return addr;
}