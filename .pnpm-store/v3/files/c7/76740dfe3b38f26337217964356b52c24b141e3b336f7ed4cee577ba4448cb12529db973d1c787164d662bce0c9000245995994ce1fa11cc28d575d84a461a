"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * Root reference for iframes.
 */
var root;

if (typeof window !== 'undefined') {
  // Browser window
  root = window;
} else if (typeof self === 'undefined') {
  // Other environments
  console.warn('Using browser-only version of superagent in non-browser environment');
  root = void 0;
} else {
  // Web Worker
  root = self;
}

var Emitter = require('component-emitter');

var safeStringify = require('fast-safe-stringify');

var qs = require('qs');

var RequestBase = require('./request-base');

var _require = require('./utils'),
    isObject = _require.isObject,
    mixin = _require.mixin,
    hasOwn = _require.hasOwn;

var ResponseBase = require('./response-base');

var Agent = require('./agent-base');
/**
 * Noop.
 */


function noop() {}
/**
 * Expose `request`.
 */


module.exports = function (method, url) {
  // callback
  if (typeof url === 'function') {
    return new exports.Request('GET', method).end(url);
  } // url first


  if (arguments.length === 1) {
    return new exports.Request('GET', method);
  }

  return new exports.Request(method, url);
};

exports = module.exports;
var request = exports;
exports.Request = Request;
/**
 * Determine XHR.
 */

request.getXHR = function () {
  if (root.XMLHttpRequest && (!root.location || root.location.protocol !== 'file:' || !root.ActiveXObject)) {
    return new XMLHttpRequest();
  }

  try {
    return new ActiveXObject('Microsoft.XMLHTTP');
  } catch (_unused) {
    /**/
  }

  try {
    return new ActiveXObject('Msxml2.XMLHTTP.6.0');
  } catch (_unused2) {
    /**/
  }

  try {
    return new ActiveXObject('Msxml2.XMLHTTP.3.0');
  } catch (_unused3) {
    /**/
  }

  try {
    return new ActiveXObject('Msxml2.XMLHTTP');
  } catch (_unused4) {
    /**/
  }

  throw new Error('Browser-only version of superagent could not find XHR');
};
/**
 * Removes leading and trailing whitespace, added to support IE.
 *
 * @param {String} s
 * @return {String}
 * @api private
 */


var trim = ''.trim ? function (s) {
  return s.trim();
} : function (s) {
  return s.replace(/(^\s*|\s*$)/g, '');
};
/**
 * Serialize the given `obj`.
 *
 * @param {Object} obj
 * @return {String}
 * @api private
 */

function serialize(object) {
  if (!isObject(object)) return object;
  var pairs = [];

  for (var key in object) {
    if (hasOwn(object, key)) pushEncodedKeyValuePair(pairs, key, object[key]);
  }

  return pairs.join('&');
}
/**
 * Helps 'serialize' with serializing arrays.
 * Mutates the pairs array.
 *
 * @param {Array} pairs
 * @param {String} key
 * @param {Mixed} val
 */


function pushEncodedKeyValuePair(pairs, key, value) {
  if (value === undefined) return;

  if (value === null) {
    pairs.push(encodeURI(key));
    return;
  }

  if (Array.isArray(value)) {
    var _iterator = _createForOfIteratorHelper(value),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var v = _step.value;
        pushEncodedKeyValuePair(pairs, key, v);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  } else if (isObject(value)) {
    for (var subkey in value) {
      if (hasOwn(value, subkey)) pushEncodedKeyValuePair(pairs, "".concat(key, "[").concat(subkey, "]"), value[subkey]);
    }
  } else {
    pairs.push(encodeURI(key) + '=' + encodeURIComponent(value));
  }
}
/**
 * Expose serialization method.
 */


request.serializeObject = serialize;
/**
 * Parse the given x-www-form-urlencoded `str`.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */

function parseString(string_) {
  var object = {};
  var pairs = string_.split('&');
  var pair;
  var pos;

  for (var i = 0, length_ = pairs.length; i < length_; ++i) {
    pair = pairs[i];
    pos = pair.indexOf('=');

    if (pos === -1) {
      object[decodeURIComponent(pair)] = '';
    } else {
      object[decodeURIComponent(pair.slice(0, pos))] = decodeURIComponent(pair.slice(pos + 1));
    }
  }

  return object;
}
/**
 * Expose parser.
 */


request.parseString = parseString;
/**
 * Default MIME type map.
 *
 *     superagent.types.xml = 'application/xml';
 *
 */

request.types = {
  html: 'text/html',
  json: 'application/json',
  xml: 'text/xml',
  urlencoded: 'application/x-www-form-urlencoded',
  form: 'application/x-www-form-urlencoded',
  'form-data': 'application/x-www-form-urlencoded'
};
/**
 * Default serialization map.
 *
 *     superagent.serialize['application/xml'] = function(obj){
 *       return 'generated xml here';
 *     };
 *
 */

request.serialize = {
  'application/x-www-form-urlencoded': qs.stringify,
  'application/json': safeStringify
};
/**
 * Default parsers.
 *
 *     superagent.parse['application/xml'] = function(str){
 *       return { object parsed from str };
 *     };
 *
 */

request.parse = {
  'application/x-www-form-urlencoded': parseString,
  'application/json': JSON.parse
};
/**
 * Parse the given header `str` into
 * an object containing the mapped fields.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */

function parseHeader(string_) {
  var lines = string_.split(/\r?\n/);
  var fields = {};
  var index;
  var line;
  var field;
  var value;

  for (var i = 0, length_ = lines.length; i < length_; ++i) {
    line = lines[i];
    index = line.indexOf(':');

    if (index === -1) {
      // could be empty line, just skip it
      continue;
    }

    field = line.slice(0, index).toLowerCase();
    value = trim(line.slice(index + 1));
    fields[field] = value;
  }

  return fields;
}
/**
 * Check if `mime` is json or has +json structured syntax suffix.
 *
 * @param {String} mime
 * @return {Boolean}
 * @api private
 */


function isJSON(mime) {
  // should match /json or +json
  // but not /json-seq
  return /[/+]json($|[^-\w])/i.test(mime);
}
/**
 * Initialize a new `Response` with the given `xhr`.
 *
 *  - set flags (.ok, .error, etc)
 *  - parse header
 *
 * Examples:
 *
 *  Aliasing `superagent` as `request` is nice:
 *
 *      request = superagent;
 *
 *  We can use the promise-like API, or pass callbacks:
 *
 *      request.get('/').end(function(res){});
 *      request.get('/', function(res){});
 *
 *  Sending data can be chained:
 *
 *      request
 *        .post('/user')
 *        .send({ name: 'tj' })
 *        .end(function(res){});
 *
 *  Or passed to `.send()`:
 *
 *      request
 *        .post('/user')
 *        .send({ name: 'tj' }, function(res){});
 *
 *  Or passed to `.post()`:
 *
 *      request
 *        .post('/user', { name: 'tj' })
 *        .end(function(res){});
 *
 * Or further reduced to a single call for simple cases:
 *
 *      request
 *        .post('/user', { name: 'tj' }, function(res){});
 *
 * @param {XMLHTTPRequest} xhr
 * @param {Object} options
 * @api private
 */


function Response(request_) {
  this.req = request_;
  this.xhr = this.req.xhr; // responseText is accessible only if responseType is '' or 'text' and on older browsers

  this.text = this.req.method !== 'HEAD' && (this.xhr.responseType === '' || this.xhr.responseType === 'text') || typeof this.xhr.responseType === 'undefined' ? this.xhr.responseText : null;
  this.statusText = this.req.xhr.statusText;
  var status = this.xhr.status; // handle IE9 bug: http://stackoverflow.com/questions/10046972/msie-returns-status-code-of-1223-for-ajax-request

  if (status === 1223) {
    status = 204;
  }

  this._setStatusProperties(status);

  this.headers = parseHeader(this.xhr.getAllResponseHeaders());
  this.header = this.headers; // getAllResponseHeaders sometimes falsely returns "" for CORS requests, but
  // getResponseHeader still works. so we get content-type even if getting
  // other headers fails.

  this.header['content-type'] = this.xhr.getResponseHeader('content-type');

  this._setHeaderProperties(this.header);

  if (this.text === null && request_._responseType) {
    this.body = this.xhr.response;
  } else {
    this.body = this.req.method === 'HEAD' ? null : this._parseBody(this.text ? this.text : this.xhr.response);
  }
}

mixin(Response.prototype, ResponseBase.prototype);
/**
 * Parse the given body `str`.
 *
 * Used for auto-parsing of bodies. Parsers
 * are defined on the `superagent.parse` object.
 *
 * @param {String} str
 * @return {Mixed}
 * @api private
 */

Response.prototype._parseBody = function (string_) {
  var parse = request.parse[this.type];

  if (this.req._parser) {
    return this.req._parser(this, string_);
  }

  if (!parse && isJSON(this.type)) {
    parse = request.parse['application/json'];
  }

  return parse && string_ && (string_.length > 0 || string_ instanceof Object) ? parse(string_) : null;
};
/**
 * Return an `Error` representative of this response.
 *
 * @return {Error}
 * @api public
 */


Response.prototype.toError = function () {
  var req = this.req;
  var method = req.method;
  var url = req.url;
  var message = "cannot ".concat(method, " ").concat(url, " (").concat(this.status, ")");
  var error = new Error(message);
  error.status = this.status;
  error.method = method;
  error.url = url;
  return error;
};
/**
 * Expose `Response`.
 */


request.Response = Response;
/**
 * Initialize a new `Request` with the given `method` and `url`.
 *
 * @param {String} method
 * @param {String} url
 * @api public
 */

function Request(method, url) {
  var self = this;
  this._query = this._query || [];
  this.method = method;
  this.url = url;
  this.header = {}; // preserves header name case

  this._header = {}; // coerces header names to lowercase

  this.on('end', function () {
    var error = null;
    var res = null;

    try {
      res = new Response(self);
    } catch (err) {
      error = new Error('Parser is unable to parse the response');
      error.parse = true;
      error.original = err; // issue #675: return the raw response if the response parsing fails

      if (self.xhr) {
        // ie9 doesn't have 'response' property
        error.rawResponse = typeof self.xhr.responseType === 'undefined' ? self.xhr.responseText : self.xhr.response; // issue #876: return the http status code if the response parsing fails

        error.status = self.xhr.status ? self.xhr.status : null;
        error.statusCode = error.status; // backwards-compat only
      } else {
        error.rawResponse = null;
        error.status = null;
      }

      return self.callback(error);
    }

    self.emit('response', res);
    var new_error;

    try {
      if (!self._isResponseOK(res)) {
        new_error = new Error(res.statusText || res.text || 'Unsuccessful HTTP response');
      }
    } catch (err) {
      new_error = err; // ok() callback can throw
    } // #1000 don't catch errors from the callback to avoid double calling it


    if (new_error) {
      new_error.original = error;
      new_error.response = res;
      new_error.status = res.status;
      self.callback(new_error, res);
    } else {
      self.callback(null, res);
    }
  });
}
/**
 * Mixin `Emitter` and `RequestBase`.
 */
// eslint-disable-next-line new-cap


Emitter(Request.prototype);
mixin(Request.prototype, RequestBase.prototype);
/**
 * Set Content-Type to `type`, mapping values from `request.types`.
 *
 * Examples:
 *
 *      superagent.types.xml = 'application/xml';
 *
 *      request.post('/')
 *        .type('xml')
 *        .send(xmlstring)
 *        .end(callback);
 *
 *      request.post('/')
 *        .type('application/xml')
 *        .send(xmlstring)
 *        .end(callback);
 *
 * @param {String} type
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.type = function (type) {
  this.set('Content-Type', request.types[type] || type);
  return this;
};
/**
 * Set Accept to `type`, mapping values from `request.types`.
 *
 * Examples:
 *
 *      superagent.types.json = 'application/json';
 *
 *      request.get('/agent')
 *        .accept('json')
 *        .end(callback);
 *
 *      request.get('/agent')
 *        .accept('application/json')
 *        .end(callback);
 *
 * @param {String} accept
 * @return {Request} for chaining
 * @api public
 */


Request.prototype.accept = function (type) {
  this.set('Accept', request.types[type] || type);
  return this;
};
/**
 * Set Authorization field value with `user` and `pass`.
 *
 * @param {String} user
 * @param {String} [pass] optional in case of using 'bearer' as type
 * @param {Object} options with 'type' property 'auto', 'basic' or 'bearer' (default 'basic')
 * @return {Request} for chaining
 * @api public
 */


Request.prototype.auth = function (user, pass, options) {
  if (arguments.length === 1) pass = '';

  if (_typeof(pass) === 'object' && pass !== null) {
    // pass is optional and can be replaced with options
    options = pass;
    pass = '';
  }

  if (!options) {
    options = {
      type: typeof btoa === 'function' ? 'basic' : 'auto'
    };
  }

  var encoder = options.encoder ? options.encoder : function (string) {
    if (typeof btoa === 'function') {
      return btoa(string);
    }

    throw new Error('Cannot use basic auth, btoa is not a function');
  };
  return this._auth(user, pass, options, encoder);
};
/**
 * Add query-string `val`.
 *
 * Examples:
 *
 *   request.get('/shoes')
 *     .query('size=10')
 *     .query({ color: 'blue' })
 *
 * @param {Object|String} val
 * @return {Request} for chaining
 * @api public
 */


Request.prototype.query = function (value) {
  if (typeof value !== 'string') value = serialize(value);
  if (value) this._query.push(value);
  return this;
};
/**
 * Queue the given `file` as an attachment to the specified `field`,
 * with optional `options` (or filename).
 *
 * ``` js
 * request.post('/upload')
 *   .attach('content', new Blob(['<a id="a"><b id="b">hey!</b></a>'], { type: "text/html"}))
 *   .end(callback);
 * ```
 *
 * @param {String} field
 * @param {Blob|File} file
 * @param {String|Object} options
 * @return {Request} for chaining
 * @api public
 */


Request.prototype.attach = function (field, file, options) {
  if (file) {
    if (this._data) {
      throw new Error("superagent can't mix .send() and .attach()");
    }

    this._getFormData().append(field, file, options || file.name);
  }

  return this;
};

Request.prototype._getFormData = function () {
  if (!this._formData) {
    this._formData = new root.FormData();
  }

  return this._formData;
};
/**
 * Invoke the callback with `err` and `res`
 * and handle arity check.
 *
 * @param {Error} err
 * @param {Response} res
 * @api private
 */


Request.prototype.callback = function (error, res) {
  if (this._shouldRetry(error, res)) {
    return this._retry();
  }

  var fn = this._callback;
  this.clearTimeout();

  if (error) {
    if (this._maxRetries) error.retries = this._retries - 1;
    this.emit('error', error);
  }

  fn(error, res);
};
/**
 * Invoke callback with x-domain error.
 *
 * @api private
 */


Request.prototype.crossDomainError = function () {
  var error = new Error('Request has been terminated\nPossible causes: the network is offline, Origin is not allowed by Access-Control-Allow-Origin, the page is being unloaded, etc.');
  error.crossDomain = true;
  error.status = this.status;
  error.method = this.method;
  error.url = this.url;
  this.callback(error);
}; // This only warns, because the request is still likely to work


Request.prototype.agent = function () {
  console.warn('This is not supported in browser version of superagent');
  return this;
};

Request.prototype.ca = Request.prototype.agent;
Request.prototype.buffer = Request.prototype.ca; // This throws, because it can't send/receive data as expected

Request.prototype.write = function () {
  throw new Error('Streaming is not supported in browser version of superagent');
};

Request.prototype.pipe = Request.prototype.write;
/**
 * Check if `obj` is a host object,
 * we don't want to serialize these :)
 *
 * @param {Object} obj host object
 * @return {Boolean} is a host object
 * @api private
 */

Request.prototype._isHost = function (object) {
  // Native objects stringify to [object File], [object Blob], [object FormData], etc.
  return object && _typeof(object) === 'object' && !Array.isArray(object) && Object.prototype.toString.call(object) !== '[object Object]';
};
/**
 * Initiate request, invoking callback `fn(res)`
 * with an instanceof `Response`.
 *
 * @param {Function} fn
 * @return {Request} for chaining
 * @api public
 */


Request.prototype.end = function (fn) {
  if (this._endCalled) {
    console.warn('Warning: .end() was called twice. This is not supported in superagent');
  }

  this._endCalled = true; // store callback

  this._callback = fn || noop; // querystring

  this._finalizeQueryString();

  this._end();
};

Request.prototype._setUploadTimeout = function () {
  var self = this; // upload timeout it's wokrs only if deadline timeout is off

  if (this._uploadTimeout && !this._uploadTimeoutTimer) {
    this._uploadTimeoutTimer = setTimeout(function () {
      self._timeoutError('Upload timeout of ', self._uploadTimeout, 'ETIMEDOUT');
    }, this._uploadTimeout);
  }
}; // eslint-disable-next-line complexity


Request.prototype._end = function () {
  if (this._aborted) return this.callback(new Error('The request has been aborted even before .end() was called'));
  var self = this;
  this.xhr = request.getXHR();
  var xhr = this.xhr;
  var data = this._formData || this._data;

  this._setTimeouts(); // state change


  xhr.addEventListener('readystatechange', function () {
    var readyState = xhr.readyState;

    if (readyState >= 2 && self._responseTimeoutTimer) {
      clearTimeout(self._responseTimeoutTimer);
    }

    if (readyState !== 4) {
      return;
    } // In IE9, reads to any property (e.g. status) off of an aborted XHR will
    // result in the error "Could not complete the operation due to error c00c023f"


    var status;

    try {
      status = xhr.status;
    } catch (_unused5) {
      status = 0;
    }

    if (!status) {
      if (self.timedout || self._aborted) return;
      return self.crossDomainError();
    }

    self.emit('end');
  }); // progress

  var handleProgress = function handleProgress(direction, e) {
    if (e.total > 0) {
      e.percent = e.loaded / e.total * 100;

      if (e.percent === 100) {
        clearTimeout(self._uploadTimeoutTimer);
      }
    }

    e.direction = direction;
    self.emit('progress', e);
  };

  if (this.hasListeners('progress')) {
    try {
      xhr.addEventListener('progress', handleProgress.bind(null, 'download'));

      if (xhr.upload) {
        xhr.upload.addEventListener('progress', handleProgress.bind(null, 'upload'));
      }
    } catch (_unused6) {// Accessing xhr.upload fails in IE from a web worker, so just pretend it doesn't exist.
      // Reported here:
      // https://connect.microsoft.com/IE/feedback/details/837245/xmlhttprequest-upload-throws-invalid-argument-when-used-from-web-worker-context
    }
  }

  if (xhr.upload) {
    this._setUploadTimeout();
  } // initiate request


  try {
    if (this.username && this.password) {
      xhr.open(this.method, this.url, true, this.username, this.password);
    } else {
      xhr.open(this.method, this.url, true);
    }
  } catch (err) {
    // see #1149
    return this.callback(err);
  } // CORS


  if (this._withCredentials) xhr.withCredentials = true; // body

  if (!this._formData && this.method !== 'GET' && this.method !== 'HEAD' && typeof data !== 'string' && !this._isHost(data)) {
    // serialize stuff
    var contentType = this._header['content-type'];

    var _serialize = this._serializer || request.serialize[contentType ? contentType.split(';')[0] : ''];

    if (!_serialize && isJSON(contentType)) {
      _serialize = request.serialize['application/json'];
    }

    if (_serialize) data = _serialize(data);
  } // set header fields


  for (var field in this.header) {
    if (this.header[field] === null) continue;
    if (hasOwn(this.header, field)) xhr.setRequestHeader(field, this.header[field]);
  }

  if (this._responseType) {
    xhr.responseType = this._responseType;
  } // send stuff


  this.emit('request', this); // IE11 xhr.send(undefined) sends 'undefined' string as POST payload (instead of nothing)
  // We need null here if data is undefined

  xhr.send(typeof data === 'undefined' ? null : data);
};

request.agent = function () {
  return new Agent();
};

var _loop = function _loop() {
  var method = _arr[_i];

  Agent.prototype[method.toLowerCase()] = function (url, fn) {
    var request_ = new request.Request(method, url);

    this._setDefaults(request_);

    if (fn) {
      request_.end(fn);
    }

    return request_;
  };
};

for (var _i = 0, _arr = ['GET', 'POST', 'OPTIONS', 'PATCH', 'PUT', 'DELETE']; _i < _arr.length; _i++) {
  _loop();
}

Agent.prototype.del = Agent.prototype.delete;
/**
 * GET `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} [data] or fn
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

request.get = function (url, data, fn) {
  var request_ = request('GET', url);

  if (typeof data === 'function') {
    fn = data;
    data = null;
  }

  if (data) request_.query(data);
  if (fn) request_.end(fn);
  return request_;
};
/**
 * HEAD `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} [data] or fn
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */


request.head = function (url, data, fn) {
  var request_ = request('HEAD', url);

  if (typeof data === 'function') {
    fn = data;
    data = null;
  }

  if (data) request_.query(data);
  if (fn) request_.end(fn);
  return request_;
};
/**
 * OPTIONS query to `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} [data] or fn
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */


request.options = function (url, data, fn) {
  var request_ = request('OPTIONS', url);

  if (typeof data === 'function') {
    fn = data;
    data = null;
  }

  if (data) request_.send(data);
  if (fn) request_.end(fn);
  return request_;
};
/**
 * DELETE `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed} [data]
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */


function del(url, data, fn) {
  var request_ = request('DELETE', url);

  if (typeof data === 'function') {
    fn = data;
    data = null;
  }

  if (data) request_.send(data);
  if (fn) request_.end(fn);
  return request_;
}

request.del = del;
request.delete = del;
/**
 * PATCH `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed} [data]
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

request.patch = function (url, data, fn) {
  var request_ = request('PATCH', url);

  if (typeof data === 'function') {
    fn = data;
    data = null;
  }

  if (data) request_.send(data);
  if (fn) request_.end(fn);
  return request_;
};
/**
 * POST `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed} [data]
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */


request.post = function (url, data, fn) {
  var request_ = request('POST', url);

  if (typeof data === 'function') {
    fn = data;
    data = null;
  }

  if (data) request_.send(data);
  if (fn) request_.end(fn);
  return request_;
};
/**
 * PUT `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} [data] or fn
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */


request.put = function (url, data, fn) {
  var request_ = request('PUT', url);

  if (typeof data === 'function') {
    fn = data;
    data = null;
  }

  if (data) request_.send(data);
  if (fn) request_.end(fn);
  return request_;
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jbGllbnQuanMiXSwibmFtZXMiOlsicm9vdCIsIndpbmRvdyIsInNlbGYiLCJjb25zb2xlIiwid2FybiIsIkVtaXR0ZXIiLCJyZXF1aXJlIiwic2FmZVN0cmluZ2lmeSIsInFzIiwiUmVxdWVzdEJhc2UiLCJpc09iamVjdCIsIm1peGluIiwiaGFzT3duIiwiUmVzcG9uc2VCYXNlIiwiQWdlbnQiLCJub29wIiwibW9kdWxlIiwiZXhwb3J0cyIsIm1ldGhvZCIsInVybCIsIlJlcXVlc3QiLCJlbmQiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJyZXF1ZXN0IiwiZ2V0WEhSIiwiWE1MSHR0cFJlcXVlc3QiLCJsb2NhdGlvbiIsInByb3RvY29sIiwiQWN0aXZlWE9iamVjdCIsIkVycm9yIiwidHJpbSIsInMiLCJyZXBsYWNlIiwic2VyaWFsaXplIiwib2JqZWN0IiwicGFpcnMiLCJrZXkiLCJwdXNoRW5jb2RlZEtleVZhbHVlUGFpciIsImpvaW4iLCJ2YWx1ZSIsInVuZGVmaW5lZCIsInB1c2giLCJlbmNvZGVVUkkiLCJBcnJheSIsImlzQXJyYXkiLCJ2Iiwic3Via2V5IiwiZW5jb2RlVVJJQ29tcG9uZW50Iiwic2VyaWFsaXplT2JqZWN0IiwicGFyc2VTdHJpbmciLCJzdHJpbmdfIiwic3BsaXQiLCJwYWlyIiwicG9zIiwiaSIsImxlbmd0aF8iLCJpbmRleE9mIiwiZGVjb2RlVVJJQ29tcG9uZW50Iiwic2xpY2UiLCJ0eXBlcyIsImh0bWwiLCJqc29uIiwieG1sIiwidXJsZW5jb2RlZCIsImZvcm0iLCJzdHJpbmdpZnkiLCJwYXJzZSIsIkpTT04iLCJwYXJzZUhlYWRlciIsImxpbmVzIiwiZmllbGRzIiwiaW5kZXgiLCJsaW5lIiwiZmllbGQiLCJ0b0xvd2VyQ2FzZSIsImlzSlNPTiIsIm1pbWUiLCJ0ZXN0IiwiUmVzcG9uc2UiLCJyZXF1ZXN0XyIsInJlcSIsInhociIsInRleHQiLCJyZXNwb25zZVR5cGUiLCJyZXNwb25zZVRleHQiLCJzdGF0dXNUZXh0Iiwic3RhdHVzIiwiX3NldFN0YXR1c1Byb3BlcnRpZXMiLCJoZWFkZXJzIiwiZ2V0QWxsUmVzcG9uc2VIZWFkZXJzIiwiaGVhZGVyIiwiZ2V0UmVzcG9uc2VIZWFkZXIiLCJfc2V0SGVhZGVyUHJvcGVydGllcyIsIl9yZXNwb25zZVR5cGUiLCJib2R5IiwicmVzcG9uc2UiLCJfcGFyc2VCb2R5IiwicHJvdG90eXBlIiwidHlwZSIsIl9wYXJzZXIiLCJPYmplY3QiLCJ0b0Vycm9yIiwibWVzc2FnZSIsImVycm9yIiwiX3F1ZXJ5IiwiX2hlYWRlciIsIm9uIiwicmVzIiwiZXJyIiwib3JpZ2luYWwiLCJyYXdSZXNwb25zZSIsInN0YXR1c0NvZGUiLCJjYWxsYmFjayIsImVtaXQiLCJuZXdfZXJyb3IiLCJfaXNSZXNwb25zZU9LIiwic2V0IiwiYWNjZXB0IiwiYXV0aCIsInVzZXIiLCJwYXNzIiwib3B0aW9ucyIsImJ0b2EiLCJlbmNvZGVyIiwic3RyaW5nIiwiX2F1dGgiLCJxdWVyeSIsImF0dGFjaCIsImZpbGUiLCJfZGF0YSIsIl9nZXRGb3JtRGF0YSIsImFwcGVuZCIsIm5hbWUiLCJfZm9ybURhdGEiLCJGb3JtRGF0YSIsIl9zaG91bGRSZXRyeSIsIl9yZXRyeSIsImZuIiwiX2NhbGxiYWNrIiwiY2xlYXJUaW1lb3V0IiwiX21heFJldHJpZXMiLCJyZXRyaWVzIiwiX3JldHJpZXMiLCJjcm9zc0RvbWFpbkVycm9yIiwiY3Jvc3NEb21haW4iLCJhZ2VudCIsImNhIiwiYnVmZmVyIiwid3JpdGUiLCJwaXBlIiwiX2lzSG9zdCIsInRvU3RyaW5nIiwiY2FsbCIsIl9lbmRDYWxsZWQiLCJfZmluYWxpemVRdWVyeVN0cmluZyIsIl9lbmQiLCJfc2V0VXBsb2FkVGltZW91dCIsIl91cGxvYWRUaW1lb3V0IiwiX3VwbG9hZFRpbWVvdXRUaW1lciIsInNldFRpbWVvdXQiLCJfdGltZW91dEVycm9yIiwiX2Fib3J0ZWQiLCJkYXRhIiwiX3NldFRpbWVvdXRzIiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlYWR5U3RhdGUiLCJfcmVzcG9uc2VUaW1lb3V0VGltZXIiLCJ0aW1lZG91dCIsImhhbmRsZVByb2dyZXNzIiwiZGlyZWN0aW9uIiwiZSIsInRvdGFsIiwicGVyY2VudCIsImxvYWRlZCIsImhhc0xpc3RlbmVycyIsImJpbmQiLCJ1cGxvYWQiLCJ1c2VybmFtZSIsInBhc3N3b3JkIiwib3BlbiIsIl93aXRoQ3JlZGVudGlhbHMiLCJ3aXRoQ3JlZGVudGlhbHMiLCJjb250ZW50VHlwZSIsIl9zZXJpYWxpemVyIiwic2V0UmVxdWVzdEhlYWRlciIsInNlbmQiLCJfc2V0RGVmYXVsdHMiLCJkZWwiLCJkZWxldGUiLCJnZXQiLCJoZWFkIiwicGF0Y2giLCJwb3N0IiwicHV0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBRUEsSUFBSUEsSUFBSjs7QUFDQSxJQUFJLE9BQU9DLE1BQVAsS0FBa0IsV0FBdEIsRUFBbUM7QUFDakM7QUFDQUQsRUFBQUEsSUFBSSxHQUFHQyxNQUFQO0FBQ0QsQ0FIRCxNQUdPLElBQUksT0FBT0MsSUFBUCxLQUFnQixXQUFwQixFQUFpQztBQUN0QztBQUNBQyxFQUFBQSxPQUFPLENBQUNDLElBQVIsQ0FDRSxxRUFERjtBQUdBSixFQUFBQSxJQUFJLFNBQUo7QUFDRCxDQU5NLE1BTUE7QUFDTDtBQUNBQSxFQUFBQSxJQUFJLEdBQUdFLElBQVA7QUFDRDs7QUFFRCxJQUFNRyxPQUFPLEdBQUdDLE9BQU8sQ0FBQyxtQkFBRCxDQUF2Qjs7QUFDQSxJQUFNQyxhQUFhLEdBQUdELE9BQU8sQ0FBQyxxQkFBRCxDQUE3Qjs7QUFDQSxJQUFNRSxFQUFFLEdBQUdGLE9BQU8sQ0FBQyxJQUFELENBQWxCOztBQUNBLElBQU1HLFdBQVcsR0FBR0gsT0FBTyxDQUFDLGdCQUFELENBQTNCOztBQUNBLGVBQW9DQSxPQUFPLENBQUMsU0FBRCxDQUEzQztBQUFBLElBQVFJLFFBQVIsWUFBUUEsUUFBUjtBQUFBLElBQWtCQyxLQUFsQixZQUFrQkEsS0FBbEI7QUFBQSxJQUF5QkMsTUFBekIsWUFBeUJBLE1BQXpCOztBQUNBLElBQU1DLFlBQVksR0FBR1AsT0FBTyxDQUFDLGlCQUFELENBQTVCOztBQUNBLElBQU1RLEtBQUssR0FBR1IsT0FBTyxDQUFDLGNBQUQsQ0FBckI7QUFFQTtBQUNBO0FBQ0E7OztBQUVBLFNBQVNTLElBQVQsR0FBZ0IsQ0FBRTtBQUVsQjtBQUNBO0FBQ0E7OztBQUVBQyxNQUFNLENBQUNDLE9BQVAsR0FBaUIsVUFBVUMsTUFBVixFQUFrQkMsR0FBbEIsRUFBdUI7QUFDdEM7QUFDQSxNQUFJLE9BQU9BLEdBQVAsS0FBZSxVQUFuQixFQUErQjtBQUM3QixXQUFPLElBQUlGLE9BQU8sQ0FBQ0csT0FBWixDQUFvQixLQUFwQixFQUEyQkYsTUFBM0IsRUFBbUNHLEdBQW5DLENBQXVDRixHQUF2QyxDQUFQO0FBQ0QsR0FKcUMsQ0FNdEM7OztBQUNBLE1BQUlHLFNBQVMsQ0FBQ0MsTUFBVixLQUFxQixDQUF6QixFQUE0QjtBQUMxQixXQUFPLElBQUlOLE9BQU8sQ0FBQ0csT0FBWixDQUFvQixLQUFwQixFQUEyQkYsTUFBM0IsQ0FBUDtBQUNEOztBQUVELFNBQU8sSUFBSUQsT0FBTyxDQUFDRyxPQUFaLENBQW9CRixNQUFwQixFQUE0QkMsR0FBNUIsQ0FBUDtBQUNELENBWkQ7O0FBY0FGLE9BQU8sR0FBR0QsTUFBTSxDQUFDQyxPQUFqQjtBQUVBLElBQU1PLE9BQU8sR0FBR1AsT0FBaEI7QUFFQUEsT0FBTyxDQUFDRyxPQUFSLEdBQWtCQSxPQUFsQjtBQUVBO0FBQ0E7QUFDQTs7QUFFQUksT0FBTyxDQUFDQyxNQUFSLEdBQWlCLFlBQU07QUFDckIsTUFDRXpCLElBQUksQ0FBQzBCLGNBQUwsS0FDQyxDQUFDMUIsSUFBSSxDQUFDMkIsUUFBTixJQUNDM0IsSUFBSSxDQUFDMkIsUUFBTCxDQUFjQyxRQUFkLEtBQTJCLE9BRDVCLElBRUMsQ0FBQzVCLElBQUksQ0FBQzZCLGFBSFIsQ0FERixFQUtFO0FBQ0EsV0FBTyxJQUFJSCxjQUFKLEVBQVA7QUFDRDs7QUFFRCxNQUFJO0FBQ0YsV0FBTyxJQUFJRyxhQUFKLENBQWtCLG1CQUFsQixDQUFQO0FBQ0QsR0FGRCxDQUVFLGdCQUFNO0FBQ047QUFDRDs7QUFFRCxNQUFJO0FBQ0YsV0FBTyxJQUFJQSxhQUFKLENBQWtCLG9CQUFsQixDQUFQO0FBQ0QsR0FGRCxDQUVFLGlCQUFNO0FBQ047QUFDRDs7QUFFRCxNQUFJO0FBQ0YsV0FBTyxJQUFJQSxhQUFKLENBQWtCLG9CQUFsQixDQUFQO0FBQ0QsR0FGRCxDQUVFLGlCQUFNO0FBQ047QUFDRDs7QUFFRCxNQUFJO0FBQ0YsV0FBTyxJQUFJQSxhQUFKLENBQWtCLGdCQUFsQixDQUFQO0FBQ0QsR0FGRCxDQUVFLGlCQUFNO0FBQ047QUFDRDs7QUFFRCxRQUFNLElBQUlDLEtBQUosQ0FBVSx1REFBVixDQUFOO0FBQ0QsQ0FuQ0Q7QUFxQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBLElBQU1DLElBQUksR0FBRyxHQUFHQSxJQUFILEdBQVUsVUFBQ0MsQ0FBRDtBQUFBLFNBQU9BLENBQUMsQ0FBQ0QsSUFBRixFQUFQO0FBQUEsQ0FBVixHQUE0QixVQUFDQyxDQUFEO0FBQUEsU0FBT0EsQ0FBQyxDQUFDQyxPQUFGLENBQVUsY0FBVixFQUEwQixFQUExQixDQUFQO0FBQUEsQ0FBekM7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxTQUFTQyxTQUFULENBQW1CQyxNQUFuQixFQUEyQjtBQUN6QixNQUFJLENBQUN6QixRQUFRLENBQUN5QixNQUFELENBQWIsRUFBdUIsT0FBT0EsTUFBUDtBQUN2QixNQUFNQyxLQUFLLEdBQUcsRUFBZDs7QUFDQSxPQUFLLElBQU1DLEdBQVgsSUFBa0JGLE1BQWxCLEVBQTBCO0FBQ3hCLFFBQUl2QixNQUFNLENBQUN1QixNQUFELEVBQVNFLEdBQVQsQ0FBVixFQUF5QkMsdUJBQXVCLENBQUNGLEtBQUQsRUFBUUMsR0FBUixFQUFhRixNQUFNLENBQUNFLEdBQUQsQ0FBbkIsQ0FBdkI7QUFDMUI7O0FBRUQsU0FBT0QsS0FBSyxDQUFDRyxJQUFOLENBQVcsR0FBWCxDQUFQO0FBQ0Q7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQSxTQUFTRCx1QkFBVCxDQUFpQ0YsS0FBakMsRUFBd0NDLEdBQXhDLEVBQTZDRyxLQUE3QyxFQUFvRDtBQUNsRCxNQUFJQSxLQUFLLEtBQUtDLFNBQWQsRUFBeUI7O0FBQ3pCLE1BQUlELEtBQUssS0FBSyxJQUFkLEVBQW9CO0FBQ2xCSixJQUFBQSxLQUFLLENBQUNNLElBQU4sQ0FBV0MsU0FBUyxDQUFDTixHQUFELENBQXBCO0FBQ0E7QUFDRDs7QUFFRCxNQUFJTyxLQUFLLENBQUNDLE9BQU4sQ0FBY0wsS0FBZCxDQUFKLEVBQTBCO0FBQUEsK0NBQ1JBLEtBRFE7QUFBQTs7QUFBQTtBQUN4QiwwREFBdUI7QUFBQSxZQUFaTSxDQUFZO0FBQ3JCUixRQUFBQSx1QkFBdUIsQ0FBQ0YsS0FBRCxFQUFRQyxHQUFSLEVBQWFTLENBQWIsQ0FBdkI7QUFDRDtBQUh1QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSXpCLEdBSkQsTUFJTyxJQUFJcEMsUUFBUSxDQUFDOEIsS0FBRCxDQUFaLEVBQXFCO0FBQzFCLFNBQUssSUFBTU8sTUFBWCxJQUFxQlAsS0FBckIsRUFBNEI7QUFDMUIsVUFBSTVCLE1BQU0sQ0FBQzRCLEtBQUQsRUFBUU8sTUFBUixDQUFWLEVBQ0VULHVCQUF1QixDQUFDRixLQUFELFlBQVdDLEdBQVgsY0FBa0JVLE1BQWxCLFFBQTZCUCxLQUFLLENBQUNPLE1BQUQsQ0FBbEMsQ0FBdkI7QUFDSDtBQUNGLEdBTE0sTUFLQTtBQUNMWCxJQUFBQSxLQUFLLENBQUNNLElBQU4sQ0FBV0MsU0FBUyxDQUFDTixHQUFELENBQVQsR0FBaUIsR0FBakIsR0FBdUJXLGtCQUFrQixDQUFDUixLQUFELENBQXBEO0FBQ0Q7QUFDRjtBQUVEO0FBQ0E7QUFDQTs7O0FBRUFoQixPQUFPLENBQUN5QixlQUFSLEdBQTBCZixTQUExQjtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFNBQVNnQixXQUFULENBQXFCQyxPQUFyQixFQUE4QjtBQUM1QixNQUFNaEIsTUFBTSxHQUFHLEVBQWY7QUFDQSxNQUFNQyxLQUFLLEdBQUdlLE9BQU8sQ0FBQ0MsS0FBUixDQUFjLEdBQWQsQ0FBZDtBQUNBLE1BQUlDLElBQUo7QUFDQSxNQUFJQyxHQUFKOztBQUVBLE9BQUssSUFBSUMsQ0FBQyxHQUFHLENBQVIsRUFBV0MsT0FBTyxHQUFHcEIsS0FBSyxDQUFDYixNQUFoQyxFQUF3Q2dDLENBQUMsR0FBR0MsT0FBNUMsRUFBcUQsRUFBRUQsQ0FBdkQsRUFBMEQ7QUFDeERGLElBQUFBLElBQUksR0FBR2pCLEtBQUssQ0FBQ21CLENBQUQsQ0FBWjtBQUNBRCxJQUFBQSxHQUFHLEdBQUdELElBQUksQ0FBQ0ksT0FBTCxDQUFhLEdBQWIsQ0FBTjs7QUFDQSxRQUFJSCxHQUFHLEtBQUssQ0FBQyxDQUFiLEVBQWdCO0FBQ2RuQixNQUFBQSxNQUFNLENBQUN1QixrQkFBa0IsQ0FBQ0wsSUFBRCxDQUFuQixDQUFOLEdBQW1DLEVBQW5DO0FBQ0QsS0FGRCxNQUVPO0FBQ0xsQixNQUFBQSxNQUFNLENBQUN1QixrQkFBa0IsQ0FBQ0wsSUFBSSxDQUFDTSxLQUFMLENBQVcsQ0FBWCxFQUFjTCxHQUFkLENBQUQsQ0FBbkIsQ0FBTixHQUFpREksa0JBQWtCLENBQ2pFTCxJQUFJLENBQUNNLEtBQUwsQ0FBV0wsR0FBRyxHQUFHLENBQWpCLENBRGlFLENBQW5FO0FBR0Q7QUFDRjs7QUFFRCxTQUFPbkIsTUFBUDtBQUNEO0FBRUQ7QUFDQTtBQUNBOzs7QUFFQVgsT0FBTyxDQUFDMEIsV0FBUixHQUFzQkEsV0FBdEI7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUExQixPQUFPLENBQUNvQyxLQUFSLEdBQWdCO0FBQ2RDLEVBQUFBLElBQUksRUFBRSxXQURRO0FBRWRDLEVBQUFBLElBQUksRUFBRSxrQkFGUTtBQUdkQyxFQUFBQSxHQUFHLEVBQUUsVUFIUztBQUlkQyxFQUFBQSxVQUFVLEVBQUUsbUNBSkU7QUFLZEMsRUFBQUEsSUFBSSxFQUFFLG1DQUxRO0FBTWQsZUFBYTtBQU5DLENBQWhCO0FBU0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQXpDLE9BQU8sQ0FBQ1UsU0FBUixHQUFvQjtBQUNsQix1Q0FBcUMxQixFQUFFLENBQUMwRCxTQUR0QjtBQUVsQixzQkFBb0IzRDtBQUZGLENBQXBCO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQWlCLE9BQU8sQ0FBQzJDLEtBQVIsR0FBZ0I7QUFDZCx1Q0FBcUNqQixXQUR2QjtBQUVkLHNCQUFvQmtCLElBQUksQ0FBQ0Q7QUFGWCxDQUFoQjtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsU0FBU0UsV0FBVCxDQUFxQmxCLE9BQXJCLEVBQThCO0FBQzVCLE1BQU1tQixLQUFLLEdBQUduQixPQUFPLENBQUNDLEtBQVIsQ0FBYyxPQUFkLENBQWQ7QUFDQSxNQUFNbUIsTUFBTSxHQUFHLEVBQWY7QUFDQSxNQUFJQyxLQUFKO0FBQ0EsTUFBSUMsSUFBSjtBQUNBLE1BQUlDLEtBQUo7QUFDQSxNQUFJbEMsS0FBSjs7QUFFQSxPQUFLLElBQUllLENBQUMsR0FBRyxDQUFSLEVBQVdDLE9BQU8sR0FBR2MsS0FBSyxDQUFDL0MsTUFBaEMsRUFBd0NnQyxDQUFDLEdBQUdDLE9BQTVDLEVBQXFELEVBQUVELENBQXZELEVBQTBEO0FBQ3hEa0IsSUFBQUEsSUFBSSxHQUFHSCxLQUFLLENBQUNmLENBQUQsQ0FBWjtBQUNBaUIsSUFBQUEsS0FBSyxHQUFHQyxJQUFJLENBQUNoQixPQUFMLENBQWEsR0FBYixDQUFSOztBQUNBLFFBQUllLEtBQUssS0FBSyxDQUFDLENBQWYsRUFBa0I7QUFDaEI7QUFDQTtBQUNEOztBQUVERSxJQUFBQSxLQUFLLEdBQUdELElBQUksQ0FBQ2QsS0FBTCxDQUFXLENBQVgsRUFBY2EsS0FBZCxFQUFxQkcsV0FBckIsRUFBUjtBQUNBbkMsSUFBQUEsS0FBSyxHQUFHVCxJQUFJLENBQUMwQyxJQUFJLENBQUNkLEtBQUwsQ0FBV2EsS0FBSyxHQUFHLENBQW5CLENBQUQsQ0FBWjtBQUNBRCxJQUFBQSxNQUFNLENBQUNHLEtBQUQsQ0FBTixHQUFnQmxDLEtBQWhCO0FBQ0Q7O0FBRUQsU0FBTytCLE1BQVA7QUFDRDtBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQSxTQUFTSyxNQUFULENBQWdCQyxJQUFoQixFQUFzQjtBQUNwQjtBQUNBO0FBQ0EsU0FBTyxzQkFBc0JDLElBQXRCLENBQTJCRCxJQUEzQixDQUFQO0FBQ0Q7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBLFNBQVNFLFFBQVQsQ0FBa0JDLFFBQWxCLEVBQTRCO0FBQzFCLE9BQUtDLEdBQUwsR0FBV0QsUUFBWDtBQUNBLE9BQUtFLEdBQUwsR0FBVyxLQUFLRCxHQUFMLENBQVNDLEdBQXBCLENBRjBCLENBRzFCOztBQUNBLE9BQUtDLElBQUwsR0FDRyxLQUFLRixHQUFMLENBQVMvRCxNQUFULEtBQW9CLE1BQXBCLEtBQ0UsS0FBS2dFLEdBQUwsQ0FBU0UsWUFBVCxLQUEwQixFQUExQixJQUFnQyxLQUFLRixHQUFMLENBQVNFLFlBQVQsS0FBMEIsTUFENUQsQ0FBRCxJQUVBLE9BQU8sS0FBS0YsR0FBTCxDQUFTRSxZQUFoQixLQUFpQyxXQUZqQyxHQUdJLEtBQUtGLEdBQUwsQ0FBU0csWUFIYixHQUlJLElBTE47QUFNQSxPQUFLQyxVQUFMLEdBQWtCLEtBQUtMLEdBQUwsQ0FBU0MsR0FBVCxDQUFhSSxVQUEvQjtBQUNBLE1BQU1DLE1BQU4sR0FBaUIsS0FBS0wsR0FBdEIsQ0FBTUssTUFBTixDQVgwQixDQVkxQjs7QUFDQSxNQUFJQSxNQUFNLEtBQUssSUFBZixFQUFxQjtBQUNuQkEsSUFBQUEsTUFBTSxHQUFHLEdBQVQ7QUFDRDs7QUFFRCxPQUFLQyxvQkFBTCxDQUEwQkQsTUFBMUI7O0FBQ0EsT0FBS0UsT0FBTCxHQUFlcEIsV0FBVyxDQUFDLEtBQUthLEdBQUwsQ0FBU1EscUJBQVQsRUFBRCxDQUExQjtBQUNBLE9BQUtDLE1BQUwsR0FBYyxLQUFLRixPQUFuQixDQW5CMEIsQ0FvQjFCO0FBQ0E7QUFDQTs7QUFDQSxPQUFLRSxNQUFMLENBQVksY0FBWixJQUE4QixLQUFLVCxHQUFMLENBQVNVLGlCQUFULENBQTJCLGNBQTNCLENBQTlCOztBQUNBLE9BQUtDLG9CQUFMLENBQTBCLEtBQUtGLE1BQS9COztBQUVBLE1BQUksS0FBS1IsSUFBTCxLQUFjLElBQWQsSUFBc0JILFFBQVEsQ0FBQ2MsYUFBbkMsRUFBa0Q7QUFDaEQsU0FBS0MsSUFBTCxHQUFZLEtBQUtiLEdBQUwsQ0FBU2MsUUFBckI7QUFDRCxHQUZELE1BRU87QUFDTCxTQUFLRCxJQUFMLEdBQ0UsS0FBS2QsR0FBTCxDQUFTL0QsTUFBVCxLQUFvQixNQUFwQixHQUNJLElBREosR0FFSSxLQUFLK0UsVUFBTCxDQUFnQixLQUFLZCxJQUFMLEdBQVksS0FBS0EsSUFBakIsR0FBd0IsS0FBS0QsR0FBTCxDQUFTYyxRQUFqRCxDQUhOO0FBSUQ7QUFDRjs7QUFFRHJGLEtBQUssQ0FBQ29FLFFBQVEsQ0FBQ21CLFNBQVYsRUFBcUJyRixZQUFZLENBQUNxRixTQUFsQyxDQUFMO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUFuQixRQUFRLENBQUNtQixTQUFULENBQW1CRCxVQUFuQixHQUFnQyxVQUFVOUMsT0FBVixFQUFtQjtBQUNqRCxNQUFJZ0IsS0FBSyxHQUFHM0MsT0FBTyxDQUFDMkMsS0FBUixDQUFjLEtBQUtnQyxJQUFuQixDQUFaOztBQUNBLE1BQUksS0FBS2xCLEdBQUwsQ0FBU21CLE9BQWIsRUFBc0I7QUFDcEIsV0FBTyxLQUFLbkIsR0FBTCxDQUFTbUIsT0FBVCxDQUFpQixJQUFqQixFQUF1QmpELE9BQXZCLENBQVA7QUFDRDs7QUFFRCxNQUFJLENBQUNnQixLQUFELElBQVVTLE1BQU0sQ0FBQyxLQUFLdUIsSUFBTixDQUFwQixFQUFpQztBQUMvQmhDLElBQUFBLEtBQUssR0FBRzNDLE9BQU8sQ0FBQzJDLEtBQVIsQ0FBYyxrQkFBZCxDQUFSO0FBQ0Q7O0FBRUQsU0FBT0EsS0FBSyxJQUFJaEIsT0FBVCxLQUFxQkEsT0FBTyxDQUFDNUIsTUFBUixHQUFpQixDQUFqQixJQUFzQjRCLE9BQU8sWUFBWWtELE1BQTlELElBQ0hsQyxLQUFLLENBQUNoQixPQUFELENBREYsR0FFSCxJQUZKO0FBR0QsQ0FiRDtBQWVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE0QixRQUFRLENBQUNtQixTQUFULENBQW1CSSxPQUFuQixHQUE2QixZQUFZO0FBQ3ZDLE1BQVFyQixHQUFSLEdBQWdCLElBQWhCLENBQVFBLEdBQVI7QUFDQSxNQUFRL0QsTUFBUixHQUFtQitELEdBQW5CLENBQVEvRCxNQUFSO0FBQ0EsTUFBUUMsR0FBUixHQUFnQjhELEdBQWhCLENBQVE5RCxHQUFSO0FBRUEsTUFBTW9GLE9BQU8sb0JBQWFyRixNQUFiLGNBQXVCQyxHQUF2QixlQUErQixLQUFLb0UsTUFBcEMsTUFBYjtBQUNBLE1BQU1pQixLQUFLLEdBQUcsSUFBSTFFLEtBQUosQ0FBVXlFLE9BQVYsQ0FBZDtBQUNBQyxFQUFBQSxLQUFLLENBQUNqQixNQUFOLEdBQWUsS0FBS0EsTUFBcEI7QUFDQWlCLEVBQUFBLEtBQUssQ0FBQ3RGLE1BQU4sR0FBZUEsTUFBZjtBQUNBc0YsRUFBQUEsS0FBSyxDQUFDckYsR0FBTixHQUFZQSxHQUFaO0FBRUEsU0FBT3FGLEtBQVA7QUFDRCxDQVpEO0FBY0E7QUFDQTtBQUNBOzs7QUFFQWhGLE9BQU8sQ0FBQ3VELFFBQVIsR0FBbUJBLFFBQW5CO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsU0FBUzNELE9BQVQsQ0FBaUJGLE1BQWpCLEVBQXlCQyxHQUF6QixFQUE4QjtBQUM1QixNQUFNakIsSUFBSSxHQUFHLElBQWI7QUFDQSxPQUFLdUcsTUFBTCxHQUFjLEtBQUtBLE1BQUwsSUFBZSxFQUE3QjtBQUNBLE9BQUt2RixNQUFMLEdBQWNBLE1BQWQ7QUFDQSxPQUFLQyxHQUFMLEdBQVdBLEdBQVg7QUFDQSxPQUFLd0UsTUFBTCxHQUFjLEVBQWQsQ0FMNEIsQ0FLVjs7QUFDbEIsT0FBS2UsT0FBTCxHQUFlLEVBQWYsQ0FONEIsQ0FNVDs7QUFDbkIsT0FBS0MsRUFBTCxDQUFRLEtBQVIsRUFBZSxZQUFNO0FBQ25CLFFBQUlILEtBQUssR0FBRyxJQUFaO0FBQ0EsUUFBSUksR0FBRyxHQUFHLElBQVY7O0FBRUEsUUFBSTtBQUNGQSxNQUFBQSxHQUFHLEdBQUcsSUFBSTdCLFFBQUosQ0FBYTdFLElBQWIsQ0FBTjtBQUNELEtBRkQsQ0FFRSxPQUFPMkcsR0FBUCxFQUFZO0FBQ1pMLE1BQUFBLEtBQUssR0FBRyxJQUFJMUUsS0FBSixDQUFVLHdDQUFWLENBQVI7QUFDQTBFLE1BQUFBLEtBQUssQ0FBQ3JDLEtBQU4sR0FBYyxJQUFkO0FBQ0FxQyxNQUFBQSxLQUFLLENBQUNNLFFBQU4sR0FBaUJELEdBQWpCLENBSFksQ0FJWjs7QUFDQSxVQUFJM0csSUFBSSxDQUFDZ0YsR0FBVCxFQUFjO0FBQ1o7QUFDQXNCLFFBQUFBLEtBQUssQ0FBQ08sV0FBTixHQUNFLE9BQU83RyxJQUFJLENBQUNnRixHQUFMLENBQVNFLFlBQWhCLEtBQWlDLFdBQWpDLEdBQ0lsRixJQUFJLENBQUNnRixHQUFMLENBQVNHLFlBRGIsR0FFSW5GLElBQUksQ0FBQ2dGLEdBQUwsQ0FBU2MsUUFIZixDQUZZLENBTVo7O0FBQ0FRLFFBQUFBLEtBQUssQ0FBQ2pCLE1BQU4sR0FBZXJGLElBQUksQ0FBQ2dGLEdBQUwsQ0FBU0ssTUFBVCxHQUFrQnJGLElBQUksQ0FBQ2dGLEdBQUwsQ0FBU0ssTUFBM0IsR0FBb0MsSUFBbkQ7QUFDQWlCLFFBQUFBLEtBQUssQ0FBQ1EsVUFBTixHQUFtQlIsS0FBSyxDQUFDakIsTUFBekIsQ0FSWSxDQVFxQjtBQUNsQyxPQVRELE1BU087QUFDTGlCLFFBQUFBLEtBQUssQ0FBQ08sV0FBTixHQUFvQixJQUFwQjtBQUNBUCxRQUFBQSxLQUFLLENBQUNqQixNQUFOLEdBQWUsSUFBZjtBQUNEOztBQUVELGFBQU9yRixJQUFJLENBQUMrRyxRQUFMLENBQWNULEtBQWQsQ0FBUDtBQUNEOztBQUVEdEcsSUFBQUEsSUFBSSxDQUFDZ0gsSUFBTCxDQUFVLFVBQVYsRUFBc0JOLEdBQXRCO0FBRUEsUUFBSU8sU0FBSjs7QUFDQSxRQUFJO0FBQ0YsVUFBSSxDQUFDakgsSUFBSSxDQUFDa0gsYUFBTCxDQUFtQlIsR0FBbkIsQ0FBTCxFQUE4QjtBQUM1Qk8sUUFBQUEsU0FBUyxHQUFHLElBQUlyRixLQUFKLENBQ1Y4RSxHQUFHLENBQUN0QixVQUFKLElBQWtCc0IsR0FBRyxDQUFDekIsSUFBdEIsSUFBOEIsNEJBRHBCLENBQVo7QUFHRDtBQUNGLEtBTkQsQ0FNRSxPQUFPMEIsR0FBUCxFQUFZO0FBQ1pNLE1BQUFBLFNBQVMsR0FBR04sR0FBWixDQURZLENBQ0s7QUFDbEIsS0F2Q2tCLENBeUNuQjs7O0FBQ0EsUUFBSU0sU0FBSixFQUFlO0FBQ2JBLE1BQUFBLFNBQVMsQ0FBQ0wsUUFBVixHQUFxQk4sS0FBckI7QUFDQVcsTUFBQUEsU0FBUyxDQUFDbkIsUUFBVixHQUFxQlksR0FBckI7QUFDQU8sTUFBQUEsU0FBUyxDQUFDNUIsTUFBVixHQUFtQnFCLEdBQUcsQ0FBQ3JCLE1BQXZCO0FBQ0FyRixNQUFBQSxJQUFJLENBQUMrRyxRQUFMLENBQWNFLFNBQWQsRUFBeUJQLEdBQXpCO0FBQ0QsS0FMRCxNQUtPO0FBQ0wxRyxNQUFBQSxJQUFJLENBQUMrRyxRQUFMLENBQWMsSUFBZCxFQUFvQkwsR0FBcEI7QUFDRDtBQUNGLEdBbEREO0FBbUREO0FBRUQ7QUFDQTtBQUNBO0FBRUE7OztBQUNBdkcsT0FBTyxDQUFDZSxPQUFPLENBQUM4RSxTQUFULENBQVA7QUFFQXZGLEtBQUssQ0FBQ1MsT0FBTyxDQUFDOEUsU0FBVCxFQUFvQnpGLFdBQVcsQ0FBQ3lGLFNBQWhDLENBQUw7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE5RSxPQUFPLENBQUM4RSxTQUFSLENBQWtCQyxJQUFsQixHQUF5QixVQUFVQSxJQUFWLEVBQWdCO0FBQ3ZDLE9BQUtrQixHQUFMLENBQVMsY0FBVCxFQUF5QjdGLE9BQU8sQ0FBQ29DLEtBQVIsQ0FBY3VDLElBQWQsS0FBdUJBLElBQWhEO0FBQ0EsU0FBTyxJQUFQO0FBQ0QsQ0FIRDtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQS9FLE9BQU8sQ0FBQzhFLFNBQVIsQ0FBa0JvQixNQUFsQixHQUEyQixVQUFVbkIsSUFBVixFQUFnQjtBQUN6QyxPQUFLa0IsR0FBTCxDQUFTLFFBQVQsRUFBbUI3RixPQUFPLENBQUNvQyxLQUFSLENBQWN1QyxJQUFkLEtBQXVCQSxJQUExQztBQUNBLFNBQU8sSUFBUDtBQUNELENBSEQ7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBL0UsT0FBTyxDQUFDOEUsU0FBUixDQUFrQnFCLElBQWxCLEdBQXlCLFVBQVVDLElBQVYsRUFBZ0JDLElBQWhCLEVBQXNCQyxPQUF0QixFQUErQjtBQUN0RCxNQUFJcEcsU0FBUyxDQUFDQyxNQUFWLEtBQXFCLENBQXpCLEVBQTRCa0csSUFBSSxHQUFHLEVBQVA7O0FBQzVCLE1BQUksUUFBT0EsSUFBUCxNQUFnQixRQUFoQixJQUE0QkEsSUFBSSxLQUFLLElBQXpDLEVBQStDO0FBQzdDO0FBQ0FDLElBQUFBLE9BQU8sR0FBR0QsSUFBVjtBQUNBQSxJQUFBQSxJQUFJLEdBQUcsRUFBUDtBQUNEOztBQUVELE1BQUksQ0FBQ0MsT0FBTCxFQUFjO0FBQ1pBLElBQUFBLE9BQU8sR0FBRztBQUNSdkIsTUFBQUEsSUFBSSxFQUFFLE9BQU93QixJQUFQLEtBQWdCLFVBQWhCLEdBQTZCLE9BQTdCLEdBQXVDO0FBRHJDLEtBQVY7QUFHRDs7QUFFRCxNQUFNQyxPQUFPLEdBQUdGLE9BQU8sQ0FBQ0UsT0FBUixHQUNaRixPQUFPLENBQUNFLE9BREksR0FFWixVQUFDQyxNQUFELEVBQVk7QUFDVixRQUFJLE9BQU9GLElBQVAsS0FBZ0IsVUFBcEIsRUFBZ0M7QUFDOUIsYUFBT0EsSUFBSSxDQUFDRSxNQUFELENBQVg7QUFDRDs7QUFFRCxVQUFNLElBQUkvRixLQUFKLENBQVUsK0NBQVYsQ0FBTjtBQUNELEdBUkw7QUFVQSxTQUFPLEtBQUtnRyxLQUFMLENBQVdOLElBQVgsRUFBaUJDLElBQWpCLEVBQXVCQyxPQUF2QixFQUFnQ0UsT0FBaEMsQ0FBUDtBQUNELENBekJEO0FBMkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQXhHLE9BQU8sQ0FBQzhFLFNBQVIsQ0FBa0I2QixLQUFsQixHQUEwQixVQUFVdkYsS0FBVixFQUFpQjtBQUN6QyxNQUFJLE9BQU9BLEtBQVAsS0FBaUIsUUFBckIsRUFBK0JBLEtBQUssR0FBR04sU0FBUyxDQUFDTSxLQUFELENBQWpCO0FBQy9CLE1BQUlBLEtBQUosRUFBVyxLQUFLaUUsTUFBTCxDQUFZL0QsSUFBWixDQUFpQkYsS0FBakI7QUFDWCxTQUFPLElBQVA7QUFDRCxDQUpEO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBcEIsT0FBTyxDQUFDOEUsU0FBUixDQUFrQjhCLE1BQWxCLEdBQTJCLFVBQVV0RCxLQUFWLEVBQWlCdUQsSUFBakIsRUFBdUJQLE9BQXZCLEVBQWdDO0FBQ3pELE1BQUlPLElBQUosRUFBVTtBQUNSLFFBQUksS0FBS0MsS0FBVCxFQUFnQjtBQUNkLFlBQU0sSUFBSXBHLEtBQUosQ0FBVSw0Q0FBVixDQUFOO0FBQ0Q7O0FBRUQsU0FBS3FHLFlBQUwsR0FBb0JDLE1BQXBCLENBQTJCMUQsS0FBM0IsRUFBa0N1RCxJQUFsQyxFQUF3Q1AsT0FBTyxJQUFJTyxJQUFJLENBQUNJLElBQXhEO0FBQ0Q7O0FBRUQsU0FBTyxJQUFQO0FBQ0QsQ0FWRDs7QUFZQWpILE9BQU8sQ0FBQzhFLFNBQVIsQ0FBa0JpQyxZQUFsQixHQUFpQyxZQUFZO0FBQzNDLE1BQUksQ0FBQyxLQUFLRyxTQUFWLEVBQXFCO0FBQ25CLFNBQUtBLFNBQUwsR0FBaUIsSUFBSXRJLElBQUksQ0FBQ3VJLFFBQVQsRUFBakI7QUFDRDs7QUFFRCxTQUFPLEtBQUtELFNBQVo7QUFDRCxDQU5EO0FBUUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUFsSCxPQUFPLENBQUM4RSxTQUFSLENBQWtCZSxRQUFsQixHQUE2QixVQUFVVCxLQUFWLEVBQWlCSSxHQUFqQixFQUFzQjtBQUNqRCxNQUFJLEtBQUs0QixZQUFMLENBQWtCaEMsS0FBbEIsRUFBeUJJLEdBQXpCLENBQUosRUFBbUM7QUFDakMsV0FBTyxLQUFLNkIsTUFBTCxFQUFQO0FBQ0Q7O0FBRUQsTUFBTUMsRUFBRSxHQUFHLEtBQUtDLFNBQWhCO0FBQ0EsT0FBS0MsWUFBTDs7QUFFQSxNQUFJcEMsS0FBSixFQUFXO0FBQ1QsUUFBSSxLQUFLcUMsV0FBVCxFQUFzQnJDLEtBQUssQ0FBQ3NDLE9BQU4sR0FBZ0IsS0FBS0MsUUFBTCxHQUFnQixDQUFoQztBQUN0QixTQUFLN0IsSUFBTCxDQUFVLE9BQVYsRUFBbUJWLEtBQW5CO0FBQ0Q7O0FBRURrQyxFQUFBQSxFQUFFLENBQUNsQyxLQUFELEVBQVFJLEdBQVIsQ0FBRjtBQUNELENBZEQ7QUFnQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUF4RixPQUFPLENBQUM4RSxTQUFSLENBQWtCOEMsZ0JBQWxCLEdBQXFDLFlBQVk7QUFDL0MsTUFBTXhDLEtBQUssR0FBRyxJQUFJMUUsS0FBSixDQUNaLDhKQURZLENBQWQ7QUFHQTBFLEVBQUFBLEtBQUssQ0FBQ3lDLFdBQU4sR0FBb0IsSUFBcEI7QUFFQXpDLEVBQUFBLEtBQUssQ0FBQ2pCLE1BQU4sR0FBZSxLQUFLQSxNQUFwQjtBQUNBaUIsRUFBQUEsS0FBSyxDQUFDdEYsTUFBTixHQUFlLEtBQUtBLE1BQXBCO0FBQ0FzRixFQUFBQSxLQUFLLENBQUNyRixHQUFOLEdBQVksS0FBS0EsR0FBakI7QUFFQSxPQUFLOEYsUUFBTCxDQUFjVCxLQUFkO0FBQ0QsQ0FYRCxDLENBYUE7OztBQUNBcEYsT0FBTyxDQUFDOEUsU0FBUixDQUFrQmdELEtBQWxCLEdBQTBCLFlBQVk7QUFDcEMvSSxFQUFBQSxPQUFPLENBQUNDLElBQVIsQ0FBYSx3REFBYjtBQUNBLFNBQU8sSUFBUDtBQUNELENBSEQ7O0FBS0FnQixPQUFPLENBQUM4RSxTQUFSLENBQWtCaUQsRUFBbEIsR0FBdUIvSCxPQUFPLENBQUM4RSxTQUFSLENBQWtCZ0QsS0FBekM7QUFDQTlILE9BQU8sQ0FBQzhFLFNBQVIsQ0FBa0JrRCxNQUFsQixHQUEyQmhJLE9BQU8sQ0FBQzhFLFNBQVIsQ0FBa0JpRCxFQUE3QyxDLENBRUE7O0FBQ0EvSCxPQUFPLENBQUM4RSxTQUFSLENBQWtCbUQsS0FBbEIsR0FBMEIsWUFBTTtBQUM5QixRQUFNLElBQUl2SCxLQUFKLENBQ0osNkRBREksQ0FBTjtBQUdELENBSkQ7O0FBTUFWLE9BQU8sQ0FBQzhFLFNBQVIsQ0FBa0JvRCxJQUFsQixHQUF5QmxJLE9BQU8sQ0FBQzhFLFNBQVIsQ0FBa0JtRCxLQUEzQztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0FqSSxPQUFPLENBQUM4RSxTQUFSLENBQWtCcUQsT0FBbEIsR0FBNEIsVUFBVXBILE1BQVYsRUFBa0I7QUFDNUM7QUFDQSxTQUNFQSxNQUFNLElBQ04sUUFBT0EsTUFBUCxNQUFrQixRQURsQixJQUVBLENBQUNTLEtBQUssQ0FBQ0MsT0FBTixDQUFjVixNQUFkLENBRkQsSUFHQWtFLE1BQU0sQ0FBQ0gsU0FBUCxDQUFpQnNELFFBQWpCLENBQTBCQyxJQUExQixDQUErQnRILE1BQS9CLE1BQTJDLGlCQUo3QztBQU1ELENBUkQ7QUFVQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQWYsT0FBTyxDQUFDOEUsU0FBUixDQUFrQjdFLEdBQWxCLEdBQXdCLFVBQVVxSCxFQUFWLEVBQWM7QUFDcEMsTUFBSSxLQUFLZ0IsVUFBVCxFQUFxQjtBQUNuQnZKLElBQUFBLE9BQU8sQ0FBQ0MsSUFBUixDQUNFLHVFQURGO0FBR0Q7O0FBRUQsT0FBS3NKLFVBQUwsR0FBa0IsSUFBbEIsQ0FQb0MsQ0FTcEM7O0FBQ0EsT0FBS2YsU0FBTCxHQUFpQkQsRUFBRSxJQUFJM0gsSUFBdkIsQ0FWb0MsQ0FZcEM7O0FBQ0EsT0FBSzRJLG9CQUFMOztBQUVBLE9BQUtDLElBQUw7QUFDRCxDQWhCRDs7QUFrQkF4SSxPQUFPLENBQUM4RSxTQUFSLENBQWtCMkQsaUJBQWxCLEdBQXNDLFlBQVk7QUFDaEQsTUFBTTNKLElBQUksR0FBRyxJQUFiLENBRGdELENBR2hEOztBQUNBLE1BQUksS0FBSzRKLGNBQUwsSUFBdUIsQ0FBQyxLQUFLQyxtQkFBakMsRUFBc0Q7QUFDcEQsU0FBS0EsbUJBQUwsR0FBMkJDLFVBQVUsQ0FBQyxZQUFNO0FBQzFDOUosTUFBQUEsSUFBSSxDQUFDK0osYUFBTCxDQUNFLG9CQURGLEVBRUUvSixJQUFJLENBQUM0SixjQUZQLEVBR0UsV0FIRjtBQUtELEtBTm9DLEVBTWxDLEtBQUtBLGNBTjZCLENBQXJDO0FBT0Q7QUFDRixDQWJELEMsQ0FlQTs7O0FBQ0ExSSxPQUFPLENBQUM4RSxTQUFSLENBQWtCMEQsSUFBbEIsR0FBeUIsWUFBWTtBQUNuQyxNQUFJLEtBQUtNLFFBQVQsRUFDRSxPQUFPLEtBQUtqRCxRQUFMLENBQ0wsSUFBSW5GLEtBQUosQ0FBVSw0REFBVixDQURLLENBQVA7QUFJRixNQUFNNUIsSUFBSSxHQUFHLElBQWI7QUFDQSxPQUFLZ0YsR0FBTCxHQUFXMUQsT0FBTyxDQUFDQyxNQUFSLEVBQVg7QUFDQSxNQUFReUQsR0FBUixHQUFnQixJQUFoQixDQUFRQSxHQUFSO0FBQ0EsTUFBSWlGLElBQUksR0FBRyxLQUFLN0IsU0FBTCxJQUFrQixLQUFLSixLQUFsQzs7QUFFQSxPQUFLa0MsWUFBTCxHQVhtQyxDQWFuQzs7O0FBQ0FsRixFQUFBQSxHQUFHLENBQUNtRixnQkFBSixDQUFxQixrQkFBckIsRUFBeUMsWUFBTTtBQUM3QyxRQUFRQyxVQUFSLEdBQXVCcEYsR0FBdkIsQ0FBUW9GLFVBQVI7O0FBQ0EsUUFBSUEsVUFBVSxJQUFJLENBQWQsSUFBbUJwSyxJQUFJLENBQUNxSyxxQkFBNUIsRUFBbUQ7QUFDakQzQixNQUFBQSxZQUFZLENBQUMxSSxJQUFJLENBQUNxSyxxQkFBTixDQUFaO0FBQ0Q7O0FBRUQsUUFBSUQsVUFBVSxLQUFLLENBQW5CLEVBQXNCO0FBQ3BCO0FBQ0QsS0FSNEMsQ0FVN0M7QUFDQTs7O0FBQ0EsUUFBSS9FLE1BQUo7O0FBQ0EsUUFBSTtBQUNGQSxNQUFBQSxNQUFNLEdBQUdMLEdBQUcsQ0FBQ0ssTUFBYjtBQUNELEtBRkQsQ0FFRSxpQkFBTTtBQUNOQSxNQUFBQSxNQUFNLEdBQUcsQ0FBVDtBQUNEOztBQUVELFFBQUksQ0FBQ0EsTUFBTCxFQUFhO0FBQ1gsVUFBSXJGLElBQUksQ0FBQ3NLLFFBQUwsSUFBaUJ0SyxJQUFJLENBQUNnSyxRQUExQixFQUFvQztBQUNwQyxhQUFPaEssSUFBSSxDQUFDOEksZ0JBQUwsRUFBUDtBQUNEOztBQUVEOUksSUFBQUEsSUFBSSxDQUFDZ0gsSUFBTCxDQUFVLEtBQVY7QUFDRCxHQXpCRCxFQWRtQyxDQXlDbkM7O0FBQ0EsTUFBTXVELGNBQWMsR0FBRyxTQUFqQkEsY0FBaUIsQ0FBQ0MsU0FBRCxFQUFZQyxDQUFaLEVBQWtCO0FBQ3ZDLFFBQUlBLENBQUMsQ0FBQ0MsS0FBRixHQUFVLENBQWQsRUFBaUI7QUFDZkQsTUFBQUEsQ0FBQyxDQUFDRSxPQUFGLEdBQWFGLENBQUMsQ0FBQ0csTUFBRixHQUFXSCxDQUFDLENBQUNDLEtBQWQsR0FBdUIsR0FBbkM7O0FBRUEsVUFBSUQsQ0FBQyxDQUFDRSxPQUFGLEtBQWMsR0FBbEIsRUFBdUI7QUFDckJqQyxRQUFBQSxZQUFZLENBQUMxSSxJQUFJLENBQUM2SixtQkFBTixDQUFaO0FBQ0Q7QUFDRjs7QUFFRFksSUFBQUEsQ0FBQyxDQUFDRCxTQUFGLEdBQWNBLFNBQWQ7QUFDQXhLLElBQUFBLElBQUksQ0FBQ2dILElBQUwsQ0FBVSxVQUFWLEVBQXNCeUQsQ0FBdEI7QUFDRCxHQVhEOztBQWFBLE1BQUksS0FBS0ksWUFBTCxDQUFrQixVQUFsQixDQUFKLEVBQW1DO0FBQ2pDLFFBQUk7QUFDRjdGLE1BQUFBLEdBQUcsQ0FBQ21GLGdCQUFKLENBQXFCLFVBQXJCLEVBQWlDSSxjQUFjLENBQUNPLElBQWYsQ0FBb0IsSUFBcEIsRUFBMEIsVUFBMUIsQ0FBakM7O0FBQ0EsVUFBSTlGLEdBQUcsQ0FBQytGLE1BQVIsRUFBZ0I7QUFDZC9GLFFBQUFBLEdBQUcsQ0FBQytGLE1BQUosQ0FBV1osZ0JBQVgsQ0FDRSxVQURGLEVBRUVJLGNBQWMsQ0FBQ08sSUFBZixDQUFvQixJQUFwQixFQUEwQixRQUExQixDQUZGO0FBSUQ7QUFDRixLQVJELENBUUUsaUJBQU0sQ0FDTjtBQUNBO0FBQ0E7QUFDRDtBQUNGOztBQUVELE1BQUk5RixHQUFHLENBQUMrRixNQUFSLEVBQWdCO0FBQ2QsU0FBS3BCLGlCQUFMO0FBQ0QsR0F6RWtDLENBMkVuQzs7O0FBQ0EsTUFBSTtBQUNGLFFBQUksS0FBS3FCLFFBQUwsSUFBaUIsS0FBS0MsUUFBMUIsRUFBb0M7QUFDbENqRyxNQUFBQSxHQUFHLENBQUNrRyxJQUFKLENBQVMsS0FBS2xLLE1BQWQsRUFBc0IsS0FBS0MsR0FBM0IsRUFBZ0MsSUFBaEMsRUFBc0MsS0FBSytKLFFBQTNDLEVBQXFELEtBQUtDLFFBQTFEO0FBQ0QsS0FGRCxNQUVPO0FBQ0xqRyxNQUFBQSxHQUFHLENBQUNrRyxJQUFKLENBQVMsS0FBS2xLLE1BQWQsRUFBc0IsS0FBS0MsR0FBM0IsRUFBZ0MsSUFBaEM7QUFDRDtBQUNGLEdBTkQsQ0FNRSxPQUFPMEYsR0FBUCxFQUFZO0FBQ1o7QUFDQSxXQUFPLEtBQUtJLFFBQUwsQ0FBY0osR0FBZCxDQUFQO0FBQ0QsR0FyRmtDLENBdUZuQzs7O0FBQ0EsTUFBSSxLQUFLd0UsZ0JBQVQsRUFBMkJuRyxHQUFHLENBQUNvRyxlQUFKLEdBQXNCLElBQXRCLENBeEZRLENBMEZuQzs7QUFDQSxNQUNFLENBQUMsS0FBS2hELFNBQU4sSUFDQSxLQUFLcEgsTUFBTCxLQUFnQixLQURoQixJQUVBLEtBQUtBLE1BQUwsS0FBZ0IsTUFGaEIsSUFHQSxPQUFPaUosSUFBUCxLQUFnQixRQUhoQixJQUlBLENBQUMsS0FBS1osT0FBTCxDQUFhWSxJQUFiLENBTEgsRUFNRTtBQUNBO0FBQ0EsUUFBTW9CLFdBQVcsR0FBRyxLQUFLN0UsT0FBTCxDQUFhLGNBQWIsQ0FBcEI7O0FBQ0EsUUFBSXhFLFVBQVMsR0FDWCxLQUFLc0osV0FBTCxJQUNBaEssT0FBTyxDQUFDVSxTQUFSLENBQWtCcUosV0FBVyxHQUFHQSxXQUFXLENBQUNuSSxLQUFaLENBQWtCLEdBQWxCLEVBQXVCLENBQXZCLENBQUgsR0FBK0IsRUFBNUQsQ0FGRjs7QUFHQSxRQUFJLENBQUNsQixVQUFELElBQWMwQyxNQUFNLENBQUMyRyxXQUFELENBQXhCLEVBQXVDO0FBQ3JDckosTUFBQUEsVUFBUyxHQUFHVixPQUFPLENBQUNVLFNBQVIsQ0FBa0Isa0JBQWxCLENBQVo7QUFDRDs7QUFFRCxRQUFJQSxVQUFKLEVBQWVpSSxJQUFJLEdBQUdqSSxVQUFTLENBQUNpSSxJQUFELENBQWhCO0FBQ2hCLEdBNUdrQyxDQThHbkM7OztBQUNBLE9BQUssSUFBTXpGLEtBQVgsSUFBb0IsS0FBS2lCLE1BQXpCLEVBQWlDO0FBQy9CLFFBQUksS0FBS0EsTUFBTCxDQUFZakIsS0FBWixNQUF1QixJQUEzQixFQUFpQztBQUVqQyxRQUFJOUQsTUFBTSxDQUFDLEtBQUsrRSxNQUFOLEVBQWNqQixLQUFkLENBQVYsRUFDRVEsR0FBRyxDQUFDdUcsZ0JBQUosQ0FBcUIvRyxLQUFyQixFQUE0QixLQUFLaUIsTUFBTCxDQUFZakIsS0FBWixDQUE1QjtBQUNIOztBQUVELE1BQUksS0FBS29CLGFBQVQsRUFBd0I7QUFDdEJaLElBQUFBLEdBQUcsQ0FBQ0UsWUFBSixHQUFtQixLQUFLVSxhQUF4QjtBQUNELEdBeEhrQyxDQTBIbkM7OztBQUNBLE9BQUtvQixJQUFMLENBQVUsU0FBVixFQUFxQixJQUFyQixFQTNIbUMsQ0E2SG5DO0FBQ0E7O0FBQ0FoQyxFQUFBQSxHQUFHLENBQUN3RyxJQUFKLENBQVMsT0FBT3ZCLElBQVAsS0FBZ0IsV0FBaEIsR0FBOEIsSUFBOUIsR0FBcUNBLElBQTlDO0FBQ0QsQ0FoSUQ7O0FBa0lBM0ksT0FBTyxDQUFDMEgsS0FBUixHQUFnQjtBQUFBLFNBQU0sSUFBSXBJLEtBQUosRUFBTjtBQUFBLENBQWhCOzs7QUFFSyxNQUFNSSxNQUFNLFdBQVo7O0FBQ0hKLEVBQUFBLEtBQUssQ0FBQ29GLFNBQU4sQ0FBZ0JoRixNQUFNLENBQUN5RCxXQUFQLEVBQWhCLElBQXdDLFVBQVV4RCxHQUFWLEVBQWV1SCxFQUFmLEVBQW1CO0FBQ3pELFFBQU0xRCxRQUFRLEdBQUcsSUFBSXhELE9BQU8sQ0FBQ0osT0FBWixDQUFvQkYsTUFBcEIsRUFBNEJDLEdBQTVCLENBQWpCOztBQUNBLFNBQUt3SyxZQUFMLENBQWtCM0csUUFBbEI7O0FBQ0EsUUFBSTBELEVBQUosRUFBUTtBQUNOMUQsTUFBQUEsUUFBUSxDQUFDM0QsR0FBVCxDQUFhcUgsRUFBYjtBQUNEOztBQUVELFdBQU8xRCxRQUFQO0FBQ0QsR0FSRDs7O0FBREYsd0JBQXFCLENBQUMsS0FBRCxFQUFRLE1BQVIsRUFBZ0IsU0FBaEIsRUFBMkIsT0FBM0IsRUFBb0MsS0FBcEMsRUFBMkMsUUFBM0MsQ0FBckIsMEJBQTJFO0FBQUE7QUFVMUU7O0FBRURsRSxLQUFLLENBQUNvRixTQUFOLENBQWdCMEYsR0FBaEIsR0FBc0I5SyxLQUFLLENBQUNvRixTQUFOLENBQWdCMkYsTUFBdEM7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUFySyxPQUFPLENBQUNzSyxHQUFSLEdBQWMsVUFBQzNLLEdBQUQsRUFBTWdKLElBQU4sRUFBWXpCLEVBQVosRUFBbUI7QUFDL0IsTUFBTTFELFFBQVEsR0FBR3hELE9BQU8sQ0FBQyxLQUFELEVBQVFMLEdBQVIsQ0FBeEI7O0FBQ0EsTUFBSSxPQUFPZ0osSUFBUCxLQUFnQixVQUFwQixFQUFnQztBQUM5QnpCLElBQUFBLEVBQUUsR0FBR3lCLElBQUw7QUFDQUEsSUFBQUEsSUFBSSxHQUFHLElBQVA7QUFDRDs7QUFFRCxNQUFJQSxJQUFKLEVBQVVuRixRQUFRLENBQUMrQyxLQUFULENBQWVvQyxJQUFmO0FBQ1YsTUFBSXpCLEVBQUosRUFBUTFELFFBQVEsQ0FBQzNELEdBQVQsQ0FBYXFILEVBQWI7QUFDUixTQUFPMUQsUUFBUDtBQUNELENBVkQ7QUFZQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBeEQsT0FBTyxDQUFDdUssSUFBUixHQUFlLFVBQUM1SyxHQUFELEVBQU1nSixJQUFOLEVBQVl6QixFQUFaLEVBQW1CO0FBQ2hDLE1BQU0xRCxRQUFRLEdBQUd4RCxPQUFPLENBQUMsTUFBRCxFQUFTTCxHQUFULENBQXhCOztBQUNBLE1BQUksT0FBT2dKLElBQVAsS0FBZ0IsVUFBcEIsRUFBZ0M7QUFDOUJ6QixJQUFBQSxFQUFFLEdBQUd5QixJQUFMO0FBQ0FBLElBQUFBLElBQUksR0FBRyxJQUFQO0FBQ0Q7O0FBRUQsTUFBSUEsSUFBSixFQUFVbkYsUUFBUSxDQUFDK0MsS0FBVCxDQUFlb0MsSUFBZjtBQUNWLE1BQUl6QixFQUFKLEVBQVExRCxRQUFRLENBQUMzRCxHQUFULENBQWFxSCxFQUFiO0FBQ1IsU0FBTzFELFFBQVA7QUFDRCxDQVZEO0FBWUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQXhELE9BQU8sQ0FBQ2tHLE9BQVIsR0FBa0IsVUFBQ3ZHLEdBQUQsRUFBTWdKLElBQU4sRUFBWXpCLEVBQVosRUFBbUI7QUFDbkMsTUFBTTFELFFBQVEsR0FBR3hELE9BQU8sQ0FBQyxTQUFELEVBQVlMLEdBQVosQ0FBeEI7O0FBQ0EsTUFBSSxPQUFPZ0osSUFBUCxLQUFnQixVQUFwQixFQUFnQztBQUM5QnpCLElBQUFBLEVBQUUsR0FBR3lCLElBQUw7QUFDQUEsSUFBQUEsSUFBSSxHQUFHLElBQVA7QUFDRDs7QUFFRCxNQUFJQSxJQUFKLEVBQVVuRixRQUFRLENBQUMwRyxJQUFULENBQWN2QixJQUFkO0FBQ1YsTUFBSXpCLEVBQUosRUFBUTFELFFBQVEsQ0FBQzNELEdBQVQsQ0FBYXFILEVBQWI7QUFDUixTQUFPMUQsUUFBUDtBQUNELENBVkQ7QUFZQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBLFNBQVM0RyxHQUFULENBQWF6SyxHQUFiLEVBQWtCZ0osSUFBbEIsRUFBd0J6QixFQUF4QixFQUE0QjtBQUMxQixNQUFNMUQsUUFBUSxHQUFHeEQsT0FBTyxDQUFDLFFBQUQsRUFBV0wsR0FBWCxDQUF4Qjs7QUFDQSxNQUFJLE9BQU9nSixJQUFQLEtBQWdCLFVBQXBCLEVBQWdDO0FBQzlCekIsSUFBQUEsRUFBRSxHQUFHeUIsSUFBTDtBQUNBQSxJQUFBQSxJQUFJLEdBQUcsSUFBUDtBQUNEOztBQUVELE1BQUlBLElBQUosRUFBVW5GLFFBQVEsQ0FBQzBHLElBQVQsQ0FBY3ZCLElBQWQ7QUFDVixNQUFJekIsRUFBSixFQUFRMUQsUUFBUSxDQUFDM0QsR0FBVCxDQUFhcUgsRUFBYjtBQUNSLFNBQU8xRCxRQUFQO0FBQ0Q7O0FBRUR4RCxPQUFPLENBQUNvSyxHQUFSLEdBQWNBLEdBQWQ7QUFDQXBLLE9BQU8sQ0FBQ3FLLE1BQVIsR0FBaUJELEdBQWpCO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBcEssT0FBTyxDQUFDd0ssS0FBUixHQUFnQixVQUFDN0ssR0FBRCxFQUFNZ0osSUFBTixFQUFZekIsRUFBWixFQUFtQjtBQUNqQyxNQUFNMUQsUUFBUSxHQUFHeEQsT0FBTyxDQUFDLE9BQUQsRUFBVUwsR0FBVixDQUF4Qjs7QUFDQSxNQUFJLE9BQU9nSixJQUFQLEtBQWdCLFVBQXBCLEVBQWdDO0FBQzlCekIsSUFBQUEsRUFBRSxHQUFHeUIsSUFBTDtBQUNBQSxJQUFBQSxJQUFJLEdBQUcsSUFBUDtBQUNEOztBQUVELE1BQUlBLElBQUosRUFBVW5GLFFBQVEsQ0FBQzBHLElBQVQsQ0FBY3ZCLElBQWQ7QUFDVixNQUFJekIsRUFBSixFQUFRMUQsUUFBUSxDQUFDM0QsR0FBVCxDQUFhcUgsRUFBYjtBQUNSLFNBQU8xRCxRQUFQO0FBQ0QsQ0FWRDtBQVlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUF4RCxPQUFPLENBQUN5SyxJQUFSLEdBQWUsVUFBQzlLLEdBQUQsRUFBTWdKLElBQU4sRUFBWXpCLEVBQVosRUFBbUI7QUFDaEMsTUFBTTFELFFBQVEsR0FBR3hELE9BQU8sQ0FBQyxNQUFELEVBQVNMLEdBQVQsQ0FBeEI7O0FBQ0EsTUFBSSxPQUFPZ0osSUFBUCxLQUFnQixVQUFwQixFQUFnQztBQUM5QnpCLElBQUFBLEVBQUUsR0FBR3lCLElBQUw7QUFDQUEsSUFBQUEsSUFBSSxHQUFHLElBQVA7QUFDRDs7QUFFRCxNQUFJQSxJQUFKLEVBQVVuRixRQUFRLENBQUMwRyxJQUFULENBQWN2QixJQUFkO0FBQ1YsTUFBSXpCLEVBQUosRUFBUTFELFFBQVEsQ0FBQzNELEdBQVQsQ0FBYXFILEVBQWI7QUFDUixTQUFPMUQsUUFBUDtBQUNELENBVkQ7QUFZQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBeEQsT0FBTyxDQUFDMEssR0FBUixHQUFjLFVBQUMvSyxHQUFELEVBQU1nSixJQUFOLEVBQVl6QixFQUFaLEVBQW1CO0FBQy9CLE1BQU0xRCxRQUFRLEdBQUd4RCxPQUFPLENBQUMsS0FBRCxFQUFRTCxHQUFSLENBQXhCOztBQUNBLE1BQUksT0FBT2dKLElBQVAsS0FBZ0IsVUFBcEIsRUFBZ0M7QUFDOUJ6QixJQUFBQSxFQUFFLEdBQUd5QixJQUFMO0FBQ0FBLElBQUFBLElBQUksR0FBRyxJQUFQO0FBQ0Q7O0FBRUQsTUFBSUEsSUFBSixFQUFVbkYsUUFBUSxDQUFDMEcsSUFBVCxDQUFjdkIsSUFBZDtBQUNWLE1BQUl6QixFQUFKLEVBQVExRCxRQUFRLENBQUMzRCxHQUFULENBQWFxSCxFQUFiO0FBQ1IsU0FBTzFELFFBQVA7QUFDRCxDQVZEIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBSb290IHJlZmVyZW5jZSBmb3IgaWZyYW1lcy5cbiAqL1xuXG5sZXQgcm9vdDtcbmlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAvLyBCcm93c2VyIHdpbmRvd1xuICByb290ID0gd2luZG93O1xufSBlbHNlIGlmICh0eXBlb2Ygc2VsZiA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgLy8gT3RoZXIgZW52aXJvbm1lbnRzXG4gIGNvbnNvbGUud2FybihcbiAgICAnVXNpbmcgYnJvd3Nlci1vbmx5IHZlcnNpb24gb2Ygc3VwZXJhZ2VudCBpbiBub24tYnJvd3NlciBlbnZpcm9ubWVudCdcbiAgKTtcbiAgcm9vdCA9IHRoaXM7XG59IGVsc2Uge1xuICAvLyBXZWIgV29ya2VyXG4gIHJvb3QgPSBzZWxmO1xufVxuXG5jb25zdCBFbWl0dGVyID0gcmVxdWlyZSgnY29tcG9uZW50LWVtaXR0ZXInKTtcbmNvbnN0IHNhZmVTdHJpbmdpZnkgPSByZXF1aXJlKCdmYXN0LXNhZmUtc3RyaW5naWZ5Jyk7XG5jb25zdCBxcyA9IHJlcXVpcmUoJ3FzJyk7XG5jb25zdCBSZXF1ZXN0QmFzZSA9IHJlcXVpcmUoJy4vcmVxdWVzdC1iYXNlJyk7XG5jb25zdCB7IGlzT2JqZWN0LCBtaXhpbiwgaGFzT3duIH0gPSByZXF1aXJlKCcuL3V0aWxzJyk7XG5jb25zdCBSZXNwb25zZUJhc2UgPSByZXF1aXJlKCcuL3Jlc3BvbnNlLWJhc2UnKTtcbmNvbnN0IEFnZW50ID0gcmVxdWlyZSgnLi9hZ2VudC1iYXNlJyk7XG5cbi8qKlxuICogTm9vcC5cbiAqL1xuXG5mdW5jdGlvbiBub29wKCkge31cblxuLyoqXG4gKiBFeHBvc2UgYHJlcXVlc3RgLlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG1ldGhvZCwgdXJsKSB7XG4gIC8vIGNhbGxiYWNrXG4gIGlmICh0eXBlb2YgdXJsID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIG5ldyBleHBvcnRzLlJlcXVlc3QoJ0dFVCcsIG1ldGhvZCkuZW5kKHVybCk7XG4gIH1cblxuICAvLyB1cmwgZmlyc3RcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICByZXR1cm4gbmV3IGV4cG9ydHMuUmVxdWVzdCgnR0VUJywgbWV0aG9kKTtcbiAgfVxuXG4gIHJldHVybiBuZXcgZXhwb3J0cy5SZXF1ZXN0KG1ldGhvZCwgdXJsKTtcbn07XG5cbmV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cztcblxuY29uc3QgcmVxdWVzdCA9IGV4cG9ydHM7XG5cbmV4cG9ydHMuUmVxdWVzdCA9IFJlcXVlc3Q7XG5cbi8qKlxuICogRGV0ZXJtaW5lIFhIUi5cbiAqL1xuXG5yZXF1ZXN0LmdldFhIUiA9ICgpID0+IHtcbiAgaWYgKFxuICAgIHJvb3QuWE1MSHR0cFJlcXVlc3QgJiZcbiAgICAoIXJvb3QubG9jYXRpb24gfHxcbiAgICAgIHJvb3QubG9jYXRpb24ucHJvdG9jb2wgIT09ICdmaWxlOicgfHxcbiAgICAgICFyb290LkFjdGl2ZVhPYmplY3QpXG4gICkge1xuICAgIHJldHVybiBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgfVxuXG4gIHRyeSB7XG4gICAgcmV0dXJuIG5ldyBBY3RpdmVYT2JqZWN0KCdNaWNyb3NvZnQuWE1MSFRUUCcpO1xuICB9IGNhdGNoIHtcbiAgICAvKiovXG4gIH1cblxuICB0cnkge1xuICAgIHJldHVybiBuZXcgQWN0aXZlWE9iamVjdCgnTXN4bWwyLlhNTEhUVFAuNi4wJyk7XG4gIH0gY2F0Y2gge1xuICAgIC8qKi9cbiAgfVxuXG4gIHRyeSB7XG4gICAgcmV0dXJuIG5ldyBBY3RpdmVYT2JqZWN0KCdNc3htbDIuWE1MSFRUUC4zLjAnKTtcbiAgfSBjYXRjaCB7XG4gICAgLyoqL1xuICB9XG5cbiAgdHJ5IHtcbiAgICByZXR1cm4gbmV3IEFjdGl2ZVhPYmplY3QoJ01zeG1sMi5YTUxIVFRQJyk7XG4gIH0gY2F0Y2gge1xuICAgIC8qKi9cbiAgfVxuXG4gIHRocm93IG5ldyBFcnJvcignQnJvd3Nlci1vbmx5IHZlcnNpb24gb2Ygc3VwZXJhZ2VudCBjb3VsZCBub3QgZmluZCBYSFInKTtcbn07XG5cbi8qKlxuICogUmVtb3ZlcyBsZWFkaW5nIGFuZCB0cmFpbGluZyB3aGl0ZXNwYWNlLCBhZGRlZCB0byBzdXBwb3J0IElFLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5jb25zdCB0cmltID0gJycudHJpbSA/IChzKSA9PiBzLnRyaW0oKSA6IChzKSA9PiBzLnJlcGxhY2UoLyheXFxzKnxcXHMqJCkvZywgJycpO1xuXG4vKipcbiAqIFNlcmlhbGl6ZSB0aGUgZ2l2ZW4gYG9iamAuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gc2VyaWFsaXplKG9iamVjdCkge1xuICBpZiAoIWlzT2JqZWN0KG9iamVjdCkpIHJldHVybiBvYmplY3Q7XG4gIGNvbnN0IHBhaXJzID0gW107XG4gIGZvciAoY29uc3Qga2V5IGluIG9iamVjdCkge1xuICAgIGlmIChoYXNPd24ob2JqZWN0LCBrZXkpKSBwdXNoRW5jb2RlZEtleVZhbHVlUGFpcihwYWlycywga2V5LCBvYmplY3Rba2V5XSk7XG4gIH1cblxuICByZXR1cm4gcGFpcnMuam9pbignJicpO1xufVxuXG4vKipcbiAqIEhlbHBzICdzZXJpYWxpemUnIHdpdGggc2VyaWFsaXppbmcgYXJyYXlzLlxuICogTXV0YXRlcyB0aGUgcGFpcnMgYXJyYXkuXG4gKlxuICogQHBhcmFtIHtBcnJheX0gcGFpcnNcbiAqIEBwYXJhbSB7U3RyaW5nfSBrZXlcbiAqIEBwYXJhbSB7TWl4ZWR9IHZhbFxuICovXG5cbmZ1bmN0aW9uIHB1c2hFbmNvZGVkS2V5VmFsdWVQYWlyKHBhaXJzLCBrZXksIHZhbHVlKSB7XG4gIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSByZXR1cm47XG4gIGlmICh2YWx1ZSA9PT0gbnVsbCkge1xuICAgIHBhaXJzLnB1c2goZW5jb2RlVVJJKGtleSkpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgIGZvciAoY29uc3QgdiBvZiB2YWx1ZSkge1xuICAgICAgcHVzaEVuY29kZWRLZXlWYWx1ZVBhaXIocGFpcnMsIGtleSwgdik7XG4gICAgfVxuICB9IGVsc2UgaWYgKGlzT2JqZWN0KHZhbHVlKSkge1xuICAgIGZvciAoY29uc3Qgc3Via2V5IGluIHZhbHVlKSB7XG4gICAgICBpZiAoaGFzT3duKHZhbHVlLCBzdWJrZXkpKVxuICAgICAgICBwdXNoRW5jb2RlZEtleVZhbHVlUGFpcihwYWlycywgYCR7a2V5fVske3N1YmtleX1dYCwgdmFsdWVbc3Via2V5XSk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHBhaXJzLnB1c2goZW5jb2RlVVJJKGtleSkgKyAnPScgKyBlbmNvZGVVUklDb21wb25lbnQodmFsdWUpKTtcbiAgfVxufVxuXG4vKipcbiAqIEV4cG9zZSBzZXJpYWxpemF0aW9uIG1ldGhvZC5cbiAqL1xuXG5yZXF1ZXN0LnNlcmlhbGl6ZU9iamVjdCA9IHNlcmlhbGl6ZTtcblxuLyoqXG4gKiBQYXJzZSB0aGUgZ2l2ZW4geC13d3ctZm9ybS11cmxlbmNvZGVkIGBzdHJgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIHBhcnNlU3RyaW5nKHN0cmluZ18pIHtcbiAgY29uc3Qgb2JqZWN0ID0ge307XG4gIGNvbnN0IHBhaXJzID0gc3RyaW5nXy5zcGxpdCgnJicpO1xuICBsZXQgcGFpcjtcbiAgbGV0IHBvcztcblxuICBmb3IgKGxldCBpID0gMCwgbGVuZ3RoXyA9IHBhaXJzLmxlbmd0aDsgaSA8IGxlbmd0aF87ICsraSkge1xuICAgIHBhaXIgPSBwYWlyc1tpXTtcbiAgICBwb3MgPSBwYWlyLmluZGV4T2YoJz0nKTtcbiAgICBpZiAocG9zID09PSAtMSkge1xuICAgICAgb2JqZWN0W2RlY29kZVVSSUNvbXBvbmVudChwYWlyKV0gPSAnJztcbiAgICB9IGVsc2Uge1xuICAgICAgb2JqZWN0W2RlY29kZVVSSUNvbXBvbmVudChwYWlyLnNsaWNlKDAsIHBvcykpXSA9IGRlY29kZVVSSUNvbXBvbmVudChcbiAgICAgICAgcGFpci5zbGljZShwb3MgKyAxKVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gb2JqZWN0O1xufVxuXG4vKipcbiAqIEV4cG9zZSBwYXJzZXIuXG4gKi9cblxucmVxdWVzdC5wYXJzZVN0cmluZyA9IHBhcnNlU3RyaW5nO1xuXG4vKipcbiAqIERlZmF1bHQgTUlNRSB0eXBlIG1hcC5cbiAqXG4gKiAgICAgc3VwZXJhZ2VudC50eXBlcy54bWwgPSAnYXBwbGljYXRpb24veG1sJztcbiAqXG4gKi9cblxucmVxdWVzdC50eXBlcyA9IHtcbiAgaHRtbDogJ3RleHQvaHRtbCcsXG4gIGpzb246ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgeG1sOiAndGV4dC94bWwnLFxuICB1cmxlbmNvZGVkOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJyxcbiAgZm9ybTogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcsXG4gICdmb3JtLWRhdGEnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ1xufTtcblxuLyoqXG4gKiBEZWZhdWx0IHNlcmlhbGl6YXRpb24gbWFwLlxuICpcbiAqICAgICBzdXBlcmFnZW50LnNlcmlhbGl6ZVsnYXBwbGljYXRpb24veG1sJ10gPSBmdW5jdGlvbihvYmope1xuICogICAgICAgcmV0dXJuICdnZW5lcmF0ZWQgeG1sIGhlcmUnO1xuICogICAgIH07XG4gKlxuICovXG5cbnJlcXVlc3Quc2VyaWFsaXplID0ge1xuICAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJzogcXMuc3RyaW5naWZ5LFxuICAnYXBwbGljYXRpb24vanNvbic6IHNhZmVTdHJpbmdpZnlcbn07XG5cbi8qKlxuICogRGVmYXVsdCBwYXJzZXJzLlxuICpcbiAqICAgICBzdXBlcmFnZW50LnBhcnNlWydhcHBsaWNhdGlvbi94bWwnXSA9IGZ1bmN0aW9uKHN0cil7XG4gKiAgICAgICByZXR1cm4geyBvYmplY3QgcGFyc2VkIGZyb20gc3RyIH07XG4gKiAgICAgfTtcbiAqXG4gKi9cblxucmVxdWVzdC5wYXJzZSA9IHtcbiAgJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCc6IHBhcnNlU3RyaW5nLFxuICAnYXBwbGljYXRpb24vanNvbic6IEpTT04ucGFyc2Vcbn07XG5cbi8qKlxuICogUGFyc2UgdGhlIGdpdmVuIGhlYWRlciBgc3RyYCBpbnRvXG4gKiBhbiBvYmplY3QgY29udGFpbmluZyB0aGUgbWFwcGVkIGZpZWxkcy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBwYXJzZUhlYWRlcihzdHJpbmdfKSB7XG4gIGNvbnN0IGxpbmVzID0gc3RyaW5nXy5zcGxpdCgvXFxyP1xcbi8pO1xuICBjb25zdCBmaWVsZHMgPSB7fTtcbiAgbGV0IGluZGV4O1xuICBsZXQgbGluZTtcbiAgbGV0IGZpZWxkO1xuICBsZXQgdmFsdWU7XG5cbiAgZm9yIChsZXQgaSA9IDAsIGxlbmd0aF8gPSBsaW5lcy5sZW5ndGg7IGkgPCBsZW5ndGhfOyArK2kpIHtcbiAgICBsaW5lID0gbGluZXNbaV07XG4gICAgaW5kZXggPSBsaW5lLmluZGV4T2YoJzonKTtcbiAgICBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgICAvLyBjb3VsZCBiZSBlbXB0eSBsaW5lLCBqdXN0IHNraXAgaXRcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGZpZWxkID0gbGluZS5zbGljZSgwLCBpbmRleCkudG9Mb3dlckNhc2UoKTtcbiAgICB2YWx1ZSA9IHRyaW0obGluZS5zbGljZShpbmRleCArIDEpKTtcbiAgICBmaWVsZHNbZmllbGRdID0gdmFsdWU7XG4gIH1cblxuICByZXR1cm4gZmllbGRzO1xufVxuXG4vKipcbiAqIENoZWNrIGlmIGBtaW1lYCBpcyBqc29uIG9yIGhhcyAranNvbiBzdHJ1Y3R1cmVkIHN5bnRheCBzdWZmaXguXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG1pbWVcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBpc0pTT04obWltZSkge1xuICAvLyBzaG91bGQgbWF0Y2ggL2pzb24gb3IgK2pzb25cbiAgLy8gYnV0IG5vdCAvanNvbi1zZXFcbiAgcmV0dXJuIC9bLytdanNvbigkfFteLVxcd10pL2kudGVzdChtaW1lKTtcbn1cblxuLyoqXG4gKiBJbml0aWFsaXplIGEgbmV3IGBSZXNwb25zZWAgd2l0aCB0aGUgZ2l2ZW4gYHhocmAuXG4gKlxuICogIC0gc2V0IGZsYWdzICgub2ssIC5lcnJvciwgZXRjKVxuICogIC0gcGFyc2UgaGVhZGVyXG4gKlxuICogRXhhbXBsZXM6XG4gKlxuICogIEFsaWFzaW5nIGBzdXBlcmFnZW50YCBhcyBgcmVxdWVzdGAgaXMgbmljZTpcbiAqXG4gKiAgICAgIHJlcXVlc3QgPSBzdXBlcmFnZW50O1xuICpcbiAqICBXZSBjYW4gdXNlIHRoZSBwcm9taXNlLWxpa2UgQVBJLCBvciBwYXNzIGNhbGxiYWNrczpcbiAqXG4gKiAgICAgIHJlcXVlc3QuZ2V0KCcvJykuZW5kKGZ1bmN0aW9uKHJlcyl7fSk7XG4gKiAgICAgIHJlcXVlc3QuZ2V0KCcvJywgZnVuY3Rpb24ocmVzKXt9KTtcbiAqXG4gKiAgU2VuZGluZyBkYXRhIGNhbiBiZSBjaGFpbmVkOlxuICpcbiAqICAgICAgcmVxdWVzdFxuICogICAgICAgIC5wb3N0KCcvdXNlcicpXG4gKiAgICAgICAgLnNlbmQoeyBuYW1lOiAndGonIH0pXG4gKiAgICAgICAgLmVuZChmdW5jdGlvbihyZXMpe30pO1xuICpcbiAqICBPciBwYXNzZWQgdG8gYC5zZW5kKClgOlxuICpcbiAqICAgICAgcmVxdWVzdFxuICogICAgICAgIC5wb3N0KCcvdXNlcicpXG4gKiAgICAgICAgLnNlbmQoeyBuYW1lOiAndGonIH0sIGZ1bmN0aW9uKHJlcyl7fSk7XG4gKlxuICogIE9yIHBhc3NlZCB0byBgLnBvc3QoKWA6XG4gKlxuICogICAgICByZXF1ZXN0XG4gKiAgICAgICAgLnBvc3QoJy91c2VyJywgeyBuYW1lOiAndGonIH0pXG4gKiAgICAgICAgLmVuZChmdW5jdGlvbihyZXMpe30pO1xuICpcbiAqIE9yIGZ1cnRoZXIgcmVkdWNlZCB0byBhIHNpbmdsZSBjYWxsIGZvciBzaW1wbGUgY2FzZXM6XG4gKlxuICogICAgICByZXF1ZXN0XG4gKiAgICAgICAgLnBvc3QoJy91c2VyJywgeyBuYW1lOiAndGonIH0sIGZ1bmN0aW9uKHJlcyl7fSk7XG4gKlxuICogQHBhcmFtIHtYTUxIVFRQUmVxdWVzdH0geGhyXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gUmVzcG9uc2UocmVxdWVzdF8pIHtcbiAgdGhpcy5yZXEgPSByZXF1ZXN0XztcbiAgdGhpcy54aHIgPSB0aGlzLnJlcS54aHI7XG4gIC8vIHJlc3BvbnNlVGV4dCBpcyBhY2Nlc3NpYmxlIG9ubHkgaWYgcmVzcG9uc2VUeXBlIGlzICcnIG9yICd0ZXh0JyBhbmQgb24gb2xkZXIgYnJvd3NlcnNcbiAgdGhpcy50ZXh0ID1cbiAgICAodGhpcy5yZXEubWV0aG9kICE9PSAnSEVBRCcgJiZcbiAgICAgICh0aGlzLnhoci5yZXNwb25zZVR5cGUgPT09ICcnIHx8IHRoaXMueGhyLnJlc3BvbnNlVHlwZSA9PT0gJ3RleHQnKSkgfHxcbiAgICB0eXBlb2YgdGhpcy54aHIucmVzcG9uc2VUeXBlID09PSAndW5kZWZpbmVkJ1xuICAgICAgPyB0aGlzLnhoci5yZXNwb25zZVRleHRcbiAgICAgIDogbnVsbDtcbiAgdGhpcy5zdGF0dXNUZXh0ID0gdGhpcy5yZXEueGhyLnN0YXR1c1RleHQ7XG4gIGxldCB7IHN0YXR1cyB9ID0gdGhpcy54aHI7XG4gIC8vIGhhbmRsZSBJRTkgYnVnOiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzEwMDQ2OTcyL21zaWUtcmV0dXJucy1zdGF0dXMtY29kZS1vZi0xMjIzLWZvci1hamF4LXJlcXVlc3RcbiAgaWYgKHN0YXR1cyA9PT0gMTIyMykge1xuICAgIHN0YXR1cyA9IDIwNDtcbiAgfVxuXG4gIHRoaXMuX3NldFN0YXR1c1Byb3BlcnRpZXMoc3RhdHVzKTtcbiAgdGhpcy5oZWFkZXJzID0gcGFyc2VIZWFkZXIodGhpcy54aHIuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKCkpO1xuICB0aGlzLmhlYWRlciA9IHRoaXMuaGVhZGVycztcbiAgLy8gZ2V0QWxsUmVzcG9uc2VIZWFkZXJzIHNvbWV0aW1lcyBmYWxzZWx5IHJldHVybnMgXCJcIiBmb3IgQ09SUyByZXF1ZXN0cywgYnV0XG4gIC8vIGdldFJlc3BvbnNlSGVhZGVyIHN0aWxsIHdvcmtzLiBzbyB3ZSBnZXQgY29udGVudC10eXBlIGV2ZW4gaWYgZ2V0dGluZ1xuICAvLyBvdGhlciBoZWFkZXJzIGZhaWxzLlxuICB0aGlzLmhlYWRlclsnY29udGVudC10eXBlJ10gPSB0aGlzLnhoci5nZXRSZXNwb25zZUhlYWRlcignY29udGVudC10eXBlJyk7XG4gIHRoaXMuX3NldEhlYWRlclByb3BlcnRpZXModGhpcy5oZWFkZXIpO1xuXG4gIGlmICh0aGlzLnRleHQgPT09IG51bGwgJiYgcmVxdWVzdF8uX3Jlc3BvbnNlVHlwZSkge1xuICAgIHRoaXMuYm9keSA9IHRoaXMueGhyLnJlc3BvbnNlO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuYm9keSA9XG4gICAgICB0aGlzLnJlcS5tZXRob2QgPT09ICdIRUFEJ1xuICAgICAgICA/IG51bGxcbiAgICAgICAgOiB0aGlzLl9wYXJzZUJvZHkodGhpcy50ZXh0ID8gdGhpcy50ZXh0IDogdGhpcy54aHIucmVzcG9uc2UpO1xuICB9XG59XG5cbm1peGluKFJlc3BvbnNlLnByb3RvdHlwZSwgUmVzcG9uc2VCYXNlLnByb3RvdHlwZSk7XG5cbi8qKlxuICogUGFyc2UgdGhlIGdpdmVuIGJvZHkgYHN0cmAuXG4gKlxuICogVXNlZCBmb3IgYXV0by1wYXJzaW5nIG9mIGJvZGllcy4gUGFyc2Vyc1xuICogYXJlIGRlZmluZWQgb24gdGhlIGBzdXBlcmFnZW50LnBhcnNlYCBvYmplY3QuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHJldHVybiB7TWl4ZWR9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5SZXNwb25zZS5wcm90b3R5cGUuX3BhcnNlQm9keSA9IGZ1bmN0aW9uIChzdHJpbmdfKSB7XG4gIGxldCBwYXJzZSA9IHJlcXVlc3QucGFyc2VbdGhpcy50eXBlXTtcbiAgaWYgKHRoaXMucmVxLl9wYXJzZXIpIHtcbiAgICByZXR1cm4gdGhpcy5yZXEuX3BhcnNlcih0aGlzLCBzdHJpbmdfKTtcbiAgfVxuXG4gIGlmICghcGFyc2UgJiYgaXNKU09OKHRoaXMudHlwZSkpIHtcbiAgICBwYXJzZSA9IHJlcXVlc3QucGFyc2VbJ2FwcGxpY2F0aW9uL2pzb24nXTtcbiAgfVxuXG4gIHJldHVybiBwYXJzZSAmJiBzdHJpbmdfICYmIChzdHJpbmdfLmxlbmd0aCA+IDAgfHwgc3RyaW5nXyBpbnN0YW5jZW9mIE9iamVjdClcbiAgICA/IHBhcnNlKHN0cmluZ18pXG4gICAgOiBudWxsO1xufTtcblxuLyoqXG4gKiBSZXR1cm4gYW4gYEVycm9yYCByZXByZXNlbnRhdGl2ZSBvZiB0aGlzIHJlc3BvbnNlLlxuICpcbiAqIEByZXR1cm4ge0Vycm9yfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXNwb25zZS5wcm90b3R5cGUudG9FcnJvciA9IGZ1bmN0aW9uICgpIHtcbiAgY29uc3QgeyByZXEgfSA9IHRoaXM7XG4gIGNvbnN0IHsgbWV0aG9kIH0gPSByZXE7XG4gIGNvbnN0IHsgdXJsIH0gPSByZXE7XG5cbiAgY29uc3QgbWVzc2FnZSA9IGBjYW5ub3QgJHttZXRob2R9ICR7dXJsfSAoJHt0aGlzLnN0YXR1c30pYDtcbiAgY29uc3QgZXJyb3IgPSBuZXcgRXJyb3IobWVzc2FnZSk7XG4gIGVycm9yLnN0YXR1cyA9IHRoaXMuc3RhdHVzO1xuICBlcnJvci5tZXRob2QgPSBtZXRob2Q7XG4gIGVycm9yLnVybCA9IHVybDtcblxuICByZXR1cm4gZXJyb3I7XG59O1xuXG4vKipcbiAqIEV4cG9zZSBgUmVzcG9uc2VgLlxuICovXG5cbnJlcXVlc3QuUmVzcG9uc2UgPSBSZXNwb25zZTtcblxuLyoqXG4gKiBJbml0aWFsaXplIGEgbmV3IGBSZXF1ZXN0YCB3aXRoIHRoZSBnaXZlbiBgbWV0aG9kYCBhbmQgYHVybGAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG1ldGhvZFxuICogQHBhcmFtIHtTdHJpbmd9IHVybFxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBSZXF1ZXN0KG1ldGhvZCwgdXJsKSB7XG4gIGNvbnN0IHNlbGYgPSB0aGlzO1xuICB0aGlzLl9xdWVyeSA9IHRoaXMuX3F1ZXJ5IHx8IFtdO1xuICB0aGlzLm1ldGhvZCA9IG1ldGhvZDtcbiAgdGhpcy51cmwgPSB1cmw7XG4gIHRoaXMuaGVhZGVyID0ge307IC8vIHByZXNlcnZlcyBoZWFkZXIgbmFtZSBjYXNlXG4gIHRoaXMuX2hlYWRlciA9IHt9OyAvLyBjb2VyY2VzIGhlYWRlciBuYW1lcyB0byBsb3dlcmNhc2VcbiAgdGhpcy5vbignZW5kJywgKCkgPT4ge1xuICAgIGxldCBlcnJvciA9IG51bGw7XG4gICAgbGV0IHJlcyA9IG51bGw7XG5cbiAgICB0cnkge1xuICAgICAgcmVzID0gbmV3IFJlc3BvbnNlKHNlbGYpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgZXJyb3IgPSBuZXcgRXJyb3IoJ1BhcnNlciBpcyB1bmFibGUgdG8gcGFyc2UgdGhlIHJlc3BvbnNlJyk7XG4gICAgICBlcnJvci5wYXJzZSA9IHRydWU7XG4gICAgICBlcnJvci5vcmlnaW5hbCA9IGVycjtcbiAgICAgIC8vIGlzc3VlICM2NzU6IHJldHVybiB0aGUgcmF3IHJlc3BvbnNlIGlmIHRoZSByZXNwb25zZSBwYXJzaW5nIGZhaWxzXG4gICAgICBpZiAoc2VsZi54aHIpIHtcbiAgICAgICAgLy8gaWU5IGRvZXNuJ3QgaGF2ZSAncmVzcG9uc2UnIHByb3BlcnR5XG4gICAgICAgIGVycm9yLnJhd1Jlc3BvbnNlID1cbiAgICAgICAgICB0eXBlb2Ygc2VsZi54aHIucmVzcG9uc2VUeXBlID09PSAndW5kZWZpbmVkJ1xuICAgICAgICAgICAgPyBzZWxmLnhoci5yZXNwb25zZVRleHRcbiAgICAgICAgICAgIDogc2VsZi54aHIucmVzcG9uc2U7XG4gICAgICAgIC8vIGlzc3VlICM4NzY6IHJldHVybiB0aGUgaHR0cCBzdGF0dXMgY29kZSBpZiB0aGUgcmVzcG9uc2UgcGFyc2luZyBmYWlsc1xuICAgICAgICBlcnJvci5zdGF0dXMgPSBzZWxmLnhoci5zdGF0dXMgPyBzZWxmLnhoci5zdGF0dXMgOiBudWxsO1xuICAgICAgICBlcnJvci5zdGF0dXNDb2RlID0gZXJyb3Iuc3RhdHVzOyAvLyBiYWNrd2FyZHMtY29tcGF0IG9ubHlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVycm9yLnJhd1Jlc3BvbnNlID0gbnVsbDtcbiAgICAgICAgZXJyb3Iuc3RhdHVzID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHNlbGYuY2FsbGJhY2soZXJyb3IpO1xuICAgIH1cblxuICAgIHNlbGYuZW1pdCgncmVzcG9uc2UnLCByZXMpO1xuXG4gICAgbGV0IG5ld19lcnJvcjtcbiAgICB0cnkge1xuICAgICAgaWYgKCFzZWxmLl9pc1Jlc3BvbnNlT0socmVzKSkge1xuICAgICAgICBuZXdfZXJyb3IgPSBuZXcgRXJyb3IoXG4gICAgICAgICAgcmVzLnN0YXR1c1RleHQgfHwgcmVzLnRleHQgfHwgJ1Vuc3VjY2Vzc2Z1bCBIVFRQIHJlc3BvbnNlJ1xuICAgICAgICApO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgbmV3X2Vycm9yID0gZXJyOyAvLyBvaygpIGNhbGxiYWNrIGNhbiB0aHJvd1xuICAgIH1cblxuICAgIC8vICMxMDAwIGRvbid0IGNhdGNoIGVycm9ycyBmcm9tIHRoZSBjYWxsYmFjayB0byBhdm9pZCBkb3VibGUgY2FsbGluZyBpdFxuICAgIGlmIChuZXdfZXJyb3IpIHtcbiAgICAgIG5ld19lcnJvci5vcmlnaW5hbCA9IGVycm9yO1xuICAgICAgbmV3X2Vycm9yLnJlc3BvbnNlID0gcmVzO1xuICAgICAgbmV3X2Vycm9yLnN0YXR1cyA9IHJlcy5zdGF0dXM7XG4gICAgICBzZWxmLmNhbGxiYWNrKG5ld19lcnJvciwgcmVzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2VsZi5jYWxsYmFjayhudWxsLCByZXMpO1xuICAgIH1cbiAgfSk7XG59XG5cbi8qKlxuICogTWl4aW4gYEVtaXR0ZXJgIGFuZCBgUmVxdWVzdEJhc2VgLlxuICovXG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuZXctY2FwXG5FbWl0dGVyKFJlcXVlc3QucHJvdG90eXBlKTtcblxubWl4aW4oUmVxdWVzdC5wcm90b3R5cGUsIFJlcXVlc3RCYXNlLnByb3RvdHlwZSk7XG5cbi8qKlxuICogU2V0IENvbnRlbnQtVHlwZSB0byBgdHlwZWAsIG1hcHBpbmcgdmFsdWVzIGZyb20gYHJlcXVlc3QudHlwZXNgLlxuICpcbiAqIEV4YW1wbGVzOlxuICpcbiAqICAgICAgc3VwZXJhZ2VudC50eXBlcy54bWwgPSAnYXBwbGljYXRpb24veG1sJztcbiAqXG4gKiAgICAgIHJlcXVlc3QucG9zdCgnLycpXG4gKiAgICAgICAgLnR5cGUoJ3htbCcpXG4gKiAgICAgICAgLnNlbmQoeG1sc3RyaW5nKVxuICogICAgICAgIC5lbmQoY2FsbGJhY2spO1xuICpcbiAqICAgICAgcmVxdWVzdC5wb3N0KCcvJylcbiAqICAgICAgICAudHlwZSgnYXBwbGljYXRpb24veG1sJylcbiAqICAgICAgICAuc2VuZCh4bWxzdHJpbmcpXG4gKiAgICAgICAgLmVuZChjYWxsYmFjayk7XG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHR5cGVcbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS50eXBlID0gZnVuY3Rpb24gKHR5cGUpIHtcbiAgdGhpcy5zZXQoJ0NvbnRlbnQtVHlwZScsIHJlcXVlc3QudHlwZXNbdHlwZV0gfHwgdHlwZSk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTZXQgQWNjZXB0IHRvIGB0eXBlYCwgbWFwcGluZyB2YWx1ZXMgZnJvbSBgcmVxdWVzdC50eXBlc2AuXG4gKlxuICogRXhhbXBsZXM6XG4gKlxuICogICAgICBzdXBlcmFnZW50LnR5cGVzLmpzb24gPSAnYXBwbGljYXRpb24vanNvbic7XG4gKlxuICogICAgICByZXF1ZXN0LmdldCgnL2FnZW50JylcbiAqICAgICAgICAuYWNjZXB0KCdqc29uJylcbiAqICAgICAgICAuZW5kKGNhbGxiYWNrKTtcbiAqXG4gKiAgICAgIHJlcXVlc3QuZ2V0KCcvYWdlbnQnKVxuICogICAgICAgIC5hY2NlcHQoJ2FwcGxpY2F0aW9uL2pzb24nKVxuICogICAgICAgIC5lbmQoY2FsbGJhY2spO1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBhY2NlcHRcbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5hY2NlcHQgPSBmdW5jdGlvbiAodHlwZSkge1xuICB0aGlzLnNldCgnQWNjZXB0JywgcmVxdWVzdC50eXBlc1t0eXBlXSB8fCB0eXBlKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFNldCBBdXRob3JpemF0aW9uIGZpZWxkIHZhbHVlIHdpdGggYHVzZXJgIGFuZCBgcGFzc2AuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHVzZXJcbiAqIEBwYXJhbSB7U3RyaW5nfSBbcGFzc10gb3B0aW9uYWwgaW4gY2FzZSBvZiB1c2luZyAnYmVhcmVyJyBhcyB0eXBlXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyB3aXRoICd0eXBlJyBwcm9wZXJ0eSAnYXV0bycsICdiYXNpYycgb3IgJ2JlYXJlcicgKGRlZmF1bHQgJ2Jhc2ljJylcbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5hdXRoID0gZnVuY3Rpb24gKHVzZXIsIHBhc3MsIG9wdGlvbnMpIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHBhc3MgPSAnJztcbiAgaWYgKHR5cGVvZiBwYXNzID09PSAnb2JqZWN0JyAmJiBwYXNzICE9PSBudWxsKSB7XG4gICAgLy8gcGFzcyBpcyBvcHRpb25hbCBhbmQgY2FuIGJlIHJlcGxhY2VkIHdpdGggb3B0aW9uc1xuICAgIG9wdGlvbnMgPSBwYXNzO1xuICAgIHBhc3MgPSAnJztcbiAgfVxuXG4gIGlmICghb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSB7XG4gICAgICB0eXBlOiB0eXBlb2YgYnRvYSA9PT0gJ2Z1bmN0aW9uJyA/ICdiYXNpYycgOiAnYXV0bydcbiAgICB9O1xuICB9XG5cbiAgY29uc3QgZW5jb2RlciA9IG9wdGlvbnMuZW5jb2RlclxuICAgID8gb3B0aW9ucy5lbmNvZGVyXG4gICAgOiAoc3RyaW5nKSA9PiB7XG4gICAgICAgIGlmICh0eXBlb2YgYnRvYSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIHJldHVybiBidG9hKHN0cmluZyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCB1c2UgYmFzaWMgYXV0aCwgYnRvYSBpcyBub3QgYSBmdW5jdGlvbicpO1xuICAgICAgfTtcblxuICByZXR1cm4gdGhpcy5fYXV0aCh1c2VyLCBwYXNzLCBvcHRpb25zLCBlbmNvZGVyKTtcbn07XG5cbi8qKlxuICogQWRkIHF1ZXJ5LXN0cmluZyBgdmFsYC5cbiAqXG4gKiBFeGFtcGxlczpcbiAqXG4gKiAgIHJlcXVlc3QuZ2V0KCcvc2hvZXMnKVxuICogICAgIC5xdWVyeSgnc2l6ZT0xMCcpXG4gKiAgICAgLnF1ZXJ5KHsgY29sb3I6ICdibHVlJyB9KVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fFN0cmluZ30gdmFsXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUucXVlcnkgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ3N0cmluZycpIHZhbHVlID0gc2VyaWFsaXplKHZhbHVlKTtcbiAgaWYgKHZhbHVlKSB0aGlzLl9xdWVyeS5wdXNoKHZhbHVlKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFF1ZXVlIHRoZSBnaXZlbiBgZmlsZWAgYXMgYW4gYXR0YWNobWVudCB0byB0aGUgc3BlY2lmaWVkIGBmaWVsZGAsXG4gKiB3aXRoIG9wdGlvbmFsIGBvcHRpb25zYCAob3IgZmlsZW5hbWUpLlxuICpcbiAqIGBgYCBqc1xuICogcmVxdWVzdC5wb3N0KCcvdXBsb2FkJylcbiAqICAgLmF0dGFjaCgnY29udGVudCcsIG5ldyBCbG9iKFsnPGEgaWQ9XCJhXCI+PGIgaWQ9XCJiXCI+aGV5ITwvYj48L2E+J10sIHsgdHlwZTogXCJ0ZXh0L2h0bWxcIn0pKVxuICogICAuZW5kKGNhbGxiYWNrKTtcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBmaWVsZFxuICogQHBhcmFtIHtCbG9ifEZpbGV9IGZpbGVcbiAqIEBwYXJhbSB7U3RyaW5nfE9iamVjdH0gb3B0aW9uc1xuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3QucHJvdG90eXBlLmF0dGFjaCA9IGZ1bmN0aW9uIChmaWVsZCwgZmlsZSwgb3B0aW9ucykge1xuICBpZiAoZmlsZSkge1xuICAgIGlmICh0aGlzLl9kYXRhKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJzdXBlcmFnZW50IGNhbid0IG1peCAuc2VuZCgpIGFuZCAuYXR0YWNoKClcIik7XG4gICAgfVxuXG4gICAgdGhpcy5fZ2V0Rm9ybURhdGEoKS5hcHBlbmQoZmllbGQsIGZpbGUsIG9wdGlvbnMgfHwgZmlsZS5uYW1lKTtcbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuUmVxdWVzdC5wcm90b3R5cGUuX2dldEZvcm1EYXRhID0gZnVuY3Rpb24gKCkge1xuICBpZiAoIXRoaXMuX2Zvcm1EYXRhKSB7XG4gICAgdGhpcy5fZm9ybURhdGEgPSBuZXcgcm9vdC5Gb3JtRGF0YSgpO1xuICB9XG5cbiAgcmV0dXJuIHRoaXMuX2Zvcm1EYXRhO1xufTtcblxuLyoqXG4gKiBJbnZva2UgdGhlIGNhbGxiYWNrIHdpdGggYGVycmAgYW5kIGByZXNgXG4gKiBhbmQgaGFuZGxlIGFyaXR5IGNoZWNrLlxuICpcbiAqIEBwYXJhbSB7RXJyb3J9IGVyclxuICogQHBhcmFtIHtSZXNwb25zZX0gcmVzXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5jYWxsYmFjayA9IGZ1bmN0aW9uIChlcnJvciwgcmVzKSB7XG4gIGlmICh0aGlzLl9zaG91bGRSZXRyeShlcnJvciwgcmVzKSkge1xuICAgIHJldHVybiB0aGlzLl9yZXRyeSgpO1xuICB9XG5cbiAgY29uc3QgZm4gPSB0aGlzLl9jYWxsYmFjaztcbiAgdGhpcy5jbGVhclRpbWVvdXQoKTtcblxuICBpZiAoZXJyb3IpIHtcbiAgICBpZiAodGhpcy5fbWF4UmV0cmllcykgZXJyb3IucmV0cmllcyA9IHRoaXMuX3JldHJpZXMgLSAxO1xuICAgIHRoaXMuZW1pdCgnZXJyb3InLCBlcnJvcik7XG4gIH1cblxuICBmbihlcnJvciwgcmVzKTtcbn07XG5cbi8qKlxuICogSW52b2tlIGNhbGxiYWNrIHdpdGggeC1kb21haW4gZXJyb3IuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUuY3Jvc3NEb21haW5FcnJvciA9IGZ1bmN0aW9uICgpIHtcbiAgY29uc3QgZXJyb3IgPSBuZXcgRXJyb3IoXG4gICAgJ1JlcXVlc3QgaGFzIGJlZW4gdGVybWluYXRlZFxcblBvc3NpYmxlIGNhdXNlczogdGhlIG5ldHdvcmsgaXMgb2ZmbGluZSwgT3JpZ2luIGlzIG5vdCBhbGxvd2VkIGJ5IEFjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbiwgdGhlIHBhZ2UgaXMgYmVpbmcgdW5sb2FkZWQsIGV0Yy4nXG4gICk7XG4gIGVycm9yLmNyb3NzRG9tYWluID0gdHJ1ZTtcblxuICBlcnJvci5zdGF0dXMgPSB0aGlzLnN0YXR1cztcbiAgZXJyb3IubWV0aG9kID0gdGhpcy5tZXRob2Q7XG4gIGVycm9yLnVybCA9IHRoaXMudXJsO1xuXG4gIHRoaXMuY2FsbGJhY2soZXJyb3IpO1xufTtcblxuLy8gVGhpcyBvbmx5IHdhcm5zLCBiZWNhdXNlIHRoZSByZXF1ZXN0IGlzIHN0aWxsIGxpa2VseSB0byB3b3JrXG5SZXF1ZXN0LnByb3RvdHlwZS5hZ2VudCA9IGZ1bmN0aW9uICgpIHtcbiAgY29uc29sZS53YXJuKCdUaGlzIGlzIG5vdCBzdXBwb3J0ZWQgaW4gYnJvd3NlciB2ZXJzaW9uIG9mIHN1cGVyYWdlbnQnKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5jYSA9IFJlcXVlc3QucHJvdG90eXBlLmFnZW50O1xuUmVxdWVzdC5wcm90b3R5cGUuYnVmZmVyID0gUmVxdWVzdC5wcm90b3R5cGUuY2E7XG5cbi8vIFRoaXMgdGhyb3dzLCBiZWNhdXNlIGl0IGNhbid0IHNlbmQvcmVjZWl2ZSBkYXRhIGFzIGV4cGVjdGVkXG5SZXF1ZXN0LnByb3RvdHlwZS53cml0ZSA9ICgpID0+IHtcbiAgdGhyb3cgbmV3IEVycm9yKFxuICAgICdTdHJlYW1pbmcgaXMgbm90IHN1cHBvcnRlZCBpbiBicm93c2VyIHZlcnNpb24gb2Ygc3VwZXJhZ2VudCdcbiAgKTtcbn07XG5cblJlcXVlc3QucHJvdG90eXBlLnBpcGUgPSBSZXF1ZXN0LnByb3RvdHlwZS53cml0ZTtcblxuLyoqXG4gKiBDaGVjayBpZiBgb2JqYCBpcyBhIGhvc3Qgb2JqZWN0LFxuICogd2UgZG9uJ3Qgd2FudCB0byBzZXJpYWxpemUgdGhlc2UgOilcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqIGhvc3Qgb2JqZWN0XG4gKiBAcmV0dXJuIHtCb29sZWFufSBpcyBhIGhvc3Qgb2JqZWN0XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuUmVxdWVzdC5wcm90b3R5cGUuX2lzSG9zdCA9IGZ1bmN0aW9uIChvYmplY3QpIHtcbiAgLy8gTmF0aXZlIG9iamVjdHMgc3RyaW5naWZ5IHRvIFtvYmplY3QgRmlsZV0sIFtvYmplY3QgQmxvYl0sIFtvYmplY3QgRm9ybURhdGFdLCBldGMuXG4gIHJldHVybiAoXG4gICAgb2JqZWN0ICYmXG4gICAgdHlwZW9mIG9iamVjdCA9PT0gJ29iamVjdCcgJiZcbiAgICAhQXJyYXkuaXNBcnJheShvYmplY3QpICYmXG4gICAgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iamVjdCkgIT09ICdbb2JqZWN0IE9iamVjdF0nXG4gICk7XG59O1xuXG4vKipcbiAqIEluaXRpYXRlIHJlcXVlc3QsIGludm9raW5nIGNhbGxiYWNrIGBmbihyZXMpYFxuICogd2l0aCBhbiBpbnN0YW5jZW9mIGBSZXNwb25zZWAuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5lbmQgPSBmdW5jdGlvbiAoZm4pIHtcbiAgaWYgKHRoaXMuX2VuZENhbGxlZCkge1xuICAgIGNvbnNvbGUud2FybihcbiAgICAgICdXYXJuaW5nOiAuZW5kKCkgd2FzIGNhbGxlZCB0d2ljZS4gVGhpcyBpcyBub3Qgc3VwcG9ydGVkIGluIHN1cGVyYWdlbnQnXG4gICAgKTtcbiAgfVxuXG4gIHRoaXMuX2VuZENhbGxlZCA9IHRydWU7XG5cbiAgLy8gc3RvcmUgY2FsbGJhY2tcbiAgdGhpcy5fY2FsbGJhY2sgPSBmbiB8fCBub29wO1xuXG4gIC8vIHF1ZXJ5c3RyaW5nXG4gIHRoaXMuX2ZpbmFsaXplUXVlcnlTdHJpbmcoKTtcblxuICB0aGlzLl9lbmQoKTtcbn07XG5cblJlcXVlc3QucHJvdG90eXBlLl9zZXRVcGxvYWRUaW1lb3V0ID0gZnVuY3Rpb24gKCkge1xuICBjb25zdCBzZWxmID0gdGhpcztcblxuICAvLyB1cGxvYWQgdGltZW91dCBpdCdzIHdva3JzIG9ubHkgaWYgZGVhZGxpbmUgdGltZW91dCBpcyBvZmZcbiAgaWYgKHRoaXMuX3VwbG9hZFRpbWVvdXQgJiYgIXRoaXMuX3VwbG9hZFRpbWVvdXRUaW1lcikge1xuICAgIHRoaXMuX3VwbG9hZFRpbWVvdXRUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgc2VsZi5fdGltZW91dEVycm9yKFxuICAgICAgICAnVXBsb2FkIHRpbWVvdXQgb2YgJyxcbiAgICAgICAgc2VsZi5fdXBsb2FkVGltZW91dCxcbiAgICAgICAgJ0VUSU1FRE9VVCdcbiAgICAgICk7XG4gICAgfSwgdGhpcy5fdXBsb2FkVGltZW91dCk7XG4gIH1cbn07XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb21wbGV4aXR5XG5SZXF1ZXN0LnByb3RvdHlwZS5fZW5kID0gZnVuY3Rpb24gKCkge1xuICBpZiAodGhpcy5fYWJvcnRlZClcbiAgICByZXR1cm4gdGhpcy5jYWxsYmFjayhcbiAgICAgIG5ldyBFcnJvcignVGhlIHJlcXVlc3QgaGFzIGJlZW4gYWJvcnRlZCBldmVuIGJlZm9yZSAuZW5kKCkgd2FzIGNhbGxlZCcpXG4gICAgKTtcblxuICBjb25zdCBzZWxmID0gdGhpcztcbiAgdGhpcy54aHIgPSByZXF1ZXN0LmdldFhIUigpO1xuICBjb25zdCB7IHhociB9ID0gdGhpcztcbiAgbGV0IGRhdGEgPSB0aGlzLl9mb3JtRGF0YSB8fCB0aGlzLl9kYXRhO1xuXG4gIHRoaXMuX3NldFRpbWVvdXRzKCk7XG5cbiAgLy8gc3RhdGUgY2hhbmdlXG4gIHhoci5hZGRFdmVudExpc3RlbmVyKCdyZWFkeXN0YXRlY2hhbmdlJywgKCkgPT4ge1xuICAgIGNvbnN0IHsgcmVhZHlTdGF0ZSB9ID0geGhyO1xuICAgIGlmIChyZWFkeVN0YXRlID49IDIgJiYgc2VsZi5fcmVzcG9uc2VUaW1lb3V0VGltZXIpIHtcbiAgICAgIGNsZWFyVGltZW91dChzZWxmLl9yZXNwb25zZVRpbWVvdXRUaW1lcik7XG4gICAgfVxuXG4gICAgaWYgKHJlYWR5U3RhdGUgIT09IDQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBJbiBJRTksIHJlYWRzIHRvIGFueSBwcm9wZXJ0eSAoZS5nLiBzdGF0dXMpIG9mZiBvZiBhbiBhYm9ydGVkIFhIUiB3aWxsXG4gICAgLy8gcmVzdWx0IGluIHRoZSBlcnJvciBcIkNvdWxkIG5vdCBjb21wbGV0ZSB0aGUgb3BlcmF0aW9uIGR1ZSB0byBlcnJvciBjMDBjMDIzZlwiXG4gICAgbGV0IHN0YXR1cztcbiAgICB0cnkge1xuICAgICAgc3RhdHVzID0geGhyLnN0YXR1cztcbiAgICB9IGNhdGNoIHtcbiAgICAgIHN0YXR1cyA9IDA7XG4gICAgfVxuXG4gICAgaWYgKCFzdGF0dXMpIHtcbiAgICAgIGlmIChzZWxmLnRpbWVkb3V0IHx8IHNlbGYuX2Fib3J0ZWQpIHJldHVybjtcbiAgICAgIHJldHVybiBzZWxmLmNyb3NzRG9tYWluRXJyb3IoKTtcbiAgICB9XG5cbiAgICBzZWxmLmVtaXQoJ2VuZCcpO1xuICB9KTtcblxuICAvLyBwcm9ncmVzc1xuICBjb25zdCBoYW5kbGVQcm9ncmVzcyA9IChkaXJlY3Rpb24sIGUpID0+IHtcbiAgICBpZiAoZS50b3RhbCA+IDApIHtcbiAgICAgIGUucGVyY2VudCA9IChlLmxvYWRlZCAvIGUudG90YWwpICogMTAwO1xuXG4gICAgICBpZiAoZS5wZXJjZW50ID09PSAxMDApIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHNlbGYuX3VwbG9hZFRpbWVvdXRUaW1lcik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZS5kaXJlY3Rpb24gPSBkaXJlY3Rpb247XG4gICAgc2VsZi5lbWl0KCdwcm9ncmVzcycsIGUpO1xuICB9O1xuXG4gIGlmICh0aGlzLmhhc0xpc3RlbmVycygncHJvZ3Jlc3MnKSkge1xuICAgIHRyeSB7XG4gICAgICB4aHIuYWRkRXZlbnRMaXN0ZW5lcigncHJvZ3Jlc3MnLCBoYW5kbGVQcm9ncmVzcy5iaW5kKG51bGwsICdkb3dubG9hZCcpKTtcbiAgICAgIGlmICh4aHIudXBsb2FkKSB7XG4gICAgICAgIHhoci51cGxvYWQuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAncHJvZ3Jlc3MnLFxuICAgICAgICAgIGhhbmRsZVByb2dyZXNzLmJpbmQobnVsbCwgJ3VwbG9hZCcpXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSBjYXRjaCB7XG4gICAgICAvLyBBY2Nlc3NpbmcgeGhyLnVwbG9hZCBmYWlscyBpbiBJRSBmcm9tIGEgd2ViIHdvcmtlciwgc28ganVzdCBwcmV0ZW5kIGl0IGRvZXNuJ3QgZXhpc3QuXG4gICAgICAvLyBSZXBvcnRlZCBoZXJlOlxuICAgICAgLy8gaHR0cHM6Ly9jb25uZWN0Lm1pY3Jvc29mdC5jb20vSUUvZmVlZGJhY2svZGV0YWlscy84MzcyNDUveG1saHR0cHJlcXVlc3QtdXBsb2FkLXRocm93cy1pbnZhbGlkLWFyZ3VtZW50LXdoZW4tdXNlZC1mcm9tLXdlYi13b3JrZXItY29udGV4dFxuICAgIH1cbiAgfVxuXG4gIGlmICh4aHIudXBsb2FkKSB7XG4gICAgdGhpcy5fc2V0VXBsb2FkVGltZW91dCgpO1xuICB9XG5cbiAgLy8gaW5pdGlhdGUgcmVxdWVzdFxuICB0cnkge1xuICAgIGlmICh0aGlzLnVzZXJuYW1lICYmIHRoaXMucGFzc3dvcmQpIHtcbiAgICAgIHhoci5vcGVuKHRoaXMubWV0aG9kLCB0aGlzLnVybCwgdHJ1ZSwgdGhpcy51c2VybmFtZSwgdGhpcy5wYXNzd29yZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHhoci5vcGVuKHRoaXMubWV0aG9kLCB0aGlzLnVybCwgdHJ1ZSk7XG4gICAgfVxuICB9IGNhdGNoIChlcnIpIHtcbiAgICAvLyBzZWUgIzExNDlcbiAgICByZXR1cm4gdGhpcy5jYWxsYmFjayhlcnIpO1xuICB9XG5cbiAgLy8gQ09SU1xuICBpZiAodGhpcy5fd2l0aENyZWRlbnRpYWxzKSB4aHIud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcblxuICAvLyBib2R5XG4gIGlmIChcbiAgICAhdGhpcy5fZm9ybURhdGEgJiZcbiAgICB0aGlzLm1ldGhvZCAhPT0gJ0dFVCcgJiZcbiAgICB0aGlzLm1ldGhvZCAhPT0gJ0hFQUQnICYmXG4gICAgdHlwZW9mIGRhdGEgIT09ICdzdHJpbmcnICYmXG4gICAgIXRoaXMuX2lzSG9zdChkYXRhKVxuICApIHtcbiAgICAvLyBzZXJpYWxpemUgc3R1ZmZcbiAgICBjb25zdCBjb250ZW50VHlwZSA9IHRoaXMuX2hlYWRlclsnY29udGVudC10eXBlJ107XG4gICAgbGV0IHNlcmlhbGl6ZSA9XG4gICAgICB0aGlzLl9zZXJpYWxpemVyIHx8XG4gICAgICByZXF1ZXN0LnNlcmlhbGl6ZVtjb250ZW50VHlwZSA/IGNvbnRlbnRUeXBlLnNwbGl0KCc7JylbMF0gOiAnJ107XG4gICAgaWYgKCFzZXJpYWxpemUgJiYgaXNKU09OKGNvbnRlbnRUeXBlKSkge1xuICAgICAgc2VyaWFsaXplID0gcmVxdWVzdC5zZXJpYWxpemVbJ2FwcGxpY2F0aW9uL2pzb24nXTtcbiAgICB9XG5cbiAgICBpZiAoc2VyaWFsaXplKSBkYXRhID0gc2VyaWFsaXplKGRhdGEpO1xuICB9XG5cbiAgLy8gc2V0IGhlYWRlciBmaWVsZHNcbiAgZm9yIChjb25zdCBmaWVsZCBpbiB0aGlzLmhlYWRlcikge1xuICAgIGlmICh0aGlzLmhlYWRlcltmaWVsZF0gPT09IG51bGwpIGNvbnRpbnVlO1xuXG4gICAgaWYgKGhhc093bih0aGlzLmhlYWRlciwgZmllbGQpKVxuICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoZmllbGQsIHRoaXMuaGVhZGVyW2ZpZWxkXSk7XG4gIH1cblxuICBpZiAodGhpcy5fcmVzcG9uc2VUeXBlKSB7XG4gICAgeGhyLnJlc3BvbnNlVHlwZSA9IHRoaXMuX3Jlc3BvbnNlVHlwZTtcbiAgfVxuXG4gIC8vIHNlbmQgc3R1ZmZcbiAgdGhpcy5lbWl0KCdyZXF1ZXN0JywgdGhpcyk7XG5cbiAgLy8gSUUxMSB4aHIuc2VuZCh1bmRlZmluZWQpIHNlbmRzICd1bmRlZmluZWQnIHN0cmluZyBhcyBQT1NUIHBheWxvYWQgKGluc3RlYWQgb2Ygbm90aGluZylcbiAgLy8gV2UgbmVlZCBudWxsIGhlcmUgaWYgZGF0YSBpcyB1bmRlZmluZWRcbiAgeGhyLnNlbmQodHlwZW9mIGRhdGEgPT09ICd1bmRlZmluZWQnID8gbnVsbCA6IGRhdGEpO1xufTtcblxucmVxdWVzdC5hZ2VudCA9ICgpID0+IG5ldyBBZ2VudCgpO1xuXG5mb3IgKGNvbnN0IG1ldGhvZCBvZiBbJ0dFVCcsICdQT1NUJywgJ09QVElPTlMnLCAnUEFUQ0gnLCAnUFVUJywgJ0RFTEVURSddKSB7XG4gIEFnZW50LnByb3RvdHlwZVttZXRob2QudG9Mb3dlckNhc2UoKV0gPSBmdW5jdGlvbiAodXJsLCBmbikge1xuICAgIGNvbnN0IHJlcXVlc3RfID0gbmV3IHJlcXVlc3QuUmVxdWVzdChtZXRob2QsIHVybCk7XG4gICAgdGhpcy5fc2V0RGVmYXVsdHMocmVxdWVzdF8pO1xuICAgIGlmIChmbikge1xuICAgICAgcmVxdWVzdF8uZW5kKGZuKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVxdWVzdF87XG4gIH07XG59XG5cbkFnZW50LnByb3RvdHlwZS5kZWwgPSBBZ2VudC5wcm90b3R5cGUuZGVsZXRlO1xuXG4vKipcbiAqIEdFVCBgdXJsYCB3aXRoIG9wdGlvbmFsIGNhbGxiYWNrIGBmbihyZXMpYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdXJsXG4gKiBAcGFyYW0ge01peGVkfEZ1bmN0aW9ufSBbZGF0YV0gb3IgZm5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtmbl1cbiAqIEByZXR1cm4ge1JlcXVlc3R9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbnJlcXVlc3QuZ2V0ID0gKHVybCwgZGF0YSwgZm4pID0+IHtcbiAgY29uc3QgcmVxdWVzdF8gPSByZXF1ZXN0KCdHRVQnLCB1cmwpO1xuICBpZiAodHlwZW9mIGRhdGEgPT09ICdmdW5jdGlvbicpIHtcbiAgICBmbiA9IGRhdGE7XG4gICAgZGF0YSA9IG51bGw7XG4gIH1cblxuICBpZiAoZGF0YSkgcmVxdWVzdF8ucXVlcnkoZGF0YSk7XG4gIGlmIChmbikgcmVxdWVzdF8uZW5kKGZuKTtcbiAgcmV0dXJuIHJlcXVlc3RfO1xufTtcblxuLyoqXG4gKiBIRUFEIGB1cmxgIHdpdGggb3B0aW9uYWwgY2FsbGJhY2sgYGZuKHJlcylgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB1cmxcbiAqIEBwYXJhbSB7TWl4ZWR8RnVuY3Rpb259IFtkYXRhXSBvciBmblxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2ZuXVxuICogQHJldHVybiB7UmVxdWVzdH1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxucmVxdWVzdC5oZWFkID0gKHVybCwgZGF0YSwgZm4pID0+IHtcbiAgY29uc3QgcmVxdWVzdF8gPSByZXF1ZXN0KCdIRUFEJywgdXJsKTtcbiAgaWYgKHR5cGVvZiBkYXRhID09PSAnZnVuY3Rpb24nKSB7XG4gICAgZm4gPSBkYXRhO1xuICAgIGRhdGEgPSBudWxsO1xuICB9XG5cbiAgaWYgKGRhdGEpIHJlcXVlc3RfLnF1ZXJ5KGRhdGEpO1xuICBpZiAoZm4pIHJlcXVlc3RfLmVuZChmbik7XG4gIHJldHVybiByZXF1ZXN0Xztcbn07XG5cbi8qKlxuICogT1BUSU9OUyBxdWVyeSB0byBgdXJsYCB3aXRoIG9wdGlvbmFsIGNhbGxiYWNrIGBmbihyZXMpYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdXJsXG4gKiBAcGFyYW0ge01peGVkfEZ1bmN0aW9ufSBbZGF0YV0gb3IgZm5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtmbl1cbiAqIEByZXR1cm4ge1JlcXVlc3R9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbnJlcXVlc3Qub3B0aW9ucyA9ICh1cmwsIGRhdGEsIGZuKSA9PiB7XG4gIGNvbnN0IHJlcXVlc3RfID0gcmVxdWVzdCgnT1BUSU9OUycsIHVybCk7XG4gIGlmICh0eXBlb2YgZGF0YSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGZuID0gZGF0YTtcbiAgICBkYXRhID0gbnVsbDtcbiAgfVxuXG4gIGlmIChkYXRhKSByZXF1ZXN0Xy5zZW5kKGRhdGEpO1xuICBpZiAoZm4pIHJlcXVlc3RfLmVuZChmbik7XG4gIHJldHVybiByZXF1ZXN0Xztcbn07XG5cbi8qKlxuICogREVMRVRFIGB1cmxgIHdpdGggb3B0aW9uYWwgYGRhdGFgIGFuZCBjYWxsYmFjayBgZm4ocmVzKWAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHVybFxuICogQHBhcmFtIHtNaXhlZH0gW2RhdGFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbZm5dXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBkZWwodXJsLCBkYXRhLCBmbikge1xuICBjb25zdCByZXF1ZXN0XyA9IHJlcXVlc3QoJ0RFTEVURScsIHVybCk7XG4gIGlmICh0eXBlb2YgZGF0YSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGZuID0gZGF0YTtcbiAgICBkYXRhID0gbnVsbDtcbiAgfVxuXG4gIGlmIChkYXRhKSByZXF1ZXN0Xy5zZW5kKGRhdGEpO1xuICBpZiAoZm4pIHJlcXVlc3RfLmVuZChmbik7XG4gIHJldHVybiByZXF1ZXN0Xztcbn1cblxucmVxdWVzdC5kZWwgPSBkZWw7XG5yZXF1ZXN0LmRlbGV0ZSA9IGRlbDtcblxuLyoqXG4gKiBQQVRDSCBgdXJsYCB3aXRoIG9wdGlvbmFsIGBkYXRhYCBhbmQgY2FsbGJhY2sgYGZuKHJlcylgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB1cmxcbiAqIEBwYXJhbSB7TWl4ZWR9IFtkYXRhXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2ZuXVxuICogQHJldHVybiB7UmVxdWVzdH1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxucmVxdWVzdC5wYXRjaCA9ICh1cmwsIGRhdGEsIGZuKSA9PiB7XG4gIGNvbnN0IHJlcXVlc3RfID0gcmVxdWVzdCgnUEFUQ0gnLCB1cmwpO1xuICBpZiAodHlwZW9mIGRhdGEgPT09ICdmdW5jdGlvbicpIHtcbiAgICBmbiA9IGRhdGE7XG4gICAgZGF0YSA9IG51bGw7XG4gIH1cblxuICBpZiAoZGF0YSkgcmVxdWVzdF8uc2VuZChkYXRhKTtcbiAgaWYgKGZuKSByZXF1ZXN0Xy5lbmQoZm4pO1xuICByZXR1cm4gcmVxdWVzdF87XG59O1xuXG4vKipcbiAqIFBPU1QgYHVybGAgd2l0aCBvcHRpb25hbCBgZGF0YWAgYW5kIGNhbGxiYWNrIGBmbihyZXMpYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdXJsXG4gKiBAcGFyYW0ge01peGVkfSBbZGF0YV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtmbl1cbiAqIEByZXR1cm4ge1JlcXVlc3R9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbnJlcXVlc3QucG9zdCA9ICh1cmwsIGRhdGEsIGZuKSA9PiB7XG4gIGNvbnN0IHJlcXVlc3RfID0gcmVxdWVzdCgnUE9TVCcsIHVybCk7XG4gIGlmICh0eXBlb2YgZGF0YSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGZuID0gZGF0YTtcbiAgICBkYXRhID0gbnVsbDtcbiAgfVxuXG4gIGlmIChkYXRhKSByZXF1ZXN0Xy5zZW5kKGRhdGEpO1xuICBpZiAoZm4pIHJlcXVlc3RfLmVuZChmbik7XG4gIHJldHVybiByZXF1ZXN0Xztcbn07XG5cbi8qKlxuICogUFVUIGB1cmxgIHdpdGggb3B0aW9uYWwgYGRhdGFgIGFuZCBjYWxsYmFjayBgZm4ocmVzKWAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHVybFxuICogQHBhcmFtIHtNaXhlZHxGdW5jdGlvbn0gW2RhdGFdIG9yIGZuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbZm5dXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5yZXF1ZXN0LnB1dCA9ICh1cmwsIGRhdGEsIGZuKSA9PiB7XG4gIGNvbnN0IHJlcXVlc3RfID0gcmVxdWVzdCgnUFVUJywgdXJsKTtcbiAgaWYgKHR5cGVvZiBkYXRhID09PSAnZnVuY3Rpb24nKSB7XG4gICAgZm4gPSBkYXRhO1xuICAgIGRhdGEgPSBudWxsO1xuICB9XG5cbiAgaWYgKGRhdGEpIHJlcXVlc3RfLnNlbmQoZGF0YSk7XG4gIGlmIChmbikgcmVxdWVzdF8uZW5kKGZuKTtcbiAgcmV0dXJuIHJlcXVlc3RfO1xufTtcbiJdfQ==