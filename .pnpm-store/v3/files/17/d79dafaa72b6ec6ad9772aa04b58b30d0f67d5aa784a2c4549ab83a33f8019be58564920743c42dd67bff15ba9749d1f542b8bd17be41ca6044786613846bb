import { ServerStyleSheet } from '@modern-js/runtime-core/styled';
export var toHtml = function toHtml(jsx, renderer, next) {
  var sheet = new ServerStyleSheet();
  var html = next(sheet.collectStyles(jsx));
  var css = sheet.getStyleTags();
  renderer.result.chunksMap.css += css;
  return html;
};