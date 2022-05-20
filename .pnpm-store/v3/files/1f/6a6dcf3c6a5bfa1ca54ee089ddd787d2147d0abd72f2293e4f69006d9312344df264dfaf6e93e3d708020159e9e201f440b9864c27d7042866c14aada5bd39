"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * Return the mime type for the given `str`.
 *
 * @param {String} str
 * @return {String}
 * @api private
 */
exports.type = function (string_) {
  return string_.split(/ *; */).shift();
};
/**
 * Return header field parameters.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */


exports.params = function (value) {
  var object = {};

  var _iterator = _createForOfIteratorHelper(value.split(/ *; */)),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var string_ = _step.value;
      var parts = string_.split(/ *= */);
      var key = parts.shift();

      var _value = parts.shift();

      if (key && _value) object[key] = _value;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return object;
};
/**
 * Parse Link header fields.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */


exports.parseLinks = function (value) {
  var object = {};

  var _iterator2 = _createForOfIteratorHelper(value.split(/ *, */)),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var string_ = _step2.value;
      var parts = string_.split(/ *; */);
      var url = parts[0].slice(1, -1);
      var rel = parts[1].split(/ *= */)[1].slice(1, -1);
      object[rel] = url;
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }

  return object;
};
/**
 * Strip content related fields from `header`.
 *
 * @param {Object} header
 * @return {Object} header
 * @api private
 */


exports.cleanHeader = function (header, changesOrigin) {
  delete header['content-type'];
  delete header['content-length'];
  delete header['transfer-encoding'];
  delete header.host; // secuirty

  if (changesOrigin) {
    delete header.authorization;
    delete header.cookie;
  }

  return header;
};
/**
 * Check if `obj` is an object.
 *
 * @param {Object} object
 * @return {Boolean}
 * @api private
 */


exports.isObject = function (object) {
  return object !== null && _typeof(object) === 'object';
};
/**
 * Object.hasOwn fallback/polyfill.
 *
 * @type {(object: object, property: string) => boolean} object
 * @api private
 */


exports.hasOwn = Object.hasOwn || function (object, property) {
  if (object == null) {
    throw new TypeError('Cannot convert undefined or null to object');
  }

  return Object.prototype.hasOwnProperty.call(new Object(object), property);
};

exports.mixin = function (target, source) {
  for (var key in source) {
    if (exports.hasOwn(source, key)) {
      target[key] = source[key];
    }
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91dGlscy5qcyJdLCJuYW1lcyI6WyJleHBvcnRzIiwidHlwZSIsInN0cmluZ18iLCJzcGxpdCIsInNoaWZ0IiwicGFyYW1zIiwidmFsdWUiLCJvYmplY3QiLCJwYXJ0cyIsImtleSIsInBhcnNlTGlua3MiLCJ1cmwiLCJzbGljZSIsInJlbCIsImNsZWFuSGVhZGVyIiwiaGVhZGVyIiwiY2hhbmdlc09yaWdpbiIsImhvc3QiLCJhdXRob3JpemF0aW9uIiwiY29va2llIiwiaXNPYmplY3QiLCJoYXNPd24iLCJPYmplY3QiLCJwcm9wZXJ0eSIsIlR5cGVFcnJvciIsInByb3RvdHlwZSIsImhhc093blByb3BlcnR5IiwiY2FsbCIsIm1peGluIiwidGFyZ2V0Iiwic291cmNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQUEsT0FBTyxDQUFDQyxJQUFSLEdBQWUsVUFBQ0MsT0FBRDtBQUFBLFNBQWFBLE9BQU8sQ0FBQ0MsS0FBUixDQUFjLE9BQWQsRUFBdUJDLEtBQXZCLEVBQWI7QUFBQSxDQUFmO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBSixPQUFPLENBQUNLLE1BQVIsR0FBaUIsVUFBQ0MsS0FBRCxFQUFXO0FBQzFCLE1BQU1DLE1BQU0sR0FBRyxFQUFmOztBQUQwQiw2Q0FFSkQsS0FBSyxDQUFDSCxLQUFOLENBQVksT0FBWixDQUZJO0FBQUE7O0FBQUE7QUFFMUIsd0RBQTRDO0FBQUEsVUFBakNELE9BQWlDO0FBQzFDLFVBQU1NLEtBQUssR0FBR04sT0FBTyxDQUFDQyxLQUFSLENBQWMsT0FBZCxDQUFkO0FBQ0EsVUFBTU0sR0FBRyxHQUFHRCxLQUFLLENBQUNKLEtBQU4sRUFBWjs7QUFDQSxVQUFNRSxNQUFLLEdBQUdFLEtBQUssQ0FBQ0osS0FBTixFQUFkOztBQUVBLFVBQUlLLEdBQUcsSUFBSUgsTUFBWCxFQUFrQkMsTUFBTSxDQUFDRSxHQUFELENBQU4sR0FBY0gsTUFBZDtBQUNuQjtBQVJ5QjtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQVUxQixTQUFPQyxNQUFQO0FBQ0QsQ0FYRDtBQWFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQVAsT0FBTyxDQUFDVSxVQUFSLEdBQXFCLFVBQUNKLEtBQUQsRUFBVztBQUM5QixNQUFNQyxNQUFNLEdBQUcsRUFBZjs7QUFEOEIsOENBRVJELEtBQUssQ0FBQ0gsS0FBTixDQUFZLE9BQVosQ0FGUTtBQUFBOztBQUFBO0FBRTlCLDJEQUE0QztBQUFBLFVBQWpDRCxPQUFpQztBQUMxQyxVQUFNTSxLQUFLLEdBQUdOLE9BQU8sQ0FBQ0MsS0FBUixDQUFjLE9BQWQsQ0FBZDtBQUNBLFVBQU1RLEdBQUcsR0FBR0gsS0FBSyxDQUFDLENBQUQsQ0FBTCxDQUFTSSxLQUFULENBQWUsQ0FBZixFQUFrQixDQUFDLENBQW5CLENBQVo7QUFDQSxVQUFNQyxHQUFHLEdBQUdMLEtBQUssQ0FBQyxDQUFELENBQUwsQ0FBU0wsS0FBVCxDQUFlLE9BQWYsRUFBd0IsQ0FBeEIsRUFBMkJTLEtBQTNCLENBQWlDLENBQWpDLEVBQW9DLENBQUMsQ0FBckMsQ0FBWjtBQUNBTCxNQUFBQSxNQUFNLENBQUNNLEdBQUQsQ0FBTixHQUFjRixHQUFkO0FBQ0Q7QUFQNkI7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFTOUIsU0FBT0osTUFBUDtBQUNELENBVkQ7QUFZQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUFQLE9BQU8sQ0FBQ2MsV0FBUixHQUFzQixVQUFDQyxNQUFELEVBQVNDLGFBQVQsRUFBMkI7QUFDL0MsU0FBT0QsTUFBTSxDQUFDLGNBQUQsQ0FBYjtBQUNBLFNBQU9BLE1BQU0sQ0FBQyxnQkFBRCxDQUFiO0FBQ0EsU0FBT0EsTUFBTSxDQUFDLG1CQUFELENBQWI7QUFDQSxTQUFPQSxNQUFNLENBQUNFLElBQWQsQ0FKK0MsQ0FLL0M7O0FBQ0EsTUFBSUQsYUFBSixFQUFtQjtBQUNqQixXQUFPRCxNQUFNLENBQUNHLGFBQWQ7QUFDQSxXQUFPSCxNQUFNLENBQUNJLE1BQWQ7QUFDRDs7QUFFRCxTQUFPSixNQUFQO0FBQ0QsQ0FaRDtBQWNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQWYsT0FBTyxDQUFDb0IsUUFBUixHQUFtQixVQUFDYixNQUFELEVBQVk7QUFDN0IsU0FBT0EsTUFBTSxLQUFLLElBQVgsSUFBbUIsUUFBT0EsTUFBUCxNQUFrQixRQUE1QztBQUNELENBRkQ7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBUCxPQUFPLENBQUNxQixNQUFSLEdBQ0VDLE1BQU0sQ0FBQ0QsTUFBUCxJQUNBLFVBQVVkLE1BQVYsRUFBa0JnQixRQUFsQixFQUE0QjtBQUMxQixNQUFJaEIsTUFBTSxJQUFJLElBQWQsRUFBb0I7QUFDbEIsVUFBTSxJQUFJaUIsU0FBSixDQUFjLDRDQUFkLENBQU47QUFDRDs7QUFFRCxTQUFPRixNQUFNLENBQUNHLFNBQVAsQ0FBaUJDLGNBQWpCLENBQWdDQyxJQUFoQyxDQUFxQyxJQUFJTCxNQUFKLENBQVdmLE1BQVgsQ0FBckMsRUFBeURnQixRQUF6RCxDQUFQO0FBQ0QsQ0FSSDs7QUFVQXZCLE9BQU8sQ0FBQzRCLEtBQVIsR0FBZ0IsVUFBQ0MsTUFBRCxFQUFTQyxNQUFULEVBQW9CO0FBQ2xDLE9BQUssSUFBTXJCLEdBQVgsSUFBa0JxQixNQUFsQixFQUEwQjtBQUN4QixRQUFJOUIsT0FBTyxDQUFDcUIsTUFBUixDQUFlUyxNQUFmLEVBQXVCckIsR0FBdkIsQ0FBSixFQUFpQztBQUMvQm9CLE1BQUFBLE1BQU0sQ0FBQ3BCLEdBQUQsQ0FBTixHQUFjcUIsTUFBTSxDQUFDckIsR0FBRCxDQUFwQjtBQUNEO0FBQ0Y7QUFDRixDQU5EIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBSZXR1cm4gdGhlIG1pbWUgdHlwZSBmb3IgdGhlIGdpdmVuIGBzdHJgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmV4cG9ydHMudHlwZSA9IChzdHJpbmdfKSA9PiBzdHJpbmdfLnNwbGl0KC8gKjsgKi8pLnNoaWZ0KCk7XG5cbi8qKlxuICogUmV0dXJuIGhlYWRlciBmaWVsZCBwYXJhbWV0ZXJzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmV4cG9ydHMucGFyYW1zID0gKHZhbHVlKSA9PiB7XG4gIGNvbnN0IG9iamVjdCA9IHt9O1xuICBmb3IgKGNvbnN0IHN0cmluZ18gb2YgdmFsdWUuc3BsaXQoLyAqOyAqLykpIHtcbiAgICBjb25zdCBwYXJ0cyA9IHN0cmluZ18uc3BsaXQoLyAqPSAqLyk7XG4gICAgY29uc3Qga2V5ID0gcGFydHMuc2hpZnQoKTtcbiAgICBjb25zdCB2YWx1ZSA9IHBhcnRzLnNoaWZ0KCk7XG5cbiAgICBpZiAoa2V5ICYmIHZhbHVlKSBvYmplY3Rba2V5XSA9IHZhbHVlO1xuICB9XG5cbiAgcmV0dXJuIG9iamVjdDtcbn07XG5cbi8qKlxuICogUGFyc2UgTGluayBoZWFkZXIgZmllbGRzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmV4cG9ydHMucGFyc2VMaW5rcyA9ICh2YWx1ZSkgPT4ge1xuICBjb25zdCBvYmplY3QgPSB7fTtcbiAgZm9yIChjb25zdCBzdHJpbmdfIG9mIHZhbHVlLnNwbGl0KC8gKiwgKi8pKSB7XG4gICAgY29uc3QgcGFydHMgPSBzdHJpbmdfLnNwbGl0KC8gKjsgKi8pO1xuICAgIGNvbnN0IHVybCA9IHBhcnRzWzBdLnNsaWNlKDEsIC0xKTtcbiAgICBjb25zdCByZWwgPSBwYXJ0c1sxXS5zcGxpdCgvICo9ICovKVsxXS5zbGljZSgxLCAtMSk7XG4gICAgb2JqZWN0W3JlbF0gPSB1cmw7XG4gIH1cblxuICByZXR1cm4gb2JqZWN0O1xufTtcblxuLyoqXG4gKiBTdHJpcCBjb250ZW50IHJlbGF0ZWQgZmllbGRzIGZyb20gYGhlYWRlcmAuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGhlYWRlclxuICogQHJldHVybiB7T2JqZWN0fSBoZWFkZXJcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmV4cG9ydHMuY2xlYW5IZWFkZXIgPSAoaGVhZGVyLCBjaGFuZ2VzT3JpZ2luKSA9PiB7XG4gIGRlbGV0ZSBoZWFkZXJbJ2NvbnRlbnQtdHlwZSddO1xuICBkZWxldGUgaGVhZGVyWydjb250ZW50LWxlbmd0aCddO1xuICBkZWxldGUgaGVhZGVyWyd0cmFuc2Zlci1lbmNvZGluZyddO1xuICBkZWxldGUgaGVhZGVyLmhvc3Q7XG4gIC8vIHNlY3VpcnR5XG4gIGlmIChjaGFuZ2VzT3JpZ2luKSB7XG4gICAgZGVsZXRlIGhlYWRlci5hdXRob3JpemF0aW9uO1xuICAgIGRlbGV0ZSBoZWFkZXIuY29va2llO1xuICB9XG5cbiAgcmV0dXJuIGhlYWRlcjtcbn07XG5cbi8qKlxuICogQ2hlY2sgaWYgYG9iamAgaXMgYW4gb2JqZWN0LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3RcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuZXhwb3J0cy5pc09iamVjdCA9IChvYmplY3QpID0+IHtcbiAgcmV0dXJuIG9iamVjdCAhPT0gbnVsbCAmJiB0eXBlb2Ygb2JqZWN0ID09PSAnb2JqZWN0Jztcbn07XG5cbi8qKlxuICogT2JqZWN0Lmhhc093biBmYWxsYmFjay9wb2x5ZmlsbC5cbiAqXG4gKiBAdHlwZSB7KG9iamVjdDogb2JqZWN0LCBwcm9wZXJ0eTogc3RyaW5nKSA9PiBib29sZWFufSBvYmplY3RcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5leHBvcnRzLmhhc093biA9XG4gIE9iamVjdC5oYXNPd24gfHxcbiAgZnVuY3Rpb24gKG9iamVjdCwgcHJvcGVydHkpIHtcbiAgICBpZiAob2JqZWN0ID09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjb252ZXJ0IHVuZGVmaW5lZCBvciBudWxsIHRvIG9iamVjdCcpO1xuICAgIH1cblxuICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobmV3IE9iamVjdChvYmplY3QpLCBwcm9wZXJ0eSk7XG4gIH07XG5cbmV4cG9ydHMubWl4aW4gPSAodGFyZ2V0LCBzb3VyY2UpID0+IHtcbiAgZm9yIChjb25zdCBrZXkgaW4gc291cmNlKSB7XG4gICAgaWYgKGV4cG9ydHMuaGFzT3duKHNvdXJjZSwga2V5KSkge1xuICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICB9XG4gIH1cbn07XG4iXX0=