declare function __non_webpack_require__(path: string): any;

/**
 * requier function support webpack require
 * @param {string} path
 * @returns {unknown}
 */
export const nodeRequire = (path: string) => {
  try {
    const module = __non_webpack_require__(path);
    if (module?.default) {
      return module.default;
    }
    return module;
  } catch (error) {
    const module = require(path);
    if (module?.default) {
      return module.default;
    }
    return module;
  }
};
