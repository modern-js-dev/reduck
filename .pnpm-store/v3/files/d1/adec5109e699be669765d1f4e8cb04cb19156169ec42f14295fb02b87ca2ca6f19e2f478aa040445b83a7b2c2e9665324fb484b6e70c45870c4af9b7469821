import path from 'path';
import { fs } from '@modern-js/utils';
import { fsExists } from './fsExists';

const MaxTimes = 5;

export async function getGeneratorDir(generator: string) {
  let result = generator;
  const isDirectory = (await fs.stat(generator)).isDirectory();

  if (!isDirectory) {
    result = path.dirname(generator);
  }

  let times = 0;

  while (
    times < MaxTimes &&
    !(await fsExists(path.join(result, 'package.json')))
  ) {
    result = path.join(result, '../');
    times++;
  }

  if (times >= MaxTimes) {
    throw Error('generator is not valid');
  }

  return result;
}
