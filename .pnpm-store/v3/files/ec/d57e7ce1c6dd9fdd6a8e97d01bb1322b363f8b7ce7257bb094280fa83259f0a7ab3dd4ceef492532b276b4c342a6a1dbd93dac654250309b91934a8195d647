import { init, parse } from 'es-module-lexer';
import { Ok, Err } from "./result";
export const checkSource = async source => {
  await init;
  const [, exports] = parse(source);
  const handlers = [];

  if (exports.length === 0) {
    return Err('Without any export item, Expect one at least');
  }

  exports.forEach(item => {
    handlers.push(item);
  });
  return Ok(handlers);
};