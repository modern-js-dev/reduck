"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reduce = reduce;

function reduce(jsx, renderer, middleware) {
  let index = 0;

  const createNext = () => App => middleware[index++](App, renderer, createNext());

  return createNext()(jsx);
}