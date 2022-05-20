import { fs } from '@modern-js/utils';

/**
 * when the path can read successfully, the function will return true
 * @param {string} path
 * @returns {boolean}
 */
export async function fsExists(path: string) {
  try {
    await fs.access(path);
    return true;
  } catch (e: unknown) {
    return false;
  }
}
