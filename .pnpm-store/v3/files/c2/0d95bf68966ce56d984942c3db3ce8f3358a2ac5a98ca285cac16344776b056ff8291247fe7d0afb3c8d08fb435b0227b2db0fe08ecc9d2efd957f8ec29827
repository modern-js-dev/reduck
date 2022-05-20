"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.forEach = forEach;

/**
 * An interface for a JavaScript object that
 * acts a dictionary. The keys are strings.
 */

/**
 * An interface for a JavaScript object that
 * acts a dictionary. The keys are numbers.
 */
const {
  hasOwnProperty
} = Object.prototype;
/**
 * Traverse the collection with string or number as key
 * Allow element deletion during traversal
 *
 * @param from - Collection
 * @param callback - Process a single element, when it returns false, stop the traversal
 * @returns
 */

function forEach(from, callback) {
  for (const key in from) {
    if (hasOwnProperty.call(from, key)) {
      const result = callback({
        key,
        value: from[key]
      }, () => {
        delete from[key];
      });

      if (result === false) {
        return;
      }
    }
  }
}