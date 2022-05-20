/*! index.js */

/**
 * This class provides a set of methods
 * [where()]{@linkcode obop#where}
 * /
 * [order()]{@linkcode obop#order}
 * /
 * [update()]{@linkcode obop#update}
 * /
 * [view()]{@linkcode obop#view}
 * which manipulate array such like MongoDB-style object operators do.
 *
 * @class obop
 * @property {String} system.name - Read only. System name: "obop"
 * @property {String} system.version - Read only. System version: e.g. "0.0.1"
 * @see https://github.com/kawanet/obop
 * @see http://kawanet.github.io/obop/docs/obop.html
 * @see https://raw.github.com/kawanet/obop/master/build/obop.min.js
 *
 * @example
 * // node.js
 * var obop = require('obop')();
 * var src = [ { a: 1 }, { a: 2 }, { a: 3 } ];
 * var out = obop.where( src, { a: 2 } ); // => [ { a: 2 } ]
 *
 * @example
 * &lt;script src="obop.min.js"&gt;&lt;/script&gt;
 * &lt;script&gt;
 *   var src = [ { a: 1 }, { a: 2 }, { a: 3 } ];
 *   var out = obop.where( src, { a: 2 } ); // => [ { a: 2 } ]
 * &lt;/script&gt;
 */

var $where = require('./lib/dollar_where');
var $update = require('./lib/dollar_update');

function obop() {
  if (!(this instanceof obop)) return new obop();
}

obop.where = obop.prototype.where = require('./lib/where.js').where;
obop.view = obop.prototype.view = require('./lib/view.js').view;
obop.order = obop.prototype.order = require('./lib/order.js').order;
obop.update = obop.prototype.update = require('./lib/update.js').update;
obop.system = obop.prototype.system = require('./lib/system.json');
obop.$where = obop.prototype.$where = new $where();
obop.$update = obop.prototype.$update = new $update();

module.exports = obop;
