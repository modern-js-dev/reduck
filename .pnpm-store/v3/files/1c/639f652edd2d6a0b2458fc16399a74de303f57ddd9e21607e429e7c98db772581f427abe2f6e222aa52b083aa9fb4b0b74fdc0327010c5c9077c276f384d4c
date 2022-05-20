/*! update.js */

/**
 * This updates an array of items, or generates an update compiled function from update-clause operators object.
 * Since version 0.0.4, dot notation (e.g. foo.bar.baz) is supported to handle child nodes.
 *
 * @method obop.prototype.update
 * @param {Array} [array] - source array to update
 * @param {Object|Function} update - update operators or function
 * @see http://docs.mongodb.org/manual/reference/operator/#update-operators
 * @returns {Array} Array of updated items (if source array given)
 * @returns {Function} Update function compiled for Array.prototype.map() method (if source array not given)
 * @returns {Error} Error instance (if source array not given but invalid update operaters given)
 *
 * @example
 * var list = [
 *    { name: "apple", price: 50 },
 *    { name: "orange", price: 10 },
 *    { name: "pineapple", price: 70 },
 *    { name: "grape", price: 30 }
 * ];
 *
 * // update without obop
 * var out1 = list.filter(function(item) {
 *     item.sale = true;
 *     item.price -= 5;
 *     return item;
 * });
 * console.log(out1);
 *
 * // update with obop
 * var update = { $set: { sale: true }, $inc: { price: -5 } };
 * var out2 = obop.update(list, update);
 * console.log(out2);
 *
 * // compile a update function
 * var update = { $set: { sale: true }, $inc: { price: -5 } };
 * var updater = obop.update(update);
 * if (updater instanceof Error) throw updater;
 * var out3 = list.map(updater);
 * console.log(out3);
 */

exports.update = function(array, param) {
  var func;
  var len = arguments.length;
  if (len == 1) {
    func = update.call(this, array);
    if (func instanceof Error) throw func;
    return func;
  } else if (len == 2) {
    if (array instanceof Array) {
      func = update.call(this, param);
      if (func instanceof Error) throw func;
      return array.map(func);
    } else {
      throw new Error('Invalid argument type: ' + array);
    }
  } else {
    throw new Error('Invalid arguments length: ' + len);
  }
};

function update(param) {
  var obop = this;
  var _nop = null; // no operation
  var err;

  // function type
  if ('function' == typeof param) {
    return param;
  }

  // default parameters
  param = param || {};

  // no operators: through
  if (!Object.keys(param)) {
    return _nop;
  }

  // other types than object
  if ('object' != typeof param) {
    return new Error('Invalid update operator type: ' + update);
  }

  // parse operators
  var array = [];
  Object.keys(param).forEach(function(op) {
    if (err) return;
    var gen = obop.$update[op];
    if (!gen) {
      err = new Error('Unknown update operator: ' + op);
      return;
    }

    var hash = param[op];
    var root = {};
    var hasdot = {};
    for (var key in hash) {
      var val = hash[key];
      var pos = key.indexOf('.');
      if (pos > -1) {
        // $op: { "pre.post": "val" }
        var pre = key.substr(0, pos);
        var post = key.substr(pos + 1);
        hasdot[pre] = hasdot[pre] || {};
        hasdot[pre][post] = val;
      } else {
        // $op: { "key": "val" }
        root[key] = val;
      }
    }

    // $op: { "key": "val" }
    if (Object.keys(root).length) {
      var f = gen(root);
      array.push(f);
    }

    // $op: { "pre.post": "val" }
    if (Object.keys(hasdot).length) {
      Object.keys(hasdot).forEach(function(key) {
        var tmp = {};
        tmp[op] = hasdot[key];
        var update = obop.update(tmp);
        var f = function(item) {
          var hash = item[key];
          if ('object' !== typeof hash) {
            hash = item[key] = {};
          }
          item[key] = update(hash);
          return item;
        };
        array.push(f);
      });
    }
  });
  if (err) return err;

  // one operator type used
  if (array.length < 2) {
    return array.shift() || _nop;
  }

  // more operator types used
  return join(array);
}

function join(array) {
  var len = array.length;
  return function(item) {
    for (var i = 0; i < len; i++) {
      var update = array[i];
      item = update(item);
    }
    return item;
  };
}
