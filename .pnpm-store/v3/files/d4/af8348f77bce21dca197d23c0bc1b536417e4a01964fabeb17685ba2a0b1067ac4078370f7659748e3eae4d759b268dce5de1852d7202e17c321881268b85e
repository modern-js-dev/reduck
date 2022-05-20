import packageJson, { Options } from 'package-json';
import { timeoutPromise } from './timeoutPromise';
import { NPM_API_TIMEOUT } from '@/constants';

export async function getNpmTarballUrl(
  pkgName: string,
  pkgVersion: string,
  options?: Options,
): Promise<string> {
  const pkgJson: any = await timeoutPromise(
    packageJson(pkgName.toLowerCase(), {
      ...options,
      fullMetadata: true,
      version: pkgVersion,
    }),
    NPM_API_TIMEOUT,
    `Get npm tarball url of '${pkgName}'`,
  );

  if (typeof pkgJson.version !== 'string') {
    throw new Error('version not found in package');
  }

  if (!pkgJson.version) {
    throw new Error('version not found');
  }

  const tarball = pkgJson?.dist?.tarball;
  if (!tarball) {
    throw new Error('tarball not found');
  }
  return tarball;
}
