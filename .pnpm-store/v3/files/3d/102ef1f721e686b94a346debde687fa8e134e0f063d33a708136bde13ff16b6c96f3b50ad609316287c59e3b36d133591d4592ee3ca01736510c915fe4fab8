var obop = require("obop")();

/**
 * light-weight command line arguments parser for cli application
 * "--foo-bar=baz" => {foo: {bar: "baz"}}
 *
 * @param {Array} [args] - command line arguments
 * @returns {Function}
 */

function argv(args) {
  var end;
  var $set = {"--": []};
  if (args) Array.prototype.forEach.call(args, parse);
  if (!$set["--"].length) delete $set["--"];
  var update = obop.update({$set: $set});
  return updater;

  function parse(arg) {
    if (end) {
      // rest of arguments
      add("--", arg);
    } else if (arg === "--") {
      // end of options
      end = true;
    } else if (arg.indexOf("--")) {
      // a filename
      add("--", arg);
    } else {
      // an option
      var pos = arg.indexOf("=");
      var key, val;
      if (pos < 0) {
        key = arg.substr(2);
        val = true;
      } else {
        key = arg.substr(2, pos - 2);
        val = arg.substr(pos + 1);
      }
      key = key.replace(/-+/g, ".");
      add(key, val);
    }
  }

  function add(key, val) {
    key = decodeURIComponent(key);
    var prev = $set[key];
    if (prev instanceof Array) {
      prev.push(val);
    } else if ("undefined" !== typeof prev) {
      $set[key] = [prev, val];
    } else {
      $set[key] = val;
    }
  }

  function updater(config) {
    if (!config) config = {};
    return update ? update(config) : config;
  }
}

if ("undefined" !== typeof module) module.exports = argv;
