"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createLaunchEditorHandler = void 0;

var _utils = require("@modern-js/utils");

const createLaunchEditorHandler = // eslint-disable-next-line consistent-return
() => (ctx, next) => {
  if (ctx.url.startsWith(_utils.LAUNCH_EDITOR_ENDPOINT)) {
    const {
      filename,
      line = 1,
      column = 1
    } = ctx.query;

    if (!filename) {
      ctx.status = 500;
      ctx.res.end(`launch-editor-middleware: required query param "filename" is missing.`);
    } else {
      require('launch-editor')(`${filename}:${line}:${column}`, 'code', (file, errorMessage) => {
        _utils.logger.error(`Launch ${file} in editor failed.\n${errorMessage}`);
      });

      ctx.status = 200;
      ctx.res.end();
    }
  } else {
    return next();
  }
};

exports.createLaunchEditorHandler = createLaunchEditorHandler;