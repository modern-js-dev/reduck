/*! dollar_update.js */

function $update() {
  if (!(this instanceof $update)) return new $update();
}

module.exports = $update;

$update.prototype = {

  // Sets the value of a field in an existing document.

  $set: function(hash) {
    return function(item) {
      if ('object' !== typeof item) return item;
      for (var key in hash) {
        item[key] = hash[key];
      }
      return item;
    };
  },

  // Removes the specified field from an existing document.

  $unset: function(hash) {
    return function(item) {
      if ('object' !== typeof item) return item;
      for (var key in hash) {
        delete item[key];
      }
      return item;
    };
  },

  // Renames a field.

  $rename: function(hash) {
    return function(item) {
      if ('object' !== typeof item) return item;
      for (var key in hash) {
        var val = item[key];
        if ('undefined' === typeof val) continue;
        delete item[key];
        var newkey = hash[key];
        item[newkey] = val;
      }
      return item;
    };
  },

  // Adds an item to an array.

  $push: function(hash) {
    return function(item) {
      if ('object' !== typeof item) return item;
      for (var key in hash) {
        var val = hash[key];
        var old = item[key];
        if (old instanceof Array) {
          // ok
        } else if ('undefined' == typeof old) {
          item[key] = [];
        } else {
          // MongoDB: Cannot apply $push/$pushAll modifier to non-array
          // continue;
          item[key] = [old]; // upgrade to array
        }
        item[key].push(val);
      }
      return item;
    };
  },

  // Removes items from an array that match a query statement.

  $pull: function(hash) {
    return function(item) {
      if ('object' !== typeof item) return item;
      for (var key in hash) {
        var val = hash[key];
        var old = item[key];
        if (old instanceof Array) {
          var tmp = [];
          var len = old.length;
          for (var i = 0; i < len; i++) {
            var test = old[i];
            if (val != test) tmp.push(test);
          }
          item[key] = tmp;
        } else if (val == old) {
          item[key] = []; // empty array
        }
      }
      return item;
    };
  },

  // Increments the value of the field by the specified amount.

  $inc: function(hash) {
    return function(item) {
      if ('object' !== typeof item) return item;
      for (var key in hash) {
        var val = hash[key];
        var old = item[key];
        val = parseFloat(val) || 0;
        old = parseFloat(old) || 0;
        item[key] = old + val;
      }
      return item;
    };
  }
};
