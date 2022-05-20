/*! order.js */

/**
 * This sorts an array of items, or generates a sort function compiled from order-by-clause sort parameters object.
 * Since version 0.0.7, dot notation (e.g. foo.bar.baz) is supported to handle child nodes.
 *
 * @method obop.prototype.order
 * @param {Array} [array] - source array to sort
 * @param {Object|Array|Function} sort - sort parameters or function
 * @returns {Array} Sorted array of items (if source array given)
 * @returns {Function} Sort function compiled for Array.prototype.sort() method (if source array not given)
 * @returns {Error} Error instance (if source array not given but invalid sort parameters given)
 *
 * @example
 * var list = [
 *    { name: "apple", price: 50 },
 *    { name: "orange", price: 10 },
 *    { name: "pineapple", price: 70 },
 *    { name: "grape", price: 30 }
 * ];
 *
 * // without obop
 * var out1 = list.sort(function(a, b) {
 *     return a.price - b.price;
 * });
 * console.log(out1);
 *
 * // with obop
 * var order = { price: 1 };
 * var out2 = obop.order(list, order);
 * console.log(out2);
 *
 * // compile a sort function
 * var order = { price: 1 };
 * var sorter = obop.order(order);
 * if (sorter instanceof Error) throw sorter;
 * var out3 = list.sort(sorter);
 * console.log(out3);
 */

exports.order = function(array, param) {
  var func;
  var len = arguments.length;
  if (len == 1) {
    func = order.call(this, array);
    if (func instanceof Error) throw func;
    return func;
  } else if (len == 2) {
    if (array instanceof Array) {
      func = order.call(this, param);
      if (func instanceof Error) throw func;
      return array.sort(func);
    } else {
      throw new Error('Invalid argument type: ' + array);
    }
  } else {
    throw new Error('Invalid arguments length: ' + len);
  }
};

var cnt = 0;

function order(param) {
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
    return new Error('Invalid order operator type: ' + param);
  }

  if (param instanceof Array) {
    // Array format: [ ["foo", 1], ["bar", -1] ]
    var err;
    param.forEach(function(pair) {
      if (err) return;
      // each pair must have a couple of elements
      if ((pair instanceof Array) &&
        (pair.length === 2) &&
        ('undefined' !== typeof pair[0]) &&
        (pair[1] - pair[1] === 0)) {
        // ok
      } else {
        err = new Error('Invalid order pair: ' + pair);
      }
    });
    if (err) return err;
  } else {
    // Object format: { "foo": 1, "bar": -1 }
    var array = [];
    for (var key in param) {
      var pair = [key, param[key]];
      array.push(pair);
    }

    param = array;
  }

  var len = param.length;

  // no parameters
  if (len === 0) {
    return _nop;
  }

  // one or more parameters
  var func;
  for (var i = len - 1; i >= 0; i--) {
    func = gen(param[i][0], param[i][1], func);
  }
  return func;

  function gen(key, ret, next) {
    var pos = key.indexOf('.');
    var pre, post, pair, test;

    if (pos > -1) {
      pre = key.substr(0, pos);
      post = key.substr(pos + 1);
      pair = [post, ret];
      test = obop.order([pair]);
      return sort_dot;
    } else {
      return sort;
    }

    var undef;

    // function sort(a, b) {
    //   return (a[key] < b[key]) ? -ret : (a[key] > b[key]) ? ret : next ? next(a, b) : 0;
    // }

    function sort(a, b) {
      var aa = a[key];
      var bb = b[key];
      if (aa > bb) return ret;
      if (aa < bb) return -ret;
      if (aa !== undef && bb === undef) return ret;  // aa > bb == undef
      if (aa === undef && bb !== undef) return -ret; // bb > aa == undef
      if (next) return next(a, b);
      return 0;
    }

    function sort_dot(a, b) {
      var aa = a[pre];
      var bb = b[pre];
      var ao = (aa && 'object' === typeof aa);
      var bo = (bb && 'object' === typeof bb);
      if (ao || bo) {
        if (!ao) aa = {};
        if (!bo) bb = {};
        var re = test(aa, bb);
        if (re) return re;
      }
      if (next) return next(a, b);
      return 0;
    }
  }
}
