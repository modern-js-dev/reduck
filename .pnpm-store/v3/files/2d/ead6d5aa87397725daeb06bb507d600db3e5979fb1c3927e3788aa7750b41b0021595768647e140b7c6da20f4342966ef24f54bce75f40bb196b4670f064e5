export function reduce(jsx, renderer, middleware) {
  var index = 0;

  var createNext = function createNext() {
    return function (App) {
      return middleware[index++](App, renderer, createNext());
    };
  };

  return createNext()(jsx);
}