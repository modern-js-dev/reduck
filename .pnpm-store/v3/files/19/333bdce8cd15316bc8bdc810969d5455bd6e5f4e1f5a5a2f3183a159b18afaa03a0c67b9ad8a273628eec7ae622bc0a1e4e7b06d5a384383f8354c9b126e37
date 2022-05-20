"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toHtml = void 0;

var _styled = require("@modern-js/runtime-core/styled");

const toHtml = (jsx, renderer, next) => {
  const sheet = new _styled.ServerStyleSheet();
  const html = next(sheet.collectStyles(jsx));
  const css = sheet.getStyleTags();
  renderer.result.chunksMap.css += css;
  return html;
};

exports.toHtml = toHtml;