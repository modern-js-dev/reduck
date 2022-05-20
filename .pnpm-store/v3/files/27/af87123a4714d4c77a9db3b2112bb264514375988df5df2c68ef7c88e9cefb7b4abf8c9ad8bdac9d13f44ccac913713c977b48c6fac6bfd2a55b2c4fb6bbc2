"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var semver = require('semver');
/**
 * Module of mixed-in functions shared between node and client code
 */


var _require = require('./utils'),
    isObject = _require.isObject,
    hasOwn = _require.hasOwn;
/**
 * Expose `RequestBase`.
 */


module.exports = RequestBase;
/**
 * Initialize a new `RequestBase`.
 *
 * @api public
 */

function RequestBase() {}
/**
 * Clear previous timeout.
 *
 * @return {Request} for chaining
 * @api public
 */


RequestBase.prototype.clearTimeout = function () {
  clearTimeout(this._timer);
  clearTimeout(this._responseTimeoutTimer);
  clearTimeout(this._uploadTimeoutTimer);
  delete this._timer;
  delete this._responseTimeoutTimer;
  delete this._uploadTimeoutTimer;
  return this;
};
/**
 * Override default response body parser
 *
 * This function will be called to convert incoming data into request.body
 *
 * @param {Function}
 * @api public
 */


RequestBase.prototype.parse = function (fn) {
  this._parser = fn;
  return this;
};
/**
 * Set format of binary response body.
 * In browser valid formats are 'blob' and 'arraybuffer',
 * which return Blob and ArrayBuffer, respectively.
 *
 * In Node all values result in Buffer.
 *
 * Examples:
 *
 *      req.get('/')
 *        .responseType('blob')
 *        .end(callback);
 *
 * @param {String} val
 * @return {Request} for chaining
 * @api public
 */


RequestBase.prototype.responseType = function (value) {
  this._responseType = value;
  return this;
};
/**
 * Override default request body serializer
 *
 * This function will be called to convert data set via .send or .attach into payload to send
 *
 * @param {Function}
 * @api public
 */


RequestBase.prototype.serialize = function (fn) {
  this._serializer = fn;
  return this;
};
/**
 * Set timeouts.
 *
 * - response timeout is time between sending request and receiving the first byte of the response. Includes DNS and connection time.
 * - deadline is the time from start of the request to receiving response body in full. If the deadline is too short large files may not load at all on slow connections.
 * - upload is the time  since last bit of data was sent or received. This timeout works only if deadline timeout is off
 *
 * Value of 0 or false means no timeout.
 *
 * @param {Number|Object} ms or {response, deadline}
 * @return {Request} for chaining
 * @api public
 */


RequestBase.prototype.timeout = function (options) {
  if (!options || _typeof(options) !== 'object') {
    this._timeout = options;
    this._responseTimeout = 0;
    this._uploadTimeout = 0;
    return this;
  }

  for (var option in options) {
    if (hasOwn(options, option)) {
      switch (option) {
        case 'deadline':
          this._timeout = options.deadline;
          break;

        case 'response':
          this._responseTimeout = options.response;
          break;

        case 'upload':
          this._uploadTimeout = options.upload;
          break;

        default:
          console.warn('Unknown timeout option', option);
      }
    }
  }

  return this;
};
/**
 * Set number of retry attempts on error.
 *
 * Failed requests will be retried 'count' times if timeout or err.code >= 500.
 *
 * @param {Number} count
 * @param {Function} [fn]
 * @return {Request} for chaining
 * @api public
 */


RequestBase.prototype.retry = function (count, fn) {
  // Default to 1 if no count passed or true
  if (arguments.length === 0 || count === true) count = 1;
  if (count <= 0) count = 0;
  this._maxRetries = count;
  this._retries = 0;
  this._retryCallback = fn;
  return this;
}; //
// NOTE: we do not include ESOCKETTIMEDOUT because that is from `request` package
//       <https://github.com/sindresorhus/got/pull/537>
//
// NOTE: we do not include EADDRINFO because it was removed from libuv in 2014
//       <https://github.com/libuv/libuv/commit/02e1ebd40b807be5af46343ea873331b2ee4e9c1>
//       <https://github.com/request/request/search?q=ESOCKETTIMEDOUT&unscoped_q=ESOCKETTIMEDOUT>
//
//
// TODO: expose these as configurable defaults
//


var ERROR_CODES = new Set(['ETIMEDOUT', 'ECONNRESET', 'EADDRINUSE', 'ECONNREFUSED', 'EPIPE', 'ENOTFOUND', 'ENETUNREACH', 'EAI_AGAIN']);
var STATUS_CODES = new Set([408, 413, 429, 500, 502, 503, 504, 521, 522, 524]); // TODO: we would need to make this easily configurable before adding it in (e.g. some might want to add POST)
// const METHODS = new Set(['GET', 'PUT', 'HEAD', 'DELETE', 'OPTIONS', 'TRACE']);

/**
 * Determine if a request should be retried.
 * (Inspired by https://github.com/sindresorhus/got#retry)
 *
 * @param {Error} err an error
 * @param {Response} [res] response
 * @returns {Boolean} if segment should be retried
 */

RequestBase.prototype._shouldRetry = function (error, res) {
  if (!this._maxRetries || this._retries++ >= this._maxRetries) {
    return false;
  }

  if (this._retryCallback) {
    try {
      var override = this._retryCallback(error, res);

      if (override === true) return true;
      if (override === false) return false; // undefined falls back to defaults
    } catch (err) {
      console.error(err);
    }
  } // TODO: we would need to make this easily configurable before adding it in (e.g. some might want to add POST)

  /*
  if (
    this.req &&
    this.req.method &&
    !METHODS.has(this.req.method.toUpperCase())
  )
    return false;
  */


  if (res && res.status && STATUS_CODES.has(res.status)) return true;

  if (error) {
    if (error.code && ERROR_CODES.has(error.code)) return true; // Superagent timeout

    if (error.timeout && error.code === 'ECONNABORTED') return true;
    if (error.crossDomain) return true;
  }

  return false;
};
/**
 * Retry request
 *
 * @return {Request} for chaining
 * @api private
 */


RequestBase.prototype._retry = function () {
  this.clearTimeout(); // node

  if (this.req) {
    this.req = null;
    this.req = this.request();
  }

  this._aborted = false;
  this.timedout = false;
  this.timedoutError = null;
  return this._end();
};
/**
 * Promise support
 *
 * @param {Function} resolve
 * @param {Function} [reject]
 * @return {Request}
 */


RequestBase.prototype.then = function (resolve, reject) {
  var _this = this;

  if (!this._fullfilledPromise) {
    var self = this;

    if (this._endCalled) {
      console.warn('Warning: superagent request was sent twice, because both .end() and .then() were called. Never call .end() if you use promises');
    }

    this._fullfilledPromise = new Promise(function (resolve, reject) {
      self.on('abort', function () {
        if (_this._maxRetries && _this._maxRetries > _this._retries) {
          return;
        }

        if (_this.timedout && _this.timedoutError) {
          reject(_this.timedoutError);
          return;
        }

        var error = new Error('Aborted');
        error.code = 'ABORTED';
        error.status = _this.status;
        error.method = _this.method;
        error.url = _this.url;
        reject(error);
      });
      self.end(function (error, res) {
        if (error) reject(error);else resolve(res);
      });
    });
  }

  return this._fullfilledPromise.then(resolve, reject);
};

RequestBase.prototype.catch = function (callback) {
  return this.then(undefined, callback);
};
/**
 * Allow for extension
 */


RequestBase.prototype.use = function (fn) {
  fn(this);
  return this;
};

RequestBase.prototype.ok = function (callback) {
  if (typeof callback !== 'function') throw new Error('Callback required');
  this._okCallback = callback;
  return this;
};

RequestBase.prototype._isResponseOK = function (res) {
  if (!res) {
    return false;
  }

  if (this._okCallback) {
    return this._okCallback(res);
  }

  return res.status >= 200 && res.status < 300;
};
/**
 * Get request header `field`.
 * Case-insensitive.
 *
 * @param {String} field
 * @return {String}
 * @api public
 */


RequestBase.prototype.get = function (field) {
  return this._header[field.toLowerCase()];
};
/**
 * Get case-insensitive header `field` value.
 * This is a deprecated internal API. Use `.get(field)` instead.
 *
 * (getHeader is no longer used internally by the superagent code base)
 *
 * @param {String} field
 * @return {String}
 * @api private
 * @deprecated
 */


RequestBase.prototype.getHeader = RequestBase.prototype.get;
/**
 * Set header `field` to `val`, or multiple fields with one object.
 * Case-insensitive.
 *
 * Examples:
 *
 *      req.get('/')
 *        .set('Accept', 'application/json')
 *        .set('X-API-Key', 'foobar')
 *        .end(callback);
 *
 *      req.get('/')
 *        .set({ Accept: 'application/json', 'X-API-Key': 'foobar' })
 *        .end(callback);
 *
 * @param {String|Object} field
 * @param {String} val
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.set = function (field, value) {
  if (isObject(field)) {
    for (var key in field) {
      if (hasOwn(field, key)) this.set(key, field[key]);
    }

    return this;
  }

  this._header[field.toLowerCase()] = value;
  this.header[field] = value;
  return this;
};
/**
 * Remove header `field`.
 * Case-insensitive.
 *
 * Example:
 *
 *      req.get('/')
 *        .unset('User-Agent')
 *        .end(callback);
 *
 * @param {String} field field name
 */


