import packageJson, { Options } from 'package-json';
import { timeoutPromise } from './timeoutPromise';
import { NPM_API_TIMEOUT } from '@/constants';

/**
 * get package version
 * @param {string} packageName
 * @param {Options} options
 * @returns {string}
 */
export async function getNpmVersion(
  packageName: string,
  options?: Options,
): Promise<string | undefined> {
  const { version } = await timeoutPromise(
    packageJson(packageName.toLowerCase(), options),
    NPM_API_TIMEOUT,
    `Get npm version of '${packageName}'`,
  );
  return version as string | undefined;
}
