import path from 'path';
import { Buffer } from 'buffer';
import { fs } from '@modern-js/utils';
import { IMAGE_EXT_LIST } from './constants';

export const FS_RESOURCE = '_codesmith_core_fs_resource';
export class FsResource {
  _type: string = FS_RESOURCE;

  filePath: string;

  resourceKey: string;

  constructor(filePath: string, resourceKey: string) {
    this.filePath = filePath;
    this.resourceKey = resourceKey;
  }

  async value(): Promise<{ content: string | Buffer }> {
    const resourceFileExt = path.extname(this.filePath);
    if (IMAGE_EXT_LIST.includes(resourceFileExt)) {
      const buffer = await fs.readFile(path.resolve(this.filePath));
      return { content: buffer };
    } else {
      const text = await fs.readFile(path.resolve(this.filePath), 'utf8');
      return { content: text };
    }
  }
}
