/**
 * The MIT License (MIT)
 * Copyright (c) 2017-present Dmitry Soshnikov <dmitry.soshnikov@gmail.com>
 */

'use strict';

const regexpTree = require('regexp-tree');

/**
 * This plugin applies `compat-transpiler` translation from `regexp-tree`,
 * which enables usage of ES2018+ RegExp features in JavaScript.
 *
 * Note: `x` non-standard flag is currently not supported by Babylon parser
 * in RegExp literals, and `new RegExp(...)` notation should be used.
 *
 * Example:
 *
 *   /
 *     # A regular expression for date.
 *
 *     (?<year>\d{4})-    # year part of a date
 *     (?<month>\d{2})-   # month part of a date
 *     (?<day>\d{2})      # day part of a date
 *
 *   /x
 *
 * Is translated into:
 *
 *   /(\d{4})-(\d{2})-(\d{2})/
 *
 * ------------------------------------------------------------------
 *   1. The `features` option.
 *
 * The `features` option allows specifying specific regexp features
 * to be applied. Available are:
 *
 *   - `dotAll` - enables handling of `s` flag
 *   - namedCapturingGroups - enables handling of named groups
 *   - xFlag - enables handling of `x` flag
 *
 * ------------------------------------------------------------------
 *   2. The `useRuntime` option.
 *
 * Note: if `useRuntime` option is passed, this is transalted into:
 *
 *   const RegExpTree = require('regexp-tree-runtime');
 *
 *   ...
 *
 *   new RegExpTree(/(\d{4})-(\d{2})-(\d{2})/, {
 *     flags: 'x',
 *     source: <original-source>,
 *     groups: {
 *       year: 1,
 *       month: 2,
 *       day: 3,
 *     },
 *   });
 *
 * The `RegExpTree` class is a thin wrapper on top of original regexp, and
 * has identical to native RegExp API (e.g. you can call `exec` method, etc).
 * Matching such regexp enables access to `result.groups.year`, etc.
 *
 * In case of using runtime, it should be included as a dependency in your
 * package.json.
 *
 * If group names are used mostly for readability, `useRuntime` may be
 * omitted.
 *
 * ------------------------------------------------------------------
 *   3. The `re` shorthand (`useRe` option)
 *
 * The `useRe` option, enables usage of the re`...` pattern. This handles
 * global `re` function, where regular expressions can be used with
 * single escaping.
 *
 * Using simple `RegExp` (note double escape `\\d` as per JS strings):
 *
 *   new RegExp(`
 *
 *     (?<year>\\d{2})-
 *     (?<month>\\d{2})-
 *     (?<day>\\d{2})
 *
 *   `, 'x');
 *
 * vs. using `re` (not single escape for `\d`):
 *
 *   re`/
 *
 *     (?<year>\d{2})-
 *     (?<month>\d{2})-
 *     (?<day>\d{2})
 *
 *   /x`
 */
module.exports = ({types: t}) => {

  /**
   * Creates a `RegExpLiteral` node.
   */
  function toRegExpLiteral(raw) {
    const slashIndex = raw.lastIndexOf('/');

    const pattern = raw.slice(1, slashIndex);
    const flags = raw.slice(slashIndex);

    const re = t.regExpLiteral(
      pattern,
      flags
    );

    re.extra = {
      raw,
    };

    return re;
  }

  return {
    pre(state) {
      if (state.opts.useRuntime) {
        throw new Error(`useRuntime is not implemented yet.`);
      }
    },

    visitor: {

      /**
       * Handle `/foo/i`.
       */
      RegExpLiteral({node}, state) {
        Object.assign(node, getTranslatedData(node.extra.raw, state));
      },

      /**
       * Handle re`/<body>/<flags>` pattern.
       * Translate to `/doubleEscape(<body>)/<flags>`
       */
      TaggedTemplateExpression(path, state) {
        const {node} = path;

        if (!state.opts.useRe || !isReTemplate(node)) {
          return;
        }

        let re = node.quasi.quasis[0].value.raw;

        // Handle \\\\1 -> \\1. In templates \\1 should be used instead of
        // \1 since \1 is treated as an octal number, which is not allowed
        // in template strings.
        re = re.replace(/\\\\(\d+)/g, '\\$1');

        path.replaceWith(toRegExpLiteral(re));
      },

      /**
       * Handle `new RegExp(<body>, <flags>)`.
       *
       * Translate to /<body>/<flags>
       */
      NewExpression(path, state) {
        const {node} = path;

        if (!isNewRegExp(node)) {
          return;
        }

        let pattern;

        if (node.arguments[0].type === 'StringLiteral') {
          pattern = node.arguments[0].value;
        } else if (node.arguments[0].type === 'TemplateLiteral') {
          pattern = node.arguments[0].quasis[0].value.cooked;
        }

        let flags = '';

        if (node.arguments[1]) {
          if (node.arguments[1].type === 'StringLiteral') {
            flags = node.arguments[1].value;
          } else if (node.arguments[1].type === 'TemplateLiteral') {
            flags = node.arguments[1].quasis[0].value.cooked;
          }
        }

        const re = `/${pattern}/${flags}`;

        path.replaceWith(toRegExpLiteral(re));
      }
    },
  };
};

// Returns transalted pattern, and flags.
function getTranslatedData(regexp, state) {
  let whitelist = undefined;

  if (Array.isArray(state.opts.features) && state.opts.features.length > 0) {
    whitelist = state.opts.features;
  }

  const compat = regexpTree.compatTranspile(regexp, whitelist);

  return {
    pattern: compat.getSource(),
    flags: compat.getFlags(),
  };
}

// Support only string/template literals in
// `new RegExp('string-literal', 'flags')`.
//
// TODO: support variables (rewrite the var contents).
//
function isNewRegExp(node) {
  return (
    node.callee.type === 'Identifier' &&
    node.callee.name === 'RegExp' &&
    node.arguments[0] && (
      node.arguments[0].type === 'StringLiteral' ||
      (node.arguments[0].type === 'TemplateLiteral' &&
       node.arguments[0].expressions.length === 0 &&
       node.arguments[0].quasis.length === 1)
    )
  );
}

function isReTemplate(node) {
  return (
    node.tag.type === 'Identifier' &&
    node.tag.name === 're' &&
    node.quasi.type === 'TemplateLiteral' &&
    node.quasi.quasis.length === 1
  )
}