RequestBase.prototype.unset = function (field) {
  delete this._header[field.toLowerCase()];
  delete this.header[field];
  return this;
};
/**
 * Write the field `name` and `val`, or multiple fields with one object
 * for "multipart/form-data" request bodies.
 *
 * ``` js
 * request.post('/upload')
 *   .field('foo', 'bar')
 *   .end(callback);
 *
 * request.post('/upload')
 *   .field({ foo: 'bar', baz: 'qux' })
 *   .end(callback);
 * ```
 *
 * @param {String|Object} name name of field
 * @param {String|Blob|File|Buffer|fs.ReadStream} val value of field
 * @param {String} options extra options, e.g. 'blob'
 * @return {Request} for chaining
 * @api public
 */


RequestBase.prototype.field = function (name, value, options) {
  // name should be either a string or an object.
  if (name === null || undefined === name) {
    throw new Error('.field(name, val) name can not be empty');
  }

  if (this._data) {
    throw new Error(".field() can't be used if .send() is used. Please use only .send() or only .field() & .attach()");
  }

  if (isObject(name)) {
    for (var key in name) {
      if (hasOwn(name, key)) this.field(key, name[key]);
    }

    return this;
  }

  if (Array.isArray(value)) {
    for (var i in value) {
      if (hasOwn(value, i)) this.field(name, value[i]);
    }

    return this;
  } // val should be defined now


  if (value === null || undefined === value) {
    throw new Error('.field(name, val) val can not be empty');
  }

  if (typeof value === 'boolean') {
    value = String(value);
  }

  this._getFormData().append(name, value, options);

  return this;
};
/**
 * Abort the request, and clear potential timeout.
 *
 * @return {Request} request
 * @api public
 */


RequestBase.prototype.abort = function () {
  if (this._aborted) {
    return this;
  }

  this._aborted = true;
  if (this.xhr) this.xhr.abort(); // browser

  if (this.req) {
    // Node v13 has major differences in `abort()`
    // https://github.com/nodejs/node/blob/v12.x/lib/internal/streams/end-of-stream.js
    // https://github.com/nodejs/node/blob/v13.x/lib/internal/streams/end-of-stream.js
    // https://github.com/nodejs/node/blob/v14.x/lib/internal/streams/end-of-stream.js
    // (if you run a diff across these you will see the differences)
    //
    // References:
    // <https://github.com/nodejs/node/issues/31630>
    // <https://github.com/visionmedia/superagent/pull/1084/commits/dc18679a7c5ccfc6046d882015e5126888973bc8>
    //
    // Thanks to @shadowgate15 and @niftylettuce
    if (semver.gte(process.version, 'v13.0.0') && semver.lt(process.version, 'v14.0.0')) {
      // Note that the reason this doesn't work is because in v13 as compared to v14
      // there is no `callback = nop` set in end-of-stream.js above
      throw new Error('Superagent does not work in v13 properly with abort() due to Node.js core changes');
    } else if (semver.gte(process.version, 'v14.0.0')) {
      // We have to manually set `destroyed` to `true` in order for this to work
      // (see core internals of end-of-stream.js above in v14 branch as compared to v12)
      this.req.destroyed = true;
    }

    this.req.abort(); // node
  }

  this.clearTimeout();
  this.emit('abort');
  return this;
};

RequestBase.prototype._auth = function (user, pass, options, base64Encoder) {
  switch (options.type) {
    case 'basic':
      this.set('Authorization', "Basic ".concat(base64Encoder("".concat(user, ":").concat(pass))));
      break;

    case 'auto':
      this.username = user;
      this.password = pass;
      break;

    case 'bearer':
      // usage would be .auth(accessToken, { type: 'bearer' })
      this.set('Authorization', "Bearer ".concat(user));
      break;

    default:
      break;
  }

  return this;
};
/**
 * Enable transmission of cookies with x-domain requests.
 *
 * Note that for this to work the origin must not be
 * using "Access-Control-Allow-Origin" with a wildcard,
 * and also must set "Access-Control-Allow-Credentials"
 * to "true".
 *
 * @api public
 */


RequestBase.prototype.withCredentials = function (on) {
  // This is browser-only functionality. Node side is no-op.
  if (on === undefined) on = true;
  this._withCredentials = on;
  return this;
};
/**
 * Set the max redirects to `n`. Does nothing in browser XHR implementation.
 *
 * @param {Number} n
 * @return {Request} for chaining
 * @api public
 */


RequestBase.prototype.redirects = function (n) {
  this._maxRedirects = n;
  return this;
};
/**
 * Maximum size of buffered response body, in bytes. Counts uncompressed size.
 * Default 200MB.
 *
 * @param {Number} n number of bytes
 * @return {Request} for chaining
 */


RequestBase.prototype.maxResponseSize = function (n) {
  if (typeof n !== 'number') {
    throw new TypeError('Invalid argument');
  }

  this._maxResponseSize = n;
  return this;
};
/**
 * Convert to a plain javascript object (not JSON string) of scalar properties.
 * Note as this method is designed to return a useful non-this value,
 * it cannot be chained.
 *
 * @return {Object} describing method, url, and data of this request
 * @api public
 */


RequestBase.prototype.toJSON = function () {
  return {
    method: this.method,
    url: this.url,
    data: this._data,
    headers: this._header
  };
};
/**
 * Send `data` as the request body, defaulting the `.type()` to "json" when
 * an object is given.
 *
 * Examples:
 *
 *       // manual json
 *       request.post('/user')
 *         .type('json')
 *         .send('{"name":"tj"}')
 *         .end(callback)
 *
 *       // auto json
 *       request.post('/user')
 *         .send({ name: 'tj' })
 *         .end(callback)
 *
 *       // manual x-www-form-urlencoded
 *       request.post('/user')
 *         .type('form')
 *         .send('name=tj')
 *         .end(callback)
 *
 *       // auto x-www-form-urlencoded
 *       request.post('/user')
 *         .type('form')
 *         .send({ name: 'tj' })
 *         .end(callback)
 *
 *       // defaults to x-www-form-urlencoded
 *      request.post('/user')
 *        .send('name=tobi')
 *        .send('species=ferret')
 *        .end(callback)
 *
 * @param {String|Object} data
 * @return {Request} for chaining
 * @api public
 */
// eslint-disable-next-line complexity


RequestBase.prototype.send = function (data) {
  var isObject_ = isObject(data);
  var type = this._header['content-type'];

  if (this._formData) {
    throw new Error(".send() can't be used if .attach() or .field() is used. Please use only .send() or only .field() & .attach()");
  }

  if (isObject_ && !this._data) {
    if (Array.isArray(data)) {
      this._data = [];
    } else if (!this._isHost(data)) {
      this._data = {};
    }
  } else if (data && this._data && this._isHost(this._data)) {
    throw new Error("Can't merge these send calls");
  } // merge


  if (isObject_ && isObject(this._data)) {
    for (var key in data) {
      if (hasOwn(data, key)) this._data[key] = data[key];
    }
  } else if (typeof data === 'string') {
    // default to x-www-form-urlencoded
    if (!type) this.type('form');
    type = this._header['content-type'];
    if (type) type = type.toLowerCase().trim();

    if (type === 'application/x-www-form-urlencoded') {
      this._data = this._data ? "".concat(this._data, "&").concat(data) : data;
    } else {
      this._data = (this._data || '') + data;
    }
  } else {
    this._data = data;
  }

  if (!isObject_ || this._isHost(data)) {
    return this;
  } // default to json


  if (!type) this.type('json');
  return this;
};
/**
 * Sort `querystring` by the sort function
 *
 *
 * Examples:
 *
 *       // default order
 *       request.get('/user')
 *         .query('name=Nick')
 *         .query('search=Manny')
 *         .sortQuery()
 *         .end(callback)
 *
 *       // customized sort function
 *       request.get('/user')
 *         .query('name=Nick')
 *         .query('search=Manny')
 *         .sortQuery(function(a, b){
 *           return a.length - b.length;
 *         })
 *         .end(callback)
 *
 *
 * @param {Function} sort
 * @return {Request} for chaining
 * @api public
 */


RequestBase.prototype.sortQuery = function (sort) {
  // _sort default to true but otherwise can be a function or boolean
  this._sort = typeof sort === 'undefined' ? true : sort;
  return this;
};
/**
 * Compose querystring to append to req.url
 *
 * @api private
 */


RequestBase.prototype._finalizeQueryString = function () {
  var query = this._query.join('&');

  if (query) {
    this.url += (this.url.includes('?') ? '&' : '?') + query;
  }

  this._query.length = 0; // Makes the call idempotent

  if (this._sort) {
    var index = this.url.indexOf('?');

    if (index >= 0) {
      var queryArray = this.url.slice(index + 1).split('&');

      if (typeof this._sort === 'function') {
        queryArray.sort(this._sort);
      } else {
        queryArray.sort();
      }

      this.url = this.url.slice(0, index) + '?' + queryArray.join('&');
    }
  }
}; // For backwards compat only


RequestBase.prototype._appendQueryString = function () {
  console.warn('Unsupported');
};
/**
 * Invoke callback with timeout error.
 *
 * @api private
 */


RequestBase.prototype._timeoutError = function (reason, timeout, errno) {
  if (this._aborted) {
    return;
  }

  var error = new Error("".concat(reason + timeout, "ms exceeded"));
  error.timeout = timeout;
  error.code = 'ECONNABORTED';
  error.errno = errno;
  this.timedout = true;
  this.timedoutError = error;
  this.abort();
  this.callback(error);
};

