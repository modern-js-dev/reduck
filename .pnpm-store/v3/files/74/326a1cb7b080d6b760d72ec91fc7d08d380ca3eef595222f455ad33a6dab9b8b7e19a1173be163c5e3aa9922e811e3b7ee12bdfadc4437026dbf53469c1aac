/*! dollar_where.js */

function $where() {
  if (!(this instanceof $where)) return new $where();
}

module.exports = $where;

$where.prototype = {
  // Matches values that are greater than the value specified in the query.
  $gt: function(val) {
    return function(test) {
      return (test > val);
    };
  },

  // Matches values that are equal to or greater than the value specified in the query.
  $gte: function(val) {
    return function(test) {
      return (test >= val);
    };
  },

  // Matches any of the values that exist in an array specified in the query.
  $in: function(arr) {
    if (!(arr instanceof Array)) {
      return new Error("invalid query"); // 12580
    }
    var len = arr.length;
    return function(test) {
      for (var i = 0; i < len; i++) {
        if (test == arr[i]) return true;
      }
      return false;
    };
  },

  // Matches vales that are less than the value specified in the query.
  $lt: function(val) {
    return function(test) {
      return (test < val);
    };
  },

  // Matches values that are less than or equal to the value specified in the query.
  $lte: function(val) {
    return function(test) {
      return (test <= val);
    };
  },

  // Matches all values that are not equal to the value specified in the query.
  $ne: function(val) {
    return function(test) {
      return (test != val);
    };
  },

  // Matches values that do not exist in an array specified to the query.
  $nin: function(arr) {
    var len = arr.length;
    return function(test) {
      for (var i = 0; i < len; i++) {
        if (test == arr[i]) return false;
      }
      return true;
    };
  },

  // Joins query clauses with a logical OR returns all documents that match the conditions of either clause.
  $or: function(arr, obop) {
    if (!arr) return;
    if (!(arr instanceof Array) || arr.length === 0) {
      return new Error("$or requires nonempty array"); // 13262
    }
    var out = [];
    arr.forEach(function(val) {
      var where = obop.where(val);
      out.push(where);
    });
    return join_or(out);
  },

  // Joins query clauses with a logical AND returns all documents that match the conditions of both clauses.
  $and: function(arr, obop) {
    if (!arr) return;
    if (!(arr instanceof Array) || arr.length === 0) {
      return new Error("$and expression must be a nonempty array"); // 14816
    }
    var out = [];
    arr.forEach(function(val) {
      var where = obop.where(val);
      out.push(where);
    });
    return join_and(out);
  },

  // Inverts the effect of a query expression and returns documents that do not match the query expression.
  $not: function(val, obop) {
    var where = obop.where(val);
    return function(test) {
      return !where(test);
    };
  },

  // Matches documents that have the specified field.
  $exists: function(val) {
    return function(test) {
      var exists = ('undefined' !== typeof test);
      return (exists === val);
    };
  },

  // Selects documents if the array field is a specified size.
  $size: function(val) {
    return function(test) {
      var len;
      var exists = ('undefined' !== typeof test);
      if (!exists) {
        // len = 0;
        return false;
      } else if (!(test instanceof Array)) {
        // len = 1;
        return false; // follow MongoDB behavior
      } else {
        len = test.length;
      }
      return len == val;
    };
  }
};

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

function join_or(array) {
  var len = array.length;
  return check_err(array) || function(item) {
    for (var i = 0; i < len; i++) {
      var f = array[i];
      if (f(item)) return true;
    }
    return false;
  };
}
