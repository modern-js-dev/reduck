describe('basic test', function () {
  it('works', function (done) {
    exec('node example/basic.js --something --lol=true --env.NAME=val --env.IAM=GOZER arg1 arg2 -- HEY=yo LOS=zafiros amino deploy --after=yes', function (err, stdout, stderr) {
      assert.ifError(err);
      var output = JSON.parse(stdout);
      assert(output);
      assert.equal(output.extra.cmd, 'amino');
      assert.deepEqual(output.extra.args, ['deploy', '--after=yes']);
      assert.equal(output.extra.env.HEY, 'yo');
      assert.equal(output.extra.env.LOS, 'zafiros');
      assert.equal(output.extra.env.IAM, 'GOZER');
      assert.equal(output.extra.env.NAME, 'val');
      assert.equal(output.something, true);
      assert.equal(output.lol, 'true');
      assert.deepEqual(output.args, ['arg1', 'arg2']);
      done();
    });
  });
});