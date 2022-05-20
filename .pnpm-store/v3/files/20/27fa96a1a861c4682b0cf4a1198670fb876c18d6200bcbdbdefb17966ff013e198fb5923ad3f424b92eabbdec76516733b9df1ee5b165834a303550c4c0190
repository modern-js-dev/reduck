import { LAUNCH_EDITOR_ENDPOINT, logger } from '@modern-js/utils';
export const createLaunchEditorHandler = // eslint-disable-next-line consistent-return
() => (ctx, next) => {
  if (ctx.url.startsWith(LAUNCH_EDITOR_ENDPOINT)) {
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
        logger.error(`Launch ${file} in editor failed.\n${errorMessage}`);
      });

      ctx.status = 200;
      ctx.res.end();
    }
  } else {
    return next();
  }
};