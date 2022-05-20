// Todo 看看是不是能 fork 一份，即使命中也返回
import serve from 'serve-static';
import { isString, isRegExp } from '@modern-js/utils';
export const createStaticFileHandler = rules => // eslint-disable-next-line consistent-return
async (context, next) => {
  const {
    url: requestUrl,
    req,
    res
  } = context;
  const hitRule = rules.find(item => {
    if (isString(item.path) && requestUrl.startsWith(item.path)) {
      return true;
    } else if (isRegExp(item.path) && item.path.test(requestUrl)) {
      return true;
    }

    return false;
  });

  if (hitRule) {
    serve(hitRule.target)(req, res, () => {
      next();
    });
  } else {
    return next();
  }
};