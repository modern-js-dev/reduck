extra
=====

parse extra arguments to a command after &quot;--&quot;

[![build status](https://secure.travis-ci.org/carlos8f/extra.png)](http://travis-ci.org/carlos8f/extra)

Ever want to create a command that spawned another command, and let the user pass
arguments and environment variables to it?

`extra` modifies `process.argv` and parses out command/arguments/etc passed after
`--` in the argument list, which enables you to spawn a separate command with the
result, and still use [commander.js](https://github.com/visionmedia/commander.js/)
or other "strict" argument checking libraries which would normally complain about
unknown arguments.

### Usage

```js
var extra = require('extra')
  , cmd = require('commander')
  , spawn = require('child_process').spawn

cmd.parse(process.argv);
spawn(extra.cmd, extra.args, {env: extra.env});
// or more conveniently:
extra.spawn();
```

### Example

Use `extra` to spawn an arbitrary command with user-specified options.

```js
#!/usr/bin/env node
var extra = require('extra')
  , program = require('commander')

program
  .command('spawn')
  .usage('[options] -- <cmd> [cmd_options] [cmd_args...]')
  .option('--fork', 'fork the process and exit')
  .action(function (cmd) {
    var proc = extra.spawn();
    if (cmd.fork) {
      process.exit();
    }
    proc.stdout.pipe(process.stdout);
    proc.stderr.pipe(process.stderr);
    process.on('exit', function () {
      proc.kill();
    });
  })

program.parse(process.argv);

if (!program.args.length) program.outputHelp();

```

- - -

### Developed by [Terra Eclipse](http://www.terraeclipse.com)
Terra Eclipse, Inc. is a nationally recognized political technology and
strategy firm located in Aptos, CA and Washington, D.C.

- - -

### License: MIT

- Copyright (C) 2013 Carlos Rodriguez (http://s8f.org/)
- Copyright (C) 2013 Terra Eclipse, Inc. (http://www.terraeclipse.com/)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the &quot;Software&quot;), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is furnished
to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
