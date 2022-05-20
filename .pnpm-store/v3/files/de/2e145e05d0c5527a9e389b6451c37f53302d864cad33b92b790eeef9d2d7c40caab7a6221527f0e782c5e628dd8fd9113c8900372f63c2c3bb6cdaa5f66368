export function reduce(jsx, renderer, middleware) {
  let index = 0;

  const createNext = () => App => middleware[index++](App, renderer, createNext());

  return createNext()(jsx);
}