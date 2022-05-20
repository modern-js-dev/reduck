/*! where.js */

/**
 * This search items from an array, or generates a conditional function compiled from where-clause operators object.
 * Since version 0.0.4, dot notation (e.g. foo.bar.baz) is supported to handle child nodes.
 *
 * @method obop.prototype.where
 * @param {Array} [array] - source array to search
 * @param {Object|Function} param - query selector or function
 * @see http://docs.mongodb.org/manual/reference/operator/#query-params
 * @returns {Array} Array of matched items (if source array given)
 * @returns {Function} Conditional function compiled for Array.prototype.filter() method (if source array not given)
 * @returns {Error} Error instance (if source array not given but invalid query selector given)
 *
 * @example
 * var list = [
 *    { name: "apple", price: 50 },
 *    { name: "orange", price: 10 },
 *    { name: "pineapple", price: 70 },
 *    { name: "grape", price: 30 }
 * ];
 *
 * // search without obop
 * var out1 = list.filter(function(item) {
 *     return item.name == "orange";
 * });
 * console.log(out1);
 *
 * // search with obop
 * var where = { name: "orange" };
 * var out2 = obop.where(list, where);
 * console.log(out2);
 *
 * // compile a search function
 * var where = { name: "orange" };
 * var filter = obop.where(where);
 * if (filter instanceof Error) throw filter;
 * var out3 = list.filter(filter);
 * console.log(out3);
 */

exports.where = function(array, param) {
  var func;
  var len = arguments.length;
  if (len == 1) {
    func = where.call(this, array);
    if (func instanceof Error) throw func;
    return func;
  } else if (len == 2) {
    if (array instanceof Array) {
      func = where.call(this, param);
      if (func instanceof Error) throw func;
      return array.filter(func);
    } else {
      throw new Error('Invalid argument type: ' + array);
    }
  } else {
    throw new Error('Invalid arguments length: ' + len);
  }
};

function where(param) {
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
    return new Error('Invalid where operator type: ' + param);
  }

  var array = [];
  var equal = {};
  var hasdot = {};
  var children = {};

  // group queries
  for (var key1 in param) {
    var val1 = param[key1];
    var pos1 = key1.indexOf('.');
    var gen1 = obop.$where[key1];
    if (gen1) {
      // {"$gt": 1234}
      var f = gen1(val1, obop, key1);
      if (f) array.push(f);
    } else if (pos1 > -1) {
      // {"foo.bar": 1234}
      var pre1 = key1.substr(0, pos1);
      var post1 = key1.substr(pos1 + 1);
      hasdot[pre1] = hasdot[pre1] || {};
      hasdot[pre1][post1] = val1;
    } else if (val1 instanceof Array) {
      // {"foo": []}
      return new Error('Unknown where operator: ' + key1);
    } else if ('object' == typeof val1) {
      // {"foo": {}}
      children[key1] = val1;
    } else {
      // {"foo": 1234}
      equal[key1] = val1;
    }
  }

  var sckeys = Object.keys(equal);
  if (sckeys.length == 1) {
    // one equal operator (faster)
    var key = sckeys[0];
    var val = param[key];
    var single_eq = function(item) {
      return ('object' === typeof item) && item[key] == val;
    };
    array.push(single_eq);
  } else if (sckeys.length > 1) {
    // more equal operators
    var multiple_eq = function(item) {
      if ('object' !== typeof item) return false;
      for (var key in equal) {
        if (item[key] != equal[key]) return false;
      }
      return true;
    };
    array.push(multiple_eq);
  }

  var err;
  add_children(hasdot);
  add_children(children);
  if (err) return new Error(err);

  // one query type used
  if (array.length < 2) {
    return array.shift() || _nop;
  }

  // more query types used
  return join_and(array);

  function add_children(hash) {
    Object.keys(hash).forEach(function(key) {
      if (err) return;
      var param = hash[key];
      var where = obop.where(param);
      if (!where) return;
      if (where instanceof Error) {
        err = where;
        return;
      }
      var f = function(item) {
        return where(item ? item[key] : void 0);
      };
      if (f) array.push(f);
    });
  }
}

function check_err(array) {
  var len = array.length;
  for (var i = 0; i < len; i++) {
    var f = array[i];
    if (f instanceof Error) return f;
  }
}

function join_and(array) {
  var len = array.length;
  return check_err(array) || function(item) {
    for (var i = 0; i < len; i++) {
      var f = array[i];
      if (!f(item)) return false;
    }
    return true;
  };
}
