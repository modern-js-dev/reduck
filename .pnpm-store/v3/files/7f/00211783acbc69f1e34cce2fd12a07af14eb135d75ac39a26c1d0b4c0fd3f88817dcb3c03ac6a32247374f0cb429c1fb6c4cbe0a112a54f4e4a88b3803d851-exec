var extra = require('../')
  , program = require('commander')

program
  .option('--something', 'something')
  .option('--lol <bool>', 'drool')
  .parse(process.argv);

console.log(JSON.stringify({
  extra: extra,
  something: program.something,
  lol: program.lol,
  args: program.args
}, null, 2));
