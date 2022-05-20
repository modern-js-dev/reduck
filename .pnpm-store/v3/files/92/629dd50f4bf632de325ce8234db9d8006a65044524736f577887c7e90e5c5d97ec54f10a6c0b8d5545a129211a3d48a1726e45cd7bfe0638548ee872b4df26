var spawn = require('child_process').spawn;

var extra = module.exports = {
  cmd: null,
  args: [],
  env: {}
};

var idx = process.argv.indexOf('--');
if (~idx) {
  process.argv.splice(idx, 1);
  var args = process.argv.splice(idx);
  var env = {};
  Object.keys(process.env).forEach(function (k) {
    env[k] = process.env[k];
  });
  // parse out regular (NAME=val) env vars
  for (var i = 0; i < args.length; i++) {
    var match = args[i].match(/^([A-Z0-9_]+)=(.*?)$/);
    if (match) {
      env[match[1]] = match[2];
      args.shift();
      i--;
    }
  }
  var argv = [].concat(process.argv);
  process.argv = [];
  // parse out option-style (--env.NAME=val) env vars
  for (var i = 0; i < argv.length; i++) {
    var match = argv[i].match(/^\-\-env\.([A-Z0-9_]+)(?:=(.*))?$/);
    if (match && match[2]) {
      env[match[1]] = match[2].trim();
    }
    else if (match && match[1]) {
      // variation: --env.NAME val
      env[match[1]] = argv.splice(i + 1, 1)[0];
    }
    else {
      process.argv.push(argv[i]);
    }
  }
  extra.cmd = args.shift();
  extra.args = args;
  extra.env = env;
  extra.spawn = function (_opts) {
    _opts || (_opts = {});
    _opts.env || (_opts.env = extra.env);
    return spawn(extra.cmd, extra.args, _opts);
  };
}
