import path from 'path';
import { fs, execa } from '@modern-js/utils';

export async function canUseYarn() {
  try {
    await execa('yarn', ['--version'], {
      env: process.env,
    });
    return true;
  } catch (e) {
    return false;
  }
}

export async function canUsePnpm() {
  try {
    await execa('pnpm', ['--version'], {
      env: process.env,
    });
    return true;
  } catch (e) {
    return false;
  }
}

export async function runInstall(targetDir: string, registryUrl?: string) {
  const options = {
    cwd: targetDir,
    env: process.env,
  };
  // delete devDependencies
  try {
    const pkgPath = path.join(targetDir, 'package.json');
    const pkgJSON = JSON.parse(fs.readFileSync(pkgPath, { encoding: 'utf-8' }));
    delete pkgJSON.devDependencies;
    fs.writeFileSync(pkgPath, JSON.stringify(pkgJSON, null, 2), {
      encoding: 'utf-8',
    });
  } catch (e) {
    /**
     * no handle
     */
  }
  if (await canUsePnpm()) {
    const params = [
      'install',
      '--prod',
      '--reporter=silent',
      '--prefer-offline',
      '--ignore-scripts',
    ];
    if (registryUrl) {
      params.push(`--registry=${registryUrl}`);
    }
    await execa('pnpm', params, options);
  } else if (await canUseYarn()) {
    const params = ['install', '--production', '--silent', '--ignore-scripts'];
    if (registryUrl) {
      params.push(`--registry=${registryUrl}`);
    }
    await execa('yarn', params, options);
  } else {
    const params = [
      'install',
      '--production',
      '--loglevel=error',
      '--prefer-offline',
      '--ignore-scripts',
    ];
    if (registryUrl) {
      params.push(`--registry=${registryUrl}`);
    }
    await execa('npm', params, options);
  }
}
