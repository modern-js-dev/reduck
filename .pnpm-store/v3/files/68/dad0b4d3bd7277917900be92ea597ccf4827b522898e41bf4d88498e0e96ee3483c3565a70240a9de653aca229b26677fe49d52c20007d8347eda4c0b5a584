/**
 * requier function support webpack require
 * @param {string} path
 * @returns {unknown}
 */
export const nodeRequire = path => {
  try {
    const module = __non_webpack_require__(path);

    if (module !== null && module !== void 0 && module.default) {
      return module.default;
    }

    return module;
  } catch (error) {
    const module = require(path);

    if (module !== null && module !== void 0 && module.default) {
      return module.default;
    }

    return module;
  }
};