function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

/**
 * An interface for a JavaScript object that
 * acts a dictionary. The keys are strings.
 */

/**
 * An interface for a JavaScript object that
 * acts a dictionary. The keys are numbers.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
/**
 * Traverse the collection with string or number as key
 * Allow element deletion during traversal
 *
 * @param from - Collection
 * @param callback - Process a single element, when it returns false, stop the traversal
 * @returns
 */

export function forEach(from, callback) {
  var _loop = function _loop(key) {
    if (hasOwnProperty.call(from, key)) {
      var result = callback({
        key: key,
        value: from[key]
      }, function () {
        delete from[key];
      });

      if (result === false) {
        return {
          v: void 0
        };
      }
    }
  };

  for (var key in from) {
    var _ret = _loop(key);

    if (_typeof(_ret) === "object") return _ret.v;
  }
}