RequestBase.prototype._setTimeouts = function () {
  var self = this; // deadline

  if (this._timeout && !this._timer) {
    this._timer = setTimeout(function () {
      self._timeoutError('Timeout of ', self._timeout, 'ETIME');
    }, this._timeout);
  } // response timeout


  if (this._responseTimeout && !this._responseTimeoutTimer) {
    this._responseTimeoutTimer = setTimeout(function () {
      self._timeoutError('Response timeout of ', self._responseTimeout, 'ETIMEDOUT');
    }, this._responseTimeout);
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9yZXF1ZXN0LWJhc2UuanMiXSwibmFtZXMiOlsic2VtdmVyIiwicmVxdWlyZSIsImlzT2JqZWN0IiwiaGFzT3duIiwibW9kdWxlIiwiZXhwb3J0cyIsIlJlcXVlc3RCYXNlIiwicHJvdG90eXBlIiwiY2xlYXJUaW1lb3V0IiwiX3RpbWVyIiwiX3Jlc3BvbnNlVGltZW91dFRpbWVyIiwiX3VwbG9hZFRpbWVvdXRUaW1lciIsInBhcnNlIiwiZm4iLCJfcGFyc2VyIiwicmVzcG9uc2VUeXBlIiwidmFsdWUiLCJfcmVzcG9uc2VUeXBlIiwic2VyaWFsaXplIiwiX3NlcmlhbGl6ZXIiLCJ0aW1lb3V0Iiwib3B0aW9ucyIsIl90aW1lb3V0IiwiX3Jlc3BvbnNlVGltZW91dCIsIl91cGxvYWRUaW1lb3V0Iiwib3B0aW9uIiwiZGVhZGxpbmUiLCJyZXNwb25zZSIsInVwbG9hZCIsImNvbnNvbGUiLCJ3YXJuIiwicmV0cnkiLCJjb3VudCIsImFyZ3VtZW50cyIsImxlbmd0aCIsIl9tYXhSZXRyaWVzIiwiX3JldHJpZXMiLCJfcmV0cnlDYWxsYmFjayIsIkVSUk9SX0NPREVTIiwiU2V0IiwiU1RBVFVTX0NPREVTIiwiX3Nob3VsZFJldHJ5IiwiZXJyb3IiLCJyZXMiLCJvdmVycmlkZSIsImVyciIsInN0YXR1cyIsImhhcyIsImNvZGUiLCJjcm9zc0RvbWFpbiIsIl9yZXRyeSIsInJlcSIsInJlcXVlc3QiLCJfYWJvcnRlZCIsInRpbWVkb3V0IiwidGltZWRvdXRFcnJvciIsIl9lbmQiLCJ0aGVuIiwicmVzb2x2ZSIsInJlamVjdCIsIl9mdWxsZmlsbGVkUHJvbWlzZSIsInNlbGYiLCJfZW5kQ2FsbGVkIiwiUHJvbWlzZSIsIm9uIiwiRXJyb3IiLCJtZXRob2QiLCJ1cmwiLCJlbmQiLCJjYXRjaCIsImNhbGxiYWNrIiwidW5kZWZpbmVkIiwidXNlIiwib2siLCJfb2tDYWxsYmFjayIsIl9pc1Jlc3BvbnNlT0siLCJnZXQiLCJmaWVsZCIsIl9oZWFkZXIiLCJ0b0xvd2VyQ2FzZSIsImdldEhlYWRlciIsInNldCIsImtleSIsImhlYWRlciIsInVuc2V0IiwibmFtZSIsIl9kYXRhIiwiQXJyYXkiLCJpc0FycmF5IiwiaSIsIlN0cmluZyIsIl9nZXRGb3JtRGF0YSIsImFwcGVuZCIsImFib3J0IiwieGhyIiwiZ3RlIiwicHJvY2VzcyIsInZlcnNpb24iLCJsdCIsImRlc3Ryb3llZCIsImVtaXQiLCJfYXV0aCIsInVzZXIiLCJwYXNzIiwiYmFzZTY0RW5jb2RlciIsInR5cGUiLCJ1c2VybmFtZSIsInBhc3N3b3JkIiwid2l0aENyZWRlbnRpYWxzIiwiX3dpdGhDcmVkZW50aWFscyIsInJlZGlyZWN0cyIsIm4iLCJfbWF4UmVkaXJlY3RzIiwibWF4UmVzcG9uc2VTaXplIiwiVHlwZUVycm9yIiwiX21heFJlc3BvbnNlU2l6ZSIsInRvSlNPTiIsImRhdGEiLCJoZWFkZXJzIiwic2VuZCIsImlzT2JqZWN0XyIsIl9mb3JtRGF0YSIsIl9pc0hvc3QiLCJ0cmltIiwic29ydFF1ZXJ5Iiwic29ydCIsIl9zb3J0IiwiX2ZpbmFsaXplUXVlcnlTdHJpbmciLCJxdWVyeSIsIl9xdWVyeSIsImpvaW4iLCJpbmNsdWRlcyIsImluZGV4IiwiaW5kZXhPZiIsInF1ZXJ5QXJyYXkiLCJzbGljZSIsInNwbGl0IiwiX2FwcGVuZFF1ZXJ5U3RyaW5nIiwiX3RpbWVvdXRFcnJvciIsInJlYXNvbiIsImVycm5vIiwiX3NldFRpbWVvdXRzIiwic2V0VGltZW91dCJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLElBQU1BLE1BQU0sR0FBR0MsT0FBTyxDQUFDLFFBQUQsQ0FBdEI7QUFFQTtBQUNBO0FBQ0E7OztBQUNBLGVBQTZCQSxPQUFPLENBQUMsU0FBRCxDQUFwQztBQUFBLElBQVFDLFFBQVIsWUFBUUEsUUFBUjtBQUFBLElBQWtCQyxNQUFsQixZQUFrQkEsTUFBbEI7QUFFQTtBQUNBO0FBQ0E7OztBQUVBQyxNQUFNLENBQUNDLE9BQVAsR0FBaUJDLFdBQWpCO0FBRUE7QUFDQTtBQUNBO0FBQ0E7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YTBFLE1BQU0sR0FBR3ZILE9BQXRCLGlCQUFkO0FBQ0FzQixFQUFBQSxLQUFLLENBQUN0QixPQUFOLEdBQWdCQSxPQUFoQjtBQUNBc0IsRUFBQUEsS0FBSyxDQUFDTSxJQUFOLEdBQWEsY0FBYjtBQUNBTixFQUFBQSxLQUFLLENBQUNrRyxLQUFOLEdBQWNBLEtBQWQ7QUFDQSxPQUFLdEYsUUFBTCxHQUFnQixJQUFoQjtBQUNBLE9BQUtDLGFBQUwsR0FBcUJiLEtBQXJCO0FBQ0EsT0FBS21ELEtBQUw7QUFDQSxPQUFLdkIsUUFBTCxDQUFjNUIsS0FBZDtBQUNELENBYkQ7O0FBZUFwQyxXQUFXLENBQUNDLFNBQVosQ0FBc0JzSSxZQUF0QixHQUFxQyxZQUFZO0FBQy9DLE1BQU1oRixJQUFJLEdBQUcsSUFBYixDQUQrQyxDQUcvQzs7QUFDQSxNQUFJLEtBQUt2QyxRQUFMLElBQWlCLENBQUMsS0FBS2IsTUFBM0IsRUFBbUM7QUFDakMsU0FBS0EsTUFBTCxHQUFjcUksVUFBVSxDQUFDLFlBQU07QUFDN0JqRixNQUFBQSxJQUFJLENBQUM2RSxhQUFMLENBQW1CLGFBQW5CLEVBQWtDN0UsSUFBSSxDQUFDdkMsUUFBdkMsRUFBaUQsT0FBakQ7QUFDRCxLQUZ1QixFQUVyQixLQUFLQSxRQUZnQixDQUF4QjtBQUdELEdBUjhDLENBVS9DOzs7QUFDQSxNQUFJLEtBQUtDLGdCQUFMLElBQXlCLENBQUMsS0FBS2IscUJBQW5DLEVBQTBEO0FBQ3hELFNBQUtBLHFCQUFMLEdBQTZCb0ksVUFBVSxDQUFDLFlBQU07QUFDNUNqRixNQUFBQSxJQUFJLENBQUM2RSxhQUFMLENBQ0Usc0JBREYsRUFFRTdFLElBQUksQ0FBQ3RDLGdCQUZQLEVBR0UsV0FIRjtBQUtELEtBTnNDLEVBTXBDLEtBQUtBLGdCQU4rQixDQUF2QztBQU9EO0FBQ0YsQ0FwQkQiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBzZW12ZXIgPSByZXF1aXJlKCdzZW12ZXInKTtcblxuLyoqXG4gKiBNb2R1bGUgb2YgbWl4ZWQtaW4gZnVuY3Rpb25zIHNoYXJlZCBiZXR3ZWVuIG5vZGUgYW5kIGNsaWVudCBjb2RlXG4gKi9cbmNvbnN0IHsgaXNPYmplY3QsIGhhc093biB9ID0gcmVxdWlyZSgnLi91dGlscycpO1xuXG4vKipcbiAqIEV4cG9zZSBgUmVxdWVzdEJhc2VgLlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gUmVxdWVzdEJhc2U7XG5cbi8qKlxuICogSW5pdGlhbGl6ZSBhIG5ldyBgUmVxdWVzdEJhc2VgLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gUmVxdWVzdEJhc2UoKSB7fVxuXG4vKipcbiAqIENsZWFyIHByZXZpb3VzIHRpbWVvdXQuXG4gKlxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5jbGVhclRpbWVvdXQgPSBmdW5jdGlvbiAoKSB7XG4gIGNsZWFyVGltZW91dCh0aGlzLl90aW1lcik7XG4gIGNsZWFyVGltZW91dCh0aGlzLl9yZXNwb25zZVRpbWVvdXRUaW1lcik7XG4gIGNsZWFyVGltZW91dCh0aGlzLl91cGxvYWRUaW1lb3V0VGltZXIpO1xuICBkZWxldGUgdGhpcy5fdGltZXI7XG4gIGRlbGV0ZSB0aGlzLl9yZXNwb25zZVRpbWVvdXRUaW1lcjtcbiAgZGVsZXRlIHRoaXMuX3VwbG9hZFRpbWVvdXRUaW1lcjtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIE92ZXJyaWRlIGRlZmF1bHQgcmVzcG9uc2UgYm9keSBwYXJzZXJcbiAqXG4gKiBUaGlzIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkIHRvIGNvbnZlcnQgaW5jb21pbmcgZGF0YSBpbnRvIHJlcXVlc3QuYm9keVxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5wYXJzZSA9IGZ1bmN0aW9uIChmbikge1xuICB0aGlzLl9wYXJzZXIgPSBmbjtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFNldCBmb3JtYXQgb2YgYmluYXJ5IHJlc3BvbnNlIGJvZHkuXG4gKiBJbiBicm93c2VyIHZhbGlkIGZvcm1hdHMgYXJlICdibG9iJyBhbmQgJ2FycmF5YnVmZmVyJyxcbiAqIHdoaWNoIHJldHVybiBCbG9iIGFuZCBBcnJheUJ1ZmZlciwgcmVzcGVjdGl2ZWx5LlxuICpcbiAqIEluIE5vZGUgYWxsIHZhbHVlcyByZXN1bHQgaW4gQnVmZmVyLlxuICpcbiAqIEV4YW1wbGVzOlxuICpcbiAqICAgICAgcmVxLmdldCgnLycpXG4gKiAgICAgICAgLnJlc3BvbnNlVHlwZSgnYmxvYicpXG4gKiAgICAgICAgLmVuZChjYWxsYmFjayk7XG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHZhbFxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5yZXNwb25zZVR5cGUgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgdGhpcy5fcmVzcG9uc2VUeXBlID0gdmFsdWU7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBPdmVycmlkZSBkZWZhdWx0IHJlcXVlc3QgYm9keSBzZXJpYWxpemVyXG4gKlxuICogVGhpcyBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCB0byBjb252ZXJ0IGRhdGEgc2V0IHZpYSAuc2VuZCBvciAuYXR0YWNoIGludG8gcGF5bG9hZCB0byBzZW5kXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLnNlcmlhbGl6ZSA9IGZ1bmN0aW9uIChmbikge1xuICB0aGlzLl9zZXJpYWxpemVyID0gZm47XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTZXQgdGltZW91dHMuXG4gKlxuICogLSByZXNwb25zZSB0aW1lb3V0IGlzIHRpbWUgYmV0d2VlbiBzZW5kaW5nIHJlcXVlc3QgYW5kIHJlY2VpdmluZyB0aGUgZmlyc3QgYnl0ZSBvZiB0aGUgcmVzcG9uc2UuIEluY2x1ZGVzIEROUyBhbmQgY29ubmVjdGlvbiB0aW1lLlxuICogLSBkZWFkbGluZSBpcyB0aGUgdGltZSBmcm9tIHN0YXJ0IG9mIHRoZSByZXF1ZXN0IHRvIHJlY2VpdmluZyByZXNwb25zZSBib2R5IGluIGZ1bGwuIElmIHRoZSBkZWFkbGluZSBpcyB0b28gc2hvcnQgbGFyZ2UgZmlsZXMgbWF5IG5vdCBsb2FkIGF0IGFsbCBvbiBzbG93IGNvbm5lY3Rpb25zLlxuICogLSB1cGxvYWQgaXMgdGhlIHRpbWUgIHNpbmNlIGxhc3QgYml0IG9mIGRhdGEgd2FzIHNlbnQgb3IgcmVjZWl2ZWQuIFRoaXMgdGltZW91dCB3b3JrcyBvbmx5IGlmIGRlYWRsaW5lIHRpbWVvdXQgaXMgb2ZmXG4gKlxuICogVmFsdWUgb2YgMCBvciBmYWxzZSBtZWFucyBubyB0aW1lb3V0LlxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfE9iamVjdH0gbXMgb3Ige3Jlc3BvbnNlLCBkZWFkbGluZX1cbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUudGltZW91dCA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gIGlmICghb3B0aW9ucyB8fCB0eXBlb2Ygb3B0aW9ucyAhPT0gJ29iamVjdCcpIHtcbiAgICB0aGlzLl90aW1lb3V0ID0gb3B0aW9ucztcbiAgICB0aGlzLl9yZXNwb25zZVRpbWVvdXQgPSAwO1xuICAgIHRoaXMuX3VwbG9hZFRpbWVvdXQgPSAwO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZm9yIChjb25zdCBvcHRpb24gaW4gb3B0aW9ucykge1xuICAgIGlmIChoYXNPd24ob3B0aW9ucywgb3B0aW9uKSkge1xuICAgICAgc3dpdGNoIChvcHRpb24pIHtcbiAgICAgICAgY2FzZSAnZGVhZGxpbmUnOlxuICAgICAgICAgIHRoaXMuX3RpbWVvdXQgPSBvcHRpb25zLmRlYWRsaW5lO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdyZXNwb25zZSc6XG4gICAgICAgICAgdGhpcy5fcmVzcG9uc2VUaW1lb3V0ID0gb3B0aW9ucy5yZXNwb25zZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAndXBsb2FkJzpcbiAgICAgICAgICB0aGlzLl91cGxvYWRUaW1lb3V0ID0gb3B0aW9ucy51cGxvYWQ7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgY29uc29sZS53YXJuKCdVbmtub3duIHRpbWVvdXQgb3B0aW9uJywgb3B0aW9uKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU2V0IG51bWJlciBvZiByZXRyeSBhdHRlbXB0cyBvbiBlcnJvci5cbiAqXG4gKiBGYWlsZWQgcmVxdWVzdHMgd2lsbCBiZSByZXRyaWVkICdjb3VudCcgdGltZXMgaWYgdGltZW91dCBvciBlcnIuY29kZSA+PSA1MDAuXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IGNvdW50XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbZm5dXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLnJldHJ5ID0gZnVuY3Rpb24gKGNvdW50LCBmbikge1xuICAvLyBEZWZhdWx0IHRvIDEgaWYgbm8gY291bnQgcGFzc2VkIG9yIHRydWVcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDAgfHwgY291bnQgPT09IHRydWUpIGNvdW50ID0gMTtcbiAgaWYgKGNvdW50IDw9IDApIGNvdW50ID0gMDtcbiAgdGhpcy5fbWF4UmV0cmllcyA9IGNvdW50O1xuICB0aGlzLl9yZXRyaWVzID0gMDtcbiAgdGhpcy5fcmV0cnlDYWxsYmFjayA9IGZuO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8vXG4vLyBOT1RFOiB3ZSBkbyBub3QgaW5jbHVkZSBFU09DS0VUVElNRURPVVQgYmVjYXVzZSB0aGF0IGlzIGZyb20gYHJlcXVlc3RgIHBhY2thZ2Vcbi8vICAgICAgIDxodHRwczovL2dpdGh1Yi5jb20vc2luZHJlc29yaHVzL2dvdC9wdWxsLzUzNz5cbi8vXG4vLyBOT1RFOiB3ZSBkbyBub3QgaW5jbHVkZSBFQUREUklORk8gYmVjYXVzZSBpdCB3YXMgcmVtb3ZlZCBmcm9tIGxpYnV2IGluIDIwMTRcbi8vICAgICAgIDxodHRwczovL2dpdGh1Yi5jb20vbGlidXYvbGlidXYvY29tbWl0LzAyZTFlYmQ0MGI4MDdiZTVhZjQ2MzQzZWE4NzMzMzFiMmVlNGU5YzE+XG4vLyAgICAgICA8aHR0cHM6Ly9naXRodWIuY29tL3JlcXVlc3QvcmVxdWVzdC9zZWFyY2g/cT1FU09DS0VUVElNRURPVVQmdW5zY29wZWRfcT1FU09DS0VUVElNRURPVVQ+XG4vL1xuLy9cbi8vIFRPRE86IGV4cG9zZSB0aGVzZSBhcyBjb25maWd1cmFibGUgZGVmYXVsdHNcbi8vXG5jb25zdCBFUlJPUl9DT0RFUyA9IG5ldyBTZXQoW1xuICAnRVRJTUVET1VUJyxcbiAgJ0VDT05OUkVTRVQnLFxuICAnRUFERFJJTlVTRScsXG4gICdFQ09OTlJFRlVTRUQnLFxuICAnRVBJUEUnLFxuICAnRU5PVEZPVU5EJyxcbiAgJ0VORVRVTlJFQUNIJyxcbiAgJ0VBSV9BR0FJTidcbl0pO1xuXG5jb25zdCBTVEFUVVNfQ09ERVMgPSBuZXcgU2V0KFtcbiAgNDA4LCA0MTMsIDQyOSwgNTAwLCA1MDIsIDUwMywgNTA0LCA1MjEsIDUyMiwgNTI0XG5dKTtcblxuLy8gVE9ETzogd2Ugd291bGQgbmVlZCB0byBtYWtlIHRoaXMgZWFzaWx5IGNvbmZpZ3VyYWJsZSBiZWZvcmUgYWRkaW5nIGl0IGluIChlLmcuIHNvbWUgbWlnaHQgd2FudCB0byBhZGQgUE9TVClcbi8vIGNvbnN0IE1FVEhPRFMgPSBuZXcgU2V0KFsnR0VUJywgJ1BVVCcsICdIRUFEJywgJ0RFTEVURScsICdPUFRJT05TJywgJ1RSQUNFJ10pO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHJlcXVlc3Qgc2hvdWxkIGJlIHJldHJpZWQuXG4gKiAoSW5zcGlyZWQgYnkgaHR0cHM6Ly9naXRodWIuY29tL3NpbmRyZXNvcmh1cy9nb3QjcmV0cnkpXG4gKlxuICogQHBhcmFtIHtFcnJvcn0gZXJyIGFuIGVycm9yXG4gKiBAcGFyYW0ge1Jlc3BvbnNlfSBbcmVzXSByZXNwb25zZVxuICogQHJldHVybnMge0Jvb2xlYW59IGlmIHNlZ21lbnQgc2hvdWxkIGJlIHJldHJpZWRcbiAqL1xuUmVxdWVzdEJhc2UucHJvdG90eXBlLl9zaG91bGRSZXRyeSA9IGZ1bmN0aW9uIChlcnJvciwgcmVzKSB7XG4gIGlmICghdGhpcy5fbWF4UmV0cmllcyB8fCB0aGlzLl9yZXRyaWVzKysgPj0gdGhpcy5fbWF4UmV0cmllcykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmICh0aGlzLl9yZXRyeUNhbGxiYWNrKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IG92ZXJyaWRlID0gdGhpcy5fcmV0cnlDYWxsYmFjayhlcnJvciwgcmVzKTtcbiAgICAgIGlmIChvdmVycmlkZSA9PT0gdHJ1ZSkgcmV0dXJuIHRydWU7XG4gICAgICBpZiAob3ZlcnJpZGUgPT09IGZhbHNlKSByZXR1cm4gZmFsc2U7XG4gICAgICAvLyB1bmRlZmluZWQgZmFsbHMgYmFjayB0byBkZWZhdWx0c1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgIH1cbiAgfVxuXG4gIC8vIFRPRE86IHdlIHdvdWxkIG5lZWQgdG8gbWFrZSB0aGlzIGVhc2lseSBjb25maWd1cmFibGUgYmVmb3JlIGFkZGluZyBpdCBpbiAoZS5nLiBzb21lIG1pZ2h0IHdhbnQgdG8gYWRkIFBPU1QpXG4gIC8qXG4gIGlmIChcbiAgICB0aGlzLnJlcSAmJlxuICAgIHRoaXMucmVxLm1ldGhvZCAmJlxuICAgICFNRVRIT0RTLmhhcyh0aGlzLnJlcS5tZXRob2QudG9VcHBlckNhc2UoKSlcbiAgKVxuICAgIHJldHVybiBmYWxzZTtcbiAgKi9cbiAgaWYgKHJlcyAmJiByZXMuc3RhdHVzICYmIFNUQVRVU19DT0RFUy5oYXMocmVzLnN0YXR1cykpIHJldHVybiB0cnVlO1xuICBpZiAoZXJyb3IpIHtcbiAgICBpZiAoZXJyb3IuY29kZSAmJiBFUlJPUl9DT0RFUy5oYXMoZXJyb3IuY29kZSkpIHJldHVybiB0cnVlO1xuICAgIC8vIFN1cGVyYWdlbnQgdGltZW91dFxuICAgIGlmIChlcnJvci50aW1lb3V0ICYmIGVycm9yLmNvZGUgPT09ICdFQ09OTkFCT1JURUQnKSByZXR1cm4gdHJ1ZTtcbiAgICBpZiAoZXJyb3IuY3Jvc3NEb21haW4pIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufTtcblxuLyoqXG4gKiBSZXRyeSByZXF1ZXN0XG4gKlxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUuX3JldHJ5ID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLmNsZWFyVGltZW91dCgpO1xuXG4gIC8vIG5vZGVcbiAgaWYgKHRoaXMucmVxKSB7XG4gICAgdGhpcy5yZXEgPSBudWxsO1xuICAgIHRoaXMucmVxID0gdGhpcy5yZXF1ZXN0KCk7XG4gIH1cblxuICB0aGlzLl9hYm9ydGVkID0gZmFsc2U7XG4gIHRoaXMudGltZWRvdXQgPSBmYWxzZTtcbiAgdGhpcy50aW1lZG91dEVycm9yID0gbnVsbDtcblxuICByZXR1cm4gdGhpcy5fZW5kKCk7XG59O1xuXG4vKipcbiAqIFByb21pc2Ugc3VwcG9ydFxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlc29sdmVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtyZWplY3RdXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fVxuICovXG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS50aGVuID0gZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICBpZiAoIXRoaXMuX2Z1bGxmaWxsZWRQcm9taXNlKSB7XG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgaWYgKHRoaXMuX2VuZENhbGxlZCkge1xuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAnV2FybmluZzogc3VwZXJhZ2VudCByZXF1ZXN0IHdhcyBzZW50IHR3aWNlLCBiZWNhdXNlIGJvdGggLmVuZCgpIGFuZCAudGhlbigpIHdlcmUgY2FsbGVkLiBOZXZlciBjYWxsIC5lbmQoKSBpZiB5b3UgdXNlIHByb21pc2VzJ1xuICAgICAgKTtcbiAgICB9XG5cbiAgICB0aGlzLl9mdWxsZmlsbGVkUHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHNlbGYub24oJ2Fib3J0JywgKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5fbWF4UmV0cmllcyAmJiB0aGlzLl9tYXhSZXRyaWVzID4gdGhpcy5fcmV0cmllcykge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnRpbWVkb3V0ICYmIHRoaXMudGltZWRvdXRFcnJvcikge1xuICAgICAgICAgIHJlamVjdCh0aGlzLnRpbWVkb3V0RXJyb3IpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGVycm9yID0gbmV3IEVycm9yKCdBYm9ydGVkJyk7XG4gICAgICAgIGVycm9yLmNvZGUgPSAnQUJPUlRFRCc7XG4gICAgICAgIGVycm9yLnN0YXR1cyA9IHRoaXMuc3RhdHVzO1xuICAgICAgICBlcnJvci5tZXRob2QgPSB0aGlzLm1ldGhvZDtcbiAgICAgICAgZXJyb3IudXJsID0gdGhpcy51cmw7XG4gICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICB9KTtcbiAgICAgIHNlbGYuZW5kKChlcnJvciwgcmVzKSA9PiB7XG4gICAgICAgIGlmIChlcnJvcikgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgZWxzZSByZXNvbHZlKHJlcyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiB0aGlzLl9mdWxsZmlsbGVkUHJvbWlzZS50aGVuKHJlc29sdmUsIHJlamVjdCk7XG59O1xuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUuY2F0Y2ggPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgcmV0dXJuIHRoaXMudGhlbih1bmRlZmluZWQsIGNhbGxiYWNrKTtcbn07XG5cbi8qKlxuICogQWxsb3cgZm9yIGV4dGVuc2lvblxuICovXG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS51c2UgPSBmdW5jdGlvbiAoZm4pIHtcbiAgZm4odGhpcyk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLm9rID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gIGlmICh0eXBlb2YgY2FsbGJhY2sgIT09ICdmdW5jdGlvbicpIHRocm93IG5ldyBFcnJvcignQ2FsbGJhY2sgcmVxdWlyZWQnKTtcbiAgdGhpcy5fb2tDYWxsYmFjayA9IGNhbGxiYWNrO1xuICByZXR1cm4gdGhpcztcbn07XG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5faXNSZXNwb25zZU9LID0gZnVuY3Rpb24gKHJlcykge1xuICBpZiAoIXJlcykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmICh0aGlzLl9va0NhbGxiYWNrKSB7XG4gICAgcmV0dXJuIHRoaXMuX29rQ2FsbGJhY2socmVzKTtcbiAgfVxuXG4gIHJldHVybiByZXMuc3RhdHVzID49IDIwMCAmJiByZXMuc3RhdHVzIDwgMzAwO1xufTtcblxuLyoqXG4gKiBHZXQgcmVxdWVzdCBoZWFkZXIgYGZpZWxkYC5cbiAqIENhc2UtaW5zZW5zaXRpdmUuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGZpZWxkXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAoZmllbGQpIHtcbiAgcmV0dXJuIHRoaXMuX2hlYWRlcltmaWVsZC50b0xvd2VyQ2FzZSgpXTtcbn07XG5cbi8qKlxuICogR2V0IGNhc2UtaW5zZW5zaXRpdmUgaGVhZGVyIGBmaWVsZGAgdmFsdWUuXG4gKiBUaGlzIGlzIGEgZGVwcmVjYXRlZCBpbnRlcm5hbCBBUEkuIFVzZSBgLmdldChmaWVsZClgIGluc3RlYWQuXG4gKlxuICogKGdldEhlYWRlciBpcyBubyBsb25nZXIgdXNlZCBpbnRlcm5hbGx5IGJ5IHRoZSBzdXBlcmFnZW50IGNvZGUgYmFzZSlcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZmllbGRcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHJpdmF0ZVxuICogQGRlcHJlY2F0ZWRcbiAqL1xuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUuZ2V0SGVhZGVyID0gUmVxdWVzdEJhc2UucHJvdG90eXBlLmdldDtcblxuLyoqXG4gKiBTZXQgaGVhZGVyIGBmaWVsZGAgdG8gYHZhbGAsIG9yIG11bHRpcGxlIGZpZWxkcyB3aXRoIG9uZSBvYmplY3QuXG4gKiBDYXNlLWluc2Vuc2l0aXZlLlxuICpcbiAqIEV4YW1wbGVzOlxuICpcbiAqICAgICAgcmVxLmdldCgnLycpXG4gKiAgICAgICAgLnNldCgnQWNjZXB0JywgJ2FwcGxpY2F0aW9uL2pzb24nKVxuICogICAgICAgIC5zZXQoJ1gtQVBJLUtleScsICdmb29iYXInKVxuICogICAgICAgIC5lbmQoY2FsbGJhY2spO1xuICpcbiAqICAgICAgcmVxLmdldCgnLycpXG4gKiAgICAgICAgLnNldCh7IEFjY2VwdDogJ2FwcGxpY2F0aW9uL2pzb24nLCAnWC1BUEktS2V5JzogJ2Zvb2JhcicgfSlcbiAqICAgICAgICAuZW5kKGNhbGxiYWNrKTtcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ3xPYmplY3R9IGZpZWxkXG4gKiBAcGFyYW0ge1N0cmluZ30gdmFsXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uIChmaWVsZCwgdmFsdWUpIHtcbiAgaWYgKGlzT2JqZWN0KGZpZWxkKSkge1xuICAgIGZvciAoY29uc3Qga2V5IGluIGZpZWxkKSB7XG4gICAgICBpZiAoaGFzT3duKGZpZWxkLCBrZXkpKSB0aGlzLnNldChrZXksIGZpZWxkW2tleV0pO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgdGhpcy5faGVhZGVyW2ZpZWxkLnRvTG93ZXJDYXNlKCldID0gdmFsdWU7XG4gIHRoaXMuaGVhZGVyW2ZpZWxkXSA9IHZhbHVlO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogUmVtb3ZlIGhlYWRlciBgZmllbGRgLlxuICogQ2FzZS1pbnNlbnNpdGl2ZS5cbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqICAgICAgcmVxLmdldCgnLycpXG4gKiAgICAgICAgLnVuc2V0KCdVc2VyLUFnZW50JylcbiAqICAgICAgICAuZW5kKGNhbGxiYWNrKTtcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZmllbGQgZmllbGQgbmFtZVxuICovXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUudW5zZXQgPSBmdW5jdGlvbiAoZmllbGQpIHtcbiAgZGVsZXRlIHRoaXMuX2hlYWRlcltmaWVsZC50b0xvd2VyQ2FzZSgpXTtcbiAgZGVsZXRlIHRoaXMuaGVhZGVyW2ZpZWxkXTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFdyaXRlIHRoZSBmaWVsZCBgbmFtZWAgYW5kIGB2YWxgLCBvciBtdWx0aXBsZSBmaWVsZHMgd2l0aCBvbmUgb2JqZWN0XG4gKiBmb3IgXCJtdWx0aXBhcnQvZm9ybS1kYXRhXCIgcmVxdWVzdCBib2RpZXMuXG4gKlxuICogYGBgIGpzXG4gKiByZXF1ZXN0LnBvc3QoJy91cGxvYWQnKVxuICogICAuZmllbGQoJ2ZvbycsICdiYXInKVxuICogICAuZW5kKGNhbGxiYWNrKTtcbiAqXG4gKiByZXF1ZXN0LnBvc3QoJy91cGxvYWQnKVxuICogICAuZmllbGQoeyBmb286ICdiYXInLCBiYXo6ICdxdXgnIH0pXG4gKiAgIC5lbmQoY2FsbGJhY2spO1xuICogYGBgXG4gKlxuICogQHBhcmFtIHtTdHJpbmd8T2JqZWN0fSBuYW1lIG5hbWUgb2YgZmllbGRcbiAqIEBwYXJhbSB7U3RyaW5nfEJsb2J8RmlsZXxCdWZmZXJ8ZnMuUmVhZFN0cmVhbX0gdmFsIHZhbHVlIG9mIGZpZWxkXG4gKiBAcGFyYW0ge1N0cmluZ30gb3B0aW9ucyBleHRyYSBvcHRpb25zLCBlLmcuICdibG9iJ1xuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUuZmllbGQgPSBmdW5jdGlvbiAobmFtZSwgdmFsdWUsIG9wdGlvbnMpIHtcbiAgLy8gbmFtZSBzaG91bGQgYmUgZWl0aGVyIGEgc3RyaW5nIG9yIGFuIG9iamVjdC5cbiAgaWYgKG5hbWUgPT09IG51bGwgfHwgdW5kZWZpbmVkID09PSBuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCcuZmllbGQobmFtZSwgdmFsKSBuYW1lIGNhbiBub3QgYmUgZW1wdHknKTtcbiAgfVxuXG4gIGlmICh0aGlzLl9kYXRhKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgXCIuZmllbGQoKSBjYW4ndCBiZSB1c2VkIGlmIC5zZW5kKCkgaXMgdXNlZC4gUGxlYXNlIHVzZSBvbmx5IC5zZW5kKCkgb3Igb25seSAuZmllbGQoKSAmIC5hdHRhY2goKVwiXG4gICAgKTtcbiAgfVxuXG4gIGlmIChpc09iamVjdChuYW1lKSkge1xuICAgIGZvciAoY29uc3Qga2V5IGluIG5hbWUpIHtcbiAgICAgIGlmIChoYXNPd24obmFtZSwga2V5KSkgdGhpcy5maWVsZChrZXksIG5hbWVba2V5XSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICBmb3IgKGNvbnN0IGkgaW4gdmFsdWUpIHtcbiAgICAgIGlmIChoYXNPd24odmFsdWUsIGkpKSB0aGlzLmZpZWxkKG5hbWUsIHZhbHVlW2ldKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8vIHZhbCBzaG91bGQgYmUgZGVmaW5lZCBub3dcbiAgaWYgKHZhbHVlID09PSBudWxsIHx8IHVuZGVmaW5lZCA9PT0gdmFsdWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJy5maWVsZChuYW1lLCB2YWwpIHZhbCBjYW4gbm90IGJlIGVtcHR5Jyk7XG4gIH1cblxuICBpZiAodHlwZW9mIHZhbHVlID09PSAnYm9vbGVhbicpIHtcbiAgICB2YWx1ZSA9IFN0cmluZyh2YWx1ZSk7XG4gIH1cblxuICB0aGlzLl9nZXRGb3JtRGF0YSgpLmFwcGVuZChuYW1lLCB2YWx1ZSwgb3B0aW9ucyk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBBYm9ydCB0aGUgcmVxdWVzdCwgYW5kIGNsZWFyIHBvdGVudGlhbCB0aW1lb3V0LlxuICpcbiAqIEByZXR1cm4ge1JlcXVlc3R9IHJlcXVlc3RcbiAqIEBhcGkgcHVibGljXG4gKi9cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5hYm9ydCA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKHRoaXMuX2Fib3J0ZWQpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHRoaXMuX2Fib3J0ZWQgPSB0cnVlO1xuICBpZiAodGhpcy54aHIpIHRoaXMueGhyLmFib3J0KCk7IC8vIGJyb3dzZXJcbiAgaWYgKHRoaXMucmVxKSB7XG4gICAgLy8gTm9kZSB2MTMgaGFzIG1ham9yIGRpZmZlcmVuY2VzIGluIGBhYm9ydCgpYFxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9ub2RlanMvbm9kZS9ibG9iL3YxMi54L2xpYi9pbnRlcm5hbC9zdHJlYW1zL2VuZC1vZi1zdHJlYW0uanNcbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vbm9kZWpzL25vZGUvYmxvYi92MTMueC9saWIvaW50ZXJuYWwvc3RyZWFtcy9lbmQtb2Ytc3RyZWFtLmpzXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL25vZGVqcy9ub2RlL2Jsb2IvdjE0LngvbGliL2ludGVybmFsL3N0cmVhbXMvZW5kLW9mLXN0cmVhbS5qc1xuICAgIC8vIChpZiB5b3UgcnVuIGEgZGlmZiBhY3Jvc3MgdGhlc2UgeW91IHdpbGwgc2VlIHRoZSBkaWZmZXJlbmNlcylcbiAgICAvL1xuICAgIC8vIFJlZmVyZW5jZXM6XG4gICAgLy8gPGh0dHBzOi8vZ2l0aHViLmNvbS9ub2RlanMvbm9kZS9pc3N1ZXMvMzE2MzA+XG4gICAgLy8gPGh0dHBzOi8vZ2l0aHViLmNvbS92aXNpb25tZWRpYS9zdXBlcmFnZW50L3B1bGwvMTA4NC9jb21taXRzL2RjMTg2NzlhN2M1Y2NmYzYwNDZkODgyMDE1ZTUxMjY4ODg5NzNiYzg+XG4gICAgLy9cbiAgICAvLyBUaGFua3MgdG8gQHNoYWRvd2dhdGUxNSBhbmQgQG5pZnR5bGV0dHVjZVxuICAgIGlmIChcbiAgICAgIHNlbXZlci5ndGUocHJvY2Vzcy52ZXJzaW9uLCAndjEzLjAuMCcpICYmXG4gICAgICBzZW12ZXIubHQocHJvY2Vzcy52ZXJzaW9uLCAndjE0LjAuMCcpXG4gICAgKSB7XG4gICAgICAvLyBOb3RlIHRoYXQgdGhlIHJlYXNvbiB0aGlzIGRvZXNuJ3Qgd29yayBpcyBiZWNhdXNlIGluIHYxMyBhcyBjb21wYXJlZCB0byB2MTRcbiAgICAgIC8vIHRoZXJlIGlzIG5vIGBjYWxsYmFjayA9IG5vcGAgc2V0IGluIGVuZC1vZi1zdHJlYW0uanMgYWJvdmVcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ1N1cGVyYWdlbnQgZG9lcyBub3Qgd29yayBpbiB2MTMgcHJvcGVybHkgd2l0aCBhYm9ydCgpIGR1ZSB0byBOb2RlLmpzIGNvcmUgY2hhbmdlcydcbiAgICAgICk7XG4gICAgfSBlbHNlIGlmIChzZW12ZXIuZ3RlKHByb2Nlc3MudmVyc2lvbiwgJ3YxNC4wLjAnKSkge1xuICAgICAgLy8gV2UgaGF2ZSB0byBtYW51YWxseSBzZXQgYGRlc3Ryb3llZGAgdG8gYHRydWVgIGluIG9yZGVyIGZvciB0aGlzIHRvIHdvcmtcbiAgICAgIC8vIChzZWUgY29yZSBpbnRlcm5hbHMgb2YgZW5kLW9mLXN0cmVhbS5qcyBhYm92ZSBpbiB2MTQgYnJhbmNoIGFzIGNvbXBhcmVkIHRvIHYxMilcbiAgICAgIHRoaXMucmVxLmRlc3Ryb3llZCA9IHRydWU7XG4gICAgfVxuXG4gICAgdGhpcy5yZXEuYWJvcnQoKTsgLy8gbm9kZVxuICB9XG5cbiAgdGhpcy5jbGVhclRpbWVvdXQoKTtcbiAgdGhpcy5lbWl0KCdhYm9ydCcpO1xuICByZXR1cm4gdGhpcztcbn07XG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5fYXV0aCA9IGZ1bmN0aW9uICh1c2VyLCBwYXNzLCBvcHRpb25zLCBiYXNlNjRFbmNvZGVyKSB7XG4gIHN3aXRjaCAob3B0aW9ucy50eXBlKSB7XG4gICAgY2FzZSAnYmFzaWMnOlxuICAgICAgdGhpcy5zZXQoJ0F1dGhvcml6YXRpb24nLCBgQmFzaWMgJHtiYXNlNjRFbmNvZGVyKGAke3VzZXJ9OiR7cGFzc31gKX1gKTtcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSAnYXV0byc6XG4gICAgICB0aGlzLnVzZXJuYW1lID0gdXNlcjtcbiAgICAgIHRoaXMucGFzc3dvcmQgPSBwYXNzO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlICdiZWFyZXInOiAvLyB1c2FnZSB3b3VsZCBiZSAuYXV0aChhY2Nlc3NUb2tlbiwgeyB0eXBlOiAnYmVhcmVyJyB9KVxuICAgICAgdGhpcy5zZXQoJ0F1dGhvcml6YXRpb24nLCBgQmVhcmVyICR7dXNlcn1gKTtcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICBicmVhaztcbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBFbmFibGUgdHJhbnNtaXNzaW9uIG9mIGNvb2tpZXMgd2l0aCB4LWRvbWFpbiByZXF1ZXN0cy5cbiAqXG4gKiBOb3RlIHRoYXQgZm9yIHRoaXMgdG8gd29yayB0aGUgb3JpZ2luIG11c3Qgbm90IGJlXG4gKiB1c2luZyBcIkFjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpblwiIHdpdGggYSB3aWxkY2FyZCxcbiAqIGFuZCBhbHNvIG11c3Qgc2V0IFwiQWNjZXNzLUNvbnRyb2wtQWxsb3ctQ3JlZGVudGlhbHNcIlxuICogdG8gXCJ0cnVlXCIuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUud2l0aENyZWRlbnRpYWxzID0gZnVuY3Rpb24gKG9uKSB7XG4gIC8vIFRoaXMgaXMgYnJvd3Nlci1vbmx5IGZ1bmN0aW9uYWxpdHkuIE5vZGUgc2lkZSBpcyBuby1vcC5cbiAgaWYgKG9uID09PSB1bmRlZmluZWQpIG9uID0gdHJ1ZTtcbiAgdGhpcy5fd2l0aENyZWRlbnRpYWxzID0gb247XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTZXQgdGhlIG1heCByZWRpcmVjdHMgdG8gYG5gLiBEb2VzIG5vdGhpbmcgaW4gYnJvd3NlciBYSFIgaW1wbGVtZW50YXRpb24uXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IG5cbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUucmVkaXJlY3RzID0gZnVuY3Rpb24gKG4pIHtcbiAgdGhpcy5fbWF4UmVkaXJlY3RzID0gbjtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIE1heGltdW0gc2l6ZSBvZiBidWZmZXJlZCByZXNwb25zZSBib2R5LCBpbiBieXRlcy4gQ291bnRzIHVuY29tcHJlc3NlZCBzaXplLlxuICogRGVmYXVsdCAyMDBNQi5cbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gbiBudW1iZXIgb2YgYnl0ZXNcbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICovXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUubWF4UmVzcG9uc2VTaXplID0gZnVuY3Rpb24gKG4pIHtcbiAgaWYgKHR5cGVvZiBuICE9PSAnbnVtYmVyJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgYXJndW1lbnQnKTtcbiAgfVxuXG4gIHRoaXMuX21heFJlc3BvbnNlU2l6ZSA9IG47XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBDb252ZXJ0IHRvIGEgcGxhaW4gamF2YXNjcmlwdCBvYmplY3QgKG5vdCBKU09OIHN0cmluZykgb2Ygc2NhbGFyIHByb3BlcnRpZXMuXG4gKiBOb3RlIGFzIHRoaXMgbWV0aG9kIGlzIGRlc2lnbmVkIHRvIHJldHVybiBhIHVzZWZ1bCBub24tdGhpcyB2YWx1ZSxcbiAqIGl0IGNhbm5vdCBiZSBjaGFpbmVkLlxuICpcbiAqIEByZXR1cm4ge09iamVjdH0gZGVzY3JpYmluZyBtZXRob2QsIHVybCwgYW5kIGRhdGEgb2YgdGhpcyByZXF1ZXN0XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB7XG4gICAgbWV0aG9kOiB0aGlzLm1ldGhvZCxcbiAgICB1cmw6IHRoaXMudXJsLFxuICAgIGRhdGE6IHRoaXMuX2RhdGEsXG4gICAgaGVhZGVyczogdGhpcy5faGVhZGVyXG4gIH07XG59O1xuXG4vKipcbiAqIFNlbmQgYGRhdGFgIGFzIHRoZSByZXF1ZXN0IGJvZHksIGRlZmF1bHRpbmcgdGhlIGAudHlwZSgpYCB0byBcImpzb25cIiB3aGVuXG4gKiBhbiBvYmplY3QgaXMgZ2l2ZW4uXG4gKlxuICogRXhhbXBsZXM6XG4gKlxuICogICAgICAgLy8gbWFudWFsIGpzb25cbiAqICAgICAgIHJlcXVlc3QucG9zdCgnL3VzZXInKVxuICogICAgICAgICAudHlwZSgnanNvbicpXG4gKiAgICAgICAgIC5zZW5kKCd7XCJuYW1lXCI6XCJ0alwifScpXG4gKiAgICAgICAgIC5lbmQoY2FsbGJhY2spXG4gKlxuICogICAgICAgLy8gYXV0byBqc29uXG4gKiAgICAgICByZXF1ZXN0LnBvc3QoJy91c2VyJylcbiAqICAgICAgICAgLnNlbmQoeyBuYW1lOiAndGonIH0pXG4gKiAgICAgICAgIC5lbmQoY2FsbGJhY2spXG4gKlxuICogICAgICAgLy8gbWFudWFsIHgtd3d3LWZvcm0tdXJsZW5jb2RlZFxuICogICAgICAgcmVxdWVzdC5wb3N0KCcvdXNlcicpXG4gKiAgICAgICAgIC50eXBlKCdmb3JtJylcbiAqICAgICAgICAgLnNlbmQoJ25hbWU9dGonKVxuICogICAgICAgICAuZW5kKGNhbGxiYWNrKVxuICpcbiAqICAgICAgIC8vIGF1dG8geC13d3ctZm9ybS11cmxlbmNvZGVkXG4gKiAgICAgICByZXF1ZXN0LnBvc3QoJy91c2VyJylcbiAqICAgICAgICAgLnR5cGUoJ2Zvcm0nKVxuICogICAgICAgICAuc2VuZCh7IG5hbWU6ICd0aicgfSlcbiAqICAgICAgICAgLmVuZChjYWxsYmFjaylcbiAqXG4gKiAgICAgICAvLyBkZWZhdWx0cyB0byB4LXd3dy1mb3JtLXVybGVuY29kZWRcbiAqICAgICAgcmVxdWVzdC5wb3N0KCcvdXNlcicpXG4gKiAgICAgICAgLnNlbmQoJ25hbWU9dG9iaScpXG4gKiAgICAgICAgLnNlbmQoJ3NwZWNpZXM9ZmVycmV0JylcbiAqICAgICAgICAuZW5kKGNhbGxiYWNrKVxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfE9iamVjdH0gZGF0YVxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb21wbGV4aXR5XG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUuc2VuZCA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gIGNvbnN0IGlzT2JqZWN0XyA9IGlzT2JqZWN0KGRhdGEpO1xuICBsZXQgdHlwZSA9IHRoaXMuX2hlYWRlclsnY29udGVudC10eXBlJ107XG5cbiAgaWYgKHRoaXMuX2Zvcm1EYXRhKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgXCIuc2VuZCgpIGNhbid0IGJlIHVzZWQgaWYgLmF0dGFjaCgpIG9yIC5maWVsZCgpIGlzIHVzZWQuIFBsZWFzZSB1c2Ugb25seSAuc2VuZCgpIG9yIG9ubHkgLmZpZWxkKCkgJiAuYXR0YWNoKClcIlxuICAgICk7XG4gIH1cblxuICBpZiAoaXNPYmplY3RfICYmICF0aGlzLl9kYXRhKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoZGF0YSkpIHtcbiAgICAgIHRoaXMuX2RhdGEgPSBbXTtcbiAgICB9IGVsc2UgaWYgKCF0aGlzLl9pc0hvc3QoZGF0YSkpIHtcbiAgICAgIHRoaXMuX2RhdGEgPSB7fTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoZGF0YSAmJiB0aGlzLl9kYXRhICYmIHRoaXMuX2lzSG9zdCh0aGlzLl9kYXRhKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNhbid0IG1lcmdlIHRoZXNlIHNlbmQgY2FsbHNcIik7XG4gIH1cblxuICAvLyBtZXJnZVxuICBpZiAoaXNPYmplY3RfICYmIGlzT2JqZWN0KHRoaXMuX2RhdGEpKSB7XG4gICAgZm9yIChjb25zdCBrZXkgaW4gZGF0YSkge1xuICAgICAgaWYgKGhhc093bihkYXRhLCBrZXkpKSB0aGlzLl9kYXRhW2tleV0gPSBkYXRhW2tleV07XG4gICAgfVxuICB9IGVsc2UgaWYgKHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJykge1xuICAgIC8vIGRlZmF1bHQgdG8geC13d3ctZm9ybS11cmxlbmNvZGVkXG4gICAgaWYgKCF0eXBlKSB0aGlzLnR5cGUoJ2Zvcm0nKTtcbiAgICB0eXBlID0gdGhpcy5faGVhZGVyWydjb250ZW50LXR5cGUnXTtcbiAgICBpZiAodHlwZSkgdHlwZSA9IHR5cGUudG9Mb3dlckNhc2UoKS50cmltKCk7XG4gICAgaWYgKHR5cGUgPT09ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnKSB7XG4gICAgICB0aGlzLl9kYXRhID0gdGhpcy5fZGF0YSA/IGAke3RoaXMuX2RhdGF9JiR7ZGF0YX1gIDogZGF0YTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fZGF0YSA9ICh0aGlzLl9kYXRhIHx8ICcnKSArIGRhdGE7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHRoaXMuX2RhdGEgPSBkYXRhO1xuICB9XG5cbiAgaWYgKCFpc09iamVjdF8gfHwgdGhpcy5faXNIb3N0KGRhdGEpKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyBkZWZhdWx0IHRvIGpzb25cbiAgaWYgKCF0eXBlKSB0aGlzLnR5cGUoJ2pzb24nKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFNvcnQgYHF1ZXJ5c3RyaW5nYCBieSB0aGUgc29ydCBmdW5jdGlvblxuICpcbiAqXG4gKiBFeGFtcGxlczpcbiAqXG4gKiAgICAgICAvLyBkZWZhdWx0IG9yZGVyXG4gKiAgICAgICByZXF1ZXN0LmdldCgnL3VzZXInKVxuICogICAgICAgICAucXVlcnkoJ25hbWU9TmljaycpXG4gKiAgICAgICAgIC5xdWVyeSgnc2VhcmNoPU1hbm55JylcbiAqICAgICAgICAgLnNvcnRRdWVyeSgpXG4gKiAgICAgICAgIC5lbmQoY2FsbGJhY2spXG4gKlxuICogICAgICAgLy8gY3VzdG9taXplZCBzb3J0IGZ1bmN0aW9uXG4gKiAgICAgICByZXF1ZXN0LmdldCgnL3VzZXInKVxuICogICAgICAgICAucXVlcnkoJ25hbWU9TmljaycpXG4gKiAgICAgICAgIC5xdWVyeSgnc2VhcmNoPU1hbm55JylcbiAqICAgICAgICAgLnNvcnRRdWVyeShmdW5jdGlvbihhLCBiKXtcbiAqICAgICAgICAgICByZXR1cm4gYS5sZW5ndGggLSBiLmxlbmd0aDtcbiAqICAgICAgICAgfSlcbiAqICAgICAgICAgLmVuZChjYWxsYmFjaylcbiAqXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gc29ydFxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5zb3J0UXVlcnkgPSBmdW5jdGlvbiAoc29ydCkge1xuICAvLyBfc29ydCBkZWZhdWx0IHRvIHRydWUgYnV0IG90aGVyd2lzZSBjYW4gYmUgYSBmdW5jdGlvbiBvciBib29sZWFuXG4gIHRoaXMuX3NvcnQgPSB0eXBlb2Ygc29ydCA9PT0gJ3VuZGVmaW5lZCcgPyB0cnVlIDogc29ydDtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIENvbXBvc2UgcXVlcnlzdHJpbmcgdG8gYXBwZW5kIHRvIHJlcS51cmxcbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuUmVxdWVzdEJhc2UucHJvdG90eXBlLl9maW5hbGl6ZVF1ZXJ5U3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICBjb25zdCBxdWVyeSA9IHRoaXMuX3F1ZXJ5LmpvaW4oJyYnKTtcbiAgaWYgKHF1ZXJ5KSB7XG4gICAgdGhpcy51cmwgKz0gKHRoaXMudXJsLmluY2x1ZGVzKCc/JykgPyAnJicgOiAnPycpICsgcXVlcnk7XG4gIH1cblxuICB0aGlzLl9xdWVyeS5sZW5ndGggPSAwOyAvLyBNYWtlcyB0aGUgY2FsbCBpZGVtcG90ZW50XG5cbiAgaWYgKHRoaXMuX3NvcnQpIHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMudXJsLmluZGV4T2YoJz8nKTtcbiAgICBpZiAoaW5kZXggPj0gMCkge1xuICAgICAgY29uc3QgcXVlcnlBcnJheSA9IHRoaXMudXJsLnNsaWNlKGluZGV4ICsgMSkuc3BsaXQoJyYnKTtcbiAgICAgIGlmICh0eXBlb2YgdGhpcy5fc29ydCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBxdWVyeUFycmF5LnNvcnQodGhpcy5fc29ydCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBxdWVyeUFycmF5LnNvcnQoKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy51cmwgPSB0aGlzLnVybC5zbGljZSgwLCBpbmRleCkgKyAnPycgKyBxdWVyeUFycmF5LmpvaW4oJyYnKTtcbiAgICB9XG4gIH1cbn07XG5cbi8vIEZvciBiYWNrd2FyZHMgY29tcGF0IG9ubHlcblJlcXVlc3RCYXNlLnByb3RvdHlwZS5fYXBwZW5kUXVlcnlTdHJpbmcgPSAoKSA9PiB7XG4gIGNvbnNvbGUud2FybignVW5zdXBwb3J0ZWQnKTtcbn07XG5cbi8qKlxuICogSW52b2tlIGNhbGxiYWNrIHdpdGggdGltZW91dCBlcnJvci5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUuX3RpbWVvdXRFcnJvciA9IGZ1bmN0aW9uIChyZWFzb24sIHRpbWVvdXQsIGVycm5vKSB7XG4gIGlmICh0aGlzLl9hYm9ydGVkKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgZXJyb3IgPSBuZXcgRXJyb3IoYCR7cmVhc29uICsgdGltZW91dH1tcyBleGNlZWRlZGApO1xuICBlcnJvci50aW1lb3V0ID0gdGltZW91dDtcbiAgZXJyb3IuY29kZSA9ICdFQ09OTkFCT1JURUQnO1xuICBlcnJvci5lcnJubyA9IGVycm5vO1xuICB0aGlzLnRpbWVkb3V0ID0gdHJ1ZTtcbiAgdGhpcy50aW1lZG91dEVycm9yID0gZXJyb3I7XG4gIHRoaXMuYWJvcnQoKTtcbiAgdGhpcy5jYWxsYmFjayhlcnJvcik7XG59O1xuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUuX3NldFRpbWVvdXRzID0gZnVuY3Rpb24gKCkge1xuICBjb25zdCBzZWxmID0gdGhpcztcblxuICAvLyBkZWFkbGluZVxuICBpZiAodGhpcy5fdGltZW91dCAmJiAhdGhpcy5fdGltZXIpIHtcbiAgICB0aGlzLl90aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgc2VsZi5fdGltZW91dEVycm9yKCdUaW1lb3V0IG9mICcsIHNlbGYuX3RpbWVvdXQsICdFVElNRScpO1xuICAgIH0sIHRoaXMuX3RpbWVvdXQpO1xuICB9XG5cbiAgLy8gcmVzcG9uc2UgdGltZW91dFxuICBpZiAodGhpcy5fcmVzcG9uc2VUaW1lb3V0ICYmICF0aGlzLl9yZXNwb25zZVRpbWVvdXRUaW1lcikge1xuICAgIHRoaXMuX3Jlc3BvbnNlVGltZW91dFRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBzZWxmLl90aW1lb3V0RXJyb3IoXG4gICAgICAgICdSZXNwb25zZSB0aW1lb3V0IG9mICcsXG4gICAgICAgIHNlbGYuX3Jlc3BvbnNlVGltZW91dCxcbiAgICAgICAgJ0VUSU1FRE9VVCdcbiAgICAgICk7XG4gICAgfSwgdGhpcy5fcmVzcG9uc2VUaW1lb3V0KTtcbiAgfVxufTtcbiJdfQ==