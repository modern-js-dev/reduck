import { execa } from '@modern-js/utils';

export async function canUseGit() {
  try {
    await execa('git', ['--version'], { env: process.env });
    return true;
  } catch (e) {
    return false;
  }
}

export async function isInGitRepo(cwd: string) {
  try {
    await execa('git', ['rev-parse', '--is-inside-work-tree'], {
      env: process.env,
      cwd,
    });
    return true;
  } catch (e) {
    return false;
  }
}

export async function initGitRepo(cwd: string, defaultBranch: string) {
  await execa('git', ['init'], {
    env: process.env,
    cwd,
  });
  const { stdout } = await execa('git', ['symbolic-ref', '--short', 'HEAD'], {
    env: process.env,
    cwd,
  });

  if (stdout !== defaultBranch) {
    await execa('git', ['checkout', '-b', defaultBranch], {
      env: process.env,
      cwd,
    });
  }
}

export async function gitAdd(cwd: string) {
  await execa('git', ['add', '-A'], {
    env: process.env,
    cwd,
  });
}

export async function gitCommit(cwd: string, commitMessage: string) {
  await execa('git', ['commit', '-m', commitMessage, '--no-verify'], {
    env: process.env,
    cwd,
  });
}
