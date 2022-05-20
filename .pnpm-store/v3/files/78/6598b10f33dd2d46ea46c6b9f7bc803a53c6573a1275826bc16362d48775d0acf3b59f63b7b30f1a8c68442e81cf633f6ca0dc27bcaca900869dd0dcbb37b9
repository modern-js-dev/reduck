"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nodeRequire = void 0;

/**
 * requier function support webpack require
 * @param {string} path
 * @returns {unknown}
 */
const nodeRequire = path => {
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

exports.nodeRequire = nodeRequire;