import * as os from 'os';
import * as path from 'path';
import { fs } from '@modern-js/utils';
import { fsExists } from '@/utils';
import { getGeneratorDir } from '@/utils/getGeneratorDir';

describe('getGeneratorDir function test', () => {
  it('normal', async () => {
    const tmpDir = path.join(os.tmpdir(), '__codesmith__test', 'generatorDir');
    const generarorPath = path.join(tmpDir, 'path1', 'path2');
    const file = path.join(tmpDir, 'package.json');
    if (await fsExists(tmpDir)) {
      fs.removeSync(tmpDir);
    }
    fs.mkdirpSync(generarorPath);
    fs.writeFile(file, '{}', 'utf-8');
    const generarorDir = await getGeneratorDir(generarorPath);
    const lastChar = generarorDir[generarorDir.length - 1];
    expect(
      lastChar === path.sep ? generarorDir.slice(0, -1) : generarorDir,
    ).toBe(tmpDir);
  });
});
