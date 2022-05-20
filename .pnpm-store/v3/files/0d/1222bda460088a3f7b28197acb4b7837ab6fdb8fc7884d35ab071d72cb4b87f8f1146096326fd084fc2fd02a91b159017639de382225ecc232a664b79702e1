/**
 * The MIT License (MIT)
 * Copyright (c) 2017-present Dmitry Soshnikov <dmitry.soshnikov@gmail.com>
 */

'use strict';

const fs = require('fs');
const path = require('path');
const plugin = require('..');

const {transformFileSync} = require('babel-core');

const fixturesDir = path.join(__dirname, 'fixtures');

describe('modern-regexp-test', () => {
  fs.readdirSync(fixturesDir).map(caseName => {
    it(caseName, () => {
      const fixtureDir = path.join(fixturesDir, caseName);
      const inputPath = path.join(fixtureDir, 'input.js');

      let options = {};

      const optionsFile = path.join(fixtureDir, 'options.json');

      if (fs.existsSync(optionsFile)) {
        options = require(optionsFile);
      }

      const actual = transformFileSync(inputPath, {
        'plugins': [
          [plugin, options]
        ]
      }).code;

      const expected = fs.readFileSync(
        path.join(fixtureDir, 'expected.js')
      ).toString();

      expect(actual.trim()).toBe(expected.trim());
    });
  });

  it('specific features', () => {
    const inputPath = path.join(fixturesDir, 'integration', 'input.js');

    const actual = transformFileSync(inputPath, {
      'plugins': [
        [plugin, {
          features: [
            'namedCapturingGroups',
            'xFlag',
          ],
        }]
      ]
    }).code;

    const expected = fs.readFileSync(
      path.join(fixturesDir, 'integration', 'expected-subset.js')
    ).toString();

    expect(actual.trim()).toBe(expected.trim());
  });
});