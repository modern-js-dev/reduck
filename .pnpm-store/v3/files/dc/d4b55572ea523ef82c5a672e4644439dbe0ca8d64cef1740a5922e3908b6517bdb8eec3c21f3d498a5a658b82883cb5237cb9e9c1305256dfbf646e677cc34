import os from 'os';
import path from 'path';
import { fs, execa } from '@modern-js/utils';
import {
  canUseGit,
  initGitRepo,
  isInGitRepo,
  gitAdd,
  gitCommit,
} from '@/utils';

const cwd = path.join(os.tmpdir(), 'codesmith_test', Math.random().toString());

describe('Utils cases', () => {
  beforeAll(async () => {
    await fs.mkdirp(cwd);
  });
  afterAll(async () => {
    await fs.remove(cwd);
  });
  test('canUseGit test', async () => {
    const canUse = await canUseGit();
    expect(canUse).toBe(true);
  });
  test('isInGitRepo test', async () => {
    const alreadyInit = await isInGitRepo(cwd);
    expect(alreadyInit).toBe(false);
  });
  test('initGitRepo test', async () => {
    await initGitRepo(cwd, 'main');
    const alreadyInit = await isInGitRepo(cwd);
    expect(alreadyInit).toBe(true);
  });
  test('gitAdd and gitCommit test', async () => {
    const packageJson = {
      name: 'test-git',
      version: '0.1.0',
      private: true,
    };
    await fs.writeFile(
      path.join(cwd, 'package.json'),
      JSON.stringify(packageJson),
      { encoding: 'utf-8' },
    );
    await gitAdd(cwd);
    await gitCommit(cwd, 'feat: init');
    const result = await execa('git', ['log'], { cwd, env: process.env });
    expect(result.stdout.includes('feat: init')).toBeTruthy();
  });
});
