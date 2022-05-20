"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

/**
 * Module dependencies.
 */
// eslint-disable-next-line node/no-deprecated-api
var _require = require('url'),
    parse = _require.parse,
    format = _require.format,
    resolve = _require.resolve;

var Stream = require('stream');

var https = require('https');

var http = require('http');

var fs = require('fs');

var zlib = require('zlib');

var util = require('util');

var qs = require('qs');

var mime = require('mime');

var methods = require('methods');

var FormData = require('form-data');

var formidable = require('formidable');

var debug = require('debug')('superagent');

var CookieJar = require('cookiejar');

var semverGte = require('semver/functions/gte');

var safeStringify = require('fast-safe-stringify');

var utils = require('../utils');

var RequestBase = require('../request-base');

var _require2 = require('./unzip'),
    unzip = _require2.unzip;

var Response = require('./response');

var mixin = utils.mixin,
    hasOwn = utils.hasOwn;
var http2;
if (semverGte(process.version, 'v10.10.0')) http2 = require('./http2wrapper');

function request(method, url) {
  // callback
  if (typeof url === 'function') {
    return new exports.Request('GET', method).end(url);
  } // url first


  if (arguments.length === 1) {
    return new exports.Request('GET', method);
  }

  return new exports.Request(method, url);
}

module.exports = request;
exports = module.exports;
/**
 * Expose `Request`.
 */

exports.Request = Request;
/**
 * Expose the agent function
 */

exports.agent = require('./agent');
/**
 * Noop.
 */

function noop() {}
/**
 * Expose `Response`.
 */


exports.Response = Response;
/**
 * Define "form" mime type.
 */

mime.define({
  'application/x-www-form-urlencoded': ['form', 'urlencoded', 'form-data']
}, true);
/**
 * Protocol map.
 */

exports.protocols = {
  'http:': http,
  'https:': https,
  'http2:': http2
};
/**
 * Default serialization map.
 *
 *     superagent.serialize['application/xml'] = function(obj){
 *       return 'generated xml here';
 *     };
 *
 */

exports.serialize = {
  'application/x-www-form-urlencoded': qs.stringify,
  'application/json': safeStringify
};
/**
 * Default parsers.
 *
 *     superagent.parse['application/xml'] = function(res, fn){
 *       fn(null, res);
 *     };
 *
 */

exports.parse = require('./parsers');
/**
 * Default buffering map. Can be used to set certain
 * response types to buffer/not buffer.
 *
 *     superagent.buffer['application/xml'] = true;
 */

exports.buffer = {};
/**
 * Initialize internal header tracking properties on a request instance.
 *
 * @param {Object} req the instance
 * @api private
 */

function _initHeaders(request_) {
  request_._header = {// coerces header names to lowercase
  };
  request_.header = {// preserves header name case
  };
}
/**
 * Initialize a new `Request` with the given `method` and `url`.
 *
 * @param {String} method
 * @param {String|Object} url
 * @api public
 */


function Request(method, url) {
  Stream.call(this);
  if (typeof url !== 'string') url = format(url);
  this._enableHttp2 = Boolean(process.env.HTTP2_TEST); // internal only

  this._agent = false;
  this._formData = null;
  this.method = method;
  this.url = url;

  _initHeaders(this);

  this.writable = true;
  this._redirects = 0;
  this.redirects(method === 'HEAD' ? 0 : 5);
  this.cookies = '';
  this.qs = {};
  this._query = [];
  this.qsRaw = this._query; // Unused, for backwards compatibility only

  this._redirectList = [];
  this._streamRequest = false;
  this._lookup = undefined;
  this.once('end', this.clearTimeout.bind(this));
}
/**
 * Inherit from `Stream` (which inherits from `EventEmitter`).
 * Mixin `RequestBase`.
 */


util.inherits(Request, Stream);
mixin(Request.prototype, RequestBase.prototype);
/**
 * Enable or Disable http2.
 *
 * Enable http2.
 *
 * ``` js
 * request.get('http://localhost/')
 *   .http2()
 *   .end(callback);
 *
 * request.get('http://localhost/')
 *   .http2(true)
 *   .end(callback);
 * ```
 *
 * Disable http2.
 *
 * ``` js
 * request = request.http2();
 * request.get('http://localhost/')
 *   .http2(false)
 *   .end(callback);
 * ```
 *
 * @param {Boolean} enable
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.http2 = function (bool) {
  if (exports.protocols['http2:'] === undefined) {
    throw new Error('superagent: this version of Node.js does not support http2');
  }

  this._enableHttp2 = bool === undefined ? true : bool;
  return this;
};
/**
 * Queue the given `file` as an attachment to the specified `field`,
 * with optional `options` (or filename).
 *
 * ``` js
 * request.post('http://localhost/upload')
 *   .attach('field', Buffer.from('<b>Hello world</b>'), 'hello.html')
 *   .end(callback);
 * ```
 *
 * A filename may also be used:
 *
 * ``` js
 * request.post('http://localhost/upload')
 *   .attach('files', 'image.jpg')
 *   .end(callback);
 * ```
 *
 * @param {String} field
 * @param {String|fs.ReadStream|Buffer} file
 * @param {String|Object} options
 * @return {Request} for chaining
 * @api public
 */


Request.prototype.attach = function (field, file, options) {
  var _this = this;

  if (file) {
    if (this._data) {
      throw new Error("superagent can't mix .send() and .attach()");
    }

    var o = options || {};

    if (typeof options === 'string') {
      o = {
        filename: options
      };
    }

    if (typeof file === 'string') {
      if (!o.filename) o.filename = file;
      debug('creating `fs.ReadStream` instance for file: %s', file);
      file = fs.createReadStream(file);
      file.on('error', function (error) {
        var formData = _this._getFormData();

        formData.emit('error', error);
      });
    } else if (!o.filename && file.path) {
      o.filename = file.path;
    }

    this._getFormData().append(field, file, o);
  }

  return this;
};

Request.prototype._getFormData = function () {
  var _this2 = this;

  if (!this._formData) {
    this._formData = new FormData();

    this._formData.on('error', function (error) {
      debug('FormData error', error);

      if (_this2.called) {
        // The request has already finished and the callback was called.
        // Silently ignore the error.
        return;
      }

      _this2.callback(error);

      _this2.abort();
    });
  }

  return this._formData;
};
/**
 * Gets/sets the `Agent` to use for this HTTP request. The default (if this
 * function is not called) is to opt out of connection pooling (`agent: false`).
 *
 * @param {http.Agent} agent
 * @return {http.Agent}
 * @api public
 */


Request.prototype.agent = function (agent) {
  if (arguments.length === 0) return this._agent;
  this._agent = agent;
  return this;
};
/**
 * Gets/sets the `lookup` function to use custom DNS resolver.
 *
 * @param {Function} lookup
 * @return {Function}
 * @api public
 */


Request.prototype.lookup = function (lookup) {
  if (arguments.length === 0) return this._lookup;
  this._lookup = lookup;
  return this;
};
/**
 * Set _Content-Type_ response header passed through `mime.getType()`.
 *
 * Examples:
 *
 *      request.post('/')
 *        .type('xml')
 *        .send(xmlstring)
 *        .end(callback);
 *
 *      request.post('/')
 *        .type('json')
 *        .send(jsonstring)
 *        .end(callback);
 *
 *      request.post('/')
 *        .type('application/json')
 *        .send(jsonstring)
 *        .end(callback);
 *
 * @param {String} type
 * @return {Request} for chaining
 * @api public
 */


Request.prototype.type = function (type) {
  return this.set('Content-Type', type.includes('/') ? type : mime.getType(type));
};
/**
 * Set _Accept_ response header passed through `mime.getType()`.
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
  return this.set('Accept', type.includes('/') ? type : mime.getType(type));
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
  if (typeof value === 'string') {
    this._query.push(value);
  } else {
    Object.assign(this.qs, value);
  }

  return this;
};
/**
 * Write raw `data` / `encoding` to the socket.
 *
 * @param {Buffer|String} data
 * @param {String} encoding
 * @return {Boolean}
 * @api public
 */


Request.prototype.write = function (data, encoding) {
  var request_ = this.request();

  if (!this._streamRequest) {
    this._streamRequest = true;
  }

  return request_.write(data, encoding);
};
/**
 * Pipe the request body to `stream`.
 *
 * @param {Stream} stream
 * @param {Object} options
 * @return {Stream}
 * @api public
 */


Request.prototype.pipe = function (stream, options) {
  this.piped = true; // HACK...

  this.buffer(false);
  this.end();
  return this._pipeContinue(stream, options);
};

Request.prototype._pipeContinue = function (stream, options) {
  var _this3 = this;

  this.req.once('response', function (res) {
    // redirect
    if (isRedirect(res.statusCode) && _this3._redirects++ !== _this3._maxRedirects) {
      return _this3._redirect(res) === _this3 ? _this3._pipeContinue(stream, options) : undefined;
    }

    _this3.res = res;

    _this3._emitResponse();

    if (_this3._aborted) return;

    if (_this3._shouldUnzip(res)) {
      var unzipObject = zlib.createUnzip();
      unzipObject.on('error', function (error) {
        if (error && error.code === 'Z_BUF_ERROR') {
          // unexpected end of file is ignored by browsers and curl
          stream.emit('end');
          return;
        }

        stream.emit('error', error);
      });
      res.pipe(unzipObject).pipe(stream, options);
    } else {
      res.pipe(stream, options);
    }

    res.once('end', function () {
      _this3.emit('end');
    });
  });
  return stream;
};
/**
 * Enable / disable buffering.
 *
 * @return {Boolean} [val]
 * @return {Request} for chaining
 * @api public
 */


Request.prototype.buffer = function (value) {
  this._buffer = value !== false;
  return this;
};
/**
 * Redirect to `url
 *
 * @param {IncomingMessage} res
 * @return {Request} for chaining
 * @api private
 */


Request.prototype._redirect = function (res) {
  var url = res.headers.location;

  if (!url) {
    return this.callback(new Error('No location header for redirect'), res);
  }

  debug('redirect %s -> %s', this.url, url); // location

  url = resolve(this.url, url); // ensure the response is being consumed
  // this is required for Node v0.10+

  res.resume();
  var headers = this.req.getHeaders ? this.req.getHeaders() : this.req._headers;
  var changesOrigin = parse(url).host !== parse(this.url).host; // implementation of 302 following defacto standard

  if (res.statusCode === 301 || res.statusCode === 302) {
    // strip Content-* related fields
    // in case of POST etc
    headers = utils.cleanHeader(headers, changesOrigin); // force GET

    this.method = this.method === 'HEAD' ? 'HEAD' : 'GET'; // clear data

    this._data = null;
  } // 303 is always GET


  if (res.statusCode === 303) {
    // strip Content-* related fields
    // in case of POST etc
    headers = utils.cleanHeader(headers, changesOrigin); // force method

    this.method = 'GET'; // clear data

    this._data = null;
  } // 307 preserves method
  // 308 preserves method


  delete headers.host;
  delete this.req;
  delete this._formData; // remove all add header except User-Agent

  _initHeaders(this); // redirect


  this._endCalled = false;
  this.url = url;
  this.qs = {};
  this._query.length = 0;
  this.set(headers);
  this.emit('redirect', res);

  this._redirectList.push(this.url);

  this.end(this._callback);
  return this;
};
/**
 * Set Authorization field value with `user` and `pass`.
 *
 * Examples:
 *
 *   .auth('tobi', 'learnboost')
 *   .auth('tobi:learnboost')
 *   .auth('tobi')
 *   .auth(accessToken, { type: 'bearer' })
 *
 * @param {String} user
 * @param {String} [pass]
 * @param {Object} [options] options with authorization type 'basic' or 'bearer' ('basic' is default)
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
      type: 'basic'
    };
  }

  var encoder = function encoder(string) {
    return Buffer.from(string).toString('base64');
  };

  return this._auth(user, pass, options, encoder);
};
/**
 * Set the certificate authority option for https request.
 *
 * @param {Buffer | Array} cert
 * @return {Request} for chaining
 * @api public
 */


Request.prototype.ca = function (cert) {
  this._ca = cert;
  return this;
};
/**
 * Set the client certificate key option for https request.
 *
 * @param {Buffer | String} cert
 * @return {Request} for chaining
 * @api public
 */


Request.prototype.key = function (cert) {
  this._key = cert;
  return this;
};
/**
 * Set the key, certificate, and CA certs of the client in PFX or PKCS12 format.
 *
 * @param {Buffer | String} cert
 * @return {Request} for chaining
 * @api public
 */


Request.prototype.pfx = function (cert) {
  if (_typeof(cert) === 'object' && !Buffer.isBuffer(cert)) {
    this._pfx = cert.pfx;
    this._passphrase = cert.passphrase;
  } else {
    this._pfx = cert;
  }

  return this;
};
/**
 * Set the client certificate option for https request.
 *
 * @param {Buffer | String} cert
 * @return {Request} for chaining
 * @api public
 */


Request.prototype.cert = function (cert) {
  this._cert = cert;
  return this;
};
/**
 * Do not reject expired or invalid TLS certs.
 * sets `rejectUnauthorized=true`. Be warned that this allows MITM attacks.
 *
 * @return {Request} for chaining
 * @api public
 */


Request.prototype.disableTLSCerts = function () {
  this._disableTLSCerts = true;
  return this;
};
/**
 * Return an http[s] request.
 *
 * @return {OutgoingMessage}
 * @api private
 */
// eslint-disable-next-line complexity


Request.prototype.request = function () {
  var _this4 = this;

  if (this.req) return this.req;
  var options = {};

  try {
    var query = qs.stringify(this.qs, {
      indices: false,
      strictNullHandling: true
    });

    if (query) {
      this.qs = {};

      this._query.push(query);
    }

    this._finalizeQueryString();
  } catch (err) {
    return this.emit('error', err);
  }

  var url = this.url;
  var retries = this._retries; // Capture backticks as-is from the final query string built above.
  // Note: this'll only find backticks entered in req.query(String)
  // calls, because qs.stringify unconditionally encodes backticks.

  var queryStringBackticks;

  if (url.includes('`')) {
    var queryStartIndex = url.indexOf('?');

    if (queryStartIndex !== -1) {
      var queryString = url.slice(queryStartIndex + 1);
      queryStringBackticks = queryString.match(/`|%60/g);
    }
  } // default to http://


  if (url.indexOf('http') !== 0) url = "http://".concat(url);
  url = parse(url); // See https://github.com/visionmedia/superagent/issues/1367

  if (queryStringBackticks) {
    var i = 0;
    url.query = url.query.replace(/%60/g, function () {
      return queryStringBackticks[i++];
    });
    url.search = "?".concat(url.query);
    url.path = url.pathname + url.search;
  } // support unix sockets


  if (/^https?\+unix:/.test(url.protocol) === true) {
    // get the protocol
    url.protocol = "".concat(url.protocol.split('+')[0], ":"); // get the socket, path

    var unixParts = url.path.match(/^([^/]+)(.+)$/);
    options.socketPath = unixParts[1].replace(/%2F/g, '/');
    url.path = unixParts[2];
  } // Override IP address of a hostname


  if (this._connectOverride) {
    var _url = url,
        hostname = _url.hostname;
    var match = hostname in this._connectOverride ? this._connectOverride[hostname] : this._connectOverride['*'];

    if (match) {
      // backup the real host
      if (!this._header.host) {
        this.set('host', url.host);
      }

      var newHost;
      var newPort;

      if (_typeof(match) === 'object') {
        newHost = match.host;
        newPort = match.port;
      } else {
        newHost = match;
        newPort = url.port;
      } // wrap [ipv6]


      url.host = /:/.test(newHost) ? "[".concat(newHost, "]") : newHost;

      if (newPort) {
        url.host += ":".concat(newPort);
        url.port = newPort;
      }

      url.hostname = newHost;
    }
  } // options


  options.method = this.method;
  options.port = url.port;
  options.path = url.path;
  options.host = url.hostname;
  options.ca = this._ca;
  options.key = this._key;
  options.pfx = this._pfx;
  options.cert = this._cert;
  options.passphrase = this._passphrase;
  options.agent = this._agent;
  options.lookup = this._lookup;
  options.rejectUnauthorized = typeof this._disableTLSCerts === 'boolean' ? !this._disableTLSCerts : process.env.NODE_TLS_REJECT_UNAUTHORIZED !== '0'; // Allows request.get('https://1.2.3.4/').set('Host', 'example.com')

  if (this._header.host) {
    options.servername = this._header.host.replace(/:\d+$/, '');
  }

  if (this._trustLocalhost && /^(?:localhost|127\.0\.0\.\d+|(0*:)+:0*1)$/.test(url.hostname)) {
    options.rejectUnauthorized = false;
  } // initiate request


  var module_ = this._enableHttp2 ? exports.protocols['http2:'].setProtocol(url.protocol) : exports.protocols[url.protocol]; // request

  this.req = module_.request(options);
  var req = this.req; // set tcp no delay

  req.setNoDelay(true);

  if (options.method !== 'HEAD') {
    req.setHeader('Accept-Encoding', 'gzip, deflate');
  }

  this.protocol = url.protocol;
  this.host = url.host; // expose events

  req.once('drain', function () {
    _this4.emit('drain');
  });
  req.on('error', function (error) {
    // flag abortion here for out timeouts
    // because node will emit a faux-error "socket hang up"
    // when request is aborted before a connection is made
    if (_this4._aborted) return; // if not the same, we are in the **old** (cancelled) request,
    // so need to continue (same as for above)

    if (_this4._retries !== retries) return; // if we've received a response then we don't want to let
    // an error in the request blow up the response

    if (_this4.response) return;

    _this4.callback(error);
  }); // auth

  if (url.auth) {
    var auth = url.auth.split(':');
    this.auth(auth[0], auth[1]);
  }

  if (this.username && this.password) {
    this.auth(this.username, this.password);
  }

  for (var key in this.header) {
    if (hasOwn(this.header, key)) req.setHeader(key, this.header[key]);
  } // add cookies


  if (this.cookies) {
    if (hasOwn(this._header, 'cookie')) {
      // merge
      var temporaryJar = new CookieJar.CookieJar();
      temporaryJar.setCookies(this._header.cookie.split(';'));
      temporaryJar.setCookies(this.cookies.split(';'));
      req.setHeader('Cookie', temporaryJar.getCookies(CookieJar.CookieAccessInfo.All).toValueString());
    } else {
      req.setHeader('Cookie', this.cookies);
    }
  }

  return req;
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
  } // Avoid the error which is emitted from 'socket hang up' to cause the fn undefined error on JS runtime.


  var fn = this._callback || noop;
  this.clearTimeout();
  if (this.called) return console.warn('superagent: double callback bug');
  this.called = true;

  if (!error) {
    try {
      if (!this._isResponseOK(res)) {
        var message = 'Unsuccessful HTTP response';

        if (res) {
          message = http.STATUS_CODES[res.status] || message;
        }

        error = new Error(message);
        error.status = res ? res.status : undefined;
      }
    } catch (err) {
      error = err;
    }
  } // It's important that the callback is called outside try/catch
  // to avoid double callback


  if (!error) {
    return fn(null, res);
  }

  error.response = res;
  if (this._maxRetries) error.retries = this._retries - 1; // only emit error event if there is a listener
  // otherwise we assume the callback to `.end()` will get the error

  if (error && this.listeners('error').length > 0) {
    this.emit('error', error);
  }

  fn(error, res);
};
/**
 * Check if `obj` is a host object,
 *
 * @param {Object} obj host object
 * @return {Boolean} is a host object
 * @api private
 */


Request.prototype._isHost = function (object) {
  return Buffer.isBuffer(object) || object instanceof Stream || object instanceof FormData;
};
/**
 * Initiate request, invoking callback `fn(err, res)`
 * with an instanceof `Response`.
 *
 * @param {Function} fn
 * @return {Request} for chaining
 * @api public
 */


Request.prototype._emitResponse = function (body, files) {
  var response = new Response(this);
  this.response = response;
  response.redirects = this._redirectList;

  if (undefined !== body) {
    response.body = body;
  }

  response.files = files;

  if (this._endCalled) {
    response.pipe = function () {
      throw new Error("end() has already been called, so it's too late to start piping");
    };
  }

  this.emit('response', response);
  return response;
};

Request.prototype.end = function (fn) {
  this.request();
  debug('%s %s', this.method, this.url);

  if (this._endCalled) {
    throw new Error('.end() was called twice. This is not supported in superagent');
  }

  this._endCalled = true; // store callback

  this._callback = fn || noop;

  this._end();
};

Request.prototype._end = function () {
  var _this5 = this;

  if (this._aborted) return this.callback(new Error('The request has been aborted even before .end() was called'));
  var data = this._data;
  var req = this.req;
  var method = this.method;

  this._setTimeouts(); // body


  if (method !== 'HEAD' && !req._headerSent) {
    // serialize stuff
    if (typeof data !== 'string') {
      var contentType = req.getHeader('Content-Type'); // Parse out just the content type from the header (ignore the charset)

      if (contentType) contentType = contentType.split(';')[0];
      var serialize = this._serializer || exports.serialize[contentType];

      if (!serialize && isJSON(contentType)) {
        serialize = exports.serialize['application/json'];
      }

      if (serialize) data = serialize(data);
    } // content-length


    if (data && !req.getHeader('Content-Length')) {
      req.setHeader('Content-Length', Buffer.isBuffer(data) ? data.length : Buffer.byteLength(data));
    }
  } // response
  // eslint-disable-next-line complexity


  req.once('response', function (res) {
    debug('%s %s -> %s', _this5.method, _this5.url, res.statusCode);

    if (_this5._responseTimeoutTimer) {
      clearTimeout(_this5._responseTimeoutTimer);
    }

    if (_this5.piped) {
      return;
    }

    var max = _this5._maxRedirects;
    var mime = utils.type(res.headers['content-type'] || '') || 'text/plain';
    var type = mime.split('/')[0];
    if (type) type = type.toLowerCase().trim();
    var multipart = type === 'multipart';
    var redirect = isRedirect(res.statusCode);
    var responseType = _this5._responseType;
    _this5.res = res; // redirect

    if (redirect && _this5._redirects++ !== max) {
      return _this5._redirect(res);
    }

    if (_this5.method === 'HEAD') {
      _this5.emit('end');

      _this5.callback(null, _this5._emitResponse());

      return;
    } // zlib support


    if (_this5._shouldUnzip(res)) {
      unzip(req, res);
    }

    var buffer = _this5._buffer;

    if (buffer === undefined && mime in exports.buffer) {
      buffer = Boolean(exports.buffer[mime]);
    }

    var parser = _this5._parser;

    if (undefined === buffer && parser) {
      console.warn("A custom superagent parser has been set, but buffering strategy for the parser hasn't been configured. Call `req.buffer(true or false)` or set `superagent.buffer[mime] = true or false`");
      buffer = true;
    }

    if (!parser) {
      if (responseType) {
        parser = exports.parse.image; // It's actually a generic Buffer

        buffer = true;
      } else if (multipart) {
        var form = formidable();
        parser = form.parse.bind(form);
        buffer = true;
      } else if (isImageOrVideo(mime)) {
        parser = exports.parse.image;
        buffer = true; // For backwards-compatibility buffering default is ad-hoc MIME-dependent
      } else if (exports.parse[mime]) {
        parser = exports.parse[mime];
      } else if (type === 'text') {
        parser = exports.parse.text;
        buffer = buffer !== false; // everyone wants their own white-labeled json
      } else if (isJSON(mime)) {
        parser = exports.parse['application/json'];
        buffer = buffer !== false;
      } else if (buffer) {
        parser = exports.parse.text;
      } else if (undefined === buffer) {
        parser = exports.parse.image; // It's actually a generic Buffer

        buffer = true;
      }
    } // by default only buffer text/*, json and messed up thing from hell


    if (undefined === buffer && isText(mime) || isJSON(mime)) {
      buffer = true;
    }

    _this5._resBuffered = buffer;
    var parserHandlesEnd = false;

    if (buffer) {
      // Protectiona against zip bombs and other nuisance
      var responseBytesLeft = _this5._maxResponseSize || 200000000;
      res.on('data', function (buf) {
        responseBytesLeft -= buf.byteLength || buf.length > 0 ? buf.length : 0;

        if (responseBytesLeft < 0) {
          // This will propagate through error event
          var error = new Error('Maximum response size reached');
          error.code = 'ETOOLARGE'; // Parsers aren't required to observe error event,
          // so would incorrectly report success

          parserHandlesEnd = false; // Will not emit error event

          res.destroy(error); // so we do callback now

          _this5.callback(error, null);
        }
      });
    }

    if (parser) {
      try {
        // Unbuffered parsers are supposed to emit response early,
        // which is weird BTW, because response.body won't be there.
        parserHandlesEnd = buffer;
        parser(res, function (error, object, files) {
          if (_this5.timedout) {
            // Timeout has already handled all callbacks
            return;
          } // Intentional (non-timeout) abort is supposed to preserve partial response,
          // even if it doesn't parse.


          if (error && !_this5._aborted) {
            return _this5.callback(error);
          }

          if (parserHandlesEnd) {
            _this5.emit('end');

            _this5.callback(null, _this5._emitResponse(object, files));
          }
        });
      } catch (err) {
        _this5.callback(err);

        return;
      }
    }

    _this5.res = res; // unbuffered

    if (!buffer) {
      debug('unbuffered %s %s', _this5.method, _this5.url);

      _this5.callback(null, _this5._emitResponse());

      if (multipart) return; // allow multipart to handle end event

      res.once('end', function () {
        debug('end %s %s', _this5.method, _this5.url);

        _this5.emit('end');
      });
      return;
    } // terminating events


    res.once('error', function (error) {
      parserHandlesEnd = false;

      _this5.callback(error, null);
    });
    if (!parserHandlesEnd) res.once('end', function () {
      debug('end %s %s', _this5.method, _this5.url); // TODO: unless buffering emit earlier to stream

      _this5.emit('end');

      _this5.callback(null, _this5._emitResponse());
    });
  });
  this.emit('request', this);

  var getProgressMonitor = function getProgressMonitor() {
    var lengthComputable = true;
    var total = req.getHeader('Content-Length');
    var loaded = 0;
    var progress = new Stream.Transform();

    progress._transform = function (chunk, encoding, callback) {
      loaded += chunk.length;

      _this5.emit('progress', {
        direction: 'upload',
        lengthComputable: lengthComputable,
        loaded: loaded,
        total: total
      });

      callback(null, chunk);
    };

    return progress;
  };

  var bufferToChunks = function bufferToChunks(buffer) {
    var chunkSize = 16 * 1024; // default highWaterMark value

    var chunking = new Stream.Readable();
    var totalLength = buffer.length;
    var remainder = totalLength % chunkSize;
    var cutoff = totalLength - remainder;

    for (var i = 0; i < cutoff; i += chunkSize) {
      var chunk = buffer.slice(i, i + chunkSize);
      chunking.push(chunk);
    }

    if (remainder > 0) {
      var remainderBuffer = buffer.slice(-remainder);
      chunking.push(remainderBuffer);
    }

    chunking.push(null); // no more data

    return chunking;
  }; // if a FormData instance got created, then we send that as the request body


  var formData = this._formData;

  if (formData) {
    // set headers
    var headers = formData.getHeaders();

    for (var i in headers) {
      if (hasOwn(headers, i)) {
        debug('setting FormData header: "%s: %s"', i, headers[i]);
        req.setHeader(i, headers[i]);
      }
    } // attempt to get "Content-Length" header


    formData.getLength(function (error, length) {
      // TODO: Add chunked encoding when no length (if err)
      if (error) debug('formData.getLength had error', error, length);
      debug('got FormData Content-Length: %s', length);

      if (typeof length === 'number') {
        req.setHeader('Content-Length', length);
      }

      formData.pipe(getProgressMonitor()).pipe(req);
    });
  } else if (Buffer.isBuffer(data)) {
    bufferToChunks(data).pipe(getProgressMonitor()).pipe(req);
  } else {
    req.end(data);
  }
}; // Check whether response has a non-0-sized gzip-encoded body


Request.prototype._shouldUnzip = function (res) {
  if (res.statusCode === 204 || res.statusCode === 304) {
    // These aren't supposed to have any body
    return false;
  } // header content is a string, and distinction between 0 and no information is crucial


  if (res.headers['content-length'] === '0') {
    // We know that the body is empty (unfortunately, this check does not cover chunked encoding)
    return false;
  } // console.log(res);


  return /^\s*(?:deflate|gzip)\s*$/.test(res.headers['content-encoding']);
};
/**
 * Overrides DNS for selected hostnames. Takes object mapping hostnames to IP addresses.
 *
 * When making a request to a URL with a hostname exactly matching a key in the object,
 * use the given IP address to connect, instead of using DNS to resolve the hostname.
 *
 * A special host `*` matches every hostname (keep redirects in mind!)
 *
 *      request.connect({
 *        'test.example.com': '127.0.0.1',
 *        'ipv6.example.com': '::1',
 *      })
 */


Request.prototype.connect = function (connectOverride) {
  if (typeof connectOverride === 'string') {
    this._connectOverride = {
      '*': connectOverride
    };
  } else if (_typeof(connectOverride) === 'object') {
    this._connectOverride = connectOverride;
  } else {
    this._connectOverride = undefined;
  }

  return this;
};

Request.prototype.trustLocalhost = function (toggle) {
  this._trustLocalhost = toggle === undefined ? true : toggle;
  return this;
}; // generate HTTP verb methods


if (!methods.includes('del')) {
  // create a copy so we don't cause conflicts with
  // other packages using the methods package and
  // npm 3.x
  methods = _toConsumableArray(methods);
  methods.push('del');
}

var _iterator = _createForOfIteratorHelper(methods),
    _step;

try {
  var _loop = function _loop() {
    var method = _step.value;
    var name = method;
    method = method === 'del' ? 'delete' : method;
    method = method.toUpperCase();

    request[name] = function (url, data, fn) {
      var request_ = request(method, url);

      if (typeof data === 'function') {
        fn = data;
        data = null;
      }

      if (data) {
        if (method === 'GET' || method === 'HEAD') {
          request_.query(data);
        } else {
          request_.send(data);
        }
      }

      if (fn) request_.end(fn);
      return request_;
    };
  };

  for (_iterator.s(); !(_step = _iterator.n()).done;) {
    _loop();
  }
  /**
   * Check if `mime` is text and should be buffered.
   *
   * @param {String} mime
   * @return {Boolean}
   * @api public
   */

} catch (err) {
  _iterator.e(err);
} finally {
  _iterator.f();
}

function isText(mime) {
  var parts = mime.split('/');
  var type = parts[0];
  if (type) type = type.toLowerCase().trim();
  var subtype = parts[1];
  if (subtype) subtype = subtype.toLowerCase().trim();
  return type === 'text' || subtype === 'x-www-form-urlencoded';
}

function isImageOrVideo(mime) {
  var type = mime.split('/')[0];
  if (type) type = type.toLowerCase().trim();
  return type === 'image' || type === 'video';
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
 * Check if we should follow the redirect `code`.
 *
 * @param {Number} code
 * @return {Boolean}
 * @api private
 */


function isRedirect(code) {
  return [301, 302, 303, 305, 307, 308].includes(code);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ub2RlL2luZGV4LmpzIl0sIm5hbWVzIjpbInJlcXVpcmUiLCJwYXJzZSIsImZvcm1hdCIsInJlc29sdmUiLCJTdHJlYW0iLCJodHRwcyIsImh0dHAiLCJmcyIsInpsaWIiLCJ1dGlsIiwicXMiLCJtaW1lIiwibWV0aG9kcyIsIkZvcm1EYXRhIiwiZm9ybWlkYWJsZSIsImRlYnVnIiwiQ29va2llSmFyIiwic2VtdmVyR3RlIiwic2FmZVN0cmluZ2lmeSIsInV0aWxzIiwiUmVxdWVzdEJhc2UiLCJ1bnppcCIsIlJlc3BvbnNlIiwibWl4aW4iLCJoYXNPd24iLCJodHRwMiIsInByb2Nlc3MiLCJ2ZXJzaW9uIiwicmVxdWVzdCIsIm1ldGhvZCIsInVybCIsImV4cG9ydHMiLCJSZXF1ZXN0IiwiZW5kIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwibW9kdWxlIiwiYWdlbnQiLCJub29wIiwiZGVmaW5lIiwicHJvdG9jb2xzIiwic2VyaWFsaXplIiwic3RyaW5naWZ5IiwiYnVmZmVyIiwiX2luaXRIZWFkZXJzIiwicmVxdWVzdF8iLCJfaGVhZGVyIiwiaGVhZGVyIiwiY2FsbCIsIl9lbmFibGVIdHRwMiIsIkJvb2xlYW4iLCJlbnYiLCJIVFRQMl9URVNUIiwiX2FnZW50IiwiX2Zvcm1EYXRhIiwid3JpdGFibGUiLCJfcmVkaXJlY3RzIiwicmVkaXJlY3RzIiwiY29va2llcyIsIl9xdWVyeSIsInFzUmF3IiwiX3JlZGlyZWN0TGlzdCIsIl9zdHJlYW1SZXF1ZXN0IiwiX2xvb2t1cCIsInVuZGVmaW5lZCIsIm9uY2UiLCJjbGVhclRpbWVvdXQiLCJiaW5kIiwiaW5oZXJpdHMiLCJwcm90b3R5cGUiLCJib29sIiwiRXJyb3IiLCJhdHRhY2giLCJmaWVsZCIsImZpbGUiLCJvcHRpb25zIiwiX2RhdGEiLCJvIiwiZmlsZW5hbWUiLCJjcmVhdGVSZWFkU3RyZWFtIiwib24iLCJlcnJvciIsImZvcm1EYXRhIiwiX2dldEZvcm1EYXRhIiwiZW1pdCIsInBhdGgiLCJhcHBlbmQiLCJjYWxsZWQiLCJjYWxsYmFjayIsImFib3J0IiwibG9va3VwIiwidHlwZSIsInNldCIsImluY2x1ZGVzIiwiZ2V0VHlwZSIsImFjY2VwdCIsInF1ZXJ5IiwidmFsdWUiLCJwdXNoIiwiT2JqZWN0IiwiYXNzaWduIiwid3JpdGUiLCJkYXRhIiwiZW5jb2RpbmciLCJwaXBlIiwic3RyZWFtIiwicGlwZWQiLCJfcGlwZUNvbnRpbnVlIiwicmVxIiwicmVzIiwiaXNSZWRpcmVjdCIsInN0YXR1c0NvZGUiLCJfbWF4UmVkaXJlY3RzIiwiX3JlZGlyZWN0IiwiX2VtaXRSZXNwb25zZSIsIl9hYm9ydGVkIiwiX3Nob3VsZFVuemlwIiwidW56aXBPYmplY3QiLCJjcmVhdGVVbnppcCIsImNvZGUiLCJfYnVmZmVyIiwiaGVhZGVycyIsImxvY2F0aW9uIiwicmVzdW1lIiwiZ2V0SGVhZGVycyIsIl9oZWFkZXJzIiwiY2hhbmdlc09yaWdpbiIsImhvc3QiLCJjbGVhbkhlYWRlciIsIl9lbmRDYWxsZWQiLCJfY2FsbGJhY2siLCJhdXRoIiwidXNlciIsInBhc3MiLCJlbmNvZGVyIiwic3RyaW5nIiwiQnVmZmVyIiwiZnJvbSIsInRvU3RyaW5nIiwiX2F1dGgiLCJjYSIsImNlcnQiLCJfY2EiLCJrZXkiLCJfa2V5IiwicGZ4IiwiaXNCdWZmZXIiLCJfcGZ4IiwiX3Bhc3NwaHJhc2UiLCJwYXNzcGhyYXNlIiwiX2NlcnQiLCJkaXNhYmxlVExTQ2VydHMiLCJfZGlzYWJsZVRMU0NlcnRzIiwiaW5kaWNlcyIsInN0cmljdE51bGxIYW5kbGluZyIsIl9maW5hbGl6ZVF1ZXJ5U3RyaW5nIiwiZXJyIiwicmV0cmllcyIsIl9yZXRyaWVzIiwicXVlcnlTdHJpbmdCYWNrdGlja3MiLCJxdWVyeVN0YXJ0SW5kZXgiLCJpbmRleE9mIiwicXVlcnlTdHJpbmciLCJzbGljZSIsIm1hdGNoIiwiaSIsInJlcGxhY2UiLCJzZWFyY2giLCJwYXRobmFtZSIsInRlc3QiLCJwcm90b2NvbCIsInNwbGl0IiwidW5peFBhcnRzIiwic29ja2V0UGF0aCIsIl9jb25uZWN0T3ZlcnJpZGUiLCJob3N0bmFtZSIsIm5ld0hvc3QiLCJuZXdQb3J0IiwicG9ydCIsInJlamVjdFVuYXV0aG9yaXplZCIsIk5PREVfVExTX1JFSkVDVF9VTkFVVEhPUklaRUQiLCJzZXJ2ZXJuYW1lIiwiX3RydXN0TG9jYWxob3N0IiwibW9kdWxlXyIsInNldFByb3RvY29sIiwic2V0Tm9EZWxheSIsInNldEhlYWRlciIsInJlc3BvbnNlIiwidXNlcm5hbWUiLCJwYXNzd29yZCIsInRlbXBvcmFyeUphciIsInNldENvb2tpZXMiLCJjb29raWUiLCJnZXRDb29raWVzIiwiQ29va2llQWNjZXNzSW5mbyIsIkFsbCIsInRvVmFsdWVTdHJpbmciLCJfc2hvdWxkUmV0cnkiLCJfcmV0cnkiLCJmbiIsImNvbnNvbGUiLCJ3YXJuIiwiX2lzUmVzcG9uc2VPSyIsIm1lc3NhZ2UiLCJTVEFUVVNfQ09ERVMiLCJzdGF0dXMiLCJfbWF4UmV0cmllcyIsImxpc3RlbmVycyIsIl9pc0hvc3QiLCJvYmplY3QiLCJib2R5IiwiZmlsZXMiLCJfZW5kIiwiX3NldFRpbWVvdXRzIiwiX2hlYWRlclNlbnQiLCJjb250ZW50VHlwZSIsImdldEhlYWRlciIsIl9zZXJpYWxpemVyIiwiaXNKU09OIiwiYnl0ZUxlbmd0aCIsIl9yZXNwb25zZVRpbWVvdXRUaW1lciIsIm1heCIsInRvTG93ZXJDYXNlIiwidHJpbSIsIm11bHRpcGFydCIsInJlZGlyZWN0IiwicmVzcG9uc2VUeXBlIiwiX3Jlc3BvbnNlVHlwZSIsInBhcnNlciIsIl9wYXJzZXIiLCJpbWFnZSIsImZvcm0iLCJpc0ltYWdlT3JWaWRlbyIsInRleHQiLCJpc1RleHQiLCJfcmVzQnVmZmVyZWQiLCJwYXJzZXJIYW5kbGVzRW5kIiwicmVzcG9uc2VCeXRlc0xlZnQiLCJfbWF4UmVzcG9uc2VTaXplIiwiYnVmIiwiZGVzdHJveSIsInRpbWVkb3V0IiwiZ2V0UHJvZ3Jlc3NNb25pdG9yIiwibGVuZ3RoQ29tcHV0YWJsZSIsInRvdGFsIiwibG9hZGVkIiwicHJvZ3Jlc3MiLCJUcmFuc2Zvcm0iLCJfdHJhbnNmb3JtIiwiY2h1bmsiLCJkaXJlY3Rpb24iLCJidWZmZXJUb0NodW5rcyIsImNodW5rU2l6ZSIsImNodW5raW5nIiwiUmVhZGFibGUiLCJ0b3RhbExlbmd0aCIsInJlbWFpbmRlciIsImN1dG9mZiIsInJlbWFpbmRlckJ1ZmZlciIsImdldExlbmd0aCIsImNvbm5lY3QiLCJjb25uZWN0T3ZlcnJpZGUiLCJ0cnVzdExvY2FsaG9zdCIsInRvZ2dsZSIsIm5hbWUiLCJ0b1VwcGVyQ2FzZSIsInNlbmQiLCJwYXJ0cyIsInN1YnR5cGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0EsZUFBbUNBLE9BQU8sQ0FBQyxLQUFELENBQTFDO0FBQUEsSUFBUUMsS0FBUixZQUFRQSxLQUFSO0FBQUEsSUFBZUMsTUFBZixZQUFlQSxNQUFmO0FBQUEsSUFBdUJDLE9BQXZCLFlBQXVCQSxPQUF2Qjs7QUFDQSxJQUFNQyxNQUFNLEdBQUdKLE9BQU8sQ0FBQyxRQUFELENBQXRCOztBQUNBLElBQU1LLEtBQUssR0FBR0wsT0FBTyxDQUFDLE9BQUQsQ0FBckI7O0FBQ0EsSUFBTU0sSUFBSSxHQUFHTixPQUFPLENBQUMsTUFBRCxDQUFwQjs7QUFDQSxJQUFNTyxFQUFFLEdBQUdQLE9BQU8sQ0FBQyxJQUFELENBQWxCOztBQUNBLElBQU1RLElBQUksR0FBR1IsT0FBTyxDQUFDLE1BQUQsQ0FBcEI7O0FBQ0EsSUFBTVMsSUFBSSxHQUFHVCxPQUFPLENBQUMsTUFBRCxDQUFwQjs7QUFDQSxJQUFNVSxFQUFFLEdBQUdWLE9BQU8sQ0FBQyxJQUFELENBQWxCOztBQUNBLElBQU1XLElBQUksR0FBR1gsT0FBTyxDQUFDLE1BQUQsQ0FBcEI7O0FBQ0EsSUFBSVksT0FBTyxHQUFHWixPQUFPLENBQUMsU0FBRCxDQUFyQjs7QUFDQSxJQUFNYSxRQUFRLEdBQUdiLE9BQU8sQ0FBQyxXQUFELENBQXhCOztBQUNBLElBQU1jLFVBQVUsR0FBR2QsT0FBTyxDQUFDLFlBQUQsQ0FBMUI7O0FBQ0EsSUFBTWUsS0FBSyxHQUFHZixPQUFPLENBQUMsT0FBRCxDQUFQLENBQWlCLFlBQWpCLENBQWQ7O0FBQ0EsSUFBTWdCLFNBQVMsR0FBR2hCLE9BQU8sQ0FBQyxXQUFELENBQXpCOztBQUNBLElBQU1pQixTQUFTLEdBQUdqQixPQUFPLENBQUMsc0JBQUQsQ0FBekI7O0FBQ0EsSUFBTWtCLGFBQWEsR0FBR2xCLE9BQU8sQ0FBQyxxQkFBRCxDQUE3Qjs7QUFFQSxJQUFNbUIsS0FBSyxHQUFHbkIsT0FBTyxDQUFDLFVBQUQsQ0FBckI7O0FBQ0EsSUFBTW9CLFdBQVcsR0FBR3BCLE9BQU8sQ0FBQyxpQkFBRCxDQUEzQjs7QUFDQSxnQkFBa0JBLE9BQU8sQ0FBQyxTQUFELENBQXpCO0FBQUEsSUFBUXFCLEtBQVIsYUFBUUEsS0FBUjs7QUFDQSxJQUFNQyxRQUFRLEdBQUd0QixPQUFPLENBQUMsWUFBRCxDQUF4Qjs7QUFFQSxJQUFRdUIsS0FBUixHQUEwQkosS0FBMUIsQ0FBUUksS0FBUjtBQUFBLElBQWVDLE1BQWYsR0FBMEJMLEtBQTFCLENBQWVLLE1BQWY7QUFFQSxJQUFJQyxLQUFKO0FBRUEsSUFBSVIsU0FBUyxDQUFDUyxPQUFPLENBQUNDLE9BQVQsRUFBa0IsVUFBbEIsQ0FBYixFQUE0Q0YsS0FBSyxHQUFHekIsT0FBTyxDQUFDLGdCQUFELENBQWY7O0FBRTVDLFNBQVM0QixPQUFULENBQWlCQyxNQUFqQixFQUF5QkMsR0FBekIsRUFBOEI7QUFDNUI7QUFDQSxNQUFJLE9BQU9BLEdBQVAsS0FBZSxVQUFuQixFQUErQjtBQUM3QixXQUFPLElBQUlDLE9BQU8sQ0FBQ0MsT0FBWixDQUFvQixLQUFwQixFQUEyQkgsTUFBM0IsRUFBbUNJLEdBQW5DLENBQXVDSCxHQUF2QyxDQUFQO0FBQ0QsR0FKMkIsQ0FNNUI7OztBQUNBLE1BQUlJLFNBQVMsQ0FBQ0MsTUFBVixLQUFxQixDQUF6QixFQUE0QjtBQUMxQixXQUFPLElBQUlKLE9BQU8sQ0FBQ0MsT0FBWixDQUFvQixLQUFwQixFQUEyQkgsTUFBM0IsQ0FBUDtBQUNEOztBQUVELFNBQU8sSUFBSUUsT0FBTyxDQUFDQyxPQUFaLENBQW9CSCxNQUFwQixFQUE0QkMsR0FBNUIsQ0FBUDtBQUNEOztBQUVETSxNQUFNLENBQUNMLE9BQVAsR0FBaUJILE9BQWpCO0FBQ0FHLE9BQU8sR0FBR0ssTUFBTSxDQUFDTCxPQUFqQjtBQUVBO0FBQ0E7QUFDQTs7QUFFQUEsT0FBTyxDQUFDQyxPQUFSLEdBQWtCQSxPQUFsQjtBQUVBO0FBQ0E7QUFDQTs7QUFFQUQsT0FBTyxDQUFDTSxLQUFSLEdBQWdCckMsT0FBTyxDQUFDLFNBQUQsQ0FBdkI7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsU0FBU3NDLElBQVQsR0FBZ0IsQ0FBRTtBQUVsQjtBQUNBO0FBQ0E7OztBQUVBUCxPQUFPLENBQUNULFFBQVIsR0FBbUJBLFFBQW5CO0FBRUE7QUFDQTtBQUNBOztBQUVBWCxJQUFJLENBQUM0QixNQUFMLENBQ0U7QUFDRSx1Q0FBcUMsQ0FBQyxNQUFELEVBQVMsWUFBVCxFQUF1QixXQUF2QjtBQUR2QyxDQURGLEVBSUUsSUFKRjtBQU9BO0FBQ0E7QUFDQTs7QUFFQVIsT0FBTyxDQUFDUyxTQUFSLEdBQW9CO0FBQ2xCLFdBQVNsQyxJQURTO0FBRWxCLFlBQVVELEtBRlE7QUFHbEIsWUFBVW9CO0FBSFEsQ0FBcEI7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBTSxPQUFPLENBQUNVLFNBQVIsR0FBb0I7QUFDbEIsdUNBQXFDL0IsRUFBRSxDQUFDZ0MsU0FEdEI7QUFFbEIsc0JBQW9CeEI7QUFGRixDQUFwQjtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUFhLE9BQU8sQ0FBQzlCLEtBQVIsR0FBZ0JELE9BQU8sQ0FBQyxXQUFELENBQXZCO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBK0IsT0FBTyxDQUFDWSxNQUFSLEdBQWlCLEVBQWpCO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBLFNBQVNDLFlBQVQsQ0FBc0JDLFFBQXRCLEVBQWdDO0FBQzlCQSxFQUFBQSxRQUFRLENBQUNDLE9BQVQsR0FBbUIsQ0FDakI7QUFEaUIsR0FBbkI7QUFHQUQsRUFBQUEsUUFBUSxDQUFDRSxNQUFULEdBQWtCLENBQ2hCO0FBRGdCLEdBQWxCO0FBR0Q7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUEsU0FBU2YsT0FBVCxDQUFpQkgsTUFBakIsRUFBeUJDLEdBQXpCLEVBQThCO0FBQzVCMUIsRUFBQUEsTUFBTSxDQUFDNEMsSUFBUCxDQUFZLElBQVo7QUFDQSxNQUFJLE9BQU9sQixHQUFQLEtBQWUsUUFBbkIsRUFBNkJBLEdBQUcsR0FBRzVCLE1BQU0sQ0FBQzRCLEdBQUQsQ0FBWjtBQUM3QixPQUFLbUIsWUFBTCxHQUFvQkMsT0FBTyxDQUFDeEIsT0FBTyxDQUFDeUIsR0FBUixDQUFZQyxVQUFiLENBQTNCLENBSDRCLENBR3lCOztBQUNyRCxPQUFLQyxNQUFMLEdBQWMsS0FBZDtBQUNBLE9BQUtDLFNBQUwsR0FBaUIsSUFBakI7QUFDQSxPQUFLekIsTUFBTCxHQUFjQSxNQUFkO0FBQ0EsT0FBS0MsR0FBTCxHQUFXQSxHQUFYOztBQUNBYyxFQUFBQSxZQUFZLENBQUMsSUFBRCxDQUFaOztBQUNBLE9BQUtXLFFBQUwsR0FBZ0IsSUFBaEI7QUFDQSxPQUFLQyxVQUFMLEdBQWtCLENBQWxCO0FBQ0EsT0FBS0MsU0FBTCxDQUFlNUIsTUFBTSxLQUFLLE1BQVgsR0FBb0IsQ0FBcEIsR0FBd0IsQ0FBdkM7QUFDQSxPQUFLNkIsT0FBTCxHQUFlLEVBQWY7QUFDQSxPQUFLaEQsRUFBTCxHQUFVLEVBQVY7QUFDQSxPQUFLaUQsTUFBTCxHQUFjLEVBQWQ7QUFDQSxPQUFLQyxLQUFMLEdBQWEsS0FBS0QsTUFBbEIsQ0FmNEIsQ0FlRjs7QUFDMUIsT0FBS0UsYUFBTCxHQUFxQixFQUFyQjtBQUNBLE9BQUtDLGNBQUwsR0FBc0IsS0FBdEI7QUFDQSxPQUFLQyxPQUFMLEdBQWVDLFNBQWY7QUFDQSxPQUFLQyxJQUFMLENBQVUsS0FBVixFQUFpQixLQUFLQyxZQUFMLENBQWtCQyxJQUFsQixDQUF1QixJQUF2QixDQUFqQjtBQUNEO0FBRUQ7QUFDQTtBQUNBO0FBQ0E7OztBQUNBMUQsSUFBSSxDQUFDMkQsUUFBTCxDQUFjcEMsT0FBZCxFQUF1QjVCLE1BQXZCO0FBRUFtQixLQUFLLENBQUNTLE9BQU8sQ0FBQ3FDLFNBQVQsRUFBb0JqRCxXQUFXLENBQUNpRCxTQUFoQyxDQUFMO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUFyQyxPQUFPLENBQUNxQyxTQUFSLENBQWtCNUMsS0FBbEIsR0FBMEIsVUFBVTZDLElBQVYsRUFBZ0I7QUFDeEMsTUFBSXZDLE9BQU8sQ0FBQ1MsU0FBUixDQUFrQixRQUFsQixNQUFnQ3dCLFNBQXBDLEVBQStDO0FBQzdDLFVBQU0sSUFBSU8sS0FBSixDQUNKLDREQURJLENBQU47QUFHRDs7QUFFRCxPQUFLdEIsWUFBTCxHQUFvQnFCLElBQUksS0FBS04sU0FBVCxHQUFxQixJQUFyQixHQUE0Qk0sSUFBaEQ7QUFDQSxTQUFPLElBQVA7QUFDRCxDQVREO0FBV0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQXRDLE9BQU8sQ0FBQ3FDLFNBQVIsQ0FBa0JHLE1BQWxCLEdBQTJCLFVBQVVDLEtBQVYsRUFBaUJDLElBQWpCLEVBQXVCQyxPQUF2QixFQUFnQztBQUFBOztBQUN6RCxNQUFJRCxJQUFKLEVBQVU7QUFDUixRQUFJLEtBQUtFLEtBQVQsRUFBZ0I7QUFDZCxZQUFNLElBQUlMLEtBQUosQ0FBVSw0Q0FBVixDQUFOO0FBQ0Q7O0FBRUQsUUFBSU0sQ0FBQyxHQUFHRixPQUFPLElBQUksRUFBbkI7O0FBQ0EsUUFBSSxPQUFPQSxPQUFQLEtBQW1CLFFBQXZCLEVBQWlDO0FBQy9CRSxNQUFBQSxDQUFDLEdBQUc7QUFBRUMsUUFBQUEsUUFBUSxFQUFFSDtBQUFaLE9BQUo7QUFDRDs7QUFFRCxRQUFJLE9BQU9ELElBQVAsS0FBZ0IsUUFBcEIsRUFBOEI7QUFDNUIsVUFBSSxDQUFDRyxDQUFDLENBQUNDLFFBQVAsRUFBaUJELENBQUMsQ0FBQ0MsUUFBRixHQUFhSixJQUFiO0FBQ2pCM0QsTUFBQUEsS0FBSyxDQUFDLGdEQUFELEVBQW1EMkQsSUFBbkQsQ0FBTDtBQUNBQSxNQUFBQSxJQUFJLEdBQUduRSxFQUFFLENBQUN3RSxnQkFBSCxDQUFvQkwsSUFBcEIsQ0FBUDtBQUNBQSxNQUFBQSxJQUFJLENBQUNNLEVBQUwsQ0FBUSxPQUFSLEVBQWlCLFVBQUNDLEtBQUQsRUFBVztBQUMxQixZQUFNQyxRQUFRLEdBQUcsS0FBSSxDQUFDQyxZQUFMLEVBQWpCOztBQUNBRCxRQUFBQSxRQUFRLENBQUNFLElBQVQsQ0FBYyxPQUFkLEVBQXVCSCxLQUF2QjtBQUNELE9BSEQ7QUFJRCxLQVJELE1BUU8sSUFBSSxDQUFDSixDQUFDLENBQUNDLFFBQUgsSUFBZUosSUFBSSxDQUFDVyxJQUF4QixFQUE4QjtBQUNuQ1IsTUFBQUEsQ0FBQyxDQUFDQyxRQUFGLEdBQWFKLElBQUksQ0FBQ1csSUFBbEI7QUFDRDs7QUFFRCxTQUFLRixZQUFMLEdBQW9CRyxNQUFwQixDQUEyQmIsS0FBM0IsRUFBa0NDLElBQWxDLEVBQXdDRyxDQUF4QztBQUNEOztBQUVELFNBQU8sSUFBUDtBQUNELENBM0JEOztBQTZCQTdDLE9BQU8sQ0FBQ3FDLFNBQVIsQ0FBa0JjLFlBQWxCLEdBQWlDLFlBQVk7QUFBQTs7QUFDM0MsTUFBSSxDQUFDLEtBQUs3QixTQUFWLEVBQXFCO0FBQ25CLFNBQUtBLFNBQUwsR0FBaUIsSUFBSXpDLFFBQUosRUFBakI7O0FBQ0EsU0FBS3lDLFNBQUwsQ0FBZTBCLEVBQWYsQ0FBa0IsT0FBbEIsRUFBMkIsVUFBQ0MsS0FBRCxFQUFXO0FBQ3BDbEUsTUFBQUEsS0FBSyxDQUFDLGdCQUFELEVBQW1Ca0UsS0FBbkIsQ0FBTDs7QUFDQSxVQUFJLE1BQUksQ0FBQ00sTUFBVCxFQUFpQjtBQUNmO0FBQ0E7QUFDQTtBQUNEOztBQUVELE1BQUEsTUFBSSxDQUFDQyxRQUFMLENBQWNQLEtBQWQ7O0FBQ0EsTUFBQSxNQUFJLENBQUNRLEtBQUw7QUFDRCxLQVZEO0FBV0Q7O0FBRUQsU0FBTyxLQUFLbkMsU0FBWjtBQUNELENBakJEO0FBbUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBdEIsT0FBTyxDQUFDcUMsU0FBUixDQUFrQmhDLEtBQWxCLEdBQTBCLFVBQVVBLEtBQVYsRUFBaUI7QUFDekMsTUFBSUgsU0FBUyxDQUFDQyxNQUFWLEtBQXFCLENBQXpCLEVBQTRCLE9BQU8sS0FBS2tCLE1BQVo7QUFDNUIsT0FBS0EsTUFBTCxHQUFjaEIsS0FBZDtBQUNBLFNBQU8sSUFBUDtBQUNELENBSkQ7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUFMLE9BQU8sQ0FBQ3FDLFNBQVIsQ0FBa0JxQixNQUFsQixHQUEyQixVQUFVQSxNQUFWLEVBQWtCO0FBQzNDLE1BQUl4RCxTQUFTLENBQUNDLE1BQVYsS0FBcUIsQ0FBekIsRUFBNEIsT0FBTyxLQUFLNEIsT0FBWjtBQUM1QixPQUFLQSxPQUFMLEdBQWUyQixNQUFmO0FBQ0EsU0FBTyxJQUFQO0FBQ0QsQ0FKRDtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUExRCxPQUFPLENBQUNxQyxTQUFSLENBQWtCc0IsSUFBbEIsR0FBeUIsVUFBVUEsSUFBVixFQUFnQjtBQUN2QyxTQUFPLEtBQUtDLEdBQUwsQ0FDTCxjQURLLEVBRUxELElBQUksQ0FBQ0UsUUFBTCxDQUFjLEdBQWQsSUFBcUJGLElBQXJCLEdBQTRCaEYsSUFBSSxDQUFDbUYsT0FBTCxDQUFhSCxJQUFiLENBRnZCLENBQVA7QUFJRCxDQUxEO0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBM0QsT0FBTyxDQUFDcUMsU0FBUixDQUFrQjBCLE1BQWxCLEdBQTJCLFVBQVVKLElBQVYsRUFBZ0I7QUFDekMsU0FBTyxLQUFLQyxHQUFMLENBQVMsUUFBVCxFQUFtQkQsSUFBSSxDQUFDRSxRQUFMLENBQWMsR0FBZCxJQUFxQkYsSUFBckIsR0FBNEJoRixJQUFJLENBQUNtRixPQUFMLENBQWFILElBQWIsQ0FBL0MsQ0FBUDtBQUNELENBRkQ7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUEzRCxPQUFPLENBQUNxQyxTQUFSLENBQWtCMkIsS0FBbEIsR0FBMEIsVUFBVUMsS0FBVixFQUFpQjtBQUN6QyxNQUFJLE9BQU9BLEtBQVAsS0FBaUIsUUFBckIsRUFBK0I7QUFDN0IsU0FBS3RDLE1BQUwsQ0FBWXVDLElBQVosQ0FBaUJELEtBQWpCO0FBQ0QsR0FGRCxNQUVPO0FBQ0xFLElBQUFBLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjLEtBQUsxRixFQUFuQixFQUF1QnVGLEtBQXZCO0FBQ0Q7O0FBRUQsU0FBTyxJQUFQO0FBQ0QsQ0FSRDtBQVVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBakUsT0FBTyxDQUFDcUMsU0FBUixDQUFrQmdDLEtBQWxCLEdBQTBCLFVBQVVDLElBQVYsRUFBZ0JDLFFBQWhCLEVBQTBCO0FBQ2xELE1BQU0xRCxRQUFRLEdBQUcsS0FBS2pCLE9BQUwsRUFBakI7O0FBQ0EsTUFBSSxDQUFDLEtBQUtrQyxjQUFWLEVBQTBCO0FBQ3hCLFNBQUtBLGNBQUwsR0FBc0IsSUFBdEI7QUFDRDs7QUFFRCxTQUFPakIsUUFBUSxDQUFDd0QsS0FBVCxDQUFlQyxJQUFmLEVBQXFCQyxRQUFyQixDQUFQO0FBQ0QsQ0FQRDtBQVNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBdkUsT0FBTyxDQUFDcUMsU0FBUixDQUFrQm1DLElBQWxCLEdBQXlCLFVBQVVDLE1BQVYsRUFBa0I5QixPQUFsQixFQUEyQjtBQUNsRCxPQUFLK0IsS0FBTCxHQUFhLElBQWIsQ0FEa0QsQ0FDL0I7O0FBQ25CLE9BQUsvRCxNQUFMLENBQVksS0FBWjtBQUNBLE9BQUtWLEdBQUw7QUFDQSxTQUFPLEtBQUswRSxhQUFMLENBQW1CRixNQUFuQixFQUEyQjlCLE9BQTNCLENBQVA7QUFDRCxDQUxEOztBQU9BM0MsT0FBTyxDQUFDcUMsU0FBUixDQUFrQnNDLGFBQWxCLEdBQWtDLFVBQVVGLE1BQVYsRUFBa0I5QixPQUFsQixFQUEyQjtBQUFBOztBQUMzRCxPQUFLaUMsR0FBTCxDQUFTM0MsSUFBVCxDQUFjLFVBQWQsRUFBMEIsVUFBQzRDLEdBQUQsRUFBUztBQUNqQztBQUNBLFFBQ0VDLFVBQVUsQ0FBQ0QsR0FBRyxDQUFDRSxVQUFMLENBQVYsSUFDQSxNQUFJLENBQUN2RCxVQUFMLE9BQXNCLE1BQUksQ0FBQ3dELGFBRjdCLEVBR0U7QUFDQSxhQUFPLE1BQUksQ0FBQ0MsU0FBTCxDQUFlSixHQUFmLE1BQXdCLE1BQXhCLEdBQ0gsTUFBSSxDQUFDRixhQUFMLENBQW1CRixNQUFuQixFQUEyQjlCLE9BQTNCLENBREcsR0FFSFgsU0FGSjtBQUdEOztBQUVELElBQUEsTUFBSSxDQUFDNkMsR0FBTCxHQUFXQSxHQUFYOztBQUNBLElBQUEsTUFBSSxDQUFDSyxhQUFMOztBQUNBLFFBQUksTUFBSSxDQUFDQyxRQUFULEVBQW1COztBQUVuQixRQUFJLE1BQUksQ0FBQ0MsWUFBTCxDQUFrQlAsR0FBbEIsQ0FBSixFQUE0QjtBQUMxQixVQUFNUSxXQUFXLEdBQUc3RyxJQUFJLENBQUM4RyxXQUFMLEVBQXBCO0FBQ0FELE1BQUFBLFdBQVcsQ0FBQ3JDLEVBQVosQ0FBZSxPQUFmLEVBQXdCLFVBQUNDLEtBQUQsRUFBVztBQUNqQyxZQUFJQSxLQUFLLElBQUlBLEtBQUssQ0FBQ3NDLElBQU4sS0FBZSxhQUE1QixFQUEyQztBQUN6QztBQUNBZCxVQUFBQSxNQUFNLENBQUNyQixJQUFQLENBQVksS0FBWjtBQUNBO0FBQ0Q7O0FBRURxQixRQUFBQSxNQUFNLENBQUNyQixJQUFQLENBQVksT0FBWixFQUFxQkgsS0FBckI7QUFDRCxPQVJEO0FBU0E0QixNQUFBQSxHQUFHLENBQUNMLElBQUosQ0FBU2EsV0FBVCxFQUFzQmIsSUFBdEIsQ0FBMkJDLE1BQTNCLEVBQW1DOUIsT0FBbkM7QUFDRCxLQVpELE1BWU87QUFDTGtDLE1BQUFBLEdBQUcsQ0FBQ0wsSUFBSixDQUFTQyxNQUFULEVBQWlCOUIsT0FBakI7QUFDRDs7QUFFRGtDLElBQUFBLEdBQUcsQ0FBQzVDLElBQUosQ0FBUyxLQUFULEVBQWdCLFlBQU07QUFDcEIsTUFBQSxNQUFJLENBQUNtQixJQUFMLENBQVUsS0FBVjtBQUNELEtBRkQ7QUFHRCxHQWxDRDtBQW1DQSxTQUFPcUIsTUFBUDtBQUNELENBckNEO0FBdUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQXpFLE9BQU8sQ0FBQ3FDLFNBQVIsQ0FBa0IxQixNQUFsQixHQUEyQixVQUFVc0QsS0FBVixFQUFpQjtBQUMxQyxPQUFLdUIsT0FBTCxHQUFldkIsS0FBSyxLQUFLLEtBQXpCO0FBQ0EsU0FBTyxJQUFQO0FBQ0QsQ0FIRDtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQWpFLE9BQU8sQ0FBQ3FDLFNBQVIsQ0FBa0I0QyxTQUFsQixHQUE4QixVQUFVSixHQUFWLEVBQWU7QUFDM0MsTUFBSS9FLEdBQUcsR0FBRytFLEdBQUcsQ0FBQ1ksT0FBSixDQUFZQyxRQUF0Qjs7QUFDQSxNQUFJLENBQUM1RixHQUFMLEVBQVU7QUFDUixXQUFPLEtBQUswRCxRQUFMLENBQWMsSUFBSWpCLEtBQUosQ0FBVSxpQ0FBVixDQUFkLEVBQTREc0MsR0FBNUQsQ0FBUDtBQUNEOztBQUVEOUYsRUFBQUEsS0FBSyxDQUFDLG1CQUFELEVBQXNCLEtBQUtlLEdBQTNCLEVBQWdDQSxHQUFoQyxDQUFMLENBTjJDLENBUTNDOztBQUNBQSxFQUFBQSxHQUFHLEdBQUczQixPQUFPLENBQUMsS0FBSzJCLEdBQU4sRUFBV0EsR0FBWCxDQUFiLENBVDJDLENBVzNDO0FBQ0E7O0FBQ0ErRSxFQUFBQSxHQUFHLENBQUNjLE1BQUo7QUFFQSxNQUFJRixPQUFPLEdBQUcsS0FBS2IsR0FBTCxDQUFTZ0IsVUFBVCxHQUFzQixLQUFLaEIsR0FBTCxDQUFTZ0IsVUFBVCxFQUF0QixHQUE4QyxLQUFLaEIsR0FBTCxDQUFTaUIsUUFBckU7QUFFQSxNQUFNQyxhQUFhLEdBQUc3SCxLQUFLLENBQUM2QixHQUFELENBQUwsQ0FBV2lHLElBQVgsS0FBb0I5SCxLQUFLLENBQUMsS0FBSzZCLEdBQU4sQ0FBTCxDQUFnQmlHLElBQTFELENBakIyQyxDQW1CM0M7O0FBQ0EsTUFBSWxCLEdBQUcsQ0FBQ0UsVUFBSixLQUFtQixHQUFuQixJQUEwQkYsR0FBRyxDQUFDRSxVQUFKLEtBQW1CLEdBQWpELEVBQXNEO0FBQ3BEO0FBQ0E7QUFDQVUsSUFBQUEsT0FBTyxHQUFHdEcsS0FBSyxDQUFDNkcsV0FBTixDQUFrQlAsT0FBbEIsRUFBMkJLLGFBQTNCLENBQVYsQ0FIb0QsQ0FLcEQ7O0FBQ0EsU0FBS2pHLE1BQUwsR0FBYyxLQUFLQSxNQUFMLEtBQWdCLE1BQWhCLEdBQXlCLE1BQXpCLEdBQWtDLEtBQWhELENBTm9ELENBUXBEOztBQUNBLFNBQUsrQyxLQUFMLEdBQWEsSUFBYjtBQUNELEdBOUIwQyxDQWdDM0M7OztBQUNBLE1BQUlpQyxHQUFHLENBQUNFLFVBQUosS0FBbUIsR0FBdkIsRUFBNEI7QUFDMUI7QUFDQTtBQUNBVSxJQUFBQSxPQUFPLEdBQUd0RyxLQUFLLENBQUM2RyxXQUFOLENBQWtCUCxPQUFsQixFQUEyQkssYUFBM0IsQ0FBVixDQUgwQixDQUsxQjs7QUFDQSxTQUFLakcsTUFBTCxHQUFjLEtBQWQsQ0FOMEIsQ0FRMUI7O0FBQ0EsU0FBSytDLEtBQUwsR0FBYSxJQUFiO0FBQ0QsR0EzQzBDLENBNkMzQztBQUNBOzs7QUFDQSxTQUFPNkMsT0FBTyxDQUFDTSxJQUFmO0FBRUEsU0FBTyxLQUFLbkIsR0FBWjtBQUNBLFNBQU8sS0FBS3RELFNBQVosQ0FsRDJDLENBb0QzQzs7QUFDQVYsRUFBQUEsWUFBWSxDQUFDLElBQUQsQ0FBWixDQXJEMkMsQ0F1RDNDOzs7QUFDQSxPQUFLcUYsVUFBTCxHQUFrQixLQUFsQjtBQUNBLE9BQUtuRyxHQUFMLEdBQVdBLEdBQVg7QUFDQSxPQUFLcEIsRUFBTCxHQUFVLEVBQVY7QUFDQSxPQUFLaUQsTUFBTCxDQUFZeEIsTUFBWixHQUFxQixDQUFyQjtBQUNBLE9BQUt5RCxHQUFMLENBQVM2QixPQUFUO0FBQ0EsT0FBS3JDLElBQUwsQ0FBVSxVQUFWLEVBQXNCeUIsR0FBdEI7O0FBQ0EsT0FBS2hELGFBQUwsQ0FBbUJxQyxJQUFuQixDQUF3QixLQUFLcEUsR0FBN0I7O0FBQ0EsT0FBS0csR0FBTCxDQUFTLEtBQUtpRyxTQUFkO0FBQ0EsU0FBTyxJQUFQO0FBQ0QsQ0FqRUQ7QUFtRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBbEcsT0FBTyxDQUFDcUMsU0FBUixDQUFrQjhELElBQWxCLEdBQXlCLFVBQVVDLElBQVYsRUFBZ0JDLElBQWhCLEVBQXNCMUQsT0FBdEIsRUFBK0I7QUFDdEQsTUFBSXpDLFNBQVMsQ0FBQ0MsTUFBVixLQUFxQixDQUF6QixFQUE0QmtHLElBQUksR0FBRyxFQUFQOztBQUM1QixNQUFJLFFBQU9BLElBQVAsTUFBZ0IsUUFBaEIsSUFBNEJBLElBQUksS0FBSyxJQUF6QyxFQUErQztBQUM3QztBQUNBMUQsSUFBQUEsT0FBTyxHQUFHMEQsSUFBVjtBQUNBQSxJQUFBQSxJQUFJLEdBQUcsRUFBUDtBQUNEOztBQUVELE1BQUksQ0FBQzFELE9BQUwsRUFBYztBQUNaQSxJQUFBQSxPQUFPLEdBQUc7QUFBRWdCLE1BQUFBLElBQUksRUFBRTtBQUFSLEtBQVY7QUFDRDs7QUFFRCxNQUFNMkMsT0FBTyxHQUFHLFNBQVZBLE9BQVUsQ0FBQ0MsTUFBRDtBQUFBLFdBQVlDLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZRixNQUFaLEVBQW9CRyxRQUFwQixDQUE2QixRQUE3QixDQUFaO0FBQUEsR0FBaEI7O0FBRUEsU0FBTyxLQUFLQyxLQUFMLENBQVdQLElBQVgsRUFBaUJDLElBQWpCLEVBQXVCMUQsT0FBdkIsRUFBZ0MyRCxPQUFoQyxDQUFQO0FBQ0QsQ0FmRDtBQWlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUF0RyxPQUFPLENBQUNxQyxTQUFSLENBQWtCdUUsRUFBbEIsR0FBdUIsVUFBVUMsSUFBVixFQUFnQjtBQUNyQyxPQUFLQyxHQUFMLEdBQVdELElBQVg7QUFDQSxTQUFPLElBQVA7QUFDRCxDQUhEO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBN0csT0FBTyxDQUFDcUMsU0FBUixDQUFrQjBFLEdBQWxCLEdBQXdCLFVBQVVGLElBQVYsRUFBZ0I7QUFDdEMsT0FBS0csSUFBTCxHQUFZSCxJQUFaO0FBQ0EsU0FBTyxJQUFQO0FBQ0QsQ0FIRDtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTdHLE9BQU8sQ0FBQ3FDLFNBQVIsQ0FBa0I0RSxHQUFsQixHQUF3QixVQUFVSixJQUFWLEVBQWdCO0FBQ3RDLE1BQUksUUFBT0EsSUFBUCxNQUFnQixRQUFoQixJQUE0QixDQUFDTCxNQUFNLENBQUNVLFFBQVAsQ0FBZ0JMLElBQWhCLENBQWpDLEVBQXdEO0FBQ3RELFNBQUtNLElBQUwsR0FBWU4sSUFBSSxDQUFDSSxHQUFqQjtBQUNBLFNBQUtHLFdBQUwsR0FBbUJQLElBQUksQ0FBQ1EsVUFBeEI7QUFDRCxHQUhELE1BR087QUFDTCxTQUFLRixJQUFMLEdBQVlOLElBQVo7QUFDRDs7QUFFRCxTQUFPLElBQVA7QUFDRCxDQVREO0FBV0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBN0csT0FBTyxDQUFDcUMsU0FBUixDQUFrQndFLElBQWxCLEdBQXlCLFVBQVVBLElBQVYsRUFBZ0I7QUFDdkMsT0FBS1MsS0FBTCxHQUFhVCxJQUFiO0FBQ0EsU0FBTyxJQUFQO0FBQ0QsQ0FIRDtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTdHLE9BQU8sQ0FBQ3FDLFNBQVIsQ0FBa0JrRixlQUFsQixHQUFvQyxZQUFZO0FBQzlDLE9BQUtDLGdCQUFMLEdBQXdCLElBQXhCO0FBQ0EsU0FBTyxJQUFQO0FBQ0QsQ0FIRDtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7QUFDQXhILE9BQU8sQ0FBQ3FDLFNBQVIsQ0FBa0J6QyxPQUFsQixHQUE0QixZQUFZO0FBQUE7O0FBQ3RDLE1BQUksS0FBS2dGLEdBQVQsRUFBYyxPQUFPLEtBQUtBLEdBQVo7QUFFZCxNQUFNakMsT0FBTyxHQUFHLEVBQWhCOztBQUVBLE1BQUk7QUFDRixRQUFNcUIsS0FBSyxHQUFHdEYsRUFBRSxDQUFDZ0MsU0FBSCxDQUFhLEtBQUtoQyxFQUFsQixFQUFzQjtBQUNsQytJLE1BQUFBLE9BQU8sRUFBRSxLQUR5QjtBQUVsQ0MsTUFBQUEsa0JBQWtCLEVBQUU7QUFGYyxLQUF0QixDQUFkOztBQUlBLFFBQUkxRCxLQUFKLEVBQVc7QUFDVCxXQUFLdEYsRUFBTCxHQUFVLEVBQVY7O0FBQ0EsV0FBS2lELE1BQUwsQ0FBWXVDLElBQVosQ0FBaUJGLEtBQWpCO0FBQ0Q7O0FBRUQsU0FBSzJELG9CQUFMO0FBQ0QsR0FYRCxDQVdFLE9BQU9DLEdBQVAsRUFBWTtBQUNaLFdBQU8sS0FBS3hFLElBQUwsQ0FBVSxPQUFWLEVBQW1Cd0UsR0FBbkIsQ0FBUDtBQUNEOztBQUVELE1BQU05SCxHQUFOLEdBQWMsSUFBZCxDQUFNQSxHQUFOO0FBQ0EsTUFBTStILE9BQU8sR0FBRyxLQUFLQyxRQUFyQixDQXJCc0MsQ0F1QnRDO0FBQ0E7QUFDQTs7QUFDQSxNQUFJQyxvQkFBSjs7QUFDQSxNQUFJakksR0FBRyxDQUFDK0QsUUFBSixDQUFhLEdBQWIsQ0FBSixFQUF1QjtBQUNyQixRQUFNbUUsZUFBZSxHQUFHbEksR0FBRyxDQUFDbUksT0FBSixDQUFZLEdBQVosQ0FBeEI7O0FBRUEsUUFBSUQsZUFBZSxLQUFLLENBQUMsQ0FBekIsRUFBNEI7QUFDMUIsVUFBTUUsV0FBVyxHQUFHcEksR0FBRyxDQUFDcUksS0FBSixDQUFVSCxlQUFlLEdBQUcsQ0FBNUIsQ0FBcEI7QUFDQUQsTUFBQUEsb0JBQW9CLEdBQUdHLFdBQVcsQ0FBQ0UsS0FBWixDQUFrQixRQUFsQixDQUF2QjtBQUNEO0FBQ0YsR0FsQ3FDLENBb0N0Qzs7O0FBQ0EsTUFBSXRJLEdBQUcsQ0FBQ21JLE9BQUosQ0FBWSxNQUFaLE1BQXdCLENBQTVCLEVBQStCbkksR0FBRyxvQkFBYUEsR0FBYixDQUFIO0FBQy9CQSxFQUFBQSxHQUFHLEdBQUc3QixLQUFLLENBQUM2QixHQUFELENBQVgsQ0F0Q3NDLENBd0N0Qzs7QUFDQSxNQUFJaUksb0JBQUosRUFBMEI7QUFDeEIsUUFBSU0sQ0FBQyxHQUFHLENBQVI7QUFDQXZJLElBQUFBLEdBQUcsQ0FBQ2tFLEtBQUosR0FBWWxFLEdBQUcsQ0FBQ2tFLEtBQUosQ0FBVXNFLE9BQVYsQ0FBa0IsTUFBbEIsRUFBMEI7QUFBQSxhQUFNUCxvQkFBb0IsQ0FBQ00sQ0FBQyxFQUFGLENBQTFCO0FBQUEsS0FBMUIsQ0FBWjtBQUNBdkksSUFBQUEsR0FBRyxDQUFDeUksTUFBSixjQUFpQnpJLEdBQUcsQ0FBQ2tFLEtBQXJCO0FBQ0FsRSxJQUFBQSxHQUFHLENBQUN1RCxJQUFKLEdBQVd2RCxHQUFHLENBQUMwSSxRQUFKLEdBQWUxSSxHQUFHLENBQUN5SSxNQUE5QjtBQUNELEdBOUNxQyxDQWdEdEM7OztBQUNBLE1BQUksaUJBQWlCRSxJQUFqQixDQUFzQjNJLEdBQUcsQ0FBQzRJLFFBQTFCLE1BQXdDLElBQTVDLEVBQWtEO0FBQ2hEO0FBQ0E1SSxJQUFBQSxHQUFHLENBQUM0SSxRQUFKLGFBQWtCNUksR0FBRyxDQUFDNEksUUFBSixDQUFhQyxLQUFiLENBQW1CLEdBQW5CLEVBQXdCLENBQXhCLENBQWxCLE9BRmdELENBSWhEOztBQUNBLFFBQU1DLFNBQVMsR0FBRzlJLEdBQUcsQ0FBQ3VELElBQUosQ0FBUytFLEtBQVQsQ0FBZSxlQUFmLENBQWxCO0FBQ0F6RixJQUFBQSxPQUFPLENBQUNrRyxVQUFSLEdBQXFCRCxTQUFTLENBQUMsQ0FBRCxDQUFULENBQWFOLE9BQWIsQ0FBcUIsTUFBckIsRUFBNkIsR0FBN0IsQ0FBckI7QUFDQXhJLElBQUFBLEdBQUcsQ0FBQ3VELElBQUosR0FBV3VGLFNBQVMsQ0FBQyxDQUFELENBQXBCO0FBQ0QsR0F6RHFDLENBMkR0Qzs7O0FBQ0EsTUFBSSxLQUFLRSxnQkFBVCxFQUEyQjtBQUN6QixlQUFxQmhKLEdBQXJCO0FBQUEsUUFBUWlKLFFBQVIsUUFBUUEsUUFBUjtBQUNBLFFBQU1YLEtBQUssR0FDVFcsUUFBUSxJQUFJLEtBQUtELGdCQUFqQixHQUNJLEtBQUtBLGdCQUFMLENBQXNCQyxRQUF0QixDQURKLEdBRUksS0FBS0QsZ0JBQUwsQ0FBc0IsR0FBdEIsQ0FITjs7QUFJQSxRQUFJVixLQUFKLEVBQVc7QUFDVDtBQUNBLFVBQUksQ0FBQyxLQUFLdEgsT0FBTCxDQUFhaUYsSUFBbEIsRUFBd0I7QUFDdEIsYUFBS25DLEdBQUwsQ0FBUyxNQUFULEVBQWlCOUQsR0FBRyxDQUFDaUcsSUFBckI7QUFDRDs7QUFFRCxVQUFJaUQsT0FBSjtBQUNBLFVBQUlDLE9BQUo7O0FBRUEsVUFBSSxRQUFPYixLQUFQLE1BQWlCLFFBQXJCLEVBQStCO0FBQzdCWSxRQUFBQSxPQUFPLEdBQUdaLEtBQUssQ0FBQ3JDLElBQWhCO0FBQ0FrRCxRQUFBQSxPQUFPLEdBQUdiLEtBQUssQ0FBQ2MsSUFBaEI7QUFDRCxPQUhELE1BR087QUFDTEYsUUFBQUEsT0FBTyxHQUFHWixLQUFWO0FBQ0FhLFFBQUFBLE9BQU8sR0FBR25KLEdBQUcsQ0FBQ29KLElBQWQ7QUFDRCxPQWZRLENBaUJUOzs7QUFDQXBKLE1BQUFBLEdBQUcsQ0FBQ2lHLElBQUosR0FBVyxJQUFJMEMsSUFBSixDQUFTTyxPQUFULGVBQXdCQSxPQUF4QixTQUFxQ0EsT0FBaEQ7O0FBQ0EsVUFBSUMsT0FBSixFQUFhO0FBQ1huSixRQUFBQSxHQUFHLENBQUNpRyxJQUFKLGVBQWdCa0QsT0FBaEI7QUFDQW5KLFFBQUFBLEdBQUcsQ0FBQ29KLElBQUosR0FBV0QsT0FBWDtBQUNEOztBQUVEbkosTUFBQUEsR0FBRyxDQUFDaUosUUFBSixHQUFlQyxPQUFmO0FBQ0Q7QUFDRixHQTVGcUMsQ0E4RnRDOzs7QUFDQXJHLEVBQUFBLE9BQU8sQ0FBQzlDLE1BQVIsR0FBaUIsS0FBS0EsTUFBdEI7QUFDQThDLEVBQUFBLE9BQU8sQ0FBQ3VHLElBQVIsR0FBZXBKLEdBQUcsQ0FBQ29KLElBQW5CO0FBQ0F2RyxFQUFBQSxPQUFPLENBQUNVLElBQVIsR0FBZXZELEdBQUcsQ0FBQ3VELElBQW5CO0FBQ0FWLEVBQUFBLE9BQU8sQ0FBQ29ELElBQVIsR0FBZWpHLEdBQUcsQ0FBQ2lKLFFBQW5CO0FBQ0FwRyxFQUFBQSxPQUFPLENBQUNpRSxFQUFSLEdBQWEsS0FBS0UsR0FBbEI7QUFDQW5FLEVBQUFBLE9BQU8sQ0FBQ29FLEdBQVIsR0FBYyxLQUFLQyxJQUFuQjtBQUNBckUsRUFBQUEsT0FBTyxDQUFDc0UsR0FBUixHQUFjLEtBQUtFLElBQW5CO0FBQ0F4RSxFQUFBQSxPQUFPLENBQUNrRSxJQUFSLEdBQWUsS0FBS1MsS0FBcEI7QUFDQTNFLEVBQUFBLE9BQU8sQ0FBQzBFLFVBQVIsR0FBcUIsS0FBS0QsV0FBMUI7QUFDQXpFLEVBQUFBLE9BQU8sQ0FBQ3RDLEtBQVIsR0FBZ0IsS0FBS2dCLE1BQXJCO0FBQ0FzQixFQUFBQSxPQUFPLENBQUNlLE1BQVIsR0FBaUIsS0FBSzNCLE9BQXRCO0FBQ0FZLEVBQUFBLE9BQU8sQ0FBQ3dHLGtCQUFSLEdBQ0UsT0FBTyxLQUFLM0IsZ0JBQVosS0FBaUMsU0FBakMsR0FDSSxDQUFDLEtBQUtBLGdCQURWLEdBRUk5SCxPQUFPLENBQUN5QixHQUFSLENBQVlpSSw0QkFBWixLQUE2QyxHQUhuRCxDQTFHc0MsQ0ErR3RDOztBQUNBLE1BQUksS0FBS3RJLE9BQUwsQ0FBYWlGLElBQWpCLEVBQXVCO0FBQ3JCcEQsSUFBQUEsT0FBTyxDQUFDMEcsVUFBUixHQUFxQixLQUFLdkksT0FBTCxDQUFhaUYsSUFBYixDQUFrQnVDLE9BQWxCLENBQTBCLE9BQTFCLEVBQW1DLEVBQW5DLENBQXJCO0FBQ0Q7O0FBRUQsTUFDRSxLQUFLZ0IsZUFBTCxJQUNBLDRDQUE0Q2IsSUFBNUMsQ0FBaUQzSSxHQUFHLENBQUNpSixRQUFyRCxDQUZGLEVBR0U7QUFDQXBHLElBQUFBLE9BQU8sQ0FBQ3dHLGtCQUFSLEdBQTZCLEtBQTdCO0FBQ0QsR0F6SHFDLENBMkh0Qzs7O0FBQ0EsTUFBTUksT0FBTyxHQUFHLEtBQUt0SSxZQUFMLEdBQ1psQixPQUFPLENBQUNTLFNBQVIsQ0FBa0IsUUFBbEIsRUFBNEJnSixXQUE1QixDQUF3QzFKLEdBQUcsQ0FBQzRJLFFBQTVDLENBRFksR0FFWjNJLE9BQU8sQ0FBQ1MsU0FBUixDQUFrQlYsR0FBRyxDQUFDNEksUUFBdEIsQ0FGSixDQTVIc0MsQ0FnSXRDOztBQUNBLE9BQUs5RCxHQUFMLEdBQVcyRSxPQUFPLENBQUMzSixPQUFSLENBQWdCK0MsT0FBaEIsQ0FBWDtBQUNBLE1BQVFpQyxHQUFSLEdBQWdCLElBQWhCLENBQVFBLEdBQVIsQ0FsSXNDLENBb0l0Qzs7QUFDQUEsRUFBQUEsR0FBRyxDQUFDNkUsVUFBSixDQUFlLElBQWY7O0FBRUEsTUFBSTlHLE9BQU8sQ0FBQzlDLE1BQVIsS0FBbUIsTUFBdkIsRUFBK0I7QUFDN0IrRSxJQUFBQSxHQUFHLENBQUM4RSxTQUFKLENBQWMsaUJBQWQsRUFBaUMsZUFBakM7QUFDRDs7QUFFRCxPQUFLaEIsUUFBTCxHQUFnQjVJLEdBQUcsQ0FBQzRJLFFBQXBCO0FBQ0EsT0FBSzNDLElBQUwsR0FBWWpHLEdBQUcsQ0FBQ2lHLElBQWhCLENBNUlzQyxDQThJdEM7O0FBQ0FuQixFQUFBQSxHQUFHLENBQUMzQyxJQUFKLENBQVMsT0FBVCxFQUFrQixZQUFNO0FBQ3RCLElBQUEsTUFBSSxDQUFDbUIsSUFBTCxDQUFVLE9BQVY7QUFDRCxHQUZEO0FBSUF3QixFQUFBQSxHQUFHLENBQUM1QixFQUFKLENBQU8sT0FBUCxFQUFnQixVQUFDQyxLQUFELEVBQVc7QUFDekI7QUFDQTtBQUNBO0FBQ0EsUUFBSSxNQUFJLENBQUNrQyxRQUFULEVBQW1CLE9BSk0sQ0FLekI7QUFDQTs7QUFDQSxRQUFJLE1BQUksQ0FBQzJDLFFBQUwsS0FBa0JELE9BQXRCLEVBQStCLE9BUE4sQ0FRekI7QUFDQTs7QUFDQSxRQUFJLE1BQUksQ0FBQzhCLFFBQVQsRUFBbUI7O0FBQ25CLElBQUEsTUFBSSxDQUFDbkcsUUFBTCxDQUFjUCxLQUFkO0FBQ0QsR0FaRCxFQW5Kc0MsQ0FpS3RDOztBQUNBLE1BQUluRCxHQUFHLENBQUNxRyxJQUFSLEVBQWM7QUFDWixRQUFNQSxJQUFJLEdBQUdyRyxHQUFHLENBQUNxRyxJQUFKLENBQVN3QyxLQUFULENBQWUsR0FBZixDQUFiO0FBQ0EsU0FBS3hDLElBQUwsQ0FBVUEsSUFBSSxDQUFDLENBQUQsQ0FBZCxFQUFtQkEsSUFBSSxDQUFDLENBQUQsQ0FBdkI7QUFDRDs7QUFFRCxNQUFJLEtBQUt5RCxRQUFMLElBQWlCLEtBQUtDLFFBQTFCLEVBQW9DO0FBQ2xDLFNBQUsxRCxJQUFMLENBQVUsS0FBS3lELFFBQWYsRUFBeUIsS0FBS0MsUUFBOUI7QUFDRDs7QUFFRCxPQUFLLElBQU05QyxHQUFYLElBQWtCLEtBQUtoRyxNQUF2QixFQUErQjtBQUM3QixRQUFJdkIsTUFBTSxDQUFDLEtBQUt1QixNQUFOLEVBQWNnRyxHQUFkLENBQVYsRUFBOEJuQyxHQUFHLENBQUM4RSxTQUFKLENBQWMzQyxHQUFkLEVBQW1CLEtBQUtoRyxNQUFMLENBQVlnRyxHQUFaLENBQW5CO0FBQy9CLEdBN0txQyxDQStLdEM7OztBQUNBLE1BQUksS0FBS3JGLE9BQVQsRUFBa0I7QUFDaEIsUUFBSWxDLE1BQU0sQ0FBQyxLQUFLc0IsT0FBTixFQUFlLFFBQWYsQ0FBVixFQUFvQztBQUNsQztBQUNBLFVBQU1nSixZQUFZLEdBQUcsSUFBSTlLLFNBQVMsQ0FBQ0EsU0FBZCxFQUFyQjtBQUNBOEssTUFBQUEsWUFBWSxDQUFDQyxVQUFiLENBQXdCLEtBQUtqSixPQUFMLENBQWFrSixNQUFiLENBQW9CckIsS0FBcEIsQ0FBMEIsR0FBMUIsQ0FBeEI7QUFDQW1CLE1BQUFBLFlBQVksQ0FBQ0MsVUFBYixDQUF3QixLQUFLckksT0FBTCxDQUFhaUgsS0FBYixDQUFtQixHQUFuQixDQUF4QjtBQUNBL0QsTUFBQUEsR0FBRyxDQUFDOEUsU0FBSixDQUNFLFFBREYsRUFFRUksWUFBWSxDQUFDRyxVQUFiLENBQXdCakwsU0FBUyxDQUFDa0wsZ0JBQVYsQ0FBMkJDLEdBQW5ELEVBQXdEQyxhQUF4RCxFQUZGO0FBSUQsS0FURCxNQVNPO0FBQ0x4RixNQUFBQSxHQUFHLENBQUM4RSxTQUFKLENBQWMsUUFBZCxFQUF3QixLQUFLaEksT0FBN0I7QUFDRDtBQUNGOztBQUVELFNBQU9rRCxHQUFQO0FBQ0QsQ0FoTUQ7QUFrTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE1RSxPQUFPLENBQUNxQyxTQUFSLENBQWtCbUIsUUFBbEIsR0FBNkIsVUFBVVAsS0FBVixFQUFpQjRCLEdBQWpCLEVBQXNCO0FBQ2pELE1BQUksS0FBS3dGLFlBQUwsQ0FBa0JwSCxLQUFsQixFQUF5QjRCLEdBQXpCLENBQUosRUFBbUM7QUFDakMsV0FBTyxLQUFLeUYsTUFBTCxFQUFQO0FBQ0QsR0FIZ0QsQ0FLakQ7OztBQUNBLE1BQU1DLEVBQUUsR0FBRyxLQUFLckUsU0FBTCxJQUFrQjVGLElBQTdCO0FBQ0EsT0FBSzRCLFlBQUw7QUFDQSxNQUFJLEtBQUtxQixNQUFULEVBQWlCLE9BQU9pSCxPQUFPLENBQUNDLElBQVIsQ0FBYSxpQ0FBYixDQUFQO0FBQ2pCLE9BQUtsSCxNQUFMLEdBQWMsSUFBZDs7QUFFQSxNQUFJLENBQUNOLEtBQUwsRUFBWTtBQUNWLFFBQUk7QUFDRixVQUFJLENBQUMsS0FBS3lILGFBQUwsQ0FBbUI3RixHQUFuQixDQUFMLEVBQThCO0FBQzVCLFlBQUk4RixPQUFPLEdBQUcsNEJBQWQ7O0FBQ0EsWUFBSTlGLEdBQUosRUFBUztBQUNQOEYsVUFBQUEsT0FBTyxHQUFHck0sSUFBSSxDQUFDc00sWUFBTCxDQUFrQi9GLEdBQUcsQ0FBQ2dHLE1BQXRCLEtBQWlDRixPQUEzQztBQUNEOztBQUVEMUgsUUFBQUEsS0FBSyxHQUFHLElBQUlWLEtBQUosQ0FBVW9JLE9BQVYsQ0FBUjtBQUNBMUgsUUFBQUEsS0FBSyxDQUFDNEgsTUFBTixHQUFlaEcsR0FBRyxHQUFHQSxHQUFHLENBQUNnRyxNQUFQLEdBQWdCN0ksU0FBbEM7QUFDRDtBQUNGLEtBVkQsQ0FVRSxPQUFPNEYsR0FBUCxFQUFZO0FBQ1ozRSxNQUFBQSxLQUFLLEdBQUcyRSxHQUFSO0FBQ0Q7QUFDRixHQXpCZ0QsQ0EyQmpEO0FBQ0E7OztBQUNBLE1BQUksQ0FBQzNFLEtBQUwsRUFBWTtBQUNWLFdBQU9zSCxFQUFFLENBQUMsSUFBRCxFQUFPMUYsR0FBUCxDQUFUO0FBQ0Q7O0FBRUQ1QixFQUFBQSxLQUFLLENBQUMwRyxRQUFOLEdBQWlCOUUsR0FBakI7QUFDQSxNQUFJLEtBQUtpRyxXQUFULEVBQXNCN0gsS0FBSyxDQUFDNEUsT0FBTixHQUFnQixLQUFLQyxRQUFMLEdBQWdCLENBQWhDLENBbEMyQixDQW9DakQ7QUFDQTs7QUFDQSxNQUFJN0UsS0FBSyxJQUFJLEtBQUs4SCxTQUFMLENBQWUsT0FBZixFQUF3QjVLLE1BQXhCLEdBQWlDLENBQTlDLEVBQWlEO0FBQy9DLFNBQUtpRCxJQUFMLENBQVUsT0FBVixFQUFtQkgsS0FBbkI7QUFDRDs7QUFFRHNILEVBQUFBLEVBQUUsQ0FBQ3RILEtBQUQsRUFBUTRCLEdBQVIsQ0FBRjtBQUNELENBM0NEO0FBNkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQTdFLE9BQU8sQ0FBQ3FDLFNBQVIsQ0FBa0IySSxPQUFsQixHQUE0QixVQUFVQyxNQUFWLEVBQWtCO0FBQzVDLFNBQ0V6RSxNQUFNLENBQUNVLFFBQVAsQ0FBZ0IrRCxNQUFoQixLQUNBQSxNQUFNLFlBQVk3TSxNQURsQixJQUVBNk0sTUFBTSxZQUFZcE0sUUFIcEI7QUFLRCxDQU5EO0FBUUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUFtQixPQUFPLENBQUNxQyxTQUFSLENBQWtCNkMsYUFBbEIsR0FBa0MsVUFBVWdHLElBQVYsRUFBZ0JDLEtBQWhCLEVBQXVCO0FBQ3ZELE1BQU14QixRQUFRLEdBQUcsSUFBSXJLLFFBQUosQ0FBYSxJQUFiLENBQWpCO0FBQ0EsT0FBS3FLLFFBQUwsR0FBZ0JBLFFBQWhCO0FBQ0FBLEVBQUFBLFFBQVEsQ0FBQ2xJLFNBQVQsR0FBcUIsS0FBS0ksYUFBMUI7O0FBQ0EsTUFBSUcsU0FBUyxLQUFLa0osSUFBbEIsRUFBd0I7QUFDdEJ2QixJQUFBQSxRQUFRLENBQUN1QixJQUFULEdBQWdCQSxJQUFoQjtBQUNEOztBQUVEdkIsRUFBQUEsUUFBUSxDQUFDd0IsS0FBVCxHQUFpQkEsS0FBakI7O0FBQ0EsTUFBSSxLQUFLbEYsVUFBVCxFQUFxQjtBQUNuQjBELElBQUFBLFFBQVEsQ0FBQ25GLElBQVQsR0FBZ0IsWUFBWTtBQUMxQixZQUFNLElBQUlqQyxLQUFKLENBQ0osaUVBREksQ0FBTjtBQUdELEtBSkQ7QUFLRDs7QUFFRCxPQUFLYSxJQUFMLENBQVUsVUFBVixFQUFzQnVHLFFBQXRCO0FBQ0EsU0FBT0EsUUFBUDtBQUNELENBbkJEOztBQXFCQTNKLE9BQU8sQ0FBQ3FDLFNBQVIsQ0FBa0JwQyxHQUFsQixHQUF3QixVQUFVc0ssRUFBVixFQUFjO0FBQ3BDLE9BQUszSyxPQUFMO0FBQ0FiLEVBQUFBLEtBQUssQ0FBQyxPQUFELEVBQVUsS0FBS2MsTUFBZixFQUF1QixLQUFLQyxHQUE1QixDQUFMOztBQUVBLE1BQUksS0FBS21HLFVBQVQsRUFBcUI7QUFDbkIsVUFBTSxJQUFJMUQsS0FBSixDQUNKLDhEQURJLENBQU47QUFHRDs7QUFFRCxPQUFLMEQsVUFBTCxHQUFrQixJQUFsQixDQVZvQyxDQVlwQzs7QUFDQSxPQUFLQyxTQUFMLEdBQWlCcUUsRUFBRSxJQUFJakssSUFBdkI7O0FBRUEsT0FBSzhLLElBQUw7QUFDRCxDQWhCRDs7QUFrQkFwTCxPQUFPLENBQUNxQyxTQUFSLENBQWtCK0ksSUFBbEIsR0FBeUIsWUFBWTtBQUFBOztBQUNuQyxNQUFJLEtBQUtqRyxRQUFULEVBQ0UsT0FBTyxLQUFLM0IsUUFBTCxDQUNMLElBQUlqQixLQUFKLENBQVUsNERBQVYsQ0FESyxDQUFQO0FBSUYsTUFBSStCLElBQUksR0FBRyxLQUFLMUIsS0FBaEI7QUFDQSxNQUFRZ0MsR0FBUixHQUFnQixJQUFoQixDQUFRQSxHQUFSO0FBQ0EsTUFBUS9FLE1BQVIsR0FBbUIsSUFBbkIsQ0FBUUEsTUFBUjs7QUFFQSxPQUFLd0wsWUFBTCxHQVZtQyxDQVluQzs7O0FBQ0EsTUFBSXhMLE1BQU0sS0FBSyxNQUFYLElBQXFCLENBQUMrRSxHQUFHLENBQUMwRyxXQUE5QixFQUEyQztBQUN6QztBQUNBLFFBQUksT0FBT2hILElBQVAsS0FBZ0IsUUFBcEIsRUFBOEI7QUFDNUIsVUFBSWlILFdBQVcsR0FBRzNHLEdBQUcsQ0FBQzRHLFNBQUosQ0FBYyxjQUFkLENBQWxCLENBRDRCLENBRTVCOztBQUNBLFVBQUlELFdBQUosRUFBaUJBLFdBQVcsR0FBR0EsV0FBVyxDQUFDNUMsS0FBWixDQUFrQixHQUFsQixFQUF1QixDQUF2QixDQUFkO0FBQ2pCLFVBQUlsSSxTQUFTLEdBQUcsS0FBS2dMLFdBQUwsSUFBb0IxTCxPQUFPLENBQUNVLFNBQVIsQ0FBa0I4SyxXQUFsQixDQUFwQzs7QUFDQSxVQUFJLENBQUM5SyxTQUFELElBQWNpTCxNQUFNLENBQUNILFdBQUQsQ0FBeEIsRUFBdUM7QUFDckM5SyxRQUFBQSxTQUFTLEdBQUdWLE9BQU8sQ0FBQ1UsU0FBUixDQUFrQixrQkFBbEIsQ0FBWjtBQUNEOztBQUVELFVBQUlBLFNBQUosRUFBZTZELElBQUksR0FBRzdELFNBQVMsQ0FBQzZELElBQUQsQ0FBaEI7QUFDaEIsS0Fad0MsQ0FjekM7OztBQUNBLFFBQUlBLElBQUksSUFBSSxDQUFDTSxHQUFHLENBQUM0RyxTQUFKLENBQWMsZ0JBQWQsQ0FBYixFQUE4QztBQUM1QzVHLE1BQUFBLEdBQUcsQ0FBQzhFLFNBQUosQ0FDRSxnQkFERixFQUVFbEQsTUFBTSxDQUFDVSxRQUFQLENBQWdCNUMsSUFBaEIsSUFBd0JBLElBQUksQ0FBQ25FLE1BQTdCLEdBQXNDcUcsTUFBTSxDQUFDbUYsVUFBUCxDQUFrQnJILElBQWxCLENBRnhDO0FBSUQ7QUFDRixHQWxDa0MsQ0FvQ25DO0FBQ0E7OztBQUNBTSxFQUFBQSxHQUFHLENBQUMzQyxJQUFKLENBQVMsVUFBVCxFQUFxQixVQUFDNEMsR0FBRCxFQUFTO0FBQzVCOUYsSUFBQUEsS0FBSyxDQUFDLGFBQUQsRUFBZ0IsTUFBSSxDQUFDYyxNQUFyQixFQUE2QixNQUFJLENBQUNDLEdBQWxDLEVBQXVDK0UsR0FBRyxDQUFDRSxVQUEzQyxDQUFMOztBQUVBLFFBQUksTUFBSSxDQUFDNkcscUJBQVQsRUFBZ0M7QUFDOUIxSixNQUFBQSxZQUFZLENBQUMsTUFBSSxDQUFDMEoscUJBQU4sQ0FBWjtBQUNEOztBQUVELFFBQUksTUFBSSxDQUFDbEgsS0FBVCxFQUFnQjtBQUNkO0FBQ0Q7O0FBRUQsUUFBTW1ILEdBQUcsR0FBRyxNQUFJLENBQUM3RyxhQUFqQjtBQUNBLFFBQU1yRyxJQUFJLEdBQUdRLEtBQUssQ0FBQ3dFLElBQU4sQ0FBV2tCLEdBQUcsQ0FBQ1ksT0FBSixDQUFZLGNBQVosS0FBK0IsRUFBMUMsS0FBaUQsWUFBOUQ7QUFDQSxRQUFJOUIsSUFBSSxHQUFHaEYsSUFBSSxDQUFDZ0ssS0FBTCxDQUFXLEdBQVgsRUFBZ0IsQ0FBaEIsQ0FBWDtBQUNBLFFBQUloRixJQUFKLEVBQVVBLElBQUksR0FBR0EsSUFBSSxDQUFDbUksV0FBTCxHQUFtQkMsSUFBbkIsRUFBUDtBQUNWLFFBQU1DLFNBQVMsR0FBR3JJLElBQUksS0FBSyxXQUEzQjtBQUNBLFFBQU1zSSxRQUFRLEdBQUduSCxVQUFVLENBQUNELEdBQUcsQ0FBQ0UsVUFBTCxDQUEzQjtBQUNBLFFBQU1tSCxZQUFZLEdBQUcsTUFBSSxDQUFDQyxhQUExQjtBQUVBLElBQUEsTUFBSSxDQUFDdEgsR0FBTCxHQUFXQSxHQUFYLENBbkI0QixDQXFCNUI7O0FBQ0EsUUFBSW9ILFFBQVEsSUFBSSxNQUFJLENBQUN6SyxVQUFMLE9BQXNCcUssR0FBdEMsRUFBMkM7QUFDekMsYUFBTyxNQUFJLENBQUM1RyxTQUFMLENBQWVKLEdBQWYsQ0FBUDtBQUNEOztBQUVELFFBQUksTUFBSSxDQUFDaEYsTUFBTCxLQUFnQixNQUFwQixFQUE0QjtBQUMxQixNQUFBLE1BQUksQ0FBQ3VELElBQUwsQ0FBVSxLQUFWOztBQUNBLE1BQUEsTUFBSSxDQUFDSSxRQUFMLENBQWMsSUFBZCxFQUFvQixNQUFJLENBQUMwQixhQUFMLEVBQXBCOztBQUNBO0FBQ0QsS0E5QjJCLENBZ0M1Qjs7O0FBQ0EsUUFBSSxNQUFJLENBQUNFLFlBQUwsQ0FBa0JQLEdBQWxCLENBQUosRUFBNEI7QUFDMUJ4RixNQUFBQSxLQUFLLENBQUN1RixHQUFELEVBQU1DLEdBQU4sQ0FBTDtBQUNEOztBQUVELFFBQUlsRSxNQUFNLEdBQUcsTUFBSSxDQUFDNkUsT0FBbEI7O0FBQ0EsUUFBSTdFLE1BQU0sS0FBS3FCLFNBQVgsSUFBd0JyRCxJQUFJLElBQUlvQixPQUFPLENBQUNZLE1BQTVDLEVBQW9EO0FBQ2xEQSxNQUFBQSxNQUFNLEdBQUdPLE9BQU8sQ0FBQ25CLE9BQU8sQ0FBQ1ksTUFBUixDQUFlaEMsSUFBZixDQUFELENBQWhCO0FBQ0Q7O0FBRUQsUUFBSXlOLE1BQU0sR0FBRyxNQUFJLENBQUNDLE9BQWxCOztBQUNBLFFBQUlySyxTQUFTLEtBQUtyQixNQUFkLElBQXdCeUwsTUFBNUIsRUFBb0M7QUFDbEM1QixNQUFBQSxPQUFPLENBQUNDLElBQVIsQ0FDRSwwTEFERjtBQUdBOUosTUFBQUEsTUFBTSxHQUFHLElBQVQ7QUFDRDs7QUFFRCxRQUFJLENBQUN5TCxNQUFMLEVBQWE7QUFDWCxVQUFJRixZQUFKLEVBQWtCO0FBQ2hCRSxRQUFBQSxNQUFNLEdBQUdyTSxPQUFPLENBQUM5QixLQUFSLENBQWNxTyxLQUF2QixDQURnQixDQUNjOztBQUM5QjNMLFFBQUFBLE1BQU0sR0FBRyxJQUFUO0FBQ0QsT0FIRCxNQUdPLElBQUlxTCxTQUFKLEVBQWU7QUFDcEIsWUFBTU8sSUFBSSxHQUFHek4sVUFBVSxFQUF2QjtBQUNBc04sUUFBQUEsTUFBTSxHQUFHRyxJQUFJLENBQUN0TyxLQUFMLENBQVdrRSxJQUFYLENBQWdCb0ssSUFBaEIsQ0FBVDtBQUNBNUwsUUFBQUEsTUFBTSxHQUFHLElBQVQ7QUFDRCxPQUpNLE1BSUEsSUFBSTZMLGNBQWMsQ0FBQzdOLElBQUQsQ0FBbEIsRUFBMEI7QUFDL0J5TixRQUFBQSxNQUFNLEdBQUdyTSxPQUFPLENBQUM5QixLQUFSLENBQWNxTyxLQUF2QjtBQUNBM0wsUUFBQUEsTUFBTSxHQUFHLElBQVQsQ0FGK0IsQ0FFaEI7QUFDaEIsT0FITSxNQUdBLElBQUlaLE9BQU8sQ0FBQzlCLEtBQVIsQ0FBY1UsSUFBZCxDQUFKLEVBQXlCO0FBQzlCeU4sUUFBQUEsTUFBTSxHQUFHck0sT0FBTyxDQUFDOUIsS0FBUixDQUFjVSxJQUFkLENBQVQ7QUFDRCxPQUZNLE1BRUEsSUFBSWdGLElBQUksS0FBSyxNQUFiLEVBQXFCO0FBQzFCeUksUUFBQUEsTUFBTSxHQUFHck0sT0FBTyxDQUFDOUIsS0FBUixDQUFjd08sSUFBdkI7QUFDQTlMLFFBQUFBLE1BQU0sR0FBR0EsTUFBTSxLQUFLLEtBQXBCLENBRjBCLENBSTFCO0FBQ0QsT0FMTSxNQUtBLElBQUkrSyxNQUFNLENBQUMvTSxJQUFELENBQVYsRUFBa0I7QUFDdkJ5TixRQUFBQSxNQUFNLEdBQUdyTSxPQUFPLENBQUM5QixLQUFSLENBQWMsa0JBQWQsQ0FBVDtBQUNBMEMsUUFBQUEsTUFBTSxHQUFHQSxNQUFNLEtBQUssS0FBcEI7QUFDRCxPQUhNLE1BR0EsSUFBSUEsTUFBSixFQUFZO0FBQ2pCeUwsUUFBQUEsTUFBTSxHQUFHck0sT0FBTyxDQUFDOUIsS0FBUixDQUFjd08sSUFBdkI7QUFDRCxPQUZNLE1BRUEsSUFBSXpLLFNBQVMsS0FBS3JCLE1BQWxCLEVBQTBCO0FBQy9CeUwsUUFBQUEsTUFBTSxHQUFHck0sT0FBTyxDQUFDOUIsS0FBUixDQUFjcU8sS0FBdkIsQ0FEK0IsQ0FDRDs7QUFDOUIzTCxRQUFBQSxNQUFNLEdBQUcsSUFBVDtBQUNEO0FBQ0YsS0E3RTJCLENBK0U1Qjs7O0FBQ0EsUUFBS3FCLFNBQVMsS0FBS3JCLE1BQWQsSUFBd0IrTCxNQUFNLENBQUMvTixJQUFELENBQS9CLElBQTBDK00sTUFBTSxDQUFDL00sSUFBRCxDQUFwRCxFQUE0RDtBQUMxRGdDLE1BQUFBLE1BQU0sR0FBRyxJQUFUO0FBQ0Q7O0FBRUQsSUFBQSxNQUFJLENBQUNnTSxZQUFMLEdBQW9CaE0sTUFBcEI7QUFDQSxRQUFJaU0sZ0JBQWdCLEdBQUcsS0FBdkI7O0FBQ0EsUUFBSWpNLE1BQUosRUFBWTtBQUNWO0FBQ0EsVUFBSWtNLGlCQUFpQixHQUFHLE1BQUksQ0FBQ0MsZ0JBQUwsSUFBeUIsU0FBakQ7QUFDQWpJLE1BQUFBLEdBQUcsQ0FBQzdCLEVBQUosQ0FBTyxNQUFQLEVBQWUsVUFBQytKLEdBQUQsRUFBUztBQUN0QkYsUUFBQUEsaUJBQWlCLElBQUlFLEdBQUcsQ0FBQ3BCLFVBQUosSUFBa0JvQixHQUFHLENBQUM1TSxNQUFKLEdBQWEsQ0FBL0IsR0FBbUM0TSxHQUFHLENBQUM1TSxNQUF2QyxHQUFnRCxDQUFyRTs7QUFDQSxZQUFJME0saUJBQWlCLEdBQUcsQ0FBeEIsRUFBMkI7QUFDekI7QUFDQSxjQUFNNUosS0FBSyxHQUFHLElBQUlWLEtBQUosQ0FBVSwrQkFBVixDQUFkO0FBQ0FVLFVBQUFBLEtBQUssQ0FBQ3NDLElBQU4sR0FBYSxXQUFiLENBSHlCLENBSXpCO0FBQ0E7O0FBQ0FxSCxVQUFBQSxnQkFBZ0IsR0FBRyxLQUFuQixDQU55QixDQU96Qjs7QUFDQS9ILFVBQUFBLEdBQUcsQ0FBQ21JLE9BQUosQ0FBWS9KLEtBQVosRUFSeUIsQ0FTekI7O0FBQ0EsVUFBQSxNQUFJLENBQUNPLFFBQUwsQ0FBY1AsS0FBZCxFQUFxQixJQUFyQjtBQUNEO0FBQ0YsT0FkRDtBQWVEOztBQUVELFFBQUltSixNQUFKLEVBQVk7QUFDVixVQUFJO0FBQ0Y7QUFDQTtBQUNBUSxRQUFBQSxnQkFBZ0IsR0FBR2pNLE1BQW5CO0FBRUF5TCxRQUFBQSxNQUFNLENBQUN2SCxHQUFELEVBQU0sVUFBQzVCLEtBQUQsRUFBUWdJLE1BQVIsRUFBZ0JFLEtBQWhCLEVBQTBCO0FBQ3BDLGNBQUksTUFBSSxDQUFDOEIsUUFBVCxFQUFtQjtBQUNqQjtBQUNBO0FBQ0QsV0FKbUMsQ0FNcEM7QUFDQTs7O0FBQ0EsY0FBSWhLLEtBQUssSUFBSSxDQUFDLE1BQUksQ0FBQ2tDLFFBQW5CLEVBQTZCO0FBQzNCLG1CQUFPLE1BQUksQ0FBQzNCLFFBQUwsQ0FBY1AsS0FBZCxDQUFQO0FBQ0Q7O0FBRUQsY0FBSTJKLGdCQUFKLEVBQXNCO0FBQ3BCLFlBQUEsTUFBSSxDQUFDeEosSUFBTCxDQUFVLEtBQVY7O0FBQ0EsWUFBQSxNQUFJLENBQUNJLFFBQUwsQ0FBYyxJQUFkLEVBQW9CLE1BQUksQ0FBQzBCLGFBQUwsQ0FBbUIrRixNQUFuQixFQUEyQkUsS0FBM0IsQ0FBcEI7QUFDRDtBQUNGLFNBaEJLLENBQU47QUFpQkQsT0F0QkQsQ0FzQkUsT0FBT3ZELEdBQVAsRUFBWTtBQUNaLFFBQUEsTUFBSSxDQUFDcEUsUUFBTCxDQUFjb0UsR0FBZDs7QUFDQTtBQUNEO0FBQ0Y7O0FBRUQsSUFBQSxNQUFJLENBQUMvQyxHQUFMLEdBQVdBLEdBQVgsQ0F2STRCLENBeUk1Qjs7QUFDQSxRQUFJLENBQUNsRSxNQUFMLEVBQWE7QUFDWDVCLE1BQUFBLEtBQUssQ0FBQyxrQkFBRCxFQUFxQixNQUFJLENBQUNjLE1BQTFCLEVBQWtDLE1BQUksQ0FBQ0MsR0FBdkMsQ0FBTDs7QUFDQSxNQUFBLE1BQUksQ0FBQzBELFFBQUwsQ0FBYyxJQUFkLEVBQW9CLE1BQUksQ0FBQzBCLGFBQUwsRUFBcEI7O0FBQ0EsVUFBSThHLFNBQUosRUFBZSxPQUhKLENBR1k7O0FBQ3ZCbkgsTUFBQUEsR0FBRyxDQUFDNUMsSUFBSixDQUFTLEtBQVQsRUFBZ0IsWUFBTTtBQUNwQmxELFFBQUFBLEtBQUssQ0FBQyxXQUFELEVBQWMsTUFBSSxDQUFDYyxNQUFuQixFQUEyQixNQUFJLENBQUNDLEdBQWhDLENBQUw7O0FBQ0EsUUFBQSxNQUFJLENBQUNzRCxJQUFMLENBQVUsS0FBVjtBQUNELE9BSEQ7QUFJQTtBQUNELEtBbkoyQixDQXFKNUI7OztBQUNBeUIsSUFBQUEsR0FBRyxDQUFDNUMsSUFBSixDQUFTLE9BQVQsRUFBa0IsVUFBQ2dCLEtBQUQsRUFBVztBQUMzQjJKLE1BQUFBLGdCQUFnQixHQUFHLEtBQW5COztBQUNBLE1BQUEsTUFBSSxDQUFDcEosUUFBTCxDQUFjUCxLQUFkLEVBQXFCLElBQXJCO0FBQ0QsS0FIRDtBQUlBLFFBQUksQ0FBQzJKLGdCQUFMLEVBQ0UvSCxHQUFHLENBQUM1QyxJQUFKLENBQVMsS0FBVCxFQUFnQixZQUFNO0FBQ3BCbEQsTUFBQUEsS0FBSyxDQUFDLFdBQUQsRUFBYyxNQUFJLENBQUNjLE1BQW5CLEVBQTJCLE1BQUksQ0FBQ0MsR0FBaEMsQ0FBTCxDQURvQixDQUVwQjs7QUFDQSxNQUFBLE1BQUksQ0FBQ3NELElBQUwsQ0FBVSxLQUFWOztBQUNBLE1BQUEsTUFBSSxDQUFDSSxRQUFMLENBQWMsSUFBZCxFQUFvQixNQUFJLENBQUMwQixhQUFMLEVBQXBCO0FBQ0QsS0FMRDtBQU1ILEdBaktEO0FBbUtBLE9BQUs5QixJQUFMLENBQVUsU0FBVixFQUFxQixJQUFyQjs7QUFFQSxNQUFNOEosa0JBQWtCLEdBQUcsU0FBckJBLGtCQUFxQixHQUFNO0FBQy9CLFFBQU1DLGdCQUFnQixHQUFHLElBQXpCO0FBQ0EsUUFBTUMsS0FBSyxHQUFHeEksR0FBRyxDQUFDNEcsU0FBSixDQUFjLGdCQUFkLENBQWQ7QUFDQSxRQUFJNkIsTUFBTSxHQUFHLENBQWI7QUFFQSxRQUFNQyxRQUFRLEdBQUcsSUFBSWxQLE1BQU0sQ0FBQ21QLFNBQVgsRUFBakI7O0FBQ0FELElBQUFBLFFBQVEsQ0FBQ0UsVUFBVCxHQUFzQixVQUFDQyxLQUFELEVBQVFsSixRQUFSLEVBQWtCZixRQUFsQixFQUErQjtBQUNuRDZKLE1BQUFBLE1BQU0sSUFBSUksS0FBSyxDQUFDdE4sTUFBaEI7O0FBQ0EsTUFBQSxNQUFJLENBQUNpRCxJQUFMLENBQVUsVUFBVixFQUFzQjtBQUNwQnNLLFFBQUFBLFNBQVMsRUFBRSxRQURTO0FBRXBCUCxRQUFBQSxnQkFBZ0IsRUFBaEJBLGdCQUZvQjtBQUdwQkUsUUFBQUEsTUFBTSxFQUFOQSxNQUhvQjtBQUlwQkQsUUFBQUEsS0FBSyxFQUFMQTtBQUpvQixPQUF0Qjs7QUFNQTVKLE1BQUFBLFFBQVEsQ0FBQyxJQUFELEVBQU9pSyxLQUFQLENBQVI7QUFDRCxLQVREOztBQVdBLFdBQU9ILFFBQVA7QUFDRCxHQWxCRDs7QUFvQkEsTUFBTUssY0FBYyxHQUFHLFNBQWpCQSxjQUFpQixDQUFDaE4sTUFBRCxFQUFZO0FBQ2pDLFFBQU1pTixTQUFTLEdBQUcsS0FBSyxJQUF2QixDQURpQyxDQUNKOztBQUM3QixRQUFNQyxRQUFRLEdBQUcsSUFBSXpQLE1BQU0sQ0FBQzBQLFFBQVgsRUFBakI7QUFDQSxRQUFNQyxXQUFXLEdBQUdwTixNQUFNLENBQUNSLE1BQTNCO0FBQ0EsUUFBTTZOLFNBQVMsR0FBR0QsV0FBVyxHQUFHSCxTQUFoQztBQUNBLFFBQU1LLE1BQU0sR0FBR0YsV0FBVyxHQUFHQyxTQUE3Qjs7QUFFQSxTQUFLLElBQUkzRixDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHNEYsTUFBcEIsRUFBNEI1RixDQUFDLElBQUl1RixTQUFqQyxFQUE0QztBQUMxQyxVQUFNSCxLQUFLLEdBQUc5TSxNQUFNLENBQUN3SCxLQUFQLENBQWFFLENBQWIsRUFBZ0JBLENBQUMsR0FBR3VGLFNBQXBCLENBQWQ7QUFDQUMsTUFBQUEsUUFBUSxDQUFDM0osSUFBVCxDQUFjdUosS0FBZDtBQUNEOztBQUVELFFBQUlPLFNBQVMsR0FBRyxDQUFoQixFQUFtQjtBQUNqQixVQUFNRSxlQUFlLEdBQUd2TixNQUFNLENBQUN3SCxLQUFQLENBQWEsQ0FBQzZGLFNBQWQsQ0FBeEI7QUFDQUgsTUFBQUEsUUFBUSxDQUFDM0osSUFBVCxDQUFjZ0ssZUFBZDtBQUNEOztBQUVETCxJQUFBQSxRQUFRLENBQUMzSixJQUFULENBQWMsSUFBZCxFQWpCaUMsQ0FpQlo7O0FBRXJCLFdBQU8ySixRQUFQO0FBQ0QsR0FwQkQsQ0EvTm1DLENBcVBuQzs7O0FBQ0EsTUFBTTNLLFFBQVEsR0FBRyxLQUFLNUIsU0FBdEI7O0FBQ0EsTUFBSTRCLFFBQUosRUFBYztBQUNaO0FBQ0EsUUFBTXVDLE9BQU8sR0FBR3ZDLFFBQVEsQ0FBQzBDLFVBQVQsRUFBaEI7O0FBQ0EsU0FBSyxJQUFNeUMsQ0FBWCxJQUFnQjVDLE9BQWhCLEVBQXlCO0FBQ3ZCLFVBQUlqRyxNQUFNLENBQUNpRyxPQUFELEVBQVU0QyxDQUFWLENBQVYsRUFBd0I7QUFDdEJ0SixRQUFBQSxLQUFLLENBQUMsbUNBQUQsRUFBc0NzSixDQUF0QyxFQUF5QzVDLE9BQU8sQ0FBQzRDLENBQUQsQ0FBaEQsQ0FBTDtBQUNBekQsUUFBQUEsR0FBRyxDQUFDOEUsU0FBSixDQUFjckIsQ0FBZCxFQUFpQjVDLE9BQU8sQ0FBQzRDLENBQUQsQ0FBeEI7QUFDRDtBQUNGLEtBUlcsQ0FVWjs7O0FBQ0FuRixJQUFBQSxRQUFRLENBQUNpTCxTQUFULENBQW1CLFVBQUNsTCxLQUFELEVBQVE5QyxNQUFSLEVBQW1CO0FBQ3BDO0FBQ0EsVUFBSThDLEtBQUosRUFBV2xFLEtBQUssQ0FBQyw4QkFBRCxFQUFpQ2tFLEtBQWpDLEVBQXdDOUMsTUFBeEMsQ0FBTDtBQUVYcEIsTUFBQUEsS0FBSyxDQUFDLGlDQUFELEVBQW9Db0IsTUFBcEMsQ0FBTDs7QUFDQSxVQUFJLE9BQU9BLE1BQVAsS0FBa0IsUUFBdEIsRUFBZ0M7QUFDOUJ5RSxRQUFBQSxHQUFHLENBQUM4RSxTQUFKLENBQWMsZ0JBQWQsRUFBZ0N2SixNQUFoQztBQUNEOztBQUVEK0MsTUFBQUEsUUFBUSxDQUFDc0IsSUFBVCxDQUFjMEksa0JBQWtCLEVBQWhDLEVBQW9DMUksSUFBcEMsQ0FBeUNJLEdBQXpDO0FBQ0QsS0FWRDtBQVdELEdBdEJELE1Bc0JPLElBQUk0QixNQUFNLENBQUNVLFFBQVAsQ0FBZ0I1QyxJQUFoQixDQUFKLEVBQTJCO0FBQ2hDcUosSUFBQUEsY0FBYyxDQUFDckosSUFBRCxDQUFkLENBQXFCRSxJQUFyQixDQUEwQjBJLGtCQUFrQixFQUE1QyxFQUFnRDFJLElBQWhELENBQXFESSxHQUFyRDtBQUNELEdBRk0sTUFFQTtBQUNMQSxJQUFBQSxHQUFHLENBQUMzRSxHQUFKLENBQVFxRSxJQUFSO0FBQ0Q7QUFDRixDQWxSRCxDLENBb1JBOzs7QUFDQXRFLE9BQU8sQ0FBQ3FDLFNBQVIsQ0FBa0IrQyxZQUFsQixHQUFpQyxVQUFDUCxHQUFELEVBQVM7QUFDeEMsTUFBSUEsR0FBRyxDQUFDRSxVQUFKLEtBQW1CLEdBQW5CLElBQTBCRixHQUFHLENBQUNFLFVBQUosS0FBbUIsR0FBakQsRUFBc0Q7QUFDcEQ7QUFDQSxXQUFPLEtBQVA7QUFDRCxHQUp1QyxDQU14Qzs7O0FBQ0EsTUFBSUYsR0FBRyxDQUFDWSxPQUFKLENBQVksZ0JBQVosTUFBa0MsR0FBdEMsRUFBMkM7QUFDekM7QUFDQSxXQUFPLEtBQVA7QUFDRCxHQVZ1QyxDQVl4Qzs7O0FBQ0EsU0FBTywyQkFBMkJnRCxJQUEzQixDQUFnQzVELEdBQUcsQ0FBQ1ksT0FBSixDQUFZLGtCQUFaLENBQWhDLENBQVA7QUFDRCxDQWREO0FBZ0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQXpGLE9BQU8sQ0FBQ3FDLFNBQVIsQ0FBa0IrTCxPQUFsQixHQUE0QixVQUFVQyxlQUFWLEVBQTJCO0FBQ3JELE1BQUksT0FBT0EsZUFBUCxLQUEyQixRQUEvQixFQUF5QztBQUN2QyxTQUFLdkYsZ0JBQUwsR0FBd0I7QUFBRSxXQUFLdUY7QUFBUCxLQUF4QjtBQUNELEdBRkQsTUFFTyxJQUFJLFFBQU9BLGVBQVAsTUFBMkIsUUFBL0IsRUFBeUM7QUFDOUMsU0FBS3ZGLGdCQUFMLEdBQXdCdUYsZUFBeEI7QUFDRCxHQUZNLE1BRUE7QUFDTCxTQUFLdkYsZ0JBQUwsR0FBd0I5RyxTQUF4QjtBQUNEOztBQUVELFNBQU8sSUFBUDtBQUNELENBVkQ7O0FBWUFoQyxPQUFPLENBQUNxQyxTQUFSLENBQWtCaU0sY0FBbEIsR0FBbUMsVUFBVUMsTUFBVixFQUFrQjtBQUNuRCxPQUFLakYsZUFBTCxHQUF1QmlGLE1BQU0sS0FBS3ZNLFNBQVgsR0FBdUIsSUFBdkIsR0FBOEJ1TSxNQUFyRDtBQUNBLFNBQU8sSUFBUDtBQUNELENBSEQsQyxDQUtBOzs7QUFDQSxJQUFJLENBQUMzUCxPQUFPLENBQUNpRixRQUFSLENBQWlCLEtBQWpCLENBQUwsRUFBOEI7QUFDNUI7QUFDQTtBQUNBO0FBQ0FqRixFQUFBQSxPQUFPLHNCQUFPQSxPQUFQLENBQVA7QUFDQUEsRUFBQUEsT0FBTyxDQUFDc0YsSUFBUixDQUFhLEtBQWI7QUFDRDs7MkNBRWtCdEYsTzs7Ozs7UUFBVmlCLE07QUFDUCxRQUFNMk8sSUFBSSxHQUFHM08sTUFBYjtBQUNBQSxJQUFBQSxNQUFNLEdBQUdBLE1BQU0sS0FBSyxLQUFYLEdBQW1CLFFBQW5CLEdBQThCQSxNQUF2QztBQUVBQSxJQUFBQSxNQUFNLEdBQUdBLE1BQU0sQ0FBQzRPLFdBQVAsRUFBVDs7QUFDQTdPLElBQUFBLE9BQU8sQ0FBQzRPLElBQUQsQ0FBUCxHQUFnQixVQUFDMU8sR0FBRCxFQUFNd0UsSUFBTixFQUFZaUcsRUFBWixFQUFtQjtBQUNqQyxVQUFNMUosUUFBUSxHQUFHakIsT0FBTyxDQUFDQyxNQUFELEVBQVNDLEdBQVQsQ0FBeEI7O0FBQ0EsVUFBSSxPQUFPd0UsSUFBUCxLQUFnQixVQUFwQixFQUFnQztBQUM5QmlHLFFBQUFBLEVBQUUsR0FBR2pHLElBQUw7QUFDQUEsUUFBQUEsSUFBSSxHQUFHLElBQVA7QUFDRDs7QUFFRCxVQUFJQSxJQUFKLEVBQVU7QUFDUixZQUFJekUsTUFBTSxLQUFLLEtBQVgsSUFBb0JBLE1BQU0sS0FBSyxNQUFuQyxFQUEyQztBQUN6Q2dCLFVBQUFBLFFBQVEsQ0FBQ21ELEtBQVQsQ0FBZU0sSUFBZjtBQUNELFNBRkQsTUFFTztBQUNMekQsVUFBQUEsUUFBUSxDQUFDNk4sSUFBVCxDQUFjcEssSUFBZDtBQUNEO0FBQ0Y7O0FBRUQsVUFBSWlHLEVBQUosRUFBUTFKLFFBQVEsQ0FBQ1osR0FBVCxDQUFhc0ssRUFBYjtBQUNSLGFBQU8xSixRQUFQO0FBQ0QsS0FqQkQ7OztBQUxGLHNEQUE0QjtBQUFBO0FBdUIzQjtBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQUVBLFNBQVM2TCxNQUFULENBQWdCL04sSUFBaEIsRUFBc0I7QUFDcEIsTUFBTWdRLEtBQUssR0FBR2hRLElBQUksQ0FBQ2dLLEtBQUwsQ0FBVyxHQUFYLENBQWQ7QUFDQSxNQUFJaEYsSUFBSSxHQUFHZ0wsS0FBSyxDQUFDLENBQUQsQ0FBaEI7QUFDQSxNQUFJaEwsSUFBSixFQUFVQSxJQUFJLEdBQUdBLElBQUksQ0FBQ21JLFdBQUwsR0FBbUJDLElBQW5CLEVBQVA7QUFDVixNQUFJNkMsT0FBTyxHQUFHRCxLQUFLLENBQUMsQ0FBRCxDQUFuQjtBQUNBLE1BQUlDLE9BQUosRUFBYUEsT0FBTyxHQUFHQSxPQUFPLENBQUM5QyxXQUFSLEdBQXNCQyxJQUF0QixFQUFWO0FBRWIsU0FBT3BJLElBQUksS0FBSyxNQUFULElBQW1CaUwsT0FBTyxLQUFLLHVCQUF0QztBQUNEOztBQUVELFNBQVNwQyxjQUFULENBQXdCN04sSUFBeEIsRUFBOEI7QUFDNUIsTUFBSWdGLElBQUksR0FBR2hGLElBQUksQ0FBQ2dLLEtBQUwsQ0FBVyxHQUFYLEVBQWdCLENBQWhCLENBQVg7QUFDQSxNQUFJaEYsSUFBSixFQUFVQSxJQUFJLEdBQUdBLElBQUksQ0FBQ21JLFdBQUwsR0FBbUJDLElBQW5CLEVBQVA7QUFFVixTQUFPcEksSUFBSSxLQUFLLE9BQVQsSUFBb0JBLElBQUksS0FBSyxPQUFwQztBQUNEO0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBLFNBQVMrSCxNQUFULENBQWdCL00sSUFBaEIsRUFBc0I7QUFDcEI7QUFDQTtBQUNBLFNBQU8sc0JBQXNCOEosSUFBdEIsQ0FBMkI5SixJQUEzQixDQUFQO0FBQ0Q7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUEsU0FBU21HLFVBQVQsQ0FBb0JTLElBQXBCLEVBQTBCO0FBQ3hCLFNBQU8sQ0FBQyxHQUFELEVBQU0sR0FBTixFQUFXLEdBQVgsRUFBZ0IsR0FBaEIsRUFBcUIsR0FBckIsRUFBMEIsR0FBMUIsRUFBK0IxQixRQUEvQixDQUF3QzBCLElBQXhDLENBQVA7QUFDRCIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogTW9kdWxlIGRlcGVuZGVuY2llcy5cbiAqL1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm9kZS9uby1kZXByZWNhdGVkLWFwaVxuY29uc3QgeyBwYXJzZSwgZm9ybWF0LCByZXNvbHZlIH0gPSByZXF1aXJlKCd1cmwnKTtcbmNvbnN0IFN0cmVhbSA9IHJlcXVpcmUoJ3N0cmVhbScpO1xuY29uc3QgaHR0cHMgPSByZXF1aXJlKCdodHRwcycpO1xuY29uc3QgaHR0cCA9IHJlcXVpcmUoJ2h0dHAnKTtcbmNvbnN0IGZzID0gcmVxdWlyZSgnZnMnKTtcbmNvbnN0IHpsaWIgPSByZXF1aXJlKCd6bGliJyk7XG5jb25zdCB1dGlsID0gcmVxdWlyZSgndXRpbCcpO1xuY29uc3QgcXMgPSByZXF1aXJlKCdxcycpO1xuY29uc3QgbWltZSA9IHJlcXVpcmUoJ21pbWUnKTtcbmxldCBtZXRob2RzID0gcmVxdWlyZSgnbWV0aG9kcycpO1xuY29uc3QgRm9ybURhdGEgPSByZXF1aXJlKCdmb3JtLWRhdGEnKTtcbmNvbnN0IGZvcm1pZGFibGUgPSByZXF1aXJlKCdmb3JtaWRhYmxlJyk7XG5jb25zdCBkZWJ1ZyA9IHJlcXVpcmUoJ2RlYnVnJykoJ3N1cGVyYWdlbnQnKTtcbmNvbnN0IENvb2tpZUphciA9IHJlcXVpcmUoJ2Nvb2tpZWphcicpO1xuY29uc3Qgc2VtdmVyR3RlID0gcmVxdWlyZSgnc2VtdmVyL2Z1bmN0aW9ucy9ndGUnKTtcbmNvbnN0IHNhZmVTdHJpbmdpZnkgPSByZXF1aXJlKCdmYXN0LXNhZmUtc3RyaW5naWZ5Jyk7XG5cbmNvbnN0IHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMnKTtcbmNvbnN0IFJlcXVlc3RCYXNlID0gcmVxdWlyZSgnLi4vcmVxdWVzdC1iYXNlJyk7XG5jb25zdCB7IHVuemlwIH0gPSByZXF1aXJlKCcuL3VuemlwJyk7XG5jb25zdCBSZXNwb25zZSA9IHJlcXVpcmUoJy4vcmVzcG9uc2UnKTtcblxuY29uc3QgeyBtaXhpbiwgaGFzT3duIH0gPSB1dGlscztcblxubGV0IGh0dHAyO1xuXG5pZiAoc2VtdmVyR3RlKHByb2Nlc3MudmVyc2lvbiwgJ3YxMC4xMC4wJykpIGh0dHAyID0gcmVxdWlyZSgnLi9odHRwMndyYXBwZXInKTtcblxuZnVuY3Rpb24gcmVxdWVzdChtZXRob2QsIHVybCkge1xuICAvLyBjYWxsYmFja1xuICBpZiAodHlwZW9mIHVybCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBuZXcgZXhwb3J0cy5SZXF1ZXN0KCdHRVQnLCBtZXRob2QpLmVuZCh1cmwpO1xuICB9XG5cbiAgLy8gdXJsIGZpcnN0XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgcmV0dXJuIG5ldyBleHBvcnRzLlJlcXVlc3QoJ0dFVCcsIG1ldGhvZCk7XG4gIH1cblxuICByZXR1cm4gbmV3IGV4cG9ydHMuUmVxdWVzdChtZXRob2QsIHVybCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWVzdDtcbmV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cztcblxuLyoqXG4gKiBFeHBvc2UgYFJlcXVlc3RgLlxuICovXG5cbmV4cG9ydHMuUmVxdWVzdCA9IFJlcXVlc3Q7XG5cbi8qKlxuICogRXhwb3NlIHRoZSBhZ2VudCBmdW5jdGlvblxuICovXG5cbmV4cG9ydHMuYWdlbnQgPSByZXF1aXJlKCcuL2FnZW50Jyk7XG5cbi8qKlxuICogTm9vcC5cbiAqL1xuXG5mdW5jdGlvbiBub29wKCkge31cblxuLyoqXG4gKiBFeHBvc2UgYFJlc3BvbnNlYC5cbiAqL1xuXG5leHBvcnRzLlJlc3BvbnNlID0gUmVzcG9uc2U7XG5cbi8qKlxuICogRGVmaW5lIFwiZm9ybVwiIG1pbWUgdHlwZS5cbiAqL1xuXG5taW1lLmRlZmluZShcbiAge1xuICAgICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnOiBbJ2Zvcm0nLCAndXJsZW5jb2RlZCcsICdmb3JtLWRhdGEnXVxuICB9LFxuICB0cnVlXG4pO1xuXG4vKipcbiAqIFByb3RvY29sIG1hcC5cbiAqL1xuXG5leHBvcnRzLnByb3RvY29scyA9IHtcbiAgJ2h0dHA6JzogaHR0cCxcbiAgJ2h0dHBzOic6IGh0dHBzLFxuICAnaHR0cDI6JzogaHR0cDJcbn07XG5cbi8qKlxuICogRGVmYXVsdCBzZXJpYWxpemF0aW9uIG1hcC5cbiAqXG4gKiAgICAgc3VwZXJhZ2VudC5zZXJpYWxpemVbJ2FwcGxpY2F0aW9uL3htbCddID0gZnVuY3Rpb24ob2JqKXtcbiAqICAgICAgIHJldHVybiAnZ2VuZXJhdGVkIHhtbCBoZXJlJztcbiAqICAgICB9O1xuICpcbiAqL1xuXG5leHBvcnRzLnNlcmlhbGl6ZSA9IHtcbiAgJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCc6IHFzLnN0cmluZ2lmeSxcbiAgJ2FwcGxpY2F0aW9uL2pzb24nOiBzYWZlU3RyaW5naWZ5XG59O1xuXG4vKipcbiAqIERlZmF1bHQgcGFyc2Vycy5cbiAqXG4gKiAgICAgc3VwZXJhZ2VudC5wYXJzZVsnYXBwbGljYXRpb24veG1sJ10gPSBmdW5jdGlvbihyZXMsIGZuKXtcbiAqICAgICAgIGZuKG51bGwsIHJlcyk7XG4gKiAgICAgfTtcbiAqXG4gKi9cblxuZXhwb3J0cy5wYXJzZSA9IHJlcXVpcmUoJy4vcGFyc2VycycpO1xuXG4vKipcbiAqIERlZmF1bHQgYnVmZmVyaW5nIG1hcC4gQ2FuIGJlIHVzZWQgdG8gc2V0IGNlcnRhaW5cbiAqIHJlc3BvbnNlIHR5cGVzIHRvIGJ1ZmZlci9ub3QgYnVmZmVyLlxuICpcbiAqICAgICBzdXBlcmFnZW50LmJ1ZmZlclsnYXBwbGljYXRpb24veG1sJ10gPSB0cnVlO1xuICovXG5leHBvcnRzLmJ1ZmZlciA9IHt9O1xuXG4vKipcbiAqIEluaXRpYWxpemUgaW50ZXJuYWwgaGVhZGVyIHRyYWNraW5nIHByb3BlcnRpZXMgb24gYSByZXF1ZXN0IGluc3RhbmNlLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSByZXEgdGhlIGluc3RhbmNlXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gX2luaXRIZWFkZXJzKHJlcXVlc3RfKSB7XG4gIHJlcXVlc3RfLl9oZWFkZXIgPSB7XG4gICAgLy8gY29lcmNlcyBoZWFkZXIgbmFtZXMgdG8gbG93ZXJjYXNlXG4gIH07XG4gIHJlcXVlc3RfLmhlYWRlciA9IHtcbiAgICAvLyBwcmVzZXJ2ZXMgaGVhZGVyIG5hbWUgY2FzZVxuICB9O1xufVxuXG4vKipcbiAqIEluaXRpYWxpemUgYSBuZXcgYFJlcXVlc3RgIHdpdGggdGhlIGdpdmVuIGBtZXRob2RgIGFuZCBgdXJsYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbWV0aG9kXG4gKiBAcGFyYW0ge1N0cmluZ3xPYmplY3R9IHVybFxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBSZXF1ZXN0KG1ldGhvZCwgdXJsKSB7XG4gIFN0cmVhbS5jYWxsKHRoaXMpO1xuICBpZiAodHlwZW9mIHVybCAhPT0gJ3N0cmluZycpIHVybCA9IGZvcm1hdCh1cmwpO1xuICB0aGlzLl9lbmFibGVIdHRwMiA9IEJvb2xlYW4ocHJvY2Vzcy5lbnYuSFRUUDJfVEVTVCk7IC8vIGludGVybmFsIG9ubHlcbiAgdGhpcy5fYWdlbnQgPSBmYWxzZTtcbiAgdGhpcy5fZm9ybURhdGEgPSBudWxsO1xuICB0aGlzLm1ldGhvZCA9IG1ldGhvZDtcbiAgdGhpcy51cmwgPSB1cmw7XG4gIF9pbml0SGVhZGVycyh0aGlzKTtcbiAgdGhpcy53cml0YWJsZSA9IHRydWU7XG4gIHRoaXMuX3JlZGlyZWN0cyA9IDA7XG4gIHRoaXMucmVkaXJlY3RzKG1ldGhvZCA9PT0gJ0hFQUQnID8gMCA6IDUpO1xuICB0aGlzLmNvb2tpZXMgPSAnJztcbiAgdGhpcy5xcyA9IHt9O1xuICB0aGlzLl9xdWVyeSA9IFtdO1xuICB0aGlzLnFzUmF3ID0gdGhpcy5fcXVlcnk7IC8vIFVudXNlZCwgZm9yIGJhY2t3YXJkcyBjb21wYXRpYmlsaXR5IG9ubHlcbiAgdGhpcy5fcmVkaXJlY3RMaXN0ID0gW107XG4gIHRoaXMuX3N0cmVhbVJlcXVlc3QgPSBmYWxzZTtcbiAgdGhpcy5fbG9va3VwID0gdW5kZWZpbmVkO1xuICB0aGlzLm9uY2UoJ2VuZCcsIHRoaXMuY2xlYXJUaW1lb3V0LmJpbmQodGhpcykpO1xufVxuXG4vKipcbiAqIEluaGVyaXQgZnJvbSBgU3RyZWFtYCAod2hpY2ggaW5oZXJpdHMgZnJvbSBgRXZlbnRFbWl0dGVyYCkuXG4gKiBNaXhpbiBgUmVxdWVzdEJhc2VgLlxuICovXG51dGlsLmluaGVyaXRzKFJlcXVlc3QsIFN0cmVhbSk7XG5cbm1peGluKFJlcXVlc3QucHJvdG90eXBlLCBSZXF1ZXN0QmFzZS5wcm90b3R5cGUpO1xuXG4vKipcbiAqIEVuYWJsZSBvciBEaXNhYmxlIGh0dHAyLlxuICpcbiAqIEVuYWJsZSBodHRwMi5cbiAqXG4gKiBgYGAganNcbiAqIHJlcXVlc3QuZ2V0KCdodHRwOi8vbG9jYWxob3N0LycpXG4gKiAgIC5odHRwMigpXG4gKiAgIC5lbmQoY2FsbGJhY2spO1xuICpcbiAqIHJlcXVlc3QuZ2V0KCdodHRwOi8vbG9jYWxob3N0LycpXG4gKiAgIC5odHRwMih0cnVlKVxuICogICAuZW5kKGNhbGxiYWNrKTtcbiAqIGBgYFxuICpcbiAqIERpc2FibGUgaHR0cDIuXG4gKlxuICogYGBgIGpzXG4gKiByZXF1ZXN0ID0gcmVxdWVzdC5odHRwMigpO1xuICogcmVxdWVzdC5nZXQoJ2h0dHA6Ly9sb2NhbGhvc3QvJylcbiAqICAgLmh0dHAyKGZhbHNlKVxuICogICAuZW5kKGNhbGxiYWNrKTtcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gZW5hYmxlXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUuaHR0cDIgPSBmdW5jdGlvbiAoYm9vbCkge1xuICBpZiAoZXhwb3J0cy5wcm90b2NvbHNbJ2h0dHAyOiddID09PSB1bmRlZmluZWQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAnc3VwZXJhZ2VudDogdGhpcyB2ZXJzaW9uIG9mIE5vZGUuanMgZG9lcyBub3Qgc3VwcG9ydCBodHRwMidcbiAgICApO1xuICB9XG5cbiAgdGhpcy5fZW5hYmxlSHR0cDIgPSBib29sID09PSB1bmRlZmluZWQgPyB0cnVlIDogYm9vbDtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFF1ZXVlIHRoZSBnaXZlbiBgZmlsZWAgYXMgYW4gYXR0YWNobWVudCB0byB0aGUgc3BlY2lmaWVkIGBmaWVsZGAsXG4gKiB3aXRoIG9wdGlvbmFsIGBvcHRpb25zYCAob3IgZmlsZW5hbWUpLlxuICpcbiAqIGBgYCBqc1xuICogcmVxdWVzdC5wb3N0KCdodHRwOi8vbG9jYWxob3N0L3VwbG9hZCcpXG4gKiAgIC5hdHRhY2goJ2ZpZWxkJywgQnVmZmVyLmZyb20oJzxiPkhlbGxvIHdvcmxkPC9iPicpLCAnaGVsbG8uaHRtbCcpXG4gKiAgIC5lbmQoY2FsbGJhY2spO1xuICogYGBgXG4gKlxuICogQSBmaWxlbmFtZSBtYXkgYWxzbyBiZSB1c2VkOlxuICpcbiAqIGBgYCBqc1xuICogcmVxdWVzdC5wb3N0KCdodHRwOi8vbG9jYWxob3N0L3VwbG9hZCcpXG4gKiAgIC5hdHRhY2goJ2ZpbGVzJywgJ2ltYWdlLmpwZycpXG4gKiAgIC5lbmQoY2FsbGJhY2spO1xuICogYGBgXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGZpZWxkXG4gKiBAcGFyYW0ge1N0cmluZ3xmcy5SZWFkU3RyZWFtfEJ1ZmZlcn0gZmlsZVxuICogQHBhcmFtIHtTdHJpbmd8T2JqZWN0fSBvcHRpb25zXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUuYXR0YWNoID0gZnVuY3Rpb24gKGZpZWxkLCBmaWxlLCBvcHRpb25zKSB7XG4gIGlmIChmaWxlKSB7XG4gICAgaWYgKHRoaXMuX2RhdGEpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcInN1cGVyYWdlbnQgY2FuJ3QgbWl4IC5zZW5kKCkgYW5kIC5hdHRhY2goKVwiKTtcbiAgICB9XG5cbiAgICBsZXQgbyA9IG9wdGlvbnMgfHwge307XG4gICAgaWYgKHR5cGVvZiBvcHRpb25zID09PSAnc3RyaW5nJykge1xuICAgICAgbyA9IHsgZmlsZW5hbWU6IG9wdGlvbnMgfTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGZpbGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICBpZiAoIW8uZmlsZW5hbWUpIG8uZmlsZW5hbWUgPSBmaWxlO1xuICAgICAgZGVidWcoJ2NyZWF0aW5nIGBmcy5SZWFkU3RyZWFtYCBpbnN0YW5jZSBmb3IgZmlsZTogJXMnLCBmaWxlKTtcbiAgICAgIGZpbGUgPSBmcy5jcmVhdGVSZWFkU3RyZWFtKGZpbGUpO1xuICAgICAgZmlsZS5vbignZXJyb3InLCAoZXJyb3IpID0+IHtcbiAgICAgICAgY29uc3QgZm9ybURhdGEgPSB0aGlzLl9nZXRGb3JtRGF0YSgpO1xuICAgICAgICBmb3JtRGF0YS5lbWl0KCdlcnJvcicsIGVycm9yKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAoIW8uZmlsZW5hbWUgJiYgZmlsZS5wYXRoKSB7XG4gICAgICBvLmZpbGVuYW1lID0gZmlsZS5wYXRoO1xuICAgIH1cblxuICAgIHRoaXMuX2dldEZvcm1EYXRhKCkuYXBwZW5kKGZpZWxkLCBmaWxlLCBvKTtcbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuUmVxdWVzdC5wcm90b3R5cGUuX2dldEZvcm1EYXRhID0gZnVuY3Rpb24gKCkge1xuICBpZiAoIXRoaXMuX2Zvcm1EYXRhKSB7XG4gICAgdGhpcy5fZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcbiAgICB0aGlzLl9mb3JtRGF0YS5vbignZXJyb3InLCAoZXJyb3IpID0+IHtcbiAgICAgIGRlYnVnKCdGb3JtRGF0YSBlcnJvcicsIGVycm9yKTtcbiAgICAgIGlmICh0aGlzLmNhbGxlZCkge1xuICAgICAgICAvLyBUaGUgcmVxdWVzdCBoYXMgYWxyZWFkeSBmaW5pc2hlZCBhbmQgdGhlIGNhbGxiYWNrIHdhcyBjYWxsZWQuXG4gICAgICAgIC8vIFNpbGVudGx5IGlnbm9yZSB0aGUgZXJyb3IuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdGhpcy5jYWxsYmFjayhlcnJvcik7XG4gICAgICB0aGlzLmFib3J0KCk7XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4gdGhpcy5fZm9ybURhdGE7XG59O1xuXG4vKipcbiAqIEdldHMvc2V0cyB0aGUgYEFnZW50YCB0byB1c2UgZm9yIHRoaXMgSFRUUCByZXF1ZXN0LiBUaGUgZGVmYXVsdCAoaWYgdGhpc1xuICogZnVuY3Rpb24gaXMgbm90IGNhbGxlZCkgaXMgdG8gb3B0IG91dCBvZiBjb25uZWN0aW9uIHBvb2xpbmcgKGBhZ2VudDogZmFsc2VgKS5cbiAqXG4gKiBAcGFyYW0ge2h0dHAuQWdlbnR9IGFnZW50XG4gKiBAcmV0dXJuIHtodHRwLkFnZW50fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5hZ2VudCA9IGZ1bmN0aW9uIChhZ2VudCkge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIHRoaXMuX2FnZW50O1xuICB0aGlzLl9hZ2VudCA9IGFnZW50O1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogR2V0cy9zZXRzIHRoZSBgbG9va3VwYCBmdW5jdGlvbiB0byB1c2UgY3VzdG9tIEROUyByZXNvbHZlci5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsb29rdXBcbiAqIEByZXR1cm4ge0Z1bmN0aW9ufVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5sb29rdXAgPSBmdW5jdGlvbiAobG9va3VwKSB7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSByZXR1cm4gdGhpcy5fbG9va3VwO1xuICB0aGlzLl9sb29rdXAgPSBsb29rdXA7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTZXQgX0NvbnRlbnQtVHlwZV8gcmVzcG9uc2UgaGVhZGVyIHBhc3NlZCB0aHJvdWdoIGBtaW1lLmdldFR5cGUoKWAuXG4gKlxuICogRXhhbXBsZXM6XG4gKlxuICogICAgICByZXF1ZXN0LnBvc3QoJy8nKVxuICogICAgICAgIC50eXBlKCd4bWwnKVxuICogICAgICAgIC5zZW5kKHhtbHN0cmluZylcbiAqICAgICAgICAuZW5kKGNhbGxiYWNrKTtcbiAqXG4gKiAgICAgIHJlcXVlc3QucG9zdCgnLycpXG4gKiAgICAgICAgLnR5cGUoJ2pzb24nKVxuICogICAgICAgIC5zZW5kKGpzb25zdHJpbmcpXG4gKiAgICAgICAgLmVuZChjYWxsYmFjayk7XG4gKlxuICogICAgICByZXF1ZXN0LnBvc3QoJy8nKVxuICogICAgICAgIC50eXBlKCdhcHBsaWNhdGlvbi9qc29uJylcbiAqICAgICAgICAuc2VuZChqc29uc3RyaW5nKVxuICogICAgICAgIC5lbmQoY2FsbGJhY2spO1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUudHlwZSA9IGZ1bmN0aW9uICh0eXBlKSB7XG4gIHJldHVybiB0aGlzLnNldChcbiAgICAnQ29udGVudC1UeXBlJyxcbiAgICB0eXBlLmluY2x1ZGVzKCcvJykgPyB0eXBlIDogbWltZS5nZXRUeXBlKHR5cGUpXG4gICk7XG59O1xuXG4vKipcbiAqIFNldCBfQWNjZXB0XyByZXNwb25zZSBoZWFkZXIgcGFzc2VkIHRocm91Z2ggYG1pbWUuZ2V0VHlwZSgpYC5cbiAqXG4gKiBFeGFtcGxlczpcbiAqXG4gKiAgICAgIHN1cGVyYWdlbnQudHlwZXMuanNvbiA9ICdhcHBsaWNhdGlvbi9qc29uJztcbiAqXG4gKiAgICAgIHJlcXVlc3QuZ2V0KCcvYWdlbnQnKVxuICogICAgICAgIC5hY2NlcHQoJ2pzb24nKVxuICogICAgICAgIC5lbmQoY2FsbGJhY2spO1xuICpcbiAqICAgICAgcmVxdWVzdC5nZXQoJy9hZ2VudCcpXG4gKiAgICAgICAgLmFjY2VwdCgnYXBwbGljYXRpb24vanNvbicpXG4gKiAgICAgICAgLmVuZChjYWxsYmFjayk7XG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGFjY2VwdFxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3QucHJvdG90eXBlLmFjY2VwdCA9IGZ1bmN0aW9uICh0eXBlKSB7XG4gIHJldHVybiB0aGlzLnNldCgnQWNjZXB0JywgdHlwZS5pbmNsdWRlcygnLycpID8gdHlwZSA6IG1pbWUuZ2V0VHlwZSh0eXBlKSk7XG59O1xuXG4vKipcbiAqIEFkZCBxdWVyeS1zdHJpbmcgYHZhbGAuXG4gKlxuICogRXhhbXBsZXM6XG4gKlxuICogICByZXF1ZXN0LmdldCgnL3Nob2VzJylcbiAqICAgICAucXVlcnkoJ3NpemU9MTAnKVxuICogICAgIC5xdWVyeSh7IGNvbG9yOiAnYmx1ZScgfSlcbiAqXG4gKiBAcGFyYW0ge09iamVjdHxTdHJpbmd9IHZhbFxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3QucHJvdG90eXBlLnF1ZXJ5ID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgdGhpcy5fcXVlcnkucHVzaCh2YWx1ZSk7XG4gIH0gZWxzZSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLnFzLCB2YWx1ZSk7XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogV3JpdGUgcmF3IGBkYXRhYCAvIGBlbmNvZGluZ2AgdG8gdGhlIHNvY2tldC5cbiAqXG4gKiBAcGFyYW0ge0J1ZmZlcnxTdHJpbmd9IGRhdGFcbiAqIEBwYXJhbSB7U3RyaW5nfSBlbmNvZGluZ1xuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUud3JpdGUgPSBmdW5jdGlvbiAoZGF0YSwgZW5jb2RpbmcpIHtcbiAgY29uc3QgcmVxdWVzdF8gPSB0aGlzLnJlcXVlc3QoKTtcbiAgaWYgKCF0aGlzLl9zdHJlYW1SZXF1ZXN0KSB7XG4gICAgdGhpcy5fc3RyZWFtUmVxdWVzdCA9IHRydWU7XG4gIH1cblxuICByZXR1cm4gcmVxdWVzdF8ud3JpdGUoZGF0YSwgZW5jb2RpbmcpO1xufTtcblxuLyoqXG4gKiBQaXBlIHRoZSByZXF1ZXN0IGJvZHkgdG8gYHN0cmVhbWAuXG4gKlxuICogQHBhcmFtIHtTdHJlYW19IHN0cmVhbVxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAqIEByZXR1cm4ge1N0cmVhbX1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUucGlwZSA9IGZ1bmN0aW9uIChzdHJlYW0sIG9wdGlvbnMpIHtcbiAgdGhpcy5waXBlZCA9IHRydWU7IC8vIEhBQ0suLi5cbiAgdGhpcy5idWZmZXIoZmFsc2UpO1xuICB0aGlzLmVuZCgpO1xuICByZXR1cm4gdGhpcy5fcGlwZUNvbnRpbnVlKHN0cmVhbSwgb3B0aW9ucyk7XG59O1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5fcGlwZUNvbnRpbnVlID0gZnVuY3Rpb24gKHN0cmVhbSwgb3B0aW9ucykge1xuICB0aGlzLnJlcS5vbmNlKCdyZXNwb25zZScsIChyZXMpID0+IHtcbiAgICAvLyByZWRpcmVjdFxuICAgIGlmIChcbiAgICAgIGlzUmVkaXJlY3QocmVzLnN0YXR1c0NvZGUpICYmXG4gICAgICB0aGlzLl9yZWRpcmVjdHMrKyAhPT0gdGhpcy5fbWF4UmVkaXJlY3RzXG4gICAgKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVkaXJlY3QocmVzKSA9PT0gdGhpc1xuICAgICAgICA/IHRoaXMuX3BpcGVDb250aW51ZShzdHJlYW0sIG9wdGlvbnMpXG4gICAgICAgIDogdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHRoaXMucmVzID0gcmVzO1xuICAgIHRoaXMuX2VtaXRSZXNwb25zZSgpO1xuICAgIGlmICh0aGlzLl9hYm9ydGVkKSByZXR1cm47XG5cbiAgICBpZiAodGhpcy5fc2hvdWxkVW56aXAocmVzKSkge1xuICAgICAgY29uc3QgdW56aXBPYmplY3QgPSB6bGliLmNyZWF0ZVVuemlwKCk7XG4gICAgICB1bnppcE9iamVjdC5vbignZXJyb3InLCAoZXJyb3IpID0+IHtcbiAgICAgICAgaWYgKGVycm9yICYmIGVycm9yLmNvZGUgPT09ICdaX0JVRl9FUlJPUicpIHtcbiAgICAgICAgICAvLyB1bmV4cGVjdGVkIGVuZCBvZiBmaWxlIGlzIGlnbm9yZWQgYnkgYnJvd3NlcnMgYW5kIGN1cmxcbiAgICAgICAgICBzdHJlYW0uZW1pdCgnZW5kJyk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgc3RyZWFtLmVtaXQoJ2Vycm9yJywgZXJyb3IpO1xuICAgICAgfSk7XG4gICAgICByZXMucGlwZSh1bnppcE9iamVjdCkucGlwZShzdHJlYW0sIG9wdGlvbnMpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXMucGlwZShzdHJlYW0sIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIHJlcy5vbmNlKCdlbmQnLCAoKSA9PiB7XG4gICAgICB0aGlzLmVtaXQoJ2VuZCcpO1xuICAgIH0pO1xuICB9KTtcbiAgcmV0dXJuIHN0cmVhbTtcbn07XG5cbi8qKlxuICogRW5hYmxlIC8gZGlzYWJsZSBidWZmZXJpbmcuXG4gKlxuICogQHJldHVybiB7Qm9vbGVhbn0gW3ZhbF1cbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5idWZmZXIgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgdGhpcy5fYnVmZmVyID0gdmFsdWUgIT09IGZhbHNlO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogUmVkaXJlY3QgdG8gYHVybFxuICpcbiAqIEBwYXJhbSB7SW5jb21pbmdNZXNzYWdlfSByZXNcbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUuX3JlZGlyZWN0ID0gZnVuY3Rpb24gKHJlcykge1xuICBsZXQgdXJsID0gcmVzLmhlYWRlcnMubG9jYXRpb247XG4gIGlmICghdXJsKSB7XG4gICAgcmV0dXJuIHRoaXMuY2FsbGJhY2sobmV3IEVycm9yKCdObyBsb2NhdGlvbiBoZWFkZXIgZm9yIHJlZGlyZWN0JyksIHJlcyk7XG4gIH1cblxuICBkZWJ1ZygncmVkaXJlY3QgJXMgLT4gJXMnLCB0aGlzLnVybCwgdXJsKTtcblxuICAvLyBsb2NhdGlvblxuICB1cmwgPSByZXNvbHZlKHRoaXMudXJsLCB1cmwpO1xuXG4gIC8vIGVuc3VyZSB0aGUgcmVzcG9uc2UgaXMgYmVpbmcgY29uc3VtZWRcbiAgLy8gdGhpcyBpcyByZXF1aXJlZCBmb3IgTm9kZSB2MC4xMCtcbiAgcmVzLnJlc3VtZSgpO1xuXG4gIGxldCBoZWFkZXJzID0gdGhpcy5yZXEuZ2V0SGVhZGVycyA/IHRoaXMucmVxLmdldEhlYWRlcnMoKSA6IHRoaXMucmVxLl9oZWFkZXJzO1xuXG4gIGNvbnN0IGNoYW5nZXNPcmlnaW4gPSBwYXJzZSh1cmwpLmhvc3QgIT09IHBhcnNlKHRoaXMudXJsKS5ob3N0O1xuXG4gIC8vIGltcGxlbWVudGF0aW9uIG9mIDMwMiBmb2xsb3dpbmcgZGVmYWN0byBzdGFuZGFyZFxuICBpZiAocmVzLnN0YXR1c0NvZGUgPT09IDMwMSB8fCByZXMuc3RhdHVzQ29kZSA9PT0gMzAyKSB7XG4gICAgLy8gc3RyaXAgQ29udGVudC0qIHJlbGF0ZWQgZmllbGRzXG4gICAgLy8gaW4gY2FzZSBvZiBQT1NUIGV0Y1xuICAgIGhlYWRlcnMgPSB1dGlscy5jbGVhbkhlYWRlcihoZWFkZXJzLCBjaGFuZ2VzT3JpZ2luKTtcblxuICAgIC8vIGZvcmNlIEdFVFxuICAgIHRoaXMubWV0aG9kID0gdGhpcy5tZXRob2QgPT09ICdIRUFEJyA/ICdIRUFEJyA6ICdHRVQnO1xuXG4gICAgLy8gY2xlYXIgZGF0YVxuICAgIHRoaXMuX2RhdGEgPSBudWxsO1xuICB9XG5cbiAgLy8gMzAzIGlzIGFsd2F5cyBHRVRcbiAgaWYgKHJlcy5zdGF0dXNDb2RlID09PSAzMDMpIHtcbiAgICAvLyBzdHJpcCBDb250ZW50LSogcmVsYXRlZCBmaWVsZHNcbiAgICAvLyBpbiBjYXNlIG9mIFBPU1QgZXRjXG4gICAgaGVhZGVycyA9IHV0aWxzLmNsZWFuSGVhZGVyKGhlYWRlcnMsIGNoYW5nZXNPcmlnaW4pO1xuXG4gICAgLy8gZm9yY2UgbWV0aG9kXG4gICAgdGhpcy5tZXRob2QgPSAnR0VUJztcblxuICAgIC8vIGNsZWFyIGRhdGFcbiAgICB0aGlzLl9kYXRhID0gbnVsbDtcbiAgfVxuXG4gIC8vIDMwNyBwcmVzZXJ2ZXMgbWV0aG9kXG4gIC8vIDMwOCBwcmVzZXJ2ZXMgbWV0aG9kXG4gIGRlbGV0ZSBoZWFkZXJzLmhvc3Q7XG5cbiAgZGVsZXRlIHRoaXMucmVxO1xuICBkZWxldGUgdGhpcy5fZm9ybURhdGE7XG5cbiAgLy8gcmVtb3ZlIGFsbCBhZGQgaGVhZGVyIGV4Y2VwdCBVc2VyLUFnZW50XG4gIF9pbml0SGVhZGVycyh0aGlzKTtcblxuICAvLyByZWRpcmVjdFxuICB0aGlzLl9lbmRDYWxsZWQgPSBmYWxzZTtcbiAgdGhpcy51cmwgPSB1cmw7XG4gIHRoaXMucXMgPSB7fTtcbiAgdGhpcy5fcXVlcnkubGVuZ3RoID0gMDtcbiAgdGhpcy5zZXQoaGVhZGVycyk7XG4gIHRoaXMuZW1pdCgncmVkaXJlY3QnLCByZXMpO1xuICB0aGlzLl9yZWRpcmVjdExpc3QucHVzaCh0aGlzLnVybCk7XG4gIHRoaXMuZW5kKHRoaXMuX2NhbGxiYWNrKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFNldCBBdXRob3JpemF0aW9uIGZpZWxkIHZhbHVlIHdpdGggYHVzZXJgIGFuZCBgcGFzc2AuXG4gKlxuICogRXhhbXBsZXM6XG4gKlxuICogICAuYXV0aCgndG9iaScsICdsZWFybmJvb3N0JylcbiAqICAgLmF1dGgoJ3RvYmk6bGVhcm5ib29zdCcpXG4gKiAgIC5hdXRoKCd0b2JpJylcbiAqICAgLmF1dGgoYWNjZXNzVG9rZW4sIHsgdHlwZTogJ2JlYXJlcicgfSlcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdXNlclxuICogQHBhcmFtIHtTdHJpbmd9IFtwYXNzXVxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSBvcHRpb25zIHdpdGggYXV0aG9yaXphdGlvbiB0eXBlICdiYXNpYycgb3IgJ2JlYXJlcicgKCdiYXNpYycgaXMgZGVmYXVsdClcbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5hdXRoID0gZnVuY3Rpb24gKHVzZXIsIHBhc3MsIG9wdGlvbnMpIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHBhc3MgPSAnJztcbiAgaWYgKHR5cGVvZiBwYXNzID09PSAnb2JqZWN0JyAmJiBwYXNzICE9PSBudWxsKSB7XG4gICAgLy8gcGFzcyBpcyBvcHRpb25hbCBhbmQgY2FuIGJlIHJlcGxhY2VkIHdpdGggb3B0aW9uc1xuICAgIG9wdGlvbnMgPSBwYXNzO1xuICAgIHBhc3MgPSAnJztcbiAgfVxuXG4gIGlmICghb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSB7IHR5cGU6ICdiYXNpYycgfTtcbiAgfVxuXG4gIGNvbnN0IGVuY29kZXIgPSAoc3RyaW5nKSA9PiBCdWZmZXIuZnJvbShzdHJpbmcpLnRvU3RyaW5nKCdiYXNlNjQnKTtcblxuICByZXR1cm4gdGhpcy5fYXV0aCh1c2VyLCBwYXNzLCBvcHRpb25zLCBlbmNvZGVyKTtcbn07XG5cbi8qKlxuICogU2V0IHRoZSBjZXJ0aWZpY2F0ZSBhdXRob3JpdHkgb3B0aW9uIGZvciBodHRwcyByZXF1ZXN0LlxuICpcbiAqIEBwYXJhbSB7QnVmZmVyIHwgQXJyYXl9IGNlcnRcbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5jYSA9IGZ1bmN0aW9uIChjZXJ0KSB7XG4gIHRoaXMuX2NhID0gY2VydDtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFNldCB0aGUgY2xpZW50IGNlcnRpZmljYXRlIGtleSBvcHRpb24gZm9yIGh0dHBzIHJlcXVlc3QuXG4gKlxuICogQHBhcmFtIHtCdWZmZXIgfCBTdHJpbmd9IGNlcnRcbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5rZXkgPSBmdW5jdGlvbiAoY2VydCkge1xuICB0aGlzLl9rZXkgPSBjZXJ0O1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU2V0IHRoZSBrZXksIGNlcnRpZmljYXRlLCBhbmQgQ0EgY2VydHMgb2YgdGhlIGNsaWVudCBpbiBQRlggb3IgUEtDUzEyIGZvcm1hdC5cbiAqXG4gKiBAcGFyYW0ge0J1ZmZlciB8IFN0cmluZ30gY2VydFxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3QucHJvdG90eXBlLnBmeCA9IGZ1bmN0aW9uIChjZXJ0KSB7XG4gIGlmICh0eXBlb2YgY2VydCA9PT0gJ29iamVjdCcgJiYgIUJ1ZmZlci5pc0J1ZmZlcihjZXJ0KSkge1xuICAgIHRoaXMuX3BmeCA9IGNlcnQucGZ4O1xuICAgIHRoaXMuX3Bhc3NwaHJhc2UgPSBjZXJ0LnBhc3NwaHJhc2U7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5fcGZ4ID0gY2VydDtcbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTZXQgdGhlIGNsaWVudCBjZXJ0aWZpY2F0ZSBvcHRpb24gZm9yIGh0dHBzIHJlcXVlc3QuXG4gKlxuICogQHBhcmFtIHtCdWZmZXIgfCBTdHJpbmd9IGNlcnRcbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5jZXJ0ID0gZnVuY3Rpb24gKGNlcnQpIHtcbiAgdGhpcy5fY2VydCA9IGNlcnQ7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBEbyBub3QgcmVqZWN0IGV4cGlyZWQgb3IgaW52YWxpZCBUTFMgY2VydHMuXG4gKiBzZXRzIGByZWplY3RVbmF1dGhvcml6ZWQ9dHJ1ZWAuIEJlIHdhcm5lZCB0aGF0IHRoaXMgYWxsb3dzIE1JVE0gYXR0YWNrcy5cbiAqXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUuZGlzYWJsZVRMU0NlcnRzID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLl9kaXNhYmxlVExTQ2VydHMgPSB0cnVlO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogUmV0dXJuIGFuIGh0dHBbc10gcmVxdWVzdC5cbiAqXG4gKiBAcmV0dXJuIHtPdXRnb2luZ01lc3NhZ2V9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY29tcGxleGl0eVxuUmVxdWVzdC5wcm90b3R5cGUucmVxdWVzdCA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKHRoaXMucmVxKSByZXR1cm4gdGhpcy5yZXE7XG5cbiAgY29uc3Qgb3B0aW9ucyA9IHt9O1xuXG4gIHRyeSB7XG4gICAgY29uc3QgcXVlcnkgPSBxcy5zdHJpbmdpZnkodGhpcy5xcywge1xuICAgICAgaW5kaWNlczogZmFsc2UsXG4gICAgICBzdHJpY3ROdWxsSGFuZGxpbmc6IHRydWVcbiAgICB9KTtcbiAgICBpZiAocXVlcnkpIHtcbiAgICAgIHRoaXMucXMgPSB7fTtcbiAgICAgIHRoaXMuX3F1ZXJ5LnB1c2gocXVlcnkpO1xuICAgIH1cblxuICAgIHRoaXMuX2ZpbmFsaXplUXVlcnlTdHJpbmcoKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgcmV0dXJuIHRoaXMuZW1pdCgnZXJyb3InLCBlcnIpO1xuICB9XG5cbiAgbGV0IHsgdXJsIH0gPSB0aGlzO1xuICBjb25zdCByZXRyaWVzID0gdGhpcy5fcmV0cmllcztcblxuICAvLyBDYXB0dXJlIGJhY2t0aWNrcyBhcy1pcyBmcm9tIHRoZSBmaW5hbCBxdWVyeSBzdHJpbmcgYnVpbHQgYWJvdmUuXG4gIC8vIE5vdGU6IHRoaXMnbGwgb25seSBmaW5kIGJhY2t0aWNrcyBlbnRlcmVkIGluIHJlcS5xdWVyeShTdHJpbmcpXG4gIC8vIGNhbGxzLCBiZWNhdXNlIHFzLnN0cmluZ2lmeSB1bmNvbmRpdGlvbmFsbHkgZW5jb2RlcyBiYWNrdGlja3MuXG4gIGxldCBxdWVyeVN0cmluZ0JhY2t0aWNrcztcbiAgaWYgKHVybC5pbmNsdWRlcygnYCcpKSB7XG4gICAgY29uc3QgcXVlcnlTdGFydEluZGV4ID0gdXJsLmluZGV4T2YoJz8nKTtcblxuICAgIGlmIChxdWVyeVN0YXJ0SW5kZXggIT09IC0xKSB7XG4gICAgICBjb25zdCBxdWVyeVN0cmluZyA9IHVybC5zbGljZShxdWVyeVN0YXJ0SW5kZXggKyAxKTtcbiAgICAgIHF1ZXJ5U3RyaW5nQmFja3RpY2tzID0gcXVlcnlTdHJpbmcubWF0Y2goL2B8JTYwL2cpO1xuICAgIH1cbiAgfVxuXG4gIC8vIGRlZmF1bHQgdG8gaHR0cDovL1xuICBpZiAodXJsLmluZGV4T2YoJ2h0dHAnKSAhPT0gMCkgdXJsID0gYGh0dHA6Ly8ke3VybH1gO1xuICB1cmwgPSBwYXJzZSh1cmwpO1xuXG4gIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vdmlzaW9ubWVkaWEvc3VwZXJhZ2VudC9pc3N1ZXMvMTM2N1xuICBpZiAocXVlcnlTdHJpbmdCYWNrdGlja3MpIHtcbiAgICBsZXQgaSA9IDA7XG4gICAgdXJsLnF1ZXJ5ID0gdXJsLnF1ZXJ5LnJlcGxhY2UoLyU2MC9nLCAoKSA9PiBxdWVyeVN0cmluZ0JhY2t0aWNrc1tpKytdKTtcbiAgICB1cmwuc2VhcmNoID0gYD8ke3VybC5xdWVyeX1gO1xuICAgIHVybC5wYXRoID0gdXJsLnBhdGhuYW1lICsgdXJsLnNlYXJjaDtcbiAgfVxuXG4gIC8vIHN1cHBvcnQgdW5peCBzb2NrZXRzXG4gIGlmICgvXmh0dHBzP1xcK3VuaXg6Ly50ZXN0KHVybC5wcm90b2NvbCkgPT09IHRydWUpIHtcbiAgICAvLyBnZXQgdGhlIHByb3RvY29sXG4gICAgdXJsLnByb3RvY29sID0gYCR7dXJsLnByb3RvY29sLnNwbGl0KCcrJylbMF19OmA7XG5cbiAgICAvLyBnZXQgdGhlIHNvY2tldCwgcGF0aFxuICAgIGNvbnN0IHVuaXhQYXJ0cyA9IHVybC5wYXRoLm1hdGNoKC9eKFteL10rKSguKykkLyk7XG4gICAgb3B0aW9ucy5zb2NrZXRQYXRoID0gdW5peFBhcnRzWzFdLnJlcGxhY2UoLyUyRi9nLCAnLycpO1xuICAgIHVybC5wYXRoID0gdW5peFBhcnRzWzJdO1xuICB9XG5cbiAgLy8gT3ZlcnJpZGUgSVAgYWRkcmVzcyBvZiBhIGhvc3RuYW1lXG4gIGlmICh0aGlzLl9jb25uZWN0T3ZlcnJpZGUpIHtcbiAgICBjb25zdCB7IGhvc3RuYW1lIH0gPSB1cmw7XG4gICAgY29uc3QgbWF0Y2ggPVxuICAgICAgaG9zdG5hbWUgaW4gdGhpcy5fY29ubmVjdE92ZXJyaWRlXG4gICAgICAgID8gdGhpcy5fY29ubmVjdE92ZXJyaWRlW2hvc3RuYW1lXVxuICAgICAgICA6IHRoaXMuX2Nvbm5lY3RPdmVycmlkZVsnKiddO1xuICAgIGlmIChtYXRjaCkge1xuICAgICAgLy8gYmFja3VwIHRoZSByZWFsIGhvc3RcbiAgICAgIGlmICghdGhpcy5faGVhZGVyLmhvc3QpIHtcbiAgICAgICAgdGhpcy5zZXQoJ2hvc3QnLCB1cmwuaG9zdCk7XG4gICAgICB9XG5cbiAgICAgIGxldCBuZXdIb3N0O1xuICAgICAgbGV0IG5ld1BvcnQ7XG5cbiAgICAgIGlmICh0eXBlb2YgbWF0Y2ggPT09ICdvYmplY3QnKSB7XG4gICAgICAgIG5ld0hvc3QgPSBtYXRjaC5ob3N0O1xuICAgICAgICBuZXdQb3J0ID0gbWF0Y2gucG9ydDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5ld0hvc3QgPSBtYXRjaDtcbiAgICAgICAgbmV3UG9ydCA9IHVybC5wb3J0O1xuICAgICAgfVxuXG4gICAgICAvLyB3cmFwIFtpcHY2XVxuICAgICAgdXJsLmhvc3QgPSAvOi8udGVzdChuZXdIb3N0KSA/IGBbJHtuZXdIb3N0fV1gIDogbmV3SG9zdDtcbiAgICAgIGlmIChuZXdQb3J0KSB7XG4gICAgICAgIHVybC5ob3N0ICs9IGA6JHtuZXdQb3J0fWA7XG4gICAgICAgIHVybC5wb3J0ID0gbmV3UG9ydDtcbiAgICAgIH1cblxuICAgICAgdXJsLmhvc3RuYW1lID0gbmV3SG9zdDtcbiAgICB9XG4gIH1cblxuICAvLyBvcHRpb25zXG4gIG9wdGlvbnMubWV0aG9kID0gdGhpcy5tZXRob2Q7XG4gIG9wdGlvbnMucG9ydCA9IHVybC5wb3J0O1xuICBvcHRpb25zLnBhdGggPSB1cmwucGF0aDtcbiAgb3B0aW9ucy5ob3N0ID0gdXJsLmhvc3RuYW1lO1xuICBvcHRpb25zLmNhID0gdGhpcy5fY2E7XG4gIG9wdGlvbnMua2V5ID0gdGhpcy5fa2V5O1xuICBvcHRpb25zLnBmeCA9IHRoaXMuX3BmeDtcbiAgb3B0aW9ucy5jZXJ0ID0gdGhpcy5fY2VydDtcbiAgb3B0aW9ucy5wYXNzcGhyYXNlID0gdGhpcy5fcGFzc3BocmFzZTtcbiAgb3B0aW9ucy5hZ2VudCA9IHRoaXMuX2FnZW50O1xuICBvcHRpb25zLmxvb2t1cCA9IHRoaXMuX2xvb2t1cDtcbiAgb3B0aW9ucy5yZWplY3RVbmF1dGhvcml6ZWQgPVxuICAgIHR5cGVvZiB0aGlzLl9kaXNhYmxlVExTQ2VydHMgPT09ICdib29sZWFuJ1xuICAgICAgPyAhdGhpcy5fZGlzYWJsZVRMU0NlcnRzXG4gICAgICA6IHByb2Nlc3MuZW52Lk5PREVfVExTX1JFSkVDVF9VTkFVVEhPUklaRUQgIT09ICcwJztcblxuICAvLyBBbGxvd3MgcmVxdWVzdC5nZXQoJ2h0dHBzOi8vMS4yLjMuNC8nKS5zZXQoJ0hvc3QnLCAnZXhhbXBsZS5jb20nKVxuICBpZiAodGhpcy5faGVhZGVyLmhvc3QpIHtcbiAgICBvcHRpb25zLnNlcnZlcm5hbWUgPSB0aGlzLl9oZWFkZXIuaG9zdC5yZXBsYWNlKC86XFxkKyQvLCAnJyk7XG4gIH1cblxuICBpZiAoXG4gICAgdGhpcy5fdHJ1c3RMb2NhbGhvc3QgJiZcbiAgICAvXig/OmxvY2FsaG9zdHwxMjdcXC4wXFwuMFxcLlxcZCt8KDAqOikrOjAqMSkkLy50ZXN0KHVybC5ob3N0bmFtZSlcbiAgKSB7XG4gICAgb3B0aW9ucy5yZWplY3RVbmF1dGhvcml6ZWQgPSBmYWxzZTtcbiAgfVxuXG4gIC8vIGluaXRpYXRlIHJlcXVlc3RcbiAgY29uc3QgbW9kdWxlXyA9IHRoaXMuX2VuYWJsZUh0dHAyXG4gICAgPyBleHBvcnRzLnByb3RvY29sc1snaHR0cDI6J10uc2V0UHJvdG9jb2wodXJsLnByb3RvY29sKVxuICAgIDogZXhwb3J0cy5wcm90b2NvbHNbdXJsLnByb3RvY29sXTtcblxuICAvLyByZXF1ZXN0XG4gIHRoaXMucmVxID0gbW9kdWxlXy5yZXF1ZXN0KG9wdGlvbnMpO1xuICBjb25zdCB7IHJlcSB9ID0gdGhpcztcblxuICAvLyBzZXQgdGNwIG5vIGRlbGF5XG4gIHJlcS5zZXROb0RlbGF5KHRydWUpO1xuXG4gIGlmIChvcHRpb25zLm1ldGhvZCAhPT0gJ0hFQUQnKSB7XG4gICAgcmVxLnNldEhlYWRlcignQWNjZXB0LUVuY29kaW5nJywgJ2d6aXAsIGRlZmxhdGUnKTtcbiAgfVxuXG4gIHRoaXMucHJvdG9jb2wgPSB1cmwucHJvdG9jb2w7XG4gIHRoaXMuaG9zdCA9IHVybC5ob3N0O1xuXG4gIC8vIGV4cG9zZSBldmVudHNcbiAgcmVxLm9uY2UoJ2RyYWluJywgKCkgPT4ge1xuICAgIHRoaXMuZW1pdCgnZHJhaW4nKTtcbiAgfSk7XG5cbiAgcmVxLm9uKCdlcnJvcicsIChlcnJvcikgPT4ge1xuICAgIC8vIGZsYWcgYWJvcnRpb24gaGVyZSBmb3Igb3V0IHRpbWVvdXRzXG4gICAgLy8gYmVjYXVzZSBub2RlIHdpbGwgZW1pdCBhIGZhdXgtZXJyb3IgXCJzb2NrZXQgaGFuZyB1cFwiXG4gICAgLy8gd2hlbiByZXF1ZXN0IGlzIGFib3J0ZWQgYmVmb3JlIGEgY29ubmVjdGlvbiBpcyBtYWRlXG4gICAgaWYgKHRoaXMuX2Fib3J0ZWQpIHJldHVybjtcbiAgICAvLyBpZiBub3QgdGhlIHNhbWUsIHdlIGFyZSBpbiB0aGUgKipvbGQqKiAoY2FuY2VsbGVkKSByZXF1ZXN0LFxuICAgIC8vIHNvIG5lZWQgdG8gY29udGludWUgKHNhbWUgYXMgZm9yIGFib3ZlKVxuICAgIGlmICh0aGlzLl9yZXRyaWVzICE9PSByZXRyaWVzKSByZXR1cm47XG4gICAgLy8gaWYgd2UndmUgcmVjZWl2ZWQgYSByZXNwb25zZSB0aGVuIHdlIGRvbid0IHdhbnQgdG8gbGV0XG4gICAgLy8gYW4gZXJyb3IgaW4gdGhlIHJlcXVlc3QgYmxvdyB1cCB0aGUgcmVzcG9uc2VcbiAgICBpZiAodGhpcy5yZXNwb25zZSkgcmV0dXJuO1xuICAgIHRoaXMuY2FsbGJhY2soZXJyb3IpO1xuICB9KTtcblxuICAvLyBhdXRoXG4gIGlmICh1cmwuYXV0aCkge1xuICAgIGNvbnN0IGF1dGggPSB1cmwuYXV0aC5zcGxpdCgnOicpO1xuICAgIHRoaXMuYXV0aChhdXRoWzBdLCBhdXRoWzFdKTtcbiAgfVxuXG4gIGlmICh0aGlzLnVzZXJuYW1lICYmIHRoaXMucGFzc3dvcmQpIHtcbiAgICB0aGlzLmF1dGgodGhpcy51c2VybmFtZSwgdGhpcy5wYXNzd29yZCk7XG4gIH1cblxuICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLmhlYWRlcikge1xuICAgIGlmIChoYXNPd24odGhpcy5oZWFkZXIsIGtleSkpIHJlcS5zZXRIZWFkZXIoa2V5LCB0aGlzLmhlYWRlcltrZXldKTtcbiAgfVxuXG4gIC8vIGFkZCBjb29raWVzXG4gIGlmICh0aGlzLmNvb2tpZXMpIHtcbiAgICBpZiAoaGFzT3duKHRoaXMuX2hlYWRlciwgJ2Nvb2tpZScpKSB7XG4gICAgICAvLyBtZXJnZVxuICAgICAgY29uc3QgdGVtcG9yYXJ5SmFyID0gbmV3IENvb2tpZUphci5Db29raWVKYXIoKTtcbiAgICAgIHRlbXBvcmFyeUphci5zZXRDb29raWVzKHRoaXMuX2hlYWRlci5jb29raWUuc3BsaXQoJzsnKSk7XG4gICAgICB0ZW1wb3JhcnlKYXIuc2V0Q29va2llcyh0aGlzLmNvb2tpZXMuc3BsaXQoJzsnKSk7XG4gICAgICByZXEuc2V0SGVhZGVyKFxuICAgICAgICAnQ29va2llJyxcbiAgICAgICAgdGVtcG9yYXJ5SmFyLmdldENvb2tpZXMoQ29va2llSmFyLkNvb2tpZUFjY2Vzc0luZm8uQWxsKS50b1ZhbHVlU3RyaW5nKClcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlcS5zZXRIZWFkZXIoJ0Nvb2tpZScsIHRoaXMuY29va2llcyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlcTtcbn07XG5cbi8qKlxuICogSW52b2tlIHRoZSBjYWxsYmFjayB3aXRoIGBlcnJgIGFuZCBgcmVzYFxuICogYW5kIGhhbmRsZSBhcml0eSBjaGVjay5cbiAqXG4gKiBAcGFyYW0ge0Vycm9yfSBlcnJcbiAqIEBwYXJhbSB7UmVzcG9uc2V9IHJlc1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUuY2FsbGJhY2sgPSBmdW5jdGlvbiAoZXJyb3IsIHJlcykge1xuICBpZiAodGhpcy5fc2hvdWxkUmV0cnkoZXJyb3IsIHJlcykpIHtcbiAgICByZXR1cm4gdGhpcy5fcmV0cnkoKTtcbiAgfVxuXG4gIC8vIEF2b2lkIHRoZSBlcnJvciB3aGljaCBpcyBlbWl0dGVkIGZyb20gJ3NvY2tldCBoYW5nIHVwJyB0byBjYXVzZSB0aGUgZm4gdW5kZWZpbmVkIGVycm9yIG9uIEpTIHJ1bnRpbWUuXG4gIGNvbnN0IGZuID0gdGhpcy5fY2FsbGJhY2sgfHwgbm9vcDtcbiAgdGhpcy5jbGVhclRpbWVvdXQoKTtcbiAgaWYgKHRoaXMuY2FsbGVkKSByZXR1cm4gY29uc29sZS53YXJuKCdzdXBlcmFnZW50OiBkb3VibGUgY2FsbGJhY2sgYnVnJyk7XG4gIHRoaXMuY2FsbGVkID0gdHJ1ZTtcblxuICBpZiAoIWVycm9yKSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmICghdGhpcy5faXNSZXNwb25zZU9LKHJlcykpIHtcbiAgICAgICAgbGV0IG1lc3NhZ2UgPSAnVW5zdWNjZXNzZnVsIEhUVFAgcmVzcG9uc2UnO1xuICAgICAgICBpZiAocmVzKSB7XG4gICAgICAgICAgbWVzc2FnZSA9IGh0dHAuU1RBVFVTX0NPREVTW3Jlcy5zdGF0dXNdIHx8IG1lc3NhZ2U7XG4gICAgICAgIH1cblxuICAgICAgICBlcnJvciA9IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgICAgICAgZXJyb3Iuc3RhdHVzID0gcmVzID8gcmVzLnN0YXR1cyA6IHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGVycm9yID0gZXJyO1xuICAgIH1cbiAgfVxuXG4gIC8vIEl0J3MgaW1wb3J0YW50IHRoYXQgdGhlIGNhbGxiYWNrIGlzIGNhbGxlZCBvdXRzaWRlIHRyeS9jYXRjaFxuICAvLyB0byBhdm9pZCBkb3VibGUgY2FsbGJhY2tcbiAgaWYgKCFlcnJvcikge1xuICAgIHJldHVybiBmbihudWxsLCByZXMpO1xuICB9XG5cbiAgZXJyb3IucmVzcG9uc2UgPSByZXM7XG4gIGlmICh0aGlzLl9tYXhSZXRyaWVzKSBlcnJvci5yZXRyaWVzID0gdGhpcy5fcmV0cmllcyAtIDE7XG5cbiAgLy8gb25seSBlbWl0IGVycm9yIGV2ZW50IGlmIHRoZXJlIGlzIGEgbGlzdGVuZXJcbiAgLy8gb3RoZXJ3aXNlIHdlIGFzc3VtZSB0aGUgY2FsbGJhY2sgdG8gYC5lbmQoKWAgd2lsbCBnZXQgdGhlIGVycm9yXG4gIGlmIChlcnJvciAmJiB0aGlzLmxpc3RlbmVycygnZXJyb3InKS5sZW5ndGggPiAwKSB7XG4gICAgdGhpcy5lbWl0KCdlcnJvcicsIGVycm9yKTtcbiAgfVxuXG4gIGZuKGVycm9yLCByZXMpO1xufTtcblxuLyoqXG4gKiBDaGVjayBpZiBgb2JqYCBpcyBhIGhvc3Qgb2JqZWN0LFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmogaG9zdCBvYmplY3RcbiAqIEByZXR1cm4ge0Jvb2xlYW59IGlzIGEgaG9zdCBvYmplY3RcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5SZXF1ZXN0LnByb3RvdHlwZS5faXNIb3N0ID0gZnVuY3Rpb24gKG9iamVjdCkge1xuICByZXR1cm4gKFxuICAgIEJ1ZmZlci5pc0J1ZmZlcihvYmplY3QpIHx8XG4gICAgb2JqZWN0IGluc3RhbmNlb2YgU3RyZWFtIHx8XG4gICAgb2JqZWN0IGluc3RhbmNlb2YgRm9ybURhdGFcbiAgKTtcbn07XG5cbi8qKlxuICogSW5pdGlhdGUgcmVxdWVzdCwgaW52b2tpbmcgY2FsbGJhY2sgYGZuKGVyciwgcmVzKWBcbiAqIHdpdGggYW4gaW5zdGFuY2VvZiBgUmVzcG9uc2VgLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUuX2VtaXRSZXNwb25zZSA9IGZ1bmN0aW9uIChib2R5LCBmaWxlcykge1xuICBjb25zdCByZXNwb25zZSA9IG5ldyBSZXNwb25zZSh0aGlzKTtcbiAgdGhpcy5yZXNwb25zZSA9IHJlc3BvbnNlO1xuICByZXNwb25zZS5yZWRpcmVjdHMgPSB0aGlzLl9yZWRpcmVjdExpc3Q7XG4gIGlmICh1bmRlZmluZWQgIT09IGJvZHkpIHtcbiAgICByZXNwb25zZS5ib2R5ID0gYm9keTtcbiAgfVxuXG4gIHJlc3BvbnNlLmZpbGVzID0gZmlsZXM7XG4gIGlmICh0aGlzLl9lbmRDYWxsZWQpIHtcbiAgICByZXNwb25zZS5waXBlID0gZnVuY3Rpb24gKCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBcImVuZCgpIGhhcyBhbHJlYWR5IGJlZW4gY2FsbGVkLCBzbyBpdCdzIHRvbyBsYXRlIHRvIHN0YXJ0IHBpcGluZ1wiXG4gICAgICApO1xuICAgIH07XG4gIH1cblxuICB0aGlzLmVtaXQoJ3Jlc3BvbnNlJywgcmVzcG9uc2UpO1xuICByZXR1cm4gcmVzcG9uc2U7XG59O1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5lbmQgPSBmdW5jdGlvbiAoZm4pIHtcbiAgdGhpcy5yZXF1ZXN0KCk7XG4gIGRlYnVnKCclcyAlcycsIHRoaXMubWV0aG9kLCB0aGlzLnVybCk7XG5cbiAgaWYgKHRoaXMuX2VuZENhbGxlZCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICcuZW5kKCkgd2FzIGNhbGxlZCB0d2ljZS4gVGhpcyBpcyBub3Qgc3VwcG9ydGVkIGluIHN1cGVyYWdlbnQnXG4gICAgKTtcbiAgfVxuXG4gIHRoaXMuX2VuZENhbGxlZCA9IHRydWU7XG5cbiAgLy8gc3RvcmUgY2FsbGJhY2tcbiAgdGhpcy5fY2FsbGJhY2sgPSBmbiB8fCBub29wO1xuXG4gIHRoaXMuX2VuZCgpO1xufTtcblxuUmVxdWVzdC5wcm90b3R5cGUuX2VuZCA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKHRoaXMuX2Fib3J0ZWQpXG4gICAgcmV0dXJuIHRoaXMuY2FsbGJhY2soXG4gICAgICBuZXcgRXJyb3IoJ1RoZSByZXF1ZXN0IGhhcyBiZWVuIGFib3J0ZWQgZXZlbiBiZWZvcmUgLmVuZCgpIHdhcyBjYWxsZWQnKVxuICAgICk7XG5cbiAgbGV0IGRhdGEgPSB0aGlzLl9kYXRhO1xuICBjb25zdCB7IHJlcSB9ID0gdGhpcztcbiAgY29uc3QgeyBtZXRob2QgfSA9IHRoaXM7XG5cbiAgdGhpcy5fc2V0VGltZW91dHMoKTtcblxuICAvLyBib2R5XG4gIGlmIChtZXRob2QgIT09ICdIRUFEJyAmJiAhcmVxLl9oZWFkZXJTZW50KSB7XG4gICAgLy8gc2VyaWFsaXplIHN0dWZmXG4gICAgaWYgKHR5cGVvZiBkYXRhICE9PSAnc3RyaW5nJykge1xuICAgICAgbGV0IGNvbnRlbnRUeXBlID0gcmVxLmdldEhlYWRlcignQ29udGVudC1UeXBlJyk7XG4gICAgICAvLyBQYXJzZSBvdXQganVzdCB0aGUgY29udGVudCB0eXBlIGZyb20gdGhlIGhlYWRlciAoaWdub3JlIHRoZSBjaGFyc2V0KVxuICAgICAgaWYgKGNvbnRlbnRUeXBlKSBjb250ZW50VHlwZSA9IGNvbnRlbnRUeXBlLnNwbGl0KCc7JylbMF07XG4gICAgICBsZXQgc2VyaWFsaXplID0gdGhpcy5fc2VyaWFsaXplciB8fCBleHBvcnRzLnNlcmlhbGl6ZVtjb250ZW50VHlwZV07XG4gICAgICBpZiAoIXNlcmlhbGl6ZSAmJiBpc0pTT04oY29udGVudFR5cGUpKSB7XG4gICAgICAgIHNlcmlhbGl6ZSA9IGV4cG9ydHMuc2VyaWFsaXplWydhcHBsaWNhdGlvbi9qc29uJ107XG4gICAgICB9XG5cbiAgICAgIGlmIChzZXJpYWxpemUpIGRhdGEgPSBzZXJpYWxpemUoZGF0YSk7XG4gICAgfVxuXG4gICAgLy8gY29udGVudC1sZW5ndGhcbiAgICBpZiAoZGF0YSAmJiAhcmVxLmdldEhlYWRlcignQ29udGVudC1MZW5ndGgnKSkge1xuICAgICAgcmVxLnNldEhlYWRlcihcbiAgICAgICAgJ0NvbnRlbnQtTGVuZ3RoJyxcbiAgICAgICAgQnVmZmVyLmlzQnVmZmVyKGRhdGEpID8gZGF0YS5sZW5ndGggOiBCdWZmZXIuYnl0ZUxlbmd0aChkYXRhKVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICAvLyByZXNwb25zZVxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY29tcGxleGl0eVxuICByZXEub25jZSgncmVzcG9uc2UnLCAocmVzKSA9PiB7XG4gICAgZGVidWcoJyVzICVzIC0+ICVzJywgdGhpcy5tZXRob2QsIHRoaXMudXJsLCByZXMuc3RhdHVzQ29kZSk7XG5cbiAgICBpZiAodGhpcy5fcmVzcG9uc2VUaW1lb3V0VGltZXIpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLl9yZXNwb25zZVRpbWVvdXRUaW1lcik7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucGlwZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBtYXggPSB0aGlzLl9tYXhSZWRpcmVjdHM7XG4gICAgY29uc3QgbWltZSA9IHV0aWxzLnR5cGUocmVzLmhlYWRlcnNbJ2NvbnRlbnQtdHlwZSddIHx8ICcnKSB8fCAndGV4dC9wbGFpbic7XG4gICAgbGV0IHR5cGUgPSBtaW1lLnNwbGl0KCcvJylbMF07XG4gICAgaWYgKHR5cGUpIHR5cGUgPSB0eXBlLnRvTG93ZXJDYXNlKCkudHJpbSgpO1xuICAgIGNvbnN0IG11bHRpcGFydCA9IHR5cGUgPT09ICdtdWx0aXBhcnQnO1xuICAgIGNvbnN0IHJlZGlyZWN0ID0gaXNSZWRpcmVjdChyZXMuc3RhdHVzQ29kZSk7XG4gICAgY29uc3QgcmVzcG9uc2VUeXBlID0gdGhpcy5fcmVzcG9uc2VUeXBlO1xuXG4gICAgdGhpcy5yZXMgPSByZXM7XG5cbiAgICAvLyByZWRpcmVjdFxuICAgIGlmIChyZWRpcmVjdCAmJiB0aGlzLl9yZWRpcmVjdHMrKyAhPT0gbWF4KSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVkaXJlY3QocmVzKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5tZXRob2QgPT09ICdIRUFEJykge1xuICAgICAgdGhpcy5lbWl0KCdlbmQnKTtcbiAgICAgIHRoaXMuY2FsbGJhY2sobnVsbCwgdGhpcy5fZW1pdFJlc3BvbnNlKCkpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIHpsaWIgc3VwcG9ydFxuICAgIGlmICh0aGlzLl9zaG91bGRVbnppcChyZXMpKSB7XG4gICAgICB1bnppcChyZXEsIHJlcyk7XG4gICAgfVxuXG4gICAgbGV0IGJ1ZmZlciA9IHRoaXMuX2J1ZmZlcjtcbiAgICBpZiAoYnVmZmVyID09PSB1bmRlZmluZWQgJiYgbWltZSBpbiBleHBvcnRzLmJ1ZmZlcikge1xuICAgICAgYnVmZmVyID0gQm9vbGVhbihleHBvcnRzLmJ1ZmZlclttaW1lXSk7XG4gICAgfVxuXG4gICAgbGV0IHBhcnNlciA9IHRoaXMuX3BhcnNlcjtcbiAgICBpZiAodW5kZWZpbmVkID09PSBidWZmZXIgJiYgcGFyc2VyKSB7XG4gICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgIFwiQSBjdXN0b20gc3VwZXJhZ2VudCBwYXJzZXIgaGFzIGJlZW4gc2V0LCBidXQgYnVmZmVyaW5nIHN0cmF0ZWd5IGZvciB0aGUgcGFyc2VyIGhhc24ndCBiZWVuIGNvbmZpZ3VyZWQuIENhbGwgYHJlcS5idWZmZXIodHJ1ZSBvciBmYWxzZSlgIG9yIHNldCBgc3VwZXJhZ2VudC5idWZmZXJbbWltZV0gPSB0cnVlIG9yIGZhbHNlYFwiXG4gICAgICApO1xuICAgICAgYnVmZmVyID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoIXBhcnNlcikge1xuICAgICAgaWYgKHJlc3BvbnNlVHlwZSkge1xuICAgICAgICBwYXJzZXIgPSBleHBvcnRzLnBhcnNlLmltYWdlOyAvLyBJdCdzIGFjdHVhbGx5IGEgZ2VuZXJpYyBCdWZmZXJcbiAgICAgICAgYnVmZmVyID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSBpZiAobXVsdGlwYXJ0KSB7XG4gICAgICAgIGNvbnN0IGZvcm0gPSBmb3JtaWRhYmxlKCk7XG4gICAgICAgIHBhcnNlciA9IGZvcm0ucGFyc2UuYmluZChmb3JtKTtcbiAgICAgICAgYnVmZmVyID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSBpZiAoaXNJbWFnZU9yVmlkZW8obWltZSkpIHtcbiAgICAgICAgcGFyc2VyID0gZXhwb3J0cy5wYXJzZS5pbWFnZTtcbiAgICAgICAgYnVmZmVyID0gdHJ1ZTsgLy8gRm9yIGJhY2t3YXJkcy1jb21wYXRpYmlsaXR5IGJ1ZmZlcmluZyBkZWZhdWx0IGlzIGFkLWhvYyBNSU1FLWRlcGVuZGVudFxuICAgICAgfSBlbHNlIGlmIChleHBvcnRzLnBhcnNlW21pbWVdKSB7XG4gICAgICAgIHBhcnNlciA9IGV4cG9ydHMucGFyc2VbbWltZV07XG4gICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICd0ZXh0Jykge1xuICAgICAgICBwYXJzZXIgPSBleHBvcnRzLnBhcnNlLnRleHQ7XG4gICAgICAgIGJ1ZmZlciA9IGJ1ZmZlciAhPT0gZmFsc2U7XG5cbiAgICAgICAgLy8gZXZlcnlvbmUgd2FudHMgdGhlaXIgb3duIHdoaXRlLWxhYmVsZWQganNvblxuICAgICAgfSBlbHNlIGlmIChpc0pTT04obWltZSkpIHtcbiAgICAgICAgcGFyc2VyID0gZXhwb3J0cy5wYXJzZVsnYXBwbGljYXRpb24vanNvbiddO1xuICAgICAgICBidWZmZXIgPSBidWZmZXIgIT09IGZhbHNlO1xuICAgICAgfSBlbHNlIGlmIChidWZmZXIpIHtcbiAgICAgICAgcGFyc2VyID0gZXhwb3J0cy5wYXJzZS50ZXh0O1xuICAgICAgfSBlbHNlIGlmICh1bmRlZmluZWQgPT09IGJ1ZmZlcikge1xuICAgICAgICBwYXJzZXIgPSBleHBvcnRzLnBhcnNlLmltYWdlOyAvLyBJdCdzIGFjdHVhbGx5IGEgZ2VuZXJpYyBCdWZmZXJcbiAgICAgICAgYnVmZmVyID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBieSBkZWZhdWx0IG9ubHkgYnVmZmVyIHRleHQvKiwganNvbiBhbmQgbWVzc2VkIHVwIHRoaW5nIGZyb20gaGVsbFxuICAgIGlmICgodW5kZWZpbmVkID09PSBidWZmZXIgJiYgaXNUZXh0KG1pbWUpKSB8fCBpc0pTT04obWltZSkpIHtcbiAgICAgIGJ1ZmZlciA9IHRydWU7XG4gICAgfVxuXG4gICAgdGhpcy5fcmVzQnVmZmVyZWQgPSBidWZmZXI7XG4gICAgbGV0IHBhcnNlckhhbmRsZXNFbmQgPSBmYWxzZTtcbiAgICBpZiAoYnVmZmVyKSB7XG4gICAgICAvLyBQcm90ZWN0aW9uYSBhZ2FpbnN0IHppcCBib21icyBhbmQgb3RoZXIgbnVpc2FuY2VcbiAgICAgIGxldCByZXNwb25zZUJ5dGVzTGVmdCA9IHRoaXMuX21heFJlc3BvbnNlU2l6ZSB8fCAyMDBfMDAwXzAwMDtcbiAgICAgIHJlcy5vbignZGF0YScsIChidWYpID0+IHtcbiAgICAgICAgcmVzcG9uc2VCeXRlc0xlZnQgLT0gYnVmLmJ5dGVMZW5ndGggfHwgYnVmLmxlbmd0aCA+IDAgPyBidWYubGVuZ3RoIDogMDtcbiAgICAgICAgaWYgKHJlc3BvbnNlQnl0ZXNMZWZ0IDwgMCkge1xuICAgICAgICAgIC8vIFRoaXMgd2lsbCBwcm9wYWdhdGUgdGhyb3VnaCBlcnJvciBldmVudFxuICAgICAgICAgIGNvbnN0IGVycm9yID0gbmV3IEVycm9yKCdNYXhpbXVtIHJlc3BvbnNlIHNpemUgcmVhY2hlZCcpO1xuICAgICAgICAgIGVycm9yLmNvZGUgPSAnRVRPT0xBUkdFJztcbiAgICAgICAgICAvLyBQYXJzZXJzIGFyZW4ndCByZXF1aXJlZCB0byBvYnNlcnZlIGVycm9yIGV2ZW50LFxuICAgICAgICAgIC8vIHNvIHdvdWxkIGluY29ycmVjdGx5IHJlcG9ydCBzdWNjZXNzXG4gICAgICAgICAgcGFyc2VySGFuZGxlc0VuZCA9IGZhbHNlO1xuICAgICAgICAgIC8vIFdpbGwgbm90IGVtaXQgZXJyb3IgZXZlbnRcbiAgICAgICAgICByZXMuZGVzdHJveShlcnJvcik7XG4gICAgICAgICAgLy8gc28gd2UgZG8gY2FsbGJhY2sgbm93XG4gICAgICAgICAgdGhpcy5jYWxsYmFjayhlcnJvciwgbnVsbCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChwYXJzZXIpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFVuYnVmZmVyZWQgcGFyc2VycyBhcmUgc3VwcG9zZWQgdG8gZW1pdCByZXNwb25zZSBlYXJseSxcbiAgICAgICAgLy8gd2hpY2ggaXMgd2VpcmQgQlRXLCBiZWNhdXNlIHJlc3BvbnNlLmJvZHkgd29uJ3QgYmUgdGhlcmUuXG4gICAgICAgIHBhcnNlckhhbmRsZXNFbmQgPSBidWZmZXI7XG5cbiAgICAgICAgcGFyc2VyKHJlcywgKGVycm9yLCBvYmplY3QsIGZpbGVzKSA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMudGltZWRvdXQpIHtcbiAgICAgICAgICAgIC8vIFRpbWVvdXQgaGFzIGFscmVhZHkgaGFuZGxlZCBhbGwgY2FsbGJhY2tzXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gSW50ZW50aW9uYWwgKG5vbi10aW1lb3V0KSBhYm9ydCBpcyBzdXBwb3NlZCB0byBwcmVzZXJ2ZSBwYXJ0aWFsIHJlc3BvbnNlLFxuICAgICAgICAgIC8vIGV2ZW4gaWYgaXQgZG9lc24ndCBwYXJzZS5cbiAgICAgICAgICBpZiAoZXJyb3IgJiYgIXRoaXMuX2Fib3J0ZWQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNhbGxiYWNrKGVycm9yKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAocGFyc2VySGFuZGxlc0VuZCkge1xuICAgICAgICAgICAgdGhpcy5lbWl0KCdlbmQnKTtcbiAgICAgICAgICAgIHRoaXMuY2FsbGJhY2sobnVsbCwgdGhpcy5fZW1pdFJlc3BvbnNlKG9iamVjdCwgZmlsZXMpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHRoaXMuY2FsbGJhY2soZXJyKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMucmVzID0gcmVzO1xuXG4gICAgLy8gdW5idWZmZXJlZFxuICAgIGlmICghYnVmZmVyKSB7XG4gICAgICBkZWJ1ZygndW5idWZmZXJlZCAlcyAlcycsIHRoaXMubWV0aG9kLCB0aGlzLnVybCk7XG4gICAgICB0aGlzLmNhbGxiYWNrKG51bGwsIHRoaXMuX2VtaXRSZXNwb25zZSgpKTtcbiAgICAgIGlmIChtdWx0aXBhcnQpIHJldHVybjsgLy8gYWxsb3cgbXVsdGlwYXJ0IHRvIGhhbmRsZSBlbmQgZXZlbnRcbiAgICAgIHJlcy5vbmNlKCdlbmQnLCAoKSA9PiB7XG4gICAgICAgIGRlYnVnKCdlbmQgJXMgJXMnLCB0aGlzLm1ldGhvZCwgdGhpcy51cmwpO1xuICAgICAgICB0aGlzLmVtaXQoJ2VuZCcpO1xuICAgICAgfSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gdGVybWluYXRpbmcgZXZlbnRzXG4gICAgcmVzLm9uY2UoJ2Vycm9yJywgKGVycm9yKSA9PiB7XG4gICAgICBwYXJzZXJIYW5kbGVzRW5kID0gZmFsc2U7XG4gICAgICB0aGlzLmNhbGxiYWNrKGVycm9yLCBudWxsKTtcbiAgICB9KTtcbiAgICBpZiAoIXBhcnNlckhhbmRsZXNFbmQpXG4gICAgICByZXMub25jZSgnZW5kJywgKCkgPT4ge1xuICAgICAgICBkZWJ1ZygnZW5kICVzICVzJywgdGhpcy5tZXRob2QsIHRoaXMudXJsKTtcbiAgICAgICAgLy8gVE9ETzogdW5sZXNzIGJ1ZmZlcmluZyBlbWl0IGVhcmxpZXIgdG8gc3RyZWFtXG4gICAgICAgIHRoaXMuZW1pdCgnZW5kJyk7XG4gICAgICAgIHRoaXMuY2FsbGJhY2sobnVsbCwgdGhpcy5fZW1pdFJlc3BvbnNlKCkpO1xuICAgICAgfSk7XG4gIH0pO1xuXG4gIHRoaXMuZW1pdCgncmVxdWVzdCcsIHRoaXMpO1xuXG4gIGNvbnN0IGdldFByb2dyZXNzTW9uaXRvciA9ICgpID0+IHtcbiAgICBjb25zdCBsZW5ndGhDb21wdXRhYmxlID0gdHJ1ZTtcbiAgICBjb25zdCB0b3RhbCA9IHJlcS5nZXRIZWFkZXIoJ0NvbnRlbnQtTGVuZ3RoJyk7XG4gICAgbGV0IGxvYWRlZCA9IDA7XG5cbiAgICBjb25zdCBwcm9ncmVzcyA9IG5ldyBTdHJlYW0uVHJhbnNmb3JtKCk7XG4gICAgcHJvZ3Jlc3MuX3RyYW5zZm9ybSA9IChjaHVuaywgZW5jb2RpbmcsIGNhbGxiYWNrKSA9PiB7XG4gICAgICBsb2FkZWQgKz0gY2h1bmsubGVuZ3RoO1xuICAgICAgdGhpcy5lbWl0KCdwcm9ncmVzcycsIHtcbiAgICAgICAgZGlyZWN0aW9uOiAndXBsb2FkJyxcbiAgICAgICAgbGVuZ3RoQ29tcHV0YWJsZSxcbiAgICAgICAgbG9hZGVkLFxuICAgICAgICB0b3RhbFxuICAgICAgfSk7XG4gICAgICBjYWxsYmFjayhudWxsLCBjaHVuayk7XG4gICAgfTtcblxuICAgIHJldHVybiBwcm9ncmVzcztcbiAgfTtcblxuICBjb25zdCBidWZmZXJUb0NodW5rcyA9IChidWZmZXIpID0+IHtcbiAgICBjb25zdCBjaHVua1NpemUgPSAxNiAqIDEwMjQ7IC8vIGRlZmF1bHQgaGlnaFdhdGVyTWFyayB2YWx1ZVxuICAgIGNvbnN0IGNodW5raW5nID0gbmV3IFN0cmVhbS5SZWFkYWJsZSgpO1xuICAgIGNvbnN0IHRvdGFsTGVuZ3RoID0gYnVmZmVyLmxlbmd0aDtcbiAgICBjb25zdCByZW1haW5kZXIgPSB0b3RhbExlbmd0aCAlIGNodW5rU2l6ZTtcbiAgICBjb25zdCBjdXRvZmYgPSB0b3RhbExlbmd0aCAtIHJlbWFpbmRlcjtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY3V0b2ZmOyBpICs9IGNodW5rU2l6ZSkge1xuICAgICAgY29uc3QgY2h1bmsgPSBidWZmZXIuc2xpY2UoaSwgaSArIGNodW5rU2l6ZSk7XG4gICAgICBjaHVua2luZy5wdXNoKGNodW5rKTtcbiAgICB9XG5cbiAgICBpZiAocmVtYWluZGVyID4gMCkge1xuICAgICAgY29uc3QgcmVtYWluZGVyQnVmZmVyID0gYnVmZmVyLnNsaWNlKC1yZW1haW5kZXIpO1xuICAgICAgY2h1bmtpbmcucHVzaChyZW1haW5kZXJCdWZmZXIpO1xuICAgIH1cblxuICAgIGNodW5raW5nLnB1c2gobnVsbCk7IC8vIG5vIG1vcmUgZGF0YVxuXG4gICAgcmV0dXJuIGNodW5raW5nO1xuICB9O1xuXG4gIC8vIGlmIGEgRm9ybURhdGEgaW5zdGFuY2UgZ290IGNyZWF0ZWQsIHRoZW4gd2Ugc2VuZCB0aGF0IGFzIHRoZSByZXF1ZXN0IGJvZHlcbiAgY29uc3QgZm9ybURhdGEgPSB0aGlzLl9mb3JtRGF0YTtcbiAgaWYgKGZvcm1EYXRhKSB7XG4gICAgLy8gc2V0IGhlYWRlcnNcbiAgICBjb25zdCBoZWFkZXJzID0gZm9ybURhdGEuZ2V0SGVhZGVycygpO1xuICAgIGZvciAoY29uc3QgaSBpbiBoZWFkZXJzKSB7XG4gICAgICBpZiAoaGFzT3duKGhlYWRlcnMsIGkpKSB7XG4gICAgICAgIGRlYnVnKCdzZXR0aW5nIEZvcm1EYXRhIGhlYWRlcjogXCIlczogJXNcIicsIGksIGhlYWRlcnNbaV0pO1xuICAgICAgICByZXEuc2V0SGVhZGVyKGksIGhlYWRlcnNbaV0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGF0dGVtcHQgdG8gZ2V0IFwiQ29udGVudC1MZW5ndGhcIiBoZWFkZXJcbiAgICBmb3JtRGF0YS5nZXRMZW5ndGgoKGVycm9yLCBsZW5ndGgpID0+IHtcbiAgICAgIC8vIFRPRE86IEFkZCBjaHVua2VkIGVuY29kaW5nIHdoZW4gbm8gbGVuZ3RoIChpZiBlcnIpXG4gICAgICBpZiAoZXJyb3IpIGRlYnVnKCdmb3JtRGF0YS5nZXRMZW5ndGggaGFkIGVycm9yJywgZXJyb3IsIGxlbmd0aCk7XG5cbiAgICAgIGRlYnVnKCdnb3QgRm9ybURhdGEgQ29udGVudC1MZW5ndGg6ICVzJywgbGVuZ3RoKTtcbiAgICAgIGlmICh0eXBlb2YgbGVuZ3RoID09PSAnbnVtYmVyJykge1xuICAgICAgICByZXEuc2V0SGVhZGVyKCdDb250ZW50LUxlbmd0aCcsIGxlbmd0aCk7XG4gICAgICB9XG5cbiAgICAgIGZvcm1EYXRhLnBpcGUoZ2V0UHJvZ3Jlc3NNb25pdG9yKCkpLnBpcGUocmVxKTtcbiAgICB9KTtcbiAgfSBlbHNlIGlmIChCdWZmZXIuaXNCdWZmZXIoZGF0YSkpIHtcbiAgICBidWZmZXJUb0NodW5rcyhkYXRhKS5waXBlKGdldFByb2dyZXNzTW9uaXRvcigpKS5waXBlKHJlcSk7XG4gIH0gZWxzZSB7XG4gICAgcmVxLmVuZChkYXRhKTtcbiAgfVxufTtcblxuLy8gQ2hlY2sgd2hldGhlciByZXNwb25zZSBoYXMgYSBub24tMC1zaXplZCBnemlwLWVuY29kZWQgYm9keVxuUmVxdWVzdC5wcm90b3R5cGUuX3Nob3VsZFVuemlwID0gKHJlcykgPT4ge1xuICBpZiAocmVzLnN0YXR1c0NvZGUgPT09IDIwNCB8fCByZXMuc3RhdHVzQ29kZSA9PT0gMzA0KSB7XG4gICAgLy8gVGhlc2UgYXJlbid0IHN1cHBvc2VkIHRvIGhhdmUgYW55IGJvZHlcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvLyBoZWFkZXIgY29udGVudCBpcyBhIHN0cmluZywgYW5kIGRpc3RpbmN0aW9uIGJldHdlZW4gMCBhbmQgbm8gaW5mb3JtYXRpb24gaXMgY3J1Y2lhbFxuICBpZiAocmVzLmhlYWRlcnNbJ2NvbnRlbnQtbGVuZ3RoJ10gPT09ICcwJykge1xuICAgIC8vIFdlIGtub3cgdGhhdCB0aGUgYm9keSBpcyBlbXB0eSAodW5mb3J0dW5hdGVseSwgdGhpcyBjaGVjayBkb2VzIG5vdCBjb3ZlciBjaHVua2VkIGVuY29kaW5nKVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8vIGNvbnNvbGUubG9nKHJlcyk7XG4gIHJldHVybiAvXlxccyooPzpkZWZsYXRlfGd6aXApXFxzKiQvLnRlc3QocmVzLmhlYWRlcnNbJ2NvbnRlbnQtZW5jb2RpbmcnXSk7XG59O1xuXG4vKipcbiAqIE92ZXJyaWRlcyBETlMgZm9yIHNlbGVjdGVkIGhvc3RuYW1lcy4gVGFrZXMgb2JqZWN0IG1hcHBpbmcgaG9zdG5hbWVzIHRvIElQIGFkZHJlc3Nlcy5cbiAqXG4gKiBXaGVuIG1ha2luZyBhIHJlcXVlc3QgdG8gYSBVUkwgd2l0aCBhIGhvc3RuYW1lIGV4YWN0bHkgbWF0Y2hpbmcgYSBrZXkgaW4gdGhlIG9iamVjdCxcbiAqIHVzZSB0aGUgZ2l2ZW4gSVAgYWRkcmVzcyB0byBjb25uZWN0LCBpbnN0ZWFkIG9mIHVzaW5nIEROUyB0byByZXNvbHZlIHRoZSBob3N0bmFtZS5cbiAqXG4gKiBBIHNwZWNpYWwgaG9zdCBgKmAgbWF0Y2hlcyBldmVyeSBob3N0bmFtZSAoa2VlcCByZWRpcmVjdHMgaW4gbWluZCEpXG4gKlxuICogICAgICByZXF1ZXN0LmNvbm5lY3Qoe1xuICogICAgICAgICd0ZXN0LmV4YW1wbGUuY29tJzogJzEyNy4wLjAuMScsXG4gKiAgICAgICAgJ2lwdjYuZXhhbXBsZS5jb20nOiAnOjoxJyxcbiAqICAgICAgfSlcbiAqL1xuUmVxdWVzdC5wcm90b3R5cGUuY29ubmVjdCA9IGZ1bmN0aW9uIChjb25uZWN0T3ZlcnJpZGUpIHtcbiAgaWYgKHR5cGVvZiBjb25uZWN0T3ZlcnJpZGUgPT09ICdzdHJpbmcnKSB7XG4gICAgdGhpcy5fY29ubmVjdE92ZXJyaWRlID0geyAnKic6IGNvbm5lY3RPdmVycmlkZSB9O1xuICB9IGVsc2UgaWYgKHR5cGVvZiBjb25uZWN0T3ZlcnJpZGUgPT09ICdvYmplY3QnKSB7XG4gICAgdGhpcy5fY29ubmVjdE92ZXJyaWRlID0gY29ubmVjdE92ZXJyaWRlO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuX2Nvbm5lY3RPdmVycmlkZSA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuUmVxdWVzdC5wcm90b3R5cGUudHJ1c3RMb2NhbGhvc3QgPSBmdW5jdGlvbiAodG9nZ2xlKSB7XG4gIHRoaXMuX3RydXN0TG9jYWxob3N0ID0gdG9nZ2xlID09PSB1bmRlZmluZWQgPyB0cnVlIDogdG9nZ2xlO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8vIGdlbmVyYXRlIEhUVFAgdmVyYiBtZXRob2RzXG5pZiAoIW1ldGhvZHMuaW5jbHVkZXMoJ2RlbCcpKSB7XG4gIC8vIGNyZWF0ZSBhIGNvcHkgc28gd2UgZG9uJ3QgY2F1c2UgY29uZmxpY3RzIHdpdGhcbiAgLy8gb3RoZXIgcGFja2FnZXMgdXNpbmcgdGhlIG1ldGhvZHMgcGFja2FnZSBhbmRcbiAgLy8gbnBtIDMueFxuICBtZXRob2RzID0gWy4uLm1ldGhvZHNdO1xuICBtZXRob2RzLnB1c2goJ2RlbCcpO1xufVxuXG5mb3IgKGxldCBtZXRob2Qgb2YgbWV0aG9kcykge1xuICBjb25zdCBuYW1lID0gbWV0aG9kO1xuICBtZXRob2QgPSBtZXRob2QgPT09ICdkZWwnID8gJ2RlbGV0ZScgOiBtZXRob2Q7XG5cbiAgbWV0aG9kID0gbWV0aG9kLnRvVXBwZXJDYXNlKCk7XG4gIHJlcXVlc3RbbmFtZV0gPSAodXJsLCBkYXRhLCBmbikgPT4ge1xuICAgIGNvbnN0IHJlcXVlc3RfID0gcmVxdWVzdChtZXRob2QsIHVybCk7XG4gICAgaWYgKHR5cGVvZiBkYXRhID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBmbiA9IGRhdGE7XG4gICAgICBkYXRhID0gbnVsbDtcbiAgICB9XG5cbiAgICBpZiAoZGF0YSkge1xuICAgICAgaWYgKG1ldGhvZCA9PT0gJ0dFVCcgfHwgbWV0aG9kID09PSAnSEVBRCcpIHtcbiAgICAgICAgcmVxdWVzdF8ucXVlcnkoZGF0YSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXF1ZXN0Xy5zZW5kKGRhdGEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChmbikgcmVxdWVzdF8uZW5kKGZuKTtcbiAgICByZXR1cm4gcmVxdWVzdF87XG4gIH07XG59XG5cbi8qKlxuICogQ2hlY2sgaWYgYG1pbWVgIGlzIHRleHQgYW5kIHNob3VsZCBiZSBidWZmZXJlZC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbWltZVxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gaXNUZXh0KG1pbWUpIHtcbiAgY29uc3QgcGFydHMgPSBtaW1lLnNwbGl0KCcvJyk7XG4gIGxldCB0eXBlID0gcGFydHNbMF07XG4gIGlmICh0eXBlKSB0eXBlID0gdHlwZS50b0xvd2VyQ2FzZSgpLnRyaW0oKTtcbiAgbGV0IHN1YnR5cGUgPSBwYXJ0c1sxXTtcbiAgaWYgKHN1YnR5cGUpIHN1YnR5cGUgPSBzdWJ0eXBlLnRvTG93ZXJDYXNlKCkudHJpbSgpO1xuXG4gIHJldHVybiB0eXBlID09PSAndGV4dCcgfHwgc3VidHlwZSA9PT0gJ3gtd3d3LWZvcm0tdXJsZW5jb2RlZCc7XG59XG5cbmZ1bmN0aW9uIGlzSW1hZ2VPclZpZGVvKG1pbWUpIHtcbiAgbGV0IHR5cGUgPSBtaW1lLnNwbGl0KCcvJylbMF07XG4gIGlmICh0eXBlKSB0eXBlID0gdHlwZS50b0xvd2VyQ2FzZSgpLnRyaW0oKTtcblxuICByZXR1cm4gdHlwZSA9PT0gJ2ltYWdlJyB8fCB0eXBlID09PSAndmlkZW8nO1xufVxuXG4vKipcbiAqIENoZWNrIGlmIGBtaW1lYCBpcyBqc29uIG9yIGhhcyAranNvbiBzdHJ1Y3R1cmVkIHN5bnRheCBzdWZmaXguXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG1pbWVcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBpc0pTT04obWltZSkge1xuICAvLyBzaG91bGQgbWF0Y2ggL2pzb24gb3IgK2pzb25cbiAgLy8gYnV0IG5vdCAvanNvbi1zZXFcbiAgcmV0dXJuIC9bLytdanNvbigkfFteLVxcd10pL2kudGVzdChtaW1lKTtcbn1cblxuLyoqXG4gKiBDaGVjayBpZiB3ZSBzaG91bGQgZm9sbG93IHRoZSByZWRpcmVjdCBgY29kZWAuXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IGNvZGVcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBpc1JlZGlyZWN0KGNvZGUpIHtcbiAgcmV0dXJuIFszMDEsIDMwMiwgMzAzLCAzMDUsIDMwNywgMzA4XS5pbmNsdWRlcyhjb2RlKTtcbn1cbiJdfQ==