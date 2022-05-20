/*! view.js */

/**
 * This filters fields of items, or generates a projection function compiled from view mapping parameters object.
 * Since version 0.0.6, dot notation (e.g. foo.bar.baz) is supported to handle child nodes.
 *
 * @method obop.prototype.view
 * @param {Array} [array] - source array to map
 * @param {Object|Function} param - output fields or function
 * @returns {Array} Array of filtered items (if source array given)
 * @returns {Function} Projection function compiled for Array.prototype.map() method (if source array not given)
 * @returns {Error} Error instance (if source array not given but invalid output fields specified)
 *
 * @example
 * var list = [
 *    { name: "apple", price: 50 },
 *    { name: "orange", price: 10 },
 *    { name: "pineapple", price: 70 },
 *    { name: "grape", price: 30 }
 * ];
 *
 * // map without obop
 * var out1 = list.map(function(item) {
 *     return { name: item.name };
 * });
 * console.log(out1);
 *
 * // map with obop
 * var view = { name: 1 };
 * var out2 = obop.view(list, view);
 * console.log(out2);
 *
 * // compile a map function
 * var view = { name: 1 };
 * var filter = obop.view(view);
 * if (filter instanceof Error) throw filter;
 * var out3 = list.map(filter);
 * console.log(out3);
 */

exports.view = function(array, param) {
  var func;
  var len = arguments.length;
  if (len == 1) {
    func = view.call(this, array);
    if (func instanceof Error) throw func;
    return func;
  } else if (len == 2) {
    if (array instanceof Array) {
      func = view.call(this, param);
      if (func instanceof Error) throw func;
      return array.map(func);
    } else {
      throw new Error('Invalid argument type: ' + array);
    }
  } else {
    throw new Error('Invalid arguments length: ' + len);
  }
};

function view(param) {
  var obop = this;
  var _nop = null; // no operation

  // function type
  if ('function' == typeof param) {
    return param;
  }

  // default parameters
  param = param || {};

  // other types than object
  if ('object' != typeof param) {
    return new Error('Invalid view parameters type: ' + param);
  }

  var queries = Object.keys(param);

  // no param: all properties
  if (!queries.length) {
    return _nop;
  }

  var key0 = queries[0];
  var truthy = {};
  var falsy = {};
  var dottruthy = {};
  var dotfalsy = {};
  var hasdot;

  // group parameters
  for (var key in param) {
    var val = param[key];
    var pos1 = key.indexOf('.');

    if (pos1 > -1) {
      var pre = key.substr(0, pos1);
      var post = key.substr(pos1 + 1);
      hasdot = true;
      if (val) {
        // {"foo.bar": 1}
        dottruthy[pre] = dottruthy[pre] || {};
        dottruthy[pre][post] = val;
      } else {
        // {"foo.bar": 0}
        dotfalsy[pre] = dotfalsy[pre] || {};
        dotfalsy[pre][post] = val;
      }
    } else if (val) {
      // {"foo": 1}
      truthy[key] = true;
    } else {
      // {"bar": 0}
      falsy[key] = true;
    }
  }

  if (hasdot) {
    Object.keys(dottruthy).forEach(function(key) {
      var param = dottruthy[key];
      truthy[key] = obop.view(param);
    });

    Object.keys(dotfalsy).forEach(function(key) {
      var param = dotfalsy[key];
      falsy[key] = obop.view(param);
    });
  }

  var _truthy = Object.keys(truthy).length;
  var _falsy = Object.keys(falsy).length;

  // single truthy field: faster
  if (_truthy === 1 && !_falsy && !hasdot) {
    return single_view;
  }

  if (_truthy && !_falsy) {
    return hasdot ? truthy_has_dot : truthy_view;
  }

  if (!_truthy && _falsy) {
    return hasdot ? falsy_has_dot : falsy_view;
  }

  return truthy_and_falsy;

  function single_view(item) {
    var out = {};
    if (item.hasOwnProperty(key0)) {
      out[key0] = item[key0];
    }
    return out;
  }

  // negative filter

  function falsy_view(item) {
    var out = {};
    Object.keys(item).forEach(function(key) {
      if (!falsy[key]) {
        out[key] = item[key];
      }
    });
    return out;
  }

  // positive filter

  function truthy_view(item) {
    var out = {};
    Object.keys(item).forEach(function(key) {
      if (truthy[key]) {
        out[key] = item[key];
      }
    });
    return out;
  }

  // negative filter (with dot)

  function falsy_has_dot(item) {
    var out = {};
    Object.keys(item).forEach(function(key) {
      var view = falsy[key];
      var val = item[key];
      if ('function' === typeof view) {
        if ('object' === typeof val) {
          out[key] = view(val);
        } else {
          out[key] = val;
        }
      } else if (!view) {
        out[key] = val;
      }
    });
    return out;
  }

  // positive filter (with dot)

  function truthy_has_dot(item) {
    var out = {};
    Object.keys(item).forEach(function(key) {
      var view = truthy[key];
      var val = item[key];
      if ('function' === typeof view) {
        if ('object' === typeof val) {
          out[key] = view(val);
        }
      } else if (view) {
        out[key] = val;
      }
    });
    return out;
  }

  // both positive and negative filters

  function truthy_and_falsy(item) {
    if (_truthy) item = truthy_has_dot(item);
    if (_falsy) item = falsy_has_dot(item);
    return item;
  }
}
