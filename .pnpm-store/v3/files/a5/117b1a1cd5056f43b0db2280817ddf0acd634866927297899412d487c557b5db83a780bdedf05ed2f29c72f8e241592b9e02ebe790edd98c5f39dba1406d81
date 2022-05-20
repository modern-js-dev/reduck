"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * Module dependencies.
 */
// eslint-disable-next-line node/no-deprecated-api
var _require = require('url'),
    parse = _require.parse;

var _require2 = require('cookiejar'),
    CookieJar = _require2.CookieJar;

var _require3 = require('cookiejar'),
    CookieAccessInfo = _require3.CookieAccessInfo;

var methods = require('methods');

var request = require('../..');

var AgentBase = require('../agent-base');
/**
 * Expose `Agent`.
 */


module.exports = Agent;
/**
 * Initialize a new `Agent`.
 *
 * @api public
 */

function Agent(options) {
  if (!(this instanceof Agent)) {
    return new Agent(options);
  }

  AgentBase.call(this);
  this.jar = new CookieJar();

  if (options) {
    if (options.ca) {
      this.ca(options.ca);
    }

    if (options.key) {
      this.key(options.key);
    }

    if (options.pfx) {
      this.pfx(options.pfx);
    }

    if (options.cert) {
      this.cert(options.cert);
    }

    if (options.rejectUnauthorized === false) {
      this.disableTLSCerts();
    }
  }
}

Agent.prototype = Object.create(AgentBase.prototype);
/**
 * Save the cookies in the given `res` to
 * the agent's cookie jar for persistence.
 *
 * @param {Response} res
 * @api private
 */

Agent.prototype._saveCookies = function (res) {
  var cookies = res.headers['set-cookie'];
  if (cookies) this.jar.setCookies(cookies);
};
/**
 * Attach cookies when available to the given `req`.
 *
 * @param {Request} req
 * @api private
 */


Agent.prototype._attachCookies = function (request_) {
  var url = parse(request_.url);
  var access = new CookieAccessInfo(url.hostname, url.pathname, url.protocol === 'https:');
  var cookies = this.jar.getCookies(access).toValueString();
  request_.cookies = cookies;
};

var _iterator = _createForOfIteratorHelper(methods),
    _step;

try {
  var _loop = function _loop() {
    var name = _step.value;
    var method = name.toUpperCase();

    Agent.prototype[name] = function (url, fn) {
      var request_ = new request.Request(method, url);
      request_.on('response', this._saveCookies.bind(this));
      request_.on('redirect', this._saveCookies.bind(this));
      request_.on('redirect', this._attachCookies.bind(this, request_));

      this._setDefaults(request_);

      this._attachCookies(request_);

      if (fn) {
        request_.end(fn);
      }

      return request_;
    };
  };

  for (_iterator.s(); !(_step = _iterator.n()).done;) {
    _loop();
  }
} catch (err) {
  _iterator.e(err);
} finally {
  _iterator.f();
}

Agent.prototype.del = Agent.prototype.delete;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ub2RlL2FnZW50LmpzIl0sIm5hbWVzIjpbInJlcXVpcmUiLCJwYXJzZSIsIkNvb2tpZUphciIsIkNvb2tpZUFjY2Vzc0luZm8iLCJtZXRob2RzIiwicmVxdWVzdCIsIkFnZW50QmFzZSIsIm1vZHVsZSIsImV4cG9ydHMiLCJBZ2VudCIsIm9wdGlvbnMiLCJjYWxsIiwiamFyIiwiY2EiLCJrZXkiLCJwZngiLCJjZXJ0IiwicmVqZWN0VW5hdXRob3JpemVkIiwiZGlzYWJsZVRMU0NlcnRzIiwicHJvdG90eXBlIiwiT2JqZWN0IiwiY3JlYXRlIiwiX3NhdmVDb29raWVzIiwicmVzIiwiY29va2llcyIsImhlYWRlcnMiLCJzZXRDb29raWVzIiwiX2F0dGFjaENvb2tpZXMiLCJyZXF1ZXN0XyIsInVybCIsImFjY2VzcyIsImhvc3RuYW1lIiwicGF0aG5hbWUiLCJwcm90b2NvbCIsImdldENvb2tpZXMiLCJ0b1ZhbHVlU3RyaW5nIiwibmFtZSIsIm1ldGhvZCIsInRvVXBwZXJDYXNlIiwiZm4iLCJSZXF1ZXN0Iiwib24iLCJiaW5kIiwiX3NldERlZmF1bHRzIiwiZW5kIiwiZGVsIiwiZGVsZXRlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0EsZUFBa0JBLE9BQU8sQ0FBQyxLQUFELENBQXpCO0FBQUEsSUFBUUMsS0FBUixZQUFRQSxLQUFSOztBQUNBLGdCQUFzQkQsT0FBTyxDQUFDLFdBQUQsQ0FBN0I7QUFBQSxJQUFRRSxTQUFSLGFBQVFBLFNBQVI7O0FBQ0EsZ0JBQTZCRixPQUFPLENBQUMsV0FBRCxDQUFwQztBQUFBLElBQVFHLGdCQUFSLGFBQVFBLGdCQUFSOztBQUNBLElBQU1DLE9BQU8sR0FBR0osT0FBTyxDQUFDLFNBQUQsQ0FBdkI7O0FBQ0EsSUFBTUssT0FBTyxHQUFHTCxPQUFPLENBQUMsT0FBRCxDQUF2Qjs7QUFDQSxJQUFNTSxTQUFTLEdBQUdOLE9BQU8sQ0FBQyxlQUFELENBQXpCO0FBRUE7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QXdCLEtBQUtkLGNBQUwsQ0FBb0JlLElBQXBCLENBQXlCLElBQXpCLEVBQStCZCxRQUEvQixDQUF4Qjs7QUFDQSxXQUFLZSxZQUFMLENBQWtCZixRQUFsQjs7QUFDQSxXQUFLRCxjQUFMLENBQW9CQyxRQUFwQjs7QUFFQSxVQUFJVyxFQUFKLEVBQVE7QUFDTlgsUUFBQUEsUUFBUSxDQUFDZ0IsR0FBVCxDQUFhTCxFQUFiO0FBQ0Q7O0FBRUQsYUFBT1gsUUFBUDtBQUNELEtBZEQ7OztBQUZGLHNEQUE0QjtBQUFBO0FBaUIzQjs7Ozs7OztBQUVEbkIsS0FBSyxDQUFDVSxTQUFOLENBQWdCMEIsR0FBaEIsR0FBc0JwQyxLQUFLLENBQUNVLFNBQU4sQ0FBZ0IyQixNQUF0QyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogTW9kdWxlIGRlcGVuZGVuY2llcy5cbiAqL1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm9kZS9uby1kZXByZWNhdGVkLWFwaVxuY29uc3QgeyBwYXJzZSB9ID0gcmVxdWlyZSgndXJsJyk7XG5jb25zdCB7IENvb2tpZUphciB9ID0gcmVxdWlyZSgnY29va2llamFyJyk7XG5jb25zdCB7IENvb2tpZUFjY2Vzc0luZm8gfSA9IHJlcXVpcmUoJ2Nvb2tpZWphcicpO1xuY29uc3QgbWV0aG9kcyA9IHJlcXVpcmUoJ21ldGhvZHMnKTtcbmNvbnN0IHJlcXVlc3QgPSByZXF1aXJlKCcuLi8uLicpO1xuY29uc3QgQWdlbnRCYXNlID0gcmVxdWlyZSgnLi4vYWdlbnQtYmFzZScpO1xuXG4vKipcbiAqIEV4cG9zZSBgQWdlbnRgLlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gQWdlbnQ7XG5cbi8qKlxuICogSW5pdGlhbGl6ZSBhIG5ldyBgQWdlbnRgLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gQWdlbnQob3B0aW9ucykge1xuICBpZiAoISh0aGlzIGluc3RhbmNlb2YgQWdlbnQpKSB7XG4gICAgcmV0dXJuIG5ldyBBZ2VudChvcHRpb25zKTtcbiAgfVxuXG4gIEFnZW50QmFzZS5jYWxsKHRoaXMpO1xuICB0aGlzLmphciA9IG5ldyBDb29raWVKYXIoKTtcblxuICBpZiAob3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zLmNhKSB7XG4gICAgICB0aGlzLmNhKG9wdGlvbnMuY2EpO1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zLmtleSkge1xuICAgICAgdGhpcy5rZXkob3B0aW9ucy5rZXkpO1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zLnBmeCkge1xuICAgICAgdGhpcy5wZngob3B0aW9ucy5wZngpO1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zLmNlcnQpIHtcbiAgICAgIHRoaXMuY2VydChvcHRpb25zLmNlcnQpO1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zLnJlamVjdFVuYXV0aG9yaXplZCA9PT0gZmFsc2UpIHtcbiAgICAgIHRoaXMuZGlzYWJsZVRMU0NlcnRzKCk7XG4gICAgfVxuICB9XG59XG5cbkFnZW50LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoQWdlbnRCYXNlLnByb3RvdHlwZSk7XG5cbi8qKlxuICogU2F2ZSB0aGUgY29va2llcyBpbiB0aGUgZ2l2ZW4gYHJlc2AgdG9cbiAqIHRoZSBhZ2VudCdzIGNvb2tpZSBqYXIgZm9yIHBlcnNpc3RlbmNlLlxuICpcbiAqIEBwYXJhbSB7UmVzcG9uc2V9IHJlc1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxuQWdlbnQucHJvdG90eXBlLl9zYXZlQ29va2llcyA9IGZ1bmN0aW9uIChyZXMpIHtcbiAgY29uc3QgY29va2llcyA9IHJlcy5oZWFkZXJzWydzZXQtY29va2llJ107XG4gIGlmIChjb29raWVzKSB0aGlzLmphci5zZXRDb29raWVzKGNvb2tpZXMpO1xufTtcblxuLyoqXG4gKiBBdHRhY2ggY29va2llcyB3aGVuIGF2YWlsYWJsZSB0byB0aGUgZ2l2ZW4gYHJlcWAuXG4gKlxuICogQHBhcmFtIHtSZXF1ZXN0fSByZXFcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbkFnZW50LnByb3RvdHlwZS5fYXR0YWNoQ29va2llcyA9IGZ1bmN0aW9uIChyZXF1ZXN0Xykge1xuICBjb25zdCB1cmwgPSBwYXJzZShyZXF1ZXN0Xy51cmwpO1xuICBjb25zdCBhY2Nlc3MgPSBuZXcgQ29va2llQWNjZXNzSW5mbyhcbiAgICB1cmwuaG9zdG5hbWUsXG4gICAgdXJsLnBhdGhuYW1lLFxuICAgIHVybC5wcm90b2NvbCA9PT0gJ2h0dHBzOidcbiAgKTtcbiAgY29uc3QgY29va2llcyA9IHRoaXMuamFyLmdldENvb2tpZXMoYWNjZXNzKS50b1ZhbHVlU3RyaW5nKCk7XG4gIHJlcXVlc3RfLmNvb2tpZXMgPSBjb29raWVzO1xufTtcblxuZm9yIChjb25zdCBuYW1lIG9mIG1ldGhvZHMpIHtcbiAgY29uc3QgbWV0aG9kID0gbmFtZS50b1VwcGVyQ2FzZSgpO1xuICBBZ2VudC5wcm90b3R5cGVbbmFtZV0gPSBmdW5jdGlvbiAodXJsLCBmbikge1xuICAgIGNvbnN0IHJlcXVlc3RfID0gbmV3IHJlcXVlc3QuUmVxdWVzdChtZXRob2QsIHVybCk7XG5cbiAgICByZXF1ZXN0Xy5vbigncmVzcG9uc2UnLCB0aGlzLl9zYXZlQ29va2llcy5iaW5kKHRoaXMpKTtcbiAgICByZXF1ZXN0Xy5vbigncmVkaXJlY3QnLCB0aGlzLl9zYXZlQ29va2llcy5iaW5kKHRoaXMpKTtcbiAgICByZXF1ZXN0Xy5vbigncmVkaXJlY3QnLCB0aGlzLl9hdHRhY2hDb29raWVzLmJpbmQodGhpcywgcmVxdWVzdF8pKTtcbiAgICB0aGlzLl9zZXREZWZhdWx0cyhyZXF1ZXN0Xyk7XG4gICAgdGhpcy5fYXR0YWNoQ29va2llcyhyZXF1ZXN0Xyk7XG5cbiAgICBpZiAoZm4pIHtcbiAgICAgIHJlcXVlc3RfLmVuZChmbik7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlcXVlc3RfO1xuICB9O1xufVxuXG5BZ2VudC5wcm90b3R5cGUuZGVsID0gQWdlbnQucHJvdG90eXBlLmRlbGV0ZTtcbiJdfQ